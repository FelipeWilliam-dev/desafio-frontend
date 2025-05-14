
import React, { useEffect, useState } from "react";
import {LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer} from "recharts";
import dayjs from "dayjs";

function Graph(){
  const [battery, setBattery] = useState(null);
  const [temperature, setTemperature] = useState([]);

	/*useEffect(() => {
    fetch("http://localhost:8080/battery")
      .then((res) => res.json())
      .then((data) => setBattery(data));

    fetch("http://localhost:8080/temperature")
      .then((res) => res.json())
      .then((data) => setTemperature(data));
  }, []);*/

	useEffect(() => {
    fetch("http://localhost:8080/battery")
      .then((res) => res.json())
      .then((data) => setBattery(Array.isArray(data) ? data : [data]));

    fetch("http://localhost:8080/temperature")
      .then((res) => res.json())
      .then((data) => setTemperature(Array.isArray(data) ? data : [data]));
  }, []);




	const formatDate = (ts) => dayjs(ts).format("  DD/MM/YY - HH:mm:ss  ");
	const formatMineData = (ts) => dayjs(ts).format("  HH:mm:ss  ");

	const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          fontSize: "0.9rem"
        }}>
          <p><strong>Data:</strong> {formatDate(label)}</p>
          {data.inst_curr !== undefined && (
            <p>Corrente Instantânea: {data.inst_curr} mAh</p>
          )}
          {data.battery_level !== undefined && (
            <p>Capacidade: {data.battery_level}%</p>
          )}
          {data.temp_bat !== undefined && (
            <p>Temperatura da Bateria: {formatTemp(data.temp_bat)} °C</p>
          )}
          {data.temp_cpu !== undefined && (
            <p>Temperatura da CPU: {formatTemp(data.temp_cpu)} °C</p>
          )}
        </div>
      );
    }
    return null;
  };

  const formatTemp = (value) => {
    if (value > 1000) return (value / 1000).toFixed(1); // ajusta se vier em milésimos
    return value;
  };

  return (
		<div className="App-context">
			<div className="App-corrent">
				<h2>Corrente Instantânea (mAh)</h2>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={battery}>
						<XAxis dataKey="timestamp" tickFormatter={formatMineData} />
						<YAxis />
						<Tooltip content={<CustomTooltip />} />
						<CartesianGrid stroke="#ccc" />
						<Line type="monotone" dataKey="inst_curr" stroke="#8884d8" />
					</LineChart>
				</ResponsiveContainer>
			</div>

			<div className="App-battery">
				<h2>Nível da Bateria (%)</h2>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={battery}>
						<XAxis dataKey="timestamp" tickFormatter={formatDate} />
						<YAxis />
						<Tooltip content={<CustomTooltip />} />
						<CartesianGrid stroke="#ccc" />
						<Bar dataKey="battery_level" fill="#82ca9d" />
					</BarChart>
				</ResponsiveContainer>
			</div>

			<div className="App-temp">
				<h2>Temperatura da Bateria (°C)</h2>
				<ResponsiveContainer width="50%" height={300}>
					<LineChart data={temperature}>
						<XAxis dataKey="timestamp" tickFormatter={formatDate} />
						<YAxis />
						<Tooltip content={<CustomTooltip />} />
						<CartesianGrid stroke="#ccc" />
						<Line type="monotone" dataKey="temp_bat" stroke="#ff7300" />
					</LineChart>
				</ResponsiveContainer>
			</div>

			<div className="App-cpu">
				<h2>Temperatura da CPU (°C)</h2>
				<ResponsiveContainer width="50%" height={300}>
					<LineChart data={temperature}>
						<XAxis dataKey="timestamp" tickFormatter={formatDate} />
						<YAxis />
						<Tooltip content={<CustomTooltip />} />
						<CartesianGrid stroke="#ccc" />
						<Line type="monotone" dataKey="temp_cpu" stroke="#d00000" />
					</LineChart>
				</ResponsiveContainer>

			</div>

		</div>

		);

	

	/*return(
		<div className="App-content">

		<h1>Dados da Mob4ai</h1>
		<h2>/battery</h2>
		<pre>{battery ? JSON.stringify(battery, null, 2) : "Carregando..."}</pre>
		<h2>/temperature</h2>
		<pre>{temperature ? JSON.stringify(temperature, null, 2) : "Carregando..."}</pre>
		
		</div>
	);*/
}


export default Graph;