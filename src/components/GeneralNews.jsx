//src/components/GeneralNews.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LanguageSelector from './LanguageSelector';

const GeneralNews = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [language, setLanguage] = useState (['en']);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const keywords =
        language === 'en'
          ? 'steel AND (industry OR manufacturing OR production)'
          : 'staal EN (industrie OF fabricage OF productie)';

        const response = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            apiKey: '782a0910ac184d9fabd9b80e27529016', 
            q: keywords, 
            language: language, 
            sortBy: 'relevancy',
          },
        });
        setNewsArticles(response.data.articles); 
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [language]); 

  return (
    
    <div div style={{ padding: '20px' }}>
      <LanguageSelector language={language} setLanguage={setLanguage} />
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