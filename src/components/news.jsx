//src/Components/NewsComponents.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsComponent = () => {
  const [newsArticles, setNewsArticles] = useState([]);

  // Fetch news when the component mounts
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://newsapi.org/v2/everything?q=steel%20industry&apiKey=782a0910ac184d9fabd9b80e27529016&language=en&sortBy=publishedAt", {
          params: {
            apiKey: '782a0910ac184d9fabd9b80e27529016', 
            q: 'steel industry', 
            language: 'en', 
            sortBy: 'publishedAt',
          },
        });
        setNewsArticles(response.data.articles); 
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []); // 

  return (
    <div>
      <h1>Top News</h1>
      <ul>
        {newsArticles.map((article, index) => (
          <li key={index}>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsComponent;