import type { Metadata } from "next";
import Reveal from "../components/Reveal";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how Kangiten Venture Studio works with founders from initial vision and evaluation through research, engineering, launch and technical scale.",
  alternates: {
    canonical: "/how-it-works",
  },
  openGraph: {
    title: "How It Works | Kangiten Venture Studio",
    description:
      "See how Kangiten Venture Studio works with founders from initial vision and evaluation through research, engineering, launch and technical scale.",
    url: "/how-it-works",
    type: "website",
  },
};

const stages = [
  {
    number: "01",
    code: "ENTRY / 001",
    title: "Apply",
    short: "Bring the vision.",
    description:
      "Tell us what you want to build, the problem behind it, and why the opportunity matters.",
  },
  {
    number: "02",
    code: "DISCOVERY / 002",
    title: "Evaluate",
    short: "Understand the opportunity.",
    description:
      "We explore the problem, users, market, technical complexity and the potential path forward.",
  },
  {
    number: "03",
    code: "PARTNERSHIP / 003",
    title: "Partner",
    short: "Become technical partners.",
    description:
      "When there is a fit, we work alongside you as the technical venture partner.",
  },
  {
    number: "04",
    code: "R&D / 004",
    title: "Research & Design",
    short: "Define what should exist.",
    description:
      "We shape the product, architecture, technical direction, experiments and first system.",
  },
  {
    number: "05",
    code: "ENGINEERING / 005",
    title: "Build",
    short: "Turn the system real.",
    description:
      "Engineering turns the concept into a functioning product with the foundations required to grow.",
  },
  {
    number: "06",
    code: "DEPLOYMENT / 006",
    title: "Launch",
    short: "Enter the real world.",
    description:
      "The product moves beyond development and begins interacting with real users, feedback and reality.",
  },
  {
    number: "07",
    code: "EVOLUTION / 007",
    title: "Scale",
    short: "Grow the technology.",
    description:
      "Product, infrastructure and technical capabilities evolve with the venture and its users.",
  },
];

const howItWorksSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://kangitenventurestudio.in/how-it-works#webpage",

  url: "https://kangitenventurestudio.in/how-it-works",

  name: "How It Works | Kangiten Venture Studio",

  description:
    "See how Kangiten Venture Studio works with founders from initial vision and evaluation through research, engineering, launch and technical scale.",

  isPartOf: {
    "@id": "https://kangitenventurestudio.in/#website",
  },

  about: {
    "@id": "https://kangitenventurestudio.in/#organization",
  },

  mainEntity: {
    "@type": "HowTo",
    "@id": "https://kangitenventurestudio.in/how-it-works#process",

    name: "How Kangiten Venture Studio works with founders",

    description:
      "A seven-stage process covering application, evaluation, partnership, research and design, engineering, launch and technical evolution.",

    step: stages.map((stage) => ({
      "@type": "HowToStep",
      position: Number(stage.number),
      name: stage.title,
      text: stage.description,
      url: `https://kangitenventurestudio.in/how-it-works#stage-${stage.number}`,
    })),
  },

  inLanguage: "en-IN",
};

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howItWorksSchema),
        }}
      />

      <div className="how-page">
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="how-hero">
          <div className="how-hero-grid" aria-hidden="true" />
          <div className="how-hero-axis" aria-hidden="true" />

          <div className="page-shell how-hero-inner">
            <Reveal className="how-hero-top">
              <div className="how-eyebrow">
                <span className="how-status-dot" />
                HOW IT WORKS
              </div>

              <span className="how-hero-code">
                VENTURE SYSTEM / 07 STAGES
              </span>
            </Reveal>

            <div className="how-hero-main">
              <Reveal>
                <div className="how-hero-title-wrap">
                  <span className="how-system-label">SYSTEM / PROCESS</span>

                  <h1>
                    From vision
                    <br />
                    <em>to technology.</em>
                  </h1>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="how-hero-aside">
                <div className="how-aside-line" />

                <p>
                  We work from the underlying problem outward — understanding
                  the opportunity before defining the technology, then building
                  the systems required to make the venture real.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.18} className="how-hero-footer">
              <span>VISION</span>
              <div />
              <span>RESEARCH</span>
              <span>ENGINEERING</span>
              <span>EVOLUTION</span>
            </Reveal>
          </div>
        </section>

        {/* =====================================================
            PROCESS
        ===================================================== */}

        <section className="how-process">
          <div className="page-shell">
            <Reveal>
              <div className="how-process-heading">
                <div className="how-index">
                  <span>01</span>
                  <small>THE PROCESS</small>
                </div>

                <div>
                  <span className="how-kicker">FROM IDEA TO COMPANY</span>

                  <h2>
                    We do not build
                    <br />
                    <em>before we understand.</em>
                  </h2>
                </div>
              </div>
            </Reveal>

            <div className="how-stage-list">
              {stages.map((stage, index) => (
                <Reveal
                  key={stage.number}
                  delay={index * 0.04}
                  className="how-stage"
                >
                  <div
                    id={`stage-${stage.number}`}
                    className="how-stage-number"
                  >
                    {stage.number}
                  </div>

                  <div className="how-stage-main">
                    <span className="how-stage-code">{stage.code}</span>

                    <h2>{stage.title}</h2>

                    <p className="how-stage-short">{stage.short}</p>

                    <p className="how-stage-description">
                      {stage.description}
                    </p>
                  </div>

                  <div className="how-stage-arrow" aria-hidden="true">
                    ↗
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            PRINCIPLE
        ===================================================== */}

        <section className="how-principle">
          <div className="page-shell">
            <Reveal>
              <span className="how-kicker">THE PRINCIPLE</span>

              <h2>
                The process changes
                <br />
                <em>with the problem.</em>
              </h2>

              <p>
                There is no fixed technology package or predetermined path. A
                software product, an AI system, an infrastructure platform and
                a research-heavy venture may require completely different
                approaches.
              </p>
            </Reveal>
          </div>
        </section>

        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="how-cta">
          <div className="page-shell">
            <Reveal>
              <span className="how-kicker">READY TO START?</span>

              <h2>
                Bring the problem.
                <br />
                <em>We&apos;ll explore the technology.</em>
              </h2>

              <a href="/apply" className="button button-primary">
                Apply to Partner
                <span>↗</span>
              </a>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}