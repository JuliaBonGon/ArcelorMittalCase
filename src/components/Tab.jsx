//src/components/Tab.jsx

import React, { useState } from 'react';
import GeneralNews from './GeneralNews';
import ArcelorMittalNews from './ArcelorMittalNews';
import LanguageSelector from './LanguageSelector';

const NewsDashboard = () => {
  const [language, setLanguage] = useState('en');

  return (
    <div style={{ padding: '20px' }}>
          <h1>News Dashboard</h1>
          {/* Language Selector */}
          <LanguageSelector language={language} setLanguage={setLanguage} />


        <div style={{ display: 'flex', gap: '20px' }}>
          {/* General News Column */}
          <div style={{ flex: 1 }}>
            <GeneralNews language={language} />
          </div>

          {/* ArcelorMittal News Column */}
          <div style={{ flex: 1 }}>
            <ArcelorMittalNews language={language} />
          </div>
        </div>
      </div>
  );
};

export default NewsDashboard;