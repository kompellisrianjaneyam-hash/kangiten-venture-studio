import { createHash, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import {
  adminCookieName,
  adminSessionMaxAge,
  createAdminSession,
} from "@/lib/admin-auth";
import {
  checkRateLimit,
  getClientIdentifier,
} from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8 * 1024;

function passwordsEqual(a: string, b: string) {
  const first = createHash("sha256").update(a).digest();
  const second = createHash("sha256").update(b).digest();

  return timingSafeEqual(first, second);
}

export async function POST(request: Request) {
  const key = getClientIdentifier(request);

  const rate = checkRateLimit(`admin-login:${key}`, {
    limit: 8,
    windowMs: 15 * 60 * 1000,
  });

  if (!rate.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many login attempts. Try again later.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rate.retryAfterSeconds),
        },
      },
    );
  }

  const contentLength = Number(
    request.headers.get("content-length") || 0,
  );

  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      {
        success: false,
        error: "Request is too large.",
      },
      { status: 413 },
    );
  }

  const contentType =
    request.headers.get("content-type") || "";

  if (
    !contentType
      .toLowerCase()
      .startsWith("application/json")
  ) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request.",
      },
      { status: 415 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request.",
      },
      { status: 400 },
    );
  }

  const password =
    typeof (body as { password?: unknown })?.password ===
    "string"
      ? (body as { password: string }).password
      : "";

  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword) {
    console.error(
      "ADMIN_PASSWORD is not configured.",
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Admin authentication is not configured.",
      },
      { status: 500 },
    );
  }

  if (
    !password ||
    !passwordsEqual(password, expectedPassword)
  ) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid credentials.",
      },
      { status: 401 },
    );
  }

  let sessionToken: string;

  try {
    sessionToken = await createAdminSession();
  } catch (error) {
    console.error(
      "Admin session creation failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error: "Unable to create admin session.",
      },
      { status: 500 },
    );
  }

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set({
    name: adminCookieName,
    value: sessionToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: adminSessionMaxAge,
  });

  return response;
}