"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
    mode: "personal" | "business" | "alianzas" | "talleres";
    setMode: (mode: "personal" | "business" | "alianzas" | "talleres") => void;
    lean?: boolean;
}

const scrollToSection = (href: string) => {
    const sectionId = href.substring(1);
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

const navLinks = {
    personal: [
        { name: "Soluciones", href: "#servicios", targetIds: ["servicios", "workshop-certification", "conductores"] },
        { name: "Tus Beneficios", href: "#convenios", targetIds: ["convenios"] },
        { name: "ADN", href: "#nosotros", targetIds: ["nosotros", "casos-exito"] },
    ],
    business: [
        { name: "Impacto & ROI", href: "#impacto", targetIds: ["impacto", "roi-calculator"] },
        { name: "Soluciones", href: "#soluciones-flota", targetIds: ["soluciones-flota", "servicios", "command-center", "workshop-certification", "conductores"] },
        { name: "ADN", href: "#nosotros", targetIds: ["nosotros"] },
    ],
    alianzas: [
        { name: "Beneficios", href: "#convenios", targetIds: ["convenios"] },
        // { name: "Contacto", href: "#contacto", targetIds: ["contacto"] }, // Pendiente si hay una seccion de form
    ],
    talleres: [
        { name: "Por qué Alfred", href: "#por-que-alfred", targetIds: ["por-que-alfred"] },
        { name: "Proceso", href: "#proceso", targetIds: ["proceso"] },
        // { name: "Contacto", href: "#contacto", targetIds: ["contacto"] }, // Pendiente
    ],
};

export function Navbar({ mode, setMode, lean = false }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    const links = lean
        ? navLinks[mode]?.filter(l => l.name === "Soluciones") || []
        : navLinks[mode] || [];

    // NUEVO: Estado para "Smart Scroll" (Esconder/Mostrar)
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setIsScrolled(currentScrollY > 20);

            lastScrollY.current = currentScrollY;

            // 3. Scroll Spy (Tu lógica original)
            const currentModeLinks = links;
            let currentSection = "";

            for (const link of currentModeLinks) {
                for (const id of link.targetIds) {
                    const el = document.getElementById(id);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        if (rect.top <= 150 && rect.bottom >= 150) {
                            currentSection = link.href.substring(1);
                            break;
                        }
                    }
                }
                if (currentSection) break;
            }

            const heroId = mode === "personal" ? "personas" : "empresas";
            const heroEl = document.getElementById(heroId);
            if (heroEl) {
                const rect = heroEl.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    currentSection = "";
                }
            }

            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [mode, isMobileMenuOpen]); // Agregamos isMobileMenuOpen a dependencias

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform translate-y-0",
                    // ESTILOS: Si scrolleamos, aplicamos el blur suave
                    isScrolled
                        ? "bg-alfred-dark/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-lg"
                        : "bg-transparent py-5"
                )}
            >
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                    <button
                        onClick={scrollToTop}
                        className="relative w-32 h-10 md:w-40 md:h-12 bg-transparent border-none cursor-pointer"
                    >
                        <Image
                            src="/images/logos/verde degrade.png"
                            alt="Alfred"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </button>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {links.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.href)}
                                className={cn(
                                    "transition-colors text-sm font-medium tracking-wide relative cursor-pointer bg-transparent border-none",
                                    activeSection === link.href.substring(1)
                                        ? "text-alfred-lime"
                                        : "text-white/80 hover:text-alfred-lime"
                                )}
                            >
                                {link.name}
                                {activeSection === link.href.substring(1) && (
                                    <motion.div
                                        layoutId="active-nav"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-alfred-lime"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                )}
                            </button>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/talleres">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-white hover:text-alfred-lime transition-colors font-bold"
                            >
                                Ser taller Alfred
                            </Button>
                        </Link>
                        {mode === "personal" ? (
                            <Link href="/asistente">
                                <Button
                                    size="sm"
                                    className="bg-alfred-lime text-alfred-navy hover:bg-white transition-colors font-bold rounded-full px-6"
                                >
                                    Hablar con Alfred
                                </Button>
                            </Link>
                        ) : (
                            <a href="https://empresas.alfred.co/" target="_blank" rel="noopener noreferrer">
                                <Button
                                    size="sm"
                                    className="bg-alfred-lime text-alfred-navy hover:bg-white transition-colors font-bold rounded-full px-6"
                                >
                                    Iniciar Sesión
                                </Button>
                            </a>
                        )}
                    </div>

                    {/* Mobile Toggle: Hamburguesa Corregida (Grosor sólido 2px) */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden relative z-50 p-2 focus:outline-none group"
                        aria-label="Toggle Menu"
                    >
                        <div className="flex flex-col justify-center items-end gap-2.5">
                            <motion.span
                                animate={isMobileMenuOpen ? "open" : "closed"}
                                variants={{
                                    closed: { rotate: 0, y: 0 },
                                    open: { rotate: 45, y: 6 }
                                }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="w-8 h-[2px] bg-white/60 group-hover:bg-white transition-colors duration-300 block rounded-full"
                            />
                            <motion.span
                                animate={isMobileMenuOpen ? "open" : "closed"}
                                variants={{
                                    closed: { rotate: 0, y: 0 },
                                    open: { rotate: -45, y: -6 }
                                }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="w-8 h-[2px] bg-white/60 group-hover:bg-white transition-colors duration-300 block rounded-full"
                            />
                        </div>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay: Glassmorphism Premium */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.4 }}
                        // CAMBIO: Fondo semitransparente oscuro (90%) + Blur potente
                        className="fixed inset-0 z-40 bg-alfred-dark/95 backdrop-blur-2xl pt-32 px-6 md:hidden flex flex-col items-center justify-start space-y-10"
                    >
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                            className="flex flex-col items-center gap-8 w-full"
                        >
                            {links.map((link, i) => (
                                <button
                                    key={link.name}
                                    onClick={() => {
                                        scrollToSection(link.href);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="text-3xl font-black text-white hover:text-alfred-lime transition-all bg-transparent border-none cursor-pointer tracking-tight"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                            className="w-full flex flex-col items-center gap-6"
                        >
                            <div className="h-[1px] w-12 bg-white/20" />

                            {mode === "personal" ? (
                                <Link href="/asistente" className="w-full max-w-xs" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full h-14 text-lg bg-alfred-lime text-alfred-navy hover:bg-white font-bold rounded-full shadow-[0_0_20px_rgba(180,251,0,0.3)]">
                                        Hablar con Alfred
                                    </Button>
                                </Link>
                            ) : (
                                <a href="https://empresas.alfred.co/" target="_blank" rel="noopener noreferrer" className="w-full max-w-xs" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full h-14 text-lg bg-alfred-lime text-alfred-navy hover:bg-white font-bold rounded-full shadow-[0_0_20px_rgba(180,251,0,0.3)]">
                                        Iniciar Sesión
                                    </Button>
                                </a>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}