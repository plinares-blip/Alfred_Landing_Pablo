"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Convenios } from "@/components/sections/Convenios";

export default function AlianzasPage() {
    const [mode, setMode] = useState<"personal" | "business" | "alianzas" | "talleres">("alianzas");

    return (
        <main className="min-h-screen bg-alfred-dark text-white selection:bg-alfred-lime selection:text-alfred-blue font-sans">
            <Navbar mode={mode} setMode={setMode} />
            <Convenios mode="business" />
            <Footer />
        </main>
    );
}
