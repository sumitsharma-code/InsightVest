const { getCompanyResearch } = require("../services/financialService");
const { summarizeCompanyData } = require("../services/researchService");

async function getCompanyByName(req, res) {

    try {

        const symbol = req.params.name.toUpperCase();

        const rawData = await getCompanyResearch(symbol);

        const summary = summarizeCompanyData(rawData);

        res.json(summary);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

}

module.exports = {
    getCompanyByName
};