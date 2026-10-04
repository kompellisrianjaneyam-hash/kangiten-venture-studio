import type { Metadata } from "next";
import ApplicationForm from "./ApplicationForm";

const siteUrl = "https://kangitenventurestudio.in";

export const metadata: Metadata = {
  title: "Apply to Partner",
  description:
    "Tell Kangiten Venture Studio what you are building, the problem behind it and where technology fits into the opportunity.",
  alternates: {
    canonical: "/apply",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${siteUrl}/apply`,
    siteName: "Kangiten Venture Studio",
    title: "Apply to Partner | Kangiten Venture Studio",
    description:
      "Tell Kangiten Venture Studio what you are building, the problem behind it and where technology fits into the opportunity.",
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
    title: "Apply to Partner | Kangiten Venture Studio",
    description:
      "Tell Kangiten Venture Studio what you are building, the problem behind it and where technology fits into the opportunity.",
    images: ["/brand/kangiten-venture-studio.png"],
  },
};

const applyPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${siteUrl}/apply#webpage`,
  url: `${siteUrl}/apply`,
  name: "Apply to Partner | Kangiten Venture Studio",
  description:
    "Tell Kangiten Venture Studio what you are building, the problem behind it and where technology fits into the opportunity.",
  isPartOf: {
    "@id": `${siteUrl}/#website`,
  },
  about: {
    "@id": `${siteUrl}/#organization`,
  },
  mainEntity: {
    "@id": `${siteUrl}/#organization`,
  },
  inLanguage: "en-IN",
};

export default function ApplyPage() {
  return (
    <div className="apply-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(applyPageSchema),
        }}
      />

      <section className="apply-intro">
        <div className="page-shell apply-intro-grid">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Apply to Partner
            </div>

            <h1>
              Have the <span>vision?</span>
              <br />
              Let&apos;s build it.
            </h1>

            <p>
              Tell us what you are building, the problem behind it and where
              technology fits into the opportunity.
            </p>

            <div className="apply-contact">
              <span>Prefer to talk directly?</span>

              <a href="mailto:kangitensoftware@gmail.com">
                kangitensoftware@gmail.com
              </a>

              <a href="tel:+916303450609">+91 6303450609</a>
            </div>
          </div>

          <div className="application-visual">
            <div className="application-visual-grid" />

            <div className="application-visual-card">
              <span>VENTURE STUDIO</span>
              <strong>IDEA → COMPANY</strong>
              <small>PRODUCT · ENGINEERING · AI · R&amp;D</small>
            </div>
          </div>
        </div>
      </section>

      <section className="application-section">
        <div className="page-shell application-layout">
          <div className="application-sidebar">
            <span className="section-kicker">START HERE</span>

            <h2>Bring the idea.</h2>

            <p>
              This first application gives us enough context to understand the
              opportunity. If there is a fit, we&apos;ll contact you and work
              through the remaining details together.
            </p>
          </div>

          <ApplicationForm />
        </div>
      </section>
    </div>
  );
}