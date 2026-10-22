import Image, { getImageProps } from "next/image";
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
            <a className="button button-primary" href="#services-intro">
              Hizmetleri İncele
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 9h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
