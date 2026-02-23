import React, { useMemo } from 'react';
import { QuoteState, TechPlan, PaymentTerm, ContractDuration } from '../types';
import { formatCurrency } from '../utils';
import { Input } from './Input';
import {
    Info,
    Truck,
    Wrench,
    CreditCard,
    Box,
    Check,
    CheckCircle2,
    Crown,
    Star,
    Layers,
    Zap,
    TrendingUp
} from 'lucide-react';

interface QuoteTabProps {
    state: QuoteState;
    onChange: (updates: Partial<QuoteState>) => void;
}

export const QuoteTab: React.FC<QuoteTabProps> = ({ state, onChange }) => {

    // --- LOGIC ---

    const getRangeIndex = (vehicles: number) => {
        if (vehicles <= 50) return 0;
        if (vehicles <= 100) return 1;
        if (vehicles <= 200) return 2;
        return 3;
    };

    const calculateCosts = () => {
        let fixedLicense = 0;
        const rangeIndex = getRangeIndex(state.numVehicles);

        // 1. Fixed License (Gestión y Administración)
        if (state.includeInPlant) {
            fixedLicense = 4500000;
        } else {
            const licenseTiers = [500000, 1000000, 2000000, 3000000];
            fixedLicense = licenseTiers[rangeIndex];
        }

        // 2. Variable Tech Cost (Base Unit Price)
        let baseUnitPrice = 0;
        if (state.plan === TechPlan.BASIC) {
            baseUnitPrice = 0;
        } else if (state.plan === TechPlan.PRO) {
            const prices = [40000, 35000, 30000, 25000];
            baseUnitPrice = prices[rangeIndex];
        } else if (state.plan === TechPlan.ENTERPRISE) {
            const prices = [70000, 60000, 45000, 35000];
            baseUnitPrice = prices[rangeIndex];
        }

        // Anchor Pricing Logic
        let unitPriceMultiplier = 1.05; // Default "Inflated" price (None selected)
        let discountLabel = "";
        let isDiscounted = false;

        if (state.contractDuration === ContractDuration.ONE_YEAR) {
            unitPriceMultiplier = 1.0; // Standard Price (5% savings vs inflated)
            discountLabel = "Ahorro contrato 1 año (5%)";
            isDiscounted = true;
        } else if (state.contractDuration === ContractDuration.TWO_YEARS) {
            unitPriceMultiplier = 0.85; // 15% Discount on Standard
            discountLabel = "Ahorro contrato 2 años (15%)";
            isDiscounted = true;
        } else if (state.contractDuration === ContractDuration.THREE_YEARS) {
            unitPriceMultiplier = 0.80; // 20% Discount on Standard
            discountLabel = "Ahorro contrato 3 años (20%)";
            isDiscounted = true;
        }

        const finalUnitPrice = baseUnitPrice * unitPriceMultiplier;
        const variableCost = state.numVehicles * finalUnitPrice;

        // 3. Workshops
        const workshopCost = state.numWorkshops * 300000;

        // Total Monthly Calculation (Excluding One-time Setup)
        const subtotal = fixedLicense + variableCost + workshopCost;
        const finalTotalBeforeSurcharge = subtotal;

        // 4. Financial Surcharge (31-60 days)
        let financialSurcharge = 0;
        if (state.paymentTerm === PaymentTerm.NET31_60) {
            financialSurcharge = finalTotalBeforeSurcharge * 0.025;
        }

        const finalTotal = finalTotalBeforeSurcharge + financialSurcharge;
        const Inversion_Anual_Total = finalTotal * 12;

        // 5. Setup Fee (Enterprise Only)
        const setupFee = state.plan === TechPlan.ENTERPRISE ? 3000000 : 0;

        // --- PROJECTED ANNUAL SAVINGS CALCULATION (TARGET RATIO APPROACH) ---
        // Inputs
        const N = state.numVehicles > 0 ? state.numVehicles : 1;
        const T = state.numWorkshops;
        const Plan = state.plan;
        const I = state.includeInPlant ? 1 : 0;

        // 1. Base Ratio by Plan
        let Base = 0.26;
        if (Plan === TechPlan.PRO) Base = 0.20;
        if (Plan === TechPlan.ENTERPRISE) Base = 0.15;

        // 2. Adjustments
        const valN = Math.max(1, N);
        const Adj_N = (0.03 * Math.log10(valN)) - (0.03 * Math.log10(20));
        const rT = Math.min(1, T / 3);
        const Adj_T = 0.02 * rT;
        const Adj_I = 0.02 * I;

        // 3. Calculate Target Ratio
        let Ratio_Objetivo = Base - Adj_N - Adj_T - Adj_I;

        // 4. Clamp Ratio (10% - 30%)
        Ratio_Objetivo = Math.min(0.30, Math.max(0.10, Ratio_Objetivo));

        // 5. Calculate Final Values
        let projectedAnnualSavings = 0;
        let investmentPercentage = 0;

        if (Inversion_Anual_Total > 0) {
            projectedAnnualSavings = Inversion_Anual_Total / Ratio_Objetivo;
            investmentPercentage = Math.round((Inversion_Anual_Total / projectedAnnualSavings) * 100);
        }

        return {
            fixedLicense,
            baseUnitPrice,
            finalUnitPrice,
            variableCost,
            workshopCost,
            setupFee,
            financialSurcharge,
            finalTotal,
            discountLabel,
            isDiscounted,
            projectedAnnualSavings,
            investmentPercentage
        };
    };

    const costs = useMemo(() => calculateCosts(), [state]);

    const PLAN_CARDS = [
        {
            id: TechPlan.BASIC,
            title: "Gestión y Admin. de Flota",
            level: "Nivel 1",
            subtitle: "GESTIÓN ESENCIAL",
            icon: Layers,
            features: [
                "Mi Garaje",
                "Solicitar Servicio",
                "Mis Servicios"
            ],
            containerClass: "border-slate-200/20 bg-slate-900/10 hover:bg-slate-900/20",
            selectedClass: "border-slate-300 bg-slate-900/30 shadow-slate-900/20",
            iconColor: "text-slate-200",
            iconBg: "bg-slate-400/10",
            badgeClass: "bg-slate-500/20 text-slate-200",
            buttonBg: "bg-slate-600 hover:bg-slate-500 text-white",
            textMuted: "text-slate-200/60",
            textHighlight: "text-slate-100",
        },
        {
            id: TechPlan.PRO,
            title: "Plan Pro",
            level: "Nivel 2",
            subtitle: "PREVENCIÓN ACTIVA",
            icon: Zap,
            includesPrev: "Incluye todo lo del Básico +",
            features: [
                "Guantera Virtual",
                "Multas y Vencimientos",
                "Mapa en vivo",
                "Planes de Mantenimiento",
                "Dashboards Estándar"
            ],
            containerClass: "border-sky-200/20 bg-sky-900/10 hover:bg-sky-900/20",
            selectedClass: "border-sky-300 bg-sky-900/30 shadow-sky-900/20",
            iconColor: "text-sky-200",
            iconBg: "bg-sky-400/10",
            badgeClass: "bg-sky-500/20 text-sky-200",
            buttonBg: "bg-sky-600 hover:bg-sky-500 text-white",
            textMuted: "text-sky-200/60",
            textHighlight: "text-sky-100",
        },
        {
            id: TechPlan.ENTERPRISE,
            title: "Enterprise",
            level: "Nivel 3",
            subtitle: "INTELIGENCIA TOTAL",
            icon: Crown,
            includesPrev: "Incluye todo lo del Pro +",
            features: [
                "Inspecciones Vehiculares",
                "Dashboards Personalizados"
            ],
            containerClass: "border-orange-200/20 bg-orange-900/10 hover:bg-orange-900/20",
            selectedClass: "border-orange-200/60 bg-orange-900/30 shadow-orange-900/20",
            iconColor: "text-orange-200",
            iconBg: "bg-orange-400/10",
            badgeClass: "bg-orange-500/20 text-orange-200",
            buttonBg: "bg-orange-600 hover:bg-orange-500 text-white",
            textMuted: "text-orange-200/60",
            textHighlight: "text-orange-100",
        }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* LEFT COLUMN: INPUTS */}
            <div className="lg:col-span-7 space-y-8">

                {/* FLEET CONFIGURATION */}
                <div className="bg-alfred-surface/50 p-6 rounded-2xl border border-white/5 shadow-xl">
                    <h3 className="text-xl font-bold text-alfred-blue mb-6 flex items-center gap-2">
                        <Truck className="w-5 h-5" /> Configuración de Flota
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <Input
                            label="Número de Vehículos"
                            type="number"
                            min="1"
                            value={state.numVehicles || ''}
                            onChange={(e) => onChange({ numVehicles: parseInt(e.target.value) || 0 })}
                        />

                        <Input
                            label="Talleres Propios"
                            suffix="Talleres"
                            type="number"
                            min="0"
                            value={state.numWorkshops}
                            onChange={(e) => onChange({ numWorkshops: parseInt(e.target.value) || 0 })}
                            placeholder="0"
                        />
                    </div>

                    {/* NEW PLAN SELECTION CARDS */}
                    <div className="mb-8">
                        <label className="text-sm font-semibold text-gray-300 mb-4 block">Nivel de Tecnología</label>
                        <div className="grid grid-cols-1 gap-5">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {PLAN_CARDS.map((plan) => {
                                    const isSelected = state.plan === plan.id;
                                    const Icon = plan.icon;

                                    return (
                                        <div
                                            key={plan.id}
                                            onClick={() => onChange({ plan: plan.id })}
                                            className={`
                        relative group rounded-xl cursor-pointer transition-all duration-300 flex flex-col h-full overflow-hidden
                        border
                        ${isSelected ? plan.selectedClass : plan.containerClass}
                      `}
                                        >
                                            {/* Selection Checkmark */}
                                            {isSelected && (
                                                <div className={`absolute top-3 right-3 p-1 rounded-full ${plan.buttonBg} shadow-sm z-10`}>
                                                    <Check size={12} strokeWidth={3} />
                                                </div>
                                            )}

                                            <div className="p-4 flex flex-col h-full">
                                                {/* Header */}
                                                <div className="flex flex-col gap-2 mb-3">
                                                    {/* Level Badge */}
                                                    <div className={`self-start px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${plan.badgeClass}`}>
                                                        {plan.level}
                                                    </div>

                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Icon size={18} className={plan.iconColor} />
                                                        <h4 className={`text-base font-bold leading-tight ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                                                            {plan.title}
                                                        </h4>
                                                    </div>

                                                    <p className={`text-xs ${plan.textMuted}`}>
                                                        {plan.subtitle}
                                                    </p>
                                                </div>

                                                {/* Divider */}
                                                <div className={`h-px w-full my-2 ${isSelected ? 'bg-white/10' : 'bg-white/5'}`}></div>

                                                {/* Features */}
                                                <div className="flex-grow space-y-2">
                                                    {plan.includesPrev && (
                                                        <div className={`text-[10px] font-semibold italic mb-1 ${plan.textMuted}`}>
                                                            {plan.includesPrev}
                                                        </div>
                                                    )}
                                                    <ul className="space-y-1.5">
                                                        {plan.features.map((feature, idx) => (
                                                            <li key={idx} className="flex items-start gap-2">
                                                                <CheckCircle2
                                                                    size={12}
                                                                    className={`shrink-0 mt-0.5 ${plan.iconColor}`}
                                                                />
                                                                <span className={`text-[11px] leading-tight ${isSelected ? plan.textHighlight : 'text-gray-400'}`}>
                                                                    {feature}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Button Visual */}
                                                <div className={`mt-4 text-center py-1.5 rounded text-xs font-semibold transition-all ${isSelected
                                                    ? plan.buttonBg
                                                    : 'bg-white/5 text-gray-500 group-hover:bg-white/10'
                                                    }`}>
                                                    {isSelected ? 'Seleccionado' : 'Elegir'}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <div className="bg-alfred-dark/50 p-4 rounded-xl border border-white/5 flex items-center justify-between group hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${state.includeInPlant ? 'bg-alfred-lime/20 text-alfred-lime' : 'bg-white/5 text-gray-500'}`}>
                                    <Truck size={20} />
                                </div>
                                <div>
                                    <span className={`font-semibold block transition-colors ${state.includeInPlant ? 'text-white' : 'text-gray-400'}`}>
                                        ¿Incluir Asesor In-Plant?
                                    </span>
                                    <span className="text-xs text-gray-500">Experto dedicado en tus instalaciones.</span>
                                </div>
                            </div>
                            <button
                                onClick={() => onChange({ includeInPlant: !state.includeInPlant })}
                                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${state.includeInPlant ? 'bg-alfred-lime' : 'bg-gray-700'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${state.includeInPlant ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-alfred-surface/50 p-6 rounded-2xl border border-white/5 shadow-xl">
                    <h3 className="text-xl font-bold text-alfred-blue mb-6 flex items-center gap-2">
                        <CreditCard className="w-5 h-5" /> Condiciones Comerciales
                    </h3>

                    <div className="space-y-8">
                        {/* PAYMENT TERM: SEGMENTED CONTROL */}
                        <div className="flex flex-col gap-4">
                            <label className="text-sm font-semibold text-gray-300">Plazo de Pago</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-1 bg-alfred-dark rounded-xl border border-white/5">
                                {/* Option A: Standard */}
                                <button
                                    onClick={() => onChange({ paymentTerm: PaymentTerm.NET0_30 })}
                                    className={`relative flex flex-col items-start p-4 rounded-lg transition-all duration-300 overflow-hidden ${state.paymentTerm === PaymentTerm.NET0_30
                                        ? 'bg-alfred-lime text-alfred-dark shadow-lg shadow-alfred-lime/20'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-sm">Pago Estándar (0-30 días)</span>
                                        {state.paymentTerm === PaymentTerm.NET0_30 && <Check size={14} strokeWidth={3} />}
                                    </div>
                                    <span className={`text-[10px] uppercase tracking-wider font-semibold ${state.paymentTerm === PaymentTerm.NET0_30 ? 'text-alfred-dark/70' : 'text-gray-500'}`}>
                                        Sin recargo
                                    </span>
                                </button>

                                {/* Option B: Extended */}
                                <button
                                    onClick={() => onChange({ paymentTerm: PaymentTerm.NET31_60 })}
                                    className={`relative flex flex-col items-start p-4 rounded-lg transition-all duration-300 overflow-hidden ${state.paymentTerm === PaymentTerm.NET31_60
                                        ? 'bg-white text-alfred-dark shadow-lg'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-sm">Pago Extendido (31-60 días)</span>
                                    </div>
                                    <span className={`text-[10px] uppercase tracking-wider font-semibold ${state.paymentTerm === PaymentTerm.NET31_60 ? 'text-red-600' : 'text-gray-500'}`}>
                                        +2.5% Recargo Financiero
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* CONTRACT DURATION: "VALUE BUTTONS" ROW */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-semibold text-gray-300">Duración Contrato</label>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-alfred-lime uppercase tracking-widest bg-alfred-lime/10 px-2 py-1 rounded">
                                    <Zap size={10} /> Time is Money
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { id: ContractDuration.ONE_YEAR, label: '1 Año', reward: 'Ahorro 5%', size: 'text-xs' },
                                    { id: ContractDuration.TWO_YEARS, label: '2 Años', reward: 'AHORRA 15%', size: 'text-sm', recommended: true },
                                    { id: ContractDuration.THREE_YEARS, label: '3 Años', reward: 'AHORRA 20%', size: 'text-lg' },
                                ].map((opt) => {
                                    const isSelected = state.contractDuration === opt.id;
                                    return (
                                        <button
                                            key={opt.id}
                                            onClick={() => onChange({ contractDuration: opt.id })}
                                            className={`relative flex flex-col items-center justify-center py-6 px-4 rounded-xl border transition-all duration-300 group gap-1 ${isSelected
                                                ? 'bg-alfred-lime border-alfred-lime shadow-[0_0_25px_rgba(180,251,0,0.3)] scale-[1.02]'
                                                : 'bg-transparent border-white/10 hover:border-white/30'
                                                }`}
                                        >
                                            {opt.recommended && (
                                                <div className="absolute -top-2 px-3 py-1 bg-alfred-blue text-[9px] font-black uppercase text-white rounded-full tracking-wider shadow-lg">
                                                    Mejor Valor
                                                </div>
                                            )}
                                            <span className={`text-sm font-bold tracking-tight uppercase ${isSelected ? 'text-alfred-dark' : 'text-white'}`}>
                                                {opt.label}
                                            </span>
                                            <span className={`font-black tracking-tighter ${opt.size} ${isSelected ? 'text-alfred-dark' : 'text-alfred-lime'}`}>
                                                {opt.reward}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: OUTPUT */}
            <div className="lg:col-span-5">
                <div className="sticky top-8 bg-alfred-surface border-t-4 border-alfred-lime rounded-2xl shadow-2xl p-6 lg:p-8 space-y-6">
                    <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Resumen de Inversión</h2>

                    <div className="space-y-4">
                        {/* Fixed License */}
                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-blue-500/10 rounded-lg text-alfred-blue">
                                    <Wrench size={16} />
                                </div>
                                <span className="text-gray-300 text-sm md:text-base">Gestión y Admin. de Flota</span>
                            </div>
                            <span className="font-semibold text-white">{formatCurrency(costs.fixedLicense)}</span>
                        </div>

                        {/* Variable Tech */}
                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-blue-500/10 rounded-lg text-alfred-blue">
                                    <Truck size={16} />
                                </div>
                                <div>
                                    <span className="text-gray-300 block text-sm md:text-base">Tecnología Flota</span>
                                    <span className="text-xs text-gray-500">
                                        {state.numVehicles} veh. x {formatCurrency(costs.finalUnitPrice)}
                                    </span>
                                </div>
                            </div>
                            <span className="font-semibold text-white">{formatCurrency(costs.variableCost)}</span>
                        </div>

                        {/* Workshops */}
                        {state.numWorkshops > 0 && (
                            <div className="flex justify-between items-center py-3 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-blue-500/10 rounded-lg text-alfred-blue">
                                        <Wrench size={16} />
                                    </div>
                                    <div>
                                        <span className="text-gray-300 block text-sm md:text-base">Módulos Taller</span>
                                        <span className="text-xs text-gray-500">{state.numWorkshops} talleres</span>
                                    </div>
                                </div>
                                <span className="font-semibold text-white">{formatCurrency(costs.workshopCost)}</span>
                            </div>
                        )}

                        {/* Setup Fee (Only Enterprise) */}
                        {costs.setupFee > 0 && (
                            <div className="flex justify-between items-center py-3 border-b border-white/10 bg-alfred-lime/5 rounded px-2 -mx-2">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-alfred-lime/20 rounded-lg text-alfred-lime">
                                        <Box size={16} />
                                    </div>
                                    <div>
                                        <span className="text-alfred-lime block text-sm md:text-base font-semibold">Setup / Implementación</span>
                                        <span className="text-xs text-gray-400">Pago único</span>
                                    </div>
                                </div>
                                <span className="font-bold text-alfred-lime">{formatCurrency(costs.setupFee)}</span>
                            </div>
                        )}

                        {/* Discount Visual */}
                        {costs.isDiscounted && (
                            <div className="bg-alfred-dark/40 rounded-lg p-3 space-y-2 mt-2">
                                <div className="flex justify-between text-sm text-alfred-lime font-bold">
                                    <span>{costs.discountLabel}</span>
                                    <span>Aplicado en tarifa</span>
                                </div>
                            </div>
                        )}

                        {/* Financial Surcharge (Mathematical Line) */}
                        {costs.financialSurcharge > 0 && (
                            <div className="flex justify-between items-center py-3 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-red-500/10 rounded-lg text-red-400">
                                        <CreditCard size={16} />
                                    </div>
                                    <span className="text-red-400/80 text-sm md:text-base">Recargo Financiero (2.5%)</span>
                                </div>
                                <span className="font-semibold text-red-400">+{formatCurrency(costs.financialSurcharge)}</span>
                            </div>
                        )}

                        {/* Impacto Financiero */}
                        <div className="mt-4 p-5 rounded-xl bg-gradient-to-br from-emerald-900/20 to-transparent border border-emerald-500/30 relative overflow-hidden">
                            <div className="absolute top-2 right-2 p-2 opacity-10">
                                <TrendingUp size={48} className="text-emerald-400" />
                            </div>

                            <h3 className="text-emerald-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2">
                                Impacto Financiero Proyectado
                            </h3>

                            <div className="text-2xl md:text-3xl font-black text-white mb-3">
                                {formatCurrency(costs.projectedAnnualSavings)}
                                <span className="text-sm font-medium text-gray-400 ml-1">/año</span>
                            </div>

                            <p className="text-xs text-gray-400 leading-relaxed max-w-[95%]">
                                Este sistema tiene un potencial de generar este ahorro anual. Su inversión representa aprox. el <span className="text-emerald-400 font-bold">{costs.investmentPercentage}%</span> del beneficio total proyectado.
                            </p>
                        </div>

                    </div>

                    <div className="pt-4 mt-4 border-t border-white/10">
                        <span className="block text-sm text-gray-400 uppercase tracking-widest mb-1">Total Mensual</span>
                        <div className="text-4xl md:text-5xl font-black text-alfred-lime truncate">
                            {formatCurrency(costs.finalTotal)}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">* Valores antes de IVA</p>
                    </div>

                    <div className="bg-alfred-blue/10 border border-alfred-blue/20 rounded-xl p-4 flex gap-3">
                        <Info className="text-alfred-blue shrink-0 mt-0.5" size={20} />
                        <p className="text-sm text-blue-100">
                            {state.includeInPlant
                                ? "Incluye Asesor In-Plant dedicado para optimizar la gestión de tu flota."
                                : "Plan estándar con soporte remoto. Considera agregar un asesor In-Plant para flotas grandes."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
