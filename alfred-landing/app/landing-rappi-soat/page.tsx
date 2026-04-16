import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DOWNLOAD_LINK } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Alfred x Rappi | $20.000 OFF en tu Revisión Técnico Mecánica",
    description: "Usa el cupón rappitecno1 y ahorra $20.000 en tu revisión técnico mecánica con Alfred. Descarga la app y redime tu beneficio.",
    robots: { index: false, follow: false },
};

export default function LandingRappiSoat() {
    return (
        <main className="min-h-screen bg-[#0B1226] flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-alfred-lime/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative z-10 max-w-md w-full flex flex-col items-center text-center gap-8">
                {/* Logos */}
                <div className="flex items-center gap-4">
                    <div className="relative w-28 h-10">
                        <Image
                            src="/images/logos/brand/verde degrade.webp"
                            alt="Alfred"
                            fill
                            className="object-contain"
                            sizes="112px"
                            priority
                        />
                    </div>
                    <span className="text-white/30 text-2xl font-light">x</span>
                    <div className="relative w-24 h-10">
                        <Image
                            src="/images/alianzas/Rappi.webp"
                            alt="Rappi"
                            fill
                            className="object-contain"
                            sizes="96px"
                            priority
                        />
                    </div>
                </div>

                {/* Headline */}
                <div>
                    <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-bold mb-3">Beneficio exclusivo</p>
                    <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-alfred-lime to-alfred-green">$20.000 OFF</span>
                        <br />
                        en tu Revisión
                        <br />
                        Técnico Mecánica
                    </h1>
                </div>

                {/* Coupon code */}
                <div className="w-full rounded-2xl border border-alfred-lime/20 bg-alfred-lime/5 p-6 backdrop-blur-sm">
                    <p className="text-white/50 text-sm mb-2">Tu cupón de descuento</p>
                    <div className="bg-[#0B1226] rounded-xl py-4 px-6 border border-white/10">
                        <span className="text-alfred-lime text-3xl md:text-4xl font-black tracking-widest select-all">
                            rappitecno1
                        </span>
                    </div>
                    <p className="text-white/40 text-xs mt-3">Copia el código y redímelo en la app</p>
                </div>

                {/* Steps */}
                <div className="w-full flex flex-col gap-3 text-left">
                    {[
                        { step: "1", text: "Descarga Alfred desde la App Store o Google Play" },
                        { step: "2", text: "Agenda tu Revisión Técnico Mecánica" },
                        { step: "3", text: "Aplica el cupón y ahorra $20.000" },
                    ].map((item) => (
                        <div key={item.step} className="flex items-center gap-4 bg-white/[0.03] rounded-xl p-4 border border-white/5">
                            <div className="w-8 h-8 rounded-lg bg-alfred-lime/10 text-alfred-lime font-black text-sm flex items-center justify-center shrink-0">
                                {item.step}
                            </div>
                            <p className="text-white/70 text-sm font-medium">{item.text}</p>
                        </div>
                    ))}
                </div>

                {/* CTA — Mobile: download button, Desktop: QR + stores */}
                <div className="w-full md:hidden">
                    <Link href={DOWNLOAD_LINK} target="_blank" className="block w-full">
                        <button className="w-full h-16 rounded-xl bg-alfred-lime text-[#0B1226] text-xl font-black shadow-[0_0_40px_rgba(180,251,0,0.3)] hover:shadow-[0_0_60px_rgba(180,251,0,0.5)] hover:bg-white transition-all duration-300">
                            Descargar Alfred
                        </button>
                    </Link>
                    <p className="text-white/30 text-xs text-center mt-3">Disponible en iOS y Android</p>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <div className="relative w-36 h-36 p-2 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(180,251,0,0.1)]">
                        <Image
                            src="/images/qr/codigo.webp"
                            alt="Escanea para descargar Alfred"
                            fill
                            className="object-contain p-2"
                            sizes="144px"
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="text-sm text-white/50 font-bold uppercase tracking-[0.15em]">Escanea y descarga</span>
                        <div className="relative w-48 h-14">
                            <Image
                                src="/images/qr/tienda.webp"
                                alt="App Store & Google Play"
                                fill
                                className="object-contain object-left"
                                sizes="192px"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
