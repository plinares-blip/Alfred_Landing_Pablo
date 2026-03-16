"use client";

import { useEffect } from "react";
import { RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Application Error:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[#020D20] flex items-center justify-center px-4 selection:bg-alfred-lime selection:text-alfred-navy">
            <div className="relative max-w-2xl w-full text-center">
                {/* Visual Accent */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-red-500/5 blur-[120px] pointer-events-none" />

                <h1 className="text-[120px] md:text-[180px] font-black text-white/5 leading-none select-none uppercase">
                    Error
                </h1>

                <div className="relative -mt-12 md:-mt-24 space-y-8">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                        Algo no salió <span className="text-red-500">bien</span>.
                    </h2>

                    <p className="text-white/60 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
                        Ha ocurrido un problema técnico en la plataforma. Estamos trabajando para solucionarlo.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button
                            onClick={() => reset()}
                            size="lg"
                            className="bg-white text-alfred-navy hover:bg-gray-100 font-black rounded-full px-10 h-16 text-lg transition-all duration-300 gap-3 w-full sm:w-auto"
                        >
                            <RefreshCcw size={20} />
                            Reintentar
                        </Button>

                        <Link href="/" className="w-full sm:w-auto">
                            <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 text-white font-black rounded-full px-10 h-16 text-lg transition-all duration-300 gap-3 w-full sm:w-auto">
                                <Home size={20} />
                                Ir al Inicio
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Decorative Bottom Line */}
                <div className="mt-20 w-16 h-1 bg-white/10 mx-auto rounded-full" />
            </div>
        </div>
    );
}
