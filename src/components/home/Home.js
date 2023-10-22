import "./Home.css";
import Table from "../common/table/Table";
import Button from "../common/button/Button";
import Search from "../common/search/Search";
const Home = () => {
  const columns = [
    { name: "Batch ID", width: "20vh" },
    { name: "Uploaded By", width: "50vh" },
    { name: "Date", width: "35vh" },
    { name: "Time", width: "35vh" },
    {
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
            onClick={() => handleCallProcess(row)}
          />
          <img
            className="sidebar-home-icon"
            src={"/icons/call-history-mini-grey.svg"}
            onClick={() => handleCallHistory(row)}
          />
          <Button
            label={"Download"}
            onClick={() => handleDownload(row)}
            color={"#a8a7b4"}
          />
        </div>
      ),
    },
  ];

  const handleCallProcess = (row) => {
    // Handle the action here
    console.log(`Call Process button clicked`, row["Batch ID"]);
  };

  const handleCallHistory = (row) => {
    // Handle the action here
    console.log(`Call History button clicked`, row["Batch ID"]);
  };

  const handleDownload = (row) => {
    // Handle the action here
    console.log(`Download button clicked`, row["Batch ID"]);
  };

  

  const data = [
    {
      "Batch ID": "00001",
      "Uploaded By": "hunnurji@voicecare.ai",
      Date: "07 Oct, 2023",
      Time: "10 : 11 : 00",
    },
    {
      "Batch ID": "00002",
      "Uploaded By": "hunnurji@voicecare.ai",
      Date: "08 Oct, 2023",
      Time: "02 : 12 : 00",
    },
    {
      "Batch ID": "00003",
      "Uploaded By": "hunnurji@voicecare.ai",
      Date: "09 Oct, 2023",
      Time: "12 : 09 : 00",
    },
    {
      "Batch ID": "00004",
      "Uploaded By": "hunnurji@voicecare.ai",
      Date: "10 Oct, 2023",
      Time: "07 : 15 : 00",
    },
    {
      "Batch ID": "00005",
      "Uploaded By": "hunnurji@voicecare.ai",
      Date: "15 Oct, 2023",
      Time: "08 : 12 : 00",
    },
    {
      "Batch ID": "00006",
      "Uploaded By": "hunnurji@voicecare.ai",
      Date: "23 Oct, 2023",
      Time: "03 : 25 : 00",
    },
    {
      "Batch ID": "00007",
      "Uploaded By": "hunnurji@voicecare.ai",
      Date: "15 Oct, 2023",
      Time: "08 : 12 : 00",
    },
    {
      "Batch ID": "00008",
      "Uploaded By": "hunnurji@voicecare.ai",
      Date: "23 Oct, 2023",
      Time: "03 : 25 : 00",
    },
    {
      "Batch ID": "00009",
      "Uploaded By": "hunnurji@voicecare.ai",
      Date: "24 Oct, 2023",
      Time: "03 : 25 : 00",
    },
    {
      "Batch ID": "00010",
      "Uploaded By": "hunnurji@voicecare.ai",
      Date: "25 Oct, 2023",
      Time: "03 : 25 : 00",
    },
    {
      "Batch ID": "00011",
      "Uploaded By": "hunnurji@voicecare.ai",
      Date: "26 Oct, 2023",
      Time: "03 : 25 : 00",
    },
    {
      "Batch ID": "00012",
      "Uploaded By": "hunnurji@voicecare.ai",
      Date: "27 Oct, 2023",
      Time: "03 : 25 : 00",
    },
  ];
  return (
    <div className="home-root">
      <div style={{ display: "flex" }}>
        <span style={{ marginTop: "2vh", marginBottom: "2vh" }}>
          <Search />
        </span>
        <span style={{ margin: "2vh" }}>
          <Button
            label={"Reset"}
            color={"#ff4e3a"}
            width={"20vh"}
            height={"4vh"}
          />
        </span>
        <span style={{ margin: "2vh" }}>
          <Button
            label={"Create Batch"}
            color={"#ff4e3a"}
            width={"20vh"}
            height={"4vh"}
          />
        </span>
      </div>
      <Table
        headerColor={"#302d4c"}
        dataColor={"#252244"}
        columns={columns}
        data={data}
        itemsPerPageOptions = {[5, 10, 20]}
        defaultItemsPerPage={10}
        maxHeight={"75vh"}
      />
    </div>
  );
};

export default Home;
