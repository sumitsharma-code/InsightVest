// take the object produced by researchService and ask gemini llm to analyze it

require("dotenv").config();
const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Analyzes research data using Gemini
 * @param {Object} researchData - The formatted summary object from summarizeCompanyData
 * @returns {Promise<Object>} The AI-generated stock analysis parsed as a JSON object
 */

const analyzeResearchData = async (researchData) => {
    try {
        if(!researchData || typeof researchData !== "object") {
            throw new Error("Invalid research data provided");
        }

        console.log(`Generating AI analysis for ${researchData.symbol}...`);

        const prompt = `
            You are an expert financial analyst. Analyze the following company research data and provide a concise, actionable investment summary.
            
            Company: ${researchData.company} (${researchData.symbol})
            Sector/Industry: ${researchData.sector} / ${researchData.industry}
            Description: ${researchData.description}
            
            Financial Metrics:
            - Market Cap: ${researchData.marketCap}
            - P/E Ratio: ${researchData.peRatio}
            - EPS: ${researchData.eps}
            - Revenue (TTM): ${researchData.revenue}
            - Profit Margin: ${researchData.profitMargin}
            - Operating Margin: ${researchData.operatingMargin}
            
            Cash Flow (Recent Annual):
            - Operating Cash Flow: ${researchData.cashFlow.operatingCashFlow}
            - Capital Expenditure: ${researchData.cashFlow.capitalExpenditure}
            - Net Income: ${researchData.cashFlow.netIncome}
            
            Market Expectations:
            - Analyst Target Price: $${researchData.analystTargetPrice}
        `;

        // Define the target structured JSON schema
        const analysisSchema = {
            type: Type.OBJECT,
            properties: {
                recommendation: { 
                    type: Type.STRING, 
                    description: "Investment rating decision (e.g., BUY, HOLD, SELL)" 
                },
                confidence: { 
                    type: Type.INTEGER, 
                    description: "Confidence percentage score from 1 to 100" 
                },
                summary: { 
                    type: Type.STRING, 
                    description: "High-level summary of the financial health and valuation assessment" 
                },
                strengths: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "List of key financial or operational strengths"
                },
                weaknesses: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "List of key financial or operational weaknesses"
                },
                risks: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "List of macro, industry, or company-specific risks"
                },
                bullCase: { 
                    type: Type.STRING, 
                    description: "The optimistic growth or upside potential narrative" 
                },
                bearCase: { 
                    type: Type.STRING, 
                    description: "The pessimistic downside or vulnerability narrative" 
                }
            },
            required: [
                "recommendation", 
                "confidence", 
                "summary", 
                "strengths", 
                "weaknesses", 
                "risks", 
                "bullCase", 
                "bearCase"
            ]
        };

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
            }
        });

        // Parse response text directly into JSON before returning
        return JSON.parse(response.text);

    } catch (error) {
        console.error("Gemini AI Analysis Error:", error.message);
        throw error;
    }
};

module.exports = {
    analyzeResearchData,
};