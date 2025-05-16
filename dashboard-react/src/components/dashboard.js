import React, { useState } from 'react';
import GraphLayout from './graphs/GraphLayout';
import './dashboard.css';

function Dashboard() {
  const [activeGraph, setActiveGraph] = useState(
    localStorage.getItem('selectedGraph') || 'current'
  );

  const handleGraphChange = (key) => {
    setActiveGraph(key);
    localStorage.setItem('selectedGraph', key);
  };

  return (
    <>
    
      
      <div className="dashboard-container">
        <aside className="left-sidebar">
          <button onClick={() => handleGraphChange('all')}>ALL</button>
          <button onClick={() => handleGraphChange('tempCpu')}>Temp CPU</button>
          <button onClick={() => handleGraphChange('tempBat')}>Temp Bat</button>
          <button onClick={() => handleGraphChange('battery')}>Battery</button>
          <button onClick={() => handleGraphChange('current')}>Current</button>
        </aside>

        <main className="main-content">
          <GraphLayout activeGraph={activeGraph} />
        </main>
      </div>
      </>
  );
}

export default Dashboard;
