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
    const [mounted, setMounted] = useState(false);

    // Initial load: sync mode from URL or localStorage
    useEffect(() => {
        const queryMode = searchParams.get("mode");
        const savedMode = localStorage.getItem("alfred_mode") as "personal" | "business";

        if (queryMode && ["personal", "business", "alianzas", "talleres"].includes(queryMode)) {
            setMode(queryMode as any);
        } else if (savedMode && ["personal", "business"].includes(savedMode)) {
            setMode(savedMode);
        }
        setMounted(true);
    }, [searchParams]);

    // Save mode on change and update the URL silently to enable back-button restoration
    useEffect(() => {
        if (!mounted) return;

        localStorage.setItem("alfred_mode", mode);

        // Sync URL so navigating back remembers the mode that matches the scroll position
        const url = new URL(window.location.href);
        url.searchParams.set("mode", mode);
        window.history.replaceState({}, "", url.toString());
    }, [mode, mounted]);

    if (!mounted) return null; // Prevent hydration layout shifts affecting scroll restoration

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
                        <Conductores mode="personal" />
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
