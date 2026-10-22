import { Hero } from "@/components/hero";
import { Services } from "@/components/services";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <Services />
    </main>
  );
}
