"use client";

import { motion } from "framer-motion";
import { Download, Car, CalendarCheck } from "lucide-react";

const steps = [
    {
        icon: Download,
        title: "Descarga la App",
        desc: "Baja Alfred gratis desde tu tienda de aplicaciones favorita."
    },
    {
        icon: Car,
        title: "Registra tu Placa",
        desc: "Ingresa los datos de tu vehículo y detectaremos tu convenio ipso facto."
    },
    {
        icon: CalendarCheck,
        title: "Agenda tu Lavado",
        desc: "Elige fecha, hora y lugar. El costo será de $0 para ti."
    }
];

export function InsuranceInstructions() {
    return (
        <section className="py-24 bg-[#0B1226]">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                        ¿Cómo activar <br /> mi beneficio?
                    </h2>
                    <p className="text-white/50 text-lg">
                        Es más simple de lo que crees. Solo necesitas tu celular.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="flex flex-col items-center text-center space-y-6"
                        >
                            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative group">
                                <div className="absolute inset-0 bg-alfred-lime/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <step.icon className="w-10 h-10 text-alfred-lime relative z-10" />
                                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-alfred-navy border border-alfred-lime flex items-center justify-center text-xs font-bold text-alfred-lime">
                                    {idx + 1}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                                <p className="text-white/50 leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
