import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import surfaceCarePhoto from "@/assets/images/about-surface-care.jpg";
import washPreparationPhoto from "@/assets/images/about-wash-preparation.jpg";

const description = "VANTA'nın PPF, seramik kaplama ve detailing için yüzey değerlendirmesi, uygulama hazırlığı ve doğru bakıma odaklanan yaklaşımını tanıyın.";

export const metadata: Metadata = {
  title: "Hakkımızda | VANTA",
  description,
  openGraph: {
    title: "Hakkımızda | VANTA",
    description,
    type: "website",
    locale: "tr_TR",
    siteName: "VANTA",
  },
};

const applicationSteps = [
  { title: "Yüzeyi değerlendirmek", description: "Boya, film ve iç mekân malzemelerinin mevcut durumu, ihtiyaç duyulan bakımın başlangıç noktasıdır." },
  { title: "Uygulamaya hazırlanmak", description: "Temizlik ve yüzey hazırlığı, seçilen uygulamaya ve kullanılacak ürünün gerekliliklerine göre ele alınır." },
  { title: "Uygulamak ve kontrol etmek", description: "Malzemeye uygun yöntem, dikkatli uygulama ve yüzey kontrolü bir bütün olarak düşünülür." },
  { title: "Bakımı sürdürmek", description: "Sonraki yıkama ve bakım alışkanlıkları, kullanılan film veya kaplamanın üretici talimatlarıyla birlikte değerlendirilir." },
];

export default function AboutPage() {
  return (
    <main className="about-page" id="main-content" tabIndex={-1}>
      <header className="about-intro site-container">
        <h1>VANTA&apos;yı Tanıyın</h1>
        <p className="about-lead">PPF, seramik kaplama ve detailing. Farklı yüzeyleri, farklı ihtiyaçları ve doğru bakımı birlikte ele alan bir yaklaşım.</p>
      </header>
      <figure className="about-feature site-container">
        <div className="about-feature-media">
          <Image src={surfaceCarePhoto} alt="Siyah otomobilin gövdesini mikrofiber bezle temizleyen elin yakın çekimi" fill sizes="(min-width: 94rem) 1360px, 92vw" loading="eager" fetchPriority="high" />
        </div>
        <figcaption>Yüzey bakımından bir detay. Stok fotoğraf; VANTA müşteri çalışması değildir.</figcaption>
      </figure>

      <div className="about-editorial">
        <div className="site-container">
          <section className="about-approach" aria-labelledby="approach-title">
            <h2 id="approach-title">Yaklaşımımız</h2>
            <p>Her yüzeyin ihtiyacı aynı değildir. PPF fiziksel bir film katmanı sunar; seramik kaplama yüzeyin su iticiliği ve bakım kolaylığına odaklanır. Detailing ise iç ve dış malzemeleri ayrıntılı temizlik ve bakım açısından ele alır.</p>
            <p>VANTA&apos;nın odağı, bu farkları anlaşılır kılmak: uygun uygulamayı seçmek, hazırlığı önemsemek ve sonraki bakımı uygulamanın devamı olarak düşünmek.</p>
            <p className="about-demo-note">VANTA bir demo markadır. Burada anlatılanlar hizmet yaklaşımını tanıtır; doğrulanmış bir işletmenin operasyonlarını belgelemez.</p>
          </section>

          <section className="about-practice" aria-labelledby="practice-title">
            <h2 id="practice-title">Uygulama anlayışı</h2>
            <ol className="about-steps" role="list">
              {applicationSteps.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
            <figure className="about-preparation">
              <div className="about-preparation-media">
                <Image src={washPreparationPhoto} alt="Köpüklü otomobilin ön yüzeyine basınçlı suyla durulama yapılması" fill sizes="(min-width: 83rem) 1200px, 92vw" loading="lazy" placeholder="blur" />
              </div>
              <figcaption>Yüzey temizliğine bir örnek. Stok fotoğraf; VANTA ekibini veya tesisini temsil etmez.</figcaption>
            </figure>
          </section>
        </div>
      </div>

      <section className="about-explore site-container" aria-labelledby="explore-title">
        <h2 id="explore-title">Hizmetleri keşfedin</h2>
        <div className="about-actions">
          <Link className="button button-primary" href="/hizmetler">Hizmetleri İncele</Link>
          <Link className="button button-outline" href="/galeri">Galeriyi İncele</Link>
        </div>
      </section>
    </main>
  );
}
