import type { StaticImageData } from "next/image";
import ppfPhoto from "@/assets/images/gallery-ppf.jpg";
import ceramicPhoto from "@/assets/images/gallery-ceramic.jpg";
import correctionPhoto from "@/assets/images/gallery-correction.jpg";
import carePhoto from "@/assets/images/gallery-care.jpg";
import ppfPlacementPhoto from "@/assets/images/service-ppf.jpg";
import ceramicPreparationPhoto from "@/assets/images/service-ceramic.jpg";
import polishingPhoto from "@/assets/images/detailing-hero.jpg";
import fenderPhoto from "@/assets/images/service-detailing.jpg";

export type GalleryPhoto = {
  id: string;
  category: "PPF Kaplama" | "Seramik Kaplama" | "Boya Düzeltme" | "Detaylı Bakım";
  image: StaticImageData;
  alt: string;
  caption: string;
  position: string;
  previewSizes?: string;
  source: {
    url: string;
    photographer: string;
    license: string;
    licenseUrl: string;
  };
};

const pexelsLicense = {
  license: "Pexels License",
  licenseUrl: "https://www.pexels.com/license/",
};

export const galleryImages: GalleryPhoto[] = [
  {
    id: "ppf",
    category: "PPF Kaplama",
    image: ppfPhoto,
    alt: "Uygulamacının kaput kenarındaki şeffaf koruma filmini eldivenli elleriyle yerleştirmesi",
    caption: "Kaput kenarında film yerleşimi",
    position: "50% 48%",
    previewSizes: "(min-width: 94rem) 780px, (min-width: 64rem) 52vw, (min-width: 48rem) 44vw, 100vw",
    source: {
      url: "https://www.pexels.com/photo/bearded-man-applying-foil-on-sports-car-hood-20051468/",
      photographer: "WAVYVISUALS",
      ...pexelsLicense,
    },
  },
  {
    id: "ceramic",
    category: "Seramik Kaplama",
    image: ceramicPhoto,
    alt: "Seramik kaplama şişesinin ucundaki damla ve altında tutulan mavi aplikatörün yakın çekimi",
    caption: "Seramik ürününün aplikatöre hazırlanması",
    position: "50% 65%",
    previewSizes: "(min-width: 94rem) 560px, (min-width: 64rem) 37vw, (min-width: 48rem) 44vw, 100vw",
    source: {
      url: "https://www.pexels.com/photo/applying-oil-on-blue-sponge-20051451/",
      photographer: "WAVYVISUALS",
      ...pexelsLicense,
    },
  },
  {
    id: "correction",
    category: "Boya Düzeltme",
    image: correctionPhoto,
    alt: "Boya düzeltme öncesinde üzerine polisaj ürünü konulmuş sarı makine pedi",
    caption: "Polisaj pedinin hazırlanması",
    position: "50% 72%",
    previewSizes: "(min-width: 94rem) 440px, (min-width: 64rem) 29vw, (min-width: 48rem) 44vw, 100vw",
    source: {
      url: "https://www.pexels.com/photo/polish-cream-on-polisher-foam-20042053/",
      photographer: "WAVYVISUALS",
      ...pexelsLicense,
    },
  },
  {
    id: "care",
    category: "Detaylı Bakım",
    image: carePhoto,
    alt: "Otomobilin cam kenarı ve gövde birleşimindeki köpüğün detay fırçasıyla temizlenmesi",
    caption: "Birleşim noktalarında fırçayla temizlik",
    position: "40% 50%",
    previewSizes: "(min-width: 94rem) 900px, (min-width: 64rem) 60vw, (min-width: 48rem) 44vw, 100vw",
    source: {
      url: "https://www.pexels.com/photo/a-close-up-shot-of-a-person-brushing-a-car-6873020/",
      photographer: "Tima Miroshnichenko",
      ...pexelsLicense,
    },
  },
  {
    id: "ppf-placement",
    category: "PPF Kaplama",
    image: ppfPlacementPhoto,
    alt: "İki uygulamacının otomobil kaputuna şeffaf boya koruma filmi yerleştirmesi",
    caption: "Şeffaf filmin kaputa yerleştirilmesi",
    position: "50% 42%",
    source: {
      url: "https://www.pexels.com/photo/men-holding-foil-over-car-20051465/",
      photographer: "WAVYVISUALS",
      ...pexelsLicense,
    },
  },
  {
    id: "ceramic-preparation",
    category: "Seramik Kaplama",
    image: ceramicPreparationPhoto,
    alt: "Seramik kaplama ürününün şişeden mavi aplikatöre damlatılması",
    caption: "Aplikatöre ürün damlatılması",
    position: "50% 60%",
    source: {
      url: "https://www.pexels.com/photo/applying-car-cleaner-on-blue-sponge-20051453/",
      photographer: "WAVYVISUALS",
      ...pexelsLicense,
    },
  },
  {
    id: "surface-polishing",
    category: "Boya Düzeltme",
    image: polishingPhoto,
    alt: "Siyah otomobilin kaputuna makineyle polisaj uygulayan uzmanın elleri",
    caption: "Kaputta makineyle polisaj",
    position: "65% 45%",
    source: {
      url: "https://www.pexels.com/photo/a-person-polishing-the-black-car-5233259/",
      photographer: "Khunkorn Laowisit",
      ...pexelsLicense,
    },
  },
  {
    id: "fender-polishing",
    category: "Boya Düzeltme",
    image: fenderPhoto,
    alt: "Otomobilin ön çamurluğuna makineyle polisaj uygulanması",
    caption: "Çamurluk yüzeyinde polisaj",
    position: "50% 48%",
    source: {
      url: "https://www.pexels.com/photo/man-cleaning-sports-car-20042056/",
      photographer: "WAVYVISUALS",
      ...pexelsLicense,
    },
  },
];
