import type { Metadata } from "next";
import Reveal from "../components/Reveal";

const siteUrl = "https://kangitenventurestudio.in";

export const metadata: Metadata = {
  title: "What We Build",
  description:
    "Explore what Kangiten Venture Studio builds across software, AI, infrastructure, distributed systems and advanced technology R&D.",
  alternates: {
    canonical: "/what-we-build",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${siteUrl}/what-we-build`,
    siteName: "Kangiten Venture Studio",
    title: "What We Build | Kangiten Venture Studio",
    description:
      "Explore what Kangiten Venture Studio builds across software, AI, infrastructure, distributed systems and advanced technology R&D.",
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
    title: "What We Build | Kangiten Venture Studio",
    description:
      "Explore what Kangiten Venture Studio builds across software, AI, infrastructure, distributed systems and advanced technology R&D.",
    images: ["/brand/kangiten-venture-studio.png"],
  },
};

const areas = [
  {
    number: "01",
    title: "Software",
    text: "Web platforms, mobile products, SaaS and complex product engineering.",
  },
  {
    number: "02",
    title: "AI & Intelligence",
    text: "AI systems, agents, intelligent products and applied machine intelligence.",
  },
  {
    number: "03",
    title: "Infrastructure",
    text: "Cloud platforms, distributed systems, compute and developer infrastructure.",
  },
  {
    number: "04",
    title: "Advanced Technology",
    text: "Experimental products and technically difficult ventures requiring serious R&D.",
  },
];

const whatWeBuildSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${siteUrl}/what-we-build#webpage`,
  url: `${siteUrl}/what-we-build`,
  name: "What We Build | Kangiten Venture Studio",
  description:
    "Explore what Kangiten Venture Studio builds across software, AI, infrastructure, distributed systems and advanced technology R&D.",
  isPartOf: {
    "@id": `${siteUrl}/#website`,
  },
  about: {
    "@id": `${siteUrl}/#organization`,
  },
  mainEntity: {
    "@type": "ItemList",
    "@id": `${siteUrl}/what-we-build#capabilities`,
    name: "Technology capabilities at Kangiten Venture Studio",
    itemListElement: areas.map((area, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: area.title,
      description: area.text,
    })),
  },
  inLanguage: "en-IN",
};

export default function WhatWeBuildPage() {
  return (
    <div className="inner-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(whatWeBuildSchema),
        }}
      />

      <section className="inner-hero">
        <div className="page-shell">
          <Reveal>
            <div className="eyebrow inner-eyebrow">
              <span className="eyebrow-dot" />
              What We Build
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1>
              Technology
              <br />
              <span>without a fixed ceiling.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p>
              The studio can operate across products, intelligence,
              infrastructure and technically ambitious research.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="inner-section section-light">
        <div className="page-shell">
          <div className="inner-capabilities">
            {areas.map((area, index) => (
              <Reveal
                key={area.number}
                delay={index * 0.06}
                className="inner-capability"
              >
                <span>{area.number}</span>
                <h2>{area.title}</h2>
                <p>{area.text}</p>
                <b>↗</b>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="inner-section">
        <div className="page-shell">
          <Reveal>
            <div className="inner-principle">
              <span className="section-kicker">OUR PRINCIPLE</span>

              <h2>
                Technology follows
                <br />
                <em>the problem.</em>
              </h2>

              <p>
                We do not begin with a fixed stack or predefined service
                package. The architecture, engineering approach and research
                process are shaped around what the venture actually needs.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="inner-cta">
        <div className="page-shell">
          <Reveal>
            <span className="section-kicker">HAVE AN IDEA?</span>

            <h2>
              Let&apos;s find out
              <br />
              <em>what it needs.</em>
            </h2>

            <a href="/apply" className="button button-primary">
              Apply to Partner
              <span>↗</span>
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}