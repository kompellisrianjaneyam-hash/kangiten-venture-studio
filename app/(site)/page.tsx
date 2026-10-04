import HeroScene from "./components/HeroScene";
import Reveal from "./components/Reveal";

const capabilities = [
  {
    number: "01",
    title: "Software",
    description:
      "Web platforms, mobile products, SaaS and complex product engineering.",
    tag: "PRODUCT ENGINEERING",
  },
  {
    number: "02",
    title: "AI & Intelligence",
    description:
      "AI systems, agents, intelligent products and applied machine intelligence.",
    tag: "INTELLIGENCE",
  },
  {
    number: "03",
    title: "Infrastructure",
    description:
      "Cloud platforms, distributed systems, compute and developer infrastructure.",
    tag: "SYSTEMS",
  },
  {
    number: "04",
    title: "Advanced Technology",
    description:
      "Experimental products and technically difficult ventures requiring serious R&D.",
    tag: "R&D",
  },
];

const process = [
  ["01", "Apply", "Tell us what you want to build."],
  [
    "02",
    "Evaluate",
    "We explore the problem, opportunity and technical reality.",
  ],
  [
    "03",
    "Partner",
    "If there is a fit, we become a technical venture partner.",
  ],
  [
    "04",
    "Research & Design",
    "We shape the product, architecture and technical direction.",
  ],
  [
    "05",
    "Build",
    "Engineering turns the concept into a working system.",
  ],
  [
    "06",
    "Launch",
    "The product moves from prototype to the real world.",
  ],
  [
    "07",
    "Scale",
    "Infrastructure, product and technology evolve with the venture.",
  ],
];

export default function HomePage() {
  return (
    <>
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="hero-scene" aria-hidden="true">
          <HeroScene />
        </div>

        <div className="hero-content page-shell">
          <Reveal>
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              A venture studio by Kangiten Softwares
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="hero-title">
              <div className="hero-title-row">
                You bring the <em>vision.</em>
              </div>

              <div className="hero-title-row hero-title-row-second">
                We build the <strong>technology.</strong>
              </div>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="hero-copy">
              Kangiten Venture Studio partners with ambitious founders to turn
              ideas into real technology companies — from software and AI
              products to technically ambitious ventures requiring serious R&D.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="hero-actions">
              <a className="button button-primary" href="/apply">
                Apply to Partner
                <span>↗</span>
              </a>

              <a className="button button-secondary" href="/how-it-works">
                How It Works
                <span>→</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="hero-meta">
              <span>SOFTWARE</span>
              <i aria-hidden="true" />
              <span>AI</span>
              <i aria-hidden="true" />
              <span>INFRASTRUCTURE</span>
              <i aria-hidden="true" />
              <span>R&amp;D</span>
            </div>
          </Reveal>
        </div>

        <div className="hero-scroll" aria-hidden="true">
          <span>Scroll to explore</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* =========================================================
          THE GAP
      ========================================================= */}

      <section className="gap-section section-light">
        <div className="page-shell gap-grid">
          <Reveal className="section-index">
            <span>01</span>
            <span>THE GAP</span>
          </Reveal>

          <Reveal className="gap-content" delay={0.08}>
            <h2>
              Great ideas shouldn&apos;t fail because{" "}
              <span>technology is difficult to build.</span>
            </h2>

            <div className="gap-columns">
              <p>
                A founder can see the product long before the technical system
                exists. Between those two points sits architecture,
                engineering, infrastructure, product design, AI, security and
                thousands of decisions.
              </p>

              <p>
                That technical gap is where we work. We take ambitious ideas
                seriously, understand what has to exist underneath them, and
                help turn the vision into an actual technology company.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          OUR MODEL
      ========================================================= */}

      <section className="model-section">
        <div className="page-shell model-grid">
          <Reveal className="section-index section-index-light">
            <span>02</span>
            <span>OUR MODEL</span>
          </Reveal>

          <Reveal className="model-content" delay={0.08}>
            <div className="section-kicker">THE RELATIONSHIP CHANGES</div>

            <h2>
              Not an agency.
              <br />
              <span>A technical venture partner.</span>
            </h2>

            <p>
              We do not simply receive a specification and return software.
              The studio works alongside founders from the earliest technical
              questions through product development, research, launch and
              scale.
            </p>

            <div className="model-line">
              <span>YOUR VISION</span>

              <div className="model-line-track">
                <div className="model-line-progress" />
              </div>

              <span>REAL COMPANY</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          CAPABILITIES
      ========================================================= */}

      <section className="capabilities-section section-light">
        <div className="page-shell">
          <Reveal className="section-heading">
            <div className="section-index">
              <span>03</span>
              <span>CAPABILITIES</span>
            </div>

            <div>
              <div className="section-kicker">WHAT WE BUILD</div>

              <h2>
                From digital products
                <br />
                to <span>deep systems.</span>
              </h2>
            </div>
          </Reveal>

          <div className="capability-system">
            {capabilities.map((item, index) => (
              <Reveal
                key={item.number}
                delay={index * 0.06}
                className="capability-row"
              >
                <div className="capability-number">{item.number}</div>

                <div className="capability-main">
                  <span className="capability-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                </div>

                <p>{item.description}</p>

                <div className="capability-arrow">↗</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          AMBITION SPECTRUM
      ========================================================= */}

      <section className="spectrum-section">
        <div className="page-shell">
          <Reveal className="spectrum-header">
            <div className="section-index section-index-light">
              <span>04</span>
              <span>AMBITION SPECTRUM</span>
            </div>

            <div>
              <div className="section-kicker light">THE RANGE</div>

              <h2>
                Some products take a weekend.
                <br />
                <span>Others take months of R&amp;D.</span>
              </h2>
            </div>
          </Reveal>

          <div className="spectrum-system">
            {[
              ["01", "Software", "PRODUCTS"],
              ["02", "AI", "INTELLIGENCE"],
              ["03", "Infrastructure", "SYSTEMS"],
              ["04", "Advanced Technology", "RESEARCH"],
            ].map(([number, title, label], index) => (
              <Reveal
                key={number}
                delay={index * 0.07}
                className="spectrum-item"
              >
                <div className="spectrum-number">{number}</div>

                <div className="spectrum-node">
                  <span />
                </div>

                <div className="spectrum-text">
                  <span>{label}</span>
                  <strong>{title}</strong>
                </div>

                {index < 3 && <div className="spectrum-connector" />}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}

      <section className="process-section section-light">
        <div className="page-shell">
          <Reveal className="section-heading process-heading">
            <div className="section-index">
              <span>05</span>
              <span>HOW IT WORKS</span>
            </div>

            <div>
              <div className="section-kicker">FROM IDEA TO SYSTEM</div>

              <h2>
                A deliberate path from
                <br />
                <span>vision to reality.</span>
              </h2>
            </div>
          </Reveal>

          <div className="process-grid">
            {process.map(([number, title, description], index) => (
              <Reveal
                key={number}
                delay={index * 0.05}
                className="process-item"
              >
                <div className="process-top">
                  <span>{number}</span>
                  {index < process.length - 1 && <i />}
                </div>

                <h3>{title}</h3>
                <p>{description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          PORTFOLIO
      ========================================================= */}

      <section className="portfolio-section">
        <div className="page-shell portfolio-inner">
          <Reveal className="section-index section-index-light">
            <span>06</span>
            <span>PORTFOLIO</span>
          </Reveal>

          <Reveal className="portfolio-content" delay={0.08}>
            <div className="portfolio-orbit" aria-hidden="true">
              <div className="portfolio-orbit-ring portfolio-orbit-ring-one" />
              <div className="portfolio-orbit-ring portfolio-orbit-ring-two" />

              <div className="portfolio-core">
                <span>BUILDING</span>
              </div>
            </div>

            <div>
              <div className="section-kicker light">CURRENT STATE</div>

              <h2>
                We are building
                <br />
                <span>the portfolio.</span>
              </h2>

              <p>
                Every venture we build will be a real product, a real technical
                challenge and a real story. There are no manufactured case
                studies here.
              </p>

              <a className="text-link" href="/apply">
                Start a conversation
                <span>↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="final-cta">
        <div className="final-cta-grid" />

        <div className="page-shell final-cta-content">
          <Reveal>
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              KANGITEN VENTURE STUDIO
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2>
              Have the vision?
              <br />
              <span>Let&apos;s build it.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <a className="button button-primary button-large" href="/apply">
              Apply to Partner
              <span>↗</span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}