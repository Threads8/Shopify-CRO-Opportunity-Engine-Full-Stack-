const cheerio = require('cheerio');

const parseHomepage = (html) => {
  const $ = cheerio.load(html);
  return {
    title: $('title').text().trim(),
    h1: $('h1').first().text().trim(),
    metaDescription: $('meta[name="description"]').attr('content') || '',
    navigationLinks: $('nav a, header a').map((i, el) => $(el).text().trim()).get().filter(Boolean),
    ctaButtons: $('a, button').filter((i, el) => {
      const text = $(el).text().toLowerCase();
      return text.includes('shop') || text.includes('buy') || text.includes('get started');
    }).map((i, el) => $(el).text().trim()).get().slice(0, 5),
    imagesCount: $('img').length,
    headings: $('h2, h3').map((i, el) => $(el).text().trim()).get().filter(Boolean).slice(0, 10),
  };
};

const parseProduct = (html) => {
  const $ = cheerio.load(html);
  return {
    title: $('h1').first().text().trim(),
    priceText: $('.price, [class*="price"]').first().text().trim(),
    descriptionLength: $('[class*="description"], .product-single__description').text().trim().length,
    imagesCount: $('.product-single__photos img, [class*="gallery"] img').length || $('img').length,
    addToCartText: $('button[type="submit"], [class*="add-to-cart"]').first().text().trim(),
    hasReviews: $('[class*="review"], [class*="rating"]').length > 0
  };
};

const parseCollection = (html) => {
  const $ = cheerio.load(html);
  return {
    title: $('h1').first().text().trim(),
    productCount: $('[class*="product-card"], .grid__item').length,
    hasFilters: $('[class*="filter"], form[action*="filter"]').length > 0,
    hasSorting: $('select[name="sort_by"]').length > 0
  };
};

const parseCart = (html) => {
  const $ = cheerio.load(html);
  const textContent = $('body').text().toLowerCase();
  return {
    hasCheckoutButton: $('button[name="checkout"], [href*="/checkout"]').length > 0,
    checkoutButtonText: $('button[name="checkout"], [href*="/checkout"]').first().text().trim(),
    mentionsShipping: textContent.includes('shipping') || textContent.includes('delivery'),
    hasPromoCode: $('input[name="discount"]').length > 0 || textContent.includes('discount') || textContent.includes('promo'),
  };
};

const parseStoreData = (rawData) => {
  const structuredData = {
    homepage: parseHomepage(rawData.homepage),
    products: rawData.products.map(parseProduct),
    collections: rawData.collections.map(parseCollection),
    cart: parseCart(rawData.cart)
  };
  return structuredData;
};

module.exports = {
  parseStoreData
};
