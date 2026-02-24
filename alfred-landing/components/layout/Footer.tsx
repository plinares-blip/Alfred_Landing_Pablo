"use client"; // Necesario para la interactividad del acordeón

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Instagram, Linkedin } from "lucide-react";

// Componente para manejar cada sección (Acordeón en Móvil / Lista en Desktop)
function FooterSection({ title, links }: { title: string, links: { label: string, href: string, isSpecial?: boolean }[] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/5 lg:border-none last:border-none">
            {/* Título: Botón en Móvil / Texto en Desktop */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 lg:py-0 flex items-center justify-between group focus:outline-none lg:cursor-default lg:mb-6"
            >
                <h4 className="text-white font-bold text-sm uppercase tracking-widest text-left">
                    {title}
                </h4>
                {/* Flecha solo visible en móvil */}
                <ChevronDown
                    size={16}
                    className={`text-white/40 transition-transform duration-300 lg:hidden ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* Contenido Desplegable (Móvil) + Estático (Desktop) */}
            <div className="hidden lg:block">
                <ul className="space-y-4 text-sm text-white/50">
                    {links.map((link, idx) => (
                        <li key={idx}>
                            <Link
                                href={link.href}
                                className={`transition-colors ${link.isSpecial
                                    ? "text-alfred-lime/80 hover:text-alfred-lime font-medium border-b border-alfred-lime/20 pb-0.5"
                                    : "hover:text-alfred-lime"}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Versión Móvil Animada */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden overflow-hidden"
                    >
                        <ul className="pb-6 space-y-4 text-sm text-white/50">
                            {links.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.href}
                                        className={`block py-1 ${link.isSpecial
                                            ? "text-alfred-lime/80 font-medium"
                                            : "active:text-alfred-lime"}`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function Footer() {
    return (
        <footer className="bg-[#0B1226] border-t border-white/5 pt-12 lg:pt-20 pb-10 relative z-30">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-8 lg:gap-12 mb-12 lg:mb-20">

                    {/* LOGO & DESCRIPCIÓN (Ocupa 2 columnas en Desktop) */}
                    <div className="col-span-1 lg:col-span-2 space-y-6 mb-8 lg:mb-0">
                        <Link href="/" className="relative w-32 h-10 lg:w-40 lg:h-12 block">
                            <Image
                                src="/images/logos/blanco.png"
                                alt="Alfred"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </Link>
                        <p className="text-white/40 text-sm max-w-sm leading-relaxed">
                            Orquestamos la industria automotriz para devolverte tu activo más valioso: el tiempo. Gestión inteligente, confianza total.
                        </p>
                        <div className="flex gap-5 pt-2">
                            <a
                                href="https://www.linkedin.com/company/alfredappco/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-alfred-lime hover:border-alfred-lime/50 transition-all duration-300"
                            >
                                <Linkedin size={18} />
                            </a>
                            <a
                                href="https://www.instagram.com/alfred_auto/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-alfred-lime hover:border-alfred-lime/50 transition-all duration-300"
                            >
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* SECCIONES ACORDEÓN */}
                    <div className="col-span-1 lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8">

                        <FooterSection
                            title="Producto"
                            links={[
                                { label: "Servicios", href: "#servicios" },
                                { label: "Convenios", href: "#convenios" }
                            ]}
                        />

                        <FooterSection
                            title="Empresa"
                            links={[
                                { label: "Nosotros", href: "#nosotros" },
                                { label: "Carreras", href: "#" },
                                { label: "Alianzas Corporativas", href: "#", isSpecial: true }
                            ]}
                        />

                        <FooterSection
                            title="Soporte"
                            links={[
                                { label: "Centro de Ayuda", href: "#soporte" },
                                { label: "Términos", href: "/terminos" }
                            ]}
                        />

                    </div>
                </div>

                {/* COPYRIGHT & CIUDADES */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6 text-center md:text-left">
                    <div className="text-xs text-white/20 tracking-widest uppercase">
                        © {new Date().getFullYear()} Alfred Technology. Made for drivers.
                    </div>
                    <div className="flex gap-8 text-xs text-white/40 uppercase tracking-widest">
                        <span>Bogotá</span>
                        <span>Medellín</span>
                        <span>Ciudad de México</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}