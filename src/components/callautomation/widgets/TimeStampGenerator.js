import React, { useState, useEffect } from "react";
import "./TimeStampGenerator.css";

const TimeStampGenerator = ({
  onStartTimeChange,
  setMinuteClicked,
  startTime,
}) => {
  let hour = "";
  let minutes = "";
  if (startTime) {
    hour = parseInt(startTime.split(":")[0]);
    minutes = parseInt(startTime.split(":")[1]);
  }
  const [startHour, setStartHour] = useState(hour !== "" ? hour : 8);
  const [endHour, setEndHour] = useState(19);
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
      newTimestamps.push(`${String(hour).padStart(2, "0")}:00`);
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

      newTimestamps.push(
        `${String(selectedHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
      );
    }

    setTimestamps(newTimestamps);
    setSelectedHour(selectedHour);
    setSelectedMinute(selectedMinute);

    // Update the selected time
    onStartTimeChange(`${String(selectedHour).padStart(2, "0")}:${String(selectedMinute).padStart(2, "0")}`);

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
              selectedHour === parseInt(timestamp.split(":")[0]) &&
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
