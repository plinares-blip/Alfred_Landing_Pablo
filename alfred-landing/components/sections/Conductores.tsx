"use client";

import { Star, User, Circle, ShieldCheck, MapPin, Activity } from "lucide-react";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { DOWNLOAD_LINK } from '@/lib/constants';

export function Conductores() {
    return (
        <section id="conductores" className="relative w-full bg-[#111E3E] overflow-hidden min-h-screen lg:min-h-[550px] xl:min-h-[900px] flex flex-col justify-end lg:justify-center">

            {/* 1. EL FONDO (Fusión, no división) - Desktop & Mobile */}
            <div className="absolute inset-0 z-0">
                {/* Imagen del Conductor - Ocupa la pantalla en desktop, el top en mobile */}
                <div className="absolute top-0 left-0 w-full h-[55vh] lg:h-full overflow-hidden">
                    <NextImage
                        src="/images/sections/conductores_bg_V2.png"
                        alt="Alfred Driver Elite"
                        fill
                        className="object-cover object-center lg:object-center lg:scale-100"
                        priority
                    />


                    {/* Gradient Mask Mobile - Fade bottom */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111E3E]/40 via-30% to-[#111E3E] to-80% lg:hidden" />

                    {/* Gradient Mask Desktop - Fade left */}
                    <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#111E3E]/90 via-[#111E3E]/80 to-transparent" />
                </div>
            </div>

            {/* 2. CONTENIDO PRINCIPAL - Profundidad Editorial */}
            <div className="container mx-auto px-6 relative z-10 lg:pt-0 pb-16 lg:pb-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-0">

                    {/* TEXT BLOCK - Desktop (Izq) / Mobile (Centro-Bajo) */}
                    <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left pt-20 lg:pt-0">

                        {/* THE HEADLINE - IMPACTO */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-4xl xl:text-6xl 2xl:text-7xl font-black text-white leading-[0.95] tracking-tighter uppercase mb-6 lg:mb-8">
                                No es solo <br className="hidden lg:block" /> un conductor. <br />
                                {/* DEPTH TYPOGRAPHY - ES UN ALFRED */}
                                <span className="relative inline-block mt-2">
                                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#B4FB00] to-[#15EB00]">
                                        ES UN ALFRED.
                                    </span>
                                    {/* Sombra sutil para legibilidad si el hombro pisa */}
                                    <span className="absolute inset-0 z-0 blur-sm bg-black/20" />
                                </span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-lg lg:text-base xl:text-lg text-[#8E9BB4] mb-8 lg:mb-10 max-w-sm lg:max-w-md font-medium leading-relaxed"
                        >
                            Verificados, expertos y monitoreados en tiempo real. Control total y cero incertidumbre.
                        </motion.p>

                        {/* LOS PILARES - Estilo Mobile Nivel Dios + Desktop Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-8 mb-12 w-full lg:w-auto"
                        >
                            <div className="flex flex-col items-center lg:items-start gap-3">
                                <div className="text-center lg:text-left">
                                    <h4 className="text-white font-bold text-xs lg:text-base">Protocolo</h4>
                                    <p className="text-white/40 text-[8px] lg:text-[10px] uppercase font-bold tracking-widest leading-none mt-1">Actas Digitales</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center lg:items-start gap-3">
                                <div className="text-center lg:text-left">
                                    <h4 className="text-white font-bold text-xs lg:text-base">Monitoreo</h4>
                                    <p className="text-white/40 text-[8px] lg:text-[10px] uppercase font-bold tracking-widest leading-none mt-1">GPS En Vivo</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center lg:items-start gap-3">
                                <div className="text-center lg:text-left">
                                    <h4 className="text-white font-bold text-xs lg:text-base">4.9/5</h4>
                                    <p className="text-white/40 text-[8px] lg:text-[10px] uppercase font-bold tracking-widest leading-none mt-1">Rating Elite</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* EL GATILLO - Zona del pulgar Mobile */}
                        <div className="w-full lg:w-auto flex flex-col items-center">
                            <motion.a
                                href={DOWNLOAD_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-[#B4FB00] rounded-full w-full lg:min-w-[320px] shadow-[0_10px_40px_rgba(180,251,0,0.2)] hover:shadow-[0_15px_60px_rgba(180,251,0,0.4)] transition-all duration-300 overflow-hidden"
                            >
                                <span className="relative z-10 text-[#111E3E] font-black text-sm md:text-base uppercase tracking-widest">
                                    Pedir un Alfred
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#111E3E] relative z-10 group-hover:translate-x-1 transition-transform">
                                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                </svg>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </motion.a>

                            {/* Contenedor de tiendas alineado con el botón */}
                            <div className="mt-8 flex flex-col items-center gap-4 w-full">
                                <div className="relative w-60 h-10 transition-transform duration-300 hover:scale-105">
                                    <NextImage
                                        src="/images/qr/tienda.png"
                                        alt="App Store & Google Play"
                                        fill
                                        className="object-contain object-center"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* LA ZONA DE FOTO (Desktop) - Invisble para layout, pero define el espacio del conductor */}
                    <div className="hidden lg:block lg:col-span-5 xl:col-span-5 relative h-[450px] xl:h-[600px]">
                        {/* 3. LA TARJETA DE UI (Anclaje Físico) - Desktop Position Over Chest */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="absolute top-[55%] left-[5%] z-30 p-6 bg-[#111E3E]/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] min-w-[320px]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#B4FB00] to-[#15EB00] p-[2px]">
                                    <div className="w-full h-full rounded-full bg-[#111E3E] flex items-center justify-center overflow-hidden relative">
                                        <User className="w-7 h-7 text-white/80" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#B4FB00] border-4 border-[#111E3E] rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-[#111E3E] rounded-full" />
                                    </div>
                                </div>
                                <div>
                                    <h5 className="text-white font-bold text-lg leading-none">Camilo R.</h5>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <div className="flex items-center text-[#B4FB00] font-black text-xs">
                                            <Star className="w-3.5 h-3.5 fill-current mr-1" /> 4.98
                                        </div>
                                        <span className="text-white/20 text-[10px]">|</span>
                                        <span className="text-[#0096FB] text-[10px] font-black uppercase tracking-widest">Elite Driver</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 pt-5 border-t border-white/5 flex items-center justify-between">
                                <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                    <MapPin className="w-3 h-3 text-[#B4FB00]" /> Bogotá D.C.
                                </p>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#B4FB00]/10 border border-[#B4FB00]/20 text-[#B4FB00] text-[9px] font-black uppercase tracking-widest rounded">
                                    <span className="w-1.5 h-1.5 bg-[#B4FB00] rounded-full animate-pulse" />
                                    Activo
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>


        </section>
    );
}
