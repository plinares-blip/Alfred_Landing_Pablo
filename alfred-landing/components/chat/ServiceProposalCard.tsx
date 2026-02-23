import React from 'react';
import { ServiceProposal } from './types';
import { MapPin, Car, DollarSign, Wrench } from 'lucide-react';

interface ServiceProposalCardProps {
    proposal: ServiceProposal;
}

const ServiceProposalCard: React.FC<ServiceProposalCardProps> = ({ proposal }) => {
    return (
        <div className="mt-4 bg-alfred-navy/50 backdrop-blur-xl border border-alfred-lime/30 rounded-2xl p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-alfred-lime/20 flex items-center justify-center">
                    <Wrench size={16} className="text-alfred-lime" />
                </div>
                <span className="text-xs font-bold text-alfred-lime uppercase tracking-[0.2em]">Propuesta de Servicio</span>
            </div>

            <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                    <Car size={20} className="text-white/40 mt-1" />
                    <div>
                        <span className="block text-[10px] font-bold text-white/30 uppercase tracking-wider">Vehículo</span>
                        <span className="text-white font-medium">{proposal.vehicle}</span>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                    <MapPin size={20} className="text-white/40 mt-1" />
                    <div>
                        <span className="block text-[10px] font-bold text-white/30 uppercase tracking-wider">Ubicación</span>
                        <span className="text-white font-medium">{proposal.city}</span>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-alfred-lime flex items-center justify-center">
                            <DollarSign size={12} className="text-alfred-navy" />
                        </div>
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold text-white/30 uppercase tracking-wider">Costo Estimado</span>
                        <span className="text-xl font-black text-alfred-lime">{proposal.estimated_cost_range}</span>
                    </div>
                </div>
            </div>

            <button className="w-full mt-6 py-4 bg-alfred-lime text-alfred-navy font-black rounded-xl hover:bg-white transition-colors uppercase tracking-wide text-sm">
                Agendar con Alfred
            </button>
        </div>
    );
};

export default ServiceProposalCard;
