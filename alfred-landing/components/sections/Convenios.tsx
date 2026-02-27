"use client";



import { useState, useRef, useEffect } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ChevronDown, CheckCircle2, ShieldCheck, Ticket, Building2, UserCircle2, ArrowRight, X, TrendingUp, BarChart3, Heart, Code2 } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

import NextImage from "next/image";

import { ContactForm } from "@/components/forms/ContactForm";
import { DOWNLOAD_LINK } from "@/lib/constants";


const partners = [
    "MAPFRE", "ZURICH", "ITAÚ", "SURA", "BOLÍVAR", "ALLIANZ", "HDI", "AXA COLPATRIA"
];

const alianzaLogos = [
    "/images/alianzas/LOGO-MAPFRE.png",
    "/images/alianzas/LOGO-ZURICH.png",
    "/images/alianzas/Rappi.png",
    "/images/alianzas/falabella.png",
    "/images/alianzas/itau.png",
    "/images/alianzas/movistar.png"
];



interface Benefit {

    title: string;

    description: string;

}



interface Insurer {

    id: "mapfre" | "zurich";

    name: string;

    logo: string;

    color: string;

    description: string;

    benefits: Benefit[];

}



const INSURERS: Insurer[] = [

    {

        id: "mapfre",

        name: "Mapfre",

        logo: "/images/logos/LOGO-MAPFRE.png",

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

        logo: "/images/logos/LOGO-ZURICH.png",

        color: "#2773c4",

        description: "Protección suiza para tu movilidad.",

        benefits: [

            { title: "2 Lavados Gratis", description: "Mensuales, para que tu vehículo siempre esté impecable." },

            { title: "Conductor Profesional", description: "Servicio de conductor completamente gratis." },

            { title: "Latonería y Pintura", description: "10% de descuento en reparaciones de golpes y rayones." }

        ]

    }

];



// Custom Car Key SVG Icon
const CarKeyLogo = ({ color, size = 24 }: { color: string; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C9.5 2 7.5 4 7.5 6.5V11H6V15C6 16.7 7.3 18 9 18H9.5V21C9.5 21.6 9.9 22 10.5 22H13.5C14.1 22 14.5 21.6 14.5 21V18H15C16.7 18 18 16.7 18 15V11H16.5V6.5C16.5 4 14.5 2 12 2ZM14.5 9.5H9.5V6.5C9.5 5.1 10.6 4 12 4C13.4 4 14.5 5.1 14.5 6.5V9.5Z" fill={color} />
        <circle cx="12" cy="14" r="1.5" fill="#0B1226" />
        <rect x="11" y="22" width="2" height="2" fill={color} />
    </svg>
);

// Vehicle Focused Icons for steps
const StepIcons = {
    Register: ({ color }: { color: string }) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <polyline points="16 11 18 13 22 9" />
        </svg>
    ),
    Garage: ({ color }: { color: string }) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <path d="M9 22V12h6v10" />
            <path d="M12 15h.01" />
        </svg>
    ),
    Activation: ({ color }: { color: string }) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <circle cx="12" cy="16" r="1" />
        </svg>
    ),
    Selection: ({ color }: { color: string }) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8l4 4-4 4M8 12h8" />
        </svg>
    ),
    Validation: ({ color }: { color: string }) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
};

// Atmospheric Background Mesh for B2B

function NetworkMesh() {

    return (

        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">

            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">

                <defs>

                    <radialGradient id="meshGradient" cx="50%" cy="50%" r="50%">

                        <stop offset="0%" stopColor="#B4FB00" stopOpacity="0.2" />

                        <stop offset="100%" stopColor="#111E3E" stopOpacity="0" />

                    </radialGradient>

                </defs>

                <motion.circle

                    cx="20" cy="30" r="0.5" fill="#B4FB00"

                    animate={{ x: [0, 5, 0], y: [0, -5, 0], opacity: [0.2, 0.5, 0.2] }}

                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}

                />

                <motion.circle

                    cx="80" cy="70" r="0.5" fill="#0096FB"

                    animate={{ x: [0, -8, 0], y: [0, 5, 0], opacity: [0.1, 0.4, 0.1] }}

                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}

                />

                <motion.path

                    d="M20 30 L80 70" stroke="white" strokeWidth="0.05" strokeOpacity="0.1"

                    animate={{ strokeOpacity: [0.05, 0.2, 0.05] }}

                    transition={{ duration: 10, repeat: Infinity }}

                />

            </svg>

        </div>

    );

}



// B2B Connection Diagram Component

// B2B Connection Diagram Component
function ConnectionDiagram() {
    return (
        <div className="relative w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-0 px-4 lg:px-20 mb-16 lg:mb-20 xl:mb-32">

            {/* Mobile Connector Line (Vertical) - Solo visible en móvil */}
            <div className="absolute top-40 bottom-40 left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-alfred-lime/50 to-transparent lg:hidden" />
            {/* Enterprise Node */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="relative z-10 flex flex-col items-center gap-4 group"
            >
                <div className="w-32 h-32 md:w-44 md:h-44 lg:w-[200px] lg:h-[200px] xl:w-[285px] xl:h-[285px] flex items-center justify-center transition-all duration-500 relative bg-[#0B1226] rounded-full lg:bg-transparent">
                    <NextImage
                        src="/images/convenios/empresa.png"
                        alt="Tu Empresa"
                        fill
                        className="object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 p-2"
                    />
                </div>
                <span className="text-white/40 font-bold uppercase tracking-widest text-xs lg:text-xs">TU EMPRESA</span>
            </motion.div>

            {/* SVG Lines & Pulses (Desktop Only) - Oculto en móvil */}
            <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 1000 400" fill="none">
                    {/* Background paths */}
                    <path d="M250 200 L450 200" stroke="white" strokeWidth="2" strokeOpacity="0.05" />
                    <path d="M550 200 L750 200" stroke="white" strokeWidth="2" strokeOpacity="0.05" />

                    {/* Glowing Pulse Lines */}
                    <motion.path
                        d="M250 200 L450 200"
                        stroke="#B4FB00"
                        strokeWidth="3"
                        strokeDasharray="20, 180"
                        animate={{ strokeDashoffset: [0, -200] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="filter blur-[1px]"
                    />
                    <motion.path
                        d="M550 200 L750 200"
                        stroke="#B4FB00"
                        strokeWidth="3"
                        strokeDasharray="20, 180"
                        animate={{ strokeDashoffset: [0, -200] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                        className="filter blur-[1px]"
                    />
                </svg>
            </div>

            {/* Middle Node - Alfred Bridge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative z-20 flex flex-col items-center gap-6 bg-[#0B1226] py-4 lg:py-0" // Fondo oscuro para tapar la línea vertical en móvil
            >
                <div className="w-24 h-24 lg:w-40 lg:h-40 rounded-full bg-alfred-navy border-2 border-alfred-lime flex items-center justify-center shadow-[0_0_60px_rgba(180,251,0,0.4)] relative">
                    {/* Outer pulse */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border-2 border-alfred-lime"
                    />
                    <NextImage
                        src="/blanco.png"
                        alt="Alfred"
                        width={80}
                        height={80}
                        className="object-contain w-12 h-12 lg:w-20 lg:h-20"
                    />
                </div>
                <span className="text-alfred-lime font-black uppercase tracking-[0.2em] text-xs text-center px-4">ECOSISTEMA ALFRED</span>
            </motion.div>

            {/* Result Node */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="relative z-10 flex flex-col items-center gap-4 group"
            >
                <div className="w-32 h-32 md:w-44 md:h-44 lg:w-[200px] lg:h-[200px] xl:w-[285px] xl:h-[285px] flex items-center justify-center transition-all duration-500 relative bg-[#0B1226] rounded-full lg:bg-transparent">
                    {/* Explosive glow effect */}
                    <motion.div
                        animate={{ opacity: [0, 0.25, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        className="absolute inset-0 bg-radial-gradient from-alfred-lime to-transparent"
                    />
                    <NextImage
                        src="/images/convenios/cliente.png"
                        alt="Cliente Final"
                        fill
                        className="object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 p-2"
                    />
                </div>
                <span className="text-white/40 font-bold uppercase tracking-widest text-xs lg:text-xs text-center">CLIENTE FINAL</span>
            </motion.div>
        </div>
    );
}



interface ConveniosProps {

    mode: "personal" | "business";

}



// Extracted Sub-component to safely handle Framer Motion hooks

function BusinessView() {

    const manifestoRef = useRef<HTMLDivElement>(null);

    const [isHovered, setIsHovered] = useState(false);



    // Hooks only run when this component is mounted

    const { scrollYProgress } = useScroll({

        target: manifestoRef,

        offset: ["start end", "end start"]

    });

    const parallaxX = useTransform(scrollYProgress, [0, 1], [100, -100]);



    return (

        <div className="flex flex-col items-center">

            {/* Massive Typography Architecture */}

            <div className="container mx-auto px-4 text-center mb-16 lg:mb-24 mt-12 lg:mt-0">

                <motion.h2

                    initial={{ opacity: 0, y: 30 }}

                    whileInView={{ opacity: 1, y: 0 }}

                    className="text-[7.5vw] md:text-7xl lg:text-7xl xl:text-[100px] 2xl:text-[120px] font-black text-white leading-[0.95] uppercase tracking-tighter font-gotham flex flex-col items-center"

                >

                    <span className="whitespace-nowrap">Dale a tus</span>

                    <span className="whitespace-nowrap">clientes el</span>

                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-alfred-lime to-[#B4FB00] drop-shadow-[0_0_30px_rgba(180,251,0,0.5)] animate-pulse whitespace-nowrap py-1">

                        superpoder

                    </span>

                    <span className="whitespace-nowrap">que les falta</span>

                </motion.h2>

            </div>



            {/* Visual Metaphor Flow */}

            <div id="ecosistema" className="w-full">

                <ConnectionDiagram />

            </div>



            {/* Kinetic Value Panels (Standardized Symmetrical Layout) */}

            <div className="w-full px-6 lg:px-12 mb-24 lg:mb-32">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-12 min-h-[500px] md:h-[600px] lg:h-[500px] xl:h-[800px]">

                    {[

                        {

                            title: "Fidelización Activa",

                            body: "Tu marca en el bolsillo del conductor 24/7. Convierte un servicio puntual en una relación diaria.",

                            image: "/images/convenios/fidelizacion_panel.png",

                            color: "magenta-500",

                            accentHex: "#d946ef",

                            icon: Heart

                        },

                        {

                            title: "Data Enriching",

                            body: "Conoce el vehículo de tu cliente mejor que él mismo. Kilometraje, SOAT, mantenimientos y hábitos.",

                            image: "/images/convenios/data_panel.png",

                            color: "alfred-lime",

                            accentHex: "#B4FB00",

                            icon: BarChart3

                        },

                        {

                            title: "Nuevos Ingresos",

                            body: "Monetiza la post-venta automotriz sin mover un dedo. Comisiones por servicios que ya necesitan.",

                            image: "/images/convenios/ingresos_panel.png",

                            color: "blue-400",

                            accentHex: "#60a5fa",

                            icon: TrendingUp

                        }

                    ].map((panel, idx) => (

                        <motion.div

                            key={idx}

                            initial={{ opacity: 0, y: 30 }}

                            whileInView={{ opacity: 1, y: 0 }}

                            transition={{ delay: idx * 0.1, duration: 0.8 }}

                            className="group relative overflow-hidden rounded-[32px] h-full flex flex-col"

                        >

                            {/* Full-bleed background imagery */}

                            <div className="absolute inset-0 z-0">

                                <NextImage

                                    src={panel.image}

                                    alt={panel.title}

                                    fill

                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"

                                />

                                {/* Immersive dark gradient overlay */}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                            </div>



                            {/* Content Overlay - Tightened Padding */}

                            <div className="relative z-10 mt-auto p-6 lg:p-8 2xl:p-10 flex flex-col items-start gap-3">

                                <div className="space-y-3 w-full">

                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight font-gotham">

                                        {panel.title}

                                    </h3>

                                    <p className="text-white/80 text-sm lg:text-base leading-relaxed font-gotham">

                                        {panel.body}

                                    </p>

                                </div>

                            </div>

                        </motion.div>

                    ))}

                </div>

            </div>



            {/* Kinetic Manifesto Section - FLOATING MODE */}

            <div

                ref={manifestoRef}

                className="relative w-full h-auto overflow-hidden cursor-default group/manifesto"

            >

                <div className="flex flex-col gap-2 md:gap-3 relative z-10">

                    {/* Strip 1: Context (FIXED, NO SCROLL PARALLAX) */}

                    <div className="w-full flex justify-center py-2">

                        <div

                            className="w-full text-center"

                            onMouseEnter={() => setIsHovered(true)}

                            onMouseLeave={() => setIsHovered(false)}

                        >

                            <span

                                className="text-[2.2vw] font-black uppercase tracking-tighter transition-all duration-300 inline-block whitespace-nowrap"

                                style={{

                                    WebkitTextStroke: isHovered ? "1.5px rgba(255,255,255,1)" : "1.5px rgba(255,255,255,0.4)",

                                    color: isHovered ? "white" : "transparent",

                                    fontFamily: "var(--font-gotham), sans-serif",

                                }}

                            >

                                TU MARCA DA PAZ • NOSOTROS PONEMOS LA TECNOLOGÍA • LA RED • LA OPERACIÓN •

                            </span>

                        </div>

                    </div>



                    {/* Strip 2: Punchline (FIXED SNAPPING: Nested Parallax & Loop) */}

                    <div className="w-full overflow-hidden mb-16 lg:mb-20 xl:mb-32 border-none">

                        <motion.div

                            style={{ x: parallaxX }}

                            className="w-full border-none"

                        >

                            <motion.div

                                animate={{ x: ["0%", "-50%"] }}

                                transition={{

                                    duration: 15,

                                    repeat: Infinity,

                                    ease: "linear"

                                }}

                                className="flex whitespace-nowrap gap-0 border-none"

                            >

                                {[...Array(2)].map((_, segment) => (

                                    <div key={segment} className="flex flex-none items-center gap-16 pr-16 whitespace-nowrap border-none">

                                        {[...Array(4)].map((_, i) => (

                                            <span

                                                key={i}

                                                className="text-5xl md:text-7xl lg:text-5xl xl:text-[90px] font-black uppercase tracking-tighter text-white"

                                                style={{ fontFamily: "var(--font-gotham), sans-serif" }}

                                            >

                                                TÚ TE LLEVAS LA <span className="text-[#B4FB00]">LEALTAD</span> •

                                            </span>

                                        ))}

                                    </div>

                                ))}

                            </motion.div>

                        </motion.div>

                    </div>

                </div>



            </div>



            {/* Alianza Logos Secton - Centered appropriately */}
            <div className="w-full pb-16 bg-[#0B1226]">
                <div className="container mx-auto px-4 mb-16">
                    <div className="flex flex-col items-center gap-4">
                        <h3 className="text-center text-white text-sm md:text-base font-black uppercase tracking-[0.5em] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            NUESTROS ALIADOS ESTRATÉGICOS
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
                        {alianzaLogos.map((logo, i) => (
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
                                className="relative w-16 md:w-32 h-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-200 cursor-pointer flex items-center justify-center p-2"
                            >
                                <NextImage
                                    src={logo}
                                    alt="Alianza Logo"
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 64px, 128px"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>



            {/* Precise Section Transition - Blurred Gradient Shift exactly between texts */}

            {/* STARTS from #0B1226 (Main Page BG) to eliminate "box" effect */}

            <div className="w-full h-40 lg:h-64 bg-gradient-to-b from-[#0B1226] to-[#152044] border-none" />



            {/* CTA Section (Lighter Background for Separation) */}

            <div id="contacto-alianza" className="w-full bg-[#152044]">

                <div className="container mx-auto px-4 pb-12 lg:pb-16 pt-0">

                    <div className="max-w-4xl mx-auto text-center">

                        <motion.h3

                            initial={{ opacity: 0, y: 20 }}

                            whileInView={{ opacity: 1, y: 0 }}

                            className="text-5xl lg:text-5xl xl:text-[64px] font-black text-white mb-6 leading-tight uppercase tracking-tighter"

                            style={{ fontFamily: "var(--font-gotham), sans-serif" }}

                        >

                            Diseñemos tu Alianza

                        </motion.h3>

                        <motion.p

                            initial={{ opacity: 0, y: 20 }}

                            whileInView={{ opacity: 1, y: 0 }}

                            transition={{ delay: 0.1 }}

                            className="text-xl lg:text-2xl text-[#8E9BB4] mb-16"

                        >

                            Hablemos de integración, revenue share y valor agregado para tus usuarios.

                        </motion.p>



                        <div className="w-full">

                            <ContactForm source="Alianzas" />

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}



export function Convenios({ mode }: ConveniosProps) {



    const [selectedInsurer, setSelectedInsurer] = useState<Insurer | null>(null);

    const [showModal, setShowModal] = useState(false);

    // Hooks hoisted to BusinessView

    // --- ESTO ES NECESARIO ---
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Freeze body scroll when modal is open
    useEffect(() => {
        if (showModal) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        // Cleanup in case component unmounts while modal is open
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [showModal]);


    return (

        <section id="convenios" className={`relative overflow-hidden transition-colors duration-1000 ${mode === "business" ? "bg-[#0B1226] pt-16 lg:pt-32 pb-0" : "bg-alfred-dark border-y border-white/5 py-16 lg:py-16 xl:py-20"} z-20`}>



            {mode === "business" && <NetworkMesh />}



            <div className="relative z-10 w-full">

                {mode === "personal" ? (

                    <>

                        {/* Section Header - Centered */}

                        <div className="container mx-auto px-4 text-center max-w-4xl mb-12">

                            <motion.h2

                                initial={{ opacity: 0, y: 20 }}

                                whileInView={{ opacity: 1, y: 0 }}

                                className="text-3xl md:text-5xl lg:text-4xl xl:text-5xl font-black text-white mb-4"

                            >

                                Tu seguro paga la cuenta.

                            </motion.h2>

                            <motion.p

                                initial={{ opacity: 0, y: 20 }}

                                whileInView={{ opacity: 1, y: 0 }}

                                transition={{ delay: 0.1 }}

                                className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto"

                            >

                                Alfred activa tus beneficios automáticamente. No pagues de más por servicios que ya tienes incluidos en tu póliza.

                            </motion.p>

                        </div>



                        {/* INFINITE STAGE - No clipping, glow bleeds into background */}

                        <div className="w-full max-w-7xl mx-auto relative overflow-visible">



                            {/* Massive Ambient Glow - Behind everything */}

                            <AnimatePresence>

                                {selectedInsurer && (

                                    <motion.div

                                        initial={{ opacity: 0, scale: 0.8 }}

                                        animate={{ opacity: 1, scale: 1 }}

                                        exit={{ opacity: 0, scale: 0.8 }}

                                        className="absolute inset-0 pointer-events-none z-0"

                                    >

                                        <div

                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] blur-[200px] opacity-40"

                                            style={{ backgroundColor: selectedInsurer.color }}

                                        />

                                    </motion.div>

                                )}

                            </AnimatePresence>



                            {/* Main Layout Container */}

                            <div className="relative flex items-start justify-center gap-8 md:gap-16 min-h-[420px] md:min-h-[480px] lg:min-h-[350px] xl:min-h-[450px] overflow-visible">



                                {/* Phones Wrapper */}

                                <motion.div
                                    className="flex justify-center items-center gap-3 md:items-start md:gap-28 relative z-10"

                                    // 1. ANIMATE: Controlamos Movimiento y Desaparición
                                    animate={{
                                        // --- LÓGICA DE MOVIMIENTO (Aquí está lo de escritorio) ---
                                        // Traducción: "Si NO es móvil (!isMobile) Y hay un seguro seleccionado..."
                                        x: !isMobile && selectedInsurer
                                            ? (selectedInsurer.id === 'mapfre' ? '-15%' : '15%') // "...ENTONCES muévete a los lados (Escritorio)"
                                            : 0, // "...SI NO (es móvil o no hay selección), quédate en el centro (0)"

                                        // --- LÓGICA DE DESAPARICIÓN (Solo móvil) ---
                                        opacity: isMobile && selectedInsurer ? 0 : 1,
                                    }}

                                    // 2. STYLE: Controlamos los Clics
                                    style={{
                                        pointerEvents: isMobile && selectedInsurer ? 'none' : 'auto'
                                    }}

                                    // 3. TRANSITION INTELIGENTE:
                                    // En Móvil: Stiffness 400 (¡Rápido como un parpadeo!)
                                    // En Escritorio: Stiffness 90 (Lento y elegante, como te gustaba)
                                    transition={{
                                        type: "spring",
                                        stiffness: isMobile ? 400 : 80,
                                        damping: 40
                                    }}
                                >

                                    {INSURERS.map((insurer, idx) => {

                                        const isSelected = selectedInsurer?.id === insurer.id;

                                        const isOtherSelected = selectedInsurer && selectedInsurer.id !== insurer.id;

                                        const isMapfre = insurer.id === 'mapfre';



                                        return (

                                            <motion.div

                                                key={insurer.id}

                                                className="relative cursor-pointer group/phone"

                                                onClick={() => setSelectedInsurer(isSelected ? null : insurer)}

                                                animate={{
                                                    x: isOtherSelected
                                                        ? (isMapfre ? '-300%' : '300%')
                                                        : 0,
                                                    opacity: isOtherSelected ? 0 : 1,
                                                    scale: 1
                                                }}
                                                // CAMBIO 3: Misma física spring aquí
                                                transition={{ type: "spring", stiffness: 80, damping: 30 }}

                                            >

                                                {/* MASSIVE Glow - Bleeds infinitely */}

                                                <motion.div

                                                    className="absolute -inset-20 md:-inset-32 rounded-full blur-[120px] md:blur-[180px] pointer-events-none"

                                                    style={{ backgroundColor: insurer.color }}

                                                    animate={{

                                                        opacity: isSelected ? [0.5, 0.7, 0.5] : [0.2, 0.35, 0.2],

                                                        scale: isSelected ? 1.5 : 1,

                                                    }}

                                                    transition={{

                                                        opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },

                                                        scale: { duration: 0.5 }

                                                    }}

                                                />



                                                {/* Phone Image - 20% LARGER */}

                                                <motion.div

                                                    className="relative w-[165px] h-[366px] md:w-[288px] md:h-[624px]"

                                                    animate={{

                                                        y: isSelected ? [0, 0] : [0, -12, 0],

                                                    }}

                                                    transition={{

                                                        y: { duration: 3.5 + idx, repeat: Infinity, ease: "easeInOut" },

                                                    }}

                                                    whileHover={{ scale: isSelected ? 1 : 1.05 }}

                                                >

                                                    <NextImage

                                                        src={isMapfre ? '/images/logos/iphone_mockup_mapfreV3.png' : '/images/logos/iphone_mockup_zurichV3.png'}

                                                        alt={insurer.name}

                                                        fill

                                                        className="object-contain object-top"

                                                        style={{

                                                            filter: `drop-shadow(0 0 ${isSelected ? '50' : '25'}px ${insurer.color}${isSelected ? 'ee' : '88'})`

                                                        }}

                                                    />

                                                </motion.div>

                                            </motion.div>

                                        );

                                    })}

                                </motion.div>



                                {/* Benefits Panel - TRANSPARENT, no box */}

                                <AnimatePresence>

                                    {selectedInsurer && (

                                        <motion.div
                                            // --- ANIMACIÓN ---
                                            initial={{
                                                opacity: 0,
                                                // MÓVIL: Entra desde abajo (y: 50), X en 0.
                                                // ESCRITORIO: Tu lógica original (X: 40 o -40).
                                                y: isMobile ? 50 : 0,
                                                x: isMobile ? 0 : (selectedInsurer.id === 'mapfre' ? 40 : -40),
                                                scale: isMobile ? 0.9 : 1,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                x: 0,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                // MÓVIL: Se va hacia abajo.
                                                // ESCRITORIO: Tu lógica original (X: 20 o -20).
                                                y: isMobile ? 50 : 0,
                                                x: isMobile ? 0 : (selectedInsurer.id === 'mapfre' ? 20 : -20),
                                                scale: isMobile ? 0.9 : 1,
                                            }}
                                            // Tu transition original (Spring suave)
                                            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}

                                            // --- CLASES CSS (AQUÍ ESTÁ EL TRUCO) ---
                                            className={`
                                                absolute 
                                                ${isMobile
                                                    // CLASES MÓVIL (Overlay centrado y oscuro)
                                                    ? 'inset-0 w-full h-full bg-[#0B1226]/85 backdrop-blur-md flex flex-col justify-center px-8 z-30'

                                                    // CLASES ESCRITORIO (Tus clases originales intactas)
                                                    : `top-4 w-[50%] md:w-[45%] max-w-md z-20 ${selectedInsurer.id === 'mapfre' ? 'right-0 md:right-[10%]' : 'left-0 md:left-[10%]'}`
                                                }
                                            `}
                                        >

                                            {/* Transparent container - NO BOX */}

                                            <div className="relative p-4 md:p-6">

                                                <div className="relative z-10">

                                                    {/* Header */}

                                                    <div className="flex items-start justify-between mb-6">

                                                        <div>

                                                            <h4

                                                                className="text-2xl md:text-4xl font-black uppercase tracking-tight"

                                                                style={{

                                                                    color: selectedInsurer.color,

                                                                    textShadow: `0 0 30px ${selectedInsurer.color}80`

                                                                }}

                                                            >

                                                                {selectedInsurer.name} PRIME

                                                            </h4>

                                                            <p className="text-white/60 text-sm mt-1">{selectedInsurer.description}</p>

                                                        </div>

                                                        <button

                                                            onClick={(e) => { e.stopPropagation(); setSelectedInsurer(null); }}

                                                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex-shrink-0"

                                                        >

                                                            <X className="text-white/70" size={18} />

                                                        </button>

                                                    </div>



                                                    {/* Benefits List - Clean, no cards */}

                                                    <div className="space-y-4 mb-8">

                                                        {selectedInsurer.benefits.map((benefit, idx) => (

                                                            <motion.div

                                                                key={idx}

                                                                initial={{ opacity: 0, x: 20 }}

                                                                animate={{ opacity: 1, x: 0 }}

                                                                transition={{ delay: 0.15 + (idx * 0.1) }}

                                                                className="flex items-start gap-3"

                                                            >

                                                                <div
                                                                    className="h-[2px] w-10 flex-shrink-0 mt-3 rounded-full"
                                                                    style={{
                                                                        backgroundColor: selectedInsurer.color,
                                                                        boxShadow: `0 0 12px ${selectedInsurer.color}`
                                                                    }}
                                                                />

                                                                <div>

                                                                    <h5 className="font-bold text-white text-lg leading-tight">{benefit.title}</h5>

                                                                    <p className="text-sm text-white/50 mt-1">{benefit.description}</p>

                                                                </div>

                                                            </motion.div>

                                                        ))}

                                                    </div>



                                                    {/* Ghost CTA Button */}

                                                    <motion.button

                                                        initial={{ opacity: 0, y: 10 }}

                                                        animate={{ opacity: 1, y: 0 }}

                                                        transition={{ delay: 0.5 }}

                                                        onClick={(e) => { e.stopPropagation(); setShowModal(true); }}

                                                        className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl border-2 font-black uppercase tracking-wide text-sm transition-all hover:scale-[1.02]"

                                                        style={{

                                                            borderColor: selectedInsurer.color,

                                                            color: selectedInsurer.color,

                                                            textShadow: `0 0 20px ${selectedInsurer.color}`,

                                                            boxShadow: `0 0 25px ${selectedInsurer.color}30, inset 0 0 20px ${selectedInsurer.color}10`

                                                        }}

                                                    >

                                                        <CarKeyLogo color={selectedInsurer.color} size={20} />

                                                        Redimir Membresía

                                                    </motion.button>

                                                </div>

                                            </div>

                                        </motion.div>

                                    )}

                                </AnimatePresence>

                            </div>

                        </div>

                        {/* B2B Trojan Horse — subtle cross-sell link */}
                        <div className="flex justify-center mt-16 lg:mt-20">
                            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                                <span className="text-sm text-white/50 font-medium">¿Quieres ver el logo de tu empresa aquí?</span>
                                <button
                                    onClick={() => {
                                        const el = document.getElementById("contacto");
                                        if (el) el.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="text-sm text-white font-bold ml-0 sm:ml-2 hover:text-[#B4FB00] transition-colors cursor-pointer"
                                >
                                    Explorar Convenios Corporativos ↗
                                </button>
                            </div>
                        </div>



                        {/* ACTIVATION WALKTHROUGH MODAL */}

                        <AnimatePresence>

                            {showModal && selectedInsurer && (

                                <motion.div

                                    initial={{ opacity: 0 }}

                                    animate={{ opacity: 1 }}

                                    exit={{ opacity: 0 }}

                                    className="fixed inset-0 z-50 flex items-center justify-center p-4"

                                    onClick={() => setShowModal(false)}

                                >

                                    {/* Backdrop */}

                                    <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />



                                    {/* Modal Card */}
                                    <motion.div
                                        initial={{ scale: 0.9, y: 20 }}
                                        animate={{ scale: 1, y: 0 }}
                                        exit={{ scale: 0.9, y: 20 }}
                                        onClick={(e) => e.stopPropagation()}
                                        // CAMBIO: Reducimos padding (p-4) para Mac y 2xl se queda con p-8
                                        className="relative bg-alfred-navy border border-white/10 rounded-3xl p-4 md:p-5 2xl:p-8 max-w-lg 2xl:max-w-xl w-full max-h-[90vh] 2xl:max-h-[85vh] shadow-2xl overflow-y-auto overflow-x-hidden custom-scrollbar"
                                    >
                                        {/* Glow accent */}
                                        <div
                                            className="absolute -top-20 -right-20 w-48 h-48 blur-[100px] opacity-30 pointer-events-none"
                                            style={{ backgroundColor: selectedInsurer.color }}
                                        />

                                        {/* Close button */}
                                        <button
                                            onClick={() => setShowModal(false)}
                                            className="absolute top-3 right-3 2xl:top-4 2xl:right-4 p-1.5 2xl:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
                                        >
                                            <X className="text-white/70 w-4 h-4 2xl:w-5 2xl:h-5" />
                                        </button>

                                        <div className="relative z-10">
                                            {/* Header */}
                                            {/* CAMBIO: Achicamos mb y leading en Mac */}
                                            <h3 className="text-xl md:text-2xl 2xl:text-3xl font-black text-white mb-0.5 2xl:mb-1 leading-tight">
                                                Cómo activar tu{' '}
                                                <span style={{ color: selectedInsurer.color }}>
                                                    {selectedInsurer.name} Prime
                                                </span>
                                            </h3>
                                            <p className="text-white/50 text-[11px] md:text-xs 2xl:text-sm mb-3 2xl:mb-6">Sigue estos pasos en la app de Alfred</p>

                                            {/* Steps Timeline */}
                                            <div className="space-y-0">
                                                {(selectedInsurer.id === 'mapfre' ? [
                                                    { icon: StepIcons.Register, title: 'El Registro', text: 'Descarga Alfred y regístrate con tu correo personal.' },
                                                    { icon: StepIcons.Garage, title: 'Tu Vehículo', text: "Ve a 'Mi Garaje', selecciona 'Agregar Vehículo' e ingresa tu placa." },
                                                    { icon: StepIcons.Activation, title: 'La Llave Maestra', text: "Haz clic en el banner principal: 'Activa PRIME con un convenio'." },
                                                    { icon: StepIcons.Selection, title: 'Selección', text: `En la lista de aliados, selecciona el logo de Mapfre.`, dynamic: true },
                                                    { icon: StepIcons.Validation, title: 'Validación', text: 'Ingresa tu número de póliza y número de recaudo. ¡Listo!' },
                                                ] : [
                                                    { icon: StepIcons.Register, title: 'El Registro', text: 'Descarga Alfred y regístrate con el correo que usaste para comprar tu póliza Zurich.' },
                                                    { icon: StepIcons.Garage, title: 'Tu Vehículo', text: "Ve a 'Mi Garaje', agrega tu vehículo con la placa asegurada." },
                                                    { icon: StepIcons.Activation, title: 'La Llave Maestra', text: "Toca 'Activa PRIME con un convenio' en el inicio de la app." },
                                                    { icon: StepIcons.Selection, title: 'Selección', text: `Elige el logo de Zurich en la lista de aliados.`, dynamic: true },
                                                    { icon: StepIcons.Validation, title: 'Activación', text: 'Validaremos tu correo instantáneamente. ¡Eso es todo!' },
                                                ]).map((step, idx, array) => (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.1 + (idx * 0.08) }}
                                                        className="flex items-start gap-3 md:gap-4 2xl:gap-5"
                                                    >
                                                        {/* Timeline connector */}
                                                        <div className="flex flex-col items-center">
                                                            <div
                                                                className="w-8 h-8 md:w-10 md:h-10 2xl:w-12 2xl:h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0 [&>svg]:w-4 [&>svg]:h-4 md:[&>svg]:w-5 md:[&>svg]:h-5 2xl:[&>svg]:w-6 2xl:[&>svg]:h-6"
                                                                style={{
                                                                    borderColor: selectedInsurer.color,
                                                                    backgroundColor: `${selectedInsurer.color}15`
                                                                }}
                                                            >
                                                                {/* El ícono queda limpiecito y TypeScript ya no molesta */}
                                                                <step.icon color={selectedInsurer.color} />
                                                            </div>
                                                            {idx < array.length - 1 && (
                                                                <div
                                                                    className="w-[2px] h-6 md:h-8 2xl:h-14 mt-1"
                                                                    style={{ backgroundColor: `${selectedInsurer.color}30` }}
                                                                />
                                                            )}
                                                        </div>

                                                        {/* Step content */}
                                                        <div className="flex-1 pb-2 md:pb-3 2xl:pb-8">
                                                            <h5 className="font-bold text-white text-sm md:text-base 2xl:text-lg flex items-center gap-2">
                                                                Paso {idx + 1}: {step.title}
                                                                {step.dynamic && (
                                                                    <NextImage
                                                                        src={selectedInsurer.logo}
                                                                        alt={selectedInsurer.name}
                                                                        width={40}
                                                                        height={16}
                                                                        className="object-contain w-[40px] 2xl:w-[50px]"
                                                                    />
                                                                )}
                                                            </h5>
                                                            <p className="text-[10px] md:text-[11px] 2xl:text-sm text-white/50 mt-0.5 2xl:mt-1 leading-tight 2xl:leading-relaxed">
                                                                {step.text}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {/* CTA Button */}
                                            <a
                                                href={DOWNLOAD_LINK}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full block mt-1 2xl:mt-2"
                                                onClick={() => setShowModal(false)}
                                            >
                                                <Button
                                                    size="lg"
                                                    // CAMBIO: mt-1 y py-2.5 para Mac
                                                    className="w-full bg-alfred-lime text-alfred-navy font-black py-2.5 md:py-3 2xl:py-6 rounded-xl text-sm md:text-base hover:scale-[1.02] transition-transform"
                                                >
                                                    Entendido, Ir a la App
                                                </Button>
                                            </a>
                                        </div>
                                    </motion.div>

                                </motion.div>

                            )}

                        </AnimatePresence>

                    </>

                ) : (

                    <BusinessView />

                )}

            </div>

        </section >

    );

}