# Görsel kaynakları ve kullanım kaydı

Son kontrol: 23 Ekim 2026. Önceki faz kayıtları kendi kontrol tarihlerini korur.

## Faz 9 — Mevcut iletişim fotoğrafının kadrajı

Yeni fotoğraf indirilmedi veya üretilmedi; aşağıdaki Faz 8 kaynak/lisans kaydı değişmedi. `contact-detailing-tools.jpg` dosyasına kalıcı kırpma yapılmadı. Yalnızca CSS gösterimi değişti: masaüstünde 4:3, tablette 3:2, mobilde 4:5 oranı ve `object-fit: cover` kullanılır. Masaüstü odağı `50% 70%`; öndeki şişeler, pedler, polisaj makinesi ve bezler görünür tutulur. Fotoğraf artık hizmet rehberi boyunca uzamaz; rehber masaüstünde fotoğrafın altındaki tam genişlikte üç sütuna yerleşir. Caption 14 px oldu; stok/VANTA açıklaması korundu. Altı genişlikte kadrajlar görsel olarak incelendi.

## Faz 8 — İletişim sayfası

Bu sayfaya özel yeni, gerçek bir detailing ekipmanı fotoğrafı kullanılır. Kaynak sayfası ve [Pexels License](https://www.pexels.com/license/) 23 Ekim 2026 tarihinde kontrol edildi. Web kullanımı ve düzenleme lisans kapsamında; atıf zorunlu değildir. Kişi veya marka desteği, yetkili uygulayıcılık veya VANTA'nın bu ürünleri kullandığı iddia edilmez. Değiştirilmemiş kopyaları satma, stok platformlarında yeniden dağıtma ve ticari marka olarak kullanma kısıtları korunur.

| Kaynak URL | Fotoğrafçı | Lisans | Projedeki dosya |
| --- | --- | --- | --- |
| https://www.pexels.com/photo/sprays-and-cloths-on-table-near-sports-cars-20042048/ | WAVYVISUALS | Pexels License | `frontend/src/assets/images/contact-detailing-tools.jpg` |

- Orijinal: https://images.pexels.com/photos/20042048/pexels-photo-20042048.jpeg — 2687 × 4039 px.
- Kaynak sayfasındaki yayın tarihi: 28 Ocak 2024.
- Yerel dosya: 1400 × 2104 px / 258736 bayt. Mevcut `sharp` ile yön düzeltme, orantılı küçültme ve kalite 85 JPEG sıkıştırması uygulandı.
- Görsel indirilip incelendi: önde polisaj ürünleri, pedler, makine ve mikrofiber bezler; arka planda otomobiller bulunur. Görsel, VANTA'nın tesisini veya müşteri çalışmasını temsil etmez; görünür caption bunu açıklar.
- Kalıcı kırpma, generatif düzenleme veya AI üretimi yoktur. `next/image`, statik import ve responsive `sizes` kullanılır. Gösterim kırpımı `.contact-photo-media` kurallarında yönetilir; ekipmanlar kadrajın odağıdır.
- Fotoğraf diğer sayfalarda tekrar kullanılmaz. Önceki görsel dosyaları değiştirilmedi.

## Faz 7 — Hakkımızda sayfası

İki yeni gerçek çekim bu sayfaya özeldir; mevcut galeri veya hizmet fotoğrafları tekrarlanmaz. Fotoğrafçı **Tima Miroshnichenko**. Kaynak sayfaları ve [Pexels License](https://www.pexels.com/license/) 23 Ekim 2026 tarihinde kontrol edildi. Web kullanımı ve düzenleme lisans kapsamında; atıf zorunlu değildir. Değiştirilmemiş kopyaları satma, stok platformlarında yeniden dağıtma, ticari marka olarak kullanma ve kişi/marka desteği ima etme kısıtları korunur.

| Konu | Kaynak URL | Fotoğrafçı | Lisans | Projedeki dosya |
| --- | --- | --- | --- | --- |
| Gövdenin mikrofiber bezle temizlenmesi | https://www.pexels.com/photo/a-person-wiping-a-car-with-a-cleaning-cloth-6872572/ | Tima Miroshnichenko | Pexels License | `frontend/src/assets/images/about-surface-care.jpg` |
| Köpüklü yüzeyin suyla durulanması | https://www.pexels.com/photo/a-woman-cleaning-a-car-6873081/ | Tima Miroshnichenko | Pexels License | `frontend/src/assets/images/about-wash-preparation.jpg` |

| Dosya | Orijinal URL | Orijinal çözünürlük | Yerel çözünürlük / boyut |
| --- | --- | --- | --- |
| `about-surface-care.jpg` | https://images.pexels.com/photos/6872572/pexels-photo-6872572.jpeg | 3950 × 5925 | 1400 × 2100 / 158397 bayt |
| `about-wash-preparation.jpg` | https://images.pexels.com/photos/6873081/pexels-photo-6873081.jpeg | 5860 × 3907 | 1600 × 1066 / 233606 bayt |

Kaynak sayfalarındaki yayın tarihi 19 Şubat 2021'dir. İki çekim de indirilip incelendi. İlk fotoğraf gövdeye bezle teması, ikincisi köpüklü araca suyla durulamayı gösterir; ikincisi PPF/seramik uygulaması olarak etiketlenmez. Mevcut `sharp` ile EXIF yön düzeltme, orantılı küçültme ve kalite 85 JPEG sıkıştırması yapıldı. Kalıcı kırpma, AI üretimi veya generatif düzenleme yoktur. Gösterim kırpımı `globals.css` içinde yönetilir; ilk fotoğrafta bez ve el kadrajda tutulur.

İki caption'da stok niteliği açıkça belirtilir. Fotoğraflar VANTA'nın müşterisi, çalışanı veya tesisi olarak sunulmaz. Sayfada VANTA'nın demo marka olduğu ayrıca açıklanır. `next/image` görselleri yerel statik import'lardan optimize eder; çalışma anında Pexels'e istek gerekmez.

## Faz 5 — Bağımsız /hizmetler sayfası

Yeni fotoğraf indirilmedi, üretilmedi veya dosyası değiştirilmedi. Faz 2'de kayıtlı WAVYVISUALS / Pexels License kapsamındaki `service-ppf.jpg`, `service-ceramic.jpg` ve `service-detailing.jpg` tekrar kullanılır. Kaynak URL'leri, lisans ve dosya bilgileri aşağıdaki Faz 2 tablosunda korunur.

Ana sayfa ve hizmetler sayfası aynı `frontend/src/data/services.ts` kayıtlarını kullanır. Katalogda PPF fotoğrafı yatay; seramik ve detailing fotoğrafları masaüstü/tablette kare gösterilir. Mobilde PPF ve seramik 4:5, detailing 1:1 oranındadır. Kırpım yalnızca CSS ile uygulanır; kaynak dosyalara kalıcı kırpma yapılmadı. Seramik fotoğrafı ürünün aplikatöre hazırlanmasını, detailing fotoğrafı dış yüzey bakımının polisaj adımını gösterir. Görseller VANTA'nın müşteri işleri olarak sunulmaz.

Teknik metin kontrolü için birincil referanslar: https://www.xpel.com/products/category/paint-protection-film ve https://www.xpel.com/products/automotive-ceramic-coating. Fiziksel film koruması ile yüzeyin su iticiliği/temizlik kolaylığı ayrımı gözetildi. Bu referanslar VANTA'nın XPEL ürünü kullandığı, yetkili uygulamacı olduğu veya ürün garantisi sunduğu anlamına gelmez; arayüzde böyle bir marka veya garanti iddiası yoktur.

## Faz 4 — Bağımsız /galeri sayfası

Yeni fotoğraf indirilmedi veya üretilmedi. Önceki aşamalarda lisans kaydı tutulan sekiz farklı fotoğraf tekrar kullanılır; `detailing-hero-mobile.jpg` aynı çekimin kırpımı olduğundan ayrı bir galeri fotoğrafı sayılmaz. Pexels lisansı ve sekiz kaynak sayfası bu aşamada yeniden kontrol edildi. Lisans: https://www.pexels.com/license/.

Ortak kayıtlar `frontend/src/data/gallery.ts` içindedir. `GalleryPreview`, `previewSizes` tanımlı dört kaydı seçer; `/galeri` sekiz kaydın tamamını kullanır. Kaynak, fotoğrafçı ve lisans bilgileri her kaydın `source` alanında bulunur.

| ID / kategori | Kaynak URL | Fotoğrafçı / lisans | Yeniden kullanılan dosya |
| --- | --- | --- | --- |
| `ppf` / PPF Kaplama | https://www.pexels.com/photo/bearded-man-applying-foil-on-sports-car-hood-20051468/ | WAVYVISUALS / Pexels License | `frontend/src/assets/images/gallery-ppf.jpg` |
| `ceramic` / Seramik Kaplama | https://www.pexels.com/photo/applying-oil-on-blue-sponge-20051451/ | WAVYVISUALS / Pexels License | `frontend/src/assets/images/gallery-ceramic.jpg` |
| `correction` / Boya Düzeltme | https://www.pexels.com/photo/polish-cream-on-polisher-foam-20042053/ | WAVYVISUALS / Pexels License | `frontend/src/assets/images/gallery-correction.jpg` |
| `care` / Detaylı Bakım | https://www.pexels.com/photo/a-close-up-shot-of-a-person-brushing-a-car-6873020/ | Tima Miroshnichenko / Pexels License | `frontend/src/assets/images/gallery-care.jpg` |
| `ppf-placement` / PPF Kaplama | https://www.pexels.com/photo/men-holding-foil-over-car-20051465/ | WAVYVISUALS / Pexels License | `frontend/src/assets/images/service-ppf.jpg` |
| `ceramic-preparation` / Seramik Kaplama | https://www.pexels.com/photo/applying-car-cleaner-on-blue-sponge-20051453/ | WAVYVISUALS / Pexels License | `frontend/src/assets/images/service-ceramic.jpg` |
| `surface-polishing` / Boya Düzeltme | https://www.pexels.com/photo/a-person-polishing-the-black-car-5233259/ | Khunkorn Laowisit / Pexels License | `frontend/src/assets/images/detailing-hero.jpg` |
| `fender-polishing` / Boya Düzeltme | https://www.pexels.com/photo/man-cleaning-sports-car-20042056/ | WAVYVISUALS / Pexels License | `frontend/src/assets/images/service-detailing.jpg` |

Kategoriler fotoğraftaki işleme göre atanır: makineyle polisaj fotoğrafları Boya Düzeltme, fırçayla temizlik Detaylı Bakım altında yer alır. İki seramik fotoğrafı ürün hazırlığını, polisaj pedi fotoğrafı da hazırlık adımını gösterir; caption ve alt metinleri bunu açıklar. Hiçbiri tamamlanmış VANTA müşteri işi veya sonuç/garanti iddiası olarak sunulmaz. Galeri girişindeki stok fotoğraf notu görünürdür.

Yerel dosyaların önceki boyut/sıkıştırma kayıtları aşağıda korunur. Lightbox yeni bir büyük dosya kopyası oluşturmaz; aynı statik import'un optimize edilmiş türevini `object-fit: contain` ile gösterir. Fotoğrafın tamamı korunur. Galeri küçük görsellerindeki kırpım `position` alanıyla belirlenir.

## Faz 6 — Hizmet detay fotoğrafları

Kaynak sayfaları ve [Pexels lisansı](https://www.pexels.com/license/) 22 Ekim 2026 tarihinde kontrol edildi. Aşağıdaki gerçek fotoğraflar web kullanımına ve düzenlemeye izin veren Pexels License altında sunulur. Atıf zorunlu değildir; fotoğrafçı kaydı burada korunur. Kişi veya markaların VANTA'yı desteklediği, VANTA'nın bu ürünlerin bayisi olduğu veya fotoğrafların VANTA müşteri işi olduğu iddia edilmez. Sayfalardaki stok fotoğraf notu görünürdür.

| Konu | Kaynak URL | Fotoğrafçı | Lisans | Projedeki dosya |
| --- | --- | --- | --- | --- |
| Şeffaf filmin uygulamaya hazırlanması | https://www.pexels.com/photo/men-holding-and-spraying-foil-near-cars-20051463/ | WAVYVISUALS | Pexels License | `frontend/src/assets/images/detail-ppf-preparation.jpg` |
| Koltuk yüzeyinin bezle temizliği | https://www.pexels.com/photo/a-man-in-black-jacket-cleaning-the-seat-of-a-car-6873185/ | Tima Miroshnichenko | Pexels License | `frontend/src/assets/images/detail-interior-care.jpg` |
| Boya yüzeyinde polisajla hazırlık | https://www.pexels.com/photo/a-person-polishing-the-white-car-5233279/ | Khunkorn Laowisit | Pexels License | `frontend/src/assets/images/detail-paint-preparation.jpg` |

| Dosya | Orijinal URL | Orijinal çözünürlük | Yerel çözünürlük / boyut |
| --- | --- | --- | --- |
| `detail-ppf-preparation.jpg` | https://images.pexels.com/photos/20051463/pexels-photo-20051463.jpeg | 4160 × 2768 | 1600 × 1065 / 181232 bayt |
| `detail-interior-care.jpg` | https://images.pexels.com/photos/6873185/pexels-photo-6873185.jpeg | 6000 × 4000 | 1600 × 1067 / 101170 bayt |
| `detail-paint-preparation.jpg` | https://images.pexels.com/photos/5233279/pexels-photo-5233279.jpeg | 4928 × 3264 | 1400 × 927 / 105895 bayt |

Mevcut `sharp` ile yön düzeltme, orantılı küçültme ve kalite 85 JPEG sıkıştırması uygulandı. Kalıcı kırpma veya generatif düzenleme yapılmadı. Gösterim kırpımı hizmetin `detail.hero.position` / `detail.supporting.position` verisi ve CSS ile yönetilir. Yeni bağımlılık veya AI görseli yoktur.

PPF destek fotoğrafı mevcut `gallery-ppf.jpg`, seramik giriş fotoğrafı mevcut `gallery-ceramic.jpg`, detailing destek fotoğrafı mevcut `gallery-care.jpg` dosyasıdır. Kaynakları ve lisansları aşağıdaki Faz 3 tablosundadır; aynı fotoğrafların dosya kopyaları oluşturulmadı. Ana sayfa/katalogdaki üç hizmet fotoğrafı yeni detay girişlerinde tekrarlanmaz. Seramik sayfasındaki beyaz araç fotoğrafı **kaplama uygulaması değil**, ihtiyaç halinde değerlendirilen yüzey hazırlığı örneğidir; caption bunu açıkça belirtir.

Teknik içerik kontrolünde üretici kaynakları: https://www.xpel.com/products/category/paint-protection-film ve https://www.xpel.com/products/automotive-ceramic-coating. Genel film/kaplama ayrımı ve bakım yaklaşımı esas alınır; VANTA için ürün markası, süre, fiyat, sertifika veya garanti taahhüdü çıkarılmaz. Gerçek uygulama talimatı seçilecek ürünün üreticisine bağlıdır.

## Faz 3 — Uygulama Detayları / GalleryPreview

Bu bölümdeki dört fotoğraf da gerçek uygulama veya hazırlık detaylarını gösterir. AI üretimi, generatif düzenleme ve sahte before/after kullanılmadı. Mevcut hero ve hizmet fotoğrafları tekrar kullanılmaz. PPF ve seramik çekimleri hizmet fotoğraflarıyla aynı seriden, farklı karelerdir; galeri film kenarına, damlaya, polisaj pedine ve fırçayla temizliğe daha yakından bakar.

| Konu | Kaynak URL | Fotoğrafçı | Lisans | Projedeki dosya |
| --- | --- | --- | --- | --- |
| Kaput kenarına PPF yerleştirme | https://www.pexels.com/photo/bearded-man-applying-foil-on-sports-car-hood-20051468/ | WAVYVISUALS | Pexels License | `frontend/src/assets/images/gallery-ppf.jpg` |
| Seramik ürününün aplikatöre hazırlanması | https://www.pexels.com/photo/applying-oil-on-blue-sponge-20051451/ | WAVYVISUALS | Pexels License | `frontend/src/assets/images/gallery-ceramic.jpg` |
| Boya düzeltme için polisaj pedi hazırlığı | https://www.pexels.com/photo/polish-cream-on-polisher-foam-20042053/ | WAVYVISUALS | Pexels License | `frontend/src/assets/images/gallery-correction.jpg` |
| Cam/gövde birleşiminin detay fırçasıyla temizliği | https://www.pexels.com/photo/a-close-up-shot-of-a-person-brushing-a-car-6873020/ | Tima Miroshnichenko | Pexels License | `frontend/src/assets/images/gallery-care.jpg` |

Lisans 22 Ekim 2026 tarihinde https://www.pexels.com/license/ üzerinden kontrol edildi. Dört kaynak sayfası da ücretsiz kullanımı belirtiyor. Lisans web kullanımına ve düzenlemeye izin verir; atıf zorunlu değildir. Değiştirilmemiş kopyaları satma, stok platformlarında yeniden dağıtma, ticari marka olarak kullanma ve fotoğraftaki kişi/markaların desteğini ima etme kısıtları geçerlidir.

İndirilen orijinaller ve yerel optimizasyon:

| Dosya | Orijinal URL | Orijinal çözünürlük | Yerel çözünürlük / boyut |
| --- | --- | --- | --- |
| `gallery-ppf.jpg` | https://images.pexels.com/photos/20051468/pexels-photo-20051468.jpeg | 2649 × 3981 | 1600 × 2405 / 275806 bayt |
| `gallery-ceramic.jpg` | https://images.pexels.com/photos/20051451/pexels-photo-20051451.jpeg | 2768 × 4160 | 1200 × 1803 / 115430 bayt |
| `gallery-correction.jpg` | https://images.pexels.com/photos/20042053/pexels-photo-20042053.jpeg | 2768 × 4160 | 1200 × 1803 / 80576 bayt |
| `gallery-care.jpg` | https://images.pexels.com/photos/6873020/pexels-photo-6873020.jpeg | 5835 × 3890 | 1800 × 1200 / 131934 bayt |

Mevcut `sharp` ile EXIF yön düzeltme, orantılı küçültme ve kalite 85 JPEG sıkıştırması uygulandı; dosyalara kalıcı kırpma yapılmadı. Gösterimdeki kırpım `gallery-preview` stillerindeki `object-fit` ve fotoğrafa özel `object-position` ile belirlenir. Next.js Image Optimization cihazın boyutuna uygun türevleri üretir.

Seramik karesinde şişedeki Ceramic Pro etiketi ve aplikatöre düşen damla; boya düzeltme karesinde ürün eklenmiş polisaj pedi görülür. Bunlar hazırlık detaylarıdır; yüzeye uygulama veya tamamlanmış sonuç diye sunulmaz. Bölümde görünen stok fotoğraf notu, bunların VANTA müşteri işleri olmadığını açıkça belirtir. Ürün kullanımı, yetkili bayilik veya kişi/marka desteği iddia edilmez.

İşletmeye ait kullanım onaylı çekimler geldiğinde ortak `src/data/gallery.ts` dosyasındaki görsel import'larını, `alt` metinlerini, caption'ları, kategorileri ve kaynak bilgilerini birlikte güncelleyin; izin kaydını buraya ekleyin. Başlık ve stok fotoğraf notunu da gerçek içerikle uyumlu olarak değiştirin. Backend bağlantısı bu aşamada eklenmedi.

## Faz 2 — Hizmet fotoğrafları

Üç fotoğrafın fotoğrafçısı **WAVYVISUALS**, lisansı **Pexels License**: https://www.pexels.com/license/. Kaynak sayfaları ücretsiz kullanımı açıkça belirtiyor. Web sitesinde kullanım ve düzenleme lisans kapsamında; atıf zorunlu olmamakla birlikte fotoğrafçı kaydı korunuyor.

| Hizmet | Kaynak URL | Fotoğrafçı / lisans | Projedeki dosya |
| --- | --- | --- | --- |
| PPF Kaplama | https://www.pexels.com/photo/men-holding-foil-over-car-20051465/ | WAVYVISUALS / Pexels License | `frontend/src/assets/images/service-ppf.jpg` |
| Seramik Kaplama | https://www.pexels.com/photo/applying-car-cleaner-on-blue-sponge-20051453/ | WAVYVISUALS / Pexels License | `frontend/src/assets/images/service-ceramic.jpg` |
| Detailing | https://www.pexels.com/photo/man-cleaning-sports-car-20042056/ | WAVYVISUALS / Pexels License | `frontend/src/assets/images/service-detailing.jpg` |

Görseller indirilip incelendi. PPF fotoğrafında kaput üzerine yerleştirilen şeffaf film; seramik fotoğrafında seramik kaplama ürününün aplikatöre damlatılması; detailing fotoğrafında makineyle polisaj görülüyor. Seramik görseli kaplama hazırlık adımını gösterir; genel yıkama veya polisaj görseli değildir. Üçü de aynı gerçek otomotiv çekim serisindendir; AI üretimi veya generatif düzenleme kullanılmadı.

İndirilen orijinaller:

- PPF: https://images.pexels.com/photos/20051465/pexels-photo-20051465.jpeg — 2576 × 3872 px; kaynak sayfasındaki tarih 29 Ocak 2024.
- Seramik: https://images.pexels.com/photos/20051453/pexels-photo-20051453.jpeg — 2768 × 4160 px; kaynak sayfasındaki tarih 29 Ocak 2024.
- Detailing: https://images.pexels.com/photos/20042056/pexels-photo-20042056.jpeg — 2768 × 4160 px; kaynak sayfasındaki tarih 28 Ocak 2024.

Mevcut `sharp` ile yalnızca yön düzeltme, boyutlandırma ve JPEG sıkıştırması uygulandı. PPF 1600 × 2405 px / 531108 bayt, seramik 1200 × 1803 px / 127691 bayt, detailing 1200 × 1803 px / 208611 bayt olarak kaydedildi. Orijinal kompozisyonlar dosyalarda korunur; gösterim kırpımı CSS `object-fit` / `object-position` ile yapılır. Tarayıcıya Next.js Image Optimization üzerinden responsive boyutlar sunulur.

Bunlar lisanslı sektör fotoğraflarıdır; VANTA'nın çalışanı, müşteri işi veya stüdyosu olarak tanıtılmaz. Fotoğraftaki marka ve kişilerle yetkili bayilik, ürün kullanımı veya destek ilişkisi iddia edilmez. Değiştirilmemiş kopyaları satma, stok platformlarında yeniden dağıtma veya görselleri ticari marka olarak kullanma yasakları dahil Pexels kısıtları geçerlidir.

## Hero fotoğrafı

- Fotoğrafçı: Khunkorn Laowisit.
- Kaynak: https://www.pexels.com/photo/a-person-polishing-the-black-car-5233259/
- Kaynak dosya: https://images.pexels.com/photos/5233259/pexels-photo-5233259.jpeg
- Lisans: Pexels License — https://www.pexels.com/license/
- Kaynak sayfası görüntüyü “Free to use” olarak işaretliyor. Pexels lisansı indirme, web sitesinde kullanım ve düzenlemeye izin veriyor; atıf zorunlu değil. Fotoğrafçı kredisi bu kayıtta korunuyor.
- Kaynak sayfasındaki çekim bilgisi: Nikon D5100, 24 mm, 6 Aralık 2018. Yüklenme tarihi: 31 Ağustos 2020. Kaynak gerçek bir fotoğraf; AI üretimi, sentetik before/after veya illüstrasyon kullanılmadı.
- Orijinal çözünürlük: 2560 × 1696 px.
- `detailing-hero.jpg`: 2400 × 1590 px, 349888 bayt. Yeniden boyutlandırma ve JPEG sıkıştırması uygulandı.
- `detailing-hero-mobile.jpg`: 960 × 1441 px, 140002 bayt. Aynı fotoğraftan eller ve polisaj makinesi merkezde kalacak şekilde portre kırpımı oluşturuldu. Orijinal üzerinde left=1090, top=0, width=1130, height=1696 alanı kullanıldı; ardından 960 px genişliğe indirildi.
- İşlem için mevcut Next.js kurulumundaki `sharp` kullanıldı; bağımlılık eklenmedi. Yapay görüntü üretimi veya generatif düzenleme yapılmadı.

Fotoğraf VANTA'nın stüdyosu, çalışanı veya müşteri işi olarak tanıtılmıyor; tasarımda lisanslı bir sektör fotoğrafı olarak kullanılıyor. Fotoğraftaki kişi veya markanın VANTA'yı desteklediği iddia edilmiyor. Pexels'in değiştirilmemiş kopya satışı, stok platformunda yeniden dağıtım, marka olarak kullanım ve destek/onay izlenimi oluşturma kısıtları geçerlidir.

## Değiştirme düzeni

Masaüstü ve mobil fotoğraflar `src/components/hero.tsx` içinde statik import edilir. İşletmeye ait onaylı fotoğraflar geldiğinde iki dosyayı birlikte değiştirin ve bu kaydı güncelleyin. Masaüstü için en az 2400 px genişliğinde yatay bir çekim, mobil için en az 960 px genişliğinde portre kırpımı önerilir. Fotoğrafın sağ/üst bölümünde uygulama, sol/alt bölümünde metin için sakin alan bulunması mevcut kompozisyonu korur.

Gerçek çekimi, kullanım hakkını ve gösterilen kişi/işletme bilgilerini doğrulayın. Kırpmanın odağını `globals.css` içindeki `--hero-image-position` değişkeniyle ayarlayabilirsiniz. Hero metni ve görselin `alt` açıklaması yeni fotoğrafla uyumlu olmalıdır.
