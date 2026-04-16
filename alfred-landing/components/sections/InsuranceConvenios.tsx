"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, CheckCircle2 } from "lucide-react";

const INSURERS = [
    {
        id: "mapfre",
        name: "Mapfre",
        logo: "/images/logos/LOGO-MAPFRE.webp",
        mockup: "/images/logos/iphone_mockup_mapfreV3.webp",
        color: "#f8002b",
        description: "Lidera tu camino con seguridad global.",
        benefits: [
            { title: "2 Lavados Gratis", description: "Mensuales, para que tu vehículo siempre esté impecable." },
            { title: "Conductor Elegido", description: "Con copago preferencial ($6,000 COP por trayecto)." },
            { title: "Cambio de Plumillas", description: "1 cambio gratis cada 6 meses." }
        ]
    },
    {
        id: "zurich",
        name: "Zurich",
        logo: "/images/logos/LOGO-ZURICH.webp",
        mockup: "/images/logos/iphone_mockup_zurichV3.webp",
        color: "#2773c4",
        description: "Protección suiza para tu movilidad.",
        benefits: [
            { title: "2 Lavados Gratis", description: "Mensuales, para que tu vehículo siempre esté impecable." },
            { title: "Conductor Profesional", description: "Servicio de conductor completamente gratis." },
            { title: "Latonería y Pintura", description: "10% de descuento en reparaciones de golpes y rayones." }
        ]
    }
];

export function InsuranceConvenios() {
    const [selectedInsurer, setSelectedInsurer] = useState<typeof INSURERS[0] | null>(null);

    return (
        <section className="py-24 bg-[#0E1726] relative overflow-hidden min-h-[700px]">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
                        Tu Seguro <span className="text-alfred-lime">Paga la Cuenta</span>
                    </h2>
                    <p className="text-white/60 text-lg">
                        Alfred activa tus beneficios automáticamente. Toca tu aseguradora para ver tus beneficios exclusivos.
                    </p>
                </div>

                <div className="relative flex items-center justify-center min-h-[500px] overflow-visible">
                    {/* Phones Layout */}
                    <div className="flex justify-center items-center gap-4 md:gap-32 relative z-10 w-full max-w-5xl">
                        {INSURERS.map((insurer, idx) => {
                            const isSelected = selectedInsurer?.id === insurer.id;
                            const isOtherSelected = selectedInsurer && selectedInsurer.id !== insurer.id;

                            return (
                                <motion.div
                                    key={insurer.id}
                                    className="relative cursor-pointer"
                                    onClick={() => setSelectedInsurer(isSelected ? null : insurer)}
                                    animate={{
                                        x: isOtherSelected ? (insurer.id === 'mapfre' ? -500 : 500) : (isSelected ? (insurer.id === 'mapfre' ? -150 : 150) : 0),
                                        opacity: isOtherSelected ? 0 : 1,
                                        scale: isSelected ? 1.1 : 1,
                                    }}
                                    transition={{ type: "spring", stiffness: 80, damping: 25 }}
                                >
                                    {/* Ambient Glow */}
                                    <motion.div
                                        className="absolute -inset-20 rounded-full blur-[100px] opacity-30 pointer-events-none"
                                        style={{ backgroundColor: insurer.color }}
                                        animate={{ opacity: isSelected ? 0.6 : 0.2 }}
                                    />

                                    <div className="relative w-[180px] h-[380px] md:w-[260px] md:h-[540px]">
                                        <Image
                                            src={insurer.mockup}
                                            alt={insurer.name}
                                            fill
                                            className="object-contain drop-shadow-2xl transition-all duration-500"
                                            style={{
                                                filter: isSelected ? `drop-shadow(0 0 40px ${insurer.color}66)` : 'none'
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Benefits Panel Overlay */}
                    <AnimatePresence>
                        {selectedInsurer && (
                            <motion.div
                                initial={{ opacity: 0, x: selectedInsurer.id === 'mapfre' ? 100 : -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: selectedInsurer.id === 'mapfre' ? 50 : -50 }}
                                className={`absolute top-0 w-full md:w-[450px] z-20 ${selectedInsurer.id === 'mapfre' ? 'md:right-0' : 'md:left-0'}`}
                            >
                                <div className="bg-[#0B1226]/90 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="h-10 relative w-32">
                                            <Image src={selectedInsurer.logo} alt={selectedInsurer.name} fill className="object-contain" />
                                        </div>
                                        <button onClick={() => setSelectedInsurer(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                            <X className="text-white/50" />
                                        </button>
                                    </div>

                                    <h4 className="text-2xl font-black text-white mb-2 uppercase tracking-tight" style={{ color: selectedInsurer.color }}>
                                        {selectedInsurer.name} PRIME
                                    </h4>
                                    <p className="text-white/50 text-sm mb-8">{selectedInsurer.description}</p>

                                    <div className="space-y-6">
                                        {selectedInsurer.benefits.map((benefit, bIdx) => (
                                            <div key={bIdx} className="flex gap-4">
                                                <div className="h-[2px] w-12 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: selectedInsurer.color }} />
                                                <div>
                                                    <p className="text-white font-bold leading-tight">{benefit.title}</p>
                                                    <p className="text-white/40 text-sm">{benefit.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
