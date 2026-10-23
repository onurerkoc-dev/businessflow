import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { services } from "@/data/services";

type QuotePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const description = "Aracınızın bilgilerini ve ilgilendiğiniz hizmeti paylaşarak teklif talebinizi hazırlayın.";

export const metadata: Metadata = {
  title: "Teklif Al | VANTA",
  description,
  openGraph: { title: "Teklif Al | VANTA", description, type: "website", locale: "tr_TR", siteName: "VANTA" },
};

async function QuoteFormSection({ searchParams }: QuotePageProps) {
  const { hizmet } = await searchParams;
  const selectedService = typeof hizmet === "string" ? services.find((service) => service.slug === hizmet) : undefined;
  const invalidService = hizmet !== undefined && !selectedService;
  return (
    <QuoteRequestForm
      key={`${selectedService?.slug ?? "none"}-${invalidService}`}
      services={services.map(({ slug, title }) => ({ slug, title }))}
      initialServiceSlug={selectedService?.slug ?? ""}
      invalidInitialService={invalidService}
    />
  );
}

export default function QuotePage({ searchParams }: QuotePageProps) {
  return (
    <main className="quote-page" id="main-content" tabIndex={-1}>
      <div className="quote-layout site-container">
        <header className="quote-intro">
          <h1>Aracınız İçin Teklif Alın</h1>
          <p className="quote-lead">{description}</p>
          <p className="quote-intro-note">Bu aşamada bilgilerinizi yalnızca kontrol edebilirsiniz. Teklif gönderimi henüz aktif değildir.</p>
          <noscript><p className="quote-intro-note">Yerel form kontrolü için JavaScript&apos;i etkinleştirin. Bu sayfa gönderim yapmaz.</p></noscript>
          <nav className="quote-context-links" aria-label="Teklif öncesi bilgi">
            <Link href="/hizmetler">Hizmetleri İncele</Link>
            <Link href="/iletisim">İletişim</Link>
          </nav>
        </header>
        <Suspense fallback={<p className="quote-panel" role="status">Form hazırlanıyor…</p>}>
          <QuoteFormSection searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
