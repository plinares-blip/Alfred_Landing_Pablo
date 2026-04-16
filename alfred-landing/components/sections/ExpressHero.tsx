"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { DOWNLOAD_LINK } from "@/lib/constants";

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
                <motion.path
                    d="M 100 100 Q 400 300 700 100 T 1000 300"
                    fill="none"
                    stroke="url(#grad)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                />
            </svg>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-alfred-blue rounded-full filter blur-[100px] opacity-40 animate-pulse" />
        </div>
    );
}

export function ExpressHero() {
    return (
        <section className="relative min-h-[80vh] flex flex-col items-center pt-32 pb-12 overflow-hidden bg-[#0B1226]">
            <NetworkBackground />

            <div className="container relative z-10 px-4 flex-1 flex flex-col justify-center w-full">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center w-full">
                    
                    {/* Text Content */}
                    <div className="w-full text-center lg:text-left space-y-8 relative z-30">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tight mb-6">
                                Tu vehículo. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-alfred-green to-alfred-lime drop-shadow-[0_0_30px_rgba(21,235,0,0.3)]">
                                    Resuelto.
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                                Olvídate de los talleres, los trámites y el estrés. Alfred es tu copiloto personal. Tú solo conduce.
                            </p>
                        </div>

                        <div className="flex flex-col items-center lg:items-start gap-8">
                            {/* QR Code Section */}
                            <div className="flex items-center gap-8 group">
                                <div className="relative w-32 h-32 md:w-40 md:h-40 p-2 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(180,251,0,0.1)]">
                                    <Image
                                        src="/images/qr/codigo.webp"
                                        alt="Descarga Alfred"
                                        fill
                                        className="object-contain p-2"
                                        priority
                                    />
                                </div>
                                <div className="flex flex-col justify-center gap-3">
                                    <span className="text-sm md:text-lg text-white font-black uppercase tracking-[0.2em] opacity-80 group-hover:text-alfred-lime transition-colors">
                                        Descárgala en
                                    </span>
                                    <div className="relative w-48 h-12 md:w-56 md:h-16">
                                        <Image
                                            src="/images/qr/tienda.webp"
                                            alt="App Store & Google Play"
                                            fill
                                            className="object-contain object-left"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visual Content */}
                    <div className="relative w-full h-[40vh] lg:h-[60vh] flex items-center justify-center">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[100px] opacity-30 bg-alfred-green/20" />
                        <motion.div
                            className="relative w-full h-full lg:-translate-x-12"
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 50 }}
                        >
                            <Image
                                src="/images/key-visuals/V2kvPersonas.webp"
                                alt="Alfred Personas"
                                fill
                                className="drop-shadow-2xl object-contain"
                                priority
                                unoptimized
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
