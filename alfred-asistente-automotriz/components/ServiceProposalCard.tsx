'use client';

import React from 'react';
import { MapPin, Car, ArrowRight, Activity } from 'lucide-react';
import { ServiceProposal } from '../types';
import CarBlueprint from './CarBlueprint';

interface ServiceProposalCardProps {
  proposal: ServiceProposal;
}

const ServiceProposalCard: React.FC<ServiceProposalCardProps> = ({ proposal }) => {
  return (
    <div className="mt-6 w-full glass-panel rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-fade-in-up border-t border-white/10">
      
      {/* Header - The Solution */}
      <div className="px-6 py-4 flex justify-between items-center bg-alfred-bg/50 border-b border-white/5">
        <h3 className="text-white font-bold text-lg tracking-wide flex items-center gap-2">
            <Activity size={18} className="text-alfred-lime" />
            Diagnóstico
        </h3>
        <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-alfred-lime animate-pulse"></span>
            <span className="text-[10px] font-mono text-alfred-lime uppercase tracking-widest">
              Solución Lista
            </span>
        </div>
      </div>

      {/* Blueprint Visualization */}
      <div className="relative bg-alfred-bg/30 p-6 flex justify-center border-b border-white/5">
         <CarBlueprint highlight={proposal.affected_area} />
         
         {/* Floating Info */}
         <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md rounded-sm p-3 border-l-2 border-alfred-lime">
            <div className="flex items-center gap-3 text-alfred-text mb-1">
                <Car size={14} className="text-alfred-sub" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase">{proposal.vehicle}</span>
            </div>
            <div className="flex items-center gap-3 text-alfred-sub">
                <MapPin size={14} className="text-alfred-sub" />
                <span className="text-xs font-mono tracking-wider uppercase">{proposal.city}</span>
            </div>
         </div>
      </div>

      {/* Action Area */}
      <div className="p-6 flex flex-col gap-6 bg-gradient-to-b from-alfred-bg/80 to-alfred-bg">
        
        {/* Diagnosis Summary */}
        <div className="flex flex-col gap-2">
             <p className="text-[10px] text-alfred-blue font-mono uppercase tracking-widest">Resumen del Problema</p>
             <p className="text-white text-base font-medium leading-snug border-l-2 border-alfred-blue pl-3 py-1">
                {proposal.repair_summary}
             </p>
        </div>

        {/* Pricing */}
        <div className="py-2 border-t border-white/5 pt-4">
             <p className="text-alfred-sub text-[10px] uppercase tracking-widest mb-1 font-mono">Presupuesto Estimado</p>
             <p className="text-2xl font-mono font-bold text-alfred-lime tracking-tight">
                {proposal.estimated_cost_range}
             </p>
             <p className="text-xs text-alfred-sub mt-1">Estimación para dejarlo como nuevo.</p>
        </div>
        
        {/* CTA Button */}
        <button 
           onClick={() => alert(`Buscando las mejores opciones de taller para ${proposal.vehicle} en ${proposal.city}.`)}
           className="w-full bg-alfred-lime hover:bg-[#a3e600] text-alfred-bg font-bold text-sm uppercase tracking-widest py-4 rounded-sm flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_25px_rgba(180,251,0,0.2)] font-mono"
        >
           Ver Opciones de Taller <ArrowRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default ServiceProposalCard;