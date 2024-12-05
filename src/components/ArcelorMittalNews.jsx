//src/components/ArcelorMittalNews.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDate } from '../utils/dateUtils';

const ArcelorMittalNews = ({language}) => {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            apiKey: '782a0910ac184d9fabd9b80e27529016',
            q: 'ArcelorMittal',
            language: language, 
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
  }, [language]);

  const title = language === 'en' ? 'ArcelorMittal News' : 'ArcelorMittal Nieuws';
  
  return (
    <div div style={{ padding: '20px' }}>
      <h1>{title}</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {newsArticles.map((article, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
           <h2>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </h2>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <p>{article.description}</p>
                <p>{article.source.name}, {formatDate(article.publishedAt, language)}</p>
              </div>
              {article.urlToImage && (
                <img 
                  src={article.urlToImage} 
                  alt={article.title} 
                  style={{ 
                    width: '200px',  
                    height: 'auto', 
                    marginLeft: '20px', 
                    borderRadius: '8px' 
                  }} 
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArcelorMittalNews;
