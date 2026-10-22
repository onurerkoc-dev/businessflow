import type { StaticImageData } from "next/image";
import ppfPhoto from "@/assets/images/service-ppf.jpg";
import ceramicPhoto from "@/assets/images/service-ceramic.jpg";
import detailingPhoto from "@/assets/images/service-detailing.jpg";

export type Service = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image: StaticImageData;
  alt: string;
  previewSizes: string;
};

export const services: Service[] = [
  {
    id: "ppf",
    slug: "ppf-kaplama",
    title: "PPF Kaplama",
    summary:
      "Boyalı yüzeye uygulanan şeffaf film, taş sıçraması ve yüzeysel çiziklere karşı fiziksel bir koruma katmanı oluşturur.",
    image: ppfPhoto,
    alt: "İki uygulamacının otomobil kaputuna şeffaf boya koruma filmi yerleştirmesi",
    previewSizes: "(min-width: 64rem) 52vw, (min-width: 48rem) 46vw, 100vw",
  },
  {
    id: "ceramic",
    slug: "seramik-kaplama",
    title: "Seramik Kaplama",
    summary:
      "Boya üzerinde su itici bir katman oluşturur. Yüzeyin temizlenmesini ve düzenli bakımını kolaylaştırır.",
    image: ceramicPhoto,
    alt: "Seramik kaplama ürününün şişeden mavi aplikatöre damlatılması",
    previewSizes: "(min-width: 64rem) 24vw, (min-width: 48rem) 46vw, 100vw",
  },
  {
    id: "detailing",
    slug: "detailing",
    title: "Detailing",
    summary:
      "İç ve dış yüzeylere ayrıntılı temizlik ve bakım uygulanır. Boya yüzeyi, ihtiyacına göre polisajla iyileştirilir.",
    image: detailingPhoto,
    alt: "Otomobilin ön çamurluğuna makineyle polisaj uygulanması",
    previewSizes: "(min-width: 64rem) 24vw, (min-width: 48rem) 46vw, 100vw",
  },
];
