import React from 'react';

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
  const display = (value, transform) => {
    if (value === undefined || value === null) return "-";
    return transform ? transform(value) : value;
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h4>Plug Type / Status</h4>
        <p>
          {plugTypes[data?.plug_type] || '-'} / {batteryStatus[data?.battery_status] || '-'}
        </p>
      </div>

      <div className="sidebar-section">
        <h4>Voltage</h4>
        <p>{display(data?.voltage)} mV</p>
      </div>

      <div className="sidebar-section">
        <h4>Instant Current</h4>
        <p>{display(data?.inst_curr)} mAh</p>
      </div>

      <div className="sidebar-section">
        <h4>Battery Level</h4>
        <p>{display(data?.battery_level)} %</p>
      </div>

      <div className="sidebar-section">
        <h4>Capacity</h4>
        <p>{display(data?.rem_cap, v => (v > 1000 ? (v / 100).toFixed(1) : v))} %</p>
      </div>

      <div className="sidebar-section">
        <h4>Temp. Battery</h4>
        <p>{display(data?.temp_bat, v => (v > 1000 ? (v / 1000).toFixed(1) : v))} °C</p>
      </div>

      <div className="sidebar-section">
        <h4>Temp. CPU</h4>
        <p>{display(data?.temp_cpu, v => (v > 1000 ? (v / 1000).toFixed(1) : v))} °C</p>
      </div>

      <div className="sidebar-section">
        <h4>Timestamp</h4>
        <p>{display(data?.timestamp, ts => new Date(ts).toLocaleString())}</p>
      </div>
    </aside>
  );
}

export default Sidebar;
