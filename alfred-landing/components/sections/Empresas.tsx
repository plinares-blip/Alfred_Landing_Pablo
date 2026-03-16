"use client";

import { ImpactCards, TrackRecord, ClientMarquee, IndustryRecognition } from "@/components/sections/SocialProof";
import { CommandCenter } from "@/components/sections/CommandCenter";
import { ROICalculatorHook } from "@/components/sections/ROICalculatorHook";
import { Servicios } from "@/components/sections/Servicios";
import { WorkshopCertification } from "@/components/sections/WorkshopCertification";
import { Conductores } from "@/components/sections/Conductores";
import { Nosotros } from "@/components/sections/Nosotros";
import { B2BLeadForm } from "@/components/sections/B2BLeadForm";

export function Empresas() {
    return (
        <div className="space-y-0 bg-[#111E3E]">
            {/* 1. Río "Clientes que confían en nosotros" */}
            <ClientMarquee />

            {/* 2. Features del SaaS */}
            <CommandCenter />

            {/* 3. Blocks: Talleres, Cobertura, Servicios (inside SaaS & Control spy) */}
            <TrackRecord />

            {/* 4. Cards de casos de éxito */}
            <ImpactCards />

            {/* 5. Matemáticas de ahorro */}
            <ROICalculatorHook />

            {/* 6. Servicios */}
            <Servicios mode="business" />

            {/* 7. Conductores */}
            <Conductores mode="business" />

            {/* 8. Workshop Certification */}
            <WorkshopCertification />

            {/* 9. Reconocimientos de industria + Powered by Alfred */}
            <IndustryRecognition />

            {/* 10. B2B Terminal Lead Form */}
            <B2BLeadForm />

            {/* 11. Nosotros */}
            <Nosotros />
        </div>
    );
}
