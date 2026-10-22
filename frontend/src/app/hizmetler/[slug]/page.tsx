import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/data/services";

type ServicePageProps = { params: Promise<{ slug: string }> };

// Resolve unknown slugs before a streaming response starts.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return {
    title: `${service.title} | VANTA`,
    description: service.detail.metaDescription,
    openGraph: {
      title: `${service.title} | VANTA`,
      description: service.detail.metaDescription,
      type: "website",
      locale: "tr_TR",
      siteName: "VANTA",
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const { detail } = service;

  return (
    <main className={`service-detail service-detail--${service.id}`} id="main-content" tabIndex={-1}>
      <header className="detail-intro site-container">
        <nav className="detail-breadcrumb" aria-label="İçerik yolu">
          <ol>
            <li><Link href="/">Ana Sayfa</Link></li>
            <li><Link href="/hizmetler">Hizmetler</Link></li>
            <li><span aria-current="page">{service.title}</span></li>
          </ol>
        </nav>
        <div className="detail-heading">
          <div className="detail-lead">
            <h1>{service.title}</h1>
            <p>{detail.introduction}</p>
            <Link className="detail-text-link" href="/galeri">Uygulama Galerisi</Link>
          </div>
          <figure>
            <div className="detail-hero-media">
              <Image
                src={detail.hero.image}
                alt={detail.hero.alt}
                fill
                sizes="(min-width: 94rem) 760px, (min-width: 64rem) 51vw, 100vw"
                loading="eager"
                fetchPriority="high"
                style={{ objectPosition: detail.hero.position }}
              />
            </div>
            <figcaption>{detail.hero.caption}</figcaption>
          </figure>
        </div>
        <p className="detail-stock-note">Tanıtım amaçlı stok fotoğraflardır; VANTA müşteri çalışmaları değildir.</p>
      </header>

      <div className="detail-body">
        <div className="site-container">
          <section className="detail-overview" aria-labelledby="overview-title">
            <h2 id="overview-title">{service.title} nedir?</h2>
            <div>
              <p className="detail-overview-copy">{detail.overview}</p>
              <h3>Neler sağlar?</h3>
              <ul className="detail-benefits">
                {detail.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
              </ul>
            </div>
          </section>

          <section className="detail-process" aria-labelledby="process-title">
            <figure>
              <div className="detail-process-media">
                <Image
                  src={detail.supporting.image}
                  alt={detail.supporting.alt}
                  fill
                  sizes="(min-width: 94rem) 640px, (min-width: 48rem) 44vw, 100vw"
                  loading="lazy"
                  placeholder="blur"
                  style={{ objectPosition: detail.supporting.position }}
                />
              </div>
              <figcaption>{detail.supporting.caption}</figcaption>
            </figure>
            <div>
              <h2 id="process-title">Uygulamaya genel bakış</h2>
              <ol className="detail-steps">
                {detail.steps.map((step) => (
                  <li key={step.title}>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="detail-faq" aria-labelledby="faq-title">
            <h2 id="faq-title">Sık sorulan sorular</h2>
            <div>
              {detail.faq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>

      <nav className="detail-related site-container" aria-labelledby="related-title">
        <h2 id="related-title">Diğer hizmetler</h2>
        <div className="detail-related-links">
          {services.filter((item) => item.slug !== slug).map((item) => (
            <Link key={item.id} href={`/hizmetler/${item.slug}`}>
              <span>{item.title}</span>
              <p>{item.summary}</p>
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
}
