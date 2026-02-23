import React, { useMemo } from 'react';
import { ROIState } from '../types';
import { formatCurrency, parseCurrencyInput } from '../utils';
import { Input } from './Input';
import { DollarSign, PiggyBank } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface RoiTabProps {
    roiState: ROIState;
    onRoiChange: (updates: Partial<ROIState>) => void;
    numVehicles: number;
    setNumVehicles: (val: number) => void;
}

export const RoiTab: React.FC<RoiTabProps> = ({ roiState, onRoiChange, numVehicles, setNumVehicles }) => {

    const calculations = useMemo(() => {
        // 1. Annualize Monthly Expenses per Vehicle -> Total Annual Spend
        // Inputs are Monthly Per Vehicle
        const annualPreventivePerVehicle = roiState.preventiveCostPerMonth * 12;
        const annualCorrectivePerVehicle = roiState.correctiveCostPerMonth * 12;

        const totalAnnualPreventive = annualPreventivePerVehicle * numVehicles;
        const totalAnnualCorrective = annualCorrectivePerVehicle * numVehicles;

        const totalCurrentSpendAnnual = totalAnnualPreventive + totalAnnualCorrective;

        // 2. Calculate Annual Savings
        const preventiveSavings = totalAnnualPreventive * 0.10;
        const correctiveSavings = totalAnnualCorrective * 0.20;
        const totalSavings = preventiveSavings + correctiveSavings;

        const totalNewSpendAnnual = totalCurrentSpendAnnual - totalSavings;

        return {
            totalAnnualPreventive,
            totalAnnualCorrective,
            totalCurrentSpendAnnual,
            preventiveSavings,
            correctiveSavings,
            totalSavings,
            totalNewSpendAnnual
        };
    }, [roiState, numVehicles]);

    const chartData = [
        { name: 'Gasto Actual', amount: calculations.totalCurrentSpendAnnual, color: '#64748b' }, // Gray
        { name: 'Gasto con Alfred', amount: calculations.totalNewSpendAnnual, color: '#0096fb' }, // Alfred Blue
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* INPUTS */}
            <div className="lg:col-span-5 space-y-6">
                <div className="bg-alfred-surface/50 p-6 rounded-2xl border border-white/5 shadow-xl">
                    <h3 className="text-xl font-bold text-alfred-blue mb-6 flex items-center gap-2">
                        <DollarSign className="w-5 h-5" /> Datos Actuales
                    </h3>

                    <div className="space-y-5">
                        <Input
                            label="Vehículos en Flota"
                            type="number"
                            min="1"
                            value={numVehicles || ''}
                            onChange={(e) => setNumVehicles(parseInt(e.target.value) || 0)}
                            className="border-alfred-blue/50"
                        />

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-300">Gasto Promedio MENSUAL en Preventivos (por vehículo)</label>
                            <Input
                                label=""
                                type="text"
                                placeholder="$ 0"
                                value={roiState.preventiveCostPerMonth ? formatCurrency(roiState.preventiveCostPerMonth).replace(/\$\s?/, '') : ''}
                                onChange={(e) => {
                                    const val = parseCurrencyInput(e.target.value);
                                    onRoiChange({ preventiveCostPerMonth: val });
                                }}
                            />
                            <p className="text-xs text-gray-500">Se proyecta al año (x12) y se calcula un ahorro del 10%.</p>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-300">Gasto Promedio MENSUAL en Correctivos (por vehículo)</label>
                            <Input
                                label=""
                                type="text"
                                placeholder="$ 0"
                                value={roiState.correctiveCostPerMonth ? formatCurrency(roiState.correctiveCostPerMonth).replace(/\$\s?/, '') : ''}
                                onChange={(e) => {
                                    const val = parseCurrencyInput(e.target.value);
                                    onRoiChange({ correctiveCostPerMonth: val });
                                }}
                            />
                            <p className="text-xs text-gray-500">Se proyecta al año (x12) y se calcula un ahorro del 20%.</p>
                        </div>
                    </div>
                </div>

                {/* Breakdown Card */}
                <div className="bg-alfred-dark/50 p-6 rounded-xl border border-white/5">
                    <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-4">Desglose de Ahorro Anual</h4>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-300">En Preventivos (10%)</span>
                            <span className="text-alfred-lime font-mono">{formatCurrency(calculations.preventiveSavings)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-300">En Correctivos (20%)</span>
                            <span className="text-alfred-lime font-mono">{formatCurrency(calculations.correctiveSavings)}</span>
                        </div>
                        <div className="h-px bg-white/10 my-2"></div>
                        <div className="flex justify-between items-center font-bold">
                            <span className="text-white">Total Ahorrado al Año</span>
                            <span className="text-alfred-lime text-lg">{formatCurrency(calculations.totalSavings)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* OUTPUT / VISUALIZATION */}
            <div className="lg:col-span-7 space-y-8">

                {/* BIG SAVINGS NUMBER */}
                <div className="bg-gradient-to-br from-alfred-surface to-alfred-dark p-8 rounded-2xl border border-alfred-lime/30 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <PiggyBank size={120} className="text-alfred-lime" />
                    </div>

                    <h2 className="text-xl text-gray-300 font-medium mb-2">Ahorro Anual Proyectado</h2>
                    <div className="text-5xl md:text-6xl font-black text-alfred-lime tracking-tight mb-4">
                        {formatCurrency(calculations.totalSavings)}
                    </div>
                    <p className="text-blue-200 max-w-md">
                        Optimizando tu gestión con Alfred, tu empresa podría liberar este capital para reinversión estratégica.
                    </p>
                </div>

                {/* CHART */}
                <div className="bg-alfred-surface/50 p-6 rounded-2xl border border-white/5 h-[300px] flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-4">Comparativa de Costos Anuales</h3>
                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <XAxis type="number" hide />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    width={100}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: '#111e3e', borderColor: '#334155', color: '#fff' }}
                                    formatter={(value: any) => formatCurrency(value as number)}
                                />
                                <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={40}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                        <span className="block text-xs text-red-300 uppercase mb-1">Gasto Actual (Año)</span>
                        <span className="text-xl font-bold text-white">{formatCurrency(calculations.totalCurrentSpendAnnual)}</span>
                    </div>
                    <div className="bg-alfred-blue/10 border border-alfred-blue/20 p-4 rounded-xl">
                        <span className="block text-xs text-blue-300 uppercase mb-1">Gasto Optimizado (Año)</span>
                        <span className="text-xl font-bold text-white">{formatCurrency(calculations.totalNewSpendAnnual)}</span>
                    </div>
                </div>

            </div>
        </div>
    );
};
