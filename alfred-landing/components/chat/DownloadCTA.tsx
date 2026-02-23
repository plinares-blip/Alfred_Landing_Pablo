"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

export function DownloadCTA() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto bg-alfred-navy/80 backdrop-blur-2xl border border-alfred-lime/30 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-alfred-lime to-transparent" />

            <div className="w-16 h-16 bg-alfred-lime/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-alfred-lime">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
            </div>

            <h3 className="text-2xl font-black text-white mb-4">¡Alfred quiere conocerte mejor!</h3>
            <p className="text-white/60 mb-8 leading-relaxed">
                Has alcanzado tu límite diario de consulta gratuita. Descarga nuestra App para tener a Alfred 24/7 en tu bolsillo.
            </p>

            {/* QR Placeholder */}
            <div className="aspect-square w-48 mx-auto bg-white/5 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center mb-8 group hover:border-alfred-lime/30 transition-colors">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 text-white/20 mb-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                </svg>
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Escanea para Descargar</span>
            </div>

            <div className="flex flex-col gap-3">
                <Button className="w-full bg-alfred-lime text-alfred-navy font-black rounded-xl h-14">
                    Ir a App Store
                </Button>
                <Button variant="ghost" className="text-white/40 hover:text-white">
                    Más tarde
                </Button>
            </div>
        </motion.div>
    );
}
