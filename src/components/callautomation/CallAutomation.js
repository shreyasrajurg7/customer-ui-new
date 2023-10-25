import "./CallAutomation.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DateRangePicker from "../common/dateRangePicker/DateRangePicker";
import TimeStampGenerator from "./widgets/TimeStampGenerator";
import Button from "../common/button/Button";
const CallAutomation = () => {
  const [isReccuring, setIsReccuring] = useState(false);

  const [callStartTime, setCallStartTime] = useState(null);
  const [minuteClicked, setMinuteClicked] = useState(false);
  const [callEndTime, setCallEndTime] = useState(null);
  const [callTimeSelectionError, setCallTimeSelectionError] = useState(false);
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [selectRandom, setSelectRandom] = useState(true);
  const [isDates, setIsDates] = useState(true);
  const navigate = useNavigate();
  const [frequency, setFrequency] = useState({});
  const format = "MM-DD-YYYY";
  const [startTimeClicked, setStartTimeClicked] = useState(false);
  const [endTimeClicked, setEndTimeClicked] = useState(false);
  const [automationFeature, setAutomationFeature] = useState("benifits");
  const [automationType, setAutomationType] = useState("manual");

  const generateBatchId = (sessionId) => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${sessionId}_${month}_${day}_${year}_${hours}_${minutes}_${seconds}`;
  };

  const handleRangeToggle = (value) => {
    setSelectedRanges([]);
    setSelectRandom(value);
  };

  const handleCallStartTimeChange = (value) => {
    setCallStartTime(value);
  };

  const handleCallEndTimeChange = (value) => {
    setCallTimeSelectionError(false);
    if (callStartTime < value) {
      setCallEndTime(value);
    } else {
      setCallEndTime(null);
      setCallTimeSelectionError(true);
    }
  };

  const submitValidate = () => {
    if (
      callStartTime &&
      selectedRanges.length > 0 &&
      callEndTime &&
      !callTimeSelectionError
    ) {
      return true;
    } else {
      return false;
    }
  };

  const dateConversion = (date) => {
    const mm = date.month.number.toString().padStart(2, "0");
    const dd = date.day.toString().padStart(2, "0");
    const year = date.year;
    return `${mm}-${dd}-${year}`;
  };

  const now = new Date();

  function formatCurrentDateToMMDDYYYY() {
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const year = currentDate.getFullYear();
    return `${month}-${day}-${year}`;
  }

  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleSubmit = () => {
    const batchId = generateBatchId("test-session-id");
    const data = {
      payor: "",
      batch_request_id: batchId,
      recurring: isReccuring,
      start_date: [],
      end_date: [],
      selected_dates: [],
      start_time: [callStartTime],
      end_time: [callEndTime],
      excludable_days: ["Saturday", "Sunday"],
      excludable_dates: [],
      uploaded_by: "hunnurji@voicecare.ai",
      uploaded_date: formatCurrentDateToMMDDYYYY(),
      uploaded_time: formattedTime,
      executed_by: "",
    };
    if (selectRandom) {
      // If random is false, populate start_date and end_date arrays
      selectedRanges.forEach((range) => {
        data.selected_dates.push(dateConversion(range));
      });
    } else {
      selectedRanges.forEach((ranges) => {
        data.start_date.push(dateConversion(ranges[0]));
        data.end_date.push(dateConversion(ranges[1]));
      });
    }
    setFrequency(data);
  };

  const handleCancel = () => {
    navigate("/Home");
  };

  const handleStartTimeChange = (time) => {
    setCallStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setCallEndTime(time);
  };

  const handleStartTimeClick = () => {
    setStartTimeClicked(!startTimeClicked);
    setCallEndTime(null);
    setEndTimeClicked(false);
    setMinuteClicked(false);
  };

  const handleEndTimeClick = () => {
    setEndTimeClicked(!endTimeClicked);

    setStartTimeClicked(false);
    setMinuteClicked(false);
  };

  const resetData = () => {
    setCallEndTime(null);
    setCallStartTime(null);
    setSelectRandom(true);
    setIsReccuring(false);
    setAutomationFeature("benifits");
    setAutomationType("manual");
  };

  return (
    <div className="call-automation-root">
      <div className="ca-left-section">
        <div class="cals-frequency">
          <button
            class={isReccuring ? "switch-freq-selected" : "switch-freq"}
            onClick={() => setIsReccuring(true)}
          >
            Recurring
          </button>
          <button
            class={!isReccuring ? "switch-freq-selected" : "switch-freq"}
            onClick={() => setIsReccuring(false)}
          >
            One Time
          </button>
        </div>
        <div class="cals-frequency">
          <button
            class={selectRandom ? "switch-freq-selected" : "switch-freq"}
            onClick={() => handleRangeToggle(true)}
          >
            Select Multiple Dates
          </button>
          <button
            class={!selectRandom ? "switch-freq-selected" : "switch-freq"}
            onClick={() => handleRangeToggle(false)}
          >
            Select Date Range
          </button>
        </div>
        <div>
          <DateRangePicker
            width={"37vh"}
            format={format}
            selectedRanges={selectedRanges}
            setSelectedRanges={setSelectedRanges}
            selectRandom={selectRandom}
          />
        </div>
        <div className="cals-time">
          <span className="cals-start-time">
            <span className="cals-start-time-btn">
              <img className="sidebar-home-icon" src="/icons/clock.svg" />
              Pick Start Time
              <img
                className="sidebar-home-icon"
                src="/icons/down.svg"
                onClick={() => handleStartTimeClick()}
              />
            </span>
            {!minuteClicked && startTimeClicked && (
              <TimeStampGenerator
                onStartTimeChange={handleStartTimeChange}
                setMinuteClicked={setMinuteClicked}
              />
            )}
          </span>
          <span className="cals-end-time">
            <span className="cals-end-time-btn">
              <img className="sidebar-home-icon" src="/icons/clock.svg" />
              Pick End Time
              <img
                className="sidebar-home-icon"
                src="/icons/down.svg"
                onClick={() => handleEndTimeClick()}
              />
            </span>
            {!minuteClicked && endTimeClicked && (
              <TimeStampGenerator
                onStartTimeChange={handleEndTimeChange}
                setMinuteClicked={setMinuteClicked}
                startTime={callStartTime}
              />
            )}
          </span>
          <span
            style={{
              display: "flex",
              margin: "1vh",
              justifyContent: "space-between",
            }}
          >
            <span>Start Time: {callStartTime ? callStartTime : "--:--"}</span>
            <span>End Time: {callEndTime ? callEndTime : "--:--"}</span>
          </span>
        </div>
        <select
          className="cals-select-auto-feature"
          value={automationFeature}
          onChange={(e) => setAutomationFeature(e.target.value)}
        >
          <option value={"benifits"}>Benifit Verification</option>
          <option value={"priorAuth"}>Prior Authentication</option>
        </select>
        <select
          className="cals-select-auto-feature"
          value={automationType}
          onChange={(e) => {
            setAutomationType(e.target.value);
          }}
        >
          <option value={"manual"}>Manual</option>
          <option value={"auto"}>Auto</option>
        </select>
        <span style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            label={"Reset"}
            color={"#3e3b56"}
            width={"14vh"}
            height={"4vh"}
            onClick={resetData}
          />
          <Button
            label={"Cancel"}
            color={"#3e3b56"}
            width={"14vh"}
            height={"4vh"}
          />
          <Button
            label={"Submit"}
            color={"#ff4e3a"}
            width={"14vh"}
            height={"4vh"}
          />
        </span>
      </div>
      <div className="ca-right-section">hellow</div>
    </div>
  );
};
export default CallAutomation;
