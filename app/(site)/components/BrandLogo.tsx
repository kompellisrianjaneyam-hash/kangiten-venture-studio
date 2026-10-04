import Image from "next/image";

type BrandLogoProps = {
  variant?: "navbar" | "footer";
  priority?: boolean;
};

export default function BrandLogo({
  variant = "navbar",
  priority = false,
}: BrandLogoProps) {
  const isNavbar = variant === "navbar";

  if (isNavbar) {
    return (
      <span
        className="brand-logo brand-logo-navbar"
        aria-label="Kangiten Venture Studio"
      >
        <Image
          src="/brand/kangiten-icon.png"
          alt="Kangiten Venture Studio"
          width={44}
          height={44}
          priority={priority}
          className="brand-logo-navbar-image"
        />
      </span>
    );
  }

  return (
    <span
      className="brand-logo brand-logo-footer"
      aria-label="Kangiten Venture Studio"
    >
      <Image
        src="/brand/kangiten-venture-studio.png"
        alt="Kangiten Venture Studio"
        width={260}
        height={72}
        className="brand-logo-footer-image"
      />
    </span>
  );
}