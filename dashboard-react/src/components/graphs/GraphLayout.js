// GraphLayout.js
import React, { lazy, Suspense, useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import '../Graph.css';

const GRAPH_COMPONENTS = {
  current: lazy(() => import('./CurrentGraph')),
  battery: lazy(() => import('./BatteryLevelGraph')),
  tempBat: lazy(() => import('./BatteryTempGraph')),
  tempCpu: lazy(() => import('./CpuTempGraph')),
};

function GraphLayout({ activeGraph }) {
  const [battery, setBattery] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [activeData, setActiveData] = useState(null);

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
      <div className="graph-area">
        <div className="graph-stack">
          {activeGraph === 'all' ? (
           <>
              {Object.keys(GRAPH_COMPONENTS).map((key, index) => {
                const Component = GRAPH_COMPONENTS[key];
                return ( 
                
                  <Suspense fallback={<p>Carregando {key}...</p>} key={index}>
                    <div className='graph-box'>
                      <Component
                      battery={battery}
                      temperature={temperature}
                      setActiveData={setActiveData}
                    />
                    </div>
                  </Suspense>
                );
              })}
            </>
          ) : (
            ActiveGraphComponent && (
              <Suspense fallback={<p>Carregando gráfico...</p>}>
                <ActiveGraphComponent
                  battery={battery}
                  temperature={temperature}
                  setActiveData={setActiveData}
                />
              </Suspense>
            )
          )}
        </div>
        <Sidebar data={activeData} />
      </div>
    </div>
  );
}

export default GraphLayout;