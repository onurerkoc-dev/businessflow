import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";

export function Services() {
  return (
    <section
      className="services"
      id="services-intro"
      aria-labelledby="services-title"
      tabIndex={-1}
    >
      <div className="site-container">
        <h2 className="services-heading" id="services-title">Hizmetler</h2>
        <div className="services-grid">
          {services.map((service) => (
            <article
              className={`service-entry service-entry--${service.id}`}
              id={service.id}
              key={service.id}
              aria-labelledby={`${service.id}-title`}
              tabIndex={-1}
            >
              <div className="service-media">
                <Image
                  className="service-image"
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes={service.previewSizes}
                  loading="lazy"
                  placeholder="blur"
                />
              </div>
              <div className="service-copy">
                <h3 id={`${service.id}-title`}>{service.title}</h3>
                <p>{service.summary}</p>
                <Link className="service-detail-link" href={`/hizmetler/${service.slug}`}>{service.title} detayları</Link>
              </div>
            </article>
          ))}
        </div>
        <div className="services-preview-link">
          <Link className="button button-dark" href="/hizmetler">Tüm Hizmetler</Link>
        </div>
      </div>
    </section>
  );
}
