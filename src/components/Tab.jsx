//src/components/Tab.jsx

import React, { useState } from 'react';
import GeneralNews from './GeneralNews';
import ArcelorMittalNews from './ArcelorMittalNews';
import LanguageSelector from './LanguageSelector';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const NewsDashboard = () => {
  const [language, setLanguage] = useState('en');
  const [selectedNews, setSelectedNews] = useState('general');
  const [dateRange, setDateRange] = useState ([null, null]);
  const [startDate, endDate] = dateRange;

  const handleDateRangeChange = (dates) => {
    setDateRange (dates);
  };

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

       <div style={{ marginTop: '20px' }}>
        <h3>Select Date Range:</h3>
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateRangeChange}
          isClearable
          dateFormat="dd-MM-yyyy"
          placeholderText="Choose date range"
        />
      </div>
       
       {selectedNews === 'general' && (
        <div><GeneralNews language={language} startDate={startDate} endDate={endDate} /></div>
      )}

      {selectedNews === 'arcelormittal' && (
        <div><ArcelorMittalNews language={language} /></div>
      )}
      </div>
  );
};

export default NewsDashboard;