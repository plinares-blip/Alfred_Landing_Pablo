"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import with higher priority loading display
const Globe = dynamic(() => import("react-globe.gl"), {
    ssr: false,
});

// ────────────────────────────────────────────
// City Data Engine (Strict Unicode Encoding)
// ────────────────────────────────────────────
const COLOMBIA_CITIES = [
    // Tier 1 (Hubs)
    { name: "Bogota", lat: 4.6097, lng: -74.0817, tier: 1 },
    { name: "Medellin", lat: 6.2442, lng: -75.5812, tier: 1 },
    { name: "Cali", lat: 3.4516, lng: -76.5320, tier: 1 },
    // Tier 2 (Principales)
    { name: "Barranquilla", lat: 10.9639, lng: -74.7964, tier: 2 },
    { name: "Cartagena", lat: 10.3910, lng: -75.4794, tier: 2 },
    { name: "Bucaramanga", lat: 7.1193, lng: -73.1227, tier: 2 },
    { name: "Pereira", lat: 4.8133, lng: -75.6961, tier: 2 },
    // Tier 3 (Resto)
    { name: "Manizales", lat: 5.0689, lng: -75.5173, tier: 3 },
    { name: "Ibague", lat: 4.4333, lng: -75.2167, tier: 3 },
    { name: "Cucuta", lat: 7.8939, lng: -72.5078, tier: 3 },
    { name: "Villavicencio", lat: 4.1420, lng: -73.6266, tier: 3 },
    { name: "Santa Marta", lat: 11.2408, lng: -74.1990, tier: 3 },
    { name: "Pasto", lat: 1.2136, lng: -77.2811, tier: 3 },
    { name: "Neiva", lat: 2.9273, lng: -75.2819, tier: 3 },
    { name: "Armenia", lat: 4.5339, lng: -75.6811, tier: 3 },
    { name: "Monteria", lat: 8.7479, lng: -75.8814, tier: 3 },
    { name: "Sincelejo", lat: 9.3047, lng: -75.3978, tier: 3 },
    { name: "Tunja", lat: 5.5353, lng: -73.3678, tier: 3 },
    { name: "Popayan", lat: 2.4419, lng: -76.6063, tier: 3 },
    { name: "Valledupar", lat: 10.4631, lng: -73.2532, tier: 3 },
];

const MEXICO_CITIES = [
    // Tier 1 (Hubs)
    { name: "CDMX", lat: 19.4326, lng: -99.1332, tier: 1 },
    { name: "Guadalajara", lat: 20.6597, lng: -103.3496, tier: 1 },
    { name: "Monterrey", lat: 25.6866, lng: -100.3161, tier: 1 },
    // Tier 2 (Principales)
    { name: "Puebla", lat: 19.0413, lng: -98.2062, tier: 2 },
    { name: "Tijuana", lat: 32.5149, lng: -117.0382, tier: 2 },
    { name: "Leon", lat: 21.1222, lng: -101.6822, tier: 2 },
    { name: "Ciudad Juarez", lat: 31.6904, lng: -106.4245, tier: 2 },
    { name: "Merida", lat: 20.9674, lng: -89.5926, tier: 2 },
    { name: "Queretaro", lat: 20.5888, lng: -100.3899, tier: 2 },
    // Tier 3 (Resto)
    { name: "San Luis Potosi", lat: 22.1565, lng: -100.9855, tier: 3 },
    { name: "Aguascalientes", lat: 21.8853, lng: -102.2916, tier: 3 },
    { name: "Hermosillo", lat: 29.0730, lng: -110.9559, tier: 3 },
    { name: "Cancun", lat: 21.1619, lng: -86.8515, tier: 3 },
    { name: "Chihuahua", lat: 28.6330, lng: -106.0691, tier: 3 },
    { name: "Toluca", lat: 19.2827, lng: -99.6557, tier: 3 },
    { name: "Morelia", lat: 19.7060, lng: -101.1950, tier: 3 },
    { name: "Veracruz", lat: 19.1738, lng: -96.1342, tier: 3 },
    { name: "Oaxaca", lat: 17.0732, lng: -96.7266, tier: 3 },
    { name: "Villahermosa", lat: 17.9895, lng: -92.9475, tier: 3 },
    { name: "Tuxtla Gutierrez", lat: 16.7569, lng: -93.1292, tier: 3 },
];

const ALL_CITIES = [...COLOMBIA_CITIES, ...MEXICO_CITIES];

const ARCS_DATA = [
    { startLat: 19.4326, startLng: -99.1332, endLat: 4.6097, endLng: -74.0817, color: '#B4FB00' }, // CDMX -> Bogotá
    { startLat: 20.6597, startLng: -103.3496, endLat: 19.4326, endLng: -99.1332, color: '#B4FB00' }, // GDL -> CDMX
    { startLat: 25.6866, startLng: -100.3161, endLat: 19.4326, endLng: -99.1332, color: '#B4FB00' }, // MTY -> CDMX
    { startLat: 6.2442, startLng: -75.5812, endLat: 4.6097, endLng: -74.0817, color: '#B4FB00' }, // MDE -> BOG
    { startLat: 3.4516, startLng: -76.5320, endLat: 4.6097, endLng: -74.0817, color: '#B4FB00' }, // CLO -> BOG
];

interface RegionalCoverageMapProps {
    isOpen: boolean;
    onClose: () => void;
}

export function RegionalCoverageMap({ isOpen, onClose }: RegionalCoverageMapProps) {
    const globeRef = useRef<any>(null);
    const [isGlobeReady, setIsGlobeReady] = useState(false);
    const [altitude, setAltitude] = useState(2.2);

    // Performance Optimized Point Data
    const pointsData = useMemo(() => {
        return ALL_CITIES.map(city => ({
            ...city,
            // Sizing calculation is now handled contextually based on camera altitude
            alt: 0.015
        }));
    }, []);

    useEffect(() => {
        if (!isOpen) {
            setIsGlobeReady(false);
            return;
        }

        // Bloqueo de scroll y teclado
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";

        // FUNCIÓN DE INICIALIZACIÓN SEGURA
        let retryCount = 0;
        const checkGlobeReady = setInterval(() => {
            retryCount++;

            if (globeRef.current) {
                const isMobile = window.innerWidth < 768;
                const startAlt = isMobile ? 3.5 : 2.2;

                // Ejecutamos el posicionamiento
                globeRef.current.pointOfView({ lat: 15, lng: -90, altitude: startAlt }, 0);

                setAltitude(startAlt);
                setIsGlobeReady(true);

                clearInterval(checkGlobeReady); // ¡Listo! Dejamos de buscar
            }

            // Si después de 5 segundos no carga (50 intentos), algo salió mal, liberamos la pantalla
            if (retryCount > 50) {
                setIsGlobeReady(true);
                clearInterval(checkGlobeReady);
            }
        }, 100); // Revisa cada 100ms

        return () => {
            clearInterval(checkGlobeReady);
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    // PRECISE SCREEN-SPACE SCALING LOGIC (Lead Architect Directives)
    // We adjust the radius/stroke as a factor of altitude to counteract perspective
    // This simulates sizeAttenuation: false
    const pointScale = Math.max(0.08, altitude * 0.2);
    const hubScale = Math.max(0.12, altitude * 0.35);
    const arcStroke = Math.max(0.1, altitude * 0.4);
    // LÓGICA DE ZOOM MANUAL
    const handleZoom = (direction: 'in' | 'out') => {
        if (!globeRef.current) return;
        const currentAlt = globeRef.current.pointOfView().altitude;
        // Limita el zoom para no atravesar la tierra (0.1) ni perderse en el espacio (4)
        const newAlt = direction === 'in' ? Math.max(0.1, currentAlt - 0.5) : Math.min(4, currentAlt + 0.5);
        globeRef.current.pointOfView({ altitude: newAlt }, 800); // 800ms de transición suave
    };
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Dark Background Overlay */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#020408]/98 backdrop-blur-3xl z-[9998]"
                    />

                    {/* Modal Main Frame */}
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, scale: 0.99, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.99, y: 5 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 md:inset-4 lg:inset-8 z-[9999] flex flex-col md:rounded-[3rem] bg-[#020408] border border-white/5 shadow-2xl overflow-hidden"
                    >
                        {/* SMOKE & MIRRORS: Background placeholder for WebGL boot */}
                        <div
                            className={`absolute inset-0 transition-opacity duration-1000 z-10 ${isGlobeReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                            style={{ background: 'radial-gradient(circle at center, #0B1226 0%, #020408 100%)' }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white/20 text-[9px] font-black uppercase tracking-[1em] font-mono animate-pulse">
                                    Initiating High-Fidelity Render Engine
                                </span>
                            </div>
                        </div>

                        {/* HIGH-TECH HUD (Z-Index 40) */}
                        <div className="absolute top-0 left-0 right-0 p-6 md:p-16 z-40 pointer-events-none flex justify-between items-start">
                            <div className="max-w-xl">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-2 md:gap-4 mb-4 md:mb-8"
                                >
                                    <div className="flex gap-1 md:gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-alfred-lime animate-pulse" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-alfred-lime/20 animate-pulse [animation-delay:0.4s]" />
                                    </div>
                                    <span className="text-alfred-lime/60 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.8em] font-mono">
                                        Mapa interactivo
                                    </span>
                                </motion.div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[0.85] mb-4 md:mb-8 tracking-tighter"
                                >
                                    Red <br />
                                    <span className="text-alfred-lime/90 drop-shadow-[0_0_20px_rgba(180,251,0,0.4)]">Alfred.</span>
                                </motion.h2>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-alfred-lime transition-all pointer-events-auto group shadow-2xl"
                            >
                                <X className="w-5 h-5 md:w-7 md:h-7 text-white group-hover:text-black transition-transform duration-700 group-hover:rotate-180" />
                            </button>
                        </div>

                        {/* WEBGL CANVAS - Cambio a cursor grab/grabbing */}
                        <div className="absolute inset-0 z-20 w-full h-full overflow-hidden cursor-grab active:cursor-grabbing rounded-[inherit]">
                            <Globe
                                ref={globeRef}
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                                backgroundColor="rgba(0,0,0,0)"

                                // Atmosphere System
                                showAtmosphere={true}
                                atmosphereColor="#B4FB00"
                                atmosphereAltitude={0.15}

                                // INSTANCING & PERFORMANCE: Point System
                                pointsData={pointsData}
                                pointLat="lat"
                                pointLng="lng"
                                pointColor={() => '#B4FB00'}
                                pointRadius={(d: any) => d.tier === 1 ? hubScale : pointScale}
                                pointAltitude={0}
                                pointsMerge={true} // MAGIC: 650+ Points in 1 DRAW CALL

                                // HOVER INTERACTION (Solves Data Vomit)
                                pointLabel={(d: any) => `
                                    <div style="background: rgba(2,4,8,0.98); padding: 24px; border: 1px solid rgba(180,251,0,0.4); border-radius: 24px; backdrop-filter: blur(24px); box-shadow: 0 20px 60px rgba(0,0,0,0.9); min-width: 220px;">
                                        <div style="color: #B4FB00; font-family: monospace; font-size: 10px; font-weight: 900; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 12px; opacity: 0.6;">
                                            ${d.hub ? 'Continental Hub' : 'Service Node'}
                                        </div>
                                        <div style="color: white; font-size: 32px; font-weight: 900; letter-spacing: -1.5px; line-height: 1;">
                                            ${d.name}
                                        </div>
                                        <div style="height: 1px; background: linear-gradient(to right, rgba(180,251,0,0.5), transparent); margin: 20px 0;"></div>
                                        <div style="color: rgba(255,255,255,0.4); font-size: 12px; display: flex; align-items: center; gap: 10px; font-weight: 800; letter-spacing: 1px;">
                                            <span style="width: 10px; height: 10px; background: #B4FB00; border-radius: 50%; box-shadow: 0 0 15px #B4FB00;"></span>
                                            ESTADO: OPERACIONAL
                                        </div>
                                    </div>
                                `}

                                // ARC SYSTEM (SCREEN-SPACE CONSISTENCY)
                                arcsData={ARCS_DATA}
                                arcColor="color"
                                arcDashLength={0.4}
                                arcDashGap={4}
                                arcDashAnimateTime={1500}
                                arcStroke={arcStroke} // INVERSE SCALING
                                arcAltitude={0.25}

                                // LABELS - ESTILO GOOGLE MAPS
                                // Si la altitud es menor a 0.8 (estás cerca), muestra todo. Si estás lejos, solo los hubs.
                                labelsData={pointsData.filter(city => {
                                    if (altitude > 1.2) return city.tier === 1; // Muy lejos: Solo Tier 1
                                    if (altitude > 0.5) return city.tier <= 2;  // Medio: Tier 1 y 2
                                    return true;                                // Cerca: Todas
                                })}
                                labelLat="lat"
                                labelLng="lng"
                                labelText="name"
                                // El tamaño del texto se adapta a la altura para no verse gigante
                                labelSize={Math.max(0.4, altitude * 0.35)}
                                labelDotRadius={0} // ¡Esto quita el punto/sombra blanca extra!
                                labelColor={() => 'rgba(255, 255, 255, 0.8)'}
                                labelResolution={3} // Mayor resolución para que las tildes se vean más nítidas

                                // Interaction Logic
                                onZoom={({ altitude }) => setAltitude(altitude)}
                                animateIn={true}
                            />
                            {/* PÍLDORA DE ZOOM (+ / -) */}
                            {/* CAMBIO: right-4 en vez de right-6, y top-[40%] para que no tape los stats en móvil */}
                            <div className="absolute right-4 md:right-12 top-[45%] md:top-1/2 -translate-y-1/2 z-50 flex flex-col items-center bg-white/5 backdrop-blur-xl rounded-full border border-transparent shadow-2xl p-1 pointer-events-auto">
                                <button
                                    onClick={() => handleZoom('in')}
                                    className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-alfred-lime transition-colors duration-300"
                                >
                                    <span className="text-2xl font-light leading-none mt-[-2px]">+</span>
                                </button>
                                <div className="w-4 h-[1px] bg-white/10 my-0.5" />
                                <button
                                    onClick={() => handleZoom('out')}
                                    className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-alfred-lime transition-colors duration-300"
                                >
                                    <span className="text-3xl font-light leading-none mt-[-4px]">-</span>
                                </button>
                            </div>
                        </div>

                        {/* STATS HUD FOOTER - Flex en una sola línea para que quepan los 3 */}
                        <div className="absolute bottom-8 md:bottom-12 left-0 right-0 z-40 pointer-events-none px-6 md:px-16 flex justify-between md:justify-start md:gap-24 w-full">
                            {[
                                { val: "40+", label: "Ciudades" },
                                { val: "650+", label: "Aliados" },
                                { val: "2", label: "Países" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 + i * 0.1, duration: 0.8 }}
                                    className="flex flex-col items-center md:items-start"
                                >
                                    <div className="text-2xl md:text-5xl font-black text-white leading-none mb-1 md:mb-2 tracking-tighter">{stat.val}</div>
                                    <div className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] text-alfred-lime font-black opacity-50">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
