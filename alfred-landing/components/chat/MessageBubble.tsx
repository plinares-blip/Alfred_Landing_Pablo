"use client";

import React from 'react';
import { Message } from './types';
import { Radio } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ServiceProposalCard from './ServiceProposalCard';

interface MessageBubbleProps {
    message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isUser = message.role === 'user';
    const isError = message.isError;

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-8 group animate-in fade-in duration-500`}>
            <div className={`flex flex-col max-w-[90%] md:max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>

                <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-3 w-full`}>

                    {!isUser && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-alfred-lime flex items-center justify-center shadow-[0_0_15px_rgba(180,251,0,0.3)] z-10">
                            <Radio size={16} className="text-alfred-bg" strokeWidth={3} />
                        </div>
                    )}

                    <div className={`relative px-6 py-4 text-base leading-relaxed overflow-hidden shadow-xl transition-all
              ${isUser
                            ? 'bg-alfred-lime text-alfred-navy font-medium rounded-[24px] rounded-br-none'
                            : isError
                                ? 'bg-red-900/40 border border-red-500/50 text-red-200 rounded-[24px] rounded-bl-none'
                                : 'bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-[24px] rounded-bl-none'
                        }
            `}>

                        <div className={`prose prose-invert max-w-none ${isUser ? 'text-alfred-navy' : 'text-slate-200'}`}>
                            <ReactMarkdown>{message.text}</ReactMarkdown>
                        </div>

                    </div>
                </div>

                {!isUser && message.proposal && (
                    <div className="pl-11 w-full max-w-md">
                        <ServiceProposalCard proposal={message.proposal} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageBubble;
