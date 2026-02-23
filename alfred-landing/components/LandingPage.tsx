"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Personas } from "@/components/sections/Personas";
import { Empresas } from "@/components/sections/Empresas";
import { Servicios } from "@/components/sections/Servicios";
import { WorkshopCertification } from "@/components/sections/WorkshopCertification";
import { Convenios } from "@/components/sections/Convenios";
import { Conductores } from "@/components/sections/Conductores";
import { Nosotros } from "@/components/sections/Nosotros";
import { SocialProof } from "@/components/sections/SocialProof";
import { SupportStrip } from "@/components/sections/SupportStrip";
import { AnimatePresence, motion } from "framer-motion";

export function LandingPage() {
    const searchParams = useSearchParams();
    const [mode, setMode] = useState<"personal" | "business" | "alianzas" | "talleres">("personal");

    useEffect(() => {
        const queryMode = searchParams.get("mode");
        if (queryMode && ["personal", "business", "alianzas", "talleres"].includes(queryMode)) {
            setMode(queryMode as any);
        }
    }, [searchParams]);

    return (
        <main className="min-h-screen bg-alfred-dark text-white selection:bg-alfred-lime selection:text-alfred-blue">
            <Navbar mode={mode} setMode={setMode} />

            <Hero mode={mode} setMode={setMode} />

            <AnimatePresence mode="wait">
                {mode === "personal" ? (
                    <motion.div
                        key="personal-sections"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Personas />
                        <Servicios mode="personal" />
                        <WorkshopCertification />
                        <Conductores />
                        <Convenios mode="personal" />
                        <SupportStrip />
                        <Nosotros />
                        <SocialProof mode="personal" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="business-sections"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Empresas />
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}
