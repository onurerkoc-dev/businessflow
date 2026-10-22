import Link from "next/link";

export default function ServiceNotFound() {
  return (
    <main className="service-not-found site-container" id="main-content" tabIndex={-1}>
      <h1>Hizmet bulunamadı</h1>
      <p>Bu adreste bir hizmet bulunmuyor. Mevcut hizmetleri katalogda inceleyebilirsiniz.</p>
      <Link className="button button-primary" href="/hizmetler">Tüm Hizmetler</Link>
    </main>
  );
}
