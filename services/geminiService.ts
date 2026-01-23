
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAuthenticDetails = async (courseName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a professional, authentic-looking certificate identification number and a 1-sentence verification message for a computer course named "${courseName}". 
      Return the response in JSON format with keys: "id" (e.g., ISO-9001/CERT/2024/001), "verificationText" (e.g., This document is electronically verified by the Board of Technical Education).`,
      config: {
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      id: `CERT-${Math.floor(Math.random() * 900000) + 100000}`,
      verificationText: "This is a computer-generated certificate and does not require a physical signature."
    };
  }
};
