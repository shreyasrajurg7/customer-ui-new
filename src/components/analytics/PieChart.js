import React from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ series, labels, title }) => {
  // Generate random colors for each label within shades of #6b42de
  const getRandomColors = () => {
    const colors = [];
    const baseColor = "#ff4e3a";
    const steps = 10; // Number of shades
    const maxBrightness = 80; // Adjust this value as needed

    for (let i = 0; i < labels.length; i++) {
      const brightness = Math.random() * maxBrightness;
      const color = adjustBrightness(baseColor, brightness);
      colors.push(color);
    }
    return colors;
  };

  // Function to adjust brightness of a color
  const adjustBrightness = (hex, brightness) => {
    const rgb = parseInt(hex.slice(1), 16); // Convert hex to RGB
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;

    const adjustedR = Math.min(255, r + brightness);
    const adjustedG = Math.min(255, g + brightness);
    const adjustedB = Math.min(255, b + brightness);

    const adjustedHex =
      "#" +
      ((adjustedR << 16) | (adjustedG << 8) | adjustedB)
        .toString(16)
        .padStart(6, "0");

    return adjustedHex;
  };

  const chartData = {
    series,
    options: {
      chart: {
        type: "pie",
      },
      colors: getRandomColors(), // Use randomly generated shades of #6b42de
      labels,
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val.toFixed(0); // Format data labels as whole numbers
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "25vw",
        height: "25vh",
        border: ".1vh #6b42de solid",
        margin: "1vh",
        padding: "2vh",
        backgroundColor: '#3e3b56',
        color: "#fff"
      }}
    >
      <span style={{ paddingTop: "2vh" }}>{title}</span>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        width="100%"  // Make sure the chart fills its container
        height="100%" // Make sure the chart fills its container
      />
    </div>
  );
};

export default PieChart;
