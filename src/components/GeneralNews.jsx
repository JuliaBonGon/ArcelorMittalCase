//src/components/GeneralNews.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GeneralNews = () => {
  const [newsArticles, setNewsArticles] = useState([]);


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
    <div div style={{ padding: '20px' }}>
      <h1>Industry General News</h1>
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
                <p>{article.source.name}, {new Date(article.publishedAt).toLocaleString()}</p>
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


export default GeneralNews;