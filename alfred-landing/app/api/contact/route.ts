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

        // ==========================================
        // ✉️ ENVÍO DE CORREO AUTOMÁTICO (WEBHOOK)
        // ==========================================
        if (process.env.MAIL_WEBHOOK_URL) {
            let emailSubject = 'Gracias por contactar a Alfred';
            let emailBodyText = `Hola ${name},\n\nRecibimos tu solicitud y un experto de nuestro equipo te contactará lo más pronto posible.\n\nSaludos,\nEquipo Alfred`;

            if (sourceLower.includes('aliado') || sourceLower.includes('taller')) {
                emailSubject = 'Información sobre incorporación de nuevos aliados';
                emailBodyText = `Buenos días ${name}.

Me complace presentarme: soy Samuel Camacho, el nuevo gerente encargado de liderar desde Alfred todo el manejo de la red de aliados. Es un gusto conocerlos.

Les quiero informar que, por el momento, no estamos incorporando nuevas alianzas en Alfred, debido a una reorganización interna de nuestra red actual de aliados. Por esta razón, en esta etapa no estaremos afiliando nuevos aliados.

Sin embargo, sí vamos a estar consolidando una lista de aliados potenciales. Agradecemos mucho el interés que han mostrado en hacer parte de Alfred y valoramos profundamente la oportunidad de conocer sus servicios.

Una vez retomemos la incorporación de nuevos aliados a nuestra red, nos pondremos en contacto con ustedes para que puedan tener acceso tanto a nuestra red de clientes como a nuestras soluciones tecnológicas.

Esperamos más adelante poder acompañarlos y ayudar a que sus negocios crezcan de la mano de la tecnología de Alfred.

Muchas gracias por su interés y comprensión.`;
            } else if (sourceLower.includes('empresa') || sourceLower.includes('flota')) {
                emailSubject = 'Eleva el control de tu flota con Alfred 🚀';
                emailBodyText = `Hola ${name},

Gracias por dejarnos tus datos. Nos emociona la oportunidad de revolucionar la forma en que operas.
Nos comunicaremos contigo muy pronto para mostrarte cómo centralizar el control de tu flota con Alfred.

Si prefieres adelantarte, puedes agendar un espacio de 15 minutos en el momento que mejor te quede aquí: [ESPACIO_PARA_LINK_AGENDAMIENTO]

Saludos,
Equipo Alfred Automotriz`;
            }

            try {
                const mailResponse = await fetch(process.env.MAIL_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        to_email: email,
                        to_name: name,
                        phone: phone,
                        company: company || '',
                        subject: emailSubject,
                        body_text: emailBodyText,
                        source: source || 'General'
                    })
                });

                if (!mailResponse.ok) {
                    console.error('Error al enviar webhook de correo:', mailResponse.statusText);
                }
            } catch (error) {
                console.error('Error enviando webhook de correo:', error);
            }
        }

        // ==========================================
        // 📊 GOOGLE SHEETS (APP SCRIPT WEBHOOKS)
        // ==========================================
        let sheetsWebhookUrl: string | undefined;

        if (sourceLower.includes('aliado') || sourceLower.includes('taller')) {
            sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_ALIADOS;
        } else if (sourceLower.includes('empresa') || sourceLower.includes('flota')) {
            sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_EMPRESAS;
        }

        if (sheetsWebhookUrl) {
            try {
                const sheetResponse = await fetch(sheetsWebhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        email,
                        phone,
                        company: company || '',
                        message: message || '',
                        source: source || 'General',
                        timestamp: new Date().toISOString(),
                    }),
                });

                if (!sheetResponse.ok) {
                    console.error('Error enviando a Google Sheets:', sheetResponse.statusText);
                }
            } catch (error) {
                console.error('Error enviando a Google Sheets:', error);
            }
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