import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";

const description =
  "PPF kaplama, seramik kaplama ve iç/dış araç bakımı uygulamalarını inceleyin.";

export const metadata: Metadata = {
  title: "Hizmetler | PPF Kaplama, Seramik Kaplama ve Detailing | VANTA",
  description,
};

export default function ServicesPage() {
  return (
    <main className="services-page" id="main-content" tabIndex={-1}>
      <header className="services-page-intro">
        <div className="site-container services-page-heading">
          <h1>Hizmetler</h1>
          <div>
            <p className="services-page-description">{description}</p>
            <p className="services-page-note">
              Fotoğraflar hizmetleri tanıtan stok çekimlerdir; VANTA müşteri
              çalışmaları değildir.
            </p>
          </div>
        </div>
      </header>
      <div className="site-container services-catalog">
        {services.map((service) => (
          <article
            className={`catalog-entry catalog-entry--${service.id}`}
            key={service.id}
            aria-labelledby={`catalog-${service.id}-title`}
          >
            <div className="catalog-media">
              <Image
                src={service.image}
                alt={service.alt}
                fill
                sizes={service.id === "ppf"
                  ? "(min-width: 94rem) 860px, (min-width: 64rem) 57vw, 100vw"
                  : "(min-width: 94rem) 660px, (min-width: 48rem) 44vw, 100vw"}
                loading="lazy"
                placeholder="blur"
              />
            </div>
            <div className="catalog-copy">
              <h2 id={`catalog-${service.id}-title`}>{service.title}</h2>
              <p>{service.summary}</p>
              <Link className="detail-text-link" href={`/hizmetler/${service.slug}`}>{service.title} detayları</Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
