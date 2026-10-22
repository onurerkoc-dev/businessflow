# BusinessFlow — Premium frontend redesign

Frontend; ana sayfa, `/galeri`, `/hizmetler` ve üç bağımsız hizmet detay sayfasından oluşur. Faz 6'da ortak dinamik route, hizmete özel içerik/fotoğraflar ve gerçek detay bağlantıları eklendi. Ana sayfanın hero'su ve galeri etkileşimleri korunur. Backend, veritabanı, admin veya talep yönetimi entegrasyonu içermez. Yeni bağımlılık eklenmedi. Aşağıdaki faz kayıtları tarihsel doğrulamalardır; güncel uygulama notları Faz 6 bölümündedir.

**VANTA geçici proje markasıdır.** Kullanıcı arayüzünde demo etiketleri gösterilmez; gerçek bir adres, telefon, müşteri yorumu, sertifika, garanti veya geçmiş proje iddiası eklenmemiştir. Demo niteliği bu belgede kayıtlıdır; `robots` ayarı indekslemeyi engeller.

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
- `src/app/layout.tsx`: Türkçe dil, VANTA metadata, indeksleme engeli, ortak header ve içeriğe geç bağlantısı.
- `src/app/page.tsx`: Ana içerik, sırasıyla `Hero`, `Services` ve `GalleryPreview` bileşimi.
- `src/components/header.tsx`: Kompakt marka, ortak navigasyon ve hizmet CTA'sı. Server Component; bağlantılar route durumunu okuyabilen küçük `NavigationLinks` bileşeninden gelir.
- `src/components/navigation-links.tsx`: Client Component. `usePathname` ile doğru `aria-current="page"` durumunu verir. Hizmet adları gerçek detay sayfalarına, Galeri `/galeri`, Hizmetleri İncele `/hizmetler` adresine gider.
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
