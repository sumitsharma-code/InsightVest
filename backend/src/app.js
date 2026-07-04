const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// routes
const companyRoutes = require('./routes/companyRoutes');
app.use("/api/company", companyRoutes);

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "up" });
});

module.exports = app;