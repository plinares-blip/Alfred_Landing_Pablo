"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";

const manifestoItems = [
    {
        id: "value-1",
        text: "Aprendemos ",
        highlight: "todo el día",
    },
    {
        id: "value-2",
        text: "Hacemos las cosas bien, ",
        highlight: "con el corazón",
    },
    {
        id: "value-3",
        text: "Nadie es culpable, ",
        highlight: "todos somos responsables",
    },
    {
        id: "value-4",
        text: "Medimos, analizamos y ",
        highlight: "tomamos decisiones",
    },
    {
        id: "value-5",
        text: "Priorizamos el ",
        highlight: "largo plazo",
    },
];

export function Nosotros() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Track when the container is in the viewport to safely toggle the fixed logo
    const { scrollYProgress: intersectionProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    // Maps intersection progress to opacity: only visible when safely intersecting
    const logoOpacity = useTransform(intersectionProgress, [0, 0.01, 0.99, 1], [0, 1, 1, 0]);

    // Animate Title
    const titleOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
    const titleY = useTransform(scrollYProgress, [0, 0.05], [20, 0]);

    // Animate Values (Sequential appearance and stacking)
    const v1Opacity = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
    const v1Y = useTransform(scrollYProgress, [0.08, 0.18], [100, 0]);

    const v2Opacity = useTransform(scrollYProgress, [0.22, 0.32], [0, 1]);
    const v2Y = useTransform(scrollYProgress, [0.22, 0.32], [100, 0]);

    const v3Opacity = useTransform(scrollYProgress, [0.36, 0.46], [0, 1]);
    const v3Y = useTransform(scrollYProgress, [0.36, 0.46], [100, 0]);

    const v4Opacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
    const v4Y = useTransform(scrollYProgress, [0.5, 0.6], [100, 0]);

    const v5Opacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
    const v5Y = useTransform(scrollYProgress, [0.65, 0.75], [100, 0]);

    const recruitingOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
    const recruitingY = useTransform(scrollYProgress, [0.85, 0.95], [100, 0]);

    const opacities = [v1Opacity, v2Opacity, v3Opacity, v4Opacity, v5Opacity];
    const ys = [v1Y, v2Y, v3Y, v4Y, v5Y];

    return (
        <section ref={containerRef} id="nosotros" className="relative bg-[#111E3E] h-[150vh] lg:h-[180vh] xl:h-[200vh] z-10">
            {/* True Static Background Logo - Stays glued to viewport but exclusively visible while in this section */}
            <motion.div
                style={{ opacity: logoOpacity }}
                className="fixed inset-0 z-[-1] flex items-center justify-center pointer-events-none"
            >
                <div className="relative w-[30vw] h-[30vw] lg:w-[19vw] lg:h-[19vw] opacity-10">
                    <Image
                        src="/blanco.png"
                        alt="Alfred Logo Watermark"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </motion.div>

            {/* Content Wrapper - Using z-20 to be over the logo */}
            <div className="sticky top-0 h-[100dvh] w-full flex flex-col lg:flex-row font-sans z-20 overflow-hidden pt-20 lg:pt-0">

                {/* Left Column - Mission/Vision */}
                <div className="w-full lg:w-[40%] text-white relative z-10 flex flex-col justify-center px-6 lg:px-16 shrink-0 h-[40%] lg:h-full">
                    <div className="space-y-3 xl:space-y-2 2xl:space-y-8 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                        {/* Mission */}
                        <div className="space-y-2 lg:space-y-3">
                            <span className="block text-[#0096FB] text-xs lg:text-sm font-bold tracking-[0.2em] uppercase">
                                NUESTRA MISIÓN
                            </span>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-black leading-tight uppercase condensed">
                                Hacer que tener un vehículo sea <span className="text-[#B4FB00]">fácil</span><span>.</span>
                            </h2>
                        </div>

                        {/* Vision */}
                        <div className="space-y-2 lg:space-y-3">
                            <span className="block text-[#0096FB] text-xs lg:text-sm font-bold tracking-[0.2em] uppercase">
                                NUESTRO NORTE
                            </span>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-black leading-tight uppercase condensed">
                                Gestionar 1 millón de vehículos con <span className="text-[#B4FB00]">cero fricción</span><span>.</span>
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Right Column - Values Stacking List */}
                <div className="w-full lg:w-[60%] relative z-10 flex flex-col justify-start lg:justify-center px-6 lg:px-20 shrink-0 h-[60%] lg:h-full pt-4 lg:pt-0">
                    <div className="max-w-4xl mx-auto lg:mx-0 w-full">

                        {/* Values Title */}
                        <motion.div
                            style={{ opacity: titleOpacity, y: titleY }}
                            className="mb-3 lg:mb-6 text-center lg:text-left"
                        >
                            <span className="block text-[#0096FB] text-xs lg:text-sm font-bold tracking-[0.2em] uppercase">
                                LO QUE NOS MUEVE
                            </span>
                        </motion.div>

                        {/* Values List */}
                        <div className="space-y-3 lg:space-y-4 xl:space-y-3 2xl:space-y-8">
                            {manifestoItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    style={{
                                        opacity: opacities[index],
                                        y: ys[index]
                                    }}
                                    className="flex items-start gap-4 lg:gap-6"
                                >
                                    {/* Indicator Line */}
                                    <div className="mt-2 lg:mt-3 2xl:mt-4 w-6 lg:w-10 2xl:w-12 h-[2px] bg-[#B4FB00] flex-shrink-0 shadow-[0_0_10px_#B4FB00]" />

                                    <h3 className="text-base sm:text-lg lg:text-xl xl:text-xl 2xl:text-3xl font-bold leading-tight text-white">
                                        {item.text}
                                        <span className="inline-block">
                                            <span className="text-[#B4FB00]">{item.highlight}</span>
                                            <span className="text-white">.</span>
                                        </span>
                                    </h3>
                                </motion.div>
                            ))}
                        </div>

                        {/* Recruiting Hook */}
                        <motion.div
                            style={{ opacity: recruitingOpacity, y: recruitingY }}
                            className="mt-6 lg:mt-8 xl:mt-5 2xl:mt-12 pt-4 lg:pt-6 xl:pt-3 2xl:pt-6 border-t border-white/10 text-center lg:text-left"
                        >
                            <h4 className="text-sm md:text-base lg:text-xl xl:text-2xl font-bold text-white mb-3 lg:mb-4 leading-tight">
                                ¿Compartes este ADN? <span className="text-white/40 block lg:inline">No busques empleo, busca una misión.</span>
                            </h4>
                            <Link
                                href="/careers"
                                className="inline-block border border-[#B4FB00] text-[#B4FB00] hover:bg-[#B4FB00] hover:text-[#111E3E] text-xs lg:text-base font-bold px-6 lg:px-8 py-2.5 md:py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                            >
                                Unirse al Equipo
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
