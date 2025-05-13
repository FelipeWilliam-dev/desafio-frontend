import { plugTypes, batteryStatus } from "../utils/constants";

const Sidebar = ({ data }) => {
  if (!data) return <p>Selecione um ponto do gráfico</p>;

  return (
    <div className="sidebar">
      <p>Plug Type: {plugTypes[data.plug_type]}</p>
      <p>Status: {batteryStatus[data.battery_status]}</p>
      <p>Voltage: {data.voltage} mV</p>
      <p>Instant Current: {data.inst_curr} mAh</p>
    </div>
  );
};
