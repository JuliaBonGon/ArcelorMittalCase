//src/components/GeneralNews.jsx

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { formatDate } from '../utils/dateUtils';
import deduplicateArticles from '../utils/deduplicateNews';
import filterRemovedArticles from '../utils/filterRemovedArticles';

const GeneralNews = ({ language, startDate, endDate, setShareArticle }) => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [sortBy, setSortBy] = useState('publishedAt');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const keywords =
          language === 'en'
            ? 'steel AND (industry OR manufacturing OR production)'
            : 'staal AND (industrie OR productie)';

        const response = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            apiKey: process.env.REACT_APP_API_KEY,
            q: keywords,
            language: language,
            from: startDate ? startDate.toISOString().split('T')[0] : undefined,
            to: endDate ? endDate.toISOString().split('T')[0] : undefined,
            sortBy: sortBy,
          },
        });

        const filteredArticles = filterRemovedArticles(response.data.articles);

        const uniqueArticles = deduplicateArticles(filteredArticles);
        setNewsArticles(uniqueArticles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [language, sortBy, startDate, endDate]);

  const title = language === 'en' ? 'Steel Industry General News' : 'Staal Industrie Algemeen Nieuws';

  const sortOptions = language === 'en'
    ? [
      { value: 'relevancy', label: 'Relevancy' },
      { value: 'popularity', label: 'Popularity' },
      { value: 'publishedAt', label: 'Newest first' },
    ]
    : [
      { value: 'relevancy', label: 'Relevantie' },
      { value: 'popularity', label: 'Populariteit' },
      { value: 'publishedAt', label: 'Nieuwste eerst' },
    ];

  return (
    <div style={{ padding: '20px' }}>

      <h1>{title}</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="sortBy" style={{ marginRight: '10px' }}></label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {newsArticles.map((article, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            <h2 style={{display: "flex", flexDirection: "row", gap: "20px"}}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
              <Link to="/tab/share">
                <button onClick={() => setShareArticle(article)}>SHARE</button>
              </Link>
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


export default GeneralNews;