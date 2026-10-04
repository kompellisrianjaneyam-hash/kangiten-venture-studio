import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ApplicationStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import ApplicationControls from "./ApplicationControls";

export const dynamic = "force-dynamic";

const statusLabels: Record<ApplicationStatus, string> = {
  NEW: "New",
  REVIEWING: "Reviewing",
  SHORTLISTED: "Shortlisted",
  CONTACTED: "Contacted",
  MEETING: "Meeting",
  DUE_DILIGENCE: "Due Diligence",
  PARTNERED: "Partnered",
  DECLINED: "Declined",
};

const stageLabels = {
  IDEA: "Idea",
  PROTOTYPE: "Prototype",
  MVP: "MVP",
  EARLY_USERS: "Early Users",
  REVENUE: "Revenue",
  SCALING: "Scaling",
} as const;

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const application = await prisma.application.findUnique({
    where: { id },
    include: {
      activities: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!application) {
    notFound();
  }

  return (
    <main className="admin-workspace">
      <div className="admin-main-shell">
        <div className="admin-detail-back">
          <Link href="/admin" className="admin-back-link">
            <span>←</span>
            Back to Applications
          </Link>
        </div>

        <header className="admin-detail-header">
          <div className="admin-detail-heading">
            <div className="admin-detail-kicker">
              APPLICATION / {application.id.slice(-6).toUpperCase()}
            </div>

            <div className="admin-detail-title-row">
              <div>
                <h1>{application.name}</h1>
                <p className="admin-detail-venture">
                  {application.ventureName}
                </p>
              </div>

              <span className="admin-status admin-status-large">
                <span className="admin-status-dot" />
                {statusLabels[application.status]}
              </span>
            </div>

            <div className="admin-detail-meta">
              <a href={`mailto:${application.email}`}>
                {application.email}
              </a>

              <a href={`tel:${application.phone}`}>
                {application.phone}
              </a>

              <span>{application.industry}</span>

              <span>{stageLabels[application.stage]}</span>

              <span>
                Applied {formatDateTime(application.createdAt)}
              </span>
            </div>
          </div>

          <ApplicationControls
            id={application.id}
            initialStatus={application.status}
            initialNotes={application.internalNotes || ""}
            initialNextFollowUp={
              application.nextFollowUpAt
                ? formatDateInput(application.nextFollowUpAt)
                : ""
            }
          />
        </header>

        <div className="admin-detail-divider" />

        <div className="admin-detail-grid-new">
          <DetailCard
            number="01"
            title="Founder"
            description="Who is behind the venture."
          >
            <Detail label="Full Name" value={application.name} />

            <Detail
              label="Email"
              value={application.email}
              href={`mailto:${application.email}`}
            />

            <Detail
              label="Phone"
              value={application.phone}
              href={`tel:${application.phone}`}
            />

            <Detail
              label="LinkedIn"
              value={application.linkedin}
              href={application.linkedin || undefined}
            />

            <Detail
              label="Background"
              value={application.background}
              wide
            />
          </DetailCard>

          <DetailCard
            number="02"
            title="Venture"
            description="The company and its current position."
          >
            <Detail
              label="Venture Name"
              value={application.ventureName}
            />

            <Detail
              label="Website"
              value={application.website}
              href={application.website || undefined}
            />

            <Detail
              label="Industry"
              value={application.industry}
            />

            <Detail
              label="Current Stage"
              value={stageLabels[application.stage]}
            />
          </DetailCard>

          <DetailCard
            number="03"
            title="Problem"
            description="The opportunity they're trying to solve."
          >
            <Detail
              label="What Problem Are They Solving?"
              value={application.problem}
              wide
            />

            <Detail
              label="Who Experiences It?"
              value={application.targetUsers}
              wide
            />

            <Detail
              label="Why Does It Matter?"
              value={application.whyItMatters}
              wide
            />
          </DetailCard>

          <DetailCard
            number="04"
            title="Solution"
            description="The product or technology being proposed."
          >
            <Detail
              label="What Are They Building?"
              value={application.solution}
              wide
            />

            <Detail
              label="What Makes It Different?"
              value={application.differentiation}
              wide
            />
          </DetailCard>

          <DetailCard
            number="05"
            title="Technology"
            description="The technical scope of the venture."
          >
            <Detail
              label="Technology Areas"
              value={
                application.technologyAreas.length
                  ? application.technologyAreas.join(" · ")
                  : null
              }
            />

            <Detail
              label="Technology Requirements"
              value={application.technologyRequirements}
              wide
            />

            <Detail
              label="What Has Already Been Built?"
              value={application.existingProduct}
              wide
            />

            <Detail
              label="Requires Significant R&D"
              value={application.requiresRAndD}
            />

            <Detail
              label="R&D Description"
              value={application.rdDescription}
              wide
            />
          </DetailCard>

          <DetailCard
            number="06"
            title="Traction"
            description="Evidence of progress so far."
          >
            <Detail
              label="Current Users"
              value={application.users}
            />

            <Detail
              label="Revenue"
              value={application.revenue}
            />

            <Detail
              label="Funding"
              value={application.funding}
            />

            <Detail
              label="Other Traction"
              value={application.traction}
              wide
            />
          </DetailCard>

          <DetailCard
            number="07"
            title="Partnership"
            description="What they expect from Kangiten."
          >
            <Detail
              label="What They Need From Kangiten"
              value={application.partnershipNeeds}
              wide
            />

            <Detail
              label="Expected Studio Contribution"
              value={application.expectedContribution}
              wide
            />

            <Detail
              label="Why They Want a Technical Partner"
              value={application.whyPartner}
              wide
            />
          </DetailCard>

          <DetailCard
            number="08"
            title="Additional Information"
            description="Anything else submitted with the application."
          >
            <Detail
              label="Additional Notes"
              value={application.additionalNotes}
              wide
            />

            <Detail
              label="Application Received"
              value={formatDateTime(application.createdAt)}
            />

            <Detail
              label="Last Contacted"
              value={
                application.lastContactedAt
                  ? formatDateTime(application.lastContactedAt)
                  : null
              }
            />

            <Detail
              label="Next Follow-up"
              value={
                application.nextFollowUpAt
                  ? formatDateTime(application.nextFollowUpAt)
                  : null
              }
            />

            <Detail
              label="Information Confirmed"
              value={application.consent ? "Yes" : "No"}
            />
          </DetailCard>
        </div>

        <ActivityHistory activities={application.activities} />
      </div>
    </main>
  );
}

function ActivityHistory({
  activities,
}: {
  activities: {
    id: string;
    createdAt: Date;
    title: string;
    description: string | null;
  }[];
}) {
  return (
    <section className="admin-activity-section">
      <div className="admin-activity-header">
        <div>
          <span className="admin-detail-kicker">
            WORKFLOW / HISTORY
          </span>

          <h2>Activity History</h2>

          <p>
            A chronological record of important changes made to this
            application.
          </p>
        </div>

        <span className="admin-activity-count">
          {activities.length}{" "}
          {activities.length === 1 ? "event" : "events"}
        </span>
      </div>

      {activities.length === 0 ? (
        <div className="admin-activity-empty">
          No activity has been recorded yet.
        </div>
      ) : (
        <div className="admin-activity-list">
          {activities.map((activity) => (
            <article
              className="admin-activity-item"
              key={activity.id}
            >
              <div className="admin-activity-marker">
                <span />
              </div>

              <div className="admin-activity-content">
                <div className="admin-activity-meta">
                  <time dateTime={activity.createdAt.toISOString()}>
                    {formatActivityDate(activity.createdAt)}
                  </time>
                </div>

                <h3>{activity.title}</h3>

                {activity.description && (
                  <p>{activity.description}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function DetailCard({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="admin-detail-card">
      <div className="admin-detail-card-heading">
        <span className="admin-detail-card-number">
          {number}
        </span>

        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="admin-detail-fields">
        {children}
      </div>
    </section>
  );
}

function Detail({
  label,
  value,
  href,
  wide = false,
}: {
  label: string;
  value: string | null | undefined;
  href?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`admin-detail-field${
        wide ? " admin-detail-field-wide" : ""
      }`}
    >
      <span className="admin-detail-field-label">
        {label}
      </span>

      <div className="admin-detail-field-value">
        {value ? (
          href ? (
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={
                href.startsWith("http")
                  ? "noreferrer"
                  : undefined
              }
            >
              {value}
            </a>
          ) : (
            <span>{value}</span>
          )
        ) : (
          <span className="admin-optional">
            Not provided
          </span>
        )}
      </div>
    </div>
  );
}

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatActivityDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}