# BusinessFlow — Premium frontend redesign

Frontend; global tasarım sistemi, header, ana sayfa hero ve fotoğraflı hizmetler bölümünden oluşur. Faz 2'de yalnızca hizmetler alanı geliştirilmiş, header ve hero'nun görsel tasarımı korunmuştur. Backend, veritabanı, admin, talep yönetimi ve yeni hizmet detay sayfaları içermez. Yeni bağımlılık eklenmedi.

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
- `src/app/page.tsx`: Ana içerik, `Hero` ve `Services` bileşimi.
- `src/components/header.tsx`: Kompakt marka, gerçek anchor hedefleri olan navigasyon ve hizmet CTA'sı. Server Component.
- `src/components/hero.tsx`: Mevcut hero metni ve responsive gerçek fotoğraf. Eski düz hizmet listesi bu bileşenden çıkarıldı; hero'nun kendisi korunur. Server Component.
- `src/components/services.tsx`: Üç fotoğraflı hizmet anlatımı. Metinler, görsel import'ları, alt açıklamaları, anchor kimlikleri ve responsive `sizes` değerleri aynı dosyadaki küçük `services` dizisinde tutulur. Ayrı bir veri katmanı veya kart bileşeni eklenmez. Her kayıt bir semantik `article` olarak render edilir. Server Component.
- `src/components/mobile-menu.tsx`: Tek Client Component. Native `details/summary` üzerine Escape, dışarı tıklama, anchor seçimi ve breakpoint değişiminde kapanma ekler. Navigasyon sunucuda hazırlanıp `children` olarak iletilir.
- `src/assets/images/detailing-hero.jpg`: Masaüstü fotoğrafı.
- `src/assets/images/detailing-hero-mobile.jpg`: Aynı fotoğrafın mobil kompozisyonu.
- `src/assets/images/SOURCES.md`: Fotoğrafçı, kaynak, lisans, çözünürlük ve kırpma kaydı.
- `src/assets/images/service-ppf.jpg`, `service-ceramic.jpg`, `service-detailing.jpg`: WAVYVISUALS / Pexels lisanslı gerçek uygulama fotoğrafları; kaynak kayıtları `SOURCES.md` içindedir.

Eski `public/images/detailing-study.svg` silindi. Teklif popover'ı, demo/geçici/yakında etiketleri ve hedefi olmayan navigasyon öğeleri kaldırıldı. “Hizmetleri İncele” mevcut hizmet geçişine, hizmet adları ilgili gerçek anchor hedeflerine gider. Hazır olmayan sayfalara link oluşturulmaz.

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

Teklif/randevu için gerçek bir hedef ve işletmeye ait doğrulanmış iletişim bilgileri yoktur; CTA bu nedenle gösterilmez. Hizmet detay sayfaları mevcut değildir; hizmetler alanında bunlara bağlantı verilmez. İşletmeye ait kullanım onaylı müşteri/stüdyo çekimleri sonraki aşamada stok fotoğrafların yerini alabilir. Admin veya backend entegrasyonu bu çalışmaya dahil değildir.

## Faz 2 — Hizmetler düzeni

Kırık beyaz geçiş, büyük PPF fotoğrafı ve sağında iki daha küçük seramik/detailing anlatımıyla devam eder. Ayrı kart yüzeyleri, yuvarlatılmış köşeler, numaralandırma veya dekoratif ikon eklenmedi. Fotoğraf ve metinler normal okuma sırasındadır: PPF, seramik, detailing.

1024 px altında her anlatım kendi yatay fotoğraf/metin satırına geçer; 768 px altında fotoğraf üstte, metin altta tek sütun olur. PPF'nin 4:5 gösterimi filmin kaputa yerleştirilmesini vurgular. Diğer fotoğraflar masaüstünde 2:3, mobilde 3:4 oranında gösterilir. Kırpmalar uygulama araçlarını görünür bırakacak şekilde kontrol edilir.

Hizmet görselleri statik import, `fill`, responsive `sizes`, `loading="lazy"` ve küçük blur placeholder kullanır. Kaynak dosyaların boyutları mevcut `sharp` ile azaltıldı; Next.js tarayıcıya uygun boyut ve modern format sunar. Görsel alanları `aspect-ratio` ile ayrılır; hero'nun eager/high-priority ayarına dokunulmaz.

Veri veya etkileşim için tarayıcı state'i gerekmediğinden yeni bir Client Component yoktur. Ana sayfa build sırasında statik üretilebilir. Menüdeki `#ppf`, `#ceramic`, `#detailing` ve hero'daki `#services-intro` hedefleri korunmuştur. Servis açıklamaları fiziksel film koruması, su itici yüzey kaplaması ve detaylı temizlik/polisaj arasındaki farkı açıklar; ürün markası, süre veya garanti iddiası içermez.

## Faz 1 doğrulaması — 22 Ekim 2026

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
