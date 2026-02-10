'use client';

import React from 'react';
import { Message } from '../types';
import { User, Play, Radio } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ServiceProposalCard from './ServiceProposalCard';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isError = message.isError;

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-8 group animate-fade-in`}>
      <div className={`flex flex-col max-w-[90%] md:max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        
        <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-3 w-full`}>
            
            {/* Avatar - Only for Alfred (Bot) */}
            {!isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-alfred-lime flex items-center justify-center shadow-[0_0_15px_rgba(180,251,0,0.3)] z-10">
                    <Radio size={16} className="text-alfred-bg" strokeWidth={3} />
                </div>
            )}

            {/* Bubble */}
            <div className={`relative px-6 py-4 text-base leading-relaxed overflow-hidden shadow-lg transition-all
              ${isUser 
                ? 'bg-alfred-blue text-white rounded-[24px] rounded-br-none' 
                : isError
                  ? 'bg-red-900/40 border border-red-500/50 text-red-200 rounded-[24px] rounded-bl-none'
                  : 'glass-panel text-alfred-text rounded-[24px] rounded-bl-none'
              }
            `}>
            
            {/* Audio Player if User sent audio */}
            {message.audioUrl && (
                <div className="mb-3 bg-black/20 p-3 rounded-2xl flex items-center gap-3 border border-white/10">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white shrink-0">
                    <Play size={14} fill="currentColor" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Análisis de Audio</span>
                    <audio controls src={message.audioUrl} className="h-6 w-48 max-w-full opacity-80 hover:opacity-100 transition-opacity" />
                </div>
                </div>
            )}

            {/* Text Content */}
            <div className={`markdown-content ${isUser ? 'text-white' : 'text-slate-200'}`}>
                <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>

            </div>
        </div>

        {/* Render Proposal Card */}
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