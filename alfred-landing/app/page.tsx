import { LandingPage } from "@/components/LandingPage";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alfred | La app que cuida tu carro por ti",
  description: "Alfred orquesta la industria automotriz para devolverte tu tiempo. Gestión inteligente de mantenimientos, trámites y seguros.",
};

export default function Home() {
  return (
    <Suspense fallback={null}>
      <LandingPage />
    </Suspense>
  );
}
