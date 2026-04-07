import { B2BAdsHero } from "@/components/sections/B2BAdsHero";
import { ROICalculatorHook } from "@/components/sections/ROICalculatorHook";
import { CommandCenter } from "@/components/sections/CommandCenter";
import { ClientMarquee } from "@/components/sections/SocialProof";
import { B2BLeadForm } from "@/components/sections/B2BLeadForm";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alfred | Control de Flota en la Nube",
  description: "El sistema operativo definitivo para tu flota. Evita mantenimientos sorpresa y centraliza el control de tus vehículos.",
  robots: {
    index: false,
    follow: true,
  }
};

export default function FlotasProLanding() {
    return (
        <main className="min-h-screen bg-alfred-dark text-white selection:bg-alfred-lime selection:text-alfred-blue">
            <B2BAdsHero />
            <ROICalculatorHook />
            <CommandCenter />
            
            <section className="bg-[#111E3E] pt-12 pb-24">
                <div className="container mx-auto px-4 mb-10">
                    <p className="text-center text-sm font-bold tracking-[0.2em] uppercase text-white/40 mb-2">
                        Empresas que ya controlan su flota con nosotros
                    </p>
                </div>
                <ClientMarquee />
            </section>
            
            <B2BLeadForm />
            <Footer />
        </main>
    );
}
