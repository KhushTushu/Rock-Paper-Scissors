
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAITaunt = async (playerChoice: string, computerChoice: string, result: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The game is Rock-Paper-Scissors. The theme is a futuristic Neon Arena. 
      Player chose: ${playerChoice}. 
      AI Opponent chose: ${computerChoice}. 
      Result: Player ${result === 'WIN' ? 'Won' : result === 'LOSE' ? 'Lost' : 'Tied'}.
      Generate a short, snappy, futuristic taunt or comment (max 15 words) from the 'Logic Core' AI.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING }
          }
        }
      }
    });

    const data = JSON.parse(response.text || '{"text": "Logic sequence completed."}');
    return data.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return result === 'WIN' ? "Luck detected. Analyzing patterns..." : "Efficiency optimized. Victory is logical.";
  }
};
