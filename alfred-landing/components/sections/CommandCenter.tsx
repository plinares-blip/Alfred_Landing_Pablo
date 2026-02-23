"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    BarChart3,
    ShieldAlert,
    ClipboardCheck,
    MapPin,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
    {
        id: "centralizacion",
        title: "Centralización",
        sub: "Todo en un lugar",
        icon: LayoutDashboard,
        image: "/images/saas_features/centralizacion_radical.jpeg"
    },
    {
        id: "visibilidad",
        title: "Visibilidad",
        sub: "Tableros que hablan claro. Entiende tus costos y la salud de tu flota al instante.",
        icon: BarChart3,
        image: "/images/saas_features/Visibilidad_tiempo_real.jpeg"
    },
    {
        id: "error-humano",
        title: "Sin Errores",
        sub: "Alfred te acuerda. Alertas preventivas antes de que un descuido te cueste.",
        icon: ShieldAlert,
        image: "/images/saas_features/Fin_Error_Humano.jpeg"
    },
    {
        id: "protocolos",
        title: "Protocolos",
        sub: "Inspecciones fotográficas obligatorias desde el celular, notificando novedades al instante.",
        icon: ClipboardCheck,
        image: "/images/saas_features/Protocolos_digitales.jpeg"
    },
    {
        id: "gps",
        title: "GPS",
        sub: "Rastreo satelital integrado. Controla rutas, tiempos y evita desvíos no autorizados.",
        icon: MapPin,
        image: "/images/saas_features/GPS_mode.jpeg"
    }
];

const ITEM_WIDTH = 140;

export function CommandCenter() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }
        const handleResize = () => {
            if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextFeature = () => {
        if (activeIndex < features.length - 1) setActiveIndex(activeIndex + 1);
    };

    const prevFeature = () => {
        if (activeIndex > 0) setActiveIndex(activeIndex - 1);
    };

    // --- CÁLCULOS MATEMÁTICOS ---
    const centerOffset = containerWidth / 2 - ITEM_WIDTH / 2;
    const idealTapeX = centerOffset - (activeIndex * ITEM_WIDTH);
    const totalContentWidth = features.length * ITEM_WIDTH;
    const minScroll = -(totalContentWidth - containerWidth);

    let tapeX = idealTapeX;
    if (tapeX > 0) tapeX = 0;
    if (tapeX < minScroll) tapeX = minScroll;

    const selectorX = (activeIndex * ITEM_WIDTH) + tapeX;

    const isAtStart = activeIndex === 0;
    const isAtEnd = activeIndex === features.length - 1;

    return (
        <section id="soluciones-flota" className="py-24 bg-[#111E3E] relative overflow-hidden">
            <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#B4FB00]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-20 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-7xl font-black text-white leading-tight"
                    >
                        El Sistema Operativo <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                            de tu Flota.
                        </span>
                    </motion.h2>
                    <p className="text-lg md:text-2xl text-white/60 font-medium">
                        Deja de apagar incendios. <span className="text-white">Domina tu operación.</span>
                    </p>
                </div>

                {/* DESKTOP VIEW (Intacto) */}
                <div className="hidden lg:grid lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">
                    <div className="lg:col-span-5 space-y-4">
                        {features.map((feature, idx) => {
                            const isActive = activeIndex === idx;
                            const Icon = feature.icon;
                            return (
                                <button
                                    key={feature.id}
                                    onClick={() => setActiveIndex(idx)}
                                    className={cn(
                                        "w-full text-left p-6 rounded-2xl transition-all duration-500 group relative flex items-center gap-6",
                                        isActive ? "bg-white/5 border border-white/10 shadow-2xl" : "hover:bg-white/5 border border-transparent"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div layoutId="active-bar-desktop" className="absolute left-0 top-4 bottom-4 w-1 bg-[#B4FB00] rounded-r-full shadow-[0_0_15px_#B4FB00]" />
                                    )}
                                    <div className={cn("p-4 rounded-xl transition-all duration-500", isActive ? "bg-[#B4FB00] text-navy" : "bg-white/5 text-gray-500")}>
                                        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className={cn("text-xl font-bold", isActive ? "text-white" : "text-gray-500")}>{feature.title}</h3>
                                        <p className={cn("text-sm font-medium", isActive ? "text-white/60" : "text-gray-600")}>{feature.sub}</p>
                                    </div>
                                    <ChevronRight className={cn("transition-all", isActive ? "text-[#B4FB00] opacity-100" : "opacity-0")} />
                                </button>
                            );
                        })}
                    </div>
                    <div className="lg:col-span-7 relative group mt-8 lg:mt-0">
                        <div className="relative rounded-[2rem] border border-white/10 bg-[#0B1226] p-4 shadow-2xl backdrop-blur-xl aspect-auto">
                            <div className="flex items-center gap-2 mb-4 px-4">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="relative rounded-2xl overflow-hidden border border-white/5 min-h-[450px]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0"
                                    >
                                        <Image src={features[activeIndex].image} alt={features[activeIndex].title} fill className="object-cover" />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                        {/* Desktop Hint */}
                        <div className="hidden lg:block absolute -bottom-6 -right-6 bg-[#0B1226]/90 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-2xl max-w-[220px] z-20">
                            <p className="text-[10px] text-[#B4FB00] uppercase tracking-widest font-bold mb-2">Live Experience</p>
                            <p className="text-xs text-white/80 leading-relaxed italic">
                                "Siente el poder de tener el control absoluto de cada vehículo en tus manos."
                            </p>
                        </div>
                    </div>
                </div>

                {/* ==============================================
                    MOBILE VIEW (FLECHAS VERDES NEÓN)
                   ============================================== */}
                <div className="lg:hidden flex flex-col gap-6 items-center">

                    {/* 1. TEXTO DESCRIPTIVO (Ahora va primero) */}
                    <div className="text-center h-auto min-h-[30px] flex flex-col justify-end mb-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`desc-${activeIndex}`}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Título eliminado. Subtítulo con estilo ORIGINAL restaurado. */}
                                <p className="text-white/60 text-sm font-medium">
                                    {features[activeIndex].sub}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* 2. MOCKUP SAFARI */}
                    <div className="relative w-full aspect-[4/3] rounded-2xl border border-white/10 bg-[#0B1226] p-2 shadow-2xl overflow-hidden">
                        <div className="flex items-center gap-1.5 mb-2 px-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                        </div>
                        <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#111E3E]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={features[activeIndex].image}
                                        alt={features[activeIndex].title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-black/10" />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* 3. CINTA DE CONTROL (Abajo para fácil alcance) */}
                    <div
                        className="relative h-20 w-full bg-[#151517] rounded-xl overflow-hidden select-none border border-white/10"
                        ref={containerRef}
                    >
                        {/* Selector Verde */}
                        <motion.div
                            className="absolute top-2 bottom-2 w-[140px] bg-[#B4FB00] rounded-lg shadow-[0_0_20px_rgba(180,251,0,0.3)] z-10"
                            animate={{ x: selectorX }}
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />

                        {/* Cinta de Íconos */}
                        <motion.div
                            className="absolute top-0 bottom-0 left-0 flex items-center z-20"
                            animate={{ x: tapeX }}
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        >
                            {features.map((feature, idx) => {
                                const isActive = activeIndex === idx;
                                const Icon = feature.icon;

                                return (
                                    <div
                                        key={`mob-tape-${feature.id}`}
                                        onClick={() => setActiveIndex(idx)}
                                        className="flex items-center justify-center h-full cursor-pointer relative"
                                        style={{ width: ITEM_WIDTH }}
                                    >
                                        <div className="flex flex-col items-center justify-center gap-1 transition-all duration-200 z-20">
                                            <Icon
                                                size={20}
                                                strokeWidth={isActive ? 2.5 : 2}
                                                className={cn("transition-colors", isActive ? "text-[#0B1226]" : "text-white/40")}
                                            />
                                            <span className={cn(
                                                "text-[10px] font-black uppercase tracking-wider transition-colors",
                                                isActive ? "text-[#0B1226]" : "text-white/40"
                                            )}>
                                                {feature.title.split(' ')[0]}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>

                        {/* FLECHAS DE NAVEGACIÓN */}
                        <div className={cn("absolute left-0 top-0 bottom-0 z-30 transition-opacity duration-300", isAtStart ? "opacity-0 pointer-events-none" : "opacity-100")}>
                            <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#151517] flex items-center justify-center border-r border-white/5">
                                <button onClick={prevFeature} className="p-2 text-[#B4FB00] active:scale-95 transition-transform">
                                    <ChevronLeft size={24} strokeWidth={2} />
                                </button>
                            </div>
                            <div className="absolute left-12 top-0 bottom-0 w-8 bg-gradient-to-r from-[#151517] to-transparent pointer-events-none" />
                        </div>

                        <div className={cn("absolute right-0 top-0 bottom-0 z-30 transition-opacity duration-300", isAtEnd ? "opacity-0 pointer-events-none" : "opacity-100")}>
                            <div className="absolute right-0 top-0 bottom-0 w-12 bg-[#151517] flex items-center justify-center border-l border-white/5">
                                <button onClick={nextFeature} className="p-2 text-[#B4FB00] active:scale-95 transition-transform">
                                    <ChevronRight size={24} strokeWidth={2} />
                                </button>
                            </div>
                            <div className="absolute right-12 top-0 bottom-0 w-8 bg-gradient-to-l from-[#151517] to-transparent pointer-events-none" />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}