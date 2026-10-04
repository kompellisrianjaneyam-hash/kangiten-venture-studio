import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const allowedStatuses = [
  "NEW",
  "REVIEWING",
  "SHORTLISTED",
  "CONTACTED",
  "MEETING",
  "DUE_DILIGENCE",
  "PARTNERED",
  "DECLINED",
] as const;

const contactedStatuses = new Set([
  "CONTACTED",
  "MEETING",
  "DUE_DILIGENCE",
  "PARTNERED",
]);

const MAX_BODY_BYTES = 32 * 1024;
const MAX_ID_LENGTH = 128;
const MAX_NOTES_LENGTH = 10000;

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;

    if (
      typeof id !== "string" ||
      !id ||
      id.length > MAX_ID_LENGTH
    ) {
      return NextResponse.json(
        { error: "Invalid application ID." },
        { status: 400 },
      );
    }

    const contentLength = Number(
      request.headers.get("content-length") || 0,
    );

    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Request is too large." },
        { status: 413 },
      );
    }

    const contentType = request.headers.get("content-type") || "";

    if (
      !contentType
        .toLowerCase()
        .startsWith("application/json")
    ) {
      return NextResponse.json(
        { error: "Invalid request." },
        { status: 415 },
      );
    }

    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 },
      );
    }

    const status =
      typeof body.status === "string"
        ? body.status
        : "";

    const internalNotes =
      typeof body.internalNotes === "string"
        ? body.internalNotes.trim()
        : "";

    if (
      !allowedStatuses.includes(
        status as (typeof allowedStatuses)[number],
      )
    ) {
      return NextResponse.json(
        { error: "Invalid status." },
        { status: 400 },
      );
    }

    if (internalNotes.length > MAX_NOTES_LENGTH) {
      return NextResponse.json(
        { error: "Internal notes are too long." },
        { status: 400 },
      );
    }

    let nextFollowUpAt: Date | null = null;

    if (
      typeof body.nextFollowUpAt === "string" &&
      body.nextFollowUpAt.trim()
    ) {
      const followUpDate = body.nextFollowUpAt.trim();

      if (!/^\d{4}-\d{2}-\d{2}$/.test(followUpDate)) {
        return NextResponse.json(
          { error: "Invalid follow-up date." },
          { status: 400 },
        );
      }

      const date = new Date(`${followUpDate}T09:00:00`);

      if (Number.isNaN(date.getTime())) {
        return NextResponse.json(
          { error: "Invalid follow-up date." },
          { status: 400 },
        );
      }

      nextFollowUpAt = date;
    }

    const existing = await prisma.application.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Application not found." },
        { status: 404 },
      );
    }

    const movedIntoContactedStage =
      contactedStatuses.has(status) &&
      !contactedStatuses.has(existing.status);

    await prisma.application.update({
      where: { id },
      data: {
        status: status as (typeof allowedStatuses)[number],
        internalNotes: internalNotes || null,
        nextFollowUpAt,
        ...(movedIntoContactedStage
          ? { lastContactedAt: new Date() }
          : {}),
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Admin application update failed:",
      error,
    );

    return NextResponse.json(
      { error: "Unable to update application." },
      { status: 500 },
    );
  }
}