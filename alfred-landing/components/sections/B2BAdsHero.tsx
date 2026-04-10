"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function B2BAdsHero() {
    return (
        <section className="relative min-h-[80vh] xl:h-screen flex flex-col items-center pt-24 lg:pt-32 pb-16 overflow-hidden bg-[#0B1226] text-white overflow-x-hidden w-full">
            
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-alfred-blue rounded-full filter blur-[120px] opacity-30 animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-alfred-sky rounded-full filter blur-[100px] opacity-20" />
            </div>

            {/* Removed the absolute Logo block because Navbar handles it */}

            <div className="container relative z-10 px-4 flex-1 flex flex-col justify-center w-full">
              <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-10 items-center w-full">
                {/* TEXT CONTENT */}
                <div className="w-full lg:col-span-5 text-center lg:text-left space-y-4 lg:space-y-6 relative z-30 order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl 2xl:text-6xl font-black leading-[1.1] tracking-tight mb-3 lg:mb-4">
                            El software de flotas que reemplaza Excel y garantiza tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-alfred-sky to-alfred-blue drop-shadow-[0_0_30px_rgba(0,117,197,0.3)]">PESV.</span>
                        </h1>
                        <p className="text-base sm:text-lg lg:text-base xl:text-lg text-white/60 font-light leading-relaxed max-w-lg mx-auto lg:mx-0 mb-4 lg:mb-6">
                            Deja de reaccionar a los problemas. Centraliza mantenimientos, controla gastos en tiempo real y automatiza las inspecciones preoperacionales para cumplir con la normativa sin dolores de cabeza. Vuelve a tener el control.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center lg:justify-start">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                                <Button 
                                    size="lg" 
                                    onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
                                    className="w-full sm:w-auto h-16 px-10 text-xl font-bold rounded-full shadow-[0_0_40px_rgba(0,150,251,0.4)] hover:shadow-[0_0_60px_rgba(0,150,251,0.6)] bg-alfred-sky text-white hover:bg-alfred-blue transition-all duration-300"
                                >
                                    Hablar con un Experto
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* VISUAL CONTENT (Video) */}
                <div className="w-full lg:col-span-7 relative flex items-center justify-center order-2 mt-4 lg:mt-0 h-[35vh] lg:h-[38vh] xl:h-[45vh] 2xl:h-[55vh]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[100px] opacity-30 pointer-events-none bg-alfred-sky/20" />
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
                        className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,117,197,0.2)] border border-white/10"
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover rounded-2xl"
                        >
                            <source src="/videos/kv-flotas.webm" type="video/webm" />
                            <source src="/videos/kv-flotas.mp4" type="video/mp4" />
                        </video>
                    </motion.div>
                </div>
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
            >
                <div className="text-xs tracking-[0.3em] uppercase mb-2">Explora</div>
                <ChevronDown size={24} className="mx-auto" />
            </motion.div>
        </section>
    );
}
