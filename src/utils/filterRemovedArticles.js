const filterRemovedArticles = (articles) => {
    return articles.filter((article) =>
        !(article.title && article.title.includes('[Removed]') &&
        article.description && article.description.includes('[Removed]') &&
        article.content && article.content.includes('[Removed]')
        )
      );
    };
    
    export default filterRemovedArticles;