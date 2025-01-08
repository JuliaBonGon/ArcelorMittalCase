//src/utils/deduplicateNews

import levenshtein from 'fast-levenshtein';

const normalizeText = (text) => text.replace(/\s+/g, ' ').trim().toLowerCase();

const deduplicateArticles = (articles, threshold = 0.8) => {
  const uniqueArticles = [];
  const seenIdentifiers = [];

  for (const article of articles) {
    const normalizedTitle = normalizeText(article.title);
    const normalizedDescription = normalizeText(article.description || '');
    const currentIdentifier = { title: normalizedTitle, description: normalizedDescription };

    let isDuplicate = false;

    for (const seen of seenIdentifiers) {
      const titleDistance = levenshtein.get(normalizedTitle, seen.title);
      const titleSimilarity = 1 - titleDistance / Math.max(normalizedTitle.length, seen.title.length);

      const descriptionDistance = levenshtein.get(normalizedDescription, seen.description);
      const descriptionSimilarity = 1 - descriptionDistance / Math.max(normalizedDescription.length, seen.description.length);

      if (titleSimilarity > threshold || descriptionSimilarity > threshold) {
        isDuplicate = true;
        break;
      }
    }

    if (!isDuplicate) {
      uniqueArticles.push(article);
      seenIdentifiers.push(currentIdentifier);
    }
  }

  return uniqueArticles;
};

export default deduplicateArticles;
