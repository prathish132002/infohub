import React, { useState } from "react";
import Weather from "./components/Weather";
import Converter from "./components/Converter";
import Quotes from "./components/Quotes";

export default function App() {
  const [tab, setTab] = useState("weather");

  const tabs = [
    { id: "weather", label: "Weather" },
    { id: "convert", label: "Currency" },
    { id: "quotes", label: "Motivation" }
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>InfoHub</h1>
        <small>Weather • INR → USD/EUR • Motivational Quotes</small>
      </header>

      <nav className="tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`tab ${tab === t.id ? "active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="container">
        {tab === "weather" && <Weather />}
        {tab === "convert" && <Converter />}
        {tab === "quotes" && <Quotes />}
      </main>
    </div>
  );
}
