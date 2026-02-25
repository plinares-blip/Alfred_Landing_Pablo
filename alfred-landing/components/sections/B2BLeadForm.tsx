"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

interface B2BFormData {
    name: string;
    company: string;
    email: string;
    phone: string;
    fleetSize: string;
    cities: string;
}

const FLEET_SIZES = ["5 - 20", "21 - 80", "81 - 200", "201+"];
const CITIES_COUNT = ["1 - 2", "2 - 5", "5+"];

export function B2BLeadForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, control, formState: { errors }, reset, watch } = useForm<B2BFormData>({
        defaultValues: {
            fleetSize: FLEET_SIZES[0],
            cities: CITIES_COUNT[0]
        }
    });

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
                    source: "Empresas Lead Form (Terminal)",
                    message: `Cotización de Flota.\nTamaño: ${data.fleetSize} vehículos.\nCiudades: ${data.cities}`
                }),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || "Error al enviar el formulario");
            }

            setIsSuccess(true);
            reset();

            // Reset after 10 seconds
            setTimeout(() => {
                setIsSuccess(false);
            }, 10000);

        } catch (err) {
            setError(err instanceof Error ? err.message : "Algo salió mal. Inténtalo de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contacto" className="relative z-20 w-full bg-[#111E3E] py-24 lg:py-32 overflow-hidden selection:bg-alfred-lime selection:text-alfred-navy">
            <div className="container mx-auto px-4 lg:px-12 xl:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

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

                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg md:text-xl text-[#8E9BB4] leading-relaxed max-w-md"
                        >
                            ¿Estás interesado en conocer nuestro servicio?
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-sm md:text-base text-white/40 max-w-sm mt-4"
                        >
                            Déjanos tus datos y un experto en flotas configurará una demostración exacta para tu volumen de operación.
                        </motion.p>
                    </div>

                    {/* Right Column: Terminal Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-full relative"
                    >
                        {isSuccess ? (
                            <div className="w-full h-full flex flex-col items-center justify-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm backdrop-saturate-150">
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
                            </div>
                        ) : (
                            <div className="w-full bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 lg:p-14 backdrop-blur-sm backdrop-saturate-150 shadow-2xl">
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">

                                    {/* Text Inputs */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-10 md:gap-y-12">
                                        <div className="flex flex-col group relative">
                                            <input
                                                type="text"
                                                placeholder="Nombre"
                                                {...register("name", { required: true })}
                                                className="w-full bg-transparent border-b border-white/20 px-0 pb-4 text-xl text-white placeholder-white/40 focus:outline-none focus:border-alfred-lime transition-all duration-300"
                                            />
                                            {errors.name && <span className="absolute -bottom-5 left-0 text-red-400 text-xs">Requerido</span>}
                                        </div>

                                        <div className="flex flex-col group relative">
                                            <input
                                                type="text"
                                                placeholder="Empresa"
                                                {...register("company", { required: true })}
                                                className="w-full bg-transparent border-b border-white/20 px-0 pb-4 text-xl text-white placeholder-white/40 focus:outline-none focus:border-alfred-lime transition-all duration-300"
                                            />
                                            {errors.company && <span className="absolute -bottom-5 left-0 text-red-400 text-xs">Requerido</span>}
                                        </div>

                                        <div className="flex flex-col group relative">
                                            <input
                                                type="email"
                                                placeholder="Correo Electrónico"
                                                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                                className="w-full bg-transparent border-b border-white/20 px-0 pb-4 text-xl text-white placeholder-white/40 focus:outline-none focus:border-alfred-lime transition-all duration-300"
                                            />
                                            {errors.email && <span className="absolute -bottom-5 left-0 text-red-400 text-xs">Requerido / Correo Válido</span>}
                                        </div>

                                        <div className="flex flex-col group relative">
                                            <input
                                                type="tel"
                                                placeholder="Celular"
                                                {...register("phone", { required: true })}
                                                className="w-full bg-transparent border-b border-white/20 px-0 pb-4 text-xl text-white placeholder-white/40 focus:outline-none focus:border-alfred-lime transition-all duration-300"
                                            />
                                            {errors.phone && <span className="absolute -bottom-5 left-0 text-red-400 text-xs">Requerido</span>}
                                        </div>
                                    </div>

                                    {/* Selectors - Segmented Control Pills */}
                                    <div className="flex flex-col gap-10 mt-4">
                                        {/* Fleet Size */}
                                        <div className="flex flex-col gap-4">
                                            <label className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest font-bold" style={{ fontFamily: "var(--font-gotham), sans-serif" }}>
                                                NÚMERO DE VEHÍCULOS
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
                                                                    className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                                                                        ? "bg-[#B4FB00] text-black font-bold shadow-[0_0_15px_rgba(180,251,0,0.3)]"
                                                                        : "bg-white/5 text-white hover:bg-white/10"
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

                                        {/* Cities Count */}
                                        <div className="flex flex-col gap-4">
                                            <label className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest font-bold" style={{ fontFamily: "var(--font-gotham), sans-serif" }}>
                                                CIUDADES DE OPERACIÓN
                                            </label>
                                            <Controller
                                                name="cities"
                                                control={control}
                                                render={({ field }) => (
                                                    <div className="flex flex-wrap gap-3">
                                                        {CITIES_COUNT.map((city) => {
                                                            const isActive = field.value === city;
                                                            return (
                                                                <button
                                                                    key={city}
                                                                    type="button"
                                                                    onClick={() => field.onChange(city)}
                                                                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                                                                        ? "bg-[#B4FB00] text-black font-bold shadow-[0_0_15px_rgba(180,251,0,0.3)]"
                                                                        : "bg-white/5 text-white hover:bg-white/10"
                                                                        }`}
                                                                >
                                                                    {city}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {/* Error Global */}
                                    {error && (
                                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm">
                                            {error}
                                        </div>
                                    )}

                                    {/* Submit Botón Terminal */}
                                    {/* Full Width, Neon Lime, No Radius o Border minimalista */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full mt-6 flex items-center justify-center p-6 bg-[#B4FB00] text-black hover:bg-white hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(180,251,0,0.4)] transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
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
                                </form>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
