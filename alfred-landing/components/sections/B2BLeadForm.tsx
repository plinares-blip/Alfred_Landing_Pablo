"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

interface B2BFormData {
    name: string;
    company: string;
    email: string;
    phone: string;
    fleetSize: string;
    role: string;
    painPoint: string;
    customPain: string;
}

const PAIN_POINTS = [
    { id: "costos", label: "Reducir Costos y Gastos", desc: "Mantenimientos, repuestos y facturación descentralizada." },
    { id: "control", label: "Centralizar el Mando", desc: "Falta de visibilidad sobre los vehículos y conductores." },
    { id: "disponibilidad", label: "Aumentar Disponibilidad", desc: "Vehículos mucho tiempo parados en el taller." },
    { id: "otro", label: "Otro Reto", desc: "Cuéntanos cuál es tu principal desafío operativo." }
];

const FLEET_SIZES = ["1 - 10", "11 - 50", "51 - 200", "201+"];
const ROLES = ["Dueño / Fundador", "Gerente General", "Operaciones / Flota", "Compras / Finanzas"];

export function B2BLeadForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

    const { register, handleSubmit, control, formState: { errors }, reset, watch, setValue } = useForm<B2BFormData>({
        defaultValues: {
            fleetSize: "",
            role: "",
            painPoint: "",
            customPain: ""
        }
    });

    const watchedPain = watch("painPoint");
    const watchedFleet = watch("fleetSize");
    const watchedRole = watch("role");
    const watchedCustomPain = watch("customPain");

    const onSubmit = async (data: B2BFormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    source: "Empresas Diagnostic Wizard",
                    message: `Cotización de Flota.\nTamaño: ${data.fleetSize} vehículos.\nRol: ${data.role}\nDolor Principal: ${data.painPoint === 'otro' ? data.customPain : data.painPoint}`
                }),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || "Error al enviar el formulario");
            }

            setIsSuccess(true);
            reset();
            setStep(1);

            setTimeout(() => {
                setIsSuccess(false);
            }, 10000);

        } catch (err) {
            setError(err instanceof Error ? err.message : "Algo salió mal. Inténtalo de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => {
        setDirection(1);
        setStep((prev) => Math.min(prev + 1, 3));
    };

    const prevStep = () => {
        setDirection(-1);
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const handlePainSelect = (id: string) => {
        setValue("painPoint", id);
        if (id !== "otro") {
            setTimeout(() => {
                nextStep();
            }, 300);
        }
    };

    // Animation variants
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    };

    const getHablemosText = () => {
        if (step === 1) return "¿Cuál es tu mayor reto operativo hoy?";
        if (step === 2) return "Entendido. Dimensionemos tu operación para darte la solución exacta.";
        return "Perfecto. Compártenos tus datos y un experto te contactará en breve.";
    };

    // Progress Bar
    const progressPercent = step === 1 ? 33 : step === 2 ? 66 : 100;

    return (
        <section id="contacto" className="relative z-20 w-full bg-[#111E3E] py-24 lg:py-32 overflow-hidden selection:bg-alfred-lime selection:text-alfred-navy">
            <div className="container mx-auto px-4 lg:px-12 xl:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start relative">

                    {/* Left Column: The Hook (Sticky) */}
                    <div className="lg:sticky lg:top-32 flex flex-col gap-6 w-full max-w-xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-6xl md:text-7xl lg:text-[80px] font-black text-white leading-[0.9] tracking-tighter uppercase"
                            style={{ fontFamily: "var(--font-gotham), sans-serif" }}
                        >
                            Hablemos.
                        </motion.h2>

                        {/* Title transitions based on step */}
                        <AnimatePresence mode="wait">
                            <motion.h3
                                key={step}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="text-lg md:text-xl text-[#8E9BB4] leading-relaxed max-w-md"
                            >
                                {getHablemosText()}
                            </motion.h3>
                        </AnimatePresence>

                        {step > 1 && (
                            <button
                                onClick={prevStep}
                                className="text-white/40 hover:text-white transition-colors text-sm self-start mt-4 underline decoration-white/20 underline-offset-4"
                            >
                                Volver al paso anterior
                            </button>
                        )}
                    </div>

                    {/* Right Column: Interactive Diagnostic Form */}
                    <div className="w-full relative">
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full flex flex-col items-center justify-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm backdrop-saturate-150"
                            >
                                <div className="w-20 h-20 bg-alfred-lime rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(180,251,0,0.4)]">
                                    <CheckCircle2 className="text-alfred-navy w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter" style={{ fontFamily: "var(--font-gotham), sans-serif" }}>Configuración Recibida</h3>
                                <p className="text-[#8E9BB4] text-center max-w-xs mb-8">
                                    Nuestra IA organizando a tu equipo. Te contactaremos en breve.
                                </p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="text-alfred-lime font-bold uppercase tracking-widest text-sm hover:underline"
                                >
                                    NUEVA DEMOSTRACIÓN
                                </button>
                            </motion.div>
                        ) : (
                            <div className="w-full bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm backdrop-saturate-150 shadow-2xl overflow-y-auto max-h-[80vh] relative flex flex-col">
                                {/* Thin Subtle Progress Bar */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-50">
                                    <motion.div
                                        className="h-full bg-alfred-lime shadow-[0_0_10px_rgba(180,251,0,0.5)]"
                                        animate={{ width: `${progressPercent}%` }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    />
                                </div>

                                {/* Form Container */}
                                <form onSubmit={handleSubmit(onSubmit)} className="flex-1 w-full relative py-6 px-6 md:py-8 md:px-8 2xl:py-10 2xl:px-10">
                                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                        {/* STEP 1: PAIN DIAGNOSTIC */}
                                        {step === 1 && (
                                            <motion.div
                                                key="step1"
                                                custom={direction}
                                                variants={variants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{ duration: 0.4, bounce: 0.2, type: "spring" }}
                                                className="w-full flex flex-col gap-4 2xl:gap-6"
                                            >
                                                <h4 className="text-white/50 uppercase tracking-widest font-bold text-xs" style={{ fontFamily: "var(--font-gotham), sans-serif" }}>Paso 1 de 3: Diagnóstico</h4>

                                                <div className="flex flex-col gap-2 2xl:gap-3 mt-2 2xl:mt-4">
                                                    {PAIN_POINTS.map((pain) => (
                                                        <div
                                                            key={pain.id}
                                                            onClick={() => handlePainSelect(pain.id)}
                                                            className={`w-full p-3 lg:p-4 2xl:p-8 rounded-xl 2xl:rounded-2xl border transition-all duration-300 cursor-pointer group hover:bg-white/5 ${watchedPain === pain.id
                                                                ? "border-alfred-lime bg-alfred-lime/5 shadow-[0_0_20px_rgba(180,251,0,0.15)]"
                                                                : "border-white/10 hover:border-alfred-lime/50"
                                                                }`}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex-1 mr-4">
                                                                    <h5 className="text-sm lg:text-base 2xl:text-lg font-black text-white mb-0.5 2xl:mb-1 transition-colors group-hover:text-alfred-lime uppercase tracking-wide" style={{ fontFamily: "var(--font-gotham), sans-serif" }}>{pain.label}</h5>
                                                                    <p className="text-[11px] lg:text-xs 2xl:text-sm text-[#8E9BB4] leading-relaxed">{pain.desc}</p>
                                                                    {/* Custom input for "Otro" */}
                                                                    {pain.id === "otro" && watchedPain === "otro" && (
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Describe tu reto operativo..."
                                                                            {...register("customPain")}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                            className="w-full mt-3 bg-transparent border-b border-white/20 px-0 pb-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-alfred-lime transition-all duration-300"
                                                                            autoFocus
                                                                        />
                                                                    )}
                                                                </div>
                                                                {/* Circular Check/Radio indicator */}
                                                                <div className={`w-5 h-5 2xl:w-6 2xl:h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${watchedPain === pain.id ? "border-alfred-lime" : "border-white/20 group-hover:border-alfred-lime/50"
                                                                    }`}>
                                                                    {watchedPain === pain.id && <div className="w-2.5 h-2.5 2xl:w-3 2xl:h-3 bg-alfred-lime rounded-full" />}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Manual continue for "Otro" */}
                                                <AnimatePresence>
                                                    {watchedPain === "otro" && watchedCustomPain && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: 10 }}
                                                            className="mt-4"
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={nextStep}
                                                                className="w-full flex items-center justify-center p-4 bg-[#B4FB00] rounded-2xl text-black hover:bg-white hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(180,251,0,0.3)] transition-all duration-300 group"
                                                                style={{ fontFamily: "var(--font-gotham), sans-serif" }}
                                                            >
                                                                <span className="text-sm font-black uppercase tracking-[0.1em] flex items-center gap-3">
                                                                    Continuar
                                                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                                                </span>
                                                            </button>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        )}

                                        {/* STEP 2: SCALE & DECISION */}
                                        {step === 2 && (
                                            <motion.div
                                                key="step2"
                                                custom={direction}
                                                variants={variants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{ duration: 0.4, bounce: 0.2, type: "spring" }}
                                                className="w-full flex flex-col gap-6 2xl:gap-10"
                                            >
                                                <h4 className="text-white/50 uppercase tracking-widest font-bold text-xs" style={{ fontFamily: "var(--font-gotham), sans-serif" }}>Paso 2 de 3: Tamaño & Rol</h4>

                                                {/* Fleet Size */}
                                                <div className="flex flex-col gap-4">
                                                    <label className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest font-bold" style={{ fontFamily: "var(--font-gotham), sans-serif" }}>
                                                        TAMAÑO DE LA FLOTA (VEHÍCULOS)
                                                    </label>
                                                    <Controller
                                                        name="fleetSize"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <div className="flex flex-wrap gap-3">
                                                                {FLEET_SIZES.map((size) => {
                                                                    const isActive = field.value === size;
                                                                    return (
                                                                        <button
                                                                            key={size}
                                                                            type="button"
                                                                            onClick={() => field.onChange(size)}
                                                                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                                                                                ? "bg-[#B4FB00] text-black font-bold shadow-[0_0_15px_rgba(180,251,0,0.3)] scale-105"
                                                                                : "bg-white/5 text-white hover:bg-white/10 border-transparent border hover:border-white/20"
                                                                                }`}
                                                                        >
                                                                            {size}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    />
                                                </div>

                                                {/* Role */}
                                                <div className="flex flex-col gap-4">
                                                    <label className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest font-bold" style={{ fontFamily: "var(--font-gotham), sans-serif" }}>
                                                        TU ROL EN LA EMPRESA
                                                    </label>
                                                    <Controller
                                                        name="role"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <div className="flex flex-wrap gap-3">
                                                                {ROLES.map((role) => {
                                                                    const isActive = field.value === role;
                                                                    return (
                                                                        <button
                                                                            key={role}
                                                                            type="button"
                                                                            onClick={() => field.onChange(role)}
                                                                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                                                                                ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105"
                                                                                : "bg-white/5 text-white hover:bg-white/10 border-transparent border hover:border-white/20"
                                                                                }`}
                                                                        >
                                                                            {role}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    />
                                                </div>

                                                {/* Conditional Proceed Button */}
                                                <AnimatePresence>
                                                    {watchedFleet && watchedRole && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: 10 }}
                                                            className="mt-6 2xl:mt-10"
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={nextStep}
                                                                className="w-full flex items-center justify-center p-5 bg-[#B4FB00] rounded-2xl text-black hover:bg-white hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(180,251,0,0.3)] transition-all duration-300 group"
                                                                style={{ fontFamily: "var(--font-gotham), sans-serif" }}
                                                            >
                                                                <span className="text-base font-black uppercase tracking-[0.1em] flex items-center gap-3">
                                                                    Continuar
                                                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                                                </span>
                                                            </button>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        )}

                                        {/* STEP 3: CONTACT FORM */}
                                        {step === 3 && (
                                            <motion.div
                                                key="step3"
                                                custom={direction}
                                                variants={variants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{ duration: 0.4, bounce: 0.2, type: "spring" }}
                                                className="w-full flex flex-col gap-6 2xl:gap-10"
                                            >
                                                <h4 className="text-white/50 uppercase tracking-widest font-bold text-xs" style={{ fontFamily: "var(--font-gotham), sans-serif" }}>Paso 3 de 3: Datos de Contacto</h4>

                                                <div className="flex flex-col gap-8 md:gap-10">
                                                    <div className="flex flex-col group relative">
                                                        <input
                                                            type="text"
                                                            placeholder="Nombre Completo"
                                                            {...register("name", { required: true })}
                                                            className="w-full bg-transparent border-b border-white/20 px-0 pb-4 text-xl text-white placeholder-white/30 focus:outline-none focus:border-alfred-lime transition-all duration-300"
                                                        />
                                                        {errors.name && <span className="absolute -bottom-5 left-0 text-red-400 text-xs">Requerido</span>}
                                                    </div>

                                                    <div className="flex flex-col group relative">
                                                        <input
                                                            type="text"
                                                            placeholder="Nombre de la Empresa"
                                                            {...register("company", { required: true })}
                                                            className="w-full bg-transparent border-b border-white/20 px-0 pb-4 text-xl text-white placeholder-white/30 focus:outline-none focus:border-alfred-lime transition-all duration-300"
                                                        />
                                                        {errors.company && <span className="absolute -bottom-5 left-0 text-red-400 text-xs">Requerido</span>}
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-10">
                                                        <div className="flex flex-col group relative">
                                                            <input
                                                                type="email"
                                                                placeholder="Correo Laboral"
                                                                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                                                className="w-full bg-transparent border-b border-white/20 px-0 pb-4 text-xl text-white placeholder-white/30 focus:outline-none focus:border-alfred-lime transition-all duration-300"
                                                            />
                                                            {errors.email && <span className="absolute -bottom-5 left-0 text-red-400 text-xs">Inválido</span>}
                                                        </div>

                                                        <div className="flex flex-col group relative">
                                                            <input
                                                                type="tel"
                                                                placeholder="Celular"
                                                                {...register("phone", { required: true })}
                                                                className="w-full bg-transparent border-b border-white/20 px-0 pb-4 text-xl text-white placeholder-white/30 focus:outline-none focus:border-alfred-lime transition-all duration-300"
                                                            />
                                                            {errors.phone && <span className="absolute -bottom-5 left-0 text-red-400 text-xs">Requerido</span>}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Error Global */}
                                                {error && (
                                                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm mt-2">
                                                        {error}
                                                    </div>
                                                )}

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full mt-auto flex items-center justify-center p-6 bg-[#B4FB00] rounded-full text-black hover:bg-white hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(180,251,0,0.4)] transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                                                    style={{ fontFamily: "var(--font-gotham), sans-serif" }}
                                                >
                                                    {isSubmitting ? (
                                                        <Loader2 className="h-6 w-6 animate-spin text-black" />
                                                    ) : (
                                                        <span className="text-base md:text-lg font-black uppercase tracking-[0.1em] flex items-center gap-3">
                                                            Solicitar Demo
                                                            <span className="group-hover:translate-x-1 transition-transform">▶</span>
                                                        </span>
                                                    )}
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
