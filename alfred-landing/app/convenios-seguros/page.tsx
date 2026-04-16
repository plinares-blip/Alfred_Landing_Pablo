import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InsuranceHero } from "@/components/sections/InsuranceHero";
import { InsuranceWash } from "@/components/sections/InsuranceWash";
import { InsuranceConvenios } from "@/components/sections/InsuranceConvenios";
import { InsuranceInstructions } from "@/components/sections/InsuranceInstructions";
import { ExpressCTA } from "@/components/sections/ExpressCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Convenios de Seguros | Lavados Gratis con Alfred",
    description: "Si tienes póliza con Mapfre, Zurich o Bolívar, tus lavados con Alfred son gratis. Descubre cómo redimir tus beneficios.",
};

export default function ConveniosSegurosPage() {
    return (
        <main className="min-h-screen bg-alfred-dark text-white selection:bg-alfred-lime selection:text-alfred-blue">
            <Navbar mode="personal" />
            
            <InsuranceHero />
            <InsuranceWash />
            <InsuranceConvenios />
            <InsuranceInstructions />
            
            <ExpressCTA />

            <Footer />
        </main>
    );
}
