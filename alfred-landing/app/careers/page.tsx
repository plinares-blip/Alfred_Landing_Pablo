import { Metadata } from "next";
import CareersClient from "./careers-client";

export const metadata: Metadata = {
    title: "Carreras en Alfred | Únete a nuestra misión",
    description: "No busques un empleo, busca una misión. Ayúdanos a orquestar la industria automotriz y hacer que tener un vehículo sea fácil.",
};

export default function CareersPage() {
    return <CareersClient />;
}
