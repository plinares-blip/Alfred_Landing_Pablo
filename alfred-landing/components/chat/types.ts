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
    isError?: boolean;
    audioUrl?: string; // We'll disable audio for now to keep it simple as per "1 message" requirement
    proposal?: ServiceProposal;
}
