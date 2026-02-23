"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { Globe } from "lucide-react";
import { RegionalCoverageMap } from "@/components/sections/RegionalCoverageMap";


// LEVEL 1: IMPACT DATA
const impactMetrics = [
    {
        name: "Coca-Cola FEMSA",
        metric: "$116M+",
        label: "Ahorro promedio anual detectado",
        color: "#e62126",
        logo: "/images/logos/Coca-Cola_Femsa_Logo.png"
    },
    {
        name: "Adama Colombia",
        metric: "40%",
        label: "Reducción de tiempo muerto en talleres",
        color: "#009442",
        logo: "/images/logos/adama_logo.png"
    },
    {
        name: "Reckitt Benckiser",
        metric: "99.8%",
        label: "Disponibilidad operativa garantizada",
        color: "#ed0b80",
        logo: "/images/logos/reckitt_logo.png"
    }
];

// LEVEL 2: TRACK RECORD
const trackRecord = [
    { value: 650, label: "Talleres Aliados Certificados", prefix: "+" },
    { value: 23, label: "Ciudades Cubiertas", prefix: "+" },
    { value: 500, label: "Servicios Gestionados", prefix: "+", suffix: "K" }
];

// STRIP A: CLIENTS
const clientLogos = [
    "/images/logos/alamo_logo.png",
    "/images/logos/arval_logo.png",
    "/images/logos/blindex_logo.png",
    "/images/logos/bravoauto_logo.png",
    "/images/logos/enterprise_logo.png",
    "/images/logos/europcar_logo.png",
    "/images/logos/mareauto_logo.png",
    "/images/logos/messer_logo.png",
    "/images/logos/national_logo.png",
    "/images/logos/precisagro_logo.png",
    "/images/logos/sany_logo.png"
];

// STRIP B: PRESS
const pressLogos = [
    "/images/logos/press/logo_forbes.png",
    "/images/logos/press/logo_larepublica.png",
    "/images/logos/press/logo_valoraanalitik.png",
    "/images/logos/press/logo_elespectador.png",
    "/images/logos/press/logo_losandes.png",
    "/images/logos/press/logo_elcolombiano.png"
];

function Counter({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 50, stiffness: 400 });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [motionValue, isInView, value]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${Math.floor(latest).toLocaleString()}${suffix}`;
            }
        });
    }, [springValue, prefix, suffix]);

    return <span ref={ref} />;
}

// ============================================================
// SUB-COMPONENT 1: IMPACT CARDS (Coca-Cola, Adama, Reckitt)
// ============================================================
export function ImpactCards() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (!carouselRef.current) return;
        const element = carouselRef.current;
        element.style.scrollSnapType = 'none';
        element.style.scrollBehavior = 'auto';
        const start = element.scrollLeft;
        const scrollAmount = window.innerWidth * 0.85;
        const target = direction === 'left' ? start - scrollAmount : start + scrollAmount;
        const distance = target - start;
        const duration = 1000;
        let startTime: number | null = null;

        const easeInOutCubic = (t: number): number => {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            element.scrollLeft = start + (distance * ease);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                element.style.scrollSnapType = 'x mandatory';
                element.style.removeProperty('scroll-behavior');
                checkScroll();
            }
        };

        requestAnimationFrame(animation);
    };

    return (
        <section className="relative pt-20 pb-12 overflow-hidden bg-[#111E3E]">
            <div className="absolute inset-0 bg-[#111E3E]" />
            <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#0A0F1A] to-transparent z-10 opacity-50" />

            <div className="container mx-auto px-4 relative z-20">
                {/* Heading */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight"
                    >
                        Resultados Reales.
                    </motion.h2>
                    <p className="text-white/40 text-sm uppercase tracking-[0.2em] font-bold">
                        Impacto medible en tu operación
                    </p>
                </div>

                {/* Cards */}
                <div className="relative">
                    <div
                        ref={carouselRef}
                        onScroll={checkScroll}
                        className="flex md:grid md:grid-cols-3 overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 lg:gap-8 pb-8 px-4 md:px-0 -mx-4 md:mx-0 [&::-webkit-scrollbar]:hidden"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {impactMetrics.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="min-w-[85vw] md:min-w-0 snap-center bg-alfred-dark/50 backdrop-blur-sm p-6 md:p-10 rounded-3xl transition-all group relative overflow-hidden flex flex-col items-center text-center border border-white/5 hover:border-white/10"
                                style={{ boxShadow: `0 0 40px ${item.color}10` }}
                            >
                                <div
                                    className="absolute inset-0 opacity-[0.08] pointer-events-none group-hover:opacity-[0.15] transition-opacity"
                                    style={{ background: `radial-gradient(circle at center, ${item.color}, transparent 70%)` }}
                                />
                                <div className="relative w-32 h-16 md:w-48 md:h-24 mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                                    <Image src={item.logo} alt={item.name} fill className="object-contain drop-shadow-lg" />
                                </div>
                                <div className="mb-4">
                                    <span className="text-5xl lg:text-7xl font-black tracking-tighter" style={{ color: item.color }}>
                                        {item.metric}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 justify-center mb-2">
                                    <div className="h-[1px] w-8 bg-white/10" />
                                    <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Resultado</span>
                                    <div className="h-[1px] w-8 bg-white/10" />
                                </div>
                                <p className="text-white/80 font-medium text-lg leading-snug max-w-[200px]">{item.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Navigation Controls */}
                    <div className="flex justify-end gap-4 px-4 mt-4 md:hidden">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 transition-all active:scale-95 ${!canScrollLeft ? 'opacity-30 cursor-default' : 'opacity-100 hover:bg-white/20'
                                }`}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 transition-all active:scale-95 ${!canScrollRight ? 'opacity-30 cursor-default' : 'opacity-100 hover:bg-white/20'
                                }`}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================================
// SUB-COMPONENT 2: TRACK RECORD (Talleres, Cobertura, Servicios)
// ============================================================
export function TrackRecord() {
    const [showMap, setShowMap] = useState(false);

    return (
        <section className="relative py-16 md:py-24 overflow-hidden bg-[#111E3E]">
            <div className="container mx-auto px-4 relative z-20">
                <div className="border-t border-white/5 pt-10 md:pt-20">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-4 md:gap-12 text-center items-start md:divide-x divide-white/5">

                        {/* 1. TALLERES */}
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-2 md:mb-4">
                                <Counter value={650} prefix="+" />
                            </span>
                            <span className="text-alfred-lime text-[10px] md:text-sm font-bold uppercase tracking-widest max-w-[120px] md:max-w-none mx-auto leading-tight">
                                Talleres Aliados
                            </span>
                        </div>

                        <div
                            className="flex flex-col items-center justify-center order-last md:order-none col-span-2 md:col-span-1 pt-4 md:pt-0 group/flags"
                        >

                            <div className="flex items-center gap-6 md:gap-12 mb-8 md:mb-10 transform scale-75 md:scale-100 origin-center">
                                {/* Tech-Accent COL Flag */}
                                <div className="relative group/col">
                                    <svg width="105" height="70" viewBox="0 0 42 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="border border-alfred-lime/30 rounded-sm shadow-[0_0_20px_rgba(180,251,0,0.1)] transition-all duration-500 group-hover/flags:scale-110 group-hover/flags:shadow-[0_0_30px_rgba(180,251,0,0.3)]">
                                        <rect width="42" height="14" fill="#FFCD00" />
                                        <rect y="14" width="42" height="7" fill="#003087" />
                                        <rect y="21" width="42" height="7" fill="#C8102E" />
                                    </svg>
                                    <div className="absolute inset-0 bg-black/40 group-hover/flags:bg-transparent transition-colors duration-500 rounded-sm" />
                                </div>

                                <div className="w-[1px] h-10 md:h-14 bg-white/10" />

                                {/* Tech-Accent MEX Flag */}
                                <div className="relative group/mex">
                                    <svg width="105" height="70" viewBox="0 0 42 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="border border-alfred-lime/30 rounded-sm shadow-[0_0_20px_rgba(180,251,0,0.1)] transition-all duration-500 group-hover/flags:scale-110 group-hover/flags:shadow-[0_0_30px_rgba(180,251,0,0.3)]">
                                        <rect width="14" height="28" fill="#006847" />
                                        <rect x="14" width="14" height="28" fill="#FFFFFF" />
                                        <rect x="28" width="14" height="28" fill="#CE1126" />
                                        <circle cx="21" cy="14" r="2.5" fill="#C09344" />
                                    </svg>
                                    <div className="absolute inset-0 bg-black/40 group-hover/flags:bg-transparent transition-colors duration-500 rounded-sm" />
                                </div>
                            </div>

                            <span className="text-alfred-lime text-[10px] md:text-sm font-bold uppercase tracking-widest mb-6">
                                Cobertura Regional
                            </span>

                            {/* Premium Pill Button Trigger */}
                            <motion.button
                                onClick={() => setShowMap(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="group/btn relative flex items-center gap-3 px-6 py-2.5 rounded-full border border-alfred-lime bg-white/5 shadow-[0_0_15px_rgba(180,251,0,0.2)] transition-all duration-300 hover:bg-alfred-lime/15 hover:shadow-[0_0_25px_rgba(180,251,0,0.4)]"
                            >
                                <span className="text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">
                                    Explorar Mapa 3D
                                </span>
                                <Globe size={14} className="text-alfred-lime group-hover/btn:rotate-12 transition-transform duration-500" />
                            </motion.button>
                        </div>


                        {/* 3. SERVICIOS */}
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-2 md:mb-4">
                                <Counter value={500} prefix="+" suffix="K" />
                            </span>
                            <span className="text-alfred-lime text-[10px] md:text-sm font-bold uppercase tracking-widest max-w-[120px] md:max-w-none mx-auto leading-tight">
                                Servicios Gestionados
                            </span>
                        </div>

                    </div>
                </div>
            </div>

            {/* Regional Coverage Map Modal */}
            <RegionalCoverageMap isOpen={showMap} onClose={() => setShowMap(false)} />
        </section>
    );
}

// ============================================================
// SUB-COMPONENT 3: CLIENT MARQUEE ("Clientes que confían en nosotros")
// ============================================================
export function ClientMarquee() {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <section className="relative py-16 overflow-hidden bg-[#111E3E]">
            <div className="relative">
                <div className="container mx-auto px-4 mb-8">
                    <div className="flex flex-col items-center gap-4">
                        <h3 className="text-center text-white text-sm md:text-base font-black uppercase tracking-[0.5em] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            CLIENTES QUE CONFÍAN EN NOSOTROS
                        </h3>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "160px" }}
                            className="h-[2px] bg-gradient-to-r from-transparent via-alfred-lime to-transparent drop-shadow-[0_0_8px_#B4FB00]"
                        />
                    </div>
                </div>

                {/* Marquee */}
                <div className="relative w-full py-0 my-16 overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#111E3E] via-[#111E3E]/80 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#111E3E] via-[#111E3E]/80 to-transparent z-10 pointer-events-none" />

                    <div className="flex">
                        <div
                            className="flex animate-marquee min-w-full flex-shrink-0 items-center justify-start gap-24 px-12"
                            style={{
                                animationDuration: '80s',
                                animationPlayState: isPaused ? 'paused' : 'running'
                            }}
                        >
                            {[...clientLogos, ...clientLogos].map((logo, i) => (
                                <motion.div
                                    key={i}
                                    onMouseEnter={() => setIsPaused(true)}
                                    onMouseLeave={() => setIsPaused(false)}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        delay: i * 0.4,
                                        ease: "easeInOut"
                                    }}
                                    className="relative w-44 h-18 flex-shrink-0 opacity-30 hover:opacity-100 transition-all duration-200 grayscale hover:grayscale-0 hover:scale-115 cursor-pointer hover:!z-20 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
                                >
                                    <Image src={logo} alt="Client" fill className="object-contain" />
                                </motion.div>
                            ))}
                        </div>
                        <div
                            className="flex animate-marquee min-w-full flex-shrink-0 items-center justify-start gap-24 px-12"
                            aria-hidden="true"
                            style={{
                                animationDuration: '80s',
                                animationPlayState: isPaused ? 'paused' : 'running'
                            }}
                        >
                            {[...clientLogos, ...clientLogos].map((logo, i) => (
                                <motion.div
                                    key={`dup-${i}`}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        delay: i * 0.4,
                                        ease: "easeInOut"
                                    }}
                                    className="relative w-44 h-18 flex-shrink-0 opacity-30 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0 hover:scale-115 cursor-pointer hover:!z-20 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
                                >
                                    <Image src={logo} alt="Client" fill className="object-contain" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================================
// SUB-COMPONENT 4: INDUSTRY RECOGNITION + Powered by Alfred
// ============================================================
export function IndustryRecognition() {
    return (
        <section className="relative py-24 overflow-hidden bg-[#111E3E]">
            <div>
                <div className="container mx-auto px-4 mb-16">
                    <div className="flex flex-col items-center gap-4">
                        <h3 className="text-center text-white text-sm md:text-base font-black uppercase tracking-[0.5em] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            RECONOCIMIENTOS DE INDUSTRIA
                        </h3>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "160px" }}
                            className="h-[2px] bg-gradient-to-r from-transparent via-alfred-lime to-transparent drop-shadow-[0_0_8px_#B4FB00]"
                        />
                    </div>
                </div>

                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10 md:gap-8 items-center justify-items-center max-w-7xl mx-auto px-4">
                        {pressLogos.map((logo, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: i * 0.1 }
                                }}
                                viewport={{ once: true }}
                                whileHover={{
                                    scale: 1.05,
                                    opacity: 1,
                                    transition: { duration: 0.2, delay: 0 }
                                }}
                                className="relative w-16 md:w-32 h-auto opacity-40 grayscale hover:grayscale-0 transition-all duration-200 cursor-pointer flex items-center justify-center"
                            >
                                <img
                                    src={logo}
                                    alt="Press Recognition"
                                    className="w-full h-auto object-contain"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-24 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="inline-flex items-center gap-6 px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
                    >
                        <span className="text-white/40 text-[10px] md:text-sm font-black uppercase tracking-[0.3em]">Powered by</span>
                        <div className="relative w-24 h-8">
                            <Image src="/blanco.png" alt="Alfred Logo" fill className="object-contain" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ============================================================
// ORIGINAL COMBINED COMPONENT (used by "Para Ti" / personal mode)
// ============================================================
interface SocialProofProps {
    mode: "personal" | "business";
}

export function SocialProof({ mode }: SocialProofProps) {
    const [isPaused, setIsPaused] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (!carouselRef.current) return;

        const element = carouselRef.current;

        element.style.scrollSnapType = 'none';
        element.style.scrollBehavior = 'auto';

        const start = element.scrollLeft;
        const scrollAmount = window.innerWidth * 0.85;
        const target = direction === 'left' ? start - scrollAmount : start + scrollAmount;
        const distance = target - start;
        const duration = 1000;
        let startTime: number | null = null;

        const easeInOutCubic = (t: number): number => {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            const ease = easeInOutCubic(progress);

            element.scrollLeft = start + (distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                element.style.scrollSnapType = 'x mandatory';
                element.style.removeProperty('scroll-behavior');
                checkScroll();
            }
        };

        requestAnimationFrame(animation);
    };
    return (
        <section className="relative pt-20 pb-24 overflow-hidden bg-[#111E3E]">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[#111E3E]" />
            <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#0A0F1A] to-transparent z-10 opacity-50" />

            <div className="container mx-auto px-4 relative z-20">

                {/* LEVEL 1: IMPACT (The Hook) */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight"
                    >
                        {mode === "business" ? "Resultados Reales." : "Confianza en cada kilómetro."}
                    </motion.h2>
                    <p className="text-white/40 text-sm uppercase tracking-[0.2em] font-bold">
                        {mode === "business" ? "Impacto medible en tu operación" : "Seguridad y respaldo para lo que más quieres"}
                    </p>
                </div>

                {mode === "business" && (
                    <div className="relative mb-32">
                        {/* Contenedor Carrusel (Con referencia y evento de scroll) */}
                        <div
                            ref={carouselRef}
                            onScroll={checkScroll}
                            className="flex md:grid md:grid-cols-3 overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 lg:gap-8 pb-8 px-4 md:px-0 -mx-4 md:mx-0 [&::-webkit-scrollbar]:hidden"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {impactMetrics.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="min-w-[85vw] md:min-w-0 snap-center bg-alfred-dark/50 backdrop-blur-sm p-6 md:p-10 rounded-3xl transition-all group relative overflow-hidden flex flex-col items-center text-center border border-white/5 hover:border-white/10"
                                    style={{ boxShadow: `0 0 40px ${item.color}10` }}
                                >
                                    <div
                                        className="absolute inset-0 opacity-[0.08] pointer-events-none group-hover:opacity-[0.15] transition-opacity"
                                        style={{ background: `radial-gradient(circle at center, ${item.color}, transparent 70%)` }}
                                    />
                                    <div className="relative w-32 h-16 md:w-48 md:h-24 mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                                        <Image src={item.logo} alt={item.name} fill className="object-contain drop-shadow-lg" />
                                    </div>
                                    <div className="mb-4">
                                        <span className="text-5xl lg:text-7xl font-black tracking-tighter" style={{ color: item.color }}>
                                            {item.metric}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 justify-center mb-2">
                                        <div className="h-[1px] w-8 bg-white/10" />
                                        <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Resultado</span>
                                        <div className="h-[1px] w-8 bg-white/10" />
                                    </div>
                                    <p className="text-white/80 font-medium text-lg leading-snug max-w-[200px]">{item.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* CONTROLES DE NAVEGACIÓN (Solo Móvil - Estilo Apple) */}
                        <div className="flex justify-end gap-4 px-4 mt-4 md:hidden">
                            {/* Flecha Izquierda */}
                            <button
                                onClick={() => scroll('left')}
                                disabled={!canScrollLeft}
                                className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 transition-all active:scale-95 ${!canScrollLeft ? 'opacity-30 cursor-default' : 'opacity-100 hover:bg-white/20'
                                    }`}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>

                            {/* Flecha Derecha */}
                            <button
                                onClick={() => scroll('right')}
                                disabled={!canScrollRight}
                                className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 transition-all active:scale-95 ${!canScrollRight ? 'opacity-30 cursor-default' : 'opacity-100 hover:bg-white/20'
                                    }`}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
                {/* LEVEL 2: TRACK RECORD (Alineación corregida) */}
                <div className={cn("border-t border-white/5 pt-10 md:pt-20 mb-20 md:mb-32", mode === "personal" && "border-t-0 pt-0")}>
                    {/* CAMBIO: items-start 
                        Esto alinea todo por ARRIBA (los números). 
                        Los labels colgarán a la altura que necesiten.
                    */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-4 md:gap-12 text-center items-start md:divide-x divide-white/5">

                        {/* 1. TALLERES */}
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-2 md:mb-4">
                                <Counter value={650} prefix="+" />
                            </span>
                            <span className="text-alfred-lime text-[10px] md:text-sm font-bold uppercase tracking-widest max-w-[120px] md:max-w-none mx-auto leading-tight">
                                Talleres Aliados
                            </span>
                        </div>

                        <div
                            className="flex flex-col items-center justify-center order-last md:order-none col-span-2 md:col-span-1 pt-4 md:pt-0 group/flags"
                        >

                            <div className="flex items-center gap-6 md:gap-12 mb-8 md:mb-10 transform scale-75 md:scale-100 origin-center">
                                {/* Tech-Accent COL Flag */}
                                <div className="relative group/col">
                                    <svg width="105" height="70" viewBox="0 0 42 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="border border-alfred-lime/30 rounded-sm shadow-[0_0_20px_rgba(180,251,0,0.1)] transition-all duration-500 group-hover/flags:scale-110 group-hover/flags:shadow-[0_0_30px_rgba(180,251,0,0.3)]">
                                        <rect width="42" height="14" fill="#FFCD00" />
                                        <rect y="14" width="42" height="7" fill="#003087" />
                                        <rect y="21" width="42" height="7" fill="#C8102E" />
                                    </svg>
                                    <div className="absolute inset-0 bg-black/40 group-hover/flags:bg-transparent transition-colors duration-500 rounded-sm" />
                                </div>

                                <div className="w-[1px] h-10 md:h-14 bg-white/10" />

                                {/* Tech-Accent MEX Flag */}
                                <div className="relative group/mex">
                                    <svg width="105" height="70" viewBox="0 0 42 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="border border-alfred-lime/30 rounded-sm shadow-[0_0_20px_rgba(180,251,0,0.1)] transition-all duration-500 group-hover/flags:scale-110 group-hover/flags:shadow-[0_0_30px_rgba(180,251,0,0.3)]">
                                        <rect width="14" height="28" fill="#006847" />
                                        <rect x="14" width="14" height="28" fill="#FFFFFF" />
                                        <rect x="28" width="14" height="28" fill="#CE1126" />
                                        <circle cx="21" cy="14" r="2.5" fill="#C09344" />
                                    </svg>
                                    <div className="absolute inset-0 bg-black/40 group-hover/flags:bg-transparent transition-colors duration-500 rounded-sm" />
                                </div>
                            </div>

                            <span className="text-alfred-lime text-[10px] md:text-sm font-bold uppercase tracking-widest mb-6">
                                Cobertura Regional
                            </span>

                            {/* Premium Pill Button Trigger */}
                            <motion.button
                                onClick={() => setShowMap(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="group/btn relative flex items-center gap-3 px-6 py-2.5 rounded-full border border-alfred-lime bg-white/5 shadow-[0_0_15px_rgba(180,251,0,0.2)] transition-all duration-300 hover:bg-alfred-lime/15 hover:shadow-[0_0_25px_rgba(180,251,0,0.4)]"
                            >
                                <span className="text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">
                                    Explorar Mapa 3D
                                </span>
                                <Globe size={14} className="text-alfred-lime group-hover/btn:rotate-12 transition-transform duration-500" />
                            </motion.button>
                        </div>


                        {/* 3. SERVICIOS */}
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-2 md:mb-4">
                                <Counter value={500} prefix="+" suffix="K" />
                            </span>
                            <span className="text-alfred-lime text-[10px] md:text-sm font-bold uppercase tracking-widest max-w-[120px] md:max-w-none mx-auto leading-tight">
                                Servicios Gestionados
                            </span>
                        </div>

                    </div>
                </div>

            </div>

            {/* LEVEL 3: RIVER OF TRUST (Marquees/Grids) */}
            <div className="space-y-32">

                {/* Strip A: Corporate Clients (Floating Marquee) - ONLY FOR BUSINESS */}
                {mode === "business" && (
                    <div className="relative">
                        <div className="container mx-auto px-4 mb-8">
                            <div className="flex flex-col items-center gap-4">
                                <h3 className="text-center text-white text-sm md:text-base font-black uppercase tracking-[0.5em] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                    CLIENTES QUE CONFÍAN EN NOSOTROS
                                </h3>
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "160px" }}
                                    className="h-[2px] bg-gradient-to-r from-transparent via-alfred-lime to-transparent drop-shadow-[0_0_8px_#B4FB00]"
                                />
                            </div>
                        </div>

                        {/* Marquee with improved fades and floating effect */}
                        <div
                            className="relative w-full py-0 my-16 overflow-hidden"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#111E3E] via-[#111E3E]/80 to-transparent z-10 pointer-events-none" />
                            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#111E3E] via-[#111E3E]/80 to-transparent z-10 pointer-events-none" />

                            <div className="flex">
                                <div
                                    className="flex animate-marquee min-w-full flex-shrink-0 items-center justify-start gap-24 px-12"
                                    style={{
                                        animationDuration: '80s',
                                        animationPlayState: isPaused ? 'paused' : 'running'
                                    }}
                                >
                                    {[...clientLogos, ...clientLogos].map((logo, i) => (
                                        <motion.div
                                            key={i}
                                            onMouseEnter={() => setIsPaused(true)}
                                            onMouseLeave={() => setIsPaused(false)}
                                            transition={{
                                                duration: 6,
                                                repeat: Infinity,
                                                delay: i * 0.4,
                                                ease: "easeInOut"
                                            }}
                                            className="relative w-44 h-18 flex-shrink-0 opacity-30 hover:opacity-100 transition-all duration-200 grayscale hover:grayscale-0 hover:scale-115 cursor-pointer hover:!z-20 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
                                        >
                                            <Image src={logo} alt="Client" fill className="object-contain" />
                                        </motion.div>
                                    ))}
                                </div>
                                <div
                                    className="flex animate-marquee min-w-full flex-shrink-0 items-center justify-start gap-24 px-12"
                                    aria-hidden="true"
                                    style={{
                                        animationDuration: '80s',
                                        animationPlayState: isPaused ? 'paused' : 'running'
                                    }}
                                >
                                    {[...clientLogos, ...clientLogos].map((logo, i) => (
                                        <motion.div
                                            key={`dup-${i}`}
                                            transition={{
                                                duration: 6,
                                                repeat: Infinity,
                                                delay: i * 0.4,
                                                ease: "easeInOut"
                                            }}
                                            className="relative w-44 h-18 flex-shrink-0 opacity-30 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0 hover:scale-115 cursor-pointer hover:!z-20 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
                                        >
                                            <Image src={logo} alt="Client" fill className="object-contain" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Strip B: Press Grid (Large & Enlightened) */}
                <div>
                    <div className="container mx-auto px-4 mb-16">
                        <div className="flex flex-col items-center gap-4">
                            <h3 className="text-center text-white text-sm md:text-base font-black uppercase tracking-[0.5em] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                RECONOCIMIENTOS DE INDUSTRIA
                            </h3>
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "160px" }}
                                className="h-[2px] bg-gradient-to-r from-transparent via-alfred-lime to-transparent drop-shadow-[0_0_8px_#B4FB00]"
                            />
                        </div>
                    </div>

                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10 md:gap-8 items-center justify-items-center max-w-7xl mx-auto px-4">
                            {pressLogos.map((logo, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        transition: { delay: i * 0.1 }
                                    }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        scale: 1.05,
                                        opacity: 1,
                                        transition: { duration: 0.2, delay: 0 }
                                    }}
                                    className="relative w-16 md:w-32 h-auto opacity-40 grayscale hover:grayscale-0 transition-all duration-200 cursor-pointer flex items-center justify-center"
                                >
                                    <img
                                        src={logo}
                                        alt="Press Recognition"
                                        className="w-full h-auto object-contain"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-24 text-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="inline-flex items-center gap-6 px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
                        >
                            <span className="text-white/40 text-[10px] md:text-sm font-black uppercase tracking-[0.3em]">Powered by</span>
                            <div className="relative w-24 h-8">
                                <Image src="/blanco.png" alt="Alfred Logo" fill className="object-contain" />
                            </div>
                        </motion.div>
                    </div>
                </div>

            </div>

            {/* Regional Coverage Map Modal */}
            <RegionalCoverageMap isOpen={showMap} onClose={() => setShowMap(false)} />
        </section>
    );
}
