import React, { useState, useEffect } from "react";
import "./TimeStampGenerator.css";

const TimeStampGenerator = ({
  onStartTimeChange,
  setMinuteClicked,
  startTime,
}) => {
  let hour = "";
  let minutes = ""
  if (startTime) {
    hour = parseInt(startTime.split(":")[0]);
    minutes = parseInt(startTime.split(":")[1]);
  }
  const [startHour, setStartHour] = useState(hour !== "" ? hour : 9);
  const [endHour, setEndHour] = useState(18);
  const [timestamps, setTimestamps] = useState([]);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);
  const [firstClick, setFirstClick] = useState(null);

  useEffect(() => {
    generateOneHourTimestamps();
  }, []);

  const generateOneHourTimestamps = () => {
    const newTimestamps = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      newTimestamps.push(`${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`);
    }

    setTimestamps(newTimestamps);
    setSelectedHour(null);
    setSelectedMinute(null);
  };

  const generateFifteenMinuteTimestamps = (selectedHour, selectedMinute) => {
  const newTimestamps = [];
  
  for (let minute = 0; minute < 60; minute += 15) {
    if (selectedHour === hour) {
      if (minute < minutes) {
        // Skip generating timestamps that are earlier than the provided time
        continue;
      }
    }

    let isMorning = selectedHour < 12;
    
    if (selectedHour === hour && minute === 0) {
      // Always include the selected time
      newTimestamps.push(
        `${selectedHour % 12 || 12}:${String(minute).padStart(2, "0")} ${isMorning ? "AM" : "PM"}`
      );
    } else {
      // Determine whether it's in the morning or afternoon/evening
      isMorning = selectedHour < 12 || (selectedHour === 12 && minute === 0);
      newTimestamps.push(
        `${selectedHour % 12 || 12}:${String(minute).padStart(2, "0")} ${isMorning ? "AM" : "PM"}`
      );
    }
  }
  
  setTimestamps(newTimestamps);
  setSelectedHour(selectedHour);
  setSelectedMinute(selectedMinute);
  
  // Update the selected time
  const formattedMinute = selectedMinute === 0 ? "00" : selectedMinute;
  onStartTimeChange(`${selectedHour}:${formattedMinute}`);
  
  if (firstClick) {
    setFirstClick(null);
    // Trigger the second screen or setMinuteClicked(true) here
    // You should place the logic to show the second screen here
    setMinuteClicked(true);
  }
};

  

  const handleTimeClick = (hour, minute) => {
      generateFifteenMinuteTimestamps(hour, minute);
      setFirstClick(true);
  };

  return (
    <div>
      <span className="time-stamps">
        {timestamps.map((timestamp, index) => (
          <span
            className={`time-stamp${
              selectedHour === timestamp.split(":")[0] &&
              selectedMinute === parseInt(timestamp.split(":")[1])
                ? " selected"
                : ""
            }`}
            key={index}
            onClick={() =>
              handleTimeClick(
                parseInt(timestamp.split(":")[0]),
                parseInt(timestamp.split(":")[1])
              )
            }
          >
            {timestamp}
          </span>
        ))}
      </span>
    </div>
  );
};

export default TimeStampGenerator;
