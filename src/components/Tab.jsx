//src/components/Tab.jsx

import React, { useState } from 'react';
import GeneralNews from './GeneralNews';
import ArcelorMittalNews from './ArcelorMittalNews';
import LanguageSelector from './LanguageSelector';

const NewsDashboard = () => {
  const [language, setLanguage] = useState('en');
  const [selectedNews, setSelectedNews] = useState('general');

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
       
       {selectedNews === 'general' && (
        <div><GeneralNews language={language} /></div>
      )}

      {selectedNews === 'arcelormittal' && (
        <div><ArcelorMittalNews language={language} /></div>
      )}
      </div>
  );
};

export default NewsDashboard;