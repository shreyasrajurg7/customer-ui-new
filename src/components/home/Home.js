import "./Home.css";
import Table from "../common/table/Table";
import Button from "../common/button/Button";
import Search from "../common/search/Search";
import {getProviderData, getBatchData} from "../../utils/CustomerUiAPI";
import { useEffect, useState } from "react";
import { useTheme } from "../../ThemeContext";

import { useNavigate } from "react-router-dom";
const Home = () => {
  const {batchtId, setBatchId} = useTheme();
  const [selected, setSelected] = useState("");
  const [batchData, setBatchData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [batchDataBackup, setBatchDataBackUp] = useState([]);
  const [billingPopup, setBillingPopup] = useState(false);
  // Define a sequential ID counter
  const [sequentialId, setSequentialId] = useState(0);

  const [loading, setLoading] = useState(false);
  const [page2Visible, setPage2Visible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getProviderData("hunnurji@voicecare.ai", "test-session-id")
      .then((res) => {
        getBatchData(
          res.response.providerId,
          "hunnurji@voicecare.ai",
          "test-session-id"
        ).then((data) => {
          // Assign sequential IDs to batch request data and keep the original batch_request_id
          const dataWithSequentialIds = data.response.map((item, index) => ({
            ...item,
            sequentialId: (sequentialId + index + 1)
              .toString()
              .padStart(5, "0"),
          }));

          setBatchData(dataWithSequentialIds);
          setBatchDataBackUp(dataWithSequentialIds);
          setLoading(false);
        });
      })
      .catch((err) => {
        setBillingPopup(true);
        console.log("error", err);
      });
  }, [sequentialId]);

  const handleSearch = (value) => {
    setFilterText(value);
    const filteredData = batchDataBackup.filter((row) => {
      const searchText = value.toLowerCase();
      // Check if any column (excluding "customer_input_filepath") contains the search text
      return Object.keys(row).some((key) => {
        if (key !== "customer_input_filepath" && typeof row[key] === "string") {
          return row[key].toLowerCase().includes(searchText);
        }
        return false; // Ignore "customer_input_filepath" and non-string values
      });
    });
    setBatchData(filteredData);
  };

  const handleCallHistoryClick = (id) => {
    setBatchId(id);
    navigate("/call-history");
  };

  const handleCallProcessClick = (id) => {
    setBatchId(id);
    setPage2Visible(true);
  };
  

  const columns = [
    { name: "sequentialId", label: "Batch Id", width: "20vh"},
    { name: "uploaded_by", label: "Uploaded By", width: "50vh"},
    { name: "uploaded_date", label:"Date", width: "35vh" },
    { name: "uploaded_time", label: "Time", width: "35vh" },
    {
      label: "Action",
      name: "Action",
      width: "30vh",
      render: (row) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            className="sidebar-home-icon"
            src={"/icons/call-process-mini-grey.svg"}
            title="Call and Process"
            onClick={() => handleCallProcessClick(row.batch_request_id)}
          />
          <img
            className="sidebar-home-icon"
            src={"/icons/call-history-mini-grey.svg"}
            title="Call History"
            onClick={() => handleCallHistoryClick(row.batch_request_id)}
          />
          <Button
            label={"Download"}
            onClick={() => handleTabClick(row.customer_input_filepath)}
            color={"#a8a7b4"}
          />
        </div>
      ),
    },
  ];

  const handleTabClick = (url) => {
    window.open(url, "_blank");
  };

  const handleButtonClick = (action) => {
    if (action === "reset") {
      setSelected("");
      setFilterText("");
      setBatchData(batchDataBackup);
    } else if (action === "createBatch") {
      navigate("/call-automation");
    }
  };
  
  return (
    <div className="home-root">
      <div style={{ display: "flex" }}>
        <span style={{ marginTop: "2vh", marginBottom: "2vh" }}>
          <Search onChange={handleSearch} />
        </span>
        <span style={{ margin: "2vh" }}>
          <Button
            label={"Reset"}
            color={"#ff4e3a"}
            width={"20vh"}
            height={"4vh"}
            onClick={() => handleButtonClick("reset")}
          />
        </span>
        <span style={{ margin: "2vh" }}>
          <Button
            label={"Create Batch"}
            color={"#ff4e3a"}
            width={"20vh"}
            height={"4vh"}
            onClick={() => handleButtonClick("createBatch")}
          />
        </span>
      </div>
      {loading ? <img className="loader" src="/icons/loader_white.gif" /> : <Table
        headerColor={"#302d4c"}
        dataColor={"#252244"}
        columns={columns}
        data={batchData}
        itemsPerPageOptions = {[5, 10, 20]}
        defaultItemsPerPage={10}
        maxHeight={"70vh"}
      />}
    </div>
  );
};

export default Home;
