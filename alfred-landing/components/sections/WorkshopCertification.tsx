"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function WorkshopCertification() {
    return (
        <section id="workshop-certification" className="pb-10 pt-10 lg:pb-12 lg:pt-12 xl:pb-24 xl:pt-16 bg-gradient-to-b from-[#0E1726] via-[#111E3E] to-[#111E3E] from-0% via-10% relative overflow-hidden transition-all duration-700">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    // CAMBIO: 'h-auto' para altura dinámica y 'py-8' para menos relleno vertical en móvil
                    className="relative w-full h-auto md:min-h-0 md:aspect-[21/9] md:h-[450px] lg:h-[400px] xl:h-[550px] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl group bg-[#0c1222] py-8 md:py-0"
                >
                    {/* Watermark Image - Ajustada para móvil */}
                    <div className="absolute right-0 bottom-0 w-[80%] h-[60%] md:right-[-10%] md:top-1/2 md:-translate-y-1/2 md:w-[55%] md:h-[110%] opacity-[0.15] md:opacity-[0.2] pointer-events-none z-0">
                        <Image
                            src="/images/icono_servicios/talleres.png"
                            alt="Workshop Icon Background"
                            fill
                            // En móvil se alinea abajo, en desktop al centro
                            className="object-contain object-bottom md:object-center"
                        />
                    </div>

                    {/* Content Overlay - Padding ajustado */}
                    <div className="relative h-full container mx-auto px-6 md:px-16 flex flex-col justify-center z-10">
                        <div className="max-w-2xl space-y-6 md:space-y-8">
                            <h3 className="text-4xl md:text-5xl lg:text-5xl xl:text-7xl font-black text-white leading-[0.9] uppercase tracking-tighter">
                                Solo los mejores <br />
                                <span className="text-alfred-lime">tocan tu vehículo.</span>
                            </h3>

                            <div className="max-w-xl space-y-6 md:space-y-6">
                                <p className="text-white/80 text-base lg:text-lg xl:text-2xl font-medium leading-tight">
                                    Nuestra red elite garantiza que tu vehículo sea intervenido bajo los más altos estándares de tecnología y precisión.
                                </p>

                                <Link
                                    href="/talleres"
                                    className="group inline-flex items-center gap-3 md:gap-4 px-6 md:px-8 py-3 md:py-4 bg-alfred-lime text-alfred-dark hover:scale-105 transition-all rounded-full text-sm md:text-base font-black uppercase tracking-widest shadow-[0_0_40px_rgba(180,251,0,0.4)]"
                                >
                                    <span>Descubrir talleres elite</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Guide light beam (Simulated) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-alfred-lime/20 to-transparent blur-sm pointer-events-none opacity-50" />
        </section>
    );
}
