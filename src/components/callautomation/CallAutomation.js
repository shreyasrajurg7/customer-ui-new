import "./CallAutomation.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DateRangePicker from "../common/dateRangePicker/DateRangePicker";
import TimeStampGenerator from "./widgets/TimeStampGenerator";
import Button from "../common/button/Button";
import Table from "../common/table/Table";
import Popup from "react-animated-popup";
import {   pushProviderPatientData, getErrorData} from "../../utils/CustomerUiAPI";

import { read, utils } from "xlsx";

const CallAutomation = () => {
  const [isReccuring, setIsReccuring] = useState(false);

  const [batchId, setBatchId] = useState("");
  const [hideUpload, setHideUpload] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [allowedTypes, setAllowedTypes] = useState([
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
  ]);
  
  const [errorList, setErrorList] = useState([]);
  const [focusedFile, setFocusedfile] = useState(null);
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
  const [submitClicked, setSubmitClicked] = useState(false);

  const [transormedData, setTransformedData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  
  const [errorOpen, setErrorOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const data = getManualContent();
    setTransformedData(data);
    setFilteredData(data);
  }, [selectedFiles]);

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

  const submitValidate = () => {
    if (callStartTime && selectedRanges.length > 0 && callEndTime) {
      return true;
    } else {
      return false;
    }
  };

  const getErrorInData = (batch_request_id, emailId, currentSessionId) => {
    getErrorData(batch_request_id, emailId, currentSessionId)
      .then((res) => {
        console.log("resaa", res);
        if (res === "") {
          setErrorOpen(true);
        }
        if (res.statusCode === 200) {
          setErrorOpen(true);
          // Check if the response is a success (status code 200 or 204)
          if (res.data && res.data.length > 0) {
            setErrorList(res.data);
          }
        } else {
          // Handle other status codes here if needed
          console.error("Unexpected status code:", res.status);
          // Handle the error accordingly
        }
        setLoading(false);
      })
      .catch((error) => {
        // Handle any network or request errors here
        console.error("Error:", error);
        // Handle the error accordingly
      });
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
    setSubmitClicked(true);
    const batchId = generateBatchId("test-session-id");
    const data = {
      payor: "",
      batch_request_id: batchId,
      recurring: isReccuring,
      start_date: [],
      end_date: [],
      selected_dates: [],
      start_time: [`${callStartTime}:00`],
      end_time: [`${callEndTime}:00`],
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
    navigate("/home");
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

  const handleFileInput = (e) => {
    setHideUpload(false);
    const newFiles = Array.from(e.target.files).filter(
      (file) =>
        allowedTypes.includes(file.type) &&
        !selectedFiles.some((selectedFile) => selectedFile.name === file.name)
    );

    Promise.all(
      newFiles.map(async (file) => {
        const data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsBinaryString(file);
          reader.onload = (event) => {
            try {
              const binaryString = event.target.result;
              const workbook = read(binaryString, { type: "binary" });
              const sheetName = workbook.SheetNames[0];
              const sheet = workbook.Sheets[sheetName];
              const jsonData = utils.sheet_to_json(sheet, { header: 1 });
              resolve(jsonData);
            } catch (error) {
              reject(error);
            }
          };
          reader.onerror = (error) => {
            reject(error);
          };
        });
        return {
          name: file.name,
          type: file.type,
          size: file.size,
          data: data,
        };
      })
    )
      .then((results) => {
        setFocusedfile(0);
        setSelectedFiles([...selectedFiles, ...results]);
        setAllowedTypes((prevAllowedTypes) => [
          ...prevAllowedTypes,
          ...newFiles.map((file) => file.type),
        ]);
        e.target.value = null; // clear value of file input element
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getColumns = () => {
    if (selectedFiles.length > 0) {
      const data = selectedFiles[focusedFile].data;
      const columns = transformToColumns(data[0]);
      return columns;
    }
  };

  function transformToColumns(dataArray) {
    return dataArray.map((propertyName) => ({
      name: propertyName,
      label: propertyName,
      selector: (row) => row[propertyName],
      reorder: true,
    }));
  }

  function removeDuplicates(arr) {
    return arr.filter(
      (item, index, self) =>
        index ===
        self.findIndex((obj) => JSON.stringify(obj) === JSON.stringify(item))
    );
  }

  function transformDataForReactTable(data) {
    const headers = data[0];
    const rows = data.slice(1);
    const filteredArr = removeDuplicates(
      rows.filter((subArr) => subArr.length > 0)
    );
    return filteredArr.map((row) => {
      const rowData = {};

      for (let i = 0; i < headers.length; i++) {
        rowData[headers[i]] = row[i];
      }

      return rowData;
    });
  }

  const getManualContent = () => {
    if (selectedFiles.length > 0) {
      const mergedData = selectedFiles.reduce((merged, file) => {
        const fileData = file.data;
        // You can perform any necessary transformations here
        // For example, if the data needs to be flattened or processed in any way

        return merged.concat(fileData);
      }, []);
      debugger;
      const response = transformDataForReactTable(mergedData);
      debugger;
      return response;
    } else {
      return []; // Return an empty array when there are no selected files
    }
  };

  const handleSearch = (value) => {
    const data = getManualContent();
    setSearchText(value);
    if (value.trim() === "") {
      // If the search text is empty, show the original data
      setFilteredData(data);
    } else {
      // Otherwise, filter the data based on the search text
      const filteredData = data.filter((row) => {
        const searchText = value.toLowerCase();
        // Check if any column (excluding "customer_input_filepath") contains the search text
        return Object.keys(row).some((key) => {
          if (typeof row[key] === "string") {
            return row[key].toLowerCase().includes(searchText);
          }
          return false; // Ignore "customer_input_filepath" and non-string values
        });
      });
      console.log("Filtered Data:", filteredData); // Add this line to check the filtered data
      setFilteredData(filteredData);
    }
  };

  const handleUpload = () => {
    const batchId = generateBatchId("test-session-id");
    setBatchId(batchId);
    setHideUpload(true);
    setLoading(true);
    pushProviderPatientData(
      { frequency, data: transormedData },
      "hunnurji@voicecare.ai",
      "test-session-id",
      batchId
    )
      .then((res) => {
        setTimeout(() => {
          getErrorInData(batchId, "hunnurji@voicecare.ai", "test-session-id");
        }, 4000);
        console.log("rs", res);
      })
      .catch(() => {
        setErrorOpen(true);
        setErrorList([{ error: "Failed uploading File" }]);
      });
  };

  const handleClose = () => {
    setErrorOpen(false);
    // setScheduleVisible(true);
    navigate("/home");
  };

  return (
    <div className="call-automation-root">
      {selectedFiles.length > 0 ? (
        <div style={{margin: "1vh"}}>
          <div style={{ margin: "2vh" }}>
            <input
              className="auto-info-input"
              type={"text"}
              placeholder="Search..."
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
            />
             <Button
                label={"Validate"}
                color={ "#ff4e3a"}
                width={"14vh"}
                height={"4vh"}
                onClick={handleUpload}
              />
          </div>
          <div style={{margin: "2vh", width: "84vw"}}>
          <Table
            headerColor={"#302d4c"}
            dataColor={"#252244"}
            columns={getColumns()}
            data={filteredData}
            itemsPerPageOptions={[5, 10, 20]}
            defaultItemsPerPage={10}
            maxHeight={"70vh"}
          />
          </div>
        </div>
      ) : (
        <div className="call-automation-inner-root">
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
                <span>
                  Start Time: {callStartTime ? callStartTime : "--:--"}
                </span>
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
                onClick={handleCancel}
              />
              <Button
                label={"Submit"}
                color={submitValidate() ? "#ff4e3a" : "#3e3b56"}
                width={"14vh"}
                height={"4vh"}
                disabled={!submitValidate()}
                onClick={handleSubmit}
              />
            </span>
          </div>
          <div className="ca-right-section">
            <div className="cars-page-one">
              {submitClicked ? (
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    tyle={{
                      margin: "1vh",
                    }}
                  >
                    Upload File
                  </span>
                  <span
                    style={{
                      display: "flex",
                      backgroundColor: "#ff4e3a",
                      color: "#fff",
                      padding: ".5vh",
                      width: "20vh",
                      margin: "1vh",
                      borderRadius: "1vh",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      document.getElementById("file-input").click();
                    }}
                  >
                    <img
                      className="sidebar-home-icon"
                      src="/icons/folder.svg"
                    />
                    Browse
                    <input
                      id="file-input"
                      type="file"
                      accept=".xls,.xlsx,.csv"
                      onChange={(e) => handleFileInput(e)}
                      multiple
                      style={{ display: "none" }}
                    />
                  </span>
                  {console.log("sel", selectedFiles)}
                </span>
              ) : (
                <span>Select all settings to load this section</span>
              )}
            </div>
          </div>
        </div>
      )}
      <Popup
          visible={errorOpen}
          onClose={() => handleClose()}
          className="error-popup"
        >
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            {errorList.length === 0
              ? "Data Validated Succesfully"
              : "Error in data"}
          </div>
          <Button
                label={"Return Home"}
                color={"#ff4e3a"}
                width={"14vh"}
                height={"4vh"}
                onClick={handleClose}
              />
        </Popup>
    </div>
  );
};
export default CallAutomation;
