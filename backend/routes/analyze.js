const express = require('express');
const { analyzeStore } = require('../controllers/analyzeController');

const router = express.Router();

router.post('/analyze', analyzeStore);

module.exports = router;
