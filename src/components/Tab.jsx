import React from 'react';
import GeneralNews from './GeneralNews';
import ArcelorMittalNews from './ArcelorMittalNews';

const NewsDashboard = () => {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* General News Column */}
      <div style={{ flex: 1 }}>
        <GeneralNews />
      </div>

      {/* ArcelorMittal News Column */}
      <div style={{ flex: 1 }}>
        <ArcelorMittalNews />
      </div>
    </div>
  );
};

export default NewsDashboard;