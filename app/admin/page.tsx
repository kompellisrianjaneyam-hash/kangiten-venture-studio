import Link from "next/link";
import { ApplicationStatus, Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import AdminLogout from "./AdminLogout";

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

type StageValue = keyof typeof stageLabels;

const statusOptions: Array<{
  value: ApplicationStatus | "ALL";
  label: string;
}> = [
  { value: "ALL", label: "All statuses" },
  ...Object.entries(statusLabels).map(([value, label]) => ({
    value: value as ApplicationStatus,
    label,
  })),
];

const followUpOptions = [
  { value: "ALL", label: "All follow-ups" },
  { value: "OVERDUE", label: "Overdue" },
  { value: "TODAY", label: "Due today" },
  { value: "UPCOMING", label: "Upcoming" },
  { value: "NONE", label: "No follow-up" },
] as const;

type FollowUpFilter = (typeof followUpOptions)[number]["value"];

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: string;
    stage?: string;
    industry?: string;
    followUp?: string;
  }>;
}) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  const params = await searchParams;

  const query = (params.q || "").trim();

  const selectedStatus = statusOptions.some(
    (option) => option.value === params.status,
  )
    ? (params.status as ApplicationStatus | "ALL")
    : "ALL";

  const selectedStage =
    params.stage && params.stage in stageLabels
      ? (params.stage as StageValue)
      : "ALL";

  const selectedFollowUp = followUpOptions.some(
    (option) => option.value === params.followUp,
  )
    ? (params.followUp as FollowUpFilter)
    : "ALL";

  const selectedIndustry = (params.industry || "").trim();

  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date(startOfToday);
  endOfToday.setDate(endOfToday.getDate() + 1);

  const where: Prisma.ApplicationWhereInput = {
    ...(selectedStatus !== "ALL"
      ? {
          status: selectedStatus,
        }
      : {}),

    ...(selectedStage !== "ALL"
      ? {
          stage: selectedStage,
        }
      : {}),

    ...(selectedIndustry
      ? {
          industry: selectedIndustry,
        }
      : {}),

    ...(selectedFollowUp === "OVERDUE"
      ? {
          nextFollowUpAt: {
            lt: startOfToday,
          },
        }
      : {}),

    ...(selectedFollowUp === "TODAY"
      ? {
          nextFollowUpAt: {
            gte: startOfToday,
            lt: endOfToday,
          },
        }
      : {}),

    ...(selectedFollowUp === "UPCOMING"
      ? {
          nextFollowUpAt: {
            gte: endOfToday,
          },
        }
      : {}),

    ...(selectedFollowUp === "NONE"
      ? {
          nextFollowUpAt: null,
        }
      : {}),

    ...(query
      ? {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              ventureName: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              industry: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        }
      : {}),
  };

  const [
    applications,
    total,
    newCount,
    reviewingCount,
    shortlistedCount,
    contactedCount,
    meetingCount,
    dueDiligenceCount,
    partneredCount,
    declinedCount,
    overdueFollowUps,
    todayFollowUps,
    upcomingFollowUps,
    industries,
  ] = await Promise.all([
    prisma.application.findMany({
      where,
      orderBy: [
        {
          nextFollowUpAt: {
            sort: "asc",
            nulls: "last",
          },
        },
        {
          createdAt: "desc",
        },
      ],
      take: 100,
      select: {
        id: true,
        name: true,
        email: true,
        ventureName: true,
        industry: true,
        stage: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        lastContactedAt: true,
        nextFollowUpAt: true,
      },
    }),

    prisma.application.count(),

    prisma.application.count({
      where: { status: "NEW" },
    }),

    prisma.application.count({
      where: { status: "REVIEWING" },
    }),

    prisma.application.count({
      where: { status: "SHORTLISTED" },
    }),

    prisma.application.count({
      where: { status: "CONTACTED" },
    }),

    prisma.application.count({
      where: { status: "MEETING" },
    }),

    prisma.application.count({
      where: { status: "DUE_DILIGENCE" },
    }),

    prisma.application.count({
      where: { status: "PARTNERED" },
    }),

    prisma.application.count({
      where: { status: "DECLINED" },
    }),

    prisma.application.count({
      where: {
        nextFollowUpAt: {
          lt: startOfToday,
        },
      },
    }),

    prisma.application.count({
      where: {
        nextFollowUpAt: {
          gte: startOfToday,
          lt: endOfToday,
        },
      },
    }),

    prisma.application.count({
      where: {
        nextFollowUpAt: {
          gte: endOfToday,
        },
      },
    }),

    prisma.application.findMany({
      distinct: ["industry"],
      select: {
        industry: true,
      },
      orderBy: {
        industry: "asc",
      },
    }),
  ]);

  const hasFilters =
    Boolean(query) ||
    selectedStatus !== "ALL" ||
    selectedStage !== "ALL" ||
    Boolean(selectedIndustry) ||
    selectedFollowUp !== "ALL";

  const activeFilterCount = [
    Boolean(query),
    selectedStatus !== "ALL",
    selectedStage !== "ALL",
    Boolean(selectedIndustry),
    selectedFollowUp !== "ALL",
  ].filter(Boolean).length;

  return (
    <main className="admin-workspace">
      <div className="admin-main-shell">
        <header className="admin-topbar">
          <div>
            <span className="admin-detail-kicker">
              KANGITEN VENTURE STUDIO / PIPELINE
            </span>

            <h1>Applications.</h1>

            <p>
              Review founders, understand the ventures they are building,
              and move each opportunity through the studio pipeline.
            </p>
          </div>

          <div className="admin-topbar-actions">
            <AdminLogout />
          </div>
        </header>

        <section
          className="admin-stats"
          aria-label="Application pipeline"
        >
          <PipelineStat
            label="All Applications"
            value={total}
            href="/admin"
            active={!hasFilters}
          />

          <PipelineStat
            label="New"
            value={newCount}
            href="/admin?status=NEW"
            active={selectedStatus === "NEW"}
          />

          <PipelineStat
            label="Reviewing"
            value={reviewingCount}
            href="/admin?status=REVIEWING"
            active={selectedStatus === "REVIEWING"}
          />

          <PipelineStat
            label="Shortlisted"
            value={shortlistedCount}
            href="/admin?status=SHORTLISTED"
            active={selectedStatus === "SHORTLISTED"}
          />

          <PipelineStat
            label="Meetings"
            value={meetingCount}
            href="/admin?status=MEETING"
            active={selectedStatus === "MEETING"}
          />

          <PipelineStat
            label="Due Diligence"
            value={dueDiligenceCount}
            href="/admin?status=DUE_DILIGENCE"
            active={selectedStatus === "DUE_DILIGENCE"}
          />

          <PipelineStat
            label="Partnered"
            value={partneredCount}
            href="/admin?status=PARTNERED"
            active={selectedStatus === "PARTNERED"}
          />

          <PipelineStat
            label="Declined"
            value={declinedCount}
            href="/admin?status=DECLINED"
            active={selectedStatus === "DECLINED"}
          />
        </section>

        <section
          className="admin-followup-strip"
          aria-label="Follow-up summary"
        >
          <FollowUpMetric
            label="Overdue follow-ups"
            value={overdueFollowUps}
            tone="overdue"
          />

          <FollowUpMetric
            label="Due today"
            value={todayFollowUps}
            tone="today"
          />

          <FollowUpMetric
            label="Upcoming"
            value={upcomingFollowUps}
            tone="upcoming"
          />
        </section>

        <section
          className="admin-filter-bar"
          aria-label="Application filters"
        >
          <div className="admin-filter-heading">
            <div>
              <span className="admin-filter-kicker">
                APPLICATION PIPELINE
              </span>
              <strong>
                {hasFilters
                  ? `${activeFilterCount} active filter${
                      activeFilterCount === 1 ? "" : "s"
                    }`
                  : "All opportunities"}
              </strong>
            </div>

            <span className="admin-results-label">
              {applications.length} shown / {total} total
            </span>
          </div>

          <form className="admin-filter-form" method="get">
            <input
              name="q"
              defaultValue={query}
              placeholder="Search founder, venture, email or industry"
              aria-label="Search applications"
            />

            <select
              name="status"
              defaultValue={selectedStatus}
              aria-label="Filter by status"
            >
              {statusOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>

            <select
              name="stage"
              defaultValue={selectedStage}
              aria-label="Filter by stage"
            >
              <option value="ALL">All stages</option>

              {Object.entries(stageLabels).map(
                ([value, label]) => (
                  <option value={value} key={value}>
                    {label}
                  </option>
                ),
              )}
            </select>

            <select
              name="industry"
              defaultValue={selectedIndustry}
              aria-label="Filter by industry"
            >
              <option value="">All industries</option>

              {industries.map((item) => (
                <option
                  value={item.industry}
                  key={item.industry}
                >
                  {item.industry}
                </option>
              ))}
            </select>

            <select
              name="followUp"
              defaultValue={selectedFollowUp}
              aria-label="Filter by follow-up"
            >
              {followUpOptions.map((option) => (
                <option
                  value={option.value}
                  key={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="admin-filter-submit"
            >
              Apply filters
            </button>

            {hasFilters && (
              <Link
                href="/admin"
                className="admin-clear-filter"
              >
                Clear all
              </Link>
            )}
          </form>
        </section>

        <section
          className="admin-table-wrap"
          aria-label="Applications"
        >
          {applications.length === 0 ? (
            <div className="admin-empty-state">
              <span className="admin-empty-kicker">
                NO MATCHES
              </span>

              <h2>No applications found.</h2>

              <p>
                Try changing your filters or search terms to see
                more opportunities.
              </p>

              {hasFilters && (
                <Link
                  href="/admin"
                  className="admin-empty-action"
                >
                  Clear filters
                </Link>
              )}
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Founder</th>
                  <th>Venture</th>
                  <th>Industry</th>
                  <th>Stage</th>
                  <th>Status</th>
                  <th>Follow-up</th>
                  <th>Applied</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {applications.map((application) => {
                  const followUp = getFollowUpState(
                    application.nextFollowUpAt,
                    now,
                  );

                  return (
                    <tr key={application.id}>
                      <td>
                        <Link
                          href={`/admin/applications/${application.id}`}
                          className="admin-founder-link"
                        >
                          {application.name}
                        </Link>

                        <span className="admin-secondary">
                          {application.email}
                        </span>
                      </td>

                      <td>
                        <Link
                          href={`/admin/applications/${application.id}`}
                          className="admin-venture-link"
                        >
                          {application.ventureName}
                        </Link>
                      </td>

                      <td>
                        <span className="admin-industry">
                          {application.industry}
                        </span>
                      </td>

                      <td>
                        <span className="admin-stage">
                          {stageLabels[application.stage]}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`admin-status admin-status-${application.status.toLowerCase()}`}
                        >
                          {statusLabels[application.status]}
                        </span>
                      </td>

                      <td>
                        {application.nextFollowUpAt ? (
                          <span
                            className={`admin-followup admin-followup-${followUp.tone}`}
                          >
                            <span className="admin-followup-dot" />

                            <span>
                              {followUp.label}

                              <small>
                                {formatDate(
                                  application.nextFollowUpAt,
                                )}
                              </small>
                            </span>
                          </span>
                        ) : (
                          <span className="admin-no-followup">
                            No follow-up
                          </span>
                        )}
                      </td>

                      <td>
                        <span className="admin-applied-date">
                          {formatDate(application.createdAt)}
                        </span>
                      </td>

                      <td className="admin-table-action-cell">
                        <Link
                          href={`/admin/applications/${application.id}`}
                          className="admin-view-link"
                        >
                          View
                          <span>↗</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </main>
  );
}

function PipelineStat({
  label,
  value,
  href,
  active = false,
}: {
  label: string;
  value: number;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`admin-stat ${active ? "is-active" : ""}`}
    >
      <span className="admin-stat-label">
        {label}
      </span>

      <strong className="admin-stat-value">
        {value}
      </strong>

      <span className="admin-stat-arrow">
        ↗
      </span>
    </Link>
  );
}

function FollowUpMetric({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "overdue" | "today" | "upcoming";
}) {
  return (
    <div
      className={`admin-followup-metric admin-followup-metric-${tone}`}
    >
      <span className="admin-followup-metric-label">
        {label}
      </span>

      <strong className="admin-followup-metric-value">
        {value}
      </strong>
    </div>
  );
}

function getFollowUpState(
  date: Date | null,
  now: Date,
): {
  label: string;
  tone: "overdue" | "today" | "upcoming";
} {
  if (!date) {
    return {
      label: "No follow-up",
      tone: "upcoming",
    };
  }

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date(startOfToday);
  endOfToday.setDate(endOfToday.getDate() + 1);

  if (date < startOfToday) {
    return {
      label: "Overdue",
      tone: "overdue",
    };
  }

  if (date >= startOfToday && date < endOfToday) {
    return {
      label: "Today",
      tone: "today",
    };
  }

  return {
    label: "Upcoming",
    tone: "upcoming",
  };
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
