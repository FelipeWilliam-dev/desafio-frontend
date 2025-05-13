import { useState } from "react";
import Graph from "./Graph";
import Sidebar from "./Sidebar";

function Dashboard() {
  const [activeData, setActiveData] = useState(null);

  return (
    <div className="dashboard-layout">
      <Sidebar data={activeData} />
      <div className="charts">
        <Graph
          data={batteryData}
          onHover={setActiveData}
          type="line"
          field="inst_curr"
          label="Corrente Instantânea"
        />
        
      </div>
    </div>
  );
}
