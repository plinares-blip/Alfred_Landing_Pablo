import type { Metadata } from "next";
import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google"; // <-- 1. IMPORTAMOS GOOGLE ANALYTICS
import "./globals.css";

const gotham = localFont({
  src: [
    { path: "./fonts/Gotham-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/Gotham-Book.otf", weight: "400", style: "normal" },
    { path: "./fonts/Gotham-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/Gotham-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/Gotham-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-gotham",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://alfred.co'),
  title: "Alfred | Tu ecosistema de servicios automotrices",
  description: "Alfred conecta tu vehículo con seguros, talleres, conductores y todo lo que necesitas. Sin fricción.",
  icons: {
    icon: "/images/logos/azul oscuro plano.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <GoogleAnalytics gaId="G-3SYJWSV7FV" />
      <body className={`${gotham.variable} ${jakarta.variable} antialiased bg-[#020D20] text-white`}>

        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Alfred",
                "url": "https://alfred.co",
                "logo": "https://alfred.co/images/logos/azul oscuro plano.webp",
                "sameAs": [
                  "https://www.instagram.com/alfred_colombia/",
                  "https://www.linkedin.com/company/alfred-automotriz/"
                ],
                "description": "Alfred conecta tu vehículo con seguros, talleres, conductores y todo lo que necesitas. Sin fricción."
              },
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Alfred Platform",
                "operatingSystem": "iOS, Android, Web",
                "applicationCategory": "AutomotiveBusinessApplication",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "COP"
                }
              }
            ])
          }}
        />
      </body>
    </html>
  );
}