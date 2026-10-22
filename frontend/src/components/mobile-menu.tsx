"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function MobileMenu({ children }: { children: ReactNode }) {
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeMenu = () => {
      if (menuRef.current) menuRef.current.open = false;
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) closeMenu();
    };

    desktop.addEventListener("change", closeMenu);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      desktop.removeEventListener("change", closeMenu);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, []);

  return (
    <details
      className="mobile-menu"
      ref={menuRef}
      onKeyDown={(event) => {
        if (event.key === "Escape" && event.currentTarget.open) {
          event.preventDefault();
          event.currentTarget.open = false;
          event.currentTarget.querySelector("summary")?.focus();
        }
      }}
    >
      <summary className="menu-toggle" aria-controls="mobile-navigation">
        <span>Menü</span>
        <svg className="menu-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 7h14" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 13h14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </summary>
      <nav
        className="mobile-nav"
        id="mobile-navigation"
        aria-label="Mobil ana navigasyon"
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a")) {
            if (menuRef.current) menuRef.current.open = false;
          }
        }}
      >
        {children}
      </nav>
    </details>
  );
}
