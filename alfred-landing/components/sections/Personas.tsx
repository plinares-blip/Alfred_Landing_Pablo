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
                <div className="relative max-w-6xl mx-auto min-h-[550px]">
                    {/* Background Glows */}
                    <AnimatePresence>
                        {activeTab === "convenio" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.4 }}
                                exit={{ opacity: 0 }}
                                className="absolute -inset-4 bg-[#ff870e] blur-[100px] pointer-events-none rounded-3xl transition-opacity duration-700 z-0"
                            />
                        )}
                        {activeTab === "particular" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.3 }}
                                exit={{ opacity: 0 }}
                                className="absolute -inset-4 bg-[#0096FB] blur-[100px] pointer-events-none rounded-3xl transition-opacity duration-700 z-0"
                            />
                        )}
                    </AnimatePresence>

                    {/* Fixed Height Main Container with overflow-hidden */}
                    <div className="relative bg-[#0B1226] border border-white/10 rounded-[2rem] min-h-[600px] lg:min-h-[550px] z-10 transition-colors duration-500 shadow-2xl overflow-hidden flex">

                        <AnimatePresence mode="wait">
                            {activeTab === "convenio" ? (
                                <motion.div
                                    key="convenio"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-col md:grid md:grid-cols-2 w-full h-full min-h-[600px] lg:min-h-[550px] absolute inset-0"
                                >
                                    {/* Left Column (Text & Action) - Centered */}
                                    <div className="flex flex-col justify-center space-y-6 pt-10 px-8 pb-4 md:p-12 lg:p-16 z-20 h-full bg-[#0B1226]/80 md:bg-transparent relative">
                                        <h3 className="text-3xl lg:text-4xl font-bold leading-tight mt-4">
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
                                        <div className="pt-2">
                                            <Button
                                                size="lg"
                                                className="bg-white text-alfred-navy hover:bg-gray-100 font-bold px-8"
                                                onClick={() => document.getElementById('convenios')?.scrollIntoView({ behavior: 'smooth' })}
                                            >
                                                Activar mi convenio
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Right Column (Visuals) - Bottom Bleed */}
                                    <div className="relative w-full h-[300px] md:h-full flex items-end justify-center pt-10 px-6 lg:px-12 z-10 bg-gradient-to-br from-[#0B1226] to-[#151D3A]">
                                        <div className="relative w-full max-w-[320px] aspect-[1/1.6] -mb-[5%] md:-mb-10 transition-transform duration-700 hover:scale-[1.03]">
                                            <Image
                                                src="/images/key-visuals/prime.png"
                                                alt="Alfred para Personas"
                                                fill
                                                className="object-contain object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="particular"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-col md:grid md:grid-cols-2 w-full h-full min-h-[600px] lg:min-h-[550px] absolute inset-0"
                                >
                                    {/* Left Column (Text & Action) - Centered */}
                                    <div className="flex flex-col justify-center space-y-6 pt-10 px-8 pb-4 md:p-12 lg:p-16 z-20 h-full bg-[#0B1226]/80 md:bg-transparent relative">
                                        <h3 className="text-3xl lg:text-4xl font-bold leading-tight mt-4">
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
                                        <div className="pt-2">
                                            {/* Mirror visual weight of the other CTA */}
                                            <Button
                                                size="lg"
                                                className="bg-white text-alfred-navy hover:bg-gray-100 font-bold px-8"
                                                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                                            >
                                                Ver Servicios
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Right Column (Visuals) - Bottom Bleed */}
                                    <div className="relative w-full h-[300px] md:h-full flex items-end justify-center pt-10 px-8 lg:px-12 z-10 bg-gradient-to-br from-[#0B1226] to-[#0A1128]">
                                        {/* Phone UI Graphic anchored strictly to the bottom */}
                                        <div className="relative w-[90%] max-w-[340px] aspect-[1/1.5] -mb-[5%] md:-mb-10 transition-transform duration-700 hover:scale-[1.03]">
                                            <Image
                                                src="/images/key-visuals/servicios.png"
                                                alt="App Alfred Servicios"
                                                fill
                                                className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                                            />
                                        </div>
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
