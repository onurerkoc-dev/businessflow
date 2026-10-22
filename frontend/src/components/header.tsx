import { MobileMenu } from "@/components/mobile-menu";
import { NavigationLinks } from "@/components/navigation-links";
import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link className="brand" href="/#home" aria-label="Vanta, ana sayfa">
          <span className="brand-name">VANTA<span aria-hidden="true">.</span></span>
          <span className="brand-description">Oto detailing</span>
        </Link>
        <nav className="desktop-nav" aria-label="Ana navigasyon">
          <NavigationLinks />
        </nav>
        <MobileMenu>
          <NavigationLinks />
        </MobileMenu>
      </div>
    </header>
  );
}
