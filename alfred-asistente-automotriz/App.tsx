
import React, { useState, useEffect, useRef } from 'react';
import { Message, ServiceProposal } from './types';
import { initializeChat, sendMessageStream, blobToBase64 } from './services/geminiService';
import MessageBubble from './components/MessageBubble';
import InputArea from './components/InputArea';
import { GenerateContentResponse } from '@google/genai';
import { Radio } from 'lucide-react';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hola. Estoy listo. Cuéntame, ¿qué notas extraño en tu carro hoy?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string, audioBlob?: Blob) => {
    setIsLoading(true);
    const messageId = Date.now().toString();

    const newUserMsg: Message = {
      id: messageId,
      role: 'user',
      text: text,
      audioUrl: audioBlob ? URL.createObjectURL(audioBlob) : undefined
    };
    
    setMessages(prev => [...prev, newUserMsg]);

    try {
      let audioBase64: string | undefined;
      if (audioBlob) {
        audioBase64 = await blobToBase64(audioBlob);
      }

      const botMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: botMsgId,
        role: 'model',
        text: ''
      }]);

      const streamResult = await sendMessageStream(text, audioBase64);
      
      let fullText = '';
      
      for await (const chunk of streamResult) {
        const chunkText = (chunk as GenerateContentResponse).text;
        
        if (chunkText) {
          fullText += chunkText;
          
          const jsonRegex = /```json:service_proposal\s*([\s\S]*?)\s*```/;
          const match = fullText.match(jsonRegex);
          
          let displayContent = fullText;
          let parsedProposal: ServiceProposal | undefined = undefined;

          if (match) {
            try {
              parsedProposal = JSON.parse(match[1]);
              displayContent = fullText.replace(match[0], '').trim();
            } catch (e) {
              // wait for stream completion
            }
          }

          setMessages(prev => prev.map(msg => 
            msg.id === botMsgId 
              ? { ...msg, text: displayContent, proposal: parsedProposal }
              : msg
          ));
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Lo siento, perdí la conexión con el servidor. ¿Podrías intentarlo de nuevo?",
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-alfred-bg text-alfred-text font-sans selection:bg-alfred-lime selection:text-alfred-bg">
      
      {/* Premium Header */}
      <header className="flex-none h-20 flex items-center justify-center px-4 relative z-10">
         <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-alfred-lime flex items-center justify-center shadow-[0_0_20px_rgba(180,251,0,0.4)]">
                <Radio className="text-alfred-bg" size={20} strokeWidth={2.5} />
             </div>
             <div className="flex flex-col">
                <h1 className="text-2xl font-bold tracking-tight text-white leading-none">Alfred</h1>
                <span className="text-[10px] font-bold text-alfred-blue uppercase tracking-[0.2em]">Concierge Automotriz</span>
             </div>
         </div>
         
         {/* Simple Status Indicator */}
         <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-alfred-lime animate-pulse"></div>
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Activo</span>
            </div>
         </div>
      </header>

      {/* Chat Area - The Void */}
      <main className="flex-1 overflow-y-auto px-4 md:px-0 scroll-smooth relative">
        {/* Background Ambient Glow */}
        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-alfred-blue/10 rounded-full blur-[100px] pointer-events-none -z-0"></div>

        <div className="max-w-3xl mx-auto flex flex-col pt-4 pb-4 relative z-10">
            {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} className="h-4" />
        </div>
      </main>

      {/* Input Area */}
      <footer className="flex-none bg-gradient-to-t from-alfred-bg via-alfred-bg to-transparent pb-4 pt-10 px-4 z-20">
        <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
};

export default App;
