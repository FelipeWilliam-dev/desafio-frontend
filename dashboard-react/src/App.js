import React from "react";
import "./App.css";
//import Header from './components/Header';
import Dashboard from './components/dashboard';


function App() {
  return (
    <>
    <header className="dashboard-wrapper">
        <h1>MOB4AI Dashboard</h1>
    </header>
    <body>
       <Dashboard />
    </body>
    </>
  );
}

export default App;
