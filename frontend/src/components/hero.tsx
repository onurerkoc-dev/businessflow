import Image, { getImageProps } from "next/image";
import Link from "next/link";
import heroPhoto from "@/assets/images/detailing-hero.jpg";
import heroMobilePhoto from "@/assets/images/detailing-hero-mobile.jpg";

export function Hero() {
  const { props: mobileImage } = getImageProps({
    src: heroMobilePhoto,
    alt: "",
    sizes: "100vw",
  });

  return (
    <>
      <section className="hero" id="home" aria-labelledby="hero-title" tabIndex={-1}>
        <picture className="hero-media">
          <source media="(max-width: 47.999rem)" srcSet={mobileImage.srcSet} sizes="100vw" />
          <Image
            className="hero-image"
            src={heroPhoto}
            alt="Bir otomobilin kaputuna makineyle polisaj uygulayan uzmanın elleri"
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        <div className="site-container hero-inner">
          <div className="hero-copy">
            <p className="hero-category">PPF KAPLAMA · SERAMİK KAPLAMA · DETAILING</p>
            <h1 id="hero-title">Aracınız için doğru koruma, temiz işçilik.</h1>
            <p className="hero-description">
              PPF kaplama, seramik kaplama ve detaylı araç bakımı.
              Aracınıza uygun uygulamayı keşfedin.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/teklif-al">Teklif Al</Link>
              <Link className="button button-outline" href="#services-intro">Hizmetleri İncele</Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
