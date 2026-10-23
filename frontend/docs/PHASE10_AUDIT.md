# Phase 10 — Frontend kalite denetimi

Tarih: 24 Ekim 2026. Demo marka: VANTA. Son production önizlemesi: http://127.0.0.1:3015.

Bu çalışma mevcut dokuz route'u, ortak bileşenleri, statik verileri, kaynak/lisans kayıtlarını ve testleri inceledi. Ponytail FULL ve Frontend Design uygulandı. Yeni sayfa, dependency, backend/API, admin, MySQL, Flyway, Docker veya Git işlemi yapılmadı. Framework yapılandırması değiştirilmedi.

## 1. Kapsam ve yöntem

- Next.js 16.4.2 / React 19.3.0 / TypeScript / Tailwind CSS 4; production Webpack build.
- Chromium 155.0.8059.85; dokuz route × dokuz genişlik = 81 görünüm. Ekran görüntüleri ve DOM ölçümleri birlikte değerlendirildi.
- Mevcut altı tarayıcı regresyonu, dört Node doğrulama testi ve yeni kalite/performans betikleri çalıştırıldı.
- Mevcut kurulumdaki axe-core 4.14.0 kullanıldı; yeni paket kurulmadı. Kilit dosyasında zaten bulunan transitif test aracıdır. axe yalnızca denetim sırasında sayfaya enjekte edilir; uygulama bundle'ına eklenmez.
- Kontrast, yeniden akış ve hedef boyutları için [WCAG 2.2 açıklamaları](https://www.w3.org/WAI/WCAG22/Understanding/) referans alındı. Otomatik sonuçlar tam WCAG uygunluğu kanıtı değildir.

## 2. Dokuz sayfanın sonuçları

| Route | Bulgu / gerçekleştirilen işlem | Korunan davranış |
| --- | --- | --- |
| `/` | Open Graph metinleri eksikti; eklendi. Mobil hero kategori satırı 9 px idi ve aydınlık fotoğraf bölgelerinde zayıf kalıyordu; 12 px ve daha güçlü mobil maske kullanıldı. | Gerçek hero fotoğrafı, iki CTA, hizmet/galeri kompozisyonları. |
| `/hizmetler` | Open Graph title/description eklendi. Yeni görsel düzen gerekmedi. | Üç gerçek detay bağlantısı, katalog yerleşimi ve responsive görseller. |
| `/hizmetler/ppf-kaplama` | 13 px fotoğraf açıklamaları 14 px oldu. | Film hazırlığı/yerleşimi fotoğrafları, FAQ, teklif ön seçimi, iki ilgili hizmet. |
| `/hizmetler/seramik-kaplama` | 13 px fotoğraf açıklamaları 14 px oldu. | Seramik ürün hazırlığı ve ayrı yüzey hazırlığı içeriği; FAQ/CTA. |
| `/hizmetler/detailing` | 13 px fotoğraf açıklamaları 14 px oldu. | İç temizlik ve dış detay fotoğrafları; FAQ/CTA. |
| `/galeri` | Kategori açıklamaları 13 → 14 px. Ortak mobil menüde odak örtülmesi düzeltildi. | Dengeli H1; dört kategori, sekiz fotoğraf, native modal ve odak dönüşü. |
| `/hakkimizda` | İki fotoğrafın açıklamaları 13 → 14 px. | Dört adımın altındaki ortalı, en fazla 1200 px fotoğraf ve ortak kenar hizası. |
| `/iletisim` | Mevcut başarılı kadraj korundu; caption aynı 14 px token'ını kullanıyor. | Desktop 4:3, tablet 3:2, mobil 4:5; sahte iletişim bilgisi yok. |
| `/teklif-al` | Stream yüklemesindeki footer sıçraması giderildi. Yardımcı ID üretimi açık hale getirildi; yükleme formunun ID'leri ayrıldı. | Desktop sticky, hata odağı, bilgi özeti, düzenleme ve gönderim yapılmadığı açıklaması. |

Tüm route'lar doğrudan HTTP 200 döndürüyor. `/hizmetler/gecersiz-hizmet` HTTP 404 ve hizmete özel geri dönüş görünümü döndürüyor. Her sayfada tek H1, uygun H2/H3 sırası, anlamlı alt metin ve çalışan dahili hedefler doğrulandı.

## 3. Öncelikli sorun listesi

| Öncelik | Doğrulanmış bulgu | Durum |
| --- | --- | --- |
| P0 | Çalışmayı engelleyen veya kritik veri güvenliği kusuru bulunmadı. | İncelenen kapsamda yok. |
| P1 | Mobil menünün son bağlantısından Tab ile çıkınca menü açık kalıyor ve odaklanan galeri filtresini örtüyordu. | Düzeltildi; ileri/geri Tab ve görünür odak testi eklendi. |
| P2 | Teklif yükleme mesajı form ile değişince footer yer değiştiriyordu: yerel başlangıç CLS desktop 0,1918; mobil 0,3621. | Aynı boyut düzenine sahip, devre dışı form fallback'i ile giderildi; son altı teklif açılışında CLS 0. |
| P2 | Mobil hero kategori satırı 9 px ve bazı fotoğraf bölgelerinde düşük kontrastlıydı. 320 px'te muhafazakâr arka plan örneklemesi 2,51:1 buldu. | 12 px + mobil maske; aynı kontrolde 5,77:1. Dokuz genişlikte regresyon kontrolü var. |
| P2 | Hizmet/Hakkımızda caption'ları ve galeri kategorileri 13 px idi. | Ortak 14 px caption token'ı kullanıldı. Bu bir okunabilirlik kararıdır; WCAG'de genel bir 14 px alt sınırı iddiası değildir. |
| P3 | Ana sayfa ve hizmet kataloğunda Open Graph metinleri yoktu. | Gerçek mevcut title/description ile tamamlandı; domain veya OG görseli uydurulmadı. |
| P3 | Form yardımcısındaki kullanılmayan anlamlı string değerleri ve eski hero buton seçicisi bakımı zorlaştırıyordu. | Boolean `hasHint` ve tek ID üreticisi kullanıldı; hiçbir elemana eşleşmeyen eski seçici silindi. |

Son kontrollerde açık, doğrulanmış P0/P1/P2 kusuru kalmadı. Aşağıdaki test kapsamı ve yayın öncesi eksikler bu sonucu sınırlar.

## 4. Düzeltmelerin çalışma biçimi

Mobil menü, odak `details` öğesinin dışına çıktığında kapanır. İç bağlantılar arasında gezinirken açık kalır. Escape, dışarı tıklama, route seçimi ve breakpoint davranışları korunur; menü modal hale getirilmedi.

Teklif sayfasının `Suspense` fallback'i artık gerçek formun aynı alan yerleşimini gösterir. `pending` durumunda kontroller disabled ve form `aria-busy` durumundadır. Bu sırada veri girilemez. Gerçek query sonucu geldiğinde asıl form açılır. İki stream parçasının ID alanları ayrı tutulur: yüklemede `quote-loading-` öneki, asıl formda mevcut ID'ler. Yeni Client Component veya kütüphane yoktur.

İlk bildirimdeki `message-count` / `serviceSlug-query` hatası mevcut sürümde yeniden üretilemedi: yardımcı zaten `message-hint` / `serviceSlug-hint` üretmekteydi. Çağrılardaki yanıltıcı string'ler kaldırıldı; ilk görünüm, geçersiz query ve alan hatalarıyla birlikte tüm açıklama referansları test edildi. Var olmayan bir hatanın düzeltildiği iddia edilmiyor.

## 5. Değişen dosyalar

Uygulama kaynakları:

- `src/components/mobile-menu.tsx`: odak menüden çıktığında kapanma.
- `src/components/quote-request-form.tsx`: açık yardım/ID üretimi, güvenli pending durumu, yüklemeye özel ID alanı.
- `src/app/teklif-al/page.tsx`: aynı form yerleşimini kullanan Suspense fallback'i; ortak hizmet seçenekleri.
- `src/app/globals.css`: caption token'ı, hero kategori okunabilirliği/maskesi, eski eşleşmeyen buton seçicisinin kaldırılması.
- `src/app/layout.tsx`: varsayılan Open Graph metinleri.
- `src/app/hizmetler/page.tsx`: kataloğa özel Open Graph metinleri.

Test ve belgeler:

- `tests/quote-request.browser.js`: açıklama ID regresyonları ve görünür formun beklenmesi.
- `tests/quality-audit.browser.js`: 81 görünüm, ARIA/SEO/semantik/hedef boyutları, axe, menü odak çıkışı, kısa lightbox, uzun Türkçe özet, daraltılmış viewport ve fotoğraf arka planı kontrast kontrolü.
- `tests/performance.browser.js`: 22 yerel yükleme ölçümü ve teklif CLS regresyonu.
- `README.md`: kısa Phase 10 özeti ve tekrar çalıştırma yöntemi.
- Bu rapor ve `docs/phase10/` altındaki ölçüm kaydı/iki karşılaştırma görüntüsü.

`src/data`, `src/lib/quote-request.ts`, fotoğraf dosyaları, kaynak/lisans belgesi, package/lock dosyaları ve Next.js yapılandırması değiştirilmedi. Yeni fotoğraf yoktur.

## 6. Accessibility sonuçları

- axe: dokuz sayfa × desktop/mobile = 18 kontrol; dört lightbox boyutu + hatalı query/form ve uzun özet = 6 ek kontrol. Toplam 24; otomatik ihlal 0.
- Ana sayfanın fotoğraf üzerindeki beş metni için axe `color-contrast` sonucunu kararsız bırakıyor. Bu kayıtlar gizlenmedi. İlgili metinler dokuz genişlikte ayrıca sınandı: metinler geçici olarak saydam yapılarak alınan viewport ekran görüntüsünde, her metin satırının arka plan pikselleri örneklendi. Metin kutusunun tamamındaki en düşük oran kullanıldığı için yöntem muhafazakârdır. Mevcut fotoğraf/kadrajlar için tüm eşikler geçti; genel WCAG sertifikası değildir.
- Solid renk oranları: açık zeminde yardımcı metin 5,44:1; koyu zeminde ikincil metin 8,62:1; açık zeminde hata metni 6,21:1. Normal metin 4,5:1, büyük metin 3:1 değerlendirmesi [WCAG kontrast açıklamasına](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) dayanır.
- Label/input, tüm görünür ARIA referansları, benzersiz ID'ler, hata ilişkileri, aktif navigasyon, tek main/header/footer ve başlık sırası kontrol edildi.
- İlk Tab görünür skip link'e gider; Enter ana içeriğe odak taşır. Mobil menü Escape ve odak çıkışında kapanır. Lightbox native modal olur, arka plan odağı engellenir ve kapanışta açıcıya döner. FAQ Enter/Space ile çalışır.
- Hatalı form ilk alana odaklanır; özet başlığına ve düzenlemede ilk alana odak dönüşü çalışır. Kontrollerin dokunmatik alanları ve focus stilleri doğrulandı.
- Denetimde görünür hedefler en az 24×24 CSS px olarak kontrol edildi; ana kontrollerin mevcut 44/48 px alanları korundu. [WCAG 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) aralık/inline istisnaları da içerir; bu denetimin koşulu bunları uygunluk iddiasına dönüştürmez.

## 7. Responsive ve görsel sonuçlar

- Genişlikler: 1920, 1440, 1280, 1024, 768, 430, 390, 375, 320 px. H1/H2/H3, spacing, container, görsel oranları, CTA, form ve footer geçişleri ekran görüntülerinden incelendi.
- Dokuz route × dokuz genişlikte yatay taşma yok. 1024/1280 px desktop header bağlantıları çakışmıyor. Menü 1024 px altında açılır yapıya geçiyor.
- Galeri H1 ölçeği en fazla 60 px, mobilde 36 px kaldı. Hakkımızda fotoğrafı ortalı ve adımlarla hizalı. İletişim kadrajı korunuyor. Teklif sticky alanı header altında kalıyor, footer'a taşmıyor ve kısa ekranlarda devreden çıkıyor.
- Lightbox 320×320 kısa ekranda da sınırların içinde. Teklifte 1280×600 doğal akış kontrolü ve 320 px'te uzun Türkçe ad/açıklama özeti geçti.
- Reduced motion altında smooth scroll/animasyon geçişleri kapanıyor.
- Gerçek tarayıcı %200 zoom kısayolu otomasyon ortamında `innerWidth`, DPR veya viewport ölçeğini değiştirmedi. Gerçek zoom testi yapılmış sayılmadı. Bunun yerine 1920/1280/1024 ekranların %200 zoom geometrisine karşılık gelen 960×540, 640×450, 512×384 CSS viewport'larında 27 route kontrolü yapıldı. Bu, gerçek browser zoom ve yardımcı teknoloji denemesinin yerine geçmez.
- [WCAG yeniden akış açıklaması](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) doğrultusunda 320 CSS px düzeni ayrıca değerlendirildi.

## 8. Performans ölçümleri

**Lighthouse kurulumu/Chrome DevTools MCP bulunmadığı için Lighthouse çalıştırılmadı; mobil/desktop puanı yoktur.**

Aşağıdakiler production sunucusunda gerçek `PerformanceObserver` / Resource Timing ölçümleridir. Desktop 1440×900 / DPR 1; mobile 390×844 / DPR 2. Her yükleme ayrı ve browser cache'i kapalı Chromium context'i kullanır. Ağ/CPU yavaşlatması yoktur; sunucunun görsel optimizasyon önbelleği temizlenmedi. `networkidle + 350 ms` penceresi, kaydırma/etkileşim olmadan gözlendi. INP ve uzun oturum performansı ölçülmedi. Bunlar Lighthouse, gerçek cihaz veya saha Core Web Vitals sonucu değildir; [lab/saha ayrımı](https://web.dev/articles/vitals) korunmalıdır.

Tabloda her route'un son ölçüm çalışmasındaki ilk örneği yer alır; tek örnekler karşılaştırmalı hız artışı kanıtı değildir.

| Route | Desktop LCP (ms) | Mobile LCP (ms) | CLS desktop / mobile |
| --- | ---: | ---: | --- |
| `/` | 552 | 128 | 0 / 0 |
| `/hizmetler` | 168 | 152 | 0 / 0 |
| `/hizmetler/ppf-kaplama` | 120 | 148 | 0 / 0 |
| `/hizmetler/seramik-kaplama` | 136 | 112 | 0 / 0 |
| `/hizmetler/detailing` | 148 | 132 | 0 / 0 |
| `/galeri` | 192 | 152 | 0 / 0 |
| `/hakkimizda` | 132 | 132 | 0 / 0 |
| `/iletisim` | 120 | 108 | 0 / 0 |
| `/teklif-al` | 152 | 136 | 0 / 0 |

Teklif sayfası her profilde üç kez açıldı: iki normal, bir geçersiz query. Son altı örneğin tamamında CLS 0. Başlangıç ölçümündeki 0,1918 / 0,3621 kaymanın kaynak elemanı footer olarak doğrulanmıştı. Sayıların tümü `phase10/measurements.json` içindedir.

Diğer kaynak sonuçları:

- Son CSS: 39.040 bayt ham, 7.851 bayt gzip. Tek ortak, render-blocking stylesheet; ölçülen bekleme süreleri kayıtta yer alıyor. Sırf bu nedenle CSS/config yeniden yazılmadı.
- Ölçüm penceresindeki script encoded boyutları yaklaşık 146–157 KB. Bunlar viewport prefetch'lerini de kapsayan kaynak toplamlarıdır; yalnızca route'a özgü JavaScript boyutu olarak sunulamaz.
- Dört Client Component sınırı gerekli etkileşimlere ayrılmış: navigasyon aktifliği, mobil menü, galeri, teklif formu. Sayfalar Server Component; sekiz route statik, teklif sayfası PPR'dır.
- 15 yerel JPEG incelendi; en büyük kaynak `service-ppf.jpg` 531.108 bayt. Tarayıcı bu dosyaları doğrudan tam boy yüklemiyor: statik import, responsive `sizes/srcset` ve Next.js Image Optimization kullanılıyor. Örneğin katalog ilk ekranındaki toplam optimize görsel encoded verisi desktop 162.104, mobile 186.588 bayttır.
- Hero ve erken büyük görseller eager/high priority; destek/galeri görselleri lazy. Lightbox yalnızca açıldığında eager olur. Görsel alanları aspect ratio ile ayrılmış. Kaynak fotoğraflar kanıtlanmış ihtiyaç olmadan yeniden sıkıştırılmadı.
- Ortak hizmet/galeri fotoğrafları tekrar eden aynı içerik için paylaşılır; fiziksel kopya dosya eklenmedi. Ana sayfanın mobil hero dosyası ayrı bir fotoğraf değil, mevcut çekimin kayıtlı kırpımıdır. Sırf çeşitlilik için fotoğraf değiştirilmedi.
- Son denetim/ölçüm pencerelerinde console warning/error veya uncaught hata yoktu. Bu, bütün olası ağ/cihaz durumlarının test edildiği anlamına gelmez.

## 9. SEO sonuçları

Dokuz route'ta özgün title/description, aynı sayfayı tanımlayan Open Graph metinleri, tek H1, uygun dahili bağlantılar ve anlamlı alt metinler doğrulandı. Hizmet slug'ları async params + `generateStaticParams` ve gerçek 404 davranışını korur.

Global `noindex, nofollow` aynıdır. Üretim domain'i olmadığı için canonical, metadataBase, OG URL/görsel URL'si veya sitemap domain'i uydurulmadı. Gerçek yayın adresi doğrulanınca canonical/OG image/sitemap politikası hazırlanmalı; indeksleme ayrı bir yayın kararı olarak değerlendirilmelidir.

## 10. Test komutları ve sonuçları

`frontend` dizininde gerçekten çalıştırıldı:

| Komut / test | Sonuç |
| --- | --- |
| `npm run lint` | Başarılı |
| `npx --no-install eslint tests` | Başarılı |
| `npm run build` | Son production build başarılı |
| `npx --no-install tsc --noEmit` | Build sonrasında başarılı |
| `node --experimental-strip-types --test tests/quote-validation.test.mjs` | 4 başarılı, 0 başarısız |
| `quote-request.browser.js` | Doğrulama, açıklama ID'leri, özet/düzenleme, query, veri gönderilmemesi, JS kapalı durum ve sticky geçti |
| `gallery.browser.js` | Filtre, lightbox, Escape, odak dönüşü, görseller ve navigasyon geçti |
| `services.browser.js` | Katalog, ana sayfa önizlemesi ve bağlantılar geçti |
| `service-details.browser.js` | Üç detay, FAQ, metadata, bağlantılar ve gerçek 404 geçti |
| `contact.browser.js` | İçerik, görsel, gerçek hedefler, menü/klavye geçti |
| `about-footer.browser.js` | Dokuz route × altı genişlik; fotoğraf hizası, H1 ve header/footer geçti |
| `quality-audit.browser.js` | 81 görünüm + 24 axe + 27 daraltılmış viewport; menü/kontrast/kısa modal/uzun özet geçti |
| `performance.browser.js` | 22 yükleme; altı teklif örneğinde CLS ≤ 0,01 koşulu geçti (ölçülen 0) |

Ara denemeler de kayda değerdir: ilk build Windows `EPERM` dosya erişim hatası aldı; aynı build gerekli erişimle başarılı çalıştı. İlk yeni test taslağındaki Node dynamic import'u MCP VM tarafından desteklenmedi ve betikler standart Playwright/DOM/Canvas ile uyarlandı. Soğuk stream açılışında hazırlık seçicisi iki submit butonuna eşleşti; görünür seçici ve ayrı yükleme ID'leriyle son çalışma geçti. İlk mobil maske denemesi 320 px'te 3,84:1 verdi; son değer 5,77:1 oldu. Kontroller kapatılmadı.

Node testinde `MODULE_TYPELESS_PACKAGE_JSON` uyarısı var; dört test yine geçti. Bunu susturmak için uygulamanın modül yapılandırması değiştirilmedi.

Tarayıcı betikleri bağımsız CLI runner değildir. README'deki mevcut Playwright MCP yöntemi kullanılır: çalışan uygulama sekmesi `http://127.0.0.1:3015` origin'inde açıkken `browser_run_code_unsafe` aracına örneğin `filename: "frontend/tests/quality-audit.browser.js"` verilir. Aynı yöntem diğer yedi tarayıcı dosyasına uygulanır. Testler yalnızca kurgu kişisel bilgiler kullanır. Kalite betiği ekran görüntülerini `.next/qa/phase10` altına kaydeder; build sırasında bu geçici dosyalar kaybolabilir. Kalıcı karşılaştırmalar ve sayısal kayıt bu belgenin yanındadır.

## 11. Test edilmemiş ortamlar

- Firefox, Safari/WebKit, gerçek iOS/Android ve ekran klavyesi.
- NVDA/JAWS/VoiceOver gibi ekran okuyucular.
- Gerçek %200 browser zoom (yalnızca yukarıdaki eşdeğer viewport kontrolleri yapıldı).
- Lighthouse, CPU/ağ yavaşlatmalı benchmark, CDN/uzak yayın ortamı, saha RUM ve INP.
- Gerçek API, saklama ve admin akışları; bu özellikler henüz yoktur.

Bu nedenle otomatik denetimin geçmesi tam WCAG 2.2 AA veya production yayın onayı anlamına gelmez.

## 12. Backend/yayın öncesi kalan işler

- Gerçek Quote Request DTO/endpoint'i, sunucu doğrulaması/normalizasyonu, güvenli gönderim ve hata sözleşmesi.
- İşletme tarafından doğrulanmış iletişim bilgileri; onaylı aydınlatma, saklama ve veri işleme akışı.
- Gerçek API hazır olduğunda gönderim/yüklenme/hata/başarı durumlarının gerçek sunucu sonucuna bağlanması.
- Gerçek müşteri/işletme çekimleri ve izin kayıtları; stok/demo açıklamalarının ancak içerik doğrulandıktan sonra değiştirilmesi.
- Gerçek domain için SEO ve yayın politikası; yukarıdaki manuel erişilebilirlik/cihaz testleri ve dağıtım performansı ölçümü.

Şimdiki form yalnızca yerel doğrulama ve özet gösterir: API isteği, sahte kayıt/başarı numarası, uygulama localStorage/sessionStorage kaydı veya kişisel veri log'u yoktur. Native form serileştirmesi kişisel alanları içermez; JS kapalıyken kontroller disabled'dır.

## Kanıt dosyaları

- [Ölçüm ve denetim kaydı](phase10/measurements.json)
- [Menü odağı — önce / sonra](phase10/menu-focus-comparison.png)
- [Mobil hero kontrastı — önce / sonra](phase10/hero-contrast-comparison.png)

Bu görseller mevcut arayüzün gerçek tarayıcı ekran görüntüleridir; yeni veya AI üretimi uygulama fotoğrafları değildir.

