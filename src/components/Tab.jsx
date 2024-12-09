//src/components/Tab.jsx

import React, { useState } from 'react';
import GeneralNews from './GeneralNews';
import ArcelorMittalNews from './ArcelorMittalNews';
import LanguageSelector from './LanguageSelector';
import DateRangePicker from './DateRangePicker';


const NewsDashboard = ({setShareArticle}) => {
  const [language, setLanguage] = useState('en');
  const [selectedNews, setSelectedNews] = useState('general');
  const [dateRange, setDateRange] = useState ([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <div style={{ padding: '20px' }}>
          <h1>News Dashboard</h1>
          <LanguageSelector language={language} setLanguage={setLanguage} />

       <div>
        <button
          onClick={() => setSelectedNews('general')}>
            General Industry News
        </button>
        <button
          onClick={() => setSelectedNews('arcelormittal')}>
            ArcelorMittal News
        </button>
       </div>

       <DateRangePicker dateRange={dateRange} onChange={setDateRange} />
       
       {selectedNews === 'general' && (
        <div><GeneralNews language={language} startDate={startDate} endDate={endDate} setShareArticle={setShareArticle} /></div>
      )}

      {selectedNews === 'arcelormittal' && (
        <div><ArcelorMittalNews language={language} /></div>
      )}
      </div>
  );
};

export default NewsDashboard;