const normalizeText = (text) => text.replace(/\s+/g, ' ').trim().toLowerCase();

const deduplicateArticles = (articles) => {
  const seen = new Set();
  return articles.filter(article => {
    const identifier = normalizeText(article.title);
    if (seen.has(identifier)) {
      return false; 
    }
    seen.add(identifier);
    return true; 
  });
};

export default deduplicateArticles;
