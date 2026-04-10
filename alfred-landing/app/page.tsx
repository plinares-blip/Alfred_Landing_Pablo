import { LandingPage } from "@/components/LandingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alfred | La app que cuida tu carro por ti",
  description: "Alfred orquesta la industria automotriz para devolverte tu tiempo. Gestión inteligente de mantenimientos, trámites y seguros.",
};

const VALID_MODES = ["personal", "business", "alianzas", "talleres", "careers"] as const;
type Mode = typeof VALID_MODES[number];

export default async function Home({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const params = await searchParams;
  const initialMode: Mode = VALID_MODES.includes(params.mode as Mode) ? (params.mode as Mode) : "personal";

  return <LandingPage initialMode={initialMode} />;
}
