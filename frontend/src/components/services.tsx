import Image from "next/image";
import ppfPhoto from "@/assets/images/service-ppf.jpg";
import ceramicPhoto from "@/assets/images/service-ceramic.jpg";
import detailingPhoto from "@/assets/images/service-detailing.jpg";

const services = [
  {
    id: "ppf",
    title: "PPF Kaplama",
    description:
      "Boyalı yüzeye uygulanan şeffaf film, taş sıçraması ve yüzeysel çiziklere karşı fiziksel bir koruma katmanı oluşturur.",
    image: ppfPhoto,
    alt: "İki uygulamacının otomobil kaputuna şeffaf boya koruma filmi yerleştirmesi",
    sizes: "(min-width: 64rem) 52vw, (min-width: 48rem) 46vw, 100vw",
  },
  {
    id: "ceramic",
    title: "Seramik Kaplama",
    description:
      "Boya üzerinde su itici bir katman oluşturur. Yüzeyin temizlenmesini ve düzenli bakımını kolaylaştırır.",
    image: ceramicPhoto,
    alt: "Seramik kaplama ürününün şişeden mavi aplikatöre damlatılması",
    sizes: "(min-width: 64rem) 24vw, (min-width: 48rem) 46vw, 100vw",
  },
  {
    id: "detailing",
    title: "Detailing",
    description:
      "İç ve dış yüzeylere ayrıntılı temizlik ve bakım uygulanır. Boya yüzeyi, ihtiyacına göre polisajla iyileştirilir.",
    image: detailingPhoto,
    alt: "Otomobilin ön çamurluğuna makineyle polisaj uygulanması",
    sizes: "(min-width: 64rem) 24vw, (min-width: 48rem) 46vw, 100vw",
  },
];

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
                  sizes={service.sizes}
                  loading="lazy"
                  placeholder="blur"
                />
              </div>
              <div className="service-copy">
                <h3 id={`${service.id}-title`}>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
