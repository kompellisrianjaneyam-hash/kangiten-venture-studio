import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://kangitenventurestudio.in";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore the technology ventures and products being built by Kangiten Venture Studio.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${siteUrl}/portfolio`,
    siteName: "Kangiten Venture Studio",
    title: "Portfolio | Kangiten Venture Studio",
    description:
      "Explore the technology ventures and products being built by Kangiten Venture Studio.",
    images: [
      {
        url: "/brand/kangiten-venture-studio.png",
        width: 1200,
        height: 630,
        alt: "Kangiten Venture Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Kangiten Venture Studio",
    description:
      "Explore the technology ventures and products being built by Kangiten Venture Studio.",
    images: ["/brand/kangiten-venture-studio.png"],
  },
};

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${siteUrl}/portfolio#webpage`,
  url: `${siteUrl}/portfolio`,
  name: "Portfolio | Kangiten Venture Studio",
  description:
    "Explore the technology ventures and products being built by Kangiten Venture Studio.",
  isPartOf: {
    "@id": `${siteUrl}/#website`,
  },
  about: {
    "@id": `${siteUrl}/#organization`,
  },
  mainEntity: {
    "@type": "ItemList",
    "@id": `${siteUrl}/portfolio#portfolio`,
    name: "Kangiten Venture Studio Portfolio",
    numberOfItems: 0,
    itemListElement: [],
  },
  inLanguage: "en-IN",
};

export default function PortfolioPage() {
  return (
    <div className="inner-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema),
        }}
      />

      <section className="inner-hero">
        <div className="page-shell">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Portfolio
          </div>

          <h1>
            We are building
            <br />
            <span>the portfolio.</span>
          </h1>

          <p>
            Every venture we build will be a real product, a real technical
            challenge and a real story.
          </p>
        </div>
      </section>

      <section className="portfolio-empty-section">
        <div className="page-shell">
          <div className="portfolio-empty-visual">
            <div className="portfolio-visual-grid" />
            <span>PORTFOLIO / 001</span>
            <strong>BUILDING</strong>
          </div>

          <div className="portfolio-empty-copy">
            <span className="section-kicker">CURRENT STATE</span>

            <h2>Building from first principles.</h2>

            <p>
              We are intentionally not presenting manufactured case studies or
              invented venture stories. The portfolio will grow with the
              companies we build.
            </p>

            <Link href="/apply" className="text-link">
              Start a conversation
              <span>↗</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}