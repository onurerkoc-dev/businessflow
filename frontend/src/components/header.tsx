import { MobileMenu } from "@/components/mobile-menu";

function NavigationLinks() {
  return (
    <>
      <a className="nav-link" href="#home" aria-current="page">Ana Sayfa</a>
      <a className="nav-link" href="#ppf">PPF Kaplama</a>
      <a className="nav-link" href="#ceramic">Seramik Kaplama</a>
      <a className="nav-link" href="#detailing">Detailing</a>
      <a className="button button-outline nav-cta" href="#services-intro">Hizmetleri İncele</a>
    </>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <a className="brand" href="#home" aria-label="Vanta, ana sayfa">
          <span className="brand-name">VANTA<span aria-hidden="true">.</span></span>
          <span className="brand-description">Oto detailing</span>
        </a>
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
