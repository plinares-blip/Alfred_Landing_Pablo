"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    company?: string;
    message?: string;
}

interface ContactFormProps {
    source: string; // "Talleres", "Empresas", "Convenios", etc.
    className?: string;
    onSuccess?: () => void;
}

// Minimalist Input Component for High-End aesthetic
const MinimalistInput = ({ label, error, ...props }: any) => (
    <div className="flex flex-col gap-2">
        <label className="text-white/40 font-bold uppercase tracking-widest text-[10px] ml-1" style={{ fontFamily: "var(--font-gotham), sans-serif" }}>{label}</label>
        <input
            {...props}
            className="w-full bg-white/[0.03] border-none border-b border-white/10 px-6 py-5 text-xl text-white placeholder-white/20 focus:outline-none focus:bg-white/[0.05] focus:border-alfred-lime focus:shadow-[0_0_25px_rgba(180,251,0,0.15)] transition-all duration-300 rounded-xl"
            style={{ fontFamily: "var(--font-gotham), sans-serif" }}
        />
        {error && <p className="text-red-400 text-xs mt-1 ml-1 font-medium" style={{ fontFamily: "var(--font-gotham), sans-serif" }}>{error}</p>}
    </div>
);

const MinimalistTextarea = ({ label, error, ...props }: any) => (
    <div className="flex flex-col gap-2">
        <label className="text-white/40 font-bold uppercase tracking-widest text-[10px] ml-1" style={{ fontFamily: "var(--font-gotham), sans-serif" }}>{label}</label>
        <textarea
            {...props}
            className="w-full bg-white/[0.03] border-none border-b border-white/10 px-6 py-5 text-xl text-white placeholder-white/20 focus:outline-none focus:bg-white/[0.05] focus:border-alfred-lime focus:shadow-[0_0_25px_rgba(180,251,0,0.15)] transition-all duration-300 rounded-xl min-h-[160px] resize-none"
            style={{ fontFamily: "var(--font-gotham), sans-serif" }}
        />
        {error && <p className="text-red-400 text-xs mt-1 ml-1 font-medium" style={{ fontFamily: "var(--font-gotham), sans-serif" }}>{error}</p>}
    </div>
);

export function ContactForm({ source, className, onSuccess }: ContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>();

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...data, source }),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || "Error al enviar el formulario");
            }

            setIsSuccess(true);
            reset();
            if (onSuccess) onSuccess();

            setTimeout(() => {
                setIsSuccess(false);
            }, 10000);

        } catch (err) {
            setError(err instanceof Error ? err.message : "Algo salió mal. Inténtalo de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
            >
                <div className="w-20 h-20 bg-alfred-lime rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(180,251,0,0.4)]">
                    <CheckCircle2 className="text-alfred-navy w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter" style={{ fontFamily: "var(--font-gotham), sans-serif" }}>¡Mensaje Enviado!</h3>
                <p className="text-[#8E9BB4] text-lg max-w-md mx-auto mb-10" style={{ fontFamily: "var(--font-gotham), sans-serif" }}>
                    Gracias por contactarnos. Nuestro equipo revisará tu solicitud y te contactará pronto.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="text-alfred-lime font-bold hover:underline transition-all"
                    style={{ fontFamily: "var(--font-gotham), sans-serif" }}
                >
                    Enviar otro mensaje
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`space-y-12 ${className}`}>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <MinimalistInput
                    label="Nombre Completo"
                    placeholder="Ej: Juan Pérez"
                    error={errors.name?.message}
                    {...register("name", { required: "El nombre es requerido" })}
                />
                <MinimalistInput
                    label="Correo Electrónico"
                    placeholder="juan@empresa.com"
                    type="email"
                    error={errors.email?.message}
                    {...register("email", {
                        required: "El correo es requerido",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Correo inválido"
                        }
                    })}
                />
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <MinimalistInput
                    label="Teléfono / WhatsApp"
                    placeholder="+57 300 123 4567"
                    error={errors.phone?.message}
                    {...register("phone", { required: "El teléfono es requerido" })}
                />
                <MinimalistInput
                    label={source === "Alianzas" ? "Empresa / Industria" : "Empresa / Taller (Opcional)"}
                    placeholder="Nombre de tu organización"
                    {...register("company")}
                />
            </div>

            <MinimalistTextarea
                label="¿Cómo podemos ayudarte?"
                placeholder={source === "Alianzas"
                    ? "Ej: Soy una aseguradora y quiero dar asistencias digitales..."
                    : "Cuéntanos sobre tus necesidades o dudas..."
                }
                {...register("message")}
            />

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-sm" style={{ fontFamily: "var(--font-gotham), sans-serif" }}>
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-20 text-xl font-black bg-[#B4FB00] text-black hover:bg-white hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(180,251,0,0.3)] transition-all duration-300 rounded-none uppercase tracking-[0.2em] relative group"
                style={{ fontFamily: "var(--font-gotham), sans-serif" }}
            >
                {isSubmitting ? (
                    <div className="flex items-center justify-center gap-3">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span>Enviando...</span>
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-4">
                        <span>INICIAR CONVERSACIÓN</span>
                        <Send className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                    </div>
                )}
            </button>
        </form>
    );
}
