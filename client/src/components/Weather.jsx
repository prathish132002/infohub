// client/src/components/Weather.jsx
import React, { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_ROOT || "http://localhost:4000";

export default function Weather() {
  const [city, setCity] = useState("Hyderabad");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function fetchWeather() {
    try {
      setLoading(true);
      setErr(null);
      const res = await fetch(`${API}/api/weather?q=${encodeURIComponent(city)}`);
      const json = await res.json();
      if (json?.ok) setData(json.data);
      else setErr(json?.message || "Failed to fetch");
    } catch (e) {
      setErr(e.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  // run once on mount (initial load):
  useEffect(() => {
    (async () => {
      await fetchWeather();
    })();
    // we intentionally don't depend on `city` here to avoid auto-refetch on each keystroke
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchWeather();
        }}
        className="input-inline"
      >
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City name (e.g. Mumbai)"
        />
        <button className="primary" type="submit">
          Get
        </button>
      </form>

      {loading && <div className="small">Loading weather…</div>}
      {err && <div className="error">Error: {err}</div>}

      {data && (
        <p className="small">
          <strong>{data.city}</strong> — {data.tempC}°C • {data.desc}
        </p>
      )}
    </div>
  );
}
