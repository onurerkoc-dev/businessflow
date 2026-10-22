# Görsel kaynakları ve kullanım kaydı

Kontrol tarihi: 22 Ekim 2026.

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
