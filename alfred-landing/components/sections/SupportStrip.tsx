"use client";

import { motion } from "framer-motion";

export function SupportStrip() {
    return (
        <section className="w-full bg-[#111E3E] py-24 relative overflow-hidden">
            {/* Top Transition (Blur/Fade from Convenios #020D20) */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#020D20] to-transparent z-10 pointer-events-none" />

            {/* Ambient Glow / Light Leak */}
            <div
                className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(180, 251, 0, 0.08) 0%, rgba(180, 251, 0, 0) 70%)",
                    filter: "blur(100px)",
                }}
            />

            <div className="w-full px-12 md:px-40 flex flex-col md:flex-row items-center justify-between gap-12 relative z-20">
                {/* Left Side (60%) */}
                <div className="w-full md:w-[60%] space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter"
                    >
                        ¿Aún tienes dudas? <br />
                        <span className="text-white/90">Hablemos.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg md:text-xl text-white/60 font-medium max-w-md"
                    >
                        Nuestro equipo está listo para resolver tu caso en minutos.
                    </motion.p>
                </div>

                {/* Right Side (40%) */}
                <div className="w-full md:w-[40%] flex justify-center md:justify-end">
                    <motion.a
                        href="https://api.whatsapp.com/send?phone=573232540101"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(180, 251, 0, 0.15)" }}
                        whileTap={{ scale: 0.98 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="group relative flex items-center gap-4 px-10 py-5 rounded-full bg-[#0A1128] border border-[#B4FB00] transition-all duration-300"
                    >
                        {/* WhatsApp Icon */}
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-[#B4FB00]"
                        >
                            <path
                                d="M17.472 14.382C17.119 14.205 15.396 13.36 15.078 13.254C14.76 13.149 14.53 13.096 14.3 13.449C14.07 13.802 13.416 14.562 13.222 14.792C13.027 15.004 12.833 15.039 12.48 14.863C12.127 14.686 10.99 14.314 9.644 13.112C8.599 12.179 7.893 11.028 7.681 10.658C7.469 10.287 7.658 10.091 7.835 9.915C7.994 9.757 8.188 9.51 8.365 9.316C8.541 9.122 8.612 8.981 8.735 8.734C8.859 8.487 8.788 8.275 8.7 8.099C8.612 7.922 7.906 6.193 7.606 5.487C7.324 4.817 7.042 4.905 6.848 4.905C6.671 4.905 6.46 4.905 6.248 4.905C6.036 4.905 5.683 4.993 5.383 5.311C5.083 5.628 4.236 6.422 4.236 8.046C4.236 9.67 5.383 11.258 5.542 11.47C5.701 11.681 7.8 14.919 11.066 16.331C13.784 17.513 13.784 17.513 14.366 17.407C14.949 17.301 16.149 16.666 16.484 15.731C16.82 14.796 16.82 13.984 16.714 13.808C16.608 13.631 16.343 13.525 15.99 13.349V13.349Z"
                                fill="currentColor"
                            />
                            <path
                                d="M12.001 2C6.478 2 2.001 6.477 2.001 12C2.001 13.89 2.527 15.656 3.441 17.165L2 22.424L7.424 21.045C8.82 21.906 10.436 22.41 12.164 22.41C17.686 22.41 22.163 17.933 22.163 12.41C22.163 6.887 17.687 2.41 12.164 2.41L12.001 2ZM12.001 20.373C10.518 20.373 9.123 19.98 7.915 19.294L7.633 19.136L4.417 19.957L5.26 16.92L5.076 16.639C4.305 15.421 3.882 14.004 3.882 12.544C3.882 8.066 7.522 4.426 12 4.426C16.478 4.426 20.118 8.066 20.118 12.544C20.118 17.022 16.478 20.662 12 20.662L12.001 20.373Z"
                                fill="currentColor"
                            />
                        </svg>
                        <span className="text-white font-bold tracking-tight text-lg uppercase">Escribir a Soporte</span>
                    </motion.a>
                </div>
            </div>
        </section>
    );
}
