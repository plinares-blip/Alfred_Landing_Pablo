'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Square, X, Activity } from 'lucide-react';
import { startRecording, stopRecording } from '../utils/audioUtils';

interface InputAreaProps {
  onSendMessage: (text: string, audioBlob?: Blob) => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '24px'; // Reset
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputText]);

  const handleStartRecording = async () => {
    try {
      const recorder = await startRecording();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingDuration(0);
      
      timerRef.current = window.setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("No pude acceder al micrófono. Por favor verifica los permisos.");
    }
  };

  const handleStopRecording = async () => {
    if (mediaRecorderRef.current) {
      const blob = await stopRecording(mediaRecorderRef.current);
      setAudioBlob(blob);
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      mediaRecorderRef.current = null;
    }
  };

  const handleCancelRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
    setAudioBlob(null);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleSend = () => {
    if ((!inputText.trim() && !audioBlob) || isLoading) return;
    onSendMessage(inputText, audioBlob || undefined);
    setInputText('');
    setAudioBlob(null);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      
      {/* Thinking Indicator - Waveform */}
      {isLoading && (
        <div className="flex flex-col justify-center items-center gap-2 mb-6 animate-fade-in">
            <div className="flex items-center gap-1 h-6">
                <div className="w-1 bg-alfred-lime animate-[wave_1s_ease-in-out_infinite] h-2"></div>
                <div className="w-1 bg-alfred-lime animate-[wave_1s_ease-in-out_0.1s_infinite] h-4"></div>
                <div className="w-1 bg-alfred-lime animate-[wave_1s_ease-in-out_0.2s_infinite] h-3"></div>
                <div className="w-1 bg-alfred-lime animate-[wave_1s_ease-in-out_0.3s_infinite] h-5"></div>
                <div className="w-1 bg-alfred-lime animate-[wave_1s_ease-in-out_0.4s_infinite] h-2"></div>
            </div>
            <span className="text-[10px] text-alfred-lime font-mono tracking-widest uppercase animate-pulse">Analizando...</span>
        </div>
      )}

      {/* Audio Attachment Preview */}
      {audioBlob && !isRecording && (
        <div className="flex items-center justify-between bg-alfred-card px-4 py-3 rounded-md mb-4 border-l-2 border-alfred-lime mx-2 animate-fade-in">
           <div className="flex items-center gap-3">
               <Activity size={16} className="text-alfred-lime" />
               <span className="text-xs text-white font-mono uppercase tracking-wider">Audio Capturado</span>
           </div>
           <button onClick={() => setAudioBlob(null)} className="text-white/50 hover:text-white">
             <X size={16} />
           </button>
        </div>
      )}

      {/* Input Bar */}
      <div className={`relative flex items-end gap-3 p-2 rounded-[2px] transition-all duration-300 ${
        isRecording 
          ? 'bg-red-900/20 border border-red-500/30' 
          : 'bg-alfred-card/80 backdrop-blur-md border border-white/5 shadow-2xl'
      }`}>
        
        {/* Left Action (Mic) */}
        <div className="flex-none mb-1 ml-1">
             {isRecording ? (
                <button
                    onClick={handleStopRecording}
                    className="p-3 bg-red-500 text-white rounded-full animate-pulse shadow-lg"
                >
                    <Square size={20} fill="currentColor" />
                </button>
             ) : (
                <button
                    onClick={handleStartRecording}
                    disabled={isLoading || !!audioBlob}
                    className={`p-3 rounded-full transition-colors ${
                        audioBlob ? 'text-white/20' : 'bg-alfred-bg text-alfred-blue hover:text-alfred-lime'
                    }`}
                >
                    <Mic size={20} />
                </button>
             )}
        </div>

        {/* Text Area / Recording Status */}
        <div className="flex-1 py-3">
             {isRecording ? (
                <div className="flex items-center gap-3 pl-2">
                    <span className="text-red-400 font-mono font-medium text-lg">{formatDuration(recordingDuration)}</span>
                    <span className="text-white/40 text-xs font-mono uppercase tracking-wider">Te escucho...</span>
                </div>
             ) : (
                <textarea
                    ref={textareaRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Cuéntame qué notas raro en el carro..."
                    className="w-full bg-transparent text-white placeholder-white/30 text-base resize-none focus:outline-none max-h-[120px] overflow-y-auto leading-relaxed font-sans"
                    rows={1}
                    disabled={isLoading}
                />
             )}
        </div>

        {/* Send Button */}
        {!isRecording && (
            <div className="flex-none mb-1 mr-1">
                <button
                    onClick={handleSend}
                    disabled={(!inputText.trim() && !audioBlob) || isLoading}
                    className={`p-3 rounded-full transition-all transform active:scale-90 ${
                        (!inputText.trim() && !audioBlob) || isLoading
                        ? 'bg-white/5 text-white/10 cursor-not-allowed' 
                        : 'bg-alfred-lime text-alfred-bg hover:scale-105 shadow-[0_0_15px_rgba(180,251,0,0.4)]'
                    }`}
                >
                    <Send size={20} className={(!inputText.trim() && !audioBlob) || isLoading ? '' : 'ml-0.5'} />
                </button>
            </div>
        )}
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { height: 8px; }
          50% { height: 20px; }
        }
      `}</style>
    </div>
  );
};

export default InputArea;