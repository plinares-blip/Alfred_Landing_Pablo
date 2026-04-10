"use client";

import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#020D20] flex items-center justify-center px-4 selection:bg-alfred-lime selection:text-alfred-navy">
            <div className="relative max-w-2xl w-full text-center">
                {/* Visual Accent */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-alfred-lime/5 blur-[120px] pointer-events-none" />

                <h1 className="text-[120px] md:text-[180px] font-black text-white/5 leading-none select-none">
                    404
                </h1>

                <div className="relative -mt-12 md:-mt-24 space-y-8">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                        Ruta No <span className="text-alfred-lime">Encontrada</span>.
                    </h2>

                    <p className="text-white/60 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
                        Parece que te has desviado del camino. El destino que buscas no existe o ha sido movido.
                    </p>

                    <div className="pt-4">
                        <Link href="/">
                            <Button size="lg" className="bg-alfred-lime text-alfred-navy hover:bg-white font-black px-10 h-16 text-lg transition-all duration-300 shadow-[0_0_30px_rgba(180,251,0,0.2)] hover:shadow-[0_0_40px_rgba(180,251,0,0.4)] gap-3">
                                <MoveLeft size={20} />
                                Volver al Inicio
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Decorative Bottom Line */}
                <div className="mt-20 w-16 h-1 bg-alfred-lime/20 mx-auto rounded-full" />
            </div>
        </div>
    );
}
