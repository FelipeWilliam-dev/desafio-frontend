import React from "react";
//import Graph from "./graphs/GraphLayout";
import Graph from "./graphs/GraphLayout";
//import Sidebar from "./Sidebar";
import './dashborad.css'

function Dashboard() {
  return (
    <>
      <div className="dashboard-container">
        <div className="main-content">
          <Graph />
        </div>
      </div>
    </>
  );
}

export default Dashboard;