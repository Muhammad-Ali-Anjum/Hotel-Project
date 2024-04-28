import React from "react";
import SimpleBarChart from "./Graph/BarChart";
import BasicPie from "./Graph/PieChart";
import SaleBox from "./Graph/SaleBox";
import "./Dashboard.css"; // Import the CSS file for Dashboard styling

const Dashboard = () => {
  return (
    <>
      <SaleBox />
      <hr />
      <div className="charts-container">
        <SimpleBarChart />
        <BasicPie />
      </div>
    </>
  );
};

export default Dashboard;
