"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DOWNLOAD_LINK } from "@/lib/constants";

const FeatureItem = ({ text, delay }: { text: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="flex items-start gap-4 group"
    >
        <div className="mt-2.5 w-6 h-[2px] bg-[#B4FB00] flex-shrink-0 shadow-[0_0_8px_#B4FB00]" />
        <span className="text-white/90 text-sm md:text-base lg:text-lg font-medium tracking-tight whitespace-nowrap">
            {text}
        </span>
    </motion.div>
);

export function WorkshopCertification() {
    return (
        <section id="workshop-certification" className="pb-10 pt-10 lg:pb-12 lg:pt-12 xl:pb-24 xl:pt-16 bg-gradient-to-b from-[#0E1726] via-[#111E3E] to-[#111E3E] from-0% via-10% relative overflow-hidden transition-all duration-700">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/5 shadow-2xl group bg-[#0c1222] min-h-[450px] lg:h-[400px] xl:h-[480px] flex items-center"
                >
                    {/* Watermark/Background Image */}
                    <div className="absolute right-0 bottom-0 w-[80%] h-[60%] md:right-[-10%] md:top-1/2 md:-translate-y-1/2 md:w-[55%] md:h-[110%] opacity-[0.05] pointer-events-none z-0">
                        <Image
                            src="/images/icono_servicios/talleres.webp"
                            alt="Workshop Icon Background"
                            fill
                            className="object-contain object-bottom md:object-center"
                            sizes="(max-width: 768px) 80vw, 40vw"
                        />
                    </div>

                    {/* Content Grid */}
                    <div className="relative w-full px-6 md:px-16 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center z-10 py-10 lg:py-12">
                        
                        {/* 1. TEXT CONTENT */}
                        <div className="space-y-8 flex flex-col justify-center">
                            <div className="space-y-4">
                                <h3 className="text-4xl md:text-5xl lg:text-5xl xl:text-7xl font-black text-white leading-[0.9] uppercase tracking-tighter">
                                    Nuestra red de <br />
                                    <span className="text-alfred-lime">proveedores certificados.</span>
                                </h3>
                                <p className="text-white/60 text-base md:text-lg xl:text-xl font-medium leading-tight max-w-lg">
                                    Te damos toda la información para que tú elijas el mejor taller para tu vehículo.
                                </p>
                            </div>

                            <div className="flex flex-row gap-3 sm:gap-4 flex-wrap sm:flex-nowrap items-center">
                                {/* MÓVIL: Botón directo */}
                                <div className="w-full sm:w-auto lg:hidden">
                                    <Link
                                        href={DOWNLOAD_LINK}
                                        target="_blank"
                                        className="group inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-4 bg-alfred-lime text-alfred-dark hover:scale-105 transition-all rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(180,251,0,0.3)] whitespace-nowrap w-full"
                                    >
                                        <span>Encuentra tu taller ideal</span>
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                {/* DESKTOP: QR + Texto Flotando */}
                                <div className="hidden lg:flex items-center gap-4 group mr-6">
                                    <div className="relative w-12 h-12 transition-all duration-500 group-hover:scale-[3] group-hover:z-50 group-hover:bg-[#0c1222] group-hover:p-1 group-hover:rounded-lg">
                                        <Image
                                            src="/images/qr/codigo.webp"
                                            alt="Descarga Alfred"
                                            fill
                                            className="object-contain"
                                            sizes="48px"
                                        />
                                    </div>
                                    <span className="text-white font-black text-sm xl:text-base uppercase tracking-widest opacity-90 group-hover:opacity-100 group-hover:text-alfred-lime transition-all">
                                        Encuentra tu taller ideal
                                    </span>
                                </div>
                                
                                <Link
                                    href="/talleres"
                                    className="group inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-4 border border-white/20 text-white/80 hover:text-white hover:bg-white/5 transition-all rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest whitespace-nowrap"
                                >
                                    <span>Ser Taller Alfred</span>
                                </Link>
                            </div>
                        </div>

                        {/* 2. ELEGANT LIST (Clean) */}
                        <div className="relative flex flex-col gap-6 lg:gap-8">
                            <FeatureItem text="Escoge los mejores calificados" delay={0.2} />
                            <FeatureItem text="Los que te queden más cerca" delay={0.3} />
                            <FeatureItem text="Precio transparente" delay={0.4} />
                            <FeatureItem text="Protocolos con evidencia fotográfica" delay={0.5} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}




