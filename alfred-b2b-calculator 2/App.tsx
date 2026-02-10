import React, { useState } from 'react';
import { QuoteTab } from './components/QuoteTab';
import { RoiTab } from './components/RoiTab';
import { QuoteState, TechPlan, PaymentTerm, ContractDuration, ROIState } from './types';
import { Calculator, PieChart } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quote' | 'roi'>('quote');
  const [imgError, setImgError] = useState(false);

  // Shared State
  const [quoteState, setQuoteState] = useState<QuoteState>({
    numVehicles: 20,
    plan: TechPlan.PRO,
    includeInPlant: false,
    numWorkshops: 0,
    paymentTerm: PaymentTerm.NET0_30,
    contractDuration: ContractDuration.NONE,
  });

  const [roiState, setRoiState] = useState<ROIState>({
    preventiveCostPerMonth: 125000, // Monthly default (~1.5M/year)
    correctiveCostPerMonth: 200000, // Monthly default (~2.4M/year)
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
          <div className="flex items-center gap-2">
            {/* Logo Image with Fallback */}
            {!imgError ? (
              <img 
                src="https://i.imgur.com/ajPI5D1.png" 
                alt="Alfred Logo" 
                className="h-10 md:h-12 w-auto object-contain"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="italic font-black text-4xl tracking-tighter text-alfred-lime select-none">
                alfred<sup className="text-sm not-italic font-bold border-2 border-alfred-lime rounded-full w-5 h-5 inline-flex items-center justify-center ml-1 align-top mt-2">R</sup>
              </div>
            )}
          </div>
          <div className="text-sm text-gray-400 hidden sm:block">
            Cotizador & ROI B2B
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TABS */}
        <div className="flex flex-col sm:flex-row justify-center mb-10">
          <div className="bg-alfred-surface p-1 rounded-xl inline-flex shadow-lg border border-white/5">
            <button
              onClick={() => setActiveTab('quote')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${
                activeTab === 'quote'
                  ? 'bg-alfred-blue text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calculator size={18} />
              Cotizador
            </button>
            <button
              onClick={() => setActiveTab('roi')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${
                activeTab === 'roi'
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

      <footer className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Alfred. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default App;