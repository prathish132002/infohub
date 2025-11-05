import React, { useState } from "react";
const API = import.meta.env.VITE_API_ROOT || "http://localhost:4000";

export default function Quotes(){
  const [quote, setQuote] = useState(null);

  async function getQuote(){
    const res = await fetch(`${API}/api/quote`);
    const json = await res.json();
    setQuote(json.data);
  }

  return (
    <div className="card">
      <button onClick={getQuote}>New Quote</button>
      {quote && <p>"{quote.text}" — {quote.author}</p>}
    </div>
  );
}
