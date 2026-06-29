const { crawlStore } = require('../services/crawler');
const { parseStoreData } = require('../services/parser');
const { generateCROAudit } = require('../services/ai');

const analyzeStore = async (req, res, next) => {
  try {
    const { url } = req.body;
    
    if (!url || !url.startsWith('http')) {
      return res.status(400).json({ error: 'Invalid URL provided' });
    }

    console.log(`Starting analysis for: ${url}`);

    // Step 1: Crawl the website
    console.log('Crawling website...');
    const rawData = await crawlStore(url);

    // Step 2: Parse and structure the data
    console.log('Parsing data...');
    const structuredData = parseStoreData(rawData);

    // Step 3: Run AI analysis
    console.log('Running AI analysis...');
    const audit = await generateCROAudit(structuredData);

    console.log('Analysis complete!');
    res.json(audit);

  } catch (error) {
    console.error('Error during analysis:', error);
    next(error);
  }
};

module.exports = {
  analyzeStore
};
