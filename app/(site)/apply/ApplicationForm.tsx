"use client";

import { FormEvent, useMemo, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  background: "",

  ventureName: "",
  website: "",
  industry: "",
  stage: "",

  problem: "",
  targetUsers: "",
  whyItMatters: "",

  solution: "",
  differentiation: "",

  technologyAreas: [] as string[],
  technologyRequirements: "",
  existingProduct: "",
  requiresRAndD: "",
  rdDescription: "",

  users: "",
  revenue: "",
  funding: "",
  traction: "",

  partnershipNeeds: "",
  expectedContribution: "",
  whyPartner: "",

  additionalNotes: "",
  consent: false,
};

const technologyOptions = [
  "AI",
  "Software",
  "Infrastructure",
  "Cloud",
  "Data",
  "Cybersecurity",
  "Hardware",
  "Robotics",
  "Other",
];

const steps = [
  {
    number: "01",
    title: "Founder",
    description: "Tell us who is behind the venture.",
  },
  {
    number: "02",
    title: "Venture",
    description: "Give us the basic context.",
  },
  {
    number: "03",
    title: "Problem",
    description: "Explain the problem worth solving.",
  },
  {
    number: "04",
    title: "Solution",
    description: "Show us what you are building.",
  },
  {
    number: "05",
    title: "Technology",
    description: "Describe the technical opportunity.",
  },
  {
    number: "06",
    title: "Traction",
    description: "Tell us what exists today.",
  },
  {
    number: "07",
    title: "Partnership",
    description: "Explain how we could work together.",
  },
  {
    number: "08",
    title: "Final",
    description: "Anything else we should know.",
  },
];

export default function ApplicationForm() {
  const [form, setForm] = useState(initialForm);
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const progress = useMemo(
    () => ((currentStep + 1) / steps.length) * 100,
    [currentStep]
  );

  const update = (
    key: keyof typeof initialForm,
    value: string | boolean
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    setError("");
  };

  const toggleTechnology = (value: string) => {
    setForm((current) => ({
      ...current,
      technologyAreas: current.technologyAreas.includes(value)
        ? current.technologyAreas.filter((item) => item !== value)
        : [...current.technologyAreas, value],
    }));

    setError("");
  };

  function validateStep(step: number) {
    switch (step) {
      case 0:
        if (!form.name.trim()) {
          return "Please enter your full name.";
        }

        if (!form.email.trim()) {
          return "Please enter your email address.";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
          return "Please enter a valid email address.";
        }

        if (!form.phone.trim()) {
          return "Please enter your phone number.";
        }

        if (form.linkedin.trim() && !isValidUrl(form.linkedin.trim())) {
          return "Please enter a valid LinkedIn URL.";
        }

        return "";

      case 1:
        if (!form.ventureName.trim()) {
          return "Please enter your venture or startup name.";
        }

        if (!form.industry.trim()) {
          return "Please enter the industry or category.";
        }

        if (!form.stage) {
          return "Please select the current venture stage.";
        }

        if (form.website.trim() && !isValidUrl(form.website.trim())) {
          return "Please enter a valid website URL.";
        }

        return "";

      case 2:
        if (!form.problem.trim()) {
          return "Please describe the problem you are solving.";
        }

        if (!form.targetUsers.trim()) {
          return "Please tell us who experiences this problem.";
        }

        return "";

      case 3:
        if (!form.solution.trim()) {
          return "Please describe what you are building.";
        }

        return "";

      case 4:
        if (form.technologyAreas.length === 0) {
          return "Please select at least one technology area.";
        }

        if (!form.technologyRequirements.trim()) {
          return "Please describe your technology requirements.";
        }

        if (
          form.requiresRAndD === "YES" &&
          !form.rdDescription.trim()
        ) {
          return "Please describe the R&D requirement.";
        }

        return "";

      case 5:
        return "";

      case 6:
        if (!form.partnershipNeeds.trim()) {
          return "Please tell us what you are looking for from Kangiten Venture Studio.";
        }

        return "";

      case 7:
        if (!form.consent) {
          return "Please confirm that the information provided is accurate.";
        }

        return "";

      default:
        return "";
    }
  }

  function nextStep() {
    const validationError = validateStep(currentStep);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  function previousStep() {
    setError("");

    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateStep(currentStep);

    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to submit your application."
        );
      }

      setSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="application-success">
        <div className="success-mark">✓</div>

        <span className="section-kicker">
          APPLICATION RECEIVED
        </span>

        <h2>We have your application.</h2>

        <p>
          We&apos;ll review what you&apos;re building and reach out if
          there is a fit.
        </p>

        <div className="success-contact">
          <a href="mailto:kangitensoftware@gmail.com">
            kangitensoftware@gmail.com
          </a>

          <a href="tel:+916303450609">
            +91 6303450609
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      className="application-form application-form-multistep"
      onSubmit={handleSubmit}
    >
      <div className="application-progress">
        <div className="application-progress-top">
          <div>
            <span className="application-progress-kicker">
              APPLICATION
            </span>

            <strong>
              {steps[currentStep].number} / 08
            </strong>
          </div>

          <span>
            {Math.round(progress)}% complete
          </span>
        </div>

        <div className="application-progress-track">
          <div
            className="application-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="application-step-list">
          {steps.map((step, index) => (
            <button
              key={step.number}
              type="button"
              className={
                index === currentStep
                  ? "application-step active"
                  : index < currentStep
                    ? "application-step complete"
                    : "application-step"
              }
              onClick={() => {
                if (index < currentStep) {
                  setCurrentStep(index);
                  setError("");
                }
              }}
              disabled={index > currentStep}
            >
              <span>{step.number}</span>
              <strong>{step.title}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="application-current-heading">
        <span>{steps[currentStep].number}</span>

        <div>
          <h2>{steps[currentStep].title}</h2>
          <p>{steps[currentStep].description}</p>
        </div>
      </div>

      {error && (
        <div
          className="form-error"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="application-step-content">
        {currentStep === 0 && (
          <div className="application-step-panel">
            <div className="form-grid">
              <Field
                label="Full Name"
                required
                value={form.name}
                onChange={(value) => update("name", value)}
                autoComplete="name"
              />

              <Field
                label="Email"
                type="email"
                required
                value={form.email}
                onChange={(value) => update("email", value)}
                autoComplete="email"
              />

              <Field
                label="Phone"
                required
                value={form.phone}
                onChange={(value) => update("phone", value)}
                autoComplete="tel"
              />

              <Field
                label="LinkedIn"
                value={form.linkedin}
                onChange={(value) => update("linkedin", value)}
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <Textarea
              label="Background"
              placeholder="Tell us briefly about your background, experience or previous work."
              value={form.background}
              onChange={(value) => update("background", value)}
            />
          </div>
        )}

        {currentStep === 1 && (
          <div className="application-step-panel">
            <div className="form-grid">
              <Field
                label="Venture / Startup Name"
                required
                value={form.ventureName}
                onChange={(value) =>
                  update("ventureName", value)
                }
              />

              <Field
                label="Website"
                value={form.website}
                onChange={(value) =>
                  update("website", value)
                }
                placeholder="https://..."
              />

              <Field
                label="Industry / Category"
                required
                value={form.industry}
                onChange={(value) =>
                  update("industry", value)
                }
              />

              <Select
                label="Current Stage"
                required
                value={form.stage}
                onChange={(value) => update("stage", value)}
                options={[
                  ["IDEA", "Idea"],
                  ["PROTOTYPE", "Prototype"],
                  ["MVP", "MVP"],
                  ["EARLY_USERS", "Early Users"],
                  ["REVENUE", "Revenue"],
                  ["SCALING", "Scaling"],
                ]}
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="application-step-panel">
            <Textarea
              label="What problem are you solving?"
              required
              value={form.problem}
              onChange={(value) => update("problem", value)}
              placeholder="Describe the problem clearly. What is broken, inefficient or missing today?"
            />

            <Textarea
              label="Who experiences this problem?"
              required
              value={form.targetUsers}
              onChange={(value) =>
                update("targetUsers", value)
              }
              placeholder="Who is affected by this problem and who would use the solution?"
            />

            <Textarea
              label="Why does this problem matter?"
              value={form.whyItMatters}
              onChange={(value) =>
                update("whyItMatters", value)
              }
              placeholder="What makes this problem worth solving now?"
            />
          </div>
        )}

        {currentStep === 3 && (
          <div className="application-step-panel">
            <Textarea
              label="What are you building?"
              required
              value={form.solution}
              onChange={(value) => update("solution", value)}
              placeholder="Explain the product, platform, system or technology you want to build."
            />

            <Textarea
              label="What makes your approach different?"
              value={form.differentiation}
              onChange={(value) =>
                update("differentiation", value)
              }
              placeholder="What is different about your approach, technology or insight?"
            />
          </div>
        )}

        {currentStep === 4 && (
          <div className="application-step-panel">
            <div className="field">
              <label>
                Technology areas <span>*</span>
              </label>

              <div className="technology-options">
                {technologyOptions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={
                      form.technologyAreas.includes(option)
                        ? "technology-option active"
                        : "technology-option"
                    }
                    onClick={() => toggleTechnology(option)}
                    aria-pressed={form.technologyAreas.includes(
                      option
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <small className="field-help">
                Select every area relevant to what you are building.
              </small>
            </div>

            <Textarea
              label="Technology requirements"
              required
              value={form.technologyRequirements}
              onChange={(value) =>
                update("technologyRequirements", value)
              }
              placeholder="What technology, engineering or infrastructure do you need?"
            />

            <Textarea
              label="What has already been built?"
              value={form.existingProduct}
              onChange={(value) =>
                update("existingProduct", value)
              }
              placeholder="Prototype, MVP, architecture, research, demo, codebase, or nothing yet."
            />

            <Select
              label="Does this require significant R&D?"
              value={form.requiresRAndD}
              onChange={(value) =>
                update("requiresRAndD", value)
              }
              options={[
                ["YES", "Yes"],
                ["NO", "No"],
                ["UNSURE", "Not sure yet"],
              ]}
            />

            <Textarea
              label="R&D description"
              value={form.rdDescription}
              onChange={(value) =>
                update("rdDescription", value)
              }
              placeholder="If significant R&D is involved, describe the technical challenge."
            />
          </div>
        )}

        {currentStep === 5 && (
          <div className="application-step-panel">
            <div className="form-grid">
              <Field
                label="Current users"
                value={form.users}
                onChange={(value) => update("users", value)}
              />

              <Field
                label="Revenue"
                value={form.revenue}
                onChange={(value) => update("revenue", value)}
              />

              <Field
                label="Funding"
                value={form.funding}
                onChange={(value) => update("funding", value)}
              />

              <Field
                label="Other traction"
                value={form.traction}
                onChange={(value) => update("traction", value)}
              />
            </div>

            <div className="application-context-note">
              <span>NO TRACTION YET?</span>
              <p>
                That&apos;s okay. Tell us honestly where you are.
                We care about the problem, the insight and the
                technical opportunity too.
              </p>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="application-step-panel">
            <Textarea
              label="What are you looking for from Kangiten Venture Studio?"
              required
              value={form.partnershipNeeds}
              onChange={(value) =>
                update("partnershipNeeds", value)
              }
              placeholder="What do you need help building or solving?"
            />

            <Textarea
              label="What would you expect the studio to contribute?"
              value={form.expectedContribution}
              onChange={(value) =>
                update("expectedContribution", value)
              }
              placeholder="Engineering, product, AI, infrastructure, R&D, technical strategy, or something else?"
            />

            <Textarea
              label="Why do you want a technical venture partner?"
              value={form.whyPartner}
              onChange={(value) =>
                update("whyPartner", value)
              }
              placeholder="Why does this partnership model make sense for your venture?"
            />
          </div>
        )}

        {currentStep === 7 && (
          <div className="application-step-panel">
            <Textarea
              label="Anything else we should know?"
              value={form.additionalNotes}
              onChange={(value) =>
                update("additionalNotes", value)
              }
              placeholder="Anything important that does not fit elsewhere in the application."
            />

            <label className="consent-field">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(event) =>
                  update("consent", event.target.checked)
                }
              />

              <span>
                I confirm that the information provided is
                accurate.
              </span>
            </label>

            <div className="application-submit-note">
              <span>READY TO SUBMIT?</span>
              <p>
                We&apos;ll review the application and contact you
                if there is a potential fit.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="application-navigation">
        <div>
          {currentStep > 0 && (
            <button
              type="button"
              className="application-back-button"
              onClick={previousStep}
              disabled={submitting}
            >
              <span>←</span>
              Back
            </button>
          )}
        </div>

        <div className="application-navigation-right">
          <span className="application-step-counter">
            Step {currentStep + 1} of {steps.length}
          </span>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              className="button button-primary application-next-button"
              onClick={nextStep}
            >
              Continue
              <span>→</span>
            </button>
          ) : (
            <button
              type="submit"
              className="button button-primary application-next-button"
              disabled={submitting}
            >
              {submitting
                ? "Submitting..."
                : "Submit Application"}

              {!submitting && <span>↗</span>}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div className="field">
      <label>
        {label}
        {required && <span>*</span>}
      </label>

      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  required = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="field">
      <label>
        {label}
        {required && <span>*</span>}
      </label>

      <textarea
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[][];
  required?: boolean;
}) {
  return (
    <div className="field">
      <label>
        {label}
        {required && <span>*</span>}
      </label>

      <select
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Select...</option>

        {options.map(([valueOption, labelOption]) => (
          <option
            value={valueOption}
            key={valueOption}
          >
            {labelOption}
          </option>
        ))}
      </select>
    </div>
  );
}
