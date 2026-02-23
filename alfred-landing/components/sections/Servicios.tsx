"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const services = [
    {
        title: "Mecánica Experta",
        slug: "mecanica-experta",
        subtitle: <span className="text-white/40">Diagnóstico y <span className="text-alfred-lime">precisión</span></span>,
        bgImage: "/images/services/service_mecanica.png",
        icon: "/images/icono_servicios/mecanica.png",
        glow: "rgba(34, 211, 238, 0.4)", // Cyan
        gridClass: "md:col-span-8 md:row-span-2",
        iconClass: "w-[50%] h-[50%] right-4 bottom-4 rotate-[15deg]",
        delay: 0,
    },
    {
        title: "Lavado & Detailing",
        slug: "lavado-y-detailing",
        subtitle: <span className="text-white/40">Limpieza <span className="text-alfred-lime">premium</span></span>,
        bgImage: "/images/services/service_lavado.png",
        icon: "/images/icono_servicios/lavado.png",
        glow: "rgba(251, 191, 36, 0.4)", // Amber
        gridClass: "md:col-span-4 md:row-span-1",
        iconClass: "w-[45%] h-[45%] right-4 bottom-4",
        delay: 0.1,
    },
    {
        title: "Trámites y Revisión Técnico Mecánica",
        slug: "tramites-y-revision-tecnico-mecanica",
        subtitle: <span className="text-white/40">Papeles <span className="text-alfred-lime">al día</span></span>,
        bgImage: "/images/services/service_revision.avif",
        icon: "/images/icono_servicios/tramites.png",
        glow: "rgba(59, 130, 246, 0.4)", // Blue
        gridClass: "md:col-span-4 md:row-span-1",
        iconClass: "w-[45%] h-[45%] right-4 bottom-4",
        delay: 0.2,
    },
    {
        title: "Latonería y Pintura",
        slug: "latoneria-y-pintura",
        subtitle: <span className="text-white/40">Acabados <span className="text-alfred-lime">perfectos</span></span>,
        bgImage: "/images/services/service_paint.avif",
        icon: "/images/icono_servicios/pintura.png",
        glow: "rgba(168, 85, 247, 0.4)", // Purple
        gridClass: "md:col-span-6 md:row-span-1",
        iconClass: "w-[50%] h-[50%] right-4 bottom-4 -rotate-12",
        delay: 0.3,
    },
    {
        title: "Mantenimiento Preventivo",
        slug: "mantenimiento-preventivo",
        subtitle: <span className="text-white/40">Viaja <span className="text-alfred-lime">seguro</span></span>,
        bgImage: "/images/services/service_oil.avif",
        icon: "/images/icono_servicios/preventivo.png",
        glow: "rgba(251, 191, 36, 0.4)", // Amber
        gridClass: "md:col-span-6 md:row-span-1",
        iconClass: "w-[45%] h-[45%] right-4 bottom-4",
        delay: 0.4,
    },
];

interface ServiciosProps {
    mode?: "personal" | "business";
}

export function Servicios({ mode = "personal" }: ServiciosProps) {
    const isBusiness = mode === "business";

    return (
        <section id="servicios" className="pt-8 pb-16 bg-gradient-to-b from-[#0A0F1A] from-90% to-[#0E1726] overflow-hidden transition-all duration-700">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mb-4">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-1 uppercase tracking-tight leading-none">
                        {isBusiness ? "Servicios de Flota" : "Todo para tu vehículo"}
                    </h2>
                    <p className="text-white/60 text-sm md:text-base">
                        {isBusiness
                            ? "Ecosistema integral de mantenimiento y servicios corporativos con control total."
                            : "Desde un lavado premium hasta mecánica especializada. Todo en un solo lugar."}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-3 gap-4 min-h-[800px] md:h-[400px] relative z-10">
                    {services.map((service, idx) => (
                        <Link
                            key={idx}
                            href={`/servicios/${service.slug}?mode=${mode}`}
                            className={cn(
                                "group block relative overflow-hidden rounded-[2.5rem] bg-[#0c1222] border border-white/5 shadow-2xl transition-all duration-500 hover:border-white/20 hover:scale-[1.01] active:scale-[0.99]",
                                service.gridClass
                            )}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: service.delay }}
                                className="w-full h-full relative"
                            >
                                {/* Carbon Fiber Texture Overlay */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                                {/* Radial Glow */}
                                <motion.div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700"
                                    style={{ background: service.glow }}
                                    initial={{ scale: 0.8 }}
                                    whileHover={{ scale: 1.2, transition: { duration: 1.5, repeat: Infinity, repeatType: "reverse" } }}
                                />

                                {/* Content */}
                                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end z-10 text-left">
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        className="max-w-[70%]"
                                    >
                                        <h3 className="text-xl md:text-2xl font-black text-white leading-tight uppercase tracking-tighter">
                                            {service.title}
                                        </h3>
                                        <p className="text-[10px] md:text-xs font-medium mt-1 uppercase tracking-widest leading-none">
                                            {service.subtitle}
                                        </p>
                                    </motion.div>

                                    {/* Action indicator */}
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-8 h-8 rounded-full bg-alfred-lime flex items-center justify-center text-alfred-dark">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Background Image - Realistic Photo */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={service.bgImage}
                                        alt={service.title}
                                        fill
                                        className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Gradient Overlay for text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-alfred-dark via-alfred-dark/50 to-transparent" />
                                </div>

                                {/* 3D Asset - Floating Icon */}
                                <div className={cn("absolute pointer-events-none z-10 transition-transform duration-700 ease-out group-hover:scale-110", service.iconClass)}>
                                    <motion.div
                                        animate={{
                                            y: [0, -10, 0],
                                            rotate: [0, 2, 0]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: idx * 0.5
                                        }}
                                        className="relative w-full h-full"
                                    >
                                        <Image
                                            src={service.icon}
                                            alt={service.title}
                                            fill
                                            className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                        />
                                    </motion.div>
                                </div>

                                {/* Interactive Inner Shadow */}
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2.5rem] pointer-events-none" />
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>

        </section>
    );
}
