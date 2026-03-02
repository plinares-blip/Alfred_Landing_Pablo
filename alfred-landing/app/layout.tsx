import type { Metadata } from "next";
import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script"; // <-- 1. IMPORTAMOS SCRIPT
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
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=AW-10955810536`}
        />
        <Script
          id="google-ads-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-10955810536');
            `,
          }}
        />
        {/* ========================================= */}

        {children}
      </body>
    </html>
  );
}