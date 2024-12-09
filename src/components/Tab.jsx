//src/components/Tab.jsx
import "./Tab.css";

import React, { useState } from "react";
import GeneralNews from "./GeneralNews";
import ArcelorMittalNews from "./ArcelorMittalNews";
import LanguageSelector from "./LanguageSelector";
import DateRangePicker from "./DateRangePicker";

const NewsDashboard = () => {
  const [language, setLanguage] = useState("en");
  const [selectedNews, setSelectedNews] = useState("general");
  const [dateRange, setDateRange] = useState([null, null]);
  const [fetchedNews, setFetchedNews] = useState([]);

  const [startDate, endDate] = dateRange;

  const mainNews = fetchedNews[0];
  const rightNews = fetchedNews.slice(1, 4);
  const bottomNews = fetchedNews.slice(4, 7);

  return (
    <div className="news-dasboard">
      <header className="header">
        <h1 className="quote">News Dashboard</h1>
        <div className="language-buttons">
          <LanguageSelector language={language} setLanguage={setLanguage} />
        </div>
      </header>

      <section className="welcome-section">
        <div className="filter-bar">
          <button
            className={`icon ${selectedNews === "general" ? "active" : ""}`}
            onClick={() => setSelectedNews("general")}
          >
            General Industry News
          </button>

          <button
            className={`icon ${
              selectedNews === "arcelormittal" ? "active" : ""
            }`}
            onClick={() => setSelectedNews("arcelormittal")}
          >
            ArcelorMittal News
          </button>

          <DateRangePicker dateRange={dateRange} onChange={setDateRange} />
        </div>
      </section>

      {selectedNews === "general" && (
        <GeneralNews
          language={language}
          startDate={startDate}
          endDate={endDate}
          setFetchedNews={setFetchedNews}
        />
      )}

      {selectedNews === "arcelor" && (
        <ArcelorMittalNews
          language={language}
          startDate={startDate}
          endDate={endDate}
          setFetchedNews={setFetchedNews}
        />
      )}

      {/* Render News Layout */}
      <div className="container">
        {/* Large Left Box */}
        {mainNews && (
          <div className="large-box">
            <img src={mainNews.urlToImage} alt="Main News" />
            <div className="card-content">
              <h3>{mainNews.title}</h3>
              <p>
                {mainNews.source.name} •{" "}
                {new Date(mainNews.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        {/* Right Boxes */}
        {rightNews.map((article, index) => (
          <div key={index} className="small-box">
            <img src={article.urlToImage} alt="News" />
            <div className="card-content">
              <h3>{article.title}</h3>
              <p>
                {article.source.name} •{" "}
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}

        {/* Bottom Boxes */}
        <div className="bottom-container">
          {bottomNews.map((article, index) => (
            <div key={index} className="bottom-box">
              <img src={article.urlToImage} alt="News" />
              <div className="card-content">
                <h3>{article.title}</h3>
                <p>
                  {article.source.name} •{" "}
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer"></footer>
    </div>
  );
};

export default NewsDashboard;
