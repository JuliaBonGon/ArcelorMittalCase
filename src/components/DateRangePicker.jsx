// src/components/DateRangePicker.jsx
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';

registerLocale('en-GB', enGB);

const DateRangePicker = ({ dateRange, onChange }) => {
  const [startDate, endDate] = dateRange;

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Select Date Range:</h3>
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        isClearable
        dateFormat="dd-MM-yyyy"
        placeholderText="Choose date range"
        locale="en-GB"
      />
    </div>
  );
};

export default DateRangePicker;
