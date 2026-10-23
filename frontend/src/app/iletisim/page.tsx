import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { contactDetails } from "@/data/contact";
import { services } from "@/data/services";
import detailingToolsPhoto from "@/assets/images/contact-detailing-tools.jpg";

const description = "PPF, seramik kaplama ve detailing hakkında bilgi edinin. VANTA'nın hizmet kapsamlarını ve uygulama detaylarını inceleyin.";

export const metadata: Metadata = {
  title: "İletişim | VANTA",
  description,
  openGraph: {
    title: "İletişim | VANTA",
    description,
    type: "website",
    locale: "tr_TR",
    siteName: "VANTA",
  },
};

export default function ContactPage() {
  const { phone, email, address, openingHours } = contactDetails;
  const hasContactDetails = Boolean(phone || email || address || openingHours);

  return (
    <main className="contact-page" id="main-content" tabIndex={-1}>
      <div className="contact-content">
        <div className="site-container contact-layout">
          <header className="contact-intro">
            <h1>İletişim</h1>
            <p>Aracınız için PPF, seramik kaplama veya detailing hakkında bilgi edinmek üzere hizmet kapsamlarını ve uygulama detaylarını inceleyin.</p>
          </header>

          <section className="contact-information" aria-labelledby="contact-information-title">
            <h2 id="contact-information-title">İletişim bilgileri</h2>
            <p>VANTA bir demo markadır.{!hasContactDetails && " Doğrulanmış telefon, e-posta, adres ve çalışma saatleri henüz paylaşılmadı."}</p>
            {hasContactDetails && (
              <dl className="contact-details">
                {phone && <div><dt>Telefon</dt><dd><a href={`tel:${phone.number}`}>{phone.label}</a></dd></div>}
                {email && <div><dt>E-posta</dt><dd><a href={`mailto:${email}`}>{email}</a></dd></div>}
                {address && <div><dt>Adres</dt><dd>{address}</dd></div>}
                {openingHours && <div><dt>Çalışma saatleri</dt><dd>{openingHours}</dd></div>}
              </dl>
            )}
          </section>

          <figure className="contact-photo">
            <div className="contact-photo-media">
              <Image
                src={detailingToolsPhoto}
                alt="Otomobillerin önündeki servis arabasında polisaj ürünleri, pedler, makine ve mikrofiber bezler"
                fill
                sizes="(min-width: 94rem) 650px, (min-width: 64rem) 44vw, 92vw"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <figcaption>Detailing ekipmanlarından bir görünüm. Stok fotoğraf; VANTA tesisini veya müşteri çalışmasını temsil etmez.</figcaption>
          </figure>

          <nav className="contact-services" aria-labelledby="contact-services-title">
            <h2 id="contact-services-title">Hizmet rehberi</h2>
            <ul>
              {services.map((service) => (
                <li key={service.id}>
                  <Link href={`/hizmetler/${service.slug}`}>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <section className="contact-explore site-container" aria-labelledby="contact-explore-title">
        <div>
          <h2 id="contact-explore-title">Teklif talebinizi hazırlayın</h2>
          <p>Formda araç bilgilerinizi kontrol edebilirsiniz. Bu aşamada gönderim yapılmaz.</p>
        </div>
        <div className="contact-actions">
          <Link className="button button-primary" href="/teklif-al">Teklif Al</Link>
          <Link className="button button-outline" href="/galeri">Galeriyi İncele</Link>
        </div>
      </section>
    </main>
  );
}
