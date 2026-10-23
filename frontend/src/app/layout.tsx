import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const title = "VANTA | PPF Kaplama, Seramik Kaplama ve Detailing";
const description = "PPF kaplama, seramik kaplama ve detaylı araç bakımı. Aracınıza uygun uygulamayı keşfedin.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", locale: "tr_TR", siteName: "VANTA" },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr">
      <body>
        <a className="skip-link" href="#main-content">Ana içeriğe geç</a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
