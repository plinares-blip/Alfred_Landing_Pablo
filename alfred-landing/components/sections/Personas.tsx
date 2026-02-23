"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import Image from "next/image";

export function Personas() {
    const [activeTab, setActiveTab] = useState<"convenio" | "particular">("convenio");

    return (
        <section id="personas" className="py-10 lg:py-12 xl:py-16 bg-alfred-dark/50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-alfred-lime/5 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-10 xl:mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Alfred fue diseñado para <span className="text-alfred-lime">Personas</span>
                    </h2>
                    <p className="text-white/60 text-lg">
                        Si tienes un convenio, lo activamos. Si no, lo solucionamos.
                        Tu eliges cómo quieres vivir la experiencia.
                    </p>
                </div>

                {/* Custom Toggle */}
                {/* Custom Toggle Corregido */}
                <div className="flex justify-center mb-10 xl:mb-16">
                    <div className="relative grid grid-cols-2 bg-white/5 p-1 rounded-full w-[310px] md:w-[400px]">
                        <div
                            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-alfred-lime transition-all duration-300 ${activeTab === "convenio" ? "left-1" : "left-[calc(50%+2px)]"
                                }`}
                        />
                        <button
                            onClick={() => setActiveTab("convenio")}
                            className={`relative z-10 w-full py-3 rounded-full text-sm md:text-base font-bold transition-colors ${activeTab === "convenio" ? "text-alfred-navy" : "text-white hover:text-white/80"
                                }`}
                        >
                            Tengo Convenio
                        </button>
                        <button
                            onClick={() => setActiveTab("particular")}
                            className={`relative z-10 w-full py-3 rounded-full text-sm md:text-base font-bold transition-colors ${activeTab === "particular" ? "text-alfred-navy" : "text-white hover:text-white/80"
                                }`}
                        >
                            Soy Particular
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="relative max-w-6xl mx-auto min-h-[500px] lg:min-h-[500px]">
                    {/* Orange Glow Behind Convenio */}
                    <AnimatePresence>
                        {activeTab === "convenio" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.4 }}
                                exit={{ opacity: 0 }}
                                className="absolute -inset-4 bg-[#ff870e] blur-[100px] pointer-events-none rounded-3xl transition-opacity duration-700 z-0"
                            />
                        )}
                    </AnimatePresence>

                    <div className="relative bg-[#0B1226] border border-white/10 rounded-3xl p-6 lg:p-8 min-h-[400px] lg:min-h-[350px] z-10 transition-colors duration-500 shadow-2xl">
                        <AnimatePresence mode="wait">
                            {activeTab === "convenio" ? (
                                <motion.div
                                    key="convenio"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid md:grid-cols-2 gap-12 items-center"
                                >
                                    <div className="space-y-6">
                                        <h3 className="text-3xl font-bold leading-tight mt-4">
                                            Usa lo que ya tienes. <br /> Sin llamadas, sin estrés.
                                        </h3>
                                        <p className="text-white/70 text-lg">
                                            Alfred se conecta con tu aseguradora, banco o empresa para que uses tus asistencias (conductor elegido, grúa, mantenimientos) desde tu celular.
                                        </p>
                                        <ul className="space-y-4">
                                            {["Aseguradoras (Mapfre, Zurich...)", "Bancos y Financieras", "Beneficios Corporativos"].map((item) => (
                                                <li key={item} className="flex items-start gap-4 text-white/80">
                                                    <div className="mt-2.5 w-6 h-[2px] bg-[#B4FB00] flex-shrink-0 shadow-[0_0_8px_#B4FB00]" />
                                                    <span className="text-[17px] font-medium leading-snug">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Button
                                            size="lg"
                                            className="bg-white text-alfred-navy hover:bg-gray-100 mt-4 font-bold"
                                            onClick={() => document.getElementById('convenios')?.scrollIntoView({ behavior: 'smooth' })}
                                        >
                                            Activar mi convenio
                                        </Button>
                                    </div>
                                    <div className="relative h-64 md:h-full rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden bg-alfred-dark/50">
                                        <div className="absolute inset-0 bg-gradient-to-br from-alfred-navy/50 to-alfred-dark/80 z-0" />
                                        <Image
                                            src="/images/key-visuals/prime.png"
                                            alt="Alfred para Personas"
                                            fill
                                            className="object-contain p-4 md:p-8 z-10 hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="particular"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid md:grid-cols-2 gap-12 items-center"
                                >
                                    <div className="space-y-6">
                                        <h3 className="text-3xl font-bold leading-tight mt-4">
                                            Alfred te lo soluciona. <br /> Transparente y rápido.
                                        </h3>
                                        <p className="text-white/70 text-lg">
                                            ¿No tienes convenio? No importa. Accede a nuestra red de talleres y servicios certificados con precios justos y garantía Alfred.
                                        </p>
                                        <ul className="space-y-4">
                                            {["Historial digital de tu vehículo", "Coordinación de trámites (RTM)", "Talleres verificados 5 estrellas"].map((item) => (
                                                <li key={item} className="flex items-start gap-4 text-white/80">
                                                    <div className="mt-2.5 w-6 h-[2px] bg-[#B4FB00] flex-shrink-0 shadow-[0_0_8px_#B4FB00]" />
                                                    <span className="text-[17px] font-medium leading-snug">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Button
                                            size="lg"
                                            className="bg-alfred-sky text-white hover:bg-alfred-blue mt-4 font-bold"
                                            onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                                        >
                                            Ver Servicios
                                        </Button>
                                    </div>
                                    <div className="relative w-full aspect-[4/5] rounded-2xl border border-white/10 overflow-hidden group bg-alfred-dark">
                                        <Image
                                            src="/images/key-visuals/servicios.png"
                                            alt="App Alfred Interface"
                                            fill
                                            /* pt-8 px-8: Genera el "aire" SOLO arriba y a los lados.
                                               pb-0: Fuerza a que NO haya espacio abajo, pegando el celular al borde.
                                               object-cover object-top: Mantiene el foco arriba.
                                            */
                                            className="object-cover object-top pt-8 px-8 pb-0 z-10 transition-transform duration-700 group-hover:scale-105"
                                        />

                                        {/* Sombra interna */}
                                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none z-20" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div >
        </section >
    );
}
