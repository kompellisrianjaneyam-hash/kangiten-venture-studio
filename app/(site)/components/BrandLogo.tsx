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

  return (
    <span
      className={
        isNavbar
          ? "brand-logo brand-logo-navbar"
          : "brand-logo brand-logo-footer"
      }
      aria-label="Kangiten Venture Studio"
    >
      <Image
        src={
          isNavbar
            ? "/brand/kangiten-icon.png"
            : "/brand/kangiten-venture-studio.png"
        }
        alt="Kangiten Venture Studio"
        fill
        priority={priority}
        sizes={isNavbar ? "48px" : "260px"}
        className="brand-logo-image"
      />
    </span>
  );
}