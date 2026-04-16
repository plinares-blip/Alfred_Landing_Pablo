import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ExpressHero } from "@/components/sections/ExpressHero";
import { Servicios } from "@/components/sections/Servicios";
import { WorkshopCertification } from "@/components/sections/WorkshopCertification";
import { ExpressCTA } from "@/components/sections/ExpressCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Servicios Automotrices Express | Alfred",
    description: "La forma más rápida y transparente de cuidar tu vehículo. Todo desde tu celular.",
};

export default function ServiciosExpressPage() {
    return (
        <main className="min-h-screen bg-alfred-dark text-white selection:bg-alfred-lime selection:text-alfred-blue">
            <Navbar mode="personal" />
            
            <ExpressHero />
            
            <div className="bg-[#0A0F1A]">
                <Servicios mode="personal" />
                <WorkshopCertification />
            </div>

            <ExpressCTA />

            <Footer />
        </main>
    );
}
