"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, Activity, Workflow, ShieldCheck, HelpCircle, LayoutDashboard, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export interface ServiceData {
    slug: string;
    name: string;
    hero: {
        title: string;
        subtext: string;
        image: string;
        ctaText: string;
    };
    comparison: {
        traditional: {
            title: string;
            points: string[];
        };
        alfred: {
            title: string;
            points: string[];
        };
    };
    steps: {
        title: string;
        description: string;
    }[];
    socialProof: {
        quote: string;
        author: string;
        certifiedTitle: string;
    };
    faqs: {
        question: string;
        answer: string;
    }[];
}

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="border-b border-white/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left group transition-all h-full"
            >
                <div className="pr-8 flex-grow">
                    <span className="text-lg md:text-xl font-bold text-white group-hover:text-alfred-lime transition-colors leading-tight">
                        {question}
                    </span>
                </div>
                <ChevronDown
                    className={cn(
                        "text-white/30 transition-transform duration-300 flex-shrink-0",
                        isOpen && "rotate-180 text-alfred-lime"
                    )}
                />
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                className="overflow-hidden"
            >
                <p className="pb-6 text-white/60 leading-relaxed max-w-3xl">
                    {answer}
                </p>
            </motion.div>
        </div>
    );
};

export default function ServiceLandingTemplate({
    data,
    mode = "personal"
}: {
    data: ServiceData;
    mode?: "personal" | "business";
}) {
    const isBusiness = mode === "business";
    const ctaLink = isBusiness ? "/?mode=business#contacto" : "https://apps.apple.com/co/app/alfred-expertos-en-tu-carro/id1534914144"; // Simplified for now

    return (
        <div className="bg-[#111E3E] min-h-screen text-white overflow-hidden">
            <Navbar mode={mode as any} setMode={() => { }} lean />

            {/* 1. HERO SECTION */}
            <section className="relative min-h-[90vh] md:h-screen flex items-center pt-24 pb-12 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={data.hero.image}
                        alt={data.name}
                        fill
                        className="object-cover opacity-30 md:opacity-40 grayscale-[0.5]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#111E3E]/60 via-[#111E3E] to-[#111E3E] md:bg-gradient-to-r md:from-[#111E3E] md:via-[#111E3E]/80 md:to-transparent" />
                </div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight md:leading-[1.1] text-left">
                            {data.hero.title}
                        </h1>
                        <p className="text-lg md:text-2xl text-white/70 mb-8 md:mb-10 leading-relaxed font-light text-left">
                            {data.hero.subtext}
                        </p>
                        <div className="flex flex-col md:flex-row gap-4">
                            <a href={ctaLink} target={isBusiness ? "_self" : "_blank"} rel="noopener noreferrer" className="w-full md:w-auto">
                                <Button size="lg" className="h-16 w-full md:px-10 text-lg shadow-[0_4px_20px_rgba(180,251,0,0.3)]">
                                    {data.hero.ctaText}
                                </Button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. PROBLEM VS SOLUTION */}
            <section className="py-20 md:py-24 container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-24">
                    {/* Traditional Way (El Dolor) */}
                    <div className="p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/5 grayscale opacity-60">
                        <h2 className="text-xl md:text-2xl font-black mb-6 md:mb-8 uppercase tracking-widest text-gray-300/90">
                            {data.comparison.traditional.title}
                        </h2>
                        <ul className="space-y-4 md:space-y-6">
                            {data.comparison.traditional.points.map((point, i) => (
                                <li key={i} className="flex gap-4 text-gray-300 text-base md:text-lg leading-snug">
                                    <div className="mt-2.5 w-4 h-[1px] bg-gray-500 flex-shrink-0" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Alfred Way (El Alivio) */}
                    <div className="p-8 md:p-10 rounded-3xl bg-white/[0.04] border border-alfred-lime/40 relative overflow-hidden group shadow-[0_0_50px_rgba(180,251,0,0.1)]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-alfred-lime/5 blur-[100px] pointer-events-none" />
                        <h2 className="text-xl md:text-2xl font-black mb-6 md:mb-8 uppercase tracking-widest text-alfred-lime">
                            {data.comparison.alfred.title}
                        </h2>
                        <ul className="space-y-4 md:space-y-6">
                            {data.comparison.alfred.points.map((point, i) => (
                                <li key={i} className="flex gap-4 text-white text-base md:text-lg font-medium leading-snug">
                                    <div className="mt-2.5 w-5 h-0.5 bg-alfred-lime shadow-[0_0_10px_rgba(180,251,0,0.6)] flex-shrink-0" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-white/10 flex items-center gap-3">
                            <ShieldCheck className="text-alfred-lime" size={20} />
                            <span className="text-xs md:text-sm font-bold uppercase tracking-tighter text-white/40">Garantía Alfred Incluida</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. HOW IT WORKS - Vertical Timeline on Mobile */}
            <section className="py-20 md:py-24 bg-white/[0.02]">
                <div className="container mx-auto px-6 md:px-12 text-center md:text-left mb-16 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-black mb-4">¿Cómo funciona?</h2>
                    <p className="text-white/50 text-lg md:text-xl font-light">Simple, transparente y 100% digital.</p>
                </div>

                <div className="container mx-auto px-6 md:px-12 max-w-5xl">
                    <div className="flex flex-col gap-0 md:grid md:grid-cols-3 md:gap-8 relative">
                        {/* Desktop connecting line */}
                        <div className="hidden md:block absolute top-[120px] left-0 w-full h-[1px] bg-white/10 z-0" />

                        {data.steps.map((step, i) => (
                            <div key={i} className="relative group md:p-8 rounded-3xl md:bg-white/5 md:border md:border-white/10 md:hover:border-alfred-lime/30 transition-all z-10 mb-12 md:mb-0">
                                <div className="flex items-start md:block gap-6">
                                    <div className="relative">
                                        <div className="text-5xl md:text-6xl font-black text-alfred-lime/20 group-hover:text-alfred-lime/40 mb-4 transition-colors leading-none">
                                            0{i + 1}
                                        </div>
                                        {/* Mobile vertical line */}
                                        {i < data.steps.length - 1 && (
                                            <div className="md:hidden absolute top-14 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-alfred-lime/50 to-transparent" />
                                        )}
                                    </div>
                                    <div className="pt-2 md:pt-0">
                                        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{step.title}</h3>
                                        <p className="text-white/60 text-base md:text-lg leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. SOCIAL PROOF / TESTIMONIAL */}
            <section className="py-32 container mx-auto px-6 md:px-12 text-center">
                <div className="max-w-4xl mx-auto">
                    <Sparkles className="text-alfred-lime mx-auto mb-8 animate-pulse" size={48} />
                    <blockquote className="text-4xl md:text-5xl font-black mb-8 leading-tight italic tracking-tight">
                        "{data.socialProof.quote}"
                    </blockquote>
                    <p className="text-alfred-lime font-bold text-xl mb-6">— {data.socialProof.author}</p>

                    <div className="relative inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-alfred-lime/10 to-transparent border border-alfred-lime/20 rounded-full overflow-hidden group">
                        <div className="absolute inset-0 bg-alfred-lime/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <Activity size={18} className="text-alfred-lime" />
                        <span className="text-sm font-black uppercase tracking-[0.2em] text-white/90">
                            {data.socialProof.certifiedTitle}
                        </span>
                    </div>
                </div>
            </section>

            {/* 5. FAQ SECTION */}
            <section className="py-24 bg-white/[0.02]">
                <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                    <div className="flex items-center gap-4 mb-12">
                        <HelpCircle className="text-alfred-lime" size={32} />
                        <h2 className="text-3xl md:text-5xl font-black">Preguntas Frecuentes</h2>
                    </div>
                    <div className="space-y-2">
                        {data.faqs.map((faq, i) => (
                            <FAQItem key={i} {...faq} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. BOTTOM CTA - Solid Block on Mobile */}
            <section className="py-12 md:py-24 container mx-auto px-6 md:px-12 text-center font-black">
                <div className="p-10 md:p-24 rounded-[2.5rem] md:rounded-[3rem] bg-alfred-navy md:bg-gradient-to-br md:from-white/10 md:to-transparent border border-white/10 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-alfred-lime opacity-[0.05] blur-[150px] pointer-events-none" />
                    <h2 className="text-3xl md:text-6xl font-black mb-8 max-w-3xl mx-auto leading-tight">
                        {data.slug === "tramites-y-revision-tecnico-mecanica"
                            ? "Tu Revisión al día, sin levantarte de la silla"
                            : `Tu ${data.name.split(' ')[0]} al día, sin complicaciones`}
                    </h2>
                    <a href={ctaLink} target={isBusiness ? "_self" : "_blank"} rel="noopener noreferrer" className="block w-full">
                        <Button size="lg" className="h-16 w-full md:w-auto md:px-16 text-xl shadow-[0_8px_30px_rgba(180,251,0,0.2)]">
                            Agendar {data.name}
                        </Button>
                    </a>
                </div>
            </section>

            {/* 7. REGIONAL COBERTURA (SEO) */}
            <section className="py-20 border-t border-white/5 opacity-40 hover:opacity-100 transition-opacity">
                <div className="container mx-auto px-6 md:px-12">
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-8 text-center text-white/40">Presencia Regional Alfred</h3>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] md:text-xs uppercase tracking-widest font-medium">
                        <span className="text-alfred-lime">Colombia (23+ Ciudades):</span>
                        <span>Bogotá</span>
                        <span>Medellín</span>
                        <span>Cali</span>
                        <span>Barranquilla</span>
                        <span>Cartagena</span>
                        <span>Bucaramanga</span>
                        <span>Pereira</span>
                        <span>Manizales</span>
                        <span>Armenia</span>
                        <span>Santa Marta</span>
                        <span>Ibagué</span>
                        <span className="text-alfred-lime ml-4">México:</span>
                        <span>CDMX</span>
                        <span>Guadalajara</span>
                        <span>Monterrey</span>
                        <span>Querétaro</span>
                        <span>Puebla</span>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
