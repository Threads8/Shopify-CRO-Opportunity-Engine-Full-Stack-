const axios = require('axios');
const cheerio = require('cheerio');

const crawlStore = async (targetUrl) => {
  const rawData = {
    homepage: '',
    products: [],
    collections: [],
    cart: ''
  };

  try {
    const fetchPage = async (url) => {
      try {
        const response = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          },
          timeout: 8000
        });
        return response.data;
      } catch (err) {
        console.warn(`Failed to fetch ${url}:`, err.message);
        return '';
      }
    };

    // 1. Crawl Homepage
    rawData.homepage = await fetchPage(targetUrl);
    
    // Find links to collections and products
    const $ = cheerio.load(rawData.homepage);
    
    let productLinks = [];
    let collectionLinks = [];

    $('a').each((i, el) => {
      const href = $(el).attr('href');
      if (href) {
        if (href.includes('/products/')) {
          try { productLinks.push(new URL(href, targetUrl).href); } catch(e){}
        } else if (href.includes('/collections/')) {
          try { collectionLinks.push(new URL(href, targetUrl).href); } catch(e){}
        }
      }
    });

    // Remove duplicates
    productLinks = [...new Set(productLinks)].slice(0, 2); // get up to 2 products
    collectionLinks = [...new Set(collectionLinks)].slice(0, 1); // get 1 collection

    // 2. Crawl Collection Page
    if (collectionLinks.length > 0) {
      const colHtml = await fetchPage(collectionLinks[0]);
      if (colHtml) rawData.collections.push(colHtml);
    } else {
      const colHtml = await fetchPage(new URL('/collections/all', targetUrl).href);
      if (colHtml) rawData.collections.push(colHtml);
    }

    // 3. Crawl Product Pages
    for (const pUrl of productLinks) {
      const pHtml = await fetchPage(pUrl);
      if (pHtml) rawData.products.push(pHtml);
    }

    // 4. Crawl Cart Page
    rawData.cart = await fetchPage(new URL('/cart', targetUrl).href);

  } catch (error) {
    console.error('Crawler error:', error);
    throw new Error(`Failed to crawl ${targetUrl}: ${error.message}`);
  }

  return rawData;
};

module.exports = {
  crawlStore
};
