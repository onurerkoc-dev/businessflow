import type { StaticImageData } from "next/image";
import ppfPhoto from "@/assets/images/service-ppf.jpg";
import ceramicPhoto from "@/assets/images/service-ceramic.jpg";
import detailingPhoto from "@/assets/images/service-detailing.jpg";
import ppfPreparationPhoto from "@/assets/images/detail-ppf-preparation.jpg";
import interiorCarePhoto from "@/assets/images/detail-interior-care.jpg";
import paintPreparationPhoto from "@/assets/images/detail-paint-preparation.jpg";
import filmEdgePhoto from "@/assets/images/gallery-ppf.jpg";
import coatingPhoto from "@/assets/images/gallery-ceramic.jpg";
import brushCarePhoto from "@/assets/images/gallery-care.jpg";

type ServiceDetailPhoto = {
  image: StaticImageData;
  alt: string;
  caption: string;
  position: string;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image: StaticImageData;
  alt: string;
  previewSizes: string;
  detail: {
    metaDescription: string;
    introduction: string;
    overview: string;
    benefits: string[];
    steps: { title: string; description: string }[];
    faq: { question: string; answer: string }[];
    hero: ServiceDetailPhoto;
    supporting: ServiceDetailPhoto;
  };
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
    detail: {
      metaDescription: "PPF kaplamanın fiziksel koruma işlevini, yüzey hazırlığını ve uygulama adımlarını inceleyin.",
      introduction: "Boyalı yüzey ile günlük kullanımın etkileri arasına yerleştirilen şeffaf koruma filmi.",
      overview: "PPF, boyalı yüzeye uygulanan şeffaf bir koruma filmidir. Taş sıçraması ve yüzeysel sürtünmelerde darbeyi karşılayan fiziksel bir katman oluşturur. Koruma kapsamı, film uygulanan panellerle sınırlıdır; bütün hasarları engelleyen bir çözüm değildir.",
      benefits: [
        "Kaplanan yüzeyde taş sıçraması ve hafif sürtünmelere karşı ek bir fiziksel katman sağlar.",
        "Şeffaf film, alttaki boya renginin görünmesini korur.",
        "İhtiyaca göre belirli panellerde veya daha geniş yüzeylerde değerlendirilebilir.",
      ],
      steps: [
        { title: "Yüzey ve kapsam", description: "Boya durumu incelenir; kaplanacak paneller ve mevcut kusurlar değerlendirilir." },
        { title: "Hazırlık ve yerleşim", description: "Yüzey temizlenir. Seçilen filmin uygulama koşullarına göre hazırlık ve panel üzerinde hizalama yapılır." },
        { title: "Kenar ve yüzey kontrolü", description: "Film yerleşimi, kenarlar ve yüzey kontrol edilir. Sonraki temizlik ve bakım için kullanılan filme uygun bilgi verilir." },
      ],
      faq: [
        { question: "PPF bütün çizikleri önler mi?", answer: "Hayır. Film belirli dış etkilere karşı bir koruma katmanıdır. Keskin cisimler, güçlü darbeler veya filmi aşan etkiler hasara yol açabilir." },
        { question: "PPF ile seramik kaplama aynı şey mi?", answer: "Hayır. PPF fiziksel bir filmdir. Seramik kaplama ise yüzeyin su iticiliği ve bakım kolaylığı için kullanılan bir kaplama türüdür; filmin yerini tutmaz." },
        { question: "Kaplama sonrasında bakım gerekir mi?", answer: "Evet. Film de düzenli ve uygun temizlik gerektirir. Temizlik yöntemi ve ürünler kullanılan filmin bakım talimatlarına göre seçilmelidir." },
      ],
      hero: {
        image: ppfPreparationPhoto,
        alt: "İki uygulamacının otomobil yanında şeffaf PPF filmini tutması ve hazırlık sıvısı püskürtmesi",
        caption: "Filmin panel üzerine yerleştirilmeden önce hazırlanması.",
        position: "50% 50%",
      },
      supporting: {
        image: filmEdgePhoto,
        alt: "Uygulamacının şeffaf filmi kaput kenarında eldivenli elleriyle hizalaması",
        caption: "Kaput kenarında film yerleşimi.",
        position: "50% 55%",
      },
    },
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
    detail: {
      metaDescription: "Seramik kaplamanın yüzey bakımı, su iticiliği ve temizlik kolaylığı açısından ne sağladığını ve uygulama hazırlığını inceleyin.",
      introduction: "Yüzeyin suyla ve kirle temasını yönetmeye, düzenli temizliği kolaylaştırmaya yönelik kaplama.",
      overview: "Seramik kaplama, uygun şekilde hazırlanmış boya üzerinde su itici bir yüzey oluşturur. Kirin yüzeyden uzaklaştırılmasını ve düzenli bakımı kolaylaştırabilir. Fiziksel koruma filmi değildir; çizilmezlik sağlamaz ve mevcut boya kusurlarını kendiliğinden gidermez.",
      benefits: [
        "Su itici yüzey davranışıyla suyun yüzeyden uzaklaşmasını kolaylaştırır.",
        "Kirin yüzeyden temizlenmesine ve düzenli bakımın daha kolay yapılmasına yardımcı olur.",
        "Uygun hazırlık ve düzenli bakımla boya yüzeyinin görünümünü destekler.",
      ],
      steps: [
        { title: "Boya değerlendirmesi", description: "Yüzeydeki kirlenme ve boya kusurları incelenir. Gerekli hazırlık kapsamı belirlenir." },
        { title: "Yüzey hazırlığı", description: "Yüzey temizlenir; ihtiyaç varsa boya düzeltme değerlendirilir. Hazırlık, seçilen ürünün koşullarına göre tamamlanır." },
        { title: "Kaplama ve kontrol", description: "Ürün, üreticisinin uygulama koşullarına göre uygulanır. Yüzey kontrol edilir ve ilk bakım gereklilikleri paylaşılır." },
      ],
      faq: [
        { question: "Seramik kaplama aracı çizilmez yapar mı?", answer: "Hayır. Taş darbesi veya çizilmeye karşı fiziksel bir film değildir. Yanlış yıkama ve sert temas boyalı yüzeyde iz bırakabilir." },
        { question: "Mevcut çizikleri kapatır mı?", answer: "Kaplama boya düzeltmenin yerine geçmez. Mevcut kusurlar uygulama öncesinde incelenir; yüzeyin ihtiyacına göre ayrı hazırlık işlemleri değerlendirilebilir." },
        { question: "Kaplamalı araç yine yıkanır mı?", answer: "Evet. Kaplama düzenli temizliğin yerini almaz. Kullanılan ürünün bakım talimatlarına uygun yıkama ve kurutma gerekir." },
      ],
      hero: {
        image: coatingPhoto,
        alt: "Seramik kaplama ürününün şişesinden mavi aplikatöre hazırlanan damlanın yakın çekimi",
        caption: "Seramik kaplama ürününün aplikatöre hazırlanması.",
        position: "50% 65%",
      },
      supporting: {
        image: paintPreparationPhoto,
        alt: "Beyaz otomobilin kaputunda yüzey hazırlığı için makineyle polisaj yapılması",
        caption: "Yüzey hazırlığına örnek: ihtiyaç halinde değerlendirilen polisaj adımı.",
        position: "60% 45%",
      },
    },
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
    detail: {
      metaDescription: "İç ve dış araç detailing bakımını, yüzeye göre temizlik yaklaşımını ve boya bakımının kapsamını inceleyin.",
      introduction: "İç ve dış yüzeyleri, malzemelerine ve mevcut durumlarına göre ele alan ayrıntılı araç bakımı.",
      overview: "Detailing; kabin, döşeme, cam, jant ve boyalı yüzeylerin ayrıntılı temizliğini ve bakımını kapsar. İşlem kapsamı aracın durumuna göre belirlenir. Boya yüzeyindeki görünüm için polisaj değerlendirilebilir; her yüzeye aynı işlem uygulanmaz.",
      benefits: [
        "Birleşim noktaları ve erişilmesi zor alanlardaki kirlerin temizlenmesini hedefler.",
        "İç mekân malzemelerine uygun temizlik ve bakım yaklaşımı sağlar.",
        "Boya yüzeyinin ihtiyacına göre bakım ve düzeltme seçeneklerini değerlendirmeye imkân verir.",
      ],
      steps: [
        { title: "İç ve dış inceleme", description: "Malzemeler, kirlenme ve yüzey durumu değerlendirilir. Temizlik ve bakım kapsamı belirlenir." },
        { title: "Malzemeye göre temizlik", description: "İç mekân ve dış yüzeyler uygun ürün ve ekipmanlarla ele alınır. Hassas bölgeler ayrı değerlendirilir." },
        { title: "Bakım ve son kontrol", description: "Gerekli yüzey bakımı tamamlanır. Boya için polisaj ihtiyacı ayrıca değerlendirilir; işlem sonrası yüzeyler kontrol edilir." },
      ],
      faq: [
        { question: "Detailing standart yıkamadan nasıl ayrılır?", answer: "Yüzey ve malzeme bazında daha ayrıntılı değerlendirme ve temizlik içerir. Kapsam; kabin, birleşim noktaları ve boya bakımı gibi alanlara göre belirlenir." },
        { question: "Her araçta polisaj yapılır mı?", answer: "Hayır. Boya durumu ve ihtiyaç değerlendirilmeden polisaj kapsamı belirlenmez. İç mekân temizliği de polisajdan ayrı bir işlemdir." },
        { question: "Her leke ve çizik tamamen giderilebilir mi?", answer: "Hayır. Sonuç; izin derinliği, lekenin türü, malzeme ve yüzeyin durumuna bağlıdır. Kalıcı hasarlar temizlik veya polisajla tamamen giderilemeyebilir." },
      ],
      hero: {
        image: interiorCarePhoto,
        alt: "Uygulamacının otomobil koltuğunun yüzeyini mikrofiber bezle temizlemesi",
        caption: "İç mekânda yüzeye uygun bezle temizlik.",
        position: "55% 55%",
      },
      supporting: {
        image: brushCarePhoto,
        alt: "Otomobilin cam kenarı ve gövde birleşiminin köpük ve detay fırçasıyla temizlenmesi",
        caption: "Dış yüzeyin birleşim noktalarında detay fırçasıyla temizlik.",
        position: "40% 50%",
      },
    },
  },
];
