import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { DateObject } from "react-multi-date-picker";
import { Checkbox } from "antd";
import "./DateRangePicker.css";

const format = "MM/DD/YYYY";

const DataRangePicker = ({
  width,
  selectedRanges,
  setSelectedRanges,
  selectRandom,
  format,
}) => {
  const [minDate, setMinDate] = useState(new Date());

  const handleDateSelection = (selectedDates) => {
    // Format and manipulate the data as needed before storing it in selectedRanges
    setSelectedRanges(selectedDates);
  };

  return (
    <div className="date-picker">
      <div
        style={{
          textAlign: "left",
          margin: "1vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DatePicker
          inputClass="date-picker-input"
          value={selectedRanges}
          placeholder="Select Dates"
          onChange={handleDateSelection}
          multiple
          style={{ width: width }}
          sort
          format={format}
          calendarPosition="bottom-left"
          plugins={[<DatePanel position="right" />]}
          range={!selectRandom || undefined}
          minDate={minDate} // Set the minimum allowed date
        />
      </div>
    </div>
  );
};

export default DataRangePicker;
