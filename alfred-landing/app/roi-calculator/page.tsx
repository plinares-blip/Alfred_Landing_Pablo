import { Metadata } from "next";
import ROICalculatorClient from "./roi-calculator-client";

export const metadata: Metadata = {
    title: "Calculadora de ROI y Ahorro de Flota | Alfred B2B",
    description: "Calcula el ahorro potencial de tu flota con Alfred. Optimiza mantenimientos, reduce costos correctivos y mejora tu rentabilidad.",
};

export default function ROICalculatorPage() {
    return <ROICalculatorClient />;
}
