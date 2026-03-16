"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Calculator, ArrowRight } from "lucide-react"; // Agregamos ArrowRight
import Link from "next/link";

function AnimatedCounter({ value }: { value: number }) {
    const [displayValue, setDisplayValue] = useState(0);
    const motionValue = useMotionValue(0);

    useEffect(() => {
        const controls = animate(motionValue, value, {
            duration: 2.5,
            ease: "easeOut",
            onUpdate: (latest) => {
                setDisplayValue(Math.round(latest));
            }
        });

        return controls.stop;
    }, [value, motionValue]);

    // Format as currency
    const formatted = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(displayValue);

    return (
        <span className="tabular-nums">{formatted}</span>
    );
}

function TaxiMeter() {
    const [baseValue, setBaseValue] = useState(24750000);

    useEffect(() => {
        // Continuously tick up like a taxi meter
        const interval = setInterval(() => {
            setBaseValue(prev => prev + Math.floor(Math.random() * 15000) + 5000);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative group">
            <motion.div
                className="relative bg-alfred-dark/95 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 overflow-hidden shadow-2xl"
                animate={{
                    scale: [1, 1.01, 1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* Thin top accent */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />

                {/* Label */}
                <div className="text-center mb-6">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-rose-500/70">
                        Desperdicio Operativo Estimado
                    </span>
                </div>

                {/* Animated Counter Display */}
                <div className="text-center relative">
                    <div className="font-mono text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter">
                        <AnimatedCounter value={baseValue} />
                    </div>
                    <p className="text-white/20 text-[10px] uppercase tracking-widest mt-4 font-bold">Actualización en tiempo real • COP</p>
                </div>

                {/* Ticker dots animation (Bloomberg style) */}
                <div className="absolute top-4 right-4 flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                </div>
            </motion.div>
        </div>
    );
}

export function ROICalculatorHook() {
    return (
        <section id="roi-calculator" className="py-24 md:py-32 bg-alfred-dark relative overflow-hidden">
            {/* Full-Width Background Trend Line */}
            <div className="absolute inset-0 opacity-45 pointer-events-none z-0">
                <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="trendGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
                            <stop offset="100%" stopColor="#ef4444" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,380 L50,370 L100,375 L150,350 L200,360 L250,330 L300,340 L350,300 L400,310 L450,270 L500,280 L550,230 L600,240 L650,190 L700,200 L750,140 L800,150 L850,90 L900,100 L1000,20"
                        fill="none"
                        stroke="url(#trendGradient)"
                        strokeWidth="4"
                        strokeDasharray="8 8"
                        strokeLinecap="round"
                    />
                    {/* Area under line */}
                    <path
                        d="M0,380 L50,370 L100,375 L150,350 L200,360 L250,330 L300,340 L350,300 L400,310 L450,270 L500,280 L550,230 L600,240 L650,190 L700,200 L750,140 L800,150 L850,90 L900,100 L1000,20 L1000,400 L0,400 Z"
                        fill="url(#trendGradient)"
                        fillOpacity="0.05"
                    />
                </svg>
            </div>

            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-alfred-navy/30 rounded-full blur-[150px]" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* The Hook - Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                            Las matemáticas <span className="text-alfred-lime">no mienten.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
                            Descubre cuánto dinero está perdiendo tu operación ahora mismo.
                            <span className="text-white/80 font-semibold"> Te tomará 30 segundos.</span>
                        </p>
                    </motion.div>

                    {/* The Visual - Floating Card with Taxi Meter */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="flex justify-center mb-12"
                    >
                        <div className="relative">
                            {/* Floating animation container */}
                            <motion.div
                                animate={{
                                    y: [-8, 8, -8],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <TaxiMeter />
                            </motion.div>

                            {/* Decorative elements */}
                            <motion.div
                                className="absolute -top-4 -right-4 w-8 h-8 border-2 border-alfred-lime/30 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute -bottom-4 -left-4 w-6 h-6 border-2 border-red-500/30 rounded-full"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                    </motion.div>

                    {/* The CTA - Solid Fintech Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-center"
                    >
                        <Link href="/roi-calculator">
                            <motion.button
                                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-alfred-lime text-[#111E3E] font-black text-lg md:text-xl uppercase tracking-wide transition-all duration-300 hover:bg-white hover:scale-105"
                                whileTap={{ scale: 0.98 }}
                            >
                                <Calculator className="relative z-10 text-[#111E3E]" size={24} />
                                <span className="relative z-10">Calcular mi Ahorro Real</span>
                                <ArrowRight className="relative z-10 text-[#111E3E]" size={24} />
                            </motion.button>
                        </Link>

                        <p className="mt-6 text-white/40 text-sm">
                            Sin compromiso • Resultados instantáneos • 100% personalizado
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
