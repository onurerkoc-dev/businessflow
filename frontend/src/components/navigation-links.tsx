"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavigationLinks() {
  const pathname = usePathname();
  const homePrefix = pathname === "/" ? "" : "/";

  return (
    <>
      <Link className="nav-link" href={`${homePrefix}#home`} aria-current={pathname === "/" ? "page" : undefined}>Ana Sayfa</Link>
      <Link className="nav-link" href={`${homePrefix}#ppf`}>PPF Kaplama</Link>
      <Link className="nav-link" href={`${homePrefix}#ceramic`}>Seramik Kaplama</Link>
      <Link className="nav-link" href={`${homePrefix}#detailing`}>Detailing</Link>
      <Link className="nav-link" href="/galeri" aria-current={pathname === "/galeri" ? "page" : undefined}>Galeri</Link>
      <Link className="button button-outline nav-cta" href="/hizmetler" aria-current={pathname === "/hizmetler" ? "page" : undefined}>Hizmetleri İncele</Link>
    </>
  );
}
