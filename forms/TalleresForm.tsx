'use client';

import { useState } from 'react';
import { MultiStepForm, FormInput, FormSelect, FormTextarea, useMultiStepForm } from '@/components/forms/MultiStepForm';
import { getUTMParams, trackFormStart, trackFormSubmit } from '@/lib/analytics';

/**
 * Talleres Application Form
 *
 * Multi-step workshop application form:
 * 1. Workshop Info
 * 2. Services & Capacity
 * 3. Why Alfred
 * 4. Contact Info
 */

const steps = [
    { id: 'workshop', title: 'Tu taller', description: 'Información básica' },
    { id: 'services', title: 'Servicios', description: 'Qué haces y cómo' },
    { id: 'motivation', title: '¿Por qué Alfred?', description: 'Tu motivación' },
    { id: 'contact', title: 'Contacto', description: 'Cómo te contactamos' },
];

interface TalleresFormProps {
    onSuccess: () => void;
}

export function TalleresForm({ onSuccess }: TalleresFormProps) {
    const [hasTrackedStart, setHasTrackedStart] = useState(false);

    const handleFormFocus = () => {
        if (!hasTrackedStart) {
            trackFormStart('talleres');
            setHasTrackedStart(true);
        }
    };

    const handleSubmit = async (data: Record<string, unknown>) => {
        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    segment: 'talleres',
                    formData: data,
                    metadata: {
                        source: window.location.href,
                        utmParams: getUTMParams(),
                        userAgent: navigator.userAgent,
                    },
                }),
            });

            if (response.ok) {
                trackFormSubmit('talleres');
                onSuccess();
            }
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    return (
        <div onFocus={handleFormFocus}>
            <MultiStepForm steps={steps} onSubmit={handleSubmit}>
                <Step1Workshop />
                <Step2Services />
                <Step3Motivation />
                <Step4Contact />
            </MultiStepForm>
        </div>
    );
}

// Step 1: Workshop Information
function Step1Workshop() {
    const { formData, updateFormData } = useMultiStepForm();

    return (
        <div className="space-y-6">
            <FormInput
                label="Nombre del taller"
                placeholder="Ej: Servitaller Express"
                value={(formData.workshopName as string) || ''}
                onChange={(e) => updateFormData({ workshopName: e.target.value })}
                required
            />

            <FormInput
                label="Dirección"
                placeholder="Calle y número, barrio"
                value={(formData.address as string) || ''}
                onChange={(e) => updateFormData({ address: e.target.value })}
            />

            <FormSelect
                label="Ciudad"
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

            <FormSelect
                label="Años de operación"
                value={(formData.yearsOperating as string) || ''}
                onChange={(e) => updateFormData({ yearsOperating: e.target.value })}
                options={[
                    { value: '<1', label: 'Menos de 1 año' },
                    { value: '1-3', label: '1 - 3 años' },
                    { value: '3-5', label: '3 - 5 años' },
                    { value: '5-10', label: '5 - 10 años' },
                    { value: '10+', label: 'Más de 10 años' },
                ]}
            />
        </div>
    );
}

// Step 2: Services & Capacity
function Step2Services() {
    const { formData, updateFormData } = useMultiStepForm();

    return (
        <div className="space-y-6">
            <FormSelect
                label="Tipo principal de servicio"
                value={(formData.mainService as string) || ''}
                onChange={(e) => updateFormData({ mainService: e.target.value })}
                options={[
                    { value: 'mecanica', label: 'Mecánica general' },
                    { value: 'aceite', label: 'Cambio de aceite' },
                    { value: 'llantas', label: 'Llantas' },
                    { value: 'latoneria', label: 'Latonería y pintura' },
                    { value: 'lavado', label: 'Lavado y detailing' },
                    { value: 'electrico', label: 'Sistema eléctrico' },
                    { value: 'multimarca', label: 'Multimarca/Multiservicios' },
                ]}
            />

            <FormSelect
                label="Capacidad mensual (vehículos atendidos)"
                value={(formData.monthlyCapacity as string) || ''}
                onChange={(e) => updateFormData({ monthlyCapacity: e.target.value })}
                options={[
                    { value: '<50', label: 'Menos de 50' },
                    { value: '50-100', label: '50 - 100' },
                    { value: '100-200', label: '100 - 200' },
                    { value: '200+', label: 'Más de 200' },
                ]}
            />

            <FormSelect
                label="¿Cuentan con garantía escrita en sus servicios?"
                value={(formData.hasWarranty as string) || ''}
                onChange={(e) => updateFormData({ hasWarranty: e.target.value })}
                options={[
                    { value: 'si', label: 'Sí, siempre' },
                    { value: 'a-veces', label: 'A veces, depende del servicio' },
                    { value: 'no', label: 'No, pero quisiéramos implementar' },
                ]}
            />

            <FormSelect
                label="¿Número de técnicos?"
                value={(formData.technicians as string) || ''}
                onChange={(e) => updateFormData({ technicians: e.target.value })}
                options={[
                    { value: '1-2', label: '1 - 2' },
                    { value: '3-5', label: '3 - 5' },
                    { value: '6-10', label: '6 - 10' },
                    { value: '10+', label: 'Más de 10' },
                ]}
            />
        </div>
    );
}

// Step 3: Motivation
function Step3Motivation() {
    const { formData, updateFormData } = useMultiStepForm();

    return (
        <div className="space-y-6">
            <FormSelect
                label="¿Por qué quieres unirte a Alfred?"
                value={(formData.motivation as string) || ''}
                onChange={(e) => updateFormData({ motivation: e.target.value })}
                options={[
                    { value: 'clientes', label: 'Conseguir más clientes' },
                    { value: 'pagos', label: 'Tener pagos seguros y rápidos' },
                    { value: 'digital', label: 'Digitalizarme' },
                    { value: 'crecimiento', label: 'Hacer crecer mi negocio' },
                    { value: 'todo', label: 'Todo lo anterior' },
                ]}
            />

            <FormTextarea
                label="¿Qué te diferencia de otros talleres?"
                placeholder="Cuéntanos qué hace especial a tu taller..."
                value={(formData.differentiator as string) || ''}
                onChange={(e) => updateFormData({ differentiator: e.target.value })}
                rows={3}
            />

            <FormSelect
                label="¿Cómo te enteraste de Alfred?"
                value={(formData.howHeard as string) || ''}
                onChange={(e) => updateFormData({ howHeard: e.target.value })}
                options={[
                    { value: 'google', label: 'Búsqueda en Google' },
                    { value: 'redes', label: 'Redes sociales' },
                    { value: 'referido', label: 'Me lo recomendaron' },
                    { value: 'otro', label: 'Otro' },
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
                placeholder="Ej: Carlos Andrés Martínez"
                value={(formData.contactName as string) || ''}
                onChange={(e) => updateFormData({ contactName: e.target.value })}
                required
            />

            <FormInput
                label="Cargo o rol"
                placeholder="Ej: Dueño, Administrador"
                value={(formData.role as string) || ''}
                onChange={(e) => updateFormData({ role: e.target.value })}
            />

            <FormInput
                label="Correo electrónico"
                type="email"
                placeholder="tu@taller.com"
                value={(formData.email as string) || ''}
                onChange={(e) => updateFormData({ email: e.target.value })}
                required
            />

            <FormInput
                label="Número de celular / WhatsApp"
                type="tel"
                placeholder="300 123 4567"
                value={(formData.phone as string) || ''}
                onChange={(e) => updateFormData({ phone: e.target.value })}
                hint="Usaremos WhatsApp para comunicarnos"
            />
        </div>
    );
}

export default TalleresForm;
