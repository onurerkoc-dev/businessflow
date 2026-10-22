import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { GalleryPreview } from "@/components/gallery-preview";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <Services />
      <GalleryPreview />
    </main>
  );
}
