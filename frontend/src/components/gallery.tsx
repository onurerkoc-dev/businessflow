"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { GalleryPhoto } from "@/data/gallery";

export function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const [category, setCategory] = useState("Tamamı");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const categories = ["Tamamı", ...new Set(photos.map((photo) => photo.category))];
  const filteredPhotos = category === "Tamamı"
    ? photos
    : photos.filter((photo) => photo.category === category);

  useEffect(() => {
    if (!selectedPhoto || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus({ preventScroll: true });
    };
  }, [selectedPhoto]);

  return (
    <section
      className="gallery-viewer"
      aria-label="Uygulama fotoğrafları"
      data-filtered={category !== "Tamamı"}
    >
      <div className="gallery-filters" role="group" aria-label="Fotoğraf kategorileri">
        {categories.map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={category === item}
            aria-controls="gallery-collection"
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="gallery-result" role="status">
        {category}: {filteredPhotos.length} fotoğraf
      </p>
      <div className="gallery-collection" id="gallery-collection">
        {filteredPhotos.map((photo, index) => {
          const isWide = category !== "Tamamı" || index < 2 || index >= filteredPhotos.length - 2;

          return (
            <figure className="gallery-tile" key={photo.id} data-landscape={photo.image.width > photo.image.height}>
              <button
                type="button"
                className="collection-media"
                aria-label={`${photo.caption}. Görseli büyüt`}
                aria-haspopup="dialog"
                onClick={(event) => {
                  openerRef.current = event.currentTarget;
                  setSelectedPhoto(photo);
                }}
              >
                <Image
                  src={photo.image}
                  alt={photo.alt}
                  fill
                  sizes={`(min-width: 94rem) ${isWide ? 668 : 322}px, (min-width: 64rem) ${isWide ? 44 : 22}vw, (min-width: 48rem) 44vw, 100vw`}
                  loading="lazy"
                  placeholder="blur"
                  style={{ objectPosition: photo.position }}
                />
                <span className="collection-open" aria-hidden="true">Büyüt</span>
              </button>
              <figcaption>
                <span className="collection-category">{photo.category}</span>
                <span className="collection-caption">{photo.caption}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
      <dialog
        className="gallery-lightbox"
        ref={dialogRef}
        aria-labelledby="lightbox-title"
        aria-describedby="lightbox-caption"
        onClose={(event) => {
          if (!event.currentTarget.open) setSelectedPhoto(null);
        }}
      >
        <div className="lightbox-toolbar">
          <h2 id="lightbox-title">{selectedPhoto?.category}</h2>
          <button type="button" onClick={() => dialogRef.current?.close()}>Kapat</button>
        </div>
        {selectedPhoto && (
          <>
            <div className="lightbox-media">
              <Image
                src={selectedPhoto.image}
                alt={selectedPhoto.alt}
                fill
                sizes="(min-width: 80rem) 1200px, 100vw"
                loading="eager"
              />
            </div>
            <p id="lightbox-caption">{selectedPhoto.caption}</p>
          </>
        )}
      </dialog>
    </section>
  );
}
