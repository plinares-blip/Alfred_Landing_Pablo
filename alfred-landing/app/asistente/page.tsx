"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import ChatInterface from "@/components/chat/ChatInterface";

export default function AsistentePage() {
    const [mode, setMode] = useState<"personal" | "business" | "alianzas" | "talleres">("personal");

    return (
        <main className="min-h-screen bg-alfred-dark selection:bg-alfred-lime selection:text-alfred-navy overflow-hidden">
            <Navbar mode={mode} setMode={setMode} />

            {/* Ambient Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-alfred-navy/20 rounded-full blur-[150px]" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-alfred-lime/10 to-transparent" />
            </div>

            <div className="relative pt-20">
                <ChatInterface />
            </div>
        </main>
    );
}
