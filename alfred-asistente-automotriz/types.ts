export interface ServiceProposal {
  vehicle: string;
  city: string;
  repair_summary: string;
  estimated_cost_range: string;
  affected_area: 'engine' | 'front_wheels' | 'rear_wheels' | 'exhaust' | 'interior' | 'body' | 'undercarriage';
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  audioUrl?: string; // For user uploaded/recorded audio playback
  isError?: boolean;
  proposal?: ServiceProposal;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isRecording: boolean;
}

export type SendMessageFunction = (text: string, audioBlob?: Blob) => Promise<void>;