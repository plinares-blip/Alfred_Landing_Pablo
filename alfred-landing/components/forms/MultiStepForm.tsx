'use client';

import { useState, createContext, useContext, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Multi-Step Form Component
 *
 * Reusable multi-step form with:
 * - Progress indicator
 * - Step navigation
 * - Form validation
 * - Excellent microcopy
 *
 * Used by: Empresas, Talleres, Alianzas forms
 */

// Form Context
interface FormContextType {
    currentStep: number;
    totalSteps: number;
    formData: Record<string, unknown>;
    updateFormData: (data: Record<string, unknown>) => void;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    isFirstStep: boolean;
    isLastStep: boolean;
    isSubmitting: boolean;
}

const FormContext = createContext<FormContextType | null>(null);

export function useMultiStepForm() {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useMultiStepForm must be used within a MultiStepForm');
    }
    return context;
}

// Types
interface StepConfig {
    id: string;
    title: string;
    description?: string;
}

interface MultiStepFormProps {
    steps: StepConfig[];
    children: ReactNode[];
    onSubmit: (data: Record<string, unknown>) => Promise<void>;
    initialData?: Record<string, unknown>;
    className?: string;
}

export function MultiStepForm({
    steps,
    children,
    onSubmit,
    initialData = {},
    className = '',
}: MultiStepFormProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, unknown>>(initialData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const totalSteps = steps.length;
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === totalSteps - 1;

    const updateFormData = (data: Record<string, unknown>) => {
        setFormData((prev) => ({ ...prev, ...data }));
    };

    const nextStep = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const goToStep = (step: number) => {
        if (step >= 0 && step < totalSteps) {
            setCurrentStep(step);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
        } finally {
            setIsSubmitting(false);
        }
    };

    const currentStepConfig = steps[currentStep];

    return (
        <FormContext.Provider
            value={{
                currentStep,
                totalSteps,
                formData,
                updateFormData,
                nextStep,
                prevStep,
                goToStep,
                isFirstStep,
                isLastStep,
                isSubmitting,
            }}
        >
            <div className={cn('', className)}>
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                <div
                                    className={cn(
                                        'flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all',
                                        index < currentStep
                                            ? 'bg-alfred-lime text-alfred-navy'
                                            : index === currentStep
                                                ? 'bg-alfred-lime text-alfred-navy ring-4 ring-alfred-lime/30'
                                                : 'bg-white/10 text-white/50'
                                    )}
                                >
                                    {index < currentStep ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        index + 1
                                    )}
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={cn(
                                            'hidden sm:block w-12 md:w-20 lg:w-32 h-1 mx-2',
                                            index < currentStep ? 'bg-alfred-lime' : 'bg-white/10'
                                        )}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step Title */}
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-white">{currentStepConfig.title}</h3>
                        {currentStepConfig.description && (
                            <p className="text-white/60 text-sm mt-1">{currentStepConfig.description}</p>
                        )}
                    </div>
                </div>

                {/* Step Content */}
                <div className="mb-8">{children[currentStep]}</div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div>
                        {!isFirstStep && (
                            <button
                                onClick={prevStep}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Anterior
                            </button>
                        )}
                    </div>

                    <div className="text-white/40 text-sm">
                        Paso {currentStep + 1} de {totalSteps}
                    </div>

                    <div>
                        {isLastStep ? (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-alfred-lime text-alfred-navy font-bold hover:bg-white transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Enviando...
                                    </>
                                ) : (
                                    'Enviar'
                                )}
                            </button>
                        ) : (
                            <button
                                onClick={nextStep}
                                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-alfred-lime text-alfred-navy font-bold hover:bg-white transition-all"
                            >
                                Siguiente
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </FormContext.Provider>
    );
}

/**
 * Form Field Components
 */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    hint?: string;
}

export function FormInput({ label, error, hint, className = '', ...props }: InputProps) {
    return (
        <div className={cn('', className)}>
            <label className="block text-sm font-medium text-white mb-2">{label}</label>
            <input
                {...props}
                className={cn(
                    'w-full px-4 py-3 rounded-xl',
                    'bg-white/5 border border-white/20',
                    'text-white placeholder-white/40',
                    'focus:outline-none focus:border-alfred-lime focus:ring-2 focus:ring-alfred-lime/20',
                    'transition-colors',
                    error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                )}
            />
            {hint && !error && <p className="mt-1 text-xs text-white/50">{hint}</p>}
            {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
        </div>
    );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
    hint?: string;
}

export function FormTextarea({ label, error, hint, className = '', ...props }: TextareaProps) {
    return (
        <div className={cn('', className)}>
            <label className="block text-sm font-medium text-white mb-2">{label}</label>
            <textarea
                {...props}
                className={cn(
                    'w-full px-4 py-3 rounded-xl resize-none',
                    'bg-white/5 border border-white/20',
                    'text-white placeholder-white/40',
                    'focus:outline-none focus:border-alfred-lime focus:ring-2 focus:ring-alfred-lime/20',
                    'transition-colors',
                    error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                )}
            />
            {hint && !error && <p className="mt-1 text-xs text-white/50">{hint}</p>}
            {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
        </div>
    );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: { value: string; label: string }[];
    error?: string;
    hint?: string;
}

export function FormSelect({ label, options, error, hint, className = '', ...props }: SelectProps) {
    return (
        <div className={cn('', className)}>
            <label className="block text-sm font-medium text-white mb-2">{label}</label>
            <select
                {...props}
                className={cn(
                    'w-full px-4 py-3 rounded-xl appearance-none',
                    'bg-white/5 border border-white/20',
                    'text-white',
                    'focus:outline-none focus:border-alfred-lime focus:ring-2 focus:ring-alfred-lime/20',
                    'transition-colors cursor-pointer',
                    error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                )}
            >
                <option value="" className="bg-alfred-navy">
                    Selecciona una opción
                </option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-alfred-navy">
                        {opt.label}
                    </option>
                ))}
            </select>
            {hint && !error && <p className="mt-1 text-xs text-white/50">{hint}</p>}
            {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
        </div>
    );
}

export default MultiStepForm;
