"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";

const links = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "What We Build", href: "/what-we-build" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-shell">
        <Link href="/" className="nav-brand" aria-label="Kangiten Venture Studio home" onClick={() => setOpen(false)}>
          <BrandLogo variant="navbar" priority />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">{link.label}</Link>
          ))}
          <Link href="/apply" className="nav-cta">
            <span>Apply to Partner</span>
            <span className="nav-arrow">↗</span>
          </Link>
        </nav>

        <button
          type="button"
          className={`mobile-menu-button ${open ? "is-open" : ""}`}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-menu-inner">
              {links.map((link, index) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.035 }}>
                  <Link href={link.href} className="mobile-nav-link" onClick={() => setOpen(false)}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link href="/apply" className="mobile-apply" onClick={() => setOpen(false)}>
                <span>Apply to Partner</span>
                <span>↗</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
