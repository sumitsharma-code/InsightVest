require("dotenv").config();
const axios = require("axios");

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = "https://www.alphavantage.co/query";

// Common function for all API calls
const fetchData = async (params) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                ...params,
                apikey: API_KEY,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Alpha Vantage Error:", error.response?.data || error.message);
        throw error;
    }
};

// ===================== Company Overview =====================

const getCompanyProfile = async (symbol) => {
    const data = await fetchData({
        function: "OVERVIEW",
        symbol,
    });

    if (data.Note) {
        throw new Error(data.Note);
    }

    if (data.Information) {
        throw new Error(data.Information);
    }

    if (!data.Symbol) {
        throw new Error("Company not found");
    }

    return data;
};

// ===================== Income Statement =====================

const getIncomeStatement = async (symbol) => {
    return await fetchData({
        function: "INCOME_STATEMENT",
        symbol,
    });
};

// ===================== Balance Sheet =====================

const getBalanceSheet = async (symbol) => {
    return await fetchData({
        function: "BALANCE_SHEET",
        symbol,
    });
};

// ===================== Cash Flow =====================

const getCashFlow = async (symbol) => {
    return await fetchData({
        function: "CASH_FLOW",
        symbol,
    });
};

// ===================== Stock Quote =====================

const getQuote = async (symbol) => {
    return await fetchData({
        function: "GLOBAL_QUOTE",
        symbol,
    });
};

// ===================== News =====================

const getNews = async (symbol) => {
    return await fetchData({
        function: "NEWS_SENTIMENT",
        tickers: symbol,
    });
};

// ===================== Complete Research =====================

const getCompanyResearch = async (symbol) => {
    try {
        console.log(`Fetching research for ${symbol}...`);

        const profile = await getCompanyProfile(symbol);
        const incomeStatement = await getIncomeStatement(symbol);
        const balanceSheet = await getBalanceSheet(symbol);
        const cashFlow = await getCashFlow(symbol);
        const quote = await getQuote(symbol);
        const news = await getNews(symbol);

        return {
            profile,

            financials: {
                incomeStatement,
                balanceSheet,
                cashFlow,
            },

            market: {
                quote,
                news,
            },
        };
    } catch (error) {
        console.error("Research Error:", error.message);
        throw error;
    }
};

module.exports = {
    getCompanyProfile,
    getIncomeStatement,
    getBalanceSheet,
    getCashFlow,
    getQuote,
    getNews,
    getCompanyResearch,
};