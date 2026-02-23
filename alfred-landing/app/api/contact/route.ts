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

        const webhookUrl = process.env.SLACK_WEBHOOK_URL;

        if (webhookUrl) {
            // Format message for Slack
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
                                text: `*Empresa:*\n${company || 'N/A'}`
                            },
                            {
                                type: "mrkdwn",
                                text: `*Email:*\n${email}`
                            },
                            {
                                type: "mrkdwn",
                                text: `*Teléfono:*\n${phone}`
                            }
                        ]
                    },
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: `*Mensaje:*\n${message || 'Sin mensaje'}`
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
                    // Don't fail the request to the user, but log the error
                }
            } catch (error) {
                console.error('Error sending to Slack:', error);
            }
        } else {
            console.warn("SLACK_WEBHOOK_URL is not defined");
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
