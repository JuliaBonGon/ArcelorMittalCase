// src/components/LanguageSelector.jsx

import React from 'react';

const LanguageSelector = ({ language, setLanguage }) => {
  const isEnglish = language === 'en';

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
    
      <button
        onClick={() => setLanguage('en')}
        style={{
          padding: '10px 15px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: isEnglish ? '#204257' : '#ddd', 
          color: isEnglish ? 'white' : 'black',
          borderRadius: '5px',
          fontWeight: isEnglish ? 'bold' : 'normal',
        }}
      >
        EN
      </button>

      <button
        onClick={() => setLanguage('nl')}
        style={{
          padding: '10px 15px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: isEnglish ? '#ddd' : '#204257',
          color: isEnglish ? 'black' : 'white',
          borderRadius: '5px',
          fontWeight: isEnglish ? 'normal' : 'bold',
        }}
      >
        NL
      </button>
    </div>
  );
};

export default LanguageSelector;
