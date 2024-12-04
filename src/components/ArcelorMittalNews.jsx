import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArcelorMittalNews = () => {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            apiKey: '782a0910ac184d9fabd9b80e27529016',
            q: 'ArcelorMittal',
            sortBy: 'publishedAt',
          },
        });

        const filteredArticles = response.data.articles.filter(
          (article) =>
            article.title.toLowerCase().includes("arcelormittal") ||
            article.description?.toLowerCase().includes("arcelormittal")
        );

        setNewsArticles(filteredArticles);
      } catch (error) {
        console.error("Error fetching ArcelorMittal news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h2>ArcelorMittal News</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {newsArticles.map((article, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            {article.urlToImage && (
              <img 
                src={article.urlToImage} 
                alt={article.title} 
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} 
              />
            )}
            <h2>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </h2>
            <p>{article.description}</p>
            <p>{article.source.name}</p>
            <p>{new Date(article.publishedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArcelorMittalNews;
