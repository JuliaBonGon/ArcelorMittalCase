//src/components/Tab.jsx
import "./Tab.css";
import { useState, useEffect } from "react";
import axios from "axios";

// import GeneralNews from "./GeneralNews";
// import ArcelorMittalNews from "./ArcelorMittalNews";
import LanguageSelector from "./LanguageSelector";
import DateRangePicker from "./DateRangePicker";
import { formatDate } from "../utils/dateUtils";
import deduplicateArticles from "../utils/deduplicateNews";
import filterRemovedArticles from "../utils/filterRemovedArticles";

const NewsDashboard = () => {
  const [language, setLanguage] = useState("en");
  const [selectedNews, setSelectedNews] = useState("general");
  const [dateRange, setDateRange] = useState([null, null]);
  const [fetchedNews, setFetchedNews] = useState([]);

  const [startDate, endDate] = dateRange;

  const mainNews = fetchedNews[0];
  const rightNews = fetchedNews.slice(1, 4);
  const bottomNews = fetchedNews.slice(4, 7);

  const noNewsFound =
    language === "en"
      ? "No news found for the selected dates"
      : "Geen nieuws gevonden voor de geselecteerde datumbereik";

  const title =
    language === "en"
      ? "Steel Industry General News"
      : "Staal Industrie Algemeen Nieuws";

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

  const [sortBy, setSortBy] = useState("publishedAt");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // const keywords =
        //   language === "en"
        //     ? "steel AND (industry OR manufacturing OR production)"
        //     : "staal AND (industrie OR productie)";
        const keywords =
          selectedNews === "arcelormittal"
            ? "arcelormittal"
            : language === "en"
            ? "steel AND (industry OR manufacturing OR production)"
            : "staal AND (industrie OR productie)";

        const response = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            apiKey: process.env.REACT_APP_API_KEY,
            q: keywords,
            language: language,
            from: startDate ? startDate.toISOString().split("T")[0] : undefined,
            to: endDate ? endDate.toISOString().split("T")[0] : undefined,
            sortBy: sortBy,
          },
        });

        const filteredArticles = filterRemovedArticles(response.data.articles);

        const uniqueArticles = deduplicateArticles(filteredArticles);
        setFetchedNews(uniqueArticles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [language, sortBy, startDate, endDate, selectedNews]);

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>{title}</h1>
        <div style={{ marginBottom: "20px" }}>
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
      </div>

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

        {/* {selectedNews === "general" && (
        <GeneralNews
          language={language}
          startDate={startDate}
          endDate={endDate}
          setFetchedNews={setFetchedNews}
        />
      )} */}

        {/* {selectedNews === "arcelor" && (
          <ArcelorMittalNews
            language={language}
            startDate={startDate}
            endDate={endDate}
            setFetchedNews={setFetchedNews}
          />
        )} */}

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
                  {formatDate(mainNews.publishedAt, language)}
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
                  {/* {new Date(article.publishedAt).toLocaleDateString()} */}
                  {formatDate(article.publishedAt, language)}
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
                    {formatDate(article.publishedAt, language)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="footer"></footer>
      </div>
    </>
  );
};

export default NewsDashboard;
