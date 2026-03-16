module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/error.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/error.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/not-found.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/not-found.tsx [app-rsc] (ecmascript)"));
}),
"[project]/lib/services-data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SERVICES_DATA",
    ()=>SERVICES_DATA
]);
const SERVICES_DATA = {
    "mecanica-experta": {
        slug: "mecanica-experta",
        name: "Mecánica Experta",
        hero: {
            title: "Mecánica de Precisión con Garantía Alfred",
            subtext: "Desde un cambio de aceite hasta reparaciones de motor complejas. Expertos certificados cuidan tu vehículo mientras tú sigues con tu día.",
            image: "/images/services/service_mecanica.webp",
            ctaText: "Agendar Mecánica Ahora"
        },
        comparison: {
            traditional: {
                title: "La forma tradicional:",
                points: [
                    "Incertidumbre técnica y diagnósticos dudosos.",
                    "Esperas interminables en salas de espera incómodas.",
                    "Repuestos de origen desconocido.",
                    "Falta de garantía real sobre el trabajo realizado."
                ]
            },
            alfred: {
                title: "El estándar Alfred:",
                points: [
                    "Diagnóstico computarizado avanzado.",
                    "Recogida y entrega en el lugar que prefieras.",
                    "Repuestos originales con trazabilidad total.",
                    "Reporte técnico detallado en video desde la App."
                ]
            }
        },
        steps: [
            {
                title: "Diagnóstico Digital",
                description: "Evaluamos tu vehículo y recibes un presupuesto detallado con fotos y videos de lo que realmente se necesita."
            },
            {
                title: "Mano de Obra Certificada",
                description: "Técnicos especialistas realizan el trabajo siguiendo protocolos rigurosos de fábrica."
            },
            {
                title: "Control de Calidad",
                description: "Probamos cada reparación y te entregamos el vehículo listo para cualquier desafío."
            }
        ],
        socialProof: {
            quote: "Por fin un taller donde entiendo qué le hacen a mi carro. El video del diagnóstico me dio mucha tranquilidad.",
            author: "Carolina Méndez",
            certifiedTitle: "Red de Talleres Especializados"
        },
        faqs: [
            {
                question: "¿Cuentan con garantía en las reparaciones?",
                answer: "Todas nuestras intervenciones mecánicas tienen una garantía mínima de 6 meses o 5,000 KM en mano de obra."
            },
            {
                question: "¿Qué marcas de vehículos atienden?",
                answer: "Atendemos todas las marcas comerciales, con especialización en grupos como VAG, BMW, Mercedes y marcas de alta gama."
            }
        ]
    },
    "lavado-y-detailing": {
        slug: "lavado-y-detailing",
        name: "Lavado & Detailing",
        hero: {
            title: "Tu carro como nuevo, sin salir de casa",
            subtext: "Estética automotriz de alto nivel. Desde limpieza profunda hasta protección cerámica de pintura.",
            image: "/images/services/service_lavado.webp",
            ctaText: "Pedir Lavado Premium"
        },
        comparison: {
            traditional: {
                title: "Lavaderos comunes:",
                points: [
                    "Uso de trapos sucios que rayan la pintura.",
                    "Productos químicos agresivos.",
                    "Limpieza superficial que no dura.",
                    "Filas y pérdida de tiempo los domingos."
                ]
            },
            alfred: {
                title: "Detallado Alfred:",
                points: [
                    "Técnica de dos baldes y microfibras premium.",
                    "Productos pH neutro y biodegradables.",
                    "Atención al detalle en cada rincón.",
                    "Comodidad absoluta: vamos por tu carro."
                ]
            }
        },
        steps: [
            {
                title: "Agendamiento Flash",
                description: "Eliges el tipo de lavado y la hora. Vamos a tu ubicación por las llaves."
            },
            {
                title: "Proceso de Detallado",
                description: "Limpieza técnica exterior e interior con equipos de alta presión y vapor."
            },
            {
                title: "Brillo de Exhibición",
                description: "Aplicamos ceras protectoras y abrillantadores que protegen tu pintura por más tiempo."
            }
        ],
        socialProof: {
            quote: "El interior de mi SUV quedó impecable, incluso en los lugares que yo nunca podía limpiar.",
            author: "Ricardo Salazar",
            certifiedTitle: "Expertos en Estética Automotriz"
        },
        faqs: [
            {
                question: "¿Qué incluye el lavado premium?",
                answer: "Incluye lavado exterior técnico, aspirado profundo, limpieza de paneles interiores, abrillantado de llantas y aromatización."
            }
        ]
    },
    "tramites-y-revision-tecnico-mecanica": {
        slug: "tramites-y-revision-tecnico-mecanica",
        name: "Trámites y Revisión Técnico Mecánica",
        hero: {
            title: "Trámites sin filas. Revisión Técnico Mecánica sin complicaciones.",
            subtext: "Nos encargamos de tu Revisión Técnico Mecánica y cualquier trámite de tránsito en Colombia. Tú descansas, Alfred hace la fila.",
            image: "/images/services/service_revision.avif",
            ctaText: "Gestionar Trámite Ahora"
        },
        comparison: {
            traditional: {
                title: "Trámites eternos:",
                points: [
                    "Mañanas perdidas en el CDA o en tránsito.",
                    "Riesgo de rechazo por detalles menores.",
                    "Gestores informales poco confiables.",
                    "Estrés por vencimiento de documentos."
                ]
            },
            alfred: {
                title: "Gestión Digital:",
                points: [
                    "Recogemos tu carro y lo llevamos al CDA para la Revisión Técnico Mecánica.",
                    "Pre-revisión visual para asegurar el éxito del trámite.",
                    "Gestores certificados y de confianza.",
                    "Alertas automáticas de próximos vencimientos."
                ]
            }
        },
        steps: [
            {
                title: "Pre-Inspección",
                description: "Verificamos luces, frenos y estado general para que no pierdas la RTM."
            },
            {
                title: "Ejecución de Trámite",
                description: "Llevamos el vehículo a los centros autorizados y gestionamos toda la documentación."
            },
            {
                title: "Documentos al Día",
                description: "Te entregamos tu vehículo con todos sus papeles vigentes y cargados en RUNT."
            }
        ],
        socialProof: {
            quote: "Nunca más volví a hacer una fila de RTM. Alfred lo hace por mí cada año mientras trabajo.",
            author: "Felipe Gaviria",
            certifiedTitle: "Tramitadores Certificados"
        },
        faqs: [
            {
                question: "¿Qué pasa si mi carro no pasa la Revisión Técnico Mecánica?",
                answer: "Te entregamos el reporte exacto de fallas y te cotizamos el arreglo inmediato. Una vez reparado, lo llevamos de nuevo sin costo adicional de gestión."
            }
        ]
    },
    "latoneria-y-pintura": {
        slug: "latoneria-y-pintura",
        name: "Latonería y Pintura",
        hero: {
            title: "Latonería y Pintura Premium sin salir de casa",
            subtext: "Alfred recoge tu vehículo, lo reparamos en talleres certificados de alta gama y te lo devolvemos impecable. Garantía total de color y acabado.",
            image: "/images/services/service_paint.avif",
            ctaText: "Cotizar Latonería Ahora"
        },
        comparison: {
            traditional: {
                title: "La forma tradicional:",
                points: [
                    "Pérdida de tiempo llevando el carro al taller.",
                    "Talleres sucios y con poca transparencia.",
                    "Precios sorpresa al final del trabajo.",
                    "Días sin movilidad ni seguimiento del proceso."
                ]
            },
            alfred: {
                title: "El estándar Alfred:",
                points: [
                    "Recogida y entrega a domicilio (Valet).",
                    "Talleres 5 estrellas certificados por aseguradoras.",
                    "Presupuesto digital transparente y sin extras.",
                    "Seguimiento en tiempo real desde la App."
                ]
            }
        },
        steps: [
            {
                title: "Pides por la App",
                description: "Seleccionas el servicio de Latonería, subes fotos del daño y recibes una cotización inicial en minutos."
            },
            {
                title: "Recogida y Reparación",
                description: "Un conductor experto recoge tu vehículo. Lo llevamos a un centro especializado para un acabado de fábrica."
            },
            {
                title: "Entrega Impecable",
                description: "Te devolvemos tu carro como nuevo, lavado y con garantía de por vida en la aplicación de pintura."
            }
        ],
        socialProof: {
            quote: "Me dejaron el golpe del parachoques invisible. Lo mejor fue no tener que moverme de mi oficina ni un solo minuto.",
            author: "Juan Pablo Rodríguez",
            certifiedTitle: "Garantía Alfred en Talleres Certificados"
        },
        faqs: [
            {
                question: "¿Cuánto demora el trámite de latonería?",
                answer: "Dependiendo del daño, un arreglo de una sola pieza puede tardar entre 3 a 5 días hábiles. Si es un golpe estructural o varias piezas, te daremos un tiempo estimado exacto tras la inspección física."
            },
            {
                question: "¿Tienen garantía sobre el color?",
                answer: "Sí, utilizamos tecnología de escaneo de color (espectrofotómetro) para asegurar que la nueva pintura sea idéntica a la original de tu vehículo."
            },
            {
                question: "¿Qué pasa si no estoy conforme con el resultado?",
                answer: "Alfred cuenta con un control de calidad riguroso. Si el acabado no cumple con nuestro estándar de fábrica, el carro no sale del taller hasta que esté perfecto. Tienes garantía total."
            },
            {
                question: "¿El seguro cubre estos arreglos?",
                answer: "Podemos trabajar con tu póliza de seguro o como servicio particular. Nosotros nos encargamos de toda la gestión con el taller."
            }
        ]
    },
    "mantenimiento-preventivo": {
        slug: "mantenimiento-preventivo",
        name: "Mantenimiento Preventivo",
        hero: {
            title: "La salud de tu carro es tu tranquilidad",
            subtext: "Evita daños costosos con nuestro plan de mantenimiento preventivo. Recogemos tu carro y lo dejamos a punto.",
            image: "/images/services/service_oil.avif",
            ctaText: "Checkup Preventivo"
        },
        comparison: {
            traditional: {
                title: "Descuido peligroso:",
                points: [
                    "Llevar el carro al taller cuando ya falló.",
                    "Reparaciones de emergencia costosas.",
                    "Frenos o llantas al límite sin saberlo.",
                    "Perder la garantía de fábrica por kms."
                ]
            },
            alfred: {
                title: "Prevención Alfred:",
                points: [
                    "Cambio de aceite y filtros a domicilio.",
                    "Inspección de 50 puntos de seguridad.",
                    "Cronograma de mantenimiento digital.",
                    "Historial de servicios siempre a mano."
                ]
            }
        },
        steps: [
            {
                title: "Cita Programada",
                description: "Alfred te avisa cuándo le toca el mantenimiento a tu carro según su kilometraje."
            },
            {
                title: "Servicio Técnico",
                description: "Realizamos los cambios de fluidos y revisiones preventivas en centros de servicio top."
            },
            {
                title: "Certificado de Salud",
                description: "Recibes un sello de mantenimiento Alfred y tu carro queda listo para rodar seguro."
            }
        ],
        socialProof: {
            quote: "Desde que uso Alfred, nunca he tenido una falla mecánica. Ellos se encargan de avisarme y hacerlo realidad.",
            author: "Marcela Velez",
            certifiedTitle: "Mantenimiento Inteligente"
        },
        faqs: [
            {
                question: "¿Qué piezas se revisan en el mantenimiento?",
                answer: "Revisamos niveles de líquidos, estado de batería, pastillas de frenos, suspensión, luces y presión de llantas."
            }
        ]
    }
};
}),
"[project]/components/templates/ServiceLandingTemplate.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/templates/ServiceLandingTemplate.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/templates/ServiceLandingTemplate.tsx <module evaluation>", "default");
}),
"[project]/components/templates/ServiceLandingTemplate.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/templates/ServiceLandingTemplate.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/templates/ServiceLandingTemplate.tsx", "default");
}),
"[project]/components/templates/ServiceLandingTemplate.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$templates$2f$ServiceLandingTemplate$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/templates/ServiceLandingTemplate.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$templates$2f$ServiceLandingTemplate$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/templates/ServiceLandingTemplate.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$templates$2f$ServiceLandingTemplate$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/servicios/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ServicePage,
    "generateMetadata",
    ()=>generateMetadata,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services-data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$templates$2f$ServiceLandingTemplate$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/templates/ServiceLandingTemplate.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
;
;
async function generateMetadata({ params }) {
    const { slug } = await params;
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SERVICES_DATA"][slug];
    if (!data) return {};
    return {
        title: `${data.name} Premium en Colombia | Alfred`,
        description: data.hero.subtext,
        openGraph: {
            title: `${data.name} | Alfred`,
            description: data.hero.subtext,
            images: [
                data.hero.image
            ]
        }
    };
}
async function ServicePage({ params, searchParams }) {
    const { slug } = await params;
    const { mode } = await searchParams;
    const data = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SERVICES_DATA"][slug];
    if (!data) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$templates$2f$ServiceLandingTemplate$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        data: data,
        mode: mode || "personal"
    }, void 0, false, {
        fileName: "[project]/app/servicios/[slug]/page.tsx",
        lineNumber: 36,
        columnNumber: 12
    }, this);
}
async function generateStaticParams() {
    return Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SERVICES_DATA"]).map((slug)=>({
            slug: slug
        }));
}
}),
"[project]/app/servicios/[slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/servicios/[slug]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6d4cfd3c._.js.map