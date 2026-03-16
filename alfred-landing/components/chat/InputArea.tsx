"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface InputAreaProps {
    onSendMessage: (text: string) => void;
    isLoading: boolean;
    disabled: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading, disabled }) => {
    const [inputText, setInputText] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '24px';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [inputText]);

    const handleSend = () => {
        if (!inputText.trim() || isLoading || disabled) return;
        onSendMessage(inputText);
        setInputText('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-6">
            {isLoading && (
                <div className="flex flex-col justify-center items-center gap-2 mb-6 transition-all duration-300">
                    <div className="flex items-center gap-1 h-6">
                        <div className="w-1 bg-alfred-lime animate-pulse h-2"></div>
                        <div className="w-1 bg-alfred-lime animate-pulse h-4 delay-75"></div>
                        <div className="w-1 bg-alfred-lime animate-pulse h-3 delay-150"></div>
                        <div className="w-1 bg-alfred-lime animate-pulse h-5 delay-200"></div>
                    </div>
                    <span className="text-[10px] text-alfred-lime font-mono tracking-widest uppercase">Analizando...</span>
                </div>
            )}

            <div className={`relative flex items-end gap-3 p-4 rounded-2xl transition-all duration-300 border ${disabled
                ? 'bg-white/5 border-white/5 opacity-50'
                : 'bg-alfred-navy/80 backdrop-blur-xl border-white/10 shadow-2xl focus-within:border-alfred-lime/50'
                }`}>

                <div className="flex-1 py-1">
                    <textarea
                        ref={textareaRef}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={disabled ? "Límite alcanzado por hoy" : "Cuéntame qué notas raro en el vehículo..."}
                        className="w-full bg-transparent text-white placeholder-white/20 text-base resize-none focus:outline-none max-h-[120px] overflow-y-auto leading-relaxed"
                        rows={1}
                        disabled={isLoading || disabled}
                    />
                </div>

                <button
                    onClick={handleSend}
                    disabled={!inputText.trim() || isLoading || disabled}
                    className={`p-3 rounded-xl transition-all transform active:scale-95 ${!inputText.trim() || isLoading || disabled
                        ? 'bg-white/5 text-white/10 cursor-not-allowed'
                        : 'bg-alfred-lime text-alfred-navy hover:scale-105 shadow-[0_0_20px_rgba(180,251,0,0.3)]'
                        }`}
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
};

export default InputArea;
