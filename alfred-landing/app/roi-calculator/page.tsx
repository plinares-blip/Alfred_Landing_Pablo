"use client";

import React, { useState } from 'react';
import { QuoteTab } from './components/QuoteTab';
import { RoiTab } from './components/RoiTab';
import { QuoteState, TechPlan, PaymentTerm, ContractDuration, ROIState } from './types';
import { Calculator, PieChart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ROICalculatorPage() {
    const [activeTab, setActiveTab] = useState<'quote' | 'roi'>('roi');

    // Shared State matched to source
    const [quoteState, setQuoteState] = useState<QuoteState>({
        numVehicles: 20,
        plan: TechPlan.PRO,
        includeInPlant: false,
        numWorkshops: 0,
        paymentTerm: PaymentTerm.NET0_30,
        contractDuration: ContractDuration.NONE,
    });

    const [roiState, setRoiState] = useState<ROIState>({
        preventiveCostPerMonth: 125000,
        correctiveCostPerMonth: 200000,
    });

    const handleQuoteChange = (updates: Partial<QuoteState>) => {
        setQuoteState((prev) => ({ ...prev, ...updates }));
    };

    const handleRoiChange = (updates: Partial<ROIState>) => {
        setRoiState((prev) => ({ ...prev, ...updates }));
    };

    return (
        <div className="min-h-screen bg-alfred-dark text-white pb-20">

            {/* HEADER */}
            <header className="bg-alfred-dark/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                            <ArrowLeft size={20} />
                            <span className="hidden sm:inline text-sm font-medium">Volver</span>
                        </Link>
                        <div className="h-6 w-px bg-white/10 hidden sm:block" />
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/images/logos/blanco.png"
                                alt="Alfred Logo"
                                width={120}
                                height={40}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                    </div>
                    <div className="text-sm text-gray-400 hidden sm:block">
                        Cotizador & ROI B2B
                    </div>
                </div>
            </header>

            {/* HERO SECTION */}
            <div className="bg-gradient-to-b from-alfred-navy/50 to-transparent py-12 mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                        Calcula tu <span className="text-alfred-lime">Ahorro Real</span>
                    </h1>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Descubre cuánto puedes optimizar tu operación de flota con Alfred.
                        Sin compromiso, resultados instantáneos.
                    </p>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* TABS (Updated to match source aesthetics) */}
                <div className="flex flex-col sm:flex-row justify-center mb-10">
                    <div className="bg-alfred-surface p-1 rounded-xl inline-flex shadow-lg border border-white/5">
                        <button
                            onClick={() => setActiveTab('quote')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${activeTab === 'quote'
                                ? 'bg-alfred-blue text-white shadow-md'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Calculator size={18} />
                            Cotizador
                        </button>
                        <button
                            onClick={() => setActiveTab('roi')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${activeTab === 'roi'
                                ? 'bg-alfred-blue text-white shadow-md'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <PieChart size={18} />
                            Ahorro en Mantenimientos
                        </button>
                    </div>
                </div>

                {/* TAB CONTENT */}
                <div className="animate-fade-in">
                    {activeTab === 'quote' ? (
                        <QuoteTab state={quoteState} onChange={handleQuoteChange} />
                    ) : (
                        <RoiTab
                            roiState={roiState}
                            onRoiChange={handleRoiChange}
                            numVehicles={quoteState.numVehicles}
                            setNumVehicles={(n) => handleQuoteChange({ numVehicles: n })}
                        />
                    )}
                </div>

            </main>

            <footer className="max-w-7xl mx-auto px-6 py-12 text-center text-gray-600 text-sm mt-12">
                <div className="flex justify-center gap-6 mb-4">
                    <Link href="/" className="text-white/40 hover:text-alfred-lime transition-colors">
                        Inicio
                    </Link>
                    <Link href="/#convenios" className="text-white/40 hover:text-alfred-lime transition-colors">
                        Estrategias B2B
                    </Link>
                    <Link href="/#nosotros" className="text-white/40 hover:text-alfred-lime transition-colors">
                        ADN
                    </Link>
                </div>
                &copy; {new Date().getFullYear()} Alfred. Todos los derechos reservados.
            </footer>
        </div>
    );
}
