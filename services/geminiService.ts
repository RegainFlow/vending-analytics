import { GoogleGenAI, Type } from "@google/genai";
import { AiAssessmentResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const assessVendorRisk = async (
  vendorName: string,
  description: string,
  historyData: string
): Promise<AiAssessmentResponse> => {
  try {
    const prompt = `
      Act as a senior QA Risk Officer for a construction management firm. 
      Evaluate the following subcontractor based on the provided description and operational history notes.
      
      Vendor Name: ${vendorName}
      Description/Notes: ${description}
      Operational History: ${historyData}

      Assign numerical scores (0-100) for Financial Health, Safety Record, Project Performance, and Compliance.
      Determine an overall weighted score and a Risk Level (Low, Medium, High, Critical).
      Provide a concise summary justifying the assessment.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High", "Critical"] },
            overallScore: { type: Type.NUMBER },
            financialHealth: { type: Type.NUMBER },
            safetyRecord: { type: Type.NUMBER },
            projectPerformance: { type: Type.NUMBER },
            compliance: { type: Type.NUMBER },
            summary: { type: Type.STRING },
          },
          required: ["riskLevel", "overallScore", "financialHealth", "safetyRecord", "projectPerformance", "compliance", "summary"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AiAssessmentResponse;
  } catch (error) {
    console.error("AI Assessment failed:", error);
    // Fallback for demo purposes if API fails or key is missing
    return {
      riskLevel: "Medium",
      overallScore: 75,
      financialHealth: 70,
      safetyRecord: 80,
      projectPerformance: 75,
      compliance: 75,
      summary: "AI Service unavailable. Defaulting to medium risk assessment based on generic fallback."
    };
  }
};