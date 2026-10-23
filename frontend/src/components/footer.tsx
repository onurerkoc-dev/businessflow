import Link from "next/link";
import { services } from "@/data/services";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-main">
          <div className="footer-identity">
            <Link className="footer-brand" href="/" aria-label="VANTA, ana sayfa">
              VANTA<span aria-hidden="true">.</span>
            </Link>
            <p>PPF, seramik kaplama ve detaylı araç bakımına odaklanan hizmet yaklaşımı.</p>
          </div>
          <nav className="footer-navigation" aria-labelledby="footer-pages-title">
            <h2 id="footer-pages-title">Keşfedin</h2>
            <ul>
              <li><Link href="/">Ana Sayfa</Link></li>
              <li><Link href="/hizmetler">Hizmetler</Link></li>
              <li><Link href="/galeri">Galeri</Link></li>
              <li><Link href="/hakkimizda">Hakkımızda</Link></li>
            </ul>
          </nav>
          <nav className="footer-navigation" aria-labelledby="footer-services-title">
            <h2 id="footer-services-title">Hizmetler</h2>
            <ul>
              {services.map((service) => (
                <li key={service.id}><Link href={`/hizmetler/${service.slug}`}>{service.title}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© VANTA</p>
          <p>Demo marka. İçerikler tanıtım amaçlıdır.</p>
        </div>
      </div>
    </footer>
  );
}
