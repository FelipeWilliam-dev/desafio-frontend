//import {LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip} from "recharts";
import React, { useEffect, useState } from "react";
//import dayjs from "dayjs";

// dentro do Tooltip formatter
//dayjs(timestamp).format("DD/MM/YY - HH:mm:ss");

function Graph(){
  const [battery, setBattery] = useState(null);
  const [temperature, setTemperature] = useState(null);

	useEffect(() => {
    fetch("http://localhost:8080/battery")
      .then((res) => res.json())
      .then((data) => setBattery(data));

    fetch("http://localhost:8080/temperature")
      .then((res) => res.json())
      .then((data) => setTemperature(data));
  }, []);


	return(
		<div className="App-content">

		<h1>Dados da Mob4ai</h1>
		<h2>/battery</h2>
		<pre>{battery ? JSON.stringify(battery, null, 2) : "Carregando..."}</pre>
		<h2>/temperature</h2>
		<pre>{temperature ? JSON.stringify(temperature, null, 2) : "Carregando..."}</pre>
		
		</div>
	);

}

export default Graph;