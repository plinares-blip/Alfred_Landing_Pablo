'use client';

import { useState } from 'react';
import { MultiStepForm, FormInput, FormSelect, FormTextarea, useMultiStepForm } from '@/components/forms/MultiStepForm';
import { getUTMParams, trackFormStart, trackFormSubmit } from '@/lib/analytics';

/**
 * Alianzas Lead Form (B2B2C Partners)
 *
 * Sandler-style qualification:
 * 1. Partner Info
 * 2. Opportunity Details (users/vehicles exposed)
 * 3. Pain & Decision Process
 * 4. Contact
 */

const steps = [
    { id: 'partner', title: 'Tu organización', description: 'Información básica' },
    { id: 'opportunity', title: 'La oportunidad', description: 'Usuarios y alcance' },
    { id: 'decision', title: 'Proceso de decisión', description: 'Timeline y contexto' },
    { id: 'contact', title: 'Contacto', description: 'Cómo te contactamos' },
];

interface AlianzasFormProps {
    onSuccess: () => void;
}

export function AlianzasForm({ onSuccess }: AlianzasFormProps) {
    const [hasTrackedStart, setHasTrackedStart] = useState(false);

    const handleFormFocus = () => {
        if (!hasTrackedStart) {
            trackFormStart('alianzas');
            setHasTrackedStart(true);
        }
    };

    const handleSubmit = async (data: Record<string, unknown>) => {
        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    segment: 'alianzas',
                    formData: data,
                    metadata: {
                        source: window.location.href,
                        utmParams: getUTMParams(),
                        userAgent: navigator.userAgent,
                    },
                }),
            });

            if (response.ok) {
                trackFormSubmit('alianzas', { exposedUsers: data.exposedUsers as string });
                onSuccess();
            }
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    return (
        <div onFocus={handleFormFocus}>
            <MultiStepForm steps={steps} onSubmit={handleSubmit}>
                <Step1Partner />
                <Step2Opportunity />
                <Step3Decision />
                <Step4Contact />
            </MultiStepForm>
        </div>
    );
}

// Step 1: Partner Information
function Step1Partner() {
    const { formData, updateFormData } = useMultiStepForm();

    return (
        <div className="space-y-6">
            <FormInput
                label="Nombre de la organización"
                placeholder="Ej: Aseguradora ABC"
                value={(formData.organizationName as string) || ''}
                onChange={(e) => updateFormData({ organizationName: e.target.value })}
                required
            />

            <FormSelect
                label="Tipo de organización"
                value={(formData.orgType as string) || ''}
                onChange={(e) => updateFormData({ orgType: e.target.value })}
                options={[
                    { value: 'aseguradora', label: 'Aseguradora' },
                    { value: 'banco', label: 'Banco / Entidad financiera' },
                    { value: 'leasing', label: 'Leasing / Renting' },
                    { value: 'corporativo', label: 'Corporativo con empleados' },
                    { value: 'otro', label: 'Otro' },
                ]}
            />

            <FormSelect
                label="País de operación"
                value={(formData.country as string) || ''}
                onChange={(e) => updateFormData({ country: e.target.value })}
                options={[
                    { value: 'colombia', label: 'Colombia' },
                    { value: 'mexico', label: 'México (próximamente)' },
                    { value: 'otro', label: 'Otro país' },
                ]}
                hint="Actualmente solo operamos en Colombia. México viene pronto."
            />
        </div>
    );
}

// Step 2: Opportunity Details
function Step2Opportunity() {
    const { formData, updateFormData } = useMultiStepForm();

    return (
        <div className="space-y-6">
            <FormSelect
                label="¿Cuántos usuarios/vehículos podrían acceder al beneficio?"
                value={(formData.exposedUsers as string) || ''}
                onChange={(e) => updateFormData({ exposedUsers: e.target.value })}
                options={[
                    { value: '<5000', label: 'Menos de 5,000' },
                    { value: '5000-10000', label: '5,000 - 10,000' },
                    { value: '10000-50000', label: '10,000 - 50,000' },
                    { value: '50000-100000', label: '50,000 - 100,000' },
                    { value: '100000+', label: 'Más de 100,000' },
                ]}
                hint="Usuarios finales o vehículos asegurados/financiados"
            />

            <FormTextarea
                label="¿Qué beneficios buscas ofrecer a tus usuarios?"
                placeholder="Ej: Descuentos en mantenimiento, servicios incluidos, asistencia..."
                value={(formData.desiredBenefits as string) || ''}
                onChange={(e) => updateFormData({ desiredBenefits: e.target.value })}
                rows={3}
            />

            <FormSelect
                label="¿Tienen algún programa de beneficios de movilidad actualmente?"
                value={(formData.currentProgram as string) || ''}
                onChange={(e) => updateFormData({ currentProgram: e.target.value })}
                options={[
                    { value: 'no', label: 'No, sería nuevo' },
                    { value: 'si-otro', label: 'Sí, con otro proveedor' },
                    { value: 'si-directo', label: 'Sí, lo gestionamos internamente' },
                ]}
            />
        </div>
    );
}

// Step 3: Decision Process
function Step3Decision() {
    const { formData, updateFormData } = useMultiStepForm();

    return (
        <div className="space-y-6">
            <FormTextarea
                label="¿Qué problema o necesidad buscan resolver con esta alianza?"
                placeholder="Cuéntanos el contexto..."
                value={(formData.painPoint as string) || ''}
                onChange={(e) => updateFormData({ painPoint: e.target.value })}
                rows={3}
            />

            <FormSelect
                label="¿Cuál es el timeline para implementar?"
                value={(formData.timeline as string) || ''}
                onChange={(e) => updateFormData({ timeline: e.target.value })}
                options={[
                    { value: 'inmediato', label: 'Lo antes posible (Q1)' },
                    { value: '3-6meses', label: '3 - 6 meses' },
                    { value: '6-12meses', label: '6 - 12 meses' },
                    { value: 'explorando', label: 'Solo explorando por ahora' },
                ]}
            />

            <FormSelect
                label="¿Quién toma la decisión final?"
                value={(formData.decisionMaker as string) || ''}
                onChange={(e) => updateFormData({ decisionMaker: e.target.value })}
                options={[
                    { value: 'yo', label: 'Yo directamente' },
                    { value: 'equipo', label: 'Mi equipo/área' },
                    { value: 'director', label: 'Director / VP' },
                    { value: 'c-level', label: 'C-Level (CEO, COO, etc.)' },
                ]}
            />
        </div>
    );
}

// Step 4: Contact Information
function Step4Contact() {
    const { formData, updateFormData } = useMultiStepForm();

    return (
        <div className="space-y-6">
            <FormInput
                label="Tu nombre completo"
                placeholder="Ej: María Fernanda López"
                value={(formData.contactName as string) || ''}
                onChange={(e) => updateFormData({ contactName: e.target.value })}
                required
            />

            <FormInput
                label="Cargo"
                placeholder="Ej: Gerente de Producto"
                value={(formData.role as string) || ''}
                onChange={(e) => updateFormData({ role: e.target.value })}
            />

            <FormInput
                label="Correo electrónico corporativo"
                type="email"
                placeholder="tu@empresa.com"
                value={(formData.email as string) || ''}
                onChange={(e) => updateFormData({ email: e.target.value })}
                required
            />

            <FormInput
                label="Número de celular"
                type="tel"
                placeholder="300 123 4567"
                value={(formData.phone as string) || ''}
                onChange={(e) => updateFormData({ phone: e.target.value })}
            />
        </div>
    );
}

export default AlianzasForm;
