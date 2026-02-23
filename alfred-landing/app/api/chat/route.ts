// import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
    return new Response(JSON.stringify({ error: "Chatbot temporarily disabled for maintenance." }), { status: 503 });
}
