"use client";

import { useMemo, useState } from "react";

const statuses = [
  ["NEW", "New"],
  ["REVIEWING", "Reviewing"],
  ["SHORTLISTED", "Shortlisted"],
  ["CONTACTED", "Contacted"],
  ["MEETING", "Meeting"],
  ["DUE_DILIGENCE", "Due Diligence"],
  ["PARTNERED", "Partnered"],
  ["DECLINED", "Declined"],
] as const;

const quickStatuses = [
  ["REVIEWING", "Reviewing"],
  ["SHORTLISTED", "Shortlisted"],
  ["CONTACTED", "Contacted"],
  ["MEETING", "Meeting"],
  ["DUE_DILIGENCE", "Due Diligence"],
] as const;

function formatDateForInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function addDays(days: number) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);

  return formatDateForInput(date);
}

export default function ApplicationControls({
  id,
  initialStatus,
  initialNotes,
  initialNextFollowUp,
}: {
  id: string;
  initialStatus: string;
  initialNotes: string;
  initialNextFollowUp: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [notes, setNotes] = useState(initialNotes);
  const [nextFollowUp, setNextFollowUp] =
    useState(initialNextFollowUp);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | ""
  >("");

  const currentStatusLabel = useMemo(
    () =>
      statuses.find(([value]) => value === status)?.[1] ||
      status,
    [status],
  );

  function chooseStatus(nextStatus: string) {
    if (
      (nextStatus === "PARTNERED" || nextStatus === "DECLINED") &&
      nextStatus !== status
    ) {
      const label =
        nextStatus === "PARTNERED"
          ? "Partnered"
          : "Declined";

      const confirmed = window.confirm(
        `Move this application to ${label}? This will become part of the application's workflow history.`,
      );

      if (!confirmed) {
        return;
      }
    }

    setStatus(nextStatus);
    setMessage("");
    setMessageType("");
  }

  function setFollowUp(days: number) {
    setNextFollowUp(addDays(days));
    setMessage("");
    setMessageType("");
  }

  function clearFollowUp() {
    setNextFollowUp("");
    setMessage("");
    setMessageType("");
  }

  async function save() {
    if (saving) {
      return;
    }

    setSaving(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch(
        `/api/admin/applications/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            internalNotes: notes,
            nextFollowUpAt: nextFollowUp || null,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.error || "Unable to save changes.",
        );
        setMessageType("error");
        return;
      }

      setMessage("Changes saved.");
      setMessageType("success");
    } catch {
      setMessage("Unable to save changes.");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section
      className="admin-control-panel"
      aria-label="Application workflow"
    >
      <div className="admin-control-panel-heading">
        <span className="admin-control-eyebrow">
          INTERNAL
        </span>

        <div className="admin-control-title-row">
          <div>
            <h2>Workflow</h2>
            <p>
              Manage the application privately from the
              studio dashboard.
            </p>
          </div>

          <span className="admin-control-current-status">
            {currentStatusLabel}
          </span>
        </div>
      </div>

      <div className="admin-control-stack">
        <div className="admin-control-field">
          <div className="admin-control-label-row">
            <span>Status</span>
            <span className="admin-control-hint">
              Current pipeline position
            </span>
          </div>

          <select
            className="admin-control-input"
            value={status}
            onChange={(event) =>
              chooseStatus(event.target.value)
            }
          >
            {statuses.map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-quick-status">
          <div className="admin-control-label-row">
            <span>Quick status</span>
            <span className="admin-control-hint">
              Apply, then save
            </span>
          </div>

          <div className="admin-quick-status-list">
            {quickStatuses.map(([value, label]) => (
              <button
                type="button"
                key={value}
                className={`admin-quick-status-button ${
                  status === value ? "is-active" : ""
                }`}
                onClick={() => chooseStatus(value)}
                disabled={saving}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="admin-quick-status-list admin-quick-status-secondary">
            <button
              type="button"
              className={`admin-quick-status-button ${
                status === "PARTNERED" ? "is-active" : ""
              }`}
              onClick={() => chooseStatus("PARTNERED")}
              disabled={saving}
            >
              Partnered
            </button>

            <button
              type="button"
              className={`admin-quick-status-button ${
                status === "DECLINED" ? "is-active" : ""
              }`}
              onClick={() => chooseStatus("DECLINED")}
              disabled={saving}
            >
              Declined
            </button>
          </div>
        </div>

        <label className="admin-control-field">
          <div className="admin-control-label-row">
            <span>Internal Notes</span>
            <span className="admin-control-hint">
              Private to the studio
            </span>
          </div>

          <textarea
            className="admin-control-textarea"
            value={notes}
            onChange={(event) =>
              setNotes(event.target.value)
            }
            placeholder="What should the studio remember about this application?"
          />
        </label>

        <div className="admin-control-field">
          <div className="admin-control-label-row">
            <span>Next Follow-up</span>
            <span className="admin-control-hint">
              Keep the pipeline moving
            </span>
          </div>

          <input
            className="admin-control-input"
            type="date"
            value={nextFollowUp}
            onChange={(event) =>
              setNextFollowUp(event.target.value)
            }
          />

          <div className="admin-followup-actions">
            <button
              type="button"
              className="admin-followup-action"
              onClick={() => setFollowUp(0)}
              disabled={saving}
            >
              Today
            </button>

            <button
              type="button"
              className="admin-followup-action"
              onClick={() => setFollowUp(1)}
              disabled={saving}
            >
              Tomorrow
            </button>

            <button
              type="button"
              className="admin-followup-action"
              onClick={() => setFollowUp(7)}
              disabled={saving}
            >
              Next week
            </button>

            <button
              type="button"
              className="admin-followup-action admin-followup-action-muted"
              onClick={clearFollowUp}
              disabled={saving}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="admin-save-row">
          <button
            type="button"
            className="admin-save-button"
            onClick={save}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
            {!saving && <span>↗</span>}
          </button>

          {message && (
            <span
              className={`admin-save-message ${
                messageType === "error"
                  ? "is-error"
                  : "is-success"
              }`}
              role="status"
            >
              {message}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
