"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Smartphone } from "lucide-react";
import Image from "next/image";
import { ContactForm } from "@/components/forms/ContactForm";

const benefits = [
    {
        title: "Clientes Recurrentes",
        desc: "Acceso a flotas corporativas y convenios de aseguradoras. Demanda constante sin esfuerzo comercial. Olvídate de los meses bajos, Alfred mantiene tu taller ocupado.",
        icon: <ShieldCheck className="text-alfred-lime" size={32} />,
        image: "/images/talleres/clientes_recurrentes.webp"
    },
    {
        title: "Pagos Garantizados",
        desc: "Alfred gestiona el cobro por ti. Tú te enfocas en el vehículo, nosotros te pagamos puntual y seguro. Sin carteras vencidas ni persiguiendo clientes para que paguen.",
        icon: <Zap className="text-alfred-lime" size={32} />,
        image: "/images/talleres/pagos_garantizados.webp"
    },
    {
        title: "Tu Taller, Digitalizado",
        desc: "Usa nuestra App para gestionar órdenes, evidencias y tiempos. Digitaliza tu taller al instante. Elimina el papel y mantén a tus clientes informados en tiempo real.",
        icon: <Smartphone className="text-alfred-lime" size={32} />,
        image: "/images/talleres/digitaliza_tu_taller.webp"
    }
];

export default function TalleresClient() {
    const [mode, setMode] = useState<"personal" | "business" | "alianzas" | "talleres" | "careers">("talleres");

    return (
        <main className="min-h-screen bg-alfred-dark text-white selection:bg-alfred-lime selection:text-alfred-navy">
            <Navbar mode={mode} setMode={setMode} />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(180,251,0,0.05),transparent_50%)]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-[40%_60%] gap-12 xl:gap-16 items-center">
                        <div className="space-y-8">
                            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
                                Llena tu taller. <br />
                                <span className="text-alfred-lime">Automatiza tu gestión.</span>
                            </h1>

                            <p className="text-xl text-white/60 leading-relaxed max-w-xl">
                                Alfred te trae clientes corporativos y particulares listos para comprar.
                                Sin llamadas perdidas, sin cotizaciones en servilletas.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Button
                                    size="lg"
                                    onClick={() => document.getElementById("formulario-aliados")?.scrollIntoView({ behavior: "smooth" })}
                                    className="bg-alfred-lime text-alfred-navy hover:bg-white font-black px-10 h-16 text-lg transition-all duration-300 shadow-[0_0_30px_rgba(180,251,0,0.2)] hover:shadow-[0_0_40px_rgba(180,251,0,0.4)]"
                                >
                                    Quiero ser Aliado Alfred
                                </Button>
                            </div>
                        </div>

                        <div className="relative w-full">
                            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                                <Image
                                    src="/images/talleres/hero.webp"
                                    alt="Alfred Partner Mechanic"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-alfred-dark/60 via-transparent to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section id="por-que-alfred" className="py-32 bg-[#0B1226] overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-24 space-y-4">
                        <span className="text-white/40 font-bold tracking-[0.2em] uppercase text-sm">¿Por qué Alfred?</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white">Escalamos tu negocio con tecnología.</h2>
                    </div>

                    <div className="space-y-24">
                        {benefits.map((benefit, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="flex flex-col md:flex-row items-center gap-10 md:gap-20"
                            >
                                <div className="flex-1 w-full">
                                    <div className="relative aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl group">
                                        <Image
                                            src={benefit.image}
                                            alt={benefit.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-alfred-dark/20 to-transparent" />
                                    </div>
                                </div>

                                <div className="flex-1 w-full space-y-6 md:pl-10 text-left">
                                    <h3 className="text-3xl md:text-5xl font-black text-white leading-tight">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-lg md:text-xl text-white/60 leading-relaxed font-medium">
                                        {benefit.desc}
                                    </p>
                                    <div className="w-16 h-1 bg-alfred-lime rounded-full mt-4 opacity-30" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Exclusivity Section */}
            <section id="formulario-aliados" className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,56,66,0.3),transparent_70%)]" />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="max-w-3xl mx-auto space-y-12">
                        <h2 className="text-4xl md:text-6xl font-black leading-tight">
                            Buscamos aliados, <br />
                            <span className="text-white/40 font-light">no solo proveedores.</span>
                        </h2>

                        <p className="text-xl text-white/50 leading-relaxed">
                            Unirse a Alfred es un logro. Evaluamos infraestructura, cumplimiento y calidad de servicio.
                            Solo el 15% de los aspirantes completa nuestra certificación.
                        </p>

                        <div className="pt-8 max-w-2xl mx-auto text-left bg-alfred-navy/40 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold text-white mb-6 text-center">Únete a la Red de Aliados</h3>
                            <ContactForm source="Formulario Aliados" />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
