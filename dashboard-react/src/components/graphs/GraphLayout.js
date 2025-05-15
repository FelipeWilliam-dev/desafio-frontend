/*import CurrentGraph from './graphs/CurrentGraph';
import BatteryLevelGraph from './graphs/BatteryLevelGraph';
import BatteryTempGraph from './graphs/BatteryTempGraph';
import CpuTempGraph from './graphs/CpuTempGraph';*/
import Sidebar from '../Sidebar';
import React, { lazy, Suspense, useState, useEffect } from 'react';
import '../Graph.css';


const GRAPH_COMPONENTS = {
  current: lazy(() => import('./CurrentGraph')),
  battery: lazy(() => import('./BatteryLevelGraph')),
  tempBat: lazy(() => import('./BatteryTempGraph')),
  tempCpu: lazy(() => import('./CpuTempGraph')),
};
/*const GRAPH_COMPONENTS = {
  current: CurrentGraph,
  battery: BatteryLevelGraph,
  tempBat: BatteryTempGraph,
  tempCpu: CpuTempGraph,
};*/


function GraphLayout() {
  const [battery, setBattery] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [activeData, setActiveData] = useState(null);
	const [activeGraph, setActiveGraph] = useState(
		localStorage.getItem('selectedGraph') || 'current'
	);

	const handleGraphChange = (key) => {
		setActiveGraph(key);
		localStorage.setItem('selectedGraph', key);
	};
	

  useEffect(() => {
    fetch("http://localhost:8080/battery")
      .then((res) => res.json())
      .then((data) => setBattery(Array.isArray(data) ? data : [data]));

    fetch("http://localhost:8080/temperature")
      .then((res) => res.json())
      .then((data) => setTemperature(Array.isArray(data) ? data : [data]));
  }, []);

  const ActiveGraphComponent = GRAPH_COMPONENTS[activeGraph];

  return (
    <div className="graph-wrapper">
      <div className="graph-buttons">
        <button className="all-button" onClick={() => setActiveGraph('all')}>ALL →</button>
        <div className="main-buttons">
          <button onClick={() => handleGraphChange('current')}>Instant Current</button>
          <button onClick={() => handleGraphChange('battery')}>Battery</button>
          <button onClick={() => handleGraphChange('tempBat')}>Temperature Bat</button>
          <button onClick={() => handleGraphChange('tempCpu')}>Temperature CPU</button>
        </div>
        
      </div>

        <div className="graph-area">
          {ActiveGraphComponent && (
            <Suspense fallback={<p>Carregando gráfico...</p>}>
              <ActiveGraphComponent
                battery={battery}
                temperature={temperature}
                setActiveData={setActiveData}
              />
            </Suspense>
          )}
          <Sidebar data={activeData} />
        </div>
      
    </div>

  );
}

export default GraphLayout;
