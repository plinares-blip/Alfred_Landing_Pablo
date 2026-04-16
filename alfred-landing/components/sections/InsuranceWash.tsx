"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function InsuranceWash() {
    return (
        <section className="py-24 bg-[#0A0F1A] overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full aspect-square md:aspect-video lg:aspect-square rounded-[3rem] overflow-hidden border border-white/10"
                    >
                         <Image
                            src="/images/services/service_lavado.webp"
                            alt="Lavado Premium Alfred"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-alfred-dark via-transparent to-transparent" />
                    </motion.div>

                    {/* Content Side */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                                Calidad <span className="text-alfred-lime">Premium</span> <br /> para tu Vehículo
                            </h2>
                            <p className="text-white/60 text-lg leading-relaxed">
                                No es solo un lavado, es un spa para tu vehículo. A domicilio, con productos biodegradables, personal capacitado y la garantía Alfred que ya conoces. 
                            </p>
                        </div>

                        <ul className="space-y-4">
                            {[
                                "Lavado exterior e interior detallado",
                                "Shampoo con pH balanceado",
                                "Limpieza de rines y llantas",
                                "Aspirado industrial de alta potencia",
                                "Hidratación de plásticos y gomas"
                            ].map((item, idx) => (
                                <motion.li 
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-center gap-4 text-white/80"
                                >
                                    <div className="w-2 h-2 rounded-full bg-alfred-lime shadow-[0_0_8px_#B4FB00]" />
                                    <span className="text-lg">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
