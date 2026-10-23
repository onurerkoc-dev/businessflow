# BusinessFlow — Premium frontend redesign

Frontend; ana sayfa, `/galeri`, `/hizmetler`, `/hakkimizda`, `/iletisim`, `/teklif-al` ve üç bağımsız hizmet detay sayfasından oluşur. Teklif formu yalnızca tarayıcı içinde doğrulama ve bilgi özeti sunar. Backend, veritabanı, admin veya talep yönetimi entegrasyonu içermez. Yeni bağımlılık eklenmedi. Aşağıdaki faz kayıtları tarihseldir; son kalite sonuçları Faz 10 bölümünde ve [ayrıntılı denetim raporunda](docs/PHASE10_AUDIT.md) bulunur.

**VANTA geçici proje markasıdır.** Demo niteliği Hakkımızda, İletişim ve footer'da kısa biçimde açıklanır. Uydurma adres, telefon, e-posta, çalışma saati, müşteri yorumu, sertifika, garanti veya geçmiş proje iddiası yoktur. `robots` ayarı indekslemeyi engeller.

## Çalıştırma

Mevcut bağımlılıklarla frontend dizininde:

```powershell
cd frontend
npm run dev
```

Sunucunun terminalde bildirdiği adresi açın; varsayılan adres http://localhost:3000.

```powershell
npm run lint
npm run build
npx --no-install tsc --noEmit
npm run start
```

Tip kontrolünü build ile aynı anda çalıştırmayın; Next.js build sırasında tip dosyalarını yeniden üretir. Önceki aşamada bu Windows/Node.js ortamında görülen Turbopack CSS alt süreç sorunu nedeniyle `dev` ve `build` zaten Webpack kullanmaktadır. Mevcut Next.js/App Router/TypeScript yapısı ve bu ayar korunmuştur.

## Referans incelemesi

https://gebzeppf.com/ sitesi masaüstü ve mobil tarayıcıda açıldı. Ana sayfa, mobil menü, hizmet listesi ve seramik kaplama detay sayfası incelendi. Gerçek uygulama fotoğrafları, doğrudan hizmet adları, tutarlı koyu yüzeyler ve belirgin randevu aksiyonu temel alınan prensiplerdir. Referansın randevu CTA'ları telefon bağlantılarına gidiyor. İşletmeye ait doğrulanmış bir teklif kanalı olmadığından VANTA için telefon veya teklif işlevi uydurulmadı.

Bizde tek parça, ekran genişliğinde uygulama fotoğrafı; sol/alt bölgede dengeli başlık; kontrollü karartma ve açık renkli bir hizmet geçişi kullanılır. Referansın fotoğrafları, metinleri, istatistikleri, yorumları veya bölüm düzeni kopyalanmadı. Görselin görünmesini JavaScript veya giriş animasyonuna bağlayan bir akış yoktur.

## Dosyalar ve bileşen sınırları

- `src/app/globals.css`: Renk, typography, spacing, header yüksekliği, görsel odağı, buton, focus, responsive ve azaltılmış hareket token/stilleri.
- `src/app/layout.tsx`: Türkçe dil, VANTA metadata, indeksleme engeli, ortak header/footer ve içeriğe geç bağlantısı.
- `src/app/hakkimizda/page.tsx`: Bağımsız Hakkımızda sayfası, metadata, yaklaşım metni ve yerel dört adımlı içerik. Server Component.
- `src/components/footer.tsx`: Marka açıklaması, sayfa ve hizmet navigasyonu, demo bilgisi. Server Component.
- `src/app/iletisim/page.tsx`: İletişim giriş alanı, doğrulanmış bilgi bulunmadığında demo açıklaması, hizmet rehberi ve galeri/katalog yönlendirmeleri. Server Component.
- `src/data/contact.ts`: İsteğe bağlı telefon, e-posta, adres ve çalışma saatlerinin tipli yerel kaydı; doğrulanmış veri bulunmadığı için boş.
- `src/app/page.tsx`: Ana içerik, sırasıyla `Hero`, `Services` ve `GalleryPreview` bileşimi.
- `src/components/header.tsx`: Kompakt marka, ortak navigasyon ve hizmet CTA'sı. Server Component; bağlantılar route durumunu okuyabilen küçük `NavigationLinks` bileşeninden gelir.
- `src/components/navigation-links.tsx`: Client Component. `usePathname` ile doğru `aria-current="page"` durumunu verir. Hizmet adları gerçek detay sayfalarına; Galeri, Hakkımızda ve İletişim kendi route'larına; Hizmetleri İncele `/hizmetler` adresine gider.
- `src/components/hero.tsx`: Mevcut hero metni ve responsive gerçek fotoğraf. Eski düz hizmet listesi bu bileşenden çıkarıldı; hero'nun kendisi korunur. Server Component.
- `src/components/services.tsx`: Üç fotoğraflı ana sayfa hizmet önizlemesi. Ortak `services` dizisini `map()` ile semantik `article` öğelerine dönüştürür. Mevcut düzen ve anchor kimlikleri korunur. Tüm Hizmetler bağlantısı `/hizmetler` adresine gider. Server Component.
- `src/data/services.ts`: `Service` tipi ve üç hizmetin ortak dizisi. Önizleme alanlarına ek olarak `detail` içinde metadata, açıklama, faydalar, süreç, FAQ ve iki fotoğraf kaydı bulunur.
- `src/app/hizmetler/page.tsx`: Bağımsız katalog, H1/H2 hiyerarşisi, stok fotoğraf notu ve özel metadata. Server Component.
- `src/app/hizmetler/[slug]/page.tsx`: Üç hizmetin ortak Server Component route'u, async params, metadata ve statik üretim.
- `src/app/hizmetler/[slug]/not-found.tsx`: Geçersiz hizmet için katalog bağlantısı bulunan 404 görünümü.
- `src/components/gallery-preview.tsx`: Uygulama Detayları bölümü. Ortak dizide `previewSizes` tanımlı dört kayıt `figure` / `figcaption` olarak render edilir. Server Component; altındaki Next.js Link, bağımsız galeriye gider. Önizlemenin fotoğraf düzeni korunur.
- `src/data/gallery.ts`: Sekiz farklı fotoğrafın tipli ortak dizisi. ID, kategori, görsel, alt metin, caption, kırpım konumu, opsiyonel önizleme boyutu ve kaynak/lisans bilgileri içerir.
- `src/app/galeri/page.tsx`: Galeri route'u, statik giriş, stok fotoğraf notu ve sayfaya özel metadata. Server Component.
- `src/components/gallery.tsx`: Galerinin filtre ve lightbox etkileşimlerini kapsayan Client Component.
- `src/components/mobile-menu.tsx`: Native `details/summary` üzerine Escape, dışarı tıklama, bağlantı seçimi ve breakpoint değişiminde kapanma ekleyen Client Component. Tasarımı ve uygulaması Faz 4'te değişmedi.
- `tests/gallery.browser.js`: Mevcut Playwright MCP'de çalıştırılabilen, bağımlılık eklemeyen galeri kontrolleri.
- `tests/services.browser.js`: Mevcut Playwright MCP'de çalışan hizmet kataloğu, navigasyon ve responsive kontrolleri.
- `tests/service-details.browser.js`: Üç detay sayfası, 404, metadata, responsive görseller, FAQ ve detay bağlantılarının tarayıcı kontrolleri.
- `tests/about-footer.browser.js`: Sekiz sayfa × altı genişlikte footer/header regresyonu, Hakkımızda fotoğraf hizası ve bağlantıların klavye kontrolleri.
- `tests/contact.browser.js`: İletişim içeriği, metadata, fotoğraf, gerçek bağlantılar ve mobil/klavye navigasyonu.
- `src/assets/images/about-surface-care.jpg`, `about-wash-preparation.jpg`: Hakkımızda sayfasına özel iki gerçek Pexels fotoğrafı.
- `src/assets/images/contact-detailing-tools.jpg`: İletişim sayfasına özel WAVYVISUALS / Pexels fotoğrafı; kaynak ve lisans `SOURCES.md` içindedir.
- `src/assets/images/detailing-hero.jpg`: Masaüstü fotoğrafı.
- `src/assets/images/detailing-hero-mobile.jpg`: Aynı fotoğrafın mobil kompozisyonu.
- `src/assets/images/SOURCES.md`: Fotoğrafçı, kaynak, lisans, çözünürlük ve kırpma kaydı.
- `src/assets/images/service-ppf.jpg`, `service-ceramic.jpg`, `service-detailing.jpg`: WAVYVISUALS / Pexels lisanslı gerçek uygulama fotoğrafları; kaynak kayıtları `SOURCES.md` içindedir.
- `src/assets/images/gallery-ppf.jpg`, `gallery-ceramic.jpg`, `gallery-correction.jpg`, `gallery-care.jpg`: Galeriye özel dört gerçek fotoğraf. Fotoğrafçı, kaynak, lisans ve sıkıştırma kayıtları `SOURCES.md` içindedir.

Eski `public/images/detailing-study.svg` silindi. Teklif popover'ı ve hedefi olmayan navigasyon öğeleri kaldırıldı. Header'daki “Hizmetleri İncele” kataloğa, hero'daki aynı metinli bağlantı ana sayfanın hizmet önizlemesine gider. Header, katalog ve önizlemeden hizmet detaylarına erişilir.

## Tasarım sistemi

| Token | Değer | Görevi |
| --- | --- | --- |
| `--background` | `#141819` | Ana kömür grisi |
| `--surface` | `#202526` | İkincil koyu yüzey |
| `--foreground` | `#F1EFEA` | Ana metin ve açık hizmet yüzeyi |
| `--muted` | `#B1B5B2` | Koyu zeminde ikincil metin |
| `--accent` | `#A88367` | Sınırlı bakır marka vurgusu |
| `--border` | `#363D3B` | Koyu yüzey sınırları |

Açık yüzeylerde ikincil metin, çizgi ve focus için ayrıca anlamlı token'lar tanımlıdır. Sistem fontları (`Bahnschrift`/`DIN Alternate`/`Arial` başlık; `Segoe UI`/`Helvetica Neue`/`Arial` body) Türkçe karakter desteği ve harici font isteği olmadan çalışır; işletim sistemine göre görünüm küçük farklılık gösterebilir. Başlık masaüstünde en fazla 64 px, mobilde yaklaşık 34–46 px aralığındadır.

Tailwind CSS 4 kurulumu korunur; token'lar `@theme inline` ile utility sınıflarına açılır. Temel kurallar `@layer base`, bileşenler ve responsive stilleri `@layer components` içinde tutulur. Maskeler yalnızca fotoğraf üzerinde metin kontrastını sağlamak için kullanılır. Kart ızgarası, glassmorphism, carousel veya otomatik giriş animasyonu eklenmedi.

## Responsive ve erişilebilirlik

Header 1024 px altında mobil menüye geçer. 768 px altında ayrı portre kırpımı seçilir; header 72 px, masaüstünde 84 px taban yüksekliğindedir. Boşluklar ve başlık `clamp()` ile ölçeklenir. Mobilde fotoğraftaki eller ve polisaj makinesi üst/orta alanda, metin alt alanda kalır. Hizmet adları mobilde alt alta yerleşir.

Menü Enter/Space ile açılır, Tab normal belge sırasını izler, Escape kapatıp Menü kontrolüne odak döndürür. Dışarı tıklama, anchor seçimi ve masaüstüne geçiş de menüyü kapatır. Native menü temel aç/kapat davranışı JavaScript olmadan çalışır. Görünür focus, en az 44 px etkileşim alanı, sticky header için anchor kaydırma payı ve `prefers-reduced-motion` desteği korunmuştur. Menü modal değildir.

## Fotoğraf kaynağı ve optimizasyon

Fotoğraf: Khunkorn Laowisit / Pexels, https://www.pexels.com/photo/a-person-polishing-the-black-car-5233259/.

Lisans kontrolü: https://www.pexels.com/license/. Fotoğraf web kullanımına ve düzenlemeye izin veren Pexels lisansı altında sunuluyor. Gerçek kamera/çekim bilgileri kaynakta mevcut. Fotoğraf işletmenin kendi işi veya stüdyosu olarak tanıtılmaz. Ayrıntılı kayıt ve değiştirme rehberi `src/assets/images/SOURCES.md` içindedir.

Masaüstü kaynak dosyası yaklaşık 342 KiB, mobil kaynak dosyası yaklaşık 137 KiB'dir. `next/image` + `getImageProps` + `picture` sayesinde tarayıcı yalnızca breakpoint'e uygun kırpımı ve uygun responsive boyutu indirir. Next.js varsayılan kalite 75 ile modern görüntü formatı sunar. Kaynaklar statik import edilir; uzaktaki fotoğraf servisine çalışma anında bağımlılık yoktur.

Hero `loading="eager"` ve `fetchPriority="high"` kullanır. İki farklı art-direction kaynağının birlikte indirilmesine yol açabilecek varsayılan masaüstü preload'u eklenmez. Fotoğraf server HTML içinde keşfedilir, Client Component veya CSS background isteğini beklemez. Hero'nun ayrılmış minimum yüksekliği ve `fill` yerleşimi fotoğraf yüklenirken sayfa geometrisini korur. Gerçek LCP sonucu cihaz, sunucu, önbellek ve ağ koşullarına bağlıdır; yerel ölçüm saha verisi değildir.

## Tamamlanmayan kapsam

Teklif/randevu için gerçek bir hedef ve işletmeye ait doğrulanmış iletişim bilgileri yoktur; CTA bu nedenle gösterilmez. İşletmeye ait kullanım onaylı müşteri/stüdyo çekimleri ileride stok fotoğrafların yerini alabilir. Admin veya backend entegrasyonu bu çalışmaya dahil değildir.

## Faz 2 — Hizmetler düzeni

Kırık beyaz geçiş, büyük PPF fotoğrafı ve sağında iki daha küçük seramik/detailing anlatımıyla devam eder. Ayrı kart yüzeyleri, yuvarlatılmış köşeler, numaralandırma veya dekoratif ikon eklenmedi. Fotoğraf ve metinler normal okuma sırasındadır: PPF, seramik, detailing.

1024 px altında her anlatım kendi yatay fotoğraf/metin satırına geçer; 768 px altında fotoğraf üstte, metin altta tek sütun olur. PPF'nin 4:5 gösterimi filmin kaputa yerleştirilmesini vurgular. Diğer fotoğraflar masaüstünde 2:3, mobilde 3:4 oranında gösterilir. Kırpmalar uygulama araçlarını görünür bırakacak şekilde kontrol edilir.

Hizmet görselleri statik import, `fill`, responsive `sizes`, `loading="lazy"` ve küçük blur placeholder kullanır. Kaynak dosyaların boyutları mevcut `sharp` ile azaltıldı; Next.js tarayıcıya uygun boyut ve modern format sunar. Görsel alanları `aspect-ratio` ile ayrılır; hero'nun eager/high-priority ayarına dokunulmaz.

Veri veya etkileşim için tarayıcı state'i gerekmediğinden yeni bir Client Component yoktur. Ana sayfa build sırasında statik üretilebilir. Menüdeki `#ppf`, `#ceramic`, `#detailing` ve hero'daki `#services-intro` hedefleri korunmuştur. Servis açıklamaları fiziksel film koruması, su itici yüzey kaplaması ve detaylı temizlik/polisaj arasındaki farkı açıklar; ürün markası, süre veya garanti iddiası içermez.

## Faz 1 doğrulaması — 22 Ekim 2026

Bu başlık altındaki ölçümler önceki aşamaya aittir. Güncel galeri doğrulaması belgenin sonundadır.

- `npm run lint`: başarılı.
- `npm run build`: başarılı; ana sayfa statik üretildi. Son sandbox denemesinde `.next` dizini oluşturulurken EPERM alındı; aynı komut sandbox dışında başarılı tamamlandı.
- `npx --no-install tsc --noEmit`: başarılı.
- `npm run start`: başarılı; production sayfası HTTP 200 döndürdü.
- 1440 × 1000, 1280 × 900, 390 × 844, 375 × 812; ek olarak 320 ve 768 px genişliklerde taşma, navigasyon ve doğru fotoğraf kırpımı kontrol edildi. İstenen dört ana boyutun ekran görüntüleri incelendi.
- Menü Enter/Space/Tab/Escape, odak dönüşü, dışarı tıklama, tüm hizmet anchor'ları, bağlantı seçimi, breakpoint değişiminde kapanma, hero CTA, içeriğe geç ve azaltılmış hareket kontrolleri başarılı.
- Production tarayıcıda JavaScript hatası görülmedi. Safari/Firefox, gerçek cihaz ve gerçek ekran okuyucu testleri yapılmadı.

### Yerel hero yükleme gözlemi

Playwright üzerinden her genişlik için yeni tarayıcı bağlamı, DPR 1 ve production sunucusu kullanıldı. CPU/ağ yavaşlatması uygulanmadı; sunucu görsel önbelleği sıcak olabilir. LCP ve ilk yükleme CLS değerleri tarayıcının `PerformanceObserver` API'sinden alındı. Bu bir Lighthouse/DevTools denetimi veya saha ölçümü değildir; Chrome DevTools MCP aracı bu ortamda mevcut değil.

| Görünüm | Hero biçimi / gövde boyutu | Hero isteği | Gözlenen LCP | İlk yükleme CLS |
| --- | --- | --- | --- | --- |
| 1440 × 1000 | WebP / 85958 bayt | 1 | 100 ms | 0 |
| 1280 × 900 | WebP / 85958 bayt | 1 | 96 ms | 0 |
| 390 × 844 | WebP / 33056 bayt | 1 | 100 ms | 0 |
| 375 × 812 | WebP / 33056 bayt | 1 | 92 ms | 0 |

LCP öğesi her görünümde hero fotoğrafıydı. Masaüstü/mobil görsellerin birlikte indirilmediği ve harici font isteği olmadığı doğrulandı. Gerçek yayın ortamında mobil ağ, farklı DPR ve sunucu koşullarıyla ölçüm tekrarlanmalıdır.

## Faz 2 doğrulaması — 22 Ekim 2026

- `npm run lint`: başarılı.
- `npm run build`: başarılı; ana sayfa statik üretildi. İlk sandbox denemesinde `.next` yazma işleminde EPERM alındı; aynı komut izinli ortamda başarıyla tamamlandı.
- `npx --no-install tsc --noEmit`: başarılı; production build sonrasında çalıştırıldı.
- Production sunucusu `http://127.0.0.1:3005` üzerinde açıldı; ana sayfa HTTP 200 döndürdü.
- Chromium / Playwright ile 1440 × 1000, 1280 × 900, 390 × 844 ve 375 × 812 görünümleri kontrol edildi. Ekran görüntüleri incelendi; film, seramik ürünü/damla/aplikatör ve polisaj makinesi görünür. Yatay taşma ve mobil fotoğraf/metin çakışması yok.
- Üç görselin yüklenmesi, anlamlı `alt`, `loading="lazy"`, `srcset` ve responsive `sizes` değerleri doğrulandı. Başlık ve anchor hedefleri mevcut; boşa giden sayfa içi bağlantı yok.
- Masaüstünde üç hizmet bağlantısı hedef `article` öğesine odak taşıyor. Mobil menüyü Enter ile açma, seramik bağlantısını klavyeyle seçme, menünün kapanması ve hedefe odak geçişi doğrulandı. Hero CTA'sı hizmetler bölümüne ulaşıyor.
- Production tarayıcı konsolunda hata veya uyarı görülmedi. Header, mobil menü ve iki hero görselinin dosya hash'leri çalışma öncesiyle aynı.
- Gerçek cihaz, Safari/Firefox ve ekran okuyucu testi yapılmadı. Bu fazda performans skoru veya saha metriği ölçülmedi.

## Faz 3 — GalleryPreview

Bu bölüm Faz 3'ün kaydıdır; ortak veri ve bağımsız galeri için güncel açıklama Faz 4 bölümündedir.

`GalleryPreview`, Services sonrasında koyu grafit zeminde dört uygulama detayını gösterir. Başlık ve açıklama kullanıcı brief'indeki metinlerdir. Görünür stok fotoğraf notu, görsellerin VANTA müşteri çalışmaları olmadığını belirtir. Fotoğraflar PPF kenar yerleştirme, seramik kaplama ürünü hazırlığı, polisaj pedi hazırlığı ve detay fırçasıyla temizliği gösterir. Önceki bileşenlerdeki fotoğraf dosyaları tekrar kullanılmaz; PPF ve seramik farklı karelerle aynı çekim serisine aittir.

Veriler `src/components/gallery-preview.tsx` içindeki `galleryImages` dizisindedir. Her kayıt `id`, kategori, statik görsel import'u, açıklayıcı `alt` ve responsive `sizes` taşır. Gerçek işletme fotoğrafları geldiğinde bu kayıtlar ve kaynak belgesi güncellenebilir; henüz kullanılmayan API veya veri katmanı eklenmedi.

Etkileşim gerekmeyen bu bölüm bir Server Component'tir. Dört kayıt sunucuda semantik `section`, `figure` ve `figcaption` öğelerine dönüşür. Ek state, event handler, Client Component veya galeri kütüphanesi yoktur. Fotoğraflar bağlantı/buton gibi gösterilmez; Tab sırasında gereksiz durak oluşturmaz.

Mevcut Tailwind CSS 4 kurulumu ve token'lar korunur. Galeri stilleri `globals.css` içindeki `@layer components` katmanında, yalnızca `gallery-` sınıflarıyla sınırlıdır. Desktop grid 12 eşit kolondan oluşur: ilk sırada 7/5, ikinci sırada 4/8 kolon paylaşımı kullanılır. Her sıra kendi içinde aynı görsel yüksekliğini korur. Böylece Services'taki iki satıra yayılan büyük sol fotoğraf düzeni tekrarlanmaz. Başlık ve açıklama desktop'ta karşılıklı hizalanır; etiketler fotoğraf altında, düz zemin üzerinde okunur.

1024 px altında iki eşit sütun ve 4:5 görseller kullanılır; giriş metni alt alta geçer. 768 px altında tek sütun olur. Mobilde fotoğraflar sırasıyla 4:5, 3:4, 1:1 ve 4:3 oranındadır. `minmax(0, 1fr)` ve `min-width: 0` taşmayı önler. Fotoğrafa özel `object-position` değerleri film kenarı, damla/aplikatör, polisaj pedi ve fırçayı kadrajda tutar. CSS belge sırasını değiştirmez.

Kaynaklar mevcut `sharp` ile kalite 85 JPEG olarak küçültüldü; dört dosyanın toplamı 603746 bayttır. `next/image` statik import, `fill`, `sizes`, `loading="lazy"` ve blur placeholder kullanır. Görsel alanları desktop'ta sabitlenmiş responsive yükseklik, tablet/mobilde `aspect-ratio` ile önceden ayrılır. `sizes`, tarayıcının `srcset` içinden uygun çözünürlüğü seçmesini sağlar. Production'da Next.js Image Optimization'ın WebP yanıtları doğrulandı; çalışma anında Pexels'e istek yapılmaz.

### Faz 3 doğrulaması — 22 Ekim 2026

- `npm run lint`: başarılı.
- `npm run build`: başarılı; ana sayfa statik üretildi.
- `npx --no-install tsc --noEmit`: başarılı; build sonrasında çalıştırıldı.
- Production sunucusu `http://127.0.0.1:3006` üzerinde çalıştırıldı; ana sayfa HTTP 200 döndürdü. Doğrudan galeri için `/#gallery-preview` adresini açın.
- Chromium / Playwright ile 1440 × 1000, 1280 × 900, 768 × 1024, 390 × 844 ve 375 × 812 kontrol edildi; ekran görüntüleri incelendi. Fotoğraf kırpımları, iki sütun/tek sütun sırası ve etiket boşlukları doğrulandı. Yatay taşma ve görsel/etiket çakışması görülmedi.
- Beş genişlikte de dört fotoğrafın yüklenmesi, anlamlı `alt`, `loading="lazy"`, `srcset` ve `sizes` değerleri assert kontrolleriyle doğrulandı. Galeri Services sonrasındadır.
- Hesaplanan metin/zemin kontrastı başlık ve etiketlerde 15,56:1; açıklama ve stok fotoğraf notunda 8,62:1. Fotoğraf üzerinde metin katmanı kullanılmaz.
- Klavyeyle Tab / Enter üzerinden içeriğe geçme, Ctrl+End ile son galeri etiketine ulaşma, mobil menüyü Enter ile açma ve Escape ile kapatıp odağı geri getirme doğrulandı. İlk sayfa sonu kontrolü kaydırma bitmeden ölçüm yaptı; kaydırmanın tamamlanması beklendiğinde geçti.
- JavaScript kapalı ayrı tarayıcı bağlamında dört `figure`, başlık ve alt metinler sunucudan geldi. Mobilde seçilen dört optimize görsel URL'si WebP / HTTP 200 döndürdü. Bu kontrol görsellerin JavaScript'e bağlı bir giriş animasyonuyla gizlenmediğini de doğrular.
- Production konsolunda hata/uyarı görülmedi. Header, Hero, Services ve MobileMenu dosyalarının SHA-256 değerleri çalışma öncesiyle aynı.
- Gerçek cihaz, Safari/Firefox ve ekran okuyucu testi yapılmadı. Performans skoru veya saha metriği ölçülmedi. Tam galeri sayfası, lightbox, admin ve backend bağlantısı kapsam dışındadır.

## Faz 4 — Bağımsız galeri ve öğrenme notları

### Route ve Server / Client sınırı

App Router, `src/app/galeri/page.tsx` dosyasını `/galeri` URL'sine eşler. Ana sayfa önizlemesi silinmez; bu sayfa doğrudan URL ile de açılır. `page.tsx` bir Server Component'tir: başlık, açıklama, stok fotoğraf notu ve metadata sunucuda hazırlanır. Sekiz kayıt `Gallery` bileşenine prop olarak geçer.

Filtre ve modal tarayıcı etkileşimi gerektirdiğinden `Gallery` bir Client Component'tir. Header kabuğu ve GalleryPreview sunucuda kalır; yalnızca aktif route bilgisine ihtiyaç duyan `NavigationLinks` istemcide çalışır. Client modüllere backend veya API client eklenmedi.

### Ortak veri ve map

`src/data/gallery.ts`, `GalleryPhoto` tipi ve `galleryImages` dizisini dışa aktarır. Sekiz farklı çekimin her biri ID, kategori, statik görsel, `alt`, caption, kırpım konumu ve kaynak bilgisi içerir. `previewSizes` tanımlı dört kayıt ana sayfada seçilir. Fotoğraf metadata'sı iki galeri bileşeninde çoğaltılmaz. Mevcut Services verisi bu kapsamda değiştirilmedi.

Her iki görünümde `map()`, her kayıt için bir `figure` üretir. Sabit `photo.id`, React `key` değeridir; filtre değişince farklı fotoğrafların kimliği karışmaz. Fotoğraf ve altında kategori/caption birlikte bulunur. Kaynak kayıtları `SOURCES.md` içinde de belgelenir. Yeni görsel dosyası indirilmedi.

### Filtre state'i

`category` state'i başlangıçta `Tamamı` değerindedir. Diğer seçenekler metadata'daki kategorilerden `Set` ile türetilir; karşılığı olmayan kategori gösterilmez. `filter()` yalnızca seçilen kategoriye ait kayıtları döndürür. `aria-pressed` aktif seçimi, `role="status"` ise değişen gerçek fotoğraf sayısını bildirir. Filtre değişince odak butonda kalır. Kategori düğmeleri Tab ile gezilir, Enter/Space ile seçilir.

### Lightbox

`selectedPhoto` state'i hangi kaydın büyütüldüğünü tutar. Fotoğraf düğmesine basıldığında açan düğme ref'te saklanır; effect, native `dialog.showModal()` çağırır. Modal içinde ilk kontrol Kapat butonudur. Tarayıcı modal dışındaki içeriği inert yaparak arka plan etkileşimini engeller; body kaydırması ayrıca kilitlenir.

Kapat butonu `dialog.close()` çağırır. Escape native dialog davranışıyla kapatır. `onClose` seçimi temizler; effect cleanup önceki kaydırma stilini ve açan fotoğrafın odağını geri getirir. `onClose` açık dialog'dan gelen eski kapanma olaylarını dikkate almaz. Modalın erişilebilir adı kategori başlığı, açıklaması caption'dır. Büyük fotoğraf `object-fit: contain` kullanır; küçük görselin kırpımı büyük görsele taşınmaz. Slider, önceki/sonraki kontrolleri veya yeni kütüphane eklenmedi.

### Görsel optimizasyonu ve grid

Galeri kırık beyaz zemin ve mevcut Bahnschrift/Segoe UI ölçekleriyle ana sayfa önizlemesinden ayrılır. Masaüstünde dört kolonlu grid kullanılır: ilk iki ve son iki fotoğraf ikişer kolon kaplar, aradaki dört fotoğraf yakın plan dizisi oluşturur. Büyük ilk çift kare, son çift 4:3, ortadaki fotoğraflar 2:3 oranındadır. Filtrelenmiş sonuçlar iki eşit kolonda gösterilir.

1024 px altında grid iki eşit kolona, 768 px altında tek kolona geçer. Tablet/mobilde portreler 4:5, mobilde yatay kaynaklar 3:2 oranıyla gösterilir. Kategori düğmeleri yatay kaydırma gerektirmeden satıra sarılır. Caption'lar düz zeminde ve fotoğraftan ayrı yer alır. Lightbox `dvh` ile viewport'a sığar.

`next/image` statik import, `fill`, responsive `sizes`, lazy loading ve küçük görsellerde blur placeholder kullanır. `sizes`, dört kolon / iki kolon / tek kolon genişliklerine göre hesaplanır. Lightbox yalnızca açılan fotoğrafı eager yükler; bu kullanıcı isteğidir. Kaynak boyutları önceki aşamalarda `sharp` ile azaltılmıştır. Uygulama çalışma anında Pexels'e bağımlı değildir.

### Navigasyon ve metadata

Desktop ve mobil menüde `/galeri` bağlantısı, ana sayfa önizlemesinin altında da Tüm Galeriyi Gör bağlantısı vardır. Hepsi `next/link` kullanır. Ana sayfada mevcut `#home`, `#ppf`, `#ceramic`, `#detailing`, `#services-intro` hedefleri korunur; galeride bu hedefler `/#...` biçiminde ana sayfaya döner. `usePathname`, yalnızca doğru sayfanın bağlantısına `aria-current="page"` verir.

Galeriye özel title, description, Open Graph title/description/type/locale/siteName tanımlandı ve production HTML'de doğrulandı. Uydurma yayın domain'i, canonical veya mutlak paylaşım görseli URL'si eklenmedi. Mevcut demo projenin `noindex, nofollow` ayarı korunur; gerçek yayın hazırlığında domain ve indeksleme kararı ayrıca ele alınmalıdır.

### Faz 4 doğrulaması — 22 Ekim 2026

- `npm run lint`: başarılı.
- `npx --no-install eslint tests/gallery.browser.js`: başarılı; tarayıcı test dosyasında hata/uyarı yok.
- `npm run build`: başarılı; `/` ve `/galeri` statik üretildi.
- `npx --no-install tsc --noEmit`: başarılı; build sonrasında çalıştırıldı.
- Production sunucusu `http://127.0.0.1:3007` üzerinde çalıştırıldı; `/galeri` doğrudan HTTP 200 döndürdü.
- Desktop/mobil header bağlantıları, aktif sayfa durumu, önizleme bağlantısı ve galeriden beş ana sayfa anchor'ına dönüş doğrulandı.
- Filtreler: Tamamı 8, PPF Kaplama 2, Seramik Kaplama 2, Boya Düzeltme 3, Detaylı Bakım 1. Her sonuçta kategori metadata'sı ve `aria-pressed` kontrol edildi.
- Lightbox açma, kapatma butonu, Enter/Space, Escape, arka plana odak geçişinin engellenmesi, Tab'ın arka plan kontrollerine ulaşmaması, kaydırma kilidi ve kapanınca odak/stil geri dönüşü doğrulandı.
- 1440 × 1000, 1280 × 900, 1024 × 900, 768 × 1024, 390 × 844, 375 × 812 kontrol edildi. Ekran görüntüleri incelendi. Sekiz küçük görselin yüklenmesi, anlamlı alt metin, responsive `sizes` / `srcset`, caption yerleşimi, filtreler ve modalın ekrana sığması kontrol edildi. Yatay taşma görülmedi.
- Metin/zemin kontrastı ana metinlerde 15,56:1; ikincil metinlerde 5,44:1 olarak hesaplandı. Production konsolunda hata veya uyarı görülmedi.
- `Hero` ve `Services` dosyalarının SHA-256 değerleri çalışma öncesiyle aynı; bu bileşenlere veya tasarımlarına dokunulmadı.

Tekrarlanabilir etkileşim kontrolleri `tests/gallery.browser.js` içindedir. Bu dosya kurulu Playwright MCP'nin `browser_run_code_unsafe` aracında `filename: "frontend/tests/gallery.browser.js"` ile gerçekten çalıştırıldı ve geçti. Önce tarayıcıda çalışan uygulamanın bir sayfasını açın; test mevcut sekmenin origin'ini kullanır. Dosya bir Playwright `page` alan async fonksiyon ifadesidir; bağımsız komut satırı test runner'ı değildir. Projeye Playwright veya başka test bağımlılığı kurulmadı.

Terminal kontrollerini `frontend` dizininde çalıştırabilirsiniz:

```powershell
npm run lint
npm run build
npx --no-install tsc --noEmit
npm run start -- --port 3007
```

Sunucu zaten çalışıyorsa yeniden başlatmak yerine mevcut adresi kullanın. Tarayıcıda `/galeri` adresini, kategori düğmelerini ve fotoğrafların Büyüt kontrollerini inceleyebilirsiniz.

Gerçek cihaz, Safari/Firefox ve ekran okuyucu testleri yapılmadı. Stok fotoğrafların işletmeye ait onaylı çekimlerle değiştirilmesi ve yayın SEO ayarları sonraki kararları gerektirir. Backend, admin, formlar, Docker ve Git işlemleri bu kapsamda yapılmadı.

## Faz 5 — Hizmet kataloğu ve öğrenme notları

`src/app/hizmetler/page.tsx`, App Router'ın klasör/dosya kuralıyla doğrudan `/hizmetler` URL'sini oluşturur. Root layout ortak header'ı sağlar. Sayfa kendine ait title ve description tanımlar; global `noindex, nofollow` politikasını değiştirmez. İçerikte tek H1 ve üç hizmet için H2 kullanılır.

`src/data/services.ts` içindeki `Service` tipi; `id`, `slug`, `title`, `summary`, `image`, `alt` ve `previewSizes` alanlarını zorunlu tutar. Statik görsel tipi `StaticImageData`dır. Ana sayfa ve katalog aynı `services` dizisini kullanır; metin ve fotoğraf kayıtları çoğaltılmaz. İki görünüm de `map()` ile üç `article` üretir; `key` sabit hizmet ID'sidir. State, API client veya genel amaçlı veri katmanı eklenmedi.

`id`, ana sayfadaki `#ppf`, `#ceramic`, `#detailing` hedeflerini korur. `slug`, sonraki aşamada kullanılacak detay URL'sinin son parçasıdır:

| Hizmet | Slug | Gelecekteki detay URL'si |
| --- | --- | --- |
| PPF Kaplama | `ppf-kaplama` | `/hizmetler/ppf-kaplama` |
| Seramik Kaplama | `seramik-kaplama` | `/hizmetler/seramik-kaplama` |
| Detailing | `detailing` | `/hizmetler/detailing` |

Bu detay sayfaları bu aşamada oluşturulmadı; URL'lere giden kullanıcı bağlantısı yoktur. Arayüzde işlevsiz detay düğmesi veya yakında etiketi eklenmedi.

Ana sayfa önizlemesi mevcut asimetrik yerleşimi korur. Katalogda ise kırık beyaz girişin ardından koyu grafit yüzeyde geniş bir PPF satırı bulunur: metin solda, fotoğraf sağdadır. Seramik ve detailing aynı satırdaki iki büyük kare fotoğraf ve altlarındaki kısa açıklamalarla ayrılır. Kart yüzeyi, gölge, dekoratif ikon veya yeni font eklenmedi. Görsel incelemede seramik aplikatörünün kenarda kalması görülerek alt sıranın fotoğraf oranı kareye alındı; şişe, damla ve aplikatör birlikte görünür.

768 px altında katalog tek sütuna geçer; fotoğraf önce, açıklama sonra gelir. PPF ve seramik 4:5, detailing 1:1 oranını kullanır. Sadece sayfanın gerektirdiği üç hizmet ve kısa giriş bulunur; ek satış bölümü eklenmedi. Yeni CSS `@layer components` içinde `services-page`, `catalog-` ve gerekli bağlantı sınıflarıyla sınırlıdır; mevcut token'lar kullanılır.

Hem Services hem ServicesPage sunucu bileşenidir: tarayıcı state'i veya event handler gerekmez. Yeni Client Component oluşturulmadı. Ortak veriler sunucuda HTML'e dönüşür. Mevcut NavigationLinks, pathname üzerinden hizmet CTA'sına doğru `aria-current="page"` değerini verir; aktif durumda sınırlı bakır çerçeve kullanılır.

Görseller önceki aşamada optimize edilmiş gerçek Pexels çekimleridir. `next/image`, statik import, `fill`, responsive `sizes`, lazy loading ve blur placeholder kullanır. `aspect-ratio` görsele önceden yer ayırır. `sizes` katalog ve önizlemenin farklı genişliklerine göre ayrı tutulur. Çalışma anında uzaktaki stok servisine bağımlılık yoktur. Fotoğraf dosyaları değiştirilmedi; kaynak ve kullanım notu `SOURCES.md` içinde güncellendi.

Header'ın desktop/mobil Hizmetleri İncele bağlantısı `/hizmetler` adresine taşındı. Ana sayfa önizlemesinin altına Tüm Hizmetler eklendi. İkisi de Next.js Link kullanır. Hero'nun mevcut `#services-intro` bağlantısı ve header'daki hizmet adı anchor'ları korunur. Galeri bağlantıları ve aktif sayfa davranışı devam eder. Eski galeri testinden yalnızca artık header CTA'sı olmayan `services-intro` beklentisi çıkarıldı.

### Faz 5 doğrulaması — 22 Ekim 2026

- `npm run lint`: başarılı.
- `npx --no-install eslint tests/services.browser.js tests/gallery.browser.js`: başarılı, hata/uyarı yok.
- Son `npm run build`: başarılı; `/`, `/galeri` ve `/hizmetler` statik üretildi. Görsel kırpım düzeltmesinden sonra yeniden çalıştırıldı.
- `npx --no-install tsc --noEmit`: başarılı; son build sonrasında çalıştırıldı.
- Son production build `http://127.0.0.1:3008` üzerinde çalıştırıldı. `/hizmetler` doğrudan HTTP 200 döndürdü.
- `tests/services.browser.js`, kurulu Playwright MCP üzerinden gerçekten çalıştırıldı ve geçti. 1440 × 1000, 1280 × 900, 768 × 1024, 390 × 844, 375 × 812 kontrol edildi; ekran görüntüleri incelendi. Üç görsel, alt metinler, `sizes`/`srcset`, lazy loading, başlık hiyerarşisi, metadata, noindex ve yatay taşma kontrolleri geçti.
- Desktop/mobil header CTA'sı, Tüm Hizmetler bağlantısı, Enter/Space ile menü/bağlantı kullanımı, menünün seçim sonrası kapanması ve doğru aktif sayfa kontrol edildi. Henüz var olmayan detay sayfalarına bağlantı olmadığı doğrulandı.
- `tests/gallery.browser.js` regresyonu geçti: bütün kategori filtreleri, lightbox, Escape/odak dönüşü, arka plan engeli, responsive görünümler ve galeri/ana sayfa navigasyonu çalışıyor.
- Ana sayfada üç hizmet, dört galeri fotoğrafı ve masaüstünde mevcut asimetrik hizmet düzeni korundu. Önizleme metinlerinin navigasyon öncesi/sonrası eşitliği kontrol edildi; mobil görünüm incelendi.
- Hero, GalleryPreview, Gallery ve galeri page dosyalarının SHA-256 değerleri çalışma öncesiyle aynı. Production konsolunda hata veya uyarı görülmedi.
- Hesaplanan metin/zemin kontrastları girişte 15,56:1 ve 5,44:1; koyu katalogda 15,56:1 ve 8,62:1.

Uygulamayı `frontend` dizininde `npm run dev` ile çalıştırın. Production kontrolü için sırayla `npm run lint`, `npm run build`, `npx --no-install tsc --noEmit`, `npm run start -- --port 3008` kullanın. Sunucu zaten çalışıyorsa mevcut adresi açın.

Tarayıcı kontrollerini tekrarlamak için kurulu Playwright MCP'de çalışan uygulamanın bir sekmesini açıp `browser_run_code_unsafe` aracına `filename: "frontend/tests/services.browser.js"` veya `filename: "frontend/tests/gallery.browser.js"` verin. Testler sekmenin origin'ini kullanır. Bu dosyalar bağımsız bir CLI test runner'ı değildir; yeni test bağımlılığı eklenmedi.

Faz 5 sonunda hizmet detay sayfaları, backend/API bağlantısı ve işletmeye ait onaylı çekimler henüz yoktu. Gerçek cihaz, Safari/Firefox ve ekran okuyucu testleri yapılmadı. Backend, MySQL, Flyway, Docker, admin ve Git işlemleri bu aşamada yapılmadı.

## Faz 6 — Hizmet detay sayfaları

### Route ve içerik seçimi

`src/app/hizmetler/[slug]/page.tsx` tek bir dinamik route'tur. `ppf-kaplama`, `seramik-kaplama` ve `detailing` URL parçalarını aynı şablonla karşılar. Next.js 16'da `params`, `Promise<{ slug: string }>` olarak gelir; hem sayfa hem `generateMetadata` içinde `await params` ile okunur. `services.find()` slug'a karşılık gelen kaydı seçer. Kayıt yoksa `notFound()` çağrılır ve route'a ait `not-found.tsx` katalog bağlantılı 404 görünümünü gösterir.

`generateStaticParams()`, üç kayıt için `{ slug }` listesi döndürür; bilinen sayfalar build sırasında statik HTML olarak üretilir. Projede açık olan `cacheComponents` ile `dynamicParams: false` uyumlu değildir. Kurulu Next.js 16.4.2'nin desteklediği `ensureStatic = "navigation"`, bilinmeyen slug değerlendirmesini streaming yanıt başlamadan tamamlatır. Böylece geçersiz adres yalnızca ekranda 404 göstermekle kalmaz, gerçekten HTTP 404 döner. Global Next yapılandırması değiştirilmedi.

### Veri modeli ve Server Component

Mevcut `Service` tipine zorunlu `detail` nesnesi eklendi. Metadata açıklaması, giriş, genel açıklama, fayda dizisi, başlık/açıklama çiftlerinden oluşan süreç, soru/cevap dizisi ve iki fotoğraf kaydı burada tutulur. `ServiceDetailPhoto`, `StaticImageData`, alt metin, caption ve kırpım konumunu tanımlar. TypeScript eksik alanları derleme sırasında kontrol eder. Önizleme ve katalog mevcut alanlarını kullanmaya devam eder; detay verisi çoğaltılmaz.

Veriler şimdilik yereldir. Daha sonra API verisine uyarlamak için tek içerik kaynağı bulunur; bugün endpoint, fetch, API client veya backend değişikliği eklenmedi. Mevcut görsel tipi yerel Next.js import'larına uygundur; uzaktaki API görsellerine geçildiğinde görsel alanı ayrıca uyarlanmalıdır.

Yeni route ve 404 görünümü Server Component'tir. İçerik seçimi ve metadata tarayıcı state'i gerektirmez. FAQ native `details/summary` kullanır; Enter/Space ile yeni JavaScript olmadan açılır. Mevcut header/galeri istemci bileşenlerinin sınırı korunur; yeni Client Component veya etkileşim kütüphanesi yoktur.

### Kompozisyon, görseller ve önceki düzeltmeler

Girişte koyu grafit yüzey, içerik yolu, solda hizmet başlığı ve sağda uygulama fotoğrafı bulunur. Ana sayfa hero'sunun fotoğraf üstü metin düzeni kopyalanmaz. Açık yüzeyde genel açıklama/faydalar, fotoğraflı süreç ve FAQ; altta diğer iki hizmete sade metin bağlantıları vardır. Her hizmet farklı giriş ve destek fotoğrafı, açıklama ve FAQ kullanır. Fiyat, süre, garanti veya sertifika iddiası yoktur. Stok fotoğraf notu görünürdür.

1024 px altında giriş, açıklama ve FAQ tek sütuna geçer. Süreç fotoğrafı/metni 768 px altında alt alta gelir; diğer hizmet bağlantıları da tek sütun olur. PPF girişinde 4:3, kenar uygulamasında 4:5; seramik girişinde desktop/tablet kare ve mobilde 4:5; detailing girişinde 4:3 oranı kullanılır. Fotoğrafa özel `object-position` uygulama detaylarını kadrajda tutar. Belge sırası CSS ile değiştirilmez.

Üç yeni gerçek fotoğraf mevcut `sharp` ile toplam 388297 bayta küçültüldü. Kaynak, fotoğrafçı, lisans ve çözünürlükler `src/assets/images/SOURCES.md` içindedir. Var olan üç yakın plan fotoğraf tekrar dosya üretmeden kullanılır. `next/image`, statik import, `fill`, responsive `sizes` ve otomatik optimize türevler sunar. Giriş fotoğrafı eager/high priority, destek fotoğrafı lazy/blur kullanır. `aspect-ratio` yükleme öncesinde yer ayırır. Pexels'e çalışma anında istek yapılmaz.

Ortak `--text-page-title` token'ı galeri, hizmet kataloğu ve detay H1'lerini 36–60 px aralığında dengeler. Galerinin eski büyük başlığı küçültüldü; başlık satır yüksekliği ve genişliği ayarlandı. `--text-section-title` ve `--page-space` bölüm başlıklarını/boşluklarını ortaklaştırır. Ana sayfa hero'sunun display ölçeği korunur. Tailwind CSS 4 ve mevcut token sistemi üzerinde scoped `@layer components` stilleri kullanılır.

Header, katalog ve ana sayfa hizmet önizlemelerinde gerçek detay bağlantıları bulunur; tamamı `next/link` kullanır. Header'daki aktif hizmet yalnızca tam pathname eşleşmesinde belirtilir. Mevcut mobil menü kapanma davranışları korunur. Galeri filtre/lightbox uygulaması değiştirilmedi.

### Faz 6 doğrulaması — 22 Ekim 2026

- `npm run lint`: başarılı.
- `npm run build`: başarılı; üç hizmet detay URL'si build çıktısında statik üretildi.
- `npx --no-install tsc --noEmit`: başarılı; build sonrasında çalıştırıldı.
- `npx --no-install eslint tests/service-details.browser.js tests/services.browser.js tests/gallery.browser.js`: başarılı.
- Son production build `http://127.0.0.1:3009` üzerinde açıldı. Üç hizmet URL'si doğrudan HTTP 200; `/hizmetler/gecersiz-hizmet` HTTP 404 döndürdü. 404'ten kataloğa dönüş doğrulandı.
- `tests/service-details.browser.js` kurulu Playwright MCP ile çalıştırıldı ve geçti: üç hizmet × 1440, 1280, 768, 390, 375 px; tek H1, özgün metadata, noindex, alt metin, `sizes`/`srcset`, iki fotoğrafın yüklenmesi, lazy destek fotoğrafı, yatay taşma, stok notu, FAQ Enter/Space ve görünür focus kontrolleri.
- Ana sayfa/katalogdaki altı detay bağlantısı, header aktif durumu, klavyeyle diğer hizmete geçiş, mobil menü ve seçim sonrası kapanma doğrulandı. Her hizmetin iki fotoğrafı beş genişlikte ekran görüntülerinden incelendi. Tam desktop/mobil sayfa ve tablet giriş görünümü de incelendi.
- `tests/services.browser.js` ve `tests/gallery.browser.js` regresyonları geçti. Galeride beş kategori filtresi, sekiz fotoğraf, lightbox, modalın ekrana sığması, Escape, focus geri dönüşü, arka plan odak engeli ve kaydırma kilidi çalışıyor. Eski testlerin hizmet anchor beklentileri yeni gerçek URL'lere uyarlandı; genel `summary` seçicisi yeni FAQ öğeleriyle çakıştığı için mobil menüyle sınırlandırıldı.
- Galeri H1'i 1440 px'te 60 px, 375 px'te 36 px ölçüldü; giriş ekran görüntüleri incelendi. Katalog da aynı H1 token'ını kullanır.
- JavaScript kapalı 390 px ayrı tarayıcı bağlamında seramik sayfası, sunucu başlığı, fotoğraf ve native FAQ çalıştı. Optimize fotoğraf isteği HTTP 200 / `image/webp` döndürdü. İlk bağımsız görsel isteğindeki göreli URL test hatası mutlak URL ile giderildi; bu bir uygulama hatası değildi.
- Son production sayfasında tarayıcı konsolunda hata/uyarı yoktu. `Hero`, `Gallery` ve `MobileMenu` dosyalarının SHA-256 değerleri çalışma öncesiyle aynı.

Testler bağımsız CLI runner'ı değildir. Çalışan uygulamayı kurulu Playwright MCP tarayıcısında açtıktan sonra `browser_run_code_unsafe` aracına `filename: "frontend/tests/service-details.browser.js"` verin; diğer iki test de aynı şekilde çalışır. Testler mevcut sekmenin origin'ini kullanır. Yeni test bağımlılığı kurulmadı. Ekran görüntüleri geçici `.next/qa/phase6` alanındadır; yeniden build sırasında kaybolabilir.

Terminalde `frontend` dizininde sırayla:

```powershell
npm run lint
npm run build
npx --no-install tsc --noEmit
npm run start -- --port 3009
```

Geliştirme için `npm run dev` kullanabilirsiniz. Mevcut sunucu çalışıyorsa tekrar başlatmayın. `/hizmetler/ppf-kaplama`, `/hizmetler/seramik-kaplama` ve `/hizmetler/detailing` adreslerini doğrudan açın.

Gerçek işletme çekimleri ve seçilecek ürünlere özel içerik henüz yoktur; stok notu ve global noindex korunur. Gerçek cihaz, Safari/Firefox, ekran okuyucu ve saha performansı test edilmedi. API, backend, MySQL, Flyway, Docker, admin veya Git işlemi yapılmadı.

## Faz 7 — Hakkımızda ve global footer

### Dosyalar ve route

Yeni dosyalar:

- `src/app/hakkimizda/page.tsx`: Giriş, Yaklaşımımız, dört aşamalı Uygulama anlayışı, iki fotoğraf ve hizmet/galeri bağlantıları.
- `src/components/footer.tsx`: VANTA marka alanı, sayfa/hizmet bağlantı grupları ve demo bilgisi.
- `src/assets/images/about-surface-care.jpg`, `about-wash-preparation.jpg`: Bu sayfaya özel iki gerçek çekim.
- `tests/about-footer.browser.js`: Footer'ın yedi public route ve altı ekran genişliğindeki yerleşimi; header, Hakkımızda, bağlantı ve klavye kontrolleri.

Değişen dosyalar: `src/app/layout.tsx`, `src/components/navigation-links.tsx`, `src/app/globals.css`, `src/assets/images/SOURCES.md` ve bu README. Mevcut Hero, Gallery, MobileMenu ve hizmet verisi dosyaları değiştirilmedi.

App Router, `app/hakkimizda/page.tsx` dosyasını `/hakkimizda` adresine eşler. Sayfa doğrudan açılır; build sırasında statik üretilir. Statik `metadata` export'u title, description ve Open Graph alanlarını tanımlar. Root layout'taki global `noindex, nofollow` miras alınır. Tek H1 ve üç içerik H2'si vardır.

### İçerik ve Server Component sınırı

Hakkımızda metni, bir demo markanın hizmet yaklaşımını açıklar. Kuruluş yılı, ekip, müşteri sayısı, sertifika, garanti veya gerçek işletme operasyonu iddiası yoktur. Demo niteliği metinde, stok fotoğraf niteliği iki caption'da belirtilir. Dört adımın başlık/açıklama kayıtları yalnızca bu sayfada kullanıldığından yerel `applicationSteps` dizisinde tutulur; ek veri katmanı oluşturulmadı. Gerçek süreç sırası olduğu için semantik `ol` kullanılır; `role="list"`, CSS ile işaret biçimi değiştirildiğinde liste semantiğini korur.

Footer bağlantılarının sayfa grubu dört sabit URL'dir. Hizmet grubu mevcut `services` dizisinden gelir; hizmet adları ve slug'lar ikinci bir kaynakta çoğaltılmaz. Bütün yeni dahili bağlantılar `next/link` kullanır. Telefon, e-posta, adres, sosyal medya veya henüz olmayan iletişim/teklif bağlantısı yoktur. Alt satır `© VANTA` ve demo açıklamasını içerir; tarih üretmek için tarayıcı JavaScript'i eklenmedi.

Root layout'ta `{children}` sonrasına bir kez `<Footer />` eklenir. Böylece mevcut yedi public route aynı footer'ı alır; sayfalara ayrı ayrı import gerekmez. Henüz admin route'u yoktur. İleride admin layout'u eklenirken public header/footer sınırı ayrıca düzenlenebilir; bugün bunun için route group veya ek abstraction kurulmadı.

AboutPage ve Footer Server Component'tir: state, effect veya event handler gerektirmezler. Yeni Client Component yoktur. Mevcut `NavigationLinks`, pathname üzerinden Hakkımızda bağlantısına aktif durum verir. Aynı bileşen desktop ve mobilde kullanıldığı için bağlantı iki menüye de yansır. Header boşlukları kontrollü biçimde küçültüldü; mevcut hizmet bağlantıları ve 1024 px mobil menü eşiği korunur. MobileMenu kodu değişmedi.

### Görsel düzen ve responsive yaklaşım

Girişte başlık ve kısa metnin altında geniş bir yakın plan fotoğraf bulunur; homepage hero'sunun fotoğraf üstü metin düzeni kopyalanmaz. Kırık beyaz alanda dar bir okuma sütunu, ardından dört aşama ve sağa hizalı daha küçük bir hazırlık fotoğrafı vardır. Galeri/katalog düzeni tekrar edilmez. Footer koyu grafit yüzey, kontrollü büyük VANTA yazısı ve iki kullanışlı bağlantı grubuyla devam eder.

Mevcut `--text-page-title`, `--text-section-title`, `--page-space`, renkler ve container korunur. Okuma sütunu 65ch ile sınırlıdır. Yeni CSS, Tailwind CSS 4 kurulumu üzerinde `@layer components` içinde `about-` / `footer-` sınıflarıyla sınırlandırılır. Header'da yalnızca grup aralıkları değişti. Yeni font, gradient, animasyon veya kütüphane yoktur.

Desktop'ta süreç dört sütun, 1024 px altında iki, 768 px altında tek sütundur. İlk fotoğraf desktop/tablette 16:7, mobilde 4:5; ikinci fotoğraf her boyutta 3:2 oranındadır. İkinci fotoğraf desktop'ta container'ın %75'ini, mobilde tamamını kullanır. Footer desktop/tablette marka + iki navigasyon sütunudur. Mobilde marka tam satıra, bağlantılar iki sütuna geçer; alt bilgi ve CTA'lar alt alta dizilir. Bağlantılar en az 44 px yüksekliğindedir; global focus-visible korunur.

İki fotoğrafın toplam yerel boyutu 392003 bayttır. Mevcut `sharp` ile boyutlandırılıp sıkıştırıldı; fotoğrafçı, lisans, kaynak URL ve dosya yolları `SOURCES.md` içinde kayıtlıdır. Statik import, `next/image`, `fill`, responsive `sizes` ve önceden ayrılan `aspect-ratio` alanları kullanılır. İlk fotoğraf eager/high priority; ikincisi lazy/blur'dır. Mobilde el ve bez, ikinci çekimde suyla temizlik görünür. Fotoğraflar VANTA'nın müşterisi, çalışanı veya tesisi olarak sunulmaz.

### Faz 7 doğrulaması — 23 Ekim 2026

- Son `npm run lint`: başarılı.
- Son `npm run build`: başarılı; `/hakkimizda` statik üretildi. Son okuma sütunu düzeltmesinden sonra yeniden çalıştırıldı.
- `npx --no-install tsc --noEmit`: başarılı; son build sonrasında çalıştırıldı.
- Dört tarayıcı test dosyası ayrıca ESLint ile kontrol edildi; güncellenen yeni test dosyası da son kez kontrol edildi. Hata/uyarı yok.
- Son production sunucusu: `http://127.0.0.1:3010`. `/hakkimizda` doğrudan HTTP 200 döndürdü.
- `tests/about-footer.browser.js` son build üzerinde geçti: 1440 × 1000, 1280 × 900, 1024 × 900, 768 × 1024, 390 × 844, 375 × 812. Her genişlikte yedi public route, tek global footer, yedi gerçek navigasyon hedefi, etkileşim alanları, footer'ın main sonrasındaki konumu, noindex ve yatay taşma kontrol edildi.
- Header'ın 1440/1280/1024 px'te marka ve bağlantıları çakışmadan tek satıra sığdığı ölçüldü. Desktop ve mobil Hakkımızda bağlantısı, aktif durum, Enter/Space/Escape, mobil menü kapanması, odak dönüşü ve iki sayfa sonu CTA'sı çalıştı. Footer'daki yedi bağlantı klavyeyle gerçekten açıldı.
- İlk footer focus testi yalnızca programatik `focus()` sonrasında klavye focus halkası bekliyordu. Test gerçek Tab/Shift+Tab geçişiyle düzeltildi ve geçti; uygulamada focus stili zaten vardı.
- Altı genişliğin ekran görüntüleri incelendi. Başlıklar, boşluklar, fotoğraf kırpımları, tablet süreç düzeni, mobil menü ve galeriden footer'a geçiş kontrol edildi. Son okuma sütunu değişikliği sonrasında desktop/mobil tam sayfa görüntüleri yeniden incelendi.
- `tests/services.browser.js`, `tests/gallery.browser.js`, `tests/service-details.browser.js` regresyonları geçti. Galeri filtreleri, sekiz fotoğraf, lightbox, Escape ve odak dönüşü; detay FAQ, dahili bağlantılar ve geçersiz slug için HTTP 404 korundu. Son CSS değişikliği yalnızca Hakkımızda okuma sütununu etkiler; son footer testi bütün route'ları yeniden kontrol etti.
- Galeri başlığının önceki düzeltmesi altı genişlikte doğrulandı; masaüstünde en fazla 60 px, mobilde 36 px. Hakkımızda aynı H1 token'ını kullanır.
- JavaScript kapalı ayrı 390 px bağlamında Hakkımızda içeriği, iki fotoğraf ve yedi footer navigasyon bağlantısı sunucudan geldi. Optimize görsel isteği HTTP 200 / `image/webp` döndürdü.
- Hesaplanan metin kontrastları: ana metin 15,56:1; footer ikincil metni 8,62:1; açık zemindeki ikincil metin 5,44:1.
- Aynı tarayıcı sekmesinde çok sayıda responsive geçiş sırasında kullanılmayan görsel preload uyarısı oluştu; önbellekte daha büyük responsive türev seçilmişti. Temiz, ayrı 1440/375 px bağlamlarında altı saniye gözlem yapıldı: hata/uyarı yok; uygun görseller seçildi. Beklenen geçersiz URL kontrolü konsolda HTTP 404 kaydı oluşturur; bu testin beklenen sonucudur.
- Hero, Gallery, MobileMenu ve services veri dosyalarının SHA-256 değerleri çalışma öncesiyle aynı.

### Çalıştırma ve tekrar kontrol

`frontend` dizininde geliştirme için `npm run dev` kullanın. Production kontrolü için sırayla:

```powershell
npm run lint
npm run build
npx --no-install tsc --noEmit
npm run start -- --port 3010
```

Sunucu zaten çalışıyorsa mevcut adresi açın. Tarayıcıda `/hakkimizda` sayfasını, menüde Hakkımızda bağlantısını ve sayfa sonundaki footer'ı inceleyin. Mevcut Playwright MCP'de çalışan uygulama sekmesi üzerinden `browser_run_code_unsafe` aracına `filename: "frontend/tests/about-footer.browser.js"` verilebilir. Diğer üç test de aynı yöntemle çalışır. Bunlar bağımsız CLI test runner'ı değildir; yeni test bağımlılığı kurulmadı. Geçici ekran görüntüleri `.next/qa/phase7` içindedir ve build sırasında kaybolabilir.

Gerçek işletme bilgileri ve onaylı müşteri/stüdyo çekimleri henüz yoktur; demo ve stok notları ile noindex korunur. Gerçek cihaz, Safari/Firefox, ekran okuyucu ve saha performansı test edilmedi. İletişim, teklif, admin, backend, MySQL, Flyway, Docker ve Git işlemi Faz 7 kapsamına dahil değildi.

## Faz 8 — Bağımsız İletişim sayfası

### Route, içerik ve veri

`src/app/iletisim/page.tsx`, App Router ile `/iletisim` URL'sini oluşturur. Doğrudan açılır ve build sırasında statik üretilir. Kendine ait title, description ve Open Graph metadata'sı vardır; root layout'taki `noindex, nofollow` değişmedi. Sayfada tek H1; iletişim bilgileri, hizmet rehberi ve son yönlendirme için üç H2 bulunur.

Doğrulanmış iletişim bilgileri henüz olmadığı için görünür demo açıklaması kullanılır. Sahte telefon, e-posta, adres, çalışma saatleri, harita, form, başarı mesajı veya `/teklif-al` bağlantısı yoktur. Üç hizmetin gerçek detay bağlantıları mevcut `services` dizisinden üretilir. Son CTA'lar `/galeri` ve `/hizmetler` adreslerine gider. Bütün dahili bağlantılar `next/link` kullanır.

`src/data/contact.ts`, `ContactDetails` tipi ve şimdilik boş `contactDetails` nesnesini içerir. Bilgiler doğrulandığında şu alanlar doldurulabilir:

- `phone.label`: Kullanıcıya gösterilecek telefon yazımı; `phone.number`: `tel:` bağlantısına eklenecek doğrulanmış numara.
- `email`: Doğrulanmış e-posta; sayfa bunu `mailto:` bağlantısında kullanır.
- `address`: Düz metin adres. Satır sonları CSS ile korunur; HTML veya sahte harita üretilmez.
- `openingHours`: Doğrulanmış çalışma saatleri.

Yalnızca dolu alanlar `dl` / `dt` / `dd` ile gösterilir; eksik alanlar için boş satır veya işlevsiz düğme oluşmaz. En az bir alan dolduğunda “henüz paylaşılmadı” açıklaması kaldırılır; demo bilgisi korunur. Bu yerel yapı ileride işletme yapılandırmasıyla değiştirilebilir. Admin/API bağlantısı ve uzaktan gelen verinin doğrulaması bugün eklenmedi. Telefon/e-posta protokol bağlantıları normal anchor, dahili bağlantılar Next.js Link'tir.

### Tasarım ve Server Component

Sayfa kırık beyaz yüzeyde iki sütunlu editorial bir düzendir. Solda giriş, kısa iletişim durumu ve hizmet rehberi; sağda üç alan boyunca uzanan tek bir dikey ekipman fotoğrafı bulunur. Kart, sahte iletişim alanları veya yeni animasyon yoktur. Koyu zemindeki son yönlendirme alanı ortak footer'a bağlanır.

Mevcut renk, font, H1/H2, spacing ve container token'ları kullanılır. Yeni stiller `@layer components` içinde `contact-` sınıflarıyla sınırlıdır. Desktop fotoğraf alanı içerik yüksekliğine uyum sağlar. 1024 px altında tek sütunda giriş → iletişim durumu → fotoğraf → hizmet rehberi sırası kullanılır. Tablet fotoğrafı 3:2, mobil fotoğrafı 4:5 oranındadır; `object-position` foreground ekipmanlarını görünür tutar. Mobil CTA'lar alt alta dizilir. Açık zeminde focus rengi mevcut `--focus-on-light` token'ıdır.

Sayfa Server Component'tir; iletişim formu, state, effect veya event handler gerekmez. Yeni Client Component ve dependency eklenmedi. Mevcut header/footer root layout'tan gelir; layout dosyası değiştirilmedi. Desktop ve mobil navigasyona aynı `NavigationLinks` üzerinden İletişim eklendi ve aktif durum pathname ile belirlenir. Menü kalabalıklaşmasın diye yalnızca desktop grup aralığı biraz küçültüldü; fontlar, hizmet bağlantıları ve 1024 px menü eşiği korunur. Footer sayfa grubuna da İletişim eklendi.

Yeni gerçek fotoğraf `contact-detailing-tools.jpg`, 1400 × 2104 px / 258736 bayttır. Mevcut `sharp` ile optimize edildi. `next/image`, statik import, `fill`, responsive `sizes`, eager/high priority ve önceden ayrılmış görsel alanı kullanılır. Kaynak Pexels'e çalışma anında bağımlılık yoktur. Kaynak URL, WAVYVISUALS fotoğrafçı kaydı ve lisans `src/assets/images/SOURCES.md` içindedir. Fotoğraf diğer sayfalarda tekrarlanmaz; caption bunun VANTA tesisi/müşteri işi olmadığını belirtir.

### Faz 8 doğrulaması — 23 Ekim 2026

- `npm run lint`: başarılı.
- `npm run build`: başarılı; `/iletisim` statik üretildi.
- `npx --no-install tsc --noEmit`: başarılı; build sonrasında çalıştırıldı.
- `npx --no-install eslint tests/contact.browser.js tests/about-footer.browser.js tests/services.browser.js tests/gallery.browser.js tests/service-details.browser.js`: başarılı.
- Production sunucusu `http://127.0.0.1:3012` üzerinde açıldı. İletişim URL'si doğrudan HTTP 200 döndürdü.
- `tests/contact.browser.js` geçti: 1440 × 1000, 1280 × 900, 1024 × 900, 768 × 1024, 390 × 844, 375 × 812. Metadata, noindex, tek H1, H2 hiyerarşisi, üç hizmet bağlantısı, iki CTA, görsel yüklenmesi/alt/sizes/srcset, responsive sıralama ve yatay taşma kontrol edildi. Eksik bilgi açıklaması ile form/harita/uydurma telefon/e-posta/teklif bağlantısı bulunmadığı doğrulandı.
- Desktop ve mobil İletişim bağlantıları, doğru aktif durum, footer bağlantısı, beş içerik bağlantısının klavyeyle açılması, görünür focus, menü Enter/Space/Escape ve seçim sonrası kapanma kontrolleri geçti.
- Güncellenmiş `tests/about-footer.browser.js` geçti: sekiz sayfa × altı genişlikte ortak footer, sekiz navigasyon hedefi, 44 px bağlantı alanları, noindex, main/footer geçişi ve taşma. Header 1440/1280/1024 px'te tek satıra sığıyor; marka ve menü bağlantıları çakışmıyor.
- Hakkımızda fotoğrafının son düzeltmesi korundu: bölüm en fazla 1200 px genişlikte ortalı; adımlar/fotoğraf aynı kenarlara hizalı. Hakkımızda sayfa dosyası değiştirilmedi. Galeri H1'i masaüstünde en fazla 60 px, mobilde 36 px kaldı.
- `tests/services.browser.js`, `tests/gallery.browser.js` ve `tests/service-details.browser.js` regresyonları geçti. Galeri filtreleri/lightbox, Escape/odak dönüşü, hizmet detayları/FAQ, gerçek dahili bağlantılar ve geçersiz slug HTTP 404 çalışıyor.
- Altı genişlikteki ekran görüntüleri incelendi. Özellikle 1024 px header, tablet ekipman kırpımı, mobil fotoğraf/caption, CTA'lar ve footer geçişi kontrol edildi. Yatay taşma veya açıklama/görsel çakışması görülmedi.

Mevcut Playwright MCP'de çalışan uygulama sekmesi üzerinden `browser_run_code_unsafe` aracına `filename: "frontend/tests/contact.browser.js"` veya diğer test yolları verilir. Testler sekmenin origin'ini kullanır; bağımsız bir CLI test runner'ı değildir. Yeni test bağımlılığı eklenmedi. Geçici ekran görüntüleri `.next/qa/phase8` içindedir.

`frontend` dizininde geliştirme için `npm run dev`; production kontrolü için sırayla:

```powershell
npm run lint
npm run build
npx --no-install tsc --noEmit
npm run start -- --port 3012
```

Sunucu zaten çalışıyorsa mevcut adresi açın. Gerçek iletişim kanalları ve onaylı işletme çekimleri henüz yoktur. Form ve `/teklif-al` geliştirilmedi. Gerçek cihaz, Safari/Firefox, ekran okuyucu ve saha performansı test edilmedi. Backend, MySQL, Spring Security, Flyway, Docker, admin ve Git işlemi yapılmadı.

## Faz 9 — Teklif talep formu

### Dosyalar ve component sınırları

Yeni dosyalar:

- `src/app/teklif-al/page.tsx`: Server Component route; özgün metadata, tek H1, giriş metni ve Suspense içindeki async hizmet seçimi.
- `src/components/quote-request-form.tsx`: Form alanları, doğrulama etkileşimi, bilgi özeti ve düzenlemeye dönüş için Client Component.
- `src/lib/quote-request.ts`: Açık DTO alan isimleriyle form tipi, hata tipi, hizmet seçeneği tipi, telefon normalizasyonu ve saf doğrulama fonksiyonu.
- `tests/quote-validation.test.mjs`: Node'un yerleşik test araçlarıyla dört doğrulama testi.
- `tests/quote-request.browser.js`: Playwright MCP üzerinden form, query, gizlilik, erişilebilirlik ve responsive kontrolleri.

Değişen mevcut dosyalar: `src/app/globals.css`, `src/components/navigation-links.tsx`, `src/components/footer.tsx`, `src/components/hero.tsx`, `src/app/iletisim/page.tsx`, `src/app/hizmetler/[slug]/page.tsx`; yeni navigasyona uyarlanan `tests/services.browser.js`, `tests/contact.browser.js`, `tests/about-footer.browser.js`; bu README ve `src/assets/images/SOURCES.md`.

### Server / Client ve query akışı

Sayfa metadata'sı, başlık ve açıklama sunucuda render edilir. `QuoteFormSection`, Next.js 16'nın Promise olan `searchParams` prop'unu `await` eder. Yalnızca `services.ts` içinde bulunan tek bir `hizmet` slug'ı kabul edilir. Tanınmayan, boş veya tekrarlanan hizmet değerleri seçimsiz form ve kısa açıklama üretir; diğer query anahtarları yok sayılır. Client tarafında URL parsing yapılmaz.

Forma yalnızca `{ slug, title }` seçenekleri, başlangıç slug'ı ve geçersiz seçim bilgisi geçilir. Hizmet fotoğrafları/ayrıntıları client prop'una eklenmez. Seçenekler mevcut `services` kaynağından türetilir; ayrı kopya katalog yoktur. `Suspense`, mevcut `cacheComponents` yapılandırmasında request'e bağlı query okumasını kapsar. Build, `/teklif-al` için statik kabuk ve dinamik form alanı içeren PPR çıktısı üretir. Global noindex korunur.

### State, doğrulama ve veri güvenliği

React `useState`, alanları (`values`), alan hatalarını (`errors`) ve doğrulanmış özeti (`review`) tutar. Ayrı state kütüphanesi yoktur. Düzenlemeye dönüş alanları korur; özet başlığına ve dönüşte ilk alana odak verilir. `useRef` DOM odağını yönetir.

Zorunlu ad/telefon/marka/model/hizmet, isteğe bağlı e-posta ve dört haneli 1900–geçerli yıl+1 model yılı kontrol edilir. Mesaj sınırı 1000 karakterdir; hem HTML `maxLength` hem doğrulama fonksiyonu uygular. Boşluk, parantez ve tire içeren yaygın `0`, `+90`, `0090` telefon biçimleri kabul edilir; özet Türkiye cep numarasını `+90` biçiminde gösterir. Format kontrolü numaranın sahipliğini veya aktif olduğunu doğrulamaz. Model yılı form state'inde string kalır; gelecekte DTO dönüşümü gönderim sınırında yapılmalıdır.

Hatalar alan altında, `aria-invalid` ve `aria-describedby` ile ilişkilidir. Hatalı kontrolde ilk geçersiz alan odaklanır; kullanıcı düzeltirken hatalar güncellenir. Native label, fieldset/legend, uygun input type/inputMode, görünür focus ve durum duyurusu bulunur.

**Gerçek gönderim yoktur.** Submit yalnızca `preventDefault` ile yerel doğrulama ve okunabilir özet üretir. Özet açıkça “Teklif gönderimi henüz aktif değil. Bilgileriniz kaydedilmedi veya gönderilmedi.” der. API endpoint'i, fetch, Server Action, sahte başarı/numara, localStorage, sessionStorage veya kişisel veri log'u eklenmedi. Bilgiler yalnızca component belleğindedir. Kontrollerde `name` bulunmaz; native form serileştirmesi kişisel alanları taşımaz. `useSyncExternalStore` ile server/hydration öncesi kontroller disabled tutulur; JavaScript kapalıysa açıklama görünür. Bu aşamada sahte KVKK onayı veya olmayan politika bağlantısı yoktur.

### Tasarım ve eski düzeltmeler

VANTA grafit/kırık beyaz/bakır token'ları ve mevcut fontlar kullanılır. Form için yalnızca açık zeminde okunabilen hata token'ı eklendi. Tailwind CSS 4'ün mevcut `@layer components` düzeninde `quote-` sınıfları kullanılır; form framework'ü yoktur. Desktop iki sütun; 1024 px altında tek ana sütun; 768 px altında alanlar da tek sütundur. Mobilde butonlar tam genişliktedir. Alanlar en az 48 px yüksekliğinde; metin alanı dikey büyütülebilir ve uzun özet metinleri satır kırar.

Header ana CTA'sı Teklif Al oldu; hizmet bağlantıları korunur. Aktif CTA'nın eski koyu arka plan kuralı açık butonla çakıştığı için kaldırıldı ve kontrast testine eklendi. Hero'nun ana CTA'sı teklif, ikinci CTA'sı hizmetlerdir. Üç detay sayfası kendi slug'ıyla ön seçim sağlar. Footer ve İletişim sayfasında çalışan teklif bağlantıları bulunur.

İletişim fotoğrafı masaüstünde hizmet rehberini kapsayacak şekilde uzamaz; 4:3 oranında üst iki içerik satırına hizalanır. Hizmet rehberi altta üç sütundur. Tablet 3:2 ve mobil 4:5 oranı ekipman odağıyla korunur. Caption 14 px oldu. Yeni fotoğraf yoktur; kaynak belgesine kadraj notu eklendi. Hakkımızda sayfası, galeri etkileşimleri, mobil menü ve hizmet veri dosyasının SHA-256 değerleri çalışma öncesiyle aynıdır. Galeri H1 ölçeği ve Hakkımızda fotoğraf hizası regresyon testinde doğrulandı.

### Doğrulama ve tekrar çalıştırma

`frontend` dizininde sırayla:

```powershell
npm run lint
node --experimental-strip-types --test tests/quote-validation.test.mjs
npm run build
npx --no-install tsc --noEmit
npm run start -- --port 3013
```

Geliştirme için `npm run dev` kullanılabilir. Çalışan son production önizlemesi: `http://127.0.0.1:3013/teklif-al`. Hizmet ön seçimi örneği: `/teklif-al?hizmet=ppf-kaplama`.

Gerçekten çalıştırılan sonuçlar:

- ESLint, production build ve build sonrasındaki TypeScript kontrolü başarılı. Yeni/güncellenmiş test dosyalarının ESLint kontrolü de geçti.
- Node doğrulama testleri: 4 başarılı, 0 başarısız. Node, doğrudan `.ts` import'unda paket `type` alanı bulunmadığı için `MODULE_TYPELESS_PACKAGE_JSON` uyarısı verdi; testler geçti, mevcut paket yapılandırması değiştirilmedi.
- `quote-request.browser.js` geçti: boş/zorunlu alanlar, yanlış telefon/e-posta/yıl, 1000/1001 karakter sınırı, düzeltme, özet, telefon normalizasyonu, düzenlemeye dönüş ve odak; tüm hizmet ön seçimleri, tanınmayan/tekrarlanan query değerleri, giriş CTA'ları, noindex ve JavaScript kapalı durum.
- Kurgu test verileriyle kontrol/özet/düzenleme akışındaki ağ istekleri incelendi: kişisel test değerleri URL, body veya header'larda gönderilmedi; GET/HEAD dışında istek yoktu. Konsola test değeri yazılmadı; localStorage/sessionStorage/cookie değişmedi. Native FormData boş kaldı; sahte başarı mesajı yoktu.
- 1440, 1280, 1024, 768, 390 ve 375 px genişliklerde normal/hata/özet düzeni, labels, en az 44 px hedefler, input türleri, Tab/focus, renk kontrastı, footer geçişi ve yatay taşma kontrolleri geçti. Ekran görüntüleri %100 zoom ile incelendi; iletişim fotoğrafı kadrajları ve caption da altı genişlikte değerlendirildi.
- Mevcut `services.browser.js`, `gallery.browser.js`, `service-details.browser.js`, `contact.browser.js`, `about-footer.browser.js` regresyonları geçti. Filtre/lightbox, FAQ, geçersiz hizmet 404, menü ve bağlantılar çalışıyor. Son CSS düzeltmelerinden sonra quote ve dokuz route × altı genişlikte about/footer testleri tekrar geçti; 1280/1024 px header sıkışmıyor.

Tarayıcı dosyaları mevcut Playwright MCP'de `browser_run_code_unsafe` aracına `filename: "frontend/tests/quote-request.browser.js"` (veya diğer test yolu) verilerek çalışır. Sekme uygulamanın origin'inde açık olmalıdır; bu dosyalar bağımsız CLI test runner'ı değildir. Yeni bağımlılık kurulmadı. Geçici ekran görüntüleri `.next/qa/phase9` içindedir; build sırasında kaybolabilir.

Gerçek cihaz/ekran klavyesi, Safari/Firefox, ekran okuyucu ve saha performansı test edilmedi. Backend, MySQL, Flyway, Docker, admin ve Git işlemi yapılmadı.

### Spring Boot için kalan işler

Gerçek Quote Request DTO/endpoint'i, sunucu doğrulaması ve telefon normalizasyonu, hata/başarı sözleşmesi, güvenli gönderim ve talep saklama akışı henüz yoktur. Gerçek gönderim açılmadan önce doğrulanmış aydınlatma metni, saklama politikası ve veri işleme akışı hazırlanmalı; ardından frontend gönderim/yüklenme/hata durumları gerçek API'ye bağlanmalıdır. Bu aşamada API client veya geçici backend eklenmedi.

## Faz 10 — Son frontend kalite denetimi

24 Ekim 2026 tarihinde dokuz route, ortak bileşenler, kaynak kayıtları ve mevcut testler incelendi. Ayrıntılı sayfa bulguları, P0/P1/P2/P3 listesi, değişen dosyalar, test kapsamı, performans tablosu ve eksikler [PHASE10_AUDIT.md](docs/PHASE10_AUDIT.md) içindedir. [Ham ölçümler](docs/phase10/measurements.json), [menü odak karşılaştırması](docs/phase10/menu-focus-comparison.png) ve [hero kontrast karşılaştırması](docs/phase10/hero-contrast-comparison.png) kaydedildi.

- P1 mobil menü odak örtülmesi giderildi: odak menüden çıktığında menü kapanır.
- Teklif sayfasının kısa Suspense mesajından tam forma geçişinde footer kayıyordu. Aynı yerleşime sahip disabled/aria-busy form fallback'i ve ayrı yükleme ID'leri kullanıldı. Yerel başlangıç CLS desktop 0,1918 / mobile 0,3621 iken son altı teklif yüklemesinde 0 ölçüldü.
- Mevcut form sürümünde message/service hint referansları zaten doğruydu. Yanıltıcı string parametreleri boolean hale getirildi; normal/query/hata durumlarında ID eşleşme testleri eklendi.
- Mobil hero kategori satırı 12 px oldu; maske güçlendirildi. 320 px arka plan örneklemesinde kontrast 2,51:1 → 5,77:1. Fotoğraf değişmedi.
- Küçük fotoğraf açıklamaları ortak 14 px token'a taşındı. Ana sayfa/kataloğa Open Graph metinleri eklendi. Global noindex ve domain/canonical eksikliği demo için korundu.
- Son ESLint, test ESLint'i, TypeScript ve production build başarılı; Node doğrulama testleri 4/4. İlk build EPERM izin hatasından sonra gerekli erişimle tekrar çalıştırıldı. Node'un mevcut modül türü uyarısı raporda kayıtlıdır.
- Altı mevcut tarayıcı regresyonu geçti. Yeni `quality-audit.browser.js`: dokuz route × dokuz genişlik (1920, 1440, 1280, 1024, 768, 430, 390, 375, 320), 24 axe kontrolünde 0 otomatik ihlal, menü/kontrast/kısa lightbox/uzun özet kontrolleri ve 27 daraltılmış viewport kontrolü geçti. Fotoğraf üzerindeki metinlerin axe kararsız sonuçları ayrı piksel örneklemesiyle değerlendirildi; bu tam WCAG uygunluğu iddiası değildir.
- Yeni `performance.browser.js`, 22 yerel production yüklemesinde PerformanceObserver/Resource Timing verisi toplar ve teklif CLS regresyonunu kontrol eder. Lighthouse/Chrome DevTools MCP mevcut değildir; Lighthouse puanı veya saha performansı iddiası yoktur.

Çalıştırma (`frontend` dizininde, build ile TypeScript'i aynı anda çalıştırmadan):

```powershell
npm run lint
npx --no-install eslint tests
node --experimental-strip-types --test tests/quote-validation.test.mjs
npm run build
npx --no-install tsc --noEmit
npm run start -- --port 3015
```

Mevcut Playwright MCP'de çalışan uygulama sekmesi `http://127.0.0.1:3015` origin'inde açıkken `browser_run_code_unsafe` aracına `filename: "frontend/tests/quality-audit.browser.js"` veya `filename: "frontend/tests/performance.browser.js"` verilir. Altı mevcut `.browser.js` dosyası da aynı yöntemle çalışır. Bunlar bağımsız CLI runner değildir; axe-core mevcut transitif kurulumdan kullanılır, site bundle'ına eklenmez.

Gerçek browser %200 zoom bu ortamın kısayoluyla değişmedi; gerçek zoom testi yapılmış sayılmadı. 960×540, 640×450 ve 512×384 CSS viewport'ları ayrıca test edildi. Firefox/WebKit, gerçek cihaz, ekran okuyucu, Lighthouse, RUM ve INP test edilmedi. Backend/API, veri saklama ve admin entegrasyonu yapılmadı; form gerçek gönderim yapmaz. Yeni dependency veya Git işlemi yoktur.
