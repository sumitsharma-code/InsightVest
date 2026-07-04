const express = require('express');
const { getCompanyByName } = require('../controllers/companyController');
const router = express.Router();

router.get("/:name", getCompanyByName);

module.exports = router;