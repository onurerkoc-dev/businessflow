import Image from "next/image";
import Link from "next/link";
import { galleryImages } from "@/data/gallery";

export function GalleryPreview() {
  return (
    <section
      className="gallery-preview"
      id="gallery-preview"
      aria-labelledby="gallery-title"
    >
      <div className="site-container">
        <div className="gallery-intro">
          <h2 id="gallery-title">Uygulama Detayları</h2>
          <p>
            PPF, seramik kaplama ve detaylı araç bakımında kullanılan uygulamaları
            yakından inceleyin.
          </p>
        </div>
        <p className="gallery-source-note">
          Görseller, uygulamaları tanıtan stok fotoğraflardır; VANTA müşteri
          çalışmaları değildir.
        </p>
        <div className="gallery-grid">
          {galleryImages.filter((photo) => photo.previewSizes).map((photo) => (
            <figure
              className={`gallery-item gallery-item--${photo.id}`}
              key={photo.id}
            >
              <div className="gallery-media">
                <Image
                  src={photo.image}
                  alt={photo.alt}
                  fill
                  sizes={photo.previewSizes}
                  loading="lazy"
                  placeholder="blur"
                />
              </div>
              <figcaption>{photo.category}</figcaption>
            </figure>
          ))}
        </div>
        <div className="gallery-preview-link">
          <Link className="button button-outline" href="/galeri">Tüm Galeriyi Gör</Link>
        </div>
      </div>
    </section>
  );
}
