import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "kangiten_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 8;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET must contain at least 32 characters.",
    );
  }

  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSecret())
    .update(value)
    .digest("hex");
}

function safeEqual(a: string, b: string) {
  const first = Buffer.from(a, "utf8");
  const second = Buffer.from(b, "utf8");

  if (first.length !== second.length) {
    return false;
  }

  return timingSafeEqual(first, second);
}

function hashSessionToken(token: string) {
  return createHash("sha256")
    .update(token)
    .digest("hex");
}

export async function createAdminSession() {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const nonce = randomBytes(32).toString("hex");

  const payload = `${expiresAt}.${nonce}`;
  const signature = sign(payload);

  const token = `${payload}.${signature}`;

  await prisma.adminSession.create({
    data: {
      tokenHash: hashSessionToken(token),
      expiresAt: new Date(expiresAt),
    },
  });

  return token;
}

export async function verifyAdminSession(
  value: string | undefined,
) {
  if (!value) {
    return false;
  }

  const [expiresAt, nonce, signature] = value.split(".");

  if (
    !expiresAt ||
    !nonce ||
    !signature ||
    !/^\d+$/.test(expiresAt) ||
    !/^[a-f0-9]{64}$/.test(nonce) ||
    !/^[a-f0-9]{64}$/.test(signature)
  ) {
    return false;
  }

  const expiry = Number(expiresAt);

  if (
    !Number.isSafeInteger(expiry) ||
    expiry <= Date.now()
  ) {
    return false;
  }

  const payload = `${expiresAt}.${nonce}`;

  if (!safeEqual(sign(payload), signature)) {
    return false;
  }

  const session = await prisma.adminSession.findUnique({
    where: {
      tokenHash: hashSessionToken(value),
    },
    select: {
      expiresAt: true,
      revokedAt: true,
    },
  });

  if (!session) {
    return false;
  }

  if (session.revokedAt) {
    return false;
  }

  if (session.expiresAt.getTime() <= Date.now()) {
    return false;
  }

  return true;
}

export async function revokeAdminSession(
  value: string | undefined,
) {
  if (!value) {
    return;
  }

  const tokenHash = hashSessionToken(value);

  await prisma.adminSession.updateMany({
    where: {
      tokenHash,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;

  return verifyAdminSession(value);
}

export const adminCookieName = COOKIE_NAME;
export const adminSessionMaxAge = 60 * 60 * 8;