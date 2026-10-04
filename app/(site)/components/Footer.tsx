import Link from "next/link";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top page-shell">
        <div className="footer-brand-column">
          <Link href="/" className="footer-logo-link">
            <BrandLogo variant="footer" />
          </Link>

          <p>
            A venture studio by Kangiten Softwares, building technology with
            ambitious founders.
          </p>

          <div className="footer-contact">
            <a href="mailto:kangitensoftware@gmail.com">
              kangitensoftware@gmail.com
            </a>

            <a href="tel:+916303450609">+91 6303450609</a>
          </div>
        </div>

        <div className="footer-links-column">
          <span className="footer-heading">EXPLORE</span>

          <Link href="/how-it-works">How It Works</Link>
          <Link href="/what-we-build">What We Build</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/about">About</Link>
        </div>

        <div className="footer-links-column">
          <span className="footer-heading">START</span>

          <Link href="/apply">Apply to Partner</Link>
          <a href="mailto:kangitensoftware@gmail.com">Contact</a>
          <a href="tel:+916303450609">Call the Studio</a>
        </div>
      </div>

      <div className="footer-bottom page-shell">
        <span>© {new Date().getFullYear()} Kangiten Venture Studio</span>
        <span>Building technology with ambitious founders.</span>
      </div>
    </footer>
  );
}