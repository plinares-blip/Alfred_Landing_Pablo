import { Metadata } from "next";
import TalleresClient from "./talleres-client";

export const metadata: Metadata = {
    title: "Talleres Mecánicos Elite en Colombia | Red Alfred",
    description: "Únete a la red de talleres más exclusiva. Automatiza tu gestión, recibe clientes corporativos y garantiza tus pagos con Alfred.",
};

export default function TalleresPage() {
    return <TalleresClient />;
}
