'use client';

import { useState } from 'react';
import { MultiStepForm, FormInput, FormSelect, FormTextarea, useMultiStepForm } from '@/components/forms/MultiStepForm';
import { getUTMParams, trackFormStart, trackFormSubmit } from '@/lib/analytics';

/**
 * Empresas Lead Form
 *
 * Multi-step qualification form (Sandler-style):
 * 1. Company Info
 * 2. Fleet Details
 * 3. Pain Points
 * 4. Contact Info
 */

const steps = [
    { id: 'company', title: 'Cuéntanos de tu empresa', description: 'Información básica' },
    { id: 'fleet', title: 'Tu flota', description: 'Detalles de tus vehículos' },
    { id: 'needs', title: 'Tus necesidades', description: 'Qué podemos resolver' },
    { id: 'contact', title: 'Contacto', description: 'Cómo te contactamos' },
];

interface EmpresasFormProps {
    onSuccess: () => void;
}

export function EmpresasForm({ onSuccess }: EmpresasFormProps) {
    const [hasTrackedStart, setHasTrackedStart] = useState(false);

    const handleFormFocus = () => {
        if (!hasTrackedStart) {
            trackFormStart('empresas');
            setHasTrackedStart(true);
        }
    };

    const handleSubmit = async (data: Record<string, unknown>) => {
        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    segment: 'empresas',
                    formData: data,
                    metadata: {
                        source: window.location.href,
                        utmParams: getUTMParams(),
                        userAgent: navigator.userAgent,
                    },
                }),
            });

            if (response.ok) {
                trackFormSubmit('empresas', { fleetSize: data.fleetSize as string });
                onSuccess();
            }
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    return (
        <div onFocus={handleFormFocus}>
            <MultiStepForm steps={steps} onSubmit={handleSubmit}>
                <Step1Company />
                <Step2Fleet />
                <Step3Needs />
                <Step4Contact />
            </MultiStepForm>
        </div>
    );
}

// Step 1: Company Information
function Step1Company() {
    const { formData, updateFormData } = useMultiStepForm();

    return (
        <div className="space-y-6">
            <FormInput
                label="Nombre de la empresa"
                placeholder="Ej: Transportes ABC S.A.S"
                value={(formData.companyName as string) || ''}
                onChange={(e) => updateFormData({ companyName: e.target.value })}
                required
            />

            <FormSelect
                label="Industria"
                value={(formData.industry as string) || ''}
                onChange={(e) => updateFormData({ industry: e.target.value })}
                options={[
                    { value: 'transporte', label: 'Transporte y logística' },
                    { value: 'alquiler', label: 'Alquiler de vehículos' },
                    { value: 'distribucion', label: 'Distribución' },
                    { value: 'servicios', label: 'Servicios' },
                    { value: 'construccion', label: 'Construcción' },
                    { value: 'otro', label: 'Otro' },
                ]}
            />

            <FormSelect
                label="Ciudad principal de operación"
                value={(formData.city as string) || ''}
                onChange={(e) => updateFormData({ city: e.target.value })}
                options={[
                    { value: 'bogota', label: 'Bogotá' },
                    { value: 'medellin', label: 'Medellín' },
                    { value: 'cali', label: 'Cali' },
                    { value: 'barranquilla', label: 'Barranquilla' },
                    { value: 'cartagena', label: 'Cartagena' },
                    { value: 'bucaramanga', label: 'Bucaramanga' },
                    { value: 'otro', label: 'Otra ciudad' },
                ]}
            />
        </div>
    );
}

// Step 2: Fleet Details
function Step2Fleet() {
    const { formData, updateFormData } = useMultiStepForm();

    return (
        <div className="space-y-6">
            <FormSelect
                label="Tamaño de la flota"
                value={(formData.fleetSize as string) || ''}
                onChange={(e) => updateFormData({ fleetSize: e.target.value })}
                options={[
                    { value: '1-10', label: '1 - 10 vehículos' },
                    { value: '11-30', label: '11 - 30 vehículos' },
                    { value: '31-50', label: '31 - 50 vehículos' },
                    { value: '51-100', label: '51 - 100 vehículos' },
                    { value: '100+', label: 'Más de 100 vehículos' },
                ]}
                hint="Incluye motos, carros, camionetas, camiones, etc."
            />

            <FormSelect
                label="Tipos de vehículos principales"
                value={(formData.vehicleTypes as string) || ''}
                onChange={(e) => updateFormData({ vehicleTypes: e.target.value })}
                options={[
                    { value: 'autos', label: 'Autos y camionetas' },
                    { value: 'motos', label: 'Motos' },
                    { value: 'camiones', label: 'Camiones y tracto-mulas' },
                    { value: 'mixto', label: 'Flota mixta' },
                ]}
            />

            <FormSelect
                label="¿Usan algún software de gestión de flota actualmente?"
                value={(formData.currentSoftware as string) || ''}
                onChange={(e) => updateFormData({ currentSoftware: e.target.value })}
                options={[
                    { value: 'ninguno', label: 'No usamos ninguno' },
                    { value: 'excel', label: 'Excel / hojas de cálculo' },
                    { value: 'otro', label: 'Otro software' },
                ]}
            />
        </div>
    );
}

// Step 3: Pain Points (Sandler-style)
function Step3Needs() {
    const { formData, updateFormData } = useMultiStepForm();

    return (
        <div className="space-y-6">
            <FormTextarea
                label="¿Cuál es tu mayor dolor de cabeza con el mantenimiento de la flota?"
                placeholder="Cuéntanos qué problemas enfrentas actualmente..."
                value={(formData.painPoint as string) || ''}
                onChange={(e) => updateFormData({ painPoint: e.target.value })}
                rows={3}
            />

            <FormSelect
                label="¿Qué impacto tiene esto en tu operación?"
                value={(formData.impact as string) || ''}
                onChange={(e) => updateFormData({ impact: e.target.value })}
                options={[
                    { value: 'bajo', label: 'Bajo - es una molestia menor' },
                    { value: 'medio', label: 'Medio - afecta mi productividad' },
                    { value: 'alto', label: 'Alto - me cuesta dinero cada mes' },
                    { value: 'critico', label: 'Crítico - es urgente resolverlo' },
                ]}
            />

            <FormSelect
                label="¿En cuánto tiempo necesitas una solución?"
                value={(formData.timeline as string) || ''}
                onChange={(e) => updateFormData({ timeline: e.target.value })}
                options={[
                    { value: 'inmediato', label: 'Lo antes posible' },
                    { value: '1mes', label: 'En el próximo mes' },
                    { value: '3meses', label: 'En los próximos 3 meses' },
                    { value: 'explorando', label: 'Solo estoy explorando opciones' },
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
                placeholder="Ej: Juan Carlos Rodríguez"
                value={(formData.contactName as string) || ''}
                onChange={(e) => updateFormData({ contactName: e.target.value })}
                required
            />

            <FormInput
                label="Cargo"
                placeholder="Ej: Gerente de Operaciones"
                value={(formData.role as string) || ''}
                onChange={(e) => updateFormData({ role: e.target.value })}
            />

            <FormInput
                label="Correo electrónico"
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
                hint="Te contactaremos por WhatsApp o llamada"
            />
        </div>
    );
}

export default EmpresasForm;
