//src/components/ArcelorMittalNews.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDate } from "../utils/dateUtils";
import deduplicateArticles from "../utils/deduplicateNews";
import filterRemovedArticles from "../utils/filterRemovedArticles";

const ArcelorMittalNews = ({
  language,
  startDate,
  endDate,
  setFetchedNews,
}) => {
  const [sortBy, setSortBy] = useState("publishedAt");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const keywords = "ArcelorMittal";
        const response = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            apiKey: process.env.REACT_APP_API_KEY,
            q: "ArcelorMittal",
            language: language,
            sortBy: sortBy,
            from: startDate ? startDate.toISOString().split("T")[0] : undefined,
            to: endDate ? endDate.toISOString().split("T")[0] : undefined,
          },
        });

        const filteredArticles = filterRemovedArticles(response.data.articles);
        const uniqueArticles = deduplicateArticles(filteredArticles);

        setFetchedNews(uniqueArticles);
      } catch (error) {
        console.error("Error fetching ArcelorMittal news:", error);
      }
    };

    fetchNews();
  }, [language, sortBy, startDate, endDate, setFetchedNews]);

  const title =
    language === "en" ? "ArcelorMittal News" : "ArcelorMittal Nieuws";

  const sortOptions =
    language === "en"
      ? [
          { value: "relevancy", label: "Relevancy" },
          { value: "popularity", label: "Popularity" },
          { value: "publishedAt", label: "Newest first" },
        ]
      : [
          { value: "relevancy", label: "Relevantie" },
          { value: "popularity", label: "Populariteit" },
          { value: "publishedAt", label: "Nieuwste eerst" },
        ];

  // return (
  //   <div div style={{ padding: "20px" }}>
  //     <h1>{title}</h1>
  //     <div>
  //       <label htmlFor="sortBy" style={{ marginRight: "10px" }}></label>
  //       <select
  //         id="sortBy"
  //         value={sortBy}
  //         onChange={(e) => setSortBy(e.target.value)}
  //       >
  //         {sortOptions.map((option) => (
  //           <option key={option.value} value={option.value}>
  //             {option.label}
  //           </option>
  //         ))}
  //       </select>
  //     </div>
  //     <ul style={{ listStyleType: "none", padding: 0 }}>
  //       {newsArticles.map((article, index) => (
  //         <li key={index} style={{ marginBottom: "20px" }}>
  //           <h2>
  //             <a href={article.url} target="_blank" rel="noopener noreferrer">
  //               {article.title}
  //             </a>
  //           </h2>
  //           <div style={{ display: "flex", alignItems: "flex-start" }}>
  //             <div style={{ flex: 1 }}>
  //               <p>{article.description}</p>
  //               <p>
  //                 {article.source.name},{" "}
  //                 {formatDate(article.publishedAt, language)}
  //               </p>
  //             </div>
  //             {article.urlToImage && (
  //               <img
  //                 src={article.urlToImage}
  //                 alt={article.title}
  //                 style={{
  //                   width: "200px",
  //                   height: "auto",
  //                   marginLeft: "20px",
  //                   borderRadius: "8px",
  //                 }}
  //               />
  //             )}
  //           </div>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
  return null;
  const noNewsFound =
    language === "en"
      ? "No news found for the selected dates."
      : "Geen nieuws gevonden voor de geselecteerde periode.";

  return (
    <div div style={{ padding: "20px" }}>
      <h1>{title}</h1>
      <div>
        <label htmlFor="sortBy" style={{ marginRight: "10px" }}></label>
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
      {newsArticles.length === 0 ? (
        <p style={{ color: "red", fontWeight: "bold" }}>{noNewsFound}</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {newsArticles.map((article, index) => (
            <li key={index} style={{ marginBottom: "20px" }}>
              <h2>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h2>
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <p>{article.description}</p>
                  <p>
                    {article.source.name},{" "}
                    {formatDate(article.publishedAt, language)}
                  </p>
                </div>
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    style={{
                      width: "200px",
                      height: "auto",
                      marginLeft: "20px",
                      borderRadius: "8px",
                    }}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArcelorMittalNews;
