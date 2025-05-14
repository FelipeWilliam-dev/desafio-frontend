// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';

const plugTypes = {
  0: "Unplugged",
  1: "AC",
  2: "USB",
  3: "Wireless"
};

const batteryStatus = {
  1: "Unknown",
  2: "Charging",
  3: "Discharging",
  4: "Not Charging",
  5: "Full",
  6: "Wireless"
};

function Sidebar({ data }) {
  if (!data) {
    return (
      <aside className="sidebar">
        <p className="sidebar-placeholder">Passe o mouse sobre um gráfico para ver os detalhes.</p>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h4>Plug Type / Status</h4>
        <p>{plugTypes[data.plug_type] || 'Desconhecido'} {batteryStatus[data.battery_status] || ''}</p>
      </div>

      <div className="sidebar-section">
        <h4>Voltage</h4>
        <p>{data.voltage} mV</p>
      </div>

      <div className="sidebar-section">
        <h4>Instant Current</h4>
        <p>{data.inst_curr} mAh</p>
      </div>

      <div className="sidebar-section">
        <h4>Temperature Bat</h4>
        <p>{data.temp_bat} °C</p>
      </div>
    </aside>
  );
}

export default Sidebar;
