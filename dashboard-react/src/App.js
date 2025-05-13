import React from "react";
import "./App.css";
import Header from './components/Header';
import Dashboard from './components/dashborad';

function App() {
  return (
    <>
    <Header />
    <div className="App-container">
       <Dashboard />
    </div>
    </>
  );
}

export default App;
