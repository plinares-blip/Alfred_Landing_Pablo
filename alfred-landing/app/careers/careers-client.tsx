"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Data
const coreValues = [
    {
        id: "v1",
        title: "Aprendemos todo el día.",
        description: "Aquí nadie viene a demostrar que sabe más, sino a entender mejor. Nos importa encontrar la mejor respuesta, aunque no sea la nuestra.",
        visual: "/images/careers/aprendemos.webp"
    },
    {
        id: "v2",
        title: "Hacemos las cosas bien, con el corazón.",
        description: "Si algo lleva nuestro nombre, tiene que estar bien hecho. Ya sea una línea de código o una llamada a un cliente, dejamos las cosas mejor de como las encontramos.",
        visual: "/images/careers/hacemos.webp"
    },
    {
        id: "v3",
        title: "Nadie es culpable, todos somos responsables.",
        description: "Nos sentamos, lo entendemos y lo resolvemos juntos. Somos un equipo, y eso se nota en los momentos difíciles.",
        visual: "/images/careers/responsables.webp"
    },
    {
        id: "v4",
        title: "Medimos, analizamos y tomamos decisiones.",
        description: "La data decide. Probamos, medimos, aprendemos y ajustamos. Si algo no funciona, lo cambiamos; si funciona, lo escalamos.",
        visual: "/images/careers/medimos.webp"
    },
    {
        id: "v5",
        title: "Priorizamos el largo plazo.",
        description: "Hacemos las cosas bien desde el principio, aunque tome más esfuerzo hoy. Pensamos en grande y trabajamos, todos los días.",
        visual: "/images/careers/plazo.webp"
    }
];

const ROLES = ["Ingeniería", "Operaciones", "Producto", "Diseño", "Finanzas", "Ventas"];

export default function CareersClient() {
    // Section 1 Hooks
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const text1Opacity = useTransform(heroProgress, [0, 0.4], [1, 0]);
    const text1Scale = useTransform(heroProgress, [0, 0.4], [1, 1.2]);
    const text2Opacity = useTransform(heroProgress, [0.5, 0.9], [0, 1]);
    const text2Scale = useTransform(heroProgress, [0.5, 0.9], [0.8, 1]);

    // Section 3 Hooks
    const [activeValue, setActiveValue] = useState(coreValues[0]);

    // Section 4 Form Hooks
    const [challengeActive, setChallengeActive] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const { register, handleSubmit, control, formState: { errors }, reset, watch } = useForm({
        defaultValues: {
            challenge: "",
            name: "",
            email: "",
            linkedin: "",
            role: ""
        }
    });

    const challengeValue = watch("challenge");

    if (challengeValue && challengeValue.length > 5 && !challengeActive) {
        setChallengeActive(true);
    }

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    company: "Candidato",
                    phone: data.linkedin,
                    cities: "1",
                    fleetSize: "0",
                    source: "Careers Terminal",
                    message: `Rol: ${data.role}\nDesafío: ${data.challenge}`
                }),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || "Error al enviar terminal.");
            }

            setIsSuccess(true);
            reset();
            setTimeout(() => { setIsSuccess(false); setChallengeActive(false); }, 10000);
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : "Error del sistema.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#111E3E] text-white selection:bg-alfred-lime selection:text-[#111E3E] font-sans overflow-x-hidden">
            <Navbar mode="careers" setMode={() => { }} />

            {/* SECTION 1 */}
            <section ref={heroRef} className="relative h-[150vh] bg-black">
                <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#111E3E]/80 via-[#111E3E]/50 to-[#111E3E] z-10" />
                        <div className="absolute inset-0 bg-[#0A1128] opacity-50">
                            <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-alfred-lime/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-alfred-sky/10 rounded-full blur-[100px] mix-blend-screen" />
                        </div>
                    </div>

                    <div className="relative z-20 container mx-auto px-4 text-center">
                        <motion.h1
                            style={{ opacity: text1Opacity, scale: text1Scale }}
                            className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl lg:text-7xl xl:text-[80px] font-black tracking-tighter uppercase leading-[0.9] text-white"
                        >
                            No busques empleo. <br />
                            <span className="text-alfred-lime">Busca una misión.</span>
                        </motion.h1>

                        <motion.h1
                            style={{ opacity: text2Opacity, scale: text2Scale }}
                            className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white"
                        >
                            Hacer que tener un vehículo <br />
                            <span className="text-[#0096FB]">sea fácil.</span>
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Inicia</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2 */}
            <section id="reto" className="relative bg-[#111E3E] py-32 lg:py-48 z-20 border-t border-white/5">
                <div className="container mx-auto px-4 lg:px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto flex flex-col items-center gap-8"
                    >
                        <span className="inline-block px-4 py-1 rounded-xl border border-alfred-lime/30 text-alfred-lime text-[10px] font-bold uppercase tracking-widest bg-alfred-lime/5">
                            La Magnitud del Reto
                        </span>

                        <div className="flex flex-col items-center">
                            <span className="text-6xl md:text-[100px] lg:text-[140px] font-black text-white leading-none tracking-tighter tabular-nums drop-shadow-[0_0_40px_rgba(180,251,0,0.1)]">
                                1,000,000
                            </span>
                            <span className="text-2xl md:text-3xl lg:text-5xl font-black text-[#0096FB] uppercase tracking-tight mt-2">
                                Vehículos
                            </span>
                        </div>

                        <p className="text-xl md:text-2xl lg:text-3xl text-white/60 font-medium leading-relaxed mt-6 max-w-3xl">
                            No se trata solo de tecnología, sino de hacer que el <span className="text-white">sistema funcione</span> para las personas. Orquestamos una industria entera rota.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 3 */}
            <section id="cultura" className="relative bg-[#0A1128] py-24 lg:py-32 z-20">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="mb-20">
                        <span className="block text-[#0096FB] text-xs font-bold tracking-[0.2em] uppercase mb-4">
                            NUESTRO ADN
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
                            Cultura de Impacto.
                        </h2>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 relative min-h-[600px]">
                        <div className="w-full lg:w-1/2 flex flex-col gap-2 z-10">
                            {coreValues.map((val) => {
                                const isActive = activeValue.id === val.id;
                                return (
                                    <div
                                        key={val.id}
                                        onMouseEnter={() => setActiveValue(val)}
                                        className="group cursor-pointer py-6 border-b border-white/5 relative"
                                    >
                                        <div className="flex items-start gap-6 relative z-10 transition-transform duration-300 group-hover:translate-x-4">
                                            <div className={`mt-3 w-4 h-[2px] transition-all duration-300 ${isActive ? 'bg-alfred-lime scale-x-100 shadow-[0_0_10px_#B4FB00]' : 'bg-white/10 scale-x-0'}`} />
                                            <div>
                                                <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40'}`}>
                                                    {val.title}
                                                </h3>
                                                <div className={`mt-4 lg:hidden transition-all duration-500 overflow-hidden ${isActive ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                    <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
                                                        {val.description}
                                                    </p>
                                                    <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-white/10">
                                                        <Image src={val.visual} alt={val.title} fill className="object-cover opacity-60" sizes="100vw" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="hidden lg:block w-1/2 relative">
                            <div className="sticky top-40 h-[600px] w-full bg-[#111E3E] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeValue.id}
                                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                                        transition={{ duration: 0.4 }}
                                        className="w-full h-full flex flex-col"
                                    >
                                        <p className="text-2xl font-medium text-white/80 leading-relaxed mb-10 max-w-md">
                                            {activeValue.description}
                                        </p>
                                        <div className="relative flex-1 w-full rounded-2xl overflow-hidden border border-white/10 group">
                                            <div className="absolute inset-0 bg-alfred-lime/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                            <Image
                                                src={activeValue.visual}
                                                alt={activeValue.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-50 group-hover:opacity-80"
                                                sizes="(max-width: 1280px) 50vw, 600px"
                                            />
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4 */}
            <section id="aplicar" className="relative bg-[#111E3E] py-32 z-20 border-t border-white/5">
                <div className="container mx-auto px-4 flex justify-center">
                    <div className="w-full max-w-4xl bg-[#0A1128] border border-white/10 rounded-[2rem] p-8 md:p-16 lg:p-20 shadow-2xl relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-6">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <span className="text-white/40 text-xs font-mono lowercase tracking-widest pl-2">
                                alfred_sys // connect
                            </span>
                        </div>

                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="w-20 h-20 bg-alfred-lime rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(180,251,0,0.4)]">
                                    <CheckCircle2 className="text-[#0A1128] w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Credenciales Recibidas</h3>
                                <p className="text-white/60">Análisis inicial completado. Nos comunicaremos pronto, cómplice.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
                                <div className="relative group">
                                    <label className="block text-alfred-lime text-xl md:text-3xl font-black mb-6 leading-tight max-w-2xl lowercase font-mono">
                                        <span className="text-white">Cuéntanos de algo complejo que hayas construido o arreglado.</span>
                                        <span className="animate-pulse ml-2">_</span>
                                    </label>
                                    <textarea
                                        {...register("challenge", { required: true })}
                                        onFocus={() => setChallengeActive(true)}
                                        placeholder="Escribe tu historia aquí..."
                                        rows={challengeActive ? 5 : 2}
                                        className="w-full bg-[#111E3E]/50 border border-white/10 rounded-xl p-6 text-white text-lg focus:outline-none focus:border-alfred-lime focus:bg-[#111E3E] transition-all duration-300 resize-none font-mono placeholder:text-white/20"
                                    />
                                    {errors.challenge && <span className="text-red-400 text-sm mt-2 font-mono">Campo requerido.</span>}
                                </div>

                                <AnimatePresence>
                                    {challengeActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                            className="overflow-hidden mt-12"
                                        >
                                            <div className="space-y-12 pb-4">
                                                <div>
                                                    <label className="block text-[#0096FB] text-xs font-bold tracking-[0.2em] uppercase mb-6">
                                                        ROL OBJETIVO
                                                    </label>
                                                    <Controller
                                                        name="role"
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <div className="flex flex-wrap gap-3">
                                                                {ROLES.map((role) => (
                                                                    <button
                                                                        key={role}
                                                                        type="button"
                                                                        onClick={() => field.onChange(role)}
                                                                        className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${field.value === role
                                                                            ? "bg-[#0096FB] text-white shadow-[0_0_20px_rgba(0,150,251,0.4)]"
                                                                            : "bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-white/20"
                                                                            }`}
                                                                    >
                                                                        {role}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    />
                                                    {errors.role && <span className="text-red-400 text-xs mt-3 block font-mono">Selecciona un rol.</span>}
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            placeholder="Nombre Completo"
                                                            {...register("name", { required: true })}
                                                            className="w-full bg-transparent border-b border-white/20 px-0 pb-4 text-xl text-white placeholder-white/30 focus:outline-none focus:border-alfred-lime transition-colors"
                                                        />
                                                    </div>

                                                    <div className="relative">
                                                        <input
                                                            type="email"
                                                            placeholder="Correo Electrónico"
                                                            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                                            className="w-full bg-transparent border-b border-white/20 px-0 pb-4 text-xl text-white placeholder-white/30 focus:outline-none focus:border-alfred-lime transition-colors"
                                                        />
                                                    </div>

                                                    <div className="relative md:col-span-2">
                                                        <input
                                                            type="url"
                                                            placeholder="URL de LinkedIn o Portafolio"
                                                            {...register("linkedin", { required: true })}
                                                            className="w-full bg-transparent border-b border-white/20 px-0 pb-4 text-xl text-white placeholder-white/30 focus:outline-none focus:border-[#0096FB] transition-colors"
                                                        />
                                                    </div>
                                                </div>

                                                {submitError && (
                                                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-sm rounded-lg">
                                                        {submitError}
                                                    </div>
                                                )}

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full flex items-center justify-center py-6 bg-alfred-lime text-[#111E3E] font-black rounded-xl uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white disabled:opacity-50"
                                                >
                                                    {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin text-[#111E3E]" /> : "APLICAR ▶"}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
