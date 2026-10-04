import { NextResponse } from "next/server";
import {
  adminCookieName,
  revokeAdminSession,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const cookieHeader = request.headers.get("cookie");

  let sessionToken: string | undefined;

  if (cookieHeader) {
    const cookies = cookieHeader.split(";");

    for (const cookie of cookies) {
      const [name, ...valueParts] = cookie.trim().split("=");

      if (name === adminCookieName) {
        sessionToken = valueParts.join("=");
        break;
      }
    }
  }

  try {
    await revokeAdminSession(sessionToken);
  } catch (error) {
    console.error(
      "Admin session revocation failed:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error: "Unable to log out.",
      },
      { status: 500 },
    );
  }

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set({
    name: adminCookieName,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}