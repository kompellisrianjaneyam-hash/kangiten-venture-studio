import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 32 * 1024;

export const runtime = "nodejs";

export async function POST(request: Request) {
  const clientIdentifier = getClientIdentifier(request);

  const rate = checkRateLimit(
    `public-application:${clientIdentifier}`,
    {
      limit: 5,
      windowMs: 10 * 60 * 1000,
    },
  );

  if (!rate.allowed) {
    return NextResponse.json(
      {
        error: "Too many submissions. Please try again later.",
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
        error: "Request is too large.",
      },
      { status: 413 },
    );
  }

  const contentType = request.headers.get("content-type") || "";

  if (!contentType.toLowerCase().startsWith("application/json")) {
    return NextResponse.json(
      {
        error: "Invalid request.",
      },
      { status: 415 },
    );
  }

  try {
    const body = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        {
          error: "Invalid request body.",
        },
        { status: 400 },
      );
    }

    const requiredFields = [
      "name",
      "email",
      "phone",
      "ventureName",
      "industry",
      "stage",
      "problem",
      "targetUsers",
      "solution",
      "technologyRequirements",
      "partnershipNeeds",
    ];

    for (const field of requiredFields) {
      const value = body[field];

      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && !value.trim())
      ) {
        return NextResponse.json(
          {
            error: `Missing required field: ${field}`,
          },
          { status: 400 },
        );
      }
    }

    if (!body.consent) {
      return NextResponse.json(
        {
          error:
            "You must confirm the information before submitting.",
        },
        { status: 400 },
      );
    }

    const email = String(body.email).trim().toLowerCase();

    const application = await prisma.$transaction(async (tx) => {
      const createdApplication = await tx.application.create({
        data: {
          name: String(body.name).trim(),
          email,
          phone: String(body.phone).trim(),
          linkedin: body.linkedin?.trim() || null,
          background: body.background?.trim() || null,

          ventureName: String(body.ventureName).trim(),
          website: body.website?.trim() || null,
          industry: String(body.industry).trim(),
          stage: body.stage,

          problem: String(body.problem).trim(),
          targetUsers: String(body.targetUsers).trim(),
          whyItMatters: body.whyItMatters?.trim() || null,

          solution: String(body.solution).trim(),
          differentiation: body.differentiation?.trim() || null,

          technologyAreas: Array.isArray(body.technologyAreas)
            ? body.technologyAreas.map((item: unknown) =>
                String(item),
              )
            : [],

          technologyRequirements: String(
            body.technologyRequirements,
          ).trim(),

          existingProduct:
            body.existingProduct?.trim() || null,
          requiresRAndD:
            body.requiresRAndD?.trim() || null,
          rdDescription:
            body.rdDescription?.trim() || null,

          users: body.users?.trim() || null,
          revenue: body.revenue?.trim() || null,
          funding: body.funding?.trim() || null,
          traction: body.traction?.trim() || null,

          partnershipNeeds:
            String(body.partnershipNeeds).trim(),
          expectedContribution:
            body.expectedContribution?.trim() || null,
          whyPartner:
            body.whyPartner?.trim() || null,

          additionalNotes:
            body.additionalNotes?.trim() || null,
          consent: true,
        },
      });

      await tx.applicationActivity.create({
        data: {
          applicationId: createdApplication.id,
          type: "APPLICATION_RECEIVED",
          title: "Application received",
          description:
            "New application submitted through the public application form.",
        },
      });

      return createdApplication;
    });

    return NextResponse.json(
      {
        success: true,
        applicationId: application.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Application submission error:", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while submitting your application. Please try again.",
      },
      { status: 500 },
    );
  }
}