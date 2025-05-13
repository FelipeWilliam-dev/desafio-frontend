import React from "react";
import Graph from "./Graph";
//import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <div className="dashboard-layout">
      {/*<Sidebar data={activeData} />*/}
      <div className="charts">
        <h1>Olá mundo</h1>
        {/*<Graph
          data={batteryData}
          onHover={setActiveData}
          type="line"
          field="inst_curr"
          label="Corrente Instantânea" 
        />*/}
        <Graph />
        
      </div>
    </div>
  );
}

export default Dashboard;