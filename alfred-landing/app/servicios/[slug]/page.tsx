import { SERVICES_DATA } from "@/lib/services-data";
import ServiceLandingTemplate from "@/components/templates/ServiceLandingTemplate";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ mode?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const data = SERVICES_DATA[slug];
    if (!data) return {};

    return {
        title: `${data.name} Premium en Colombia | Alfred`,
        description: data.hero.subtext,
        openGraph: {
            title: `${data.name} | Alfred`,
            description: data.hero.subtext,
            images: [data.hero.image],
        },
    };
}

export default async function ServicePage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { mode } = await searchParams;
    const data = SERVICES_DATA[slug];

    if (!data) {
        notFound();
    }

    return <ServiceLandingTemplate data={data} mode={(mode as any) || "personal"} />;
}

export async function generateStaticParams() {
    return Object.keys(SERVICES_DATA).map((slug) => ({
        slug: slug,
    }));
}
