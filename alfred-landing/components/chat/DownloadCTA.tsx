"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DOWNLOAD_LINK } from "@/lib/constants";
import Link from "next/link";

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

            {/* QR Code (Desktop Only) */}
            <div className="hidden md:block w-48 h-48 mx-auto bg-white rounded-2xl p-3 mb-8 group transition-all duration-300 shadow-[0_0_20px_rgba(180,251,0,0.1)] hover:shadow-[0_0_30px_rgba(180,251,0,0.2)] overflow-hidden">
                <div className="relative w-full h-full">
                    <Image
                        src="/images/qr/codigo.webp"
                        alt="Escanea para descargar Alfred"
                        fill
                        className="object-contain"
                        sizes="192px"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <Link href={DOWNLOAD_LINK} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full bg-alfred-lime text-alfred-navy font-black rounded-xl h-14">
                        Ir a App Store
                    </Button>
                </Link>
                <Button variant="ghost" className="text-white/40 hover:text-white">
                    Más tarde
                </Button>
            </div>
        </motion.div>
    );
}
