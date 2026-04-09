import { B2BAdsHero } from "@/components/sections/B2BAdsHero";
import { CommandCenter } from "@/components/sections/CommandCenter";
import { ClientMarquee } from "@/components/sections/SocialProof";
import { B2BLeadForm } from "@/components/sections/B2BLeadForm";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
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
            <Navbar mode="business" hideLinks={true} />
            <B2BAdsHero />
            <CommandCenter />
            
            <section className="bg-[#111E3E] pt-12 pb-24">
                <ClientMarquee />
            </section>
            
            <B2BLeadForm />
            <Footer />
        </main>
    );
}
