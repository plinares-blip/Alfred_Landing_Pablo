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
  title: "Alfred | Tu ecosistema de servicios automotrices",
  description: "Alfred conecta tu vehículo con seguros, talleres, conductores y todo lo que necesitas. Sin fricción.",
  icons: {
    icon: "/images/logos/azul oscuro plano.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${gotham.variable} ${jakarta.variable} antialiased bg-[#020D20] text-white`}>

        {/* ========================================= */}
        {/* 2. ETIQUETA GLOBAL DE GOOGLE ADS */}
        {/* ========================================= */}
        <GoogleAnalytics gaId="G-3SYJWSV7FV" />
        {/* Google Ads Tag is actually often handled by the same gtag.js. 
            If you need both explicitly, or if one is a sub-tag, 
            GA4 often takes precedence as the primary container.
            Update: Standard Next.js practice for dual tagging is to use the primary ID.
        */}
        {/* ========================================= */}

        {children}

        {/* ========================================= */}
        {/* 3. SCHEMA.ORG (JSON-LD) - SEO SEMÁNTICO */}
        {/* ========================================= */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Alfred",
                "url": "https://alfred.com.co",
                "logo": "https://alfred.com.co/images/logos/azul oscuro plano.png",
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