
import { GoogleGenAI, Type } from "@google/genai";

// Helper to safely get the API key from various environment locations
const getApiKey = () => {
  try {
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      // @ts-ignore
      return process.env.API_KEY;
    }
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY;
    }
  } catch (e) {
    return null;
  }
  return null;
};

// Initialize client lazily to avoid top-level crashes
const getAiClient = () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Using fallback data.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateAuthenticDetails = async (courseName: string) => {
  try {
    const ai = getAiClient();
    
    // Fallback if AI is not configured/available
    if (!ai) {
      throw new Error("API Key missing");
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      // FIX: The prompt is simplified as the JSON output is now controlled by responseSchema.
      contents: `Generate a professional, authentic-looking certificate identification number and a 1-sentence verification message for a computer course named "${courseName}".`,
      config: {
        responseMimeType: "application/json",
        // FIX: Added responseSchema for robust JSON output.
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: {
              type: Type.STRING,
              description: 'A professional, authentic-looking certificate identification number, e.g., ISO-9001/CERT/2024/001',
            },
            verificationText: {
              type: Type.STRING,
              description: 'A 1-sentence verification message, e.g., This document is electronically verified by the Board of Technical Education.',
            },
          },
          required: ['id', 'verificationText'],
        },
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error or Fallback triggered:", error);
    // Return mock data so the app continues to work perfectly without the API key
    return {
      id: `ISO-9001/CERT/${new Date().getFullYear()}/${Math.floor(Math.random() * 900000) + 100000}`,
      verificationText: "This is a computer-generated document verified by FormatHub Digital Authority."
    };
  }
};
