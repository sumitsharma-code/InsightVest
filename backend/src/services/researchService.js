// services/researchService.js

function formatLargeNumber(num) {
    if (!num) return "N/A";

    num = Number(num);

    if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";

    return num.toString();
}

function formatPercent(value) {
    if (!value) return "N/A";
    return (Number(value) * 100).toFixed(2) + "%";
}

const summarizeCompanyData = (data) => {

    const profile = data.profile;

    const cashFlow =
        data.financials.cashFlow.annualReports?.[0] || {};

    return {

        company: profile.Name,

        symbol: profile.Symbol,

        sector: profile.Sector,

        industry: profile.Industry,

        description: profile.Description,

        marketCap: formatLargeNumber(profile.MarketCapitalization),

        peRatio: profile.PERatio,

        eps: profile.EPS,

        revenue: formatLargeNumber(profile.RevenueTTM),

        profitMargin: formatPercent(profile.ProfitMargin),

        operatingMargin: formatPercent(profile.OperatingMarginTTM),

        analystTargetPrice: profile.AnalystTargetPrice,

        analystRatings: {

            strongBuy: profile.AnalystRatingStrongBuy,

            buy: profile.AnalystRatingBuy,

            hold: profile.AnalystRatingHold,

            sell: profile.AnalystRatingSell,

            strongSell: profile.AnalystRatingStrongSell

        },

        cashFlow: {

            operatingCashFlow: formatLargeNumber(
                cashFlow.operatingCashflow
            ),

            capitalExpenditure: formatLargeNumber(
                cashFlow.capitalExpenditures
            ),

            netIncome: formatLargeNumber(
                cashFlow.netIncome
            )

        }

    };

};

module.exports = {
    summarizeCompanyData
};