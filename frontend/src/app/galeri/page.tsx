import type { Metadata } from "next";
import { Gallery } from "@/components/gallery";
import { galleryImages } from "@/data/gallery";

const description =
  "PPF, seramik kaplama, boya düzeltme ve detaylı araç bakımı uygulamalarını yakından inceleyin.";

export const metadata: Metadata = {
  title: "Uygulama Galerisi | VANTA",
  description,
  openGraph: {
    title: "Uygulama Galerisi | VANTA",
    description,
    type: "website",
    locale: "tr_TR",
    siteName: "VANTA",
  },
};

export default function GalleryPage() {
  return (
    <main className="gallery-page" id="main-content" tabIndex={-1}>
      <div className="site-container">
        <header className="gallery-page-intro">
          <h1>Uygulama Galerisi</h1>
          <div>
            <p className="gallery-page-description">{description}</p>
            <p className="gallery-page-note">
              Tanıtım amaçlı stok uygulama fotoğraflarıdır; VANTA müşteri
              çalışmalarını temsil etmez.
            </p>
          </div>
        </header>
        <Gallery photos={galleryImages} />
      </div>
    </main>
  );
}
