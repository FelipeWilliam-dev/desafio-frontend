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

function mergeByTimestamp(battery, temperature) {
  const tempMap = new Map(temperature.map(t => [t.timestamp, t]));

  return battery.map(b => ({
    ...b,
    ...(tempMap.get(b.timestamp) || {})
  }));
}

function GraphLayout({ activeGraph }) {
  const [mergedData, setMergedData] = useState([]);
  const [activeData, setActiveData] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/battery").then(res => res.json()),
      fetch("http://localhost:8080/temperature").then(res => res.json())
    ]).then(([batData, tempData]) => {
      const battery = Array.isArray(batData) ? batData : [batData];
      const temperature = Array.isArray(tempData) ? tempData : [tempData];
      const merged = mergeByTimestamp(battery, temperature);
      setMergedData(merged);
    });
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
                        data={mergedData}
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
                  data={mergedData}
                  setActiveData={setActiveData}
                />
              </Suspense>
            )
          )}
        </div>
        <Sidebar data={activeData} setActiveData={setActiveData} />
      </div>
    </div>
  );
}

export default GraphLayout;
