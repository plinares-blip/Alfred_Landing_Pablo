"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Message, ServiceProposal } from './types';
import MessageBubble from './MessageBubble';
import InputArea from './InputArea';
import { DownloadCTA } from './DownloadCTA';
import { Radio } from 'lucide-react';

const LIMIT_KEY = "alfred_chat_limit";

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'model',
            text: "Hola. Soy **Alfred**, tu concierge automotriz. Cuéntame, ¿qué notas extraño en tu vehículo hoy?"
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasReachedLimit, setHasReachedLimit] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const limitData = localStorage.getItem(LIMIT_KEY);
        if (limitData) {
            const { timestamp, count } = JSON.parse(limitData);
            const now = Date.now();
            const twentyFourHours = 24 * 60 * 60 * 1000;

            if (now - timestamp < twentyFourHours && count >= 1) {
                setHasReachedLimit(true);
            } else if (now - timestamp >= twentyFourHours) {
                localStorage.removeItem(LIMIT_KEY);
            }
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const updateLimit = () => {
        const now = Date.now();
        localStorage.setItem(LIMIT_KEY, JSON.stringify({ timestamp: now, count: 1 }));
        setHasReachedLimit(true);
    };

    const handleSendMessage = async (text: string) => {
        if (hasReachedLimit) return;

        setIsLoading(true);
        const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
        setMessages(prev => [...prev, userMsg]);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMsg],
                    systemInstruction: `Eres Alfred, un concierge automotriz experto y empático. 
          Explica fallas mecánicas de forma sencilla y amable. 
          SIEMPRE genera una tarjeta de servicio en formato JSON al final si identificas una reparación necesaria.
          Formato: \`\`\`json:service_proposal {"vehicle": "...", "city": "...", "repair_summary": "...", "estimated_cost_range": "...", "affected_area": "..."} \`\`\``
                }),
            });

            if (!response.ok) throw new Error("API Limit reached or error");

            const botMsgId = (Date.now() + 1).toString();
            setMessages(prev => [...prev, { id: botMsgId, role: 'model', text: '' }]);

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let fullText = '';

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    fullText += chunk;

                    const jsonRegex = /```json:service_proposal\s*([\s\S]*?)\s*```/;
                    const match = fullText.match(jsonRegex);

                    let displayContent = fullText;
                    let parsedProposal: ServiceProposal | undefined = undefined;

                    if (match) {
                        try {
                            parsedProposal = JSON.parse(match[1]);
                            displayContent = fullText.replace(match[0], '').trim();
                        } catch (e) { }
                    }

                    setMessages(prev => prev.map(msg =>
                        msg.id === botMsgId
                            ? { ...msg, text: displayContent, proposal: parsedProposal }
                            : msg
                    ));
                }
            }

            updateLimit();

        } catch (error) {
            setMessages(prev => [...prev, {
                id: 'error',
                role: 'model',
                text: "Lo siento, tuve un problema al procesar tu solicitud. ¿Podrías intentar más tarde?",
                isError: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)]">
            <main className="flex-1 overflow-y-auto px-4 md:px-0 scroll-smooth">
                <div className="max-w-3xl mx-auto py-12">
                    {messages.map((msg) => (
                        <MessageBubble key={msg.id} message={msg} />
                    ))}

                    {hasReachedLimit && (
                        <div className="mt-8 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <DownloadCTA />
                        </div>
                    )}

                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </main>

            <footer className="bg-gradient-to-t from-alfred-dark via-alfred-dark to-transparent pb-8 pt-4 px-4">
                <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} disabled={hasReachedLimit} />
            </footer>
        </div>
    );
}
