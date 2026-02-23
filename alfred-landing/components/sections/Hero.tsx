"use client";



import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";

import { ArrowRight, ChevronDown } from "lucide-react";

import Link from "next/link";

import Image from "next/image";



function NetworkBackground() {

    return (

        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">

            <svg className="w-full h-full">

                <defs>

                    <radialGradient id="grad" cx="50%" cy="50%" r="50%">

                        <stop offset="0%" stopColor="#0096FB" stopOpacity="0.5" />

                        <stop offset="100%" stopColor="#020D20" stopOpacity="0" />

                    </radialGradient>

                </defs>

                {/* Abstract connection lines */}

                {[...Array(5)].map((_, i) => (

                    <motion.circle

                        key={i}

                        cx={`${20 + i * 15}%`}

                        cy={`${30 + (i % 2) * 20}%`}

                        r="2"

                        fill="#B4FB00"

                        initial={{ opacity: 0.3, scale: 1 }}

                        animate={{

                            opacity: [0.3, 1, 0.3],

                            scale: [1, 1.5, 1],

                        }}

                        transition={{

                            duration: 3 + i,

                            repeat: Infinity,

                            ease: "easeInOut",

                        }}

                    />

                ))}

                <motion.path

                    d="M 100 100 Q 400 300 700 100 T 1000 300"

                    fill="none"

                    stroke="url(#grad)"

                    strokeWidth="2"

                    initial={{ pathLength: 0 }}

                    animate={{ pathLength: 1 }}

                    transition={{ duration: 3, ease: "easeInOut" }}

                />

                <motion.path

                    d="M -100 600 Q 400 300 900 600"

                    fill="none"

                    stroke="#0096FB"

                    strokeWidth="1"

                    opacity="0.3"

                    initial={{ pathLength: 0 }}

                    animate={{ pathLength: 1 }}

                    transition={{ duration: 4, delay: 0.5, ease: "easeInOut" }}

                />

            </svg>

            {/* Glow effects */}

            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-alfred-blue rounded-full filter blur-[100px] opacity-40 animate-pulse" />

            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-alfred-sky rounded-full filter blur-[80px] opacity-20" />

        </div>

    );

}



interface HeroProps {
    mode: "personal" | "business" | "alianzas" | "talleres";
    setMode: (mode: "personal" | "business" | "alianzas" | "talleres") => void;
}



export function Hero({ mode, setMode }: HeroProps) {





    return (

        <section id={mode === "personal" ? "personas" : "empresas"} className="relative min-h-[80vh] flex flex-col items-center justify-center pt-24 lg:pt-28 overflow-hidden bg-[#0B1226] overflow-x-hidden">

            <NetworkBackground />



            {/* Neon Segmented Toggle */}

            <div className="relative z-20 mb-12">

                <div className="relative grid grid-cols-2 bg-alfred-navy/40 backdrop-blur-xl border border-white/10 rounded-full p-1.5 w-[300px] overflow-hidden">

                    <motion.div

                        layoutId="active-pill"

                        className="absolute top-1.5 bottom-1.5 bg-alfred-lime rounded-full shadow-[0_0_20px_rgba(180,251,0,0.3)]"

                        initial={false}

                        animate={{

                            left: mode === "personal" ? "6px" : "calc(50% + 2px)",

                            width: "calc(50% - 8px)"

                        }}

                        transition={{ type: "spring", stiffness: 300, damping: 30 }}

                    />

                    <button

                        onClick={() => setMode("personal")}

                        className={`relative z-10 w-full py-2 text-sm font-bold transition-colors duration-300 whitespace-nowrap ${mode === "personal" ? "text-alfred-navy" : "text-white/60 hover:text-white"

                            }`}

                    >

                        Para Ti

                    </button>

                    <button

                        onClick={() => setMode("business")}

                        className={`relative z-10 w-full py-2 text-sm font-bold transition-colors duration-300 whitespace-nowrap ${mode === "business" ? "text-alfred-navy" : "text-white/60 hover:text-white"

                            }`}

                    >

                        Para Tu Empresa

                    </button>

                </div>

            </div>



            <div className="container relative z-10 px-4">

                <AnimatePresence mode="wait">
                    <motion.div
                        key={mode}
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        // CAMBIO CRÍTICO: Usamos Flex en móvil para controlar mejor el stack, Grid solo en Desktop
                        className="flex flex-col lg:grid lg:grid-cols-2 gap-0 lg:gap-8 xl:gap-12 items-center w-full"
                    >
                        {/* 1. TEXT CONTENT (Order 1 en móvil) */}
                        <div className="w-full text-center lg:text-left space-y-8 relative z-30 pt-4 lg:pt-0 order-1">
                            <div>
                                <h1 className="text-4xl md:text-6xl lg:text-5xl xl:text-6xl font-black text-white leading-[0.9] tracking-tight mb-4 lg:mb-6">
                                    {mode === "personal" ? (
                                        <>
                                            Tu vehículo. <br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-alfred-green to-alfred-lime drop-shadow-[0_0_30px_rgba(21,235,0,0.3)]">
                                                Resuelto.
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            Potencia tu negocio <br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-alfred-sky to-alfred-blue drop-shadow-[0_0_30px_rgba(0,117,197,0.3)]">
                                                con Alfred.
                                            </span>
                                        </>
                                    )}
                                </h1>
                                <p className="text-lg md:text-xl lg:text-lg xl:text-xl text-white/50 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                                    {mode === "personal"
                                        ? "Olvídate de los talleres, los trámites y el estrés. Alfred es tu copiloto personal. Tú solo conduce."
                                        : "Centraliza gastos, mantenimientos y conductores en un solo dashboard inteligente. Operación en Colombia y México."}
                                </p>
                            </div>

                            <div className="relative z-30 flex justify-center lg:justify-start w-full">
                                {mode === "personal" ? (
                                    /* --- Bloque "Para Ti" --- */
                                    <div className="flex flex-col xl:flex-row items-center gap-10 mt-2 w-full xl:w-auto">
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto px-8 sm:px-0">
                                            <Link href="/asistente" className="block w-full">
                                                <Button
                                                    size="lg"
                                                    className="w-full sm:w-auto h-16 px-12 text-xl font-bold rounded-full shadow-2xl transition-all duration-500 bg-alfred-green text-alfred-navy shadow-[0_0_40px_rgba(21,235,0,0.4)] hover:shadow-[0_0_60px_rgba(21,235,0,0.6)] hover:bg-alfred-lime whitespace-nowrap"
                                                >
                                                    Hablar con Alfred
                                                </Button>
                                            </Link>
                                        </motion.div>
                                        {/* QR Section */}
                                        <div className="hidden xl:flex items-center gap-6 cursor-pointer group">
                                            <div className="relative w-24 h-24 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                                                <Image src="/images/qr/codigo.webp" alt="Descarga Alfred" fill className="object-contain p-1" />
                                            </div>
                                            <div className="flex flex-col justify-center h-full gap-3">
                                                <span className="text-sm text-white/90 uppercase tracking-[0.15em] font-black leading-none">Descárgala en</span>
                                                <div className="relative w-40 h-12 opacity-100 transition-transform duration-300 group-hover:translate-x-1">
                                                    <Image src="/images/qr/tienda.png" alt="App Store & Google Play" fill className="object-contain object-left" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    /* --- Bloque "Empresas" --- */
                                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto px-6 sm:px-0">
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                                            <Button
                                                size="lg"
                                                onClick={() => document.getElementById("soluciones-flota")?.scrollIntoView({ behavior: "smooth" })}
                                                className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-12 text-lg sm:text-xl font-bold rounded-full shadow-2xl transition-all duration-500 bg-alfred-sky text-white shadow-[0_0_40px_rgba(0,150,251,0.4)] hover:shadow-[0_0_60px_rgba(0,150,251,0.6)] hover:bg-alfred-blue"
                                            >
                                                Tengo Flota
                                            </Button>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                                            <Link href="/alianzas" className="w-full sm:w-auto block">
                                                <Button
                                                    variant="outline"
                                                    size="lg"
                                                    className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-12 text-lg font-bold rounded-full border-alfred-sky text-alfred-sky hover:bg-alfred-sky/10 hover:text-alfred-blue transition-all"
                                                >
                                                    Busco una Alianza
                                                </Button>
                                            </Link>
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 2. VISUAL CONTENT (Order 2 en móvil) */}
                        <div className={`relative w-full flex items-end justify-center order-2 transition-all duration-500
                            ${mode === "personal"
                                ? "h-[50vh] mt-8 lg:mt-0 lg:h-[45vh] xl:h-[550px]"   // PERSONAL
                                : "h-[55vh] -mt-12 lg:mt-0 lg:h-[45vh] xl:h-[550px]" // EMPRESA
                            }`}
                        >
                            {/* --- GRADIENTE SUPERIOR ELIMINADO --- */}

                            {/* Deep Space Glow (Este sí lo dejamos porque es el brillo de fondo) */}
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[100px] opacity-30 pointer-events-none ${mode === "personal" ? "bg-alfred-green/20" : "bg-alfred-sky/20"}`} />

                            <motion.div
                                className={`relative w-full h-full ${mode === "personal" ? "lg:translate-y-12 lg:-translate-x-16" : ""}`}
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 50 }}
                            >
                                <Image
                                    src={mode === "personal" ? "/images/key-visuals/kvPersonas.png" : "/images/key-visuals/kvEmpresas.png"}
                                    alt={mode === "personal" ? "Alfred Personas" : "Alfred Empresas"}
                                    fill
                                    className={`drop-shadow-2xl ${mode === 'personal' ? 'object-contain object-top' : 'object-contain object-bottom'}`}
                                    priority
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

            </div>



            <motion.div

                animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}

                transition={{ duration: 3, repeat: Infinity }}

                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20"

            >

                <div className="text-xs tracking-[0.3em] uppercase mb-2">Explora</div>

                <ChevronDown size={24} className="mx-auto" />

            </motion.div>

        </section >

    );

}
