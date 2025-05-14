
import React, { useEffect, useState } from "react";
import {LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer} from "recharts";
import dayjs from "dayjs";

// dentro do Tooltip formatter
//dayjs(timestamp).format("DD/MM/YY - HH:mm:ss");

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




	const formatDate = (ts) => dayjs(ts).format("DD/MM/YY - HH:mm:ss");

  return (
		<div className="App-context">
			<div className="App-corrent">
				<h2>Corrente Instantânea</h2>
				<ResponsiveContainer width="50%" height={300}>
					<LineChart data={battery}>
						<XAxis dataKey="timestamp" tickFormatter={formatDate} />
						<YAxis />
						<Tooltip
						labelFormatter={formatDate}
						formatter={(value) => [`${value} mAh`, "Corrente"]} />
						<CartesianGrid stroke="=ccc" />
						<Line type="monotane" datakey="inst_curr" stroke="#8884d8" />
					</LineChart>
				</ResponsiveContainer>
			</div>
			<div className="App-battery">
				<h2>Nível da Bateria (%)</h2>
				<ResponsiveContainer width="50%" height={300}>
					<BarChart data={battery}>
						<XAxis dataKey="timestamp" tickFormatter={formatDate} />
						<YAxis />
						<Tooltip
							labelFormatter={formatDate}
							formatter={(value)=>[`${value}%`, "Capacidade"]} />
					</BarChart>
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