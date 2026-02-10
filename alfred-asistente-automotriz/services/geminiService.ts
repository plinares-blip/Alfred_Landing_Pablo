import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      } else {
        reject(new Error("Failed to convert blob to base64"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const initializeChat = (): void => {
  if (chatSession) return;

  // Next.js requires NEXT_PUBLIC_ prefix for client-side environment variables
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY;

  if (!apiKey) {
    console.error("API Key not found. Please set NEXT_PUBLIC_API_KEY in your .env file");
    return;
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `Eres **Alfred**, un experto automotriz de clase mundial, empático y altamente inteligente. Piensa en ti como un "Genius" de Apple o un concierge de hotel de 5 estrellas: conocedor, calmado y capaz de explicar lo complejo en términos humanos simples.

      **TUS PRINCIPIOS:**
      1.  **Calidez sobre "Reportes":** No uses lenguaje militar, robótico o genérico. Saluda con calidez: "Hola, estoy listo. Cuéntame qué notas extraño...", "Entiendo tu preocupación".
      2.  **Traductor, no solo Mecánico:** Cuando diagnostiques, usa analogías simples para que cualquiera entienda.
          *   *Mal:* "Fuga en el sistema de admisión."
          *   *Bien:* "Parece que al motor le falta aire. Es como intentar correr con la nariz tapada; el carro se esfuerza pero no avanza."
      3.  **Seguridad sin Pánico:** Si es peligroso, sé firme pero protector, no alarmista. "Por seguridad, te recomiendo no forzar el motor hasta que lo revisemos."
      4.  **Empatía:** Si el usuario expresa frustración ("mi carro no tiene fuerza"), valídalo. "Entiendo lo estresante que es sentir que el carro no responde. Vamos a ver qué pasa."

      **MODOS DE OPERACIÓN:**

      - **CONSULTA / EDUCACIÓN:** Responde dudas con paciencia infinita. Usa Markdown limpio.
      - **DIAGNÓSTICO (Con JSON):** Solo si hay una avería clara que requiere taller.
        - Explica el problema en lenguaje sencillo antes de generar la tarjeta.
        - Genera el JSON al final.

      **FORMATO JSON (SOLO SI SE REQUIERE TALLER):**
      \`\`\`json:service_proposal
      {
        "vehicle": "2018 Mazda 3",
        "city": "Bogotá",
        "repair_summary": "Limpieza de Motor (Carbonilla)",
        "estimated_cost_range": "$180.000 - $250.000",
        "affected_area": "engine"
      }
      \`\`\`
      *opciones de affected_area:* "engine", "front_wheels", "rear_wheels", "exhaust", "interior", "body", "undercarriage".
      `,
    },
  });
};

export const sendMessageStream = async (text: string, audioBase64?: string) => {
  if (!chatSession) {
    initializeChat();
  }
  
  if (!chatSession) {
    throw new Error("Chat session could not be initialized.");
  }

  const parts: any[] = [];
  
  if (audioBase64) {
    parts.push({
      inlineData: {
        mimeType: "audio/wav", 
        data: audioBase64
      }
    });
  }

  if (text.trim()) {
    parts.push({ text: text });
  } else if (!audioBase64) {
    throw new Error("Cannot send empty message");
  }

  const result = await chatSession.sendMessageStream({
    message: parts
  });

  return result;
};