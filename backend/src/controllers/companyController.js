const { 
    getCompanyProfile, 
    getCashFlow 
} = require("../services/financialService");
const { summarizeCompanyData } = require("../services/researchService");
const { analyzeResearchData } = require("../services/aiService");

async function getCompanyByName(req, res) {
    const symbol = req.params.name.toUpperCase();

    // Set headers for Event Stream
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    // Flush headers to start streaming immediately
    if (res.flushHeaders) {
        res.flushHeaders();
    }

    const sendUpdate = (stage, message) => {
        res.write(`data: ${JSON.stringify({ stage, message })}\n\n`);
    };

    try {
        sendUpdate('PROFILE', `Fetching company overview for ${symbol}...`);
        const profile = await getCompanyProfile(symbol);

        sendUpdate('CASHFLOW', `Retrieving recent cash flow reports for ${symbol}...`);
        const cashFlow = await getCashFlow(symbol);

        sendUpdate('SUMMARIZE', `Compiling metrics and structuring financial records...`);
        const rawData = {
            profile,
            financials: {
                cashFlow,
            },
        };
        const summary = summarizeCompanyData(rawData);

        sendUpdate('AI_ANALYZE', `Generating Google Gemini AI expert stock analysis...`);
        const aiAnalysis = await analyzeResearchData(summary);

        summary.aiAnalysis = aiAnalysis;

        sendUpdate('COMPLETE', summary);
        res.end();

    } catch (err) {
        console.error("Streaming API Error:", err.message);
        sendUpdate('ERROR', err.message);
        res.end();
    }
}


module.exports = {
    getCompanyByName
};