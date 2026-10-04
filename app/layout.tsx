import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://kangitenventurestudio.in";
const siteName = "Kangiten Venture Studio";
const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${siteName} | Technical Venture Partner`,
    template: `%s | ${siteName}`,
  },

  description:
    "Kangiten Venture Studio partners with ambitious founders to build technology companies across software, AI, infrastructure and advanced technology.",

  applicationName: siteName,

  keywords: [
    "Kangiten Venture Studio",
    "venture studio",
    "technical venture partner",
    "technology venture studio",
    "startup venture studio",
    "AI venture studio",
    "software venture studio",
    "technology partner",
    "startup technology partner",
    "AI",
    "software",
    "infrastructure",
    "R&D",
  ],

  authors: [
    {
      name: siteName,
    },
  ],

  creator: siteName,
  publisher: "Kangiten Softwares",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName,
    title: `${siteName} | Technical Venture Partner`,
    description: "You bring the vision. We build the technology.",
    images: [
      {
        url: "/brand/kangiten-venture-studio.png",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Technical Venture Partner`,
    description: "You bring the vision. We build the technology.",
    images: ["/brand/kangiten-venture-studio.png"],
  },

  icons: {
    icon: "/brand/kangiten-icon.png",
    shortcut: "/brand/kangiten-icon.png",
    apple: "/brand/kangiten-icon.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId,

  name: siteName,

  alternateName: [
    "Kangiten Venture Studio",
  ],

  url: siteUrl,

  logo: {
    "@type": "ImageObject",
    "@id": `${siteUrl}/#logo`,
    url: `${siteUrl}/brand/kangiten-icon.png`,
    contentUrl: `${siteUrl}/brand/kangiten-icon.png`,
    width: 512,
    height: 512,
    caption: siteName,
  },

  image: {
    "@id": `${siteUrl}/#logo`,
  },

  description:
    "Kangiten Venture Studio is the venture-building arm of Kangiten Softwares, working with ambitious founders to build technology companies across software, AI, infrastructure and advanced technology.",

  parentOrganization: {
    "@type": "Organization",
    name: "Kangiten Softwares",
  },

  email: "kangitensoftware@gmail.com",
  telephone: "+91 6303450609",

  areaServed: {
    "@type": "Place",
    name: "India",
  },

  knowsAbout: [
    "Software development",
    "Artificial intelligence",
    "AI systems",
    "Product engineering",
    "Cloud infrastructure",
    "Distributed systems",
    "Compute infrastructure",
    "Advanced technology",
    "Research and development",
    "Technology startups",
    "Venture building",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,

  name: siteName,
  url: siteUrl,

  description:
    "Official website of Kangiten Venture Studio, a technical venture partner and venture-building studio by Kangiten Softwares.",

  publisher: {
    "@id": organizationId,
  },

  inLanguage: "en-IN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>

      <body>{children}</body>
    </html>
  );
}