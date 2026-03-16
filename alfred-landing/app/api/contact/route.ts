import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { name, email, phone, company, message, source } = data;

        // Validate required fields
        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos' },
                { status: 400 }
            );
        }

        // ==========================================
        // 🚥 EL SEMÁFORO: Elegir el Webhook correcto
        // ==========================================
        const sourceLower = (source || '').toLowerCase();

        // Empezamos asumiendo que es Empresas por defecto (fallback)
        let webhookUrl = process.env.SLACK_WEBHOOK_EMPRESAS;

        // 1. TALLERES o ALIADOS
        if (sourceLower.includes('aliado') || sourceLower.includes('taller')) {
            webhookUrl = process.env.SLACK_WEBHOOK_ALIADOS;
        }
        // 2. CONVENIOS o ALIANZAS (B2B2C)
        else if (sourceLower.includes('convenio') || sourceLower.includes('alianza')) {
            webhookUrl = process.env.SLACK_WEBHOOK_CONVENIOS;
        }
        // 3. NOSOTROS o CAREERS
        else if (sourceLower.includes('career') || sourceLower.includes('nosotros')) {
            webhookUrl = process.env.SLACK_WEBHOOK_NOSOTROS;
        }
        // 4. EMPRESAS (B2B)
        else if (sourceLower.includes('empresa')) {
            webhookUrl = process.env.SLACK_WEBHOOK_EMPRESAS;
        }
        // ==========================================

        if (webhookUrl) {
            // Format message for Slack (¡Tu diseño original, intacto!)
            const slackMessage = {
                text: `🚀 Nuevo Lead de *${source || 'Web Alfred'}*`,
                blocks: [
                    {
                        type: "header",
                        text: {
                            type: "plain_text",
                            text: `🚀 Nuevo Lead de ${source || 'Web Alfred'}`,
                            emoji: true
                        }
                    },
                    {
                        type: "section",
                        fields: [
                            {
                                type: "mrkdwn",
                                text: `*Nombre:*\n${name}`
                            },
                            {
                                type: "mrkdwn",
                                text: `*Empresa / Entidad:*\n${company || 'N/A'}`
                            },
                            {
                                type: "mrkdwn",
                                text: `*Email:*\n${email}`
                            },
                            {
                                type: "mrkdwn",
                                text: `*Teléfono / Enlace:*\n${phone}`
                            }
                        ]
                    },
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: `*Mensaje / Datos Extra:*\n${message || 'Sin mensaje'}`
                        }
                    },
                    {
                        type: "divider"
                    }
                ]
            };

            try {
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(slackMessage),
                });

                if (!response.ok) {
                    console.error('Error sending to Slack:', response.statusText);
                }
            } catch (error) {
                console.error('Error sending to Slack:', error);
            }
        } else {
            console.warn("No se encontró ningún SLACK_WEBHOOK válido en las variables de entorno.");
        }

        return NextResponse.json({ success: true, message: 'Mensaje enviado correctamente' });
    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}