"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";

// Lazy-load below-fold sections — these won't block initial paint
const Personas = dynamic(() => import("@/components/sections/Personas").then(m => ({ default: m.Personas })));
const Empresas = dynamic(() => import("@/components/sections/Empresas").then(m => ({ default: m.Empresas })));
const Servicios = dynamic(() => import("@/components/sections/Servicios").then(m => ({ default: m.Servicios })));
const WorkshopCertification = dynamic(() => import("@/components/sections/WorkshopCertification").then(m => ({ default: m.WorkshopCertification })));
const Convenios = dynamic(() => import("@/components/sections/Convenios").then(m => ({ default: m.Convenios })));
const Conductores = dynamic(() => import("@/components/sections/Conductores").then(m => ({ default: m.Conductores })));
const Nosotros = dynamic(() => import("@/components/sections/Nosotros").then(m => ({ default: m.Nosotros })));
const SocialProof = dynamic(() => import("@/components/sections/SocialProof").then(m => ({ default: m.SocialProof })));
const SupportStrip = dynamic(() => import("@/components/sections/SupportStrip").then(m => ({ default: m.SupportStrip })));

export function LandingPage() {
    const searchParams = useSearchParams();
    const [mode, setMode] = useState<"personal" | "business" | "alianzas" | "talleres" | "careers">("personal");

    // Sync mode from URL query param on mount
    useEffect(() => {
        const queryMode = searchParams.get("mode");
        if (queryMode && ["personal", "business", "alianzas", "talleres", "careers"].includes(queryMode)) {
            setMode(queryMode as any);
        }
    }, [searchParams]);

    // Save mode on change and update the URL silently to enable back-button restoration
    useEffect(() => {
        localStorage.setItem("alfred_mode", mode);

        const url = new URL(window.location.href);
        url.searchParams.set("mode", mode);
        window.history.replaceState({}, "", url.toString());
    }, [mode]);

    return (
        <main className="min-h-screen bg-alfred-dark text-white selection:bg-alfred-lime selection:text-alfred-blue">
            <Navbar mode={mode} setMode={setMode} />

            <Hero mode={mode} setMode={setMode} />

            <div key={mode}>
                {mode === "personal" ? (
                    <>
                        <Personas />
                        <Servicios mode="personal" />
                        <WorkshopCertification />
                        <Conductores mode="personal" />
                        <Convenios mode="personal" />
                        <SupportStrip />
                        <Nosotros />
                        <SocialProof mode="personal" />
                    </>
                ) : (
                    <Empresas />
                )}
            </div>

            <Footer />
        </main>
    );
}
