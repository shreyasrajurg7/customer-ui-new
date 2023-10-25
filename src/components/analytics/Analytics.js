import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";
import axios from 'axios';
import "./Analytics.css"

const Analytics = () => {
  // Data and labels for the first pie chart
   // Data and labels for the first pie chart
   const chartData1 = {
    series: [1, 7, 2],
    labels: [
      "benefits unverified",
      "benefits verified",
      "benefits verification pending",
    ],
    title: "OUTCOME COUNTS",
  };

  const [totalCallCount, setTotalCallCount] = useState(null);

  useEffect(() => {
    // Make an API call to retrieve the total call count data
    axios.get('http://benefits-dashboard-api-authenticated-dot-vaulted-bivouac-311707.wl.r.appspot.com/number_of_calls_complete/?start_date=02-15-2022&end_date=07-25-2023', {
      headers: {
        'authToken': 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2MjYzZDA5NzQ1YjUwMzJlNTdmYTZlMWQwNDFiNzdhNTQwNjZkYmQiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJiZW5lZml0cy1kYXNoYm9hcmQtYXBpLWF1dGhlbnRpY2F0ZWQtZG90LXZhdWx0ZWQtYml2b3VhYy0zMTE3MDcud2wuci5hcHBzcG90LmNvbSIsImF6cCI6Im9pZGMtYXV0aDBzZXJ2aWNlLWFjY291bnRAdmF1bHRlZC1iaXZvdWFjLTMxMTcwNy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImVtYWlsIjoib2lkYy1hdXRoMHNlcnZpY2UtYWNjb3VudEB2YXVsdGVkLWJpdm91YWMtMzExNzA3LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImV4cCI6MTY5Njk2NTUyNiwiaWF0IjoxNjk2OTYxOTI2LCJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJzdWIiOiIxMTgyNDkzNzc2ODkyMzg3MDA4MDYifQ.q1Q_vGQYDYCJHGTHdCa1aaqVhib5RnHbgd92w5z1VjaoJ7OAp-RoH56AmnBDyS5xV-4LAwGLw0dhOZCCrmVYLScf_EX78PFgGhbG_qZ42RNNWcsyktOj8WgZqwXKnkaIQE3LE_8WvTa1H7I2DDiuKUDUfbQrW1HjNzVWBW9jYqqE7YkOOIwSPrhRRYuaSITSObkn6sgvCn-DGknqmpTWmEIi7DgIz5flzoUqwUxTd3LE16g5JGT0DoNkVVs5-0TBXtKYIaXJ1D5rjj7exewayIh5PYnkZRV3CWo6JRv-Lts5d6a2eRnBkDJ_WFtVkpb2m3wt_OAeQOrPXLBwdJni4w', // Replace with your actual auth token
      }
    })
    .then((response) => {
      // Extract the total call count from the API response
      const totalCallCountData = response.data.results.total_count;
      setTotalCallCount(totalCallCountData);
    })
    .catch((error) => {
      console.error('Error fetching total call count:', error);
    });
  }, []);

  // Data for Total Talk Time Pie Chart
  const totalTalkTimeData = [120]; // Replace with your data values

  // Data and labels for the second pie chart
  const chartData2 = {
    series: [5, 1, 7, 2, 4, 8, 6, 3, 8],
    labels: [
      "interrupted",
      "patient_info_incomplete",
      "provider_info_incomplete",
      "payor_info_incomplete",
      "callee_ignored",
      "interrupted_bot",
      "interrupted_callee",
      "complete",
      "not_till_end",
    ],
    title: "OUTCOME REASON COUNTS",
  };

  // Data and labels for Call Handled Counts Pie Chart
  const callHandledCountsData = {
    series: [82, 82], // Replace with your data values
    labels: ["bot", "bot_human"],
    title: "CALL HANDLED COUNTS",
  };

  // Data and labels for Insurance Counts Pie Chart
  const insuranceCountsData = {
    series: [1, 1], // Replace with your data values
    labels: ["UHC", "UMR"],
    title: "INSURANCE COUNTS",
  };

  // Data and labels for Procedure Counts Pie Chart
  const procedureCountsData = {
    series: [10, 7, 3], // Replace with your data values
    labels: ["98940", "98941", "40503"],
    title: "PROCEDURE COUNTS",
  };

  return (
    <div className="analitics-root" style={{ background: "#3e3b56", margin: "2vh", color: "#fff" }}>
      <div style={{margin: "2vh"}}>
        <span>Start Date: <input type="date" /></span>
        <span>End Date: <input type="date" /></span>
      </div>
      <div style={{ marginTop: "1vh", display: "flex", flexWrap: "wrap" }}>
         <PieChart {...chartData1} />
        <PieChart
          series={totalTalkTimeData}
          labels={["Total Talk Time"]}
          title="TOTAL TALK TIME"
        />
        <PieChart {...chartData2} />
        <PieChart {...callHandledCountsData} />
        <PieChart {...insuranceCountsData} />
        <PieChart {...procedureCountsData} />
        {totalCallCount !== null && (
          <PieChart
            series={[totalCallCount]}
            labels={["Total Call Count"]}
            title="TOTAL CALL COUNT"
          />
        )}
      </div>
    </div>
  );
};

export default Analytics;
