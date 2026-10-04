import type { Metadata } from "next";
import Reveal from "../components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Kangiten Venture Studio, the venture-building arm of Kangiten Softwares, and how we work with ambitious founders to build technology companies.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Kangiten Venture Studio",
    description:
      "Learn about Kangiten Venture Studio, the venture-building arm of Kangiten Softwares, and how we work with ambitious founders to build technology companies.",
    url: "/about",
    type: "website",
  },
};

const principles = [
  {
    number: "01",
    title: "Ambition comes first.",
    text: "The technical difficulty of an idea should not decide whether the idea gets explored.",
  },
  {
    number: "02",
    title: "Technology follows the problem.",
    text: "We do not force ventures into predefined technology stacks or service packages.",
  },
  {
    number: "03",
    title: "Research is part of building.",
    text: "When the answer does not already exist, experimentation and R&D become part of the product process.",
  },
  {
    number: "04",
    title: "The first product is not the destination.",
    text: "We think beyond the first release toward the systems, infrastructure and capabilities the company may eventually need.",
  },
];

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://kangitenventurestudio.in/about#webpage",

  url: "https://kangitenventurestudio.in/about",

  name: "About | Kangiten Venture Studio",

  description:
    "Learn about Kangiten Venture Studio, the venture-building arm of Kangiten Softwares, and how we work with ambitious founders to build technology companies.",

  isPartOf: {
    "@id": "https://kangitenventurestudio.in/#website",
  },

  about: {
    "@id": "https://kangitenventurestudio.in/#organization",
  },

  inLanguage: "en-IN",
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema),
        }}
      />

      <div className="about-page">
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="about-hero">
          <div className="about-hero-grid" aria-hidden="true" />

          <div className="about-hero-mark" aria-hidden="true">
            <div className="about-mark-ring about-mark-ring-one" />
            <div className="about-mark-ring about-mark-ring-two" />
            <div className="about-mark-core" />
          </div>

          <div className="page-shell about-hero-inner">
            <Reveal className="about-hero-top">
              <div className="about-eyebrow">
                <span className="about-status-dot" />
                ABOUT KANGITEN VENTURE STUDIO
              </div>

              <span>BY KANGITEN SOFTWARES</span>
            </Reveal>

            <div className="about-hero-main">
              <Reveal>
                <div>
                  <span className="about-system-label">STUDIO / 001</span>

                  <h1>
                    We build
                    <br />
                    <em>what comes next.</em>
                  </h1>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="about-hero-aside">
                <div className="about-aside-line" />

                <p>
                  Kangiten Venture Studio is the venture-building arm of
                  Kangiten Softwares, created to work with ambitious founders
                  where technology is fundamental to the company being built.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.18} className="about-hero-footer">
              <span>VISION</span>
              <div />
              <span>TECHNOLOGY</span>
              <span>COMPANY</span>
            </Reveal>
          </div>
        </section>

        {/* =====================================================
            THE IDEA
        ===================================================== */}

        <section className="about-idea">
          <div className="page-shell about-idea-grid">
            <Reveal>
              <div className="about-index">
                <span>01</span>
                <small>THE IDEA</small>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="about-idea-copy">
                <span className="about-kicker">WHY THE STUDIO EXISTS</span>

                <h2>
                  Some companies are
                  <br />
                  <em>technology companies first.</em>
                </h2>

                <p>
                  For these ventures, technology is not simply a layer added
                  after the business idea. It is part of the product, the
                  operating model or the opportunity itself.
                </p>

                <p>
                  Kangiten Venture Studio exists to help founders navigate
                  that technical journey — from understanding the opportunity
                  and designing the first system to building, launching and
                  evolving the technology.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =====================================================
            PRINCIPLES
        ===================================================== */}

        <section className="about-principles">
          <div className="page-shell">
            <Reveal className="about-section-heading">
              <div>
                <span className="section-kicker">02 / PRINCIPLES</span>

                <h2>
                  How we
                  <br />
                  <em>think.</em>
                </h2>
              </div>

              <p>
                The studio is built around a simple idea: ambitious
                technology requires both product thinking and serious
                engineering.
              </p>
            </Reveal>

            <div className="about-principles-list">
              {principles.map((principle, index) => (
                <Reveal
                  key={principle.number}
                  delay={index * 0.06}
                  className="about-principle"
                >
                  <span className="about-principle-number">
                    {principle.number}
                  </span>

                  <h3>{principle.title}</h3>

                  <p>{principle.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            RELATIONSHIP
        ===================================================== */}

        <section className="about-relationship">
          <div className="page-shell about-relationship-grid">
            <Reveal>
              <div>
                <span className="section-kicker">03 / THE RELATIONSHIP</span>

                <h2>
                  More than
                  <br />
                  <em>execution.</em>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="about-relationship-copy">
                <p>
                  We are not positioned as a conventional software vendor.
                  When we partner with a venture, the goal is to understand
                  the company being built and help determine what technology
                  should exist to support it.
                </p>

                <p>
                  That can mean product engineering, AI systems,
                  infrastructure, experimentation or deeper technical
                  research depending on the problem.
                </p>

                <a className="text-link" href="/how-it-works">
                  See how we work
                  <span>↗</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <section className="about-final">
          <div className="page-shell about-final-inner">
            <Reveal>
              <span className="section-kicker">04 / START HERE</span>

              <h2>
                Have the vision?
                <br />
                <em>Let&apos;s build it.</em>
              </h2>

              <a className="button button-primary" href="/apply">
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