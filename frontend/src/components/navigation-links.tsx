"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavigationLinks() {
  const pathname = usePathname();
  const homePrefix = pathname === "/" ? "" : "/";

  return (
    <>
      <Link className="nav-link" href={`${homePrefix}#home`} aria-current={pathname === "/" ? "page" : undefined}>Ana Sayfa</Link>
      <Link className="nav-link" href="/hizmetler/ppf-kaplama" aria-current={pathname === "/hizmetler/ppf-kaplama" ? "page" : undefined}>PPF Kaplama</Link>
      <Link className="nav-link" href="/hizmetler/seramik-kaplama" aria-current={pathname === "/hizmetler/seramik-kaplama" ? "page" : undefined}>Seramik Kaplama</Link>
      <Link className="nav-link" href="/hizmetler/detailing" aria-current={pathname === "/hizmetler/detailing" ? "page" : undefined}>Detailing</Link>
      <Link className="nav-link" href="/galeri" aria-current={pathname === "/galeri" ? "page" : undefined}>Galeri</Link>
      <Link className="nav-link" href="/hakkimizda" aria-current={pathname === "/hakkimizda" ? "page" : undefined}>Hakkımızda</Link>
      <Link className="nav-link" href="/iletisim" aria-current={pathname === "/iletisim" ? "page" : undefined}>İletişim</Link>
      <Link className="button button-primary nav-cta" href="/teklif-al" aria-current={pathname === "/teklif-al" ? "page" : undefined}>Teklif Al</Link>
    </>
  );
}
