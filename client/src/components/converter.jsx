import React, { useState } from "react";
const API = import.meta.env.VITE_API_ROOT || "http://localhost:4000";

export default function Converter(){
  const [amount, setAmount] = useState(100);
  const [data, setData] = useState(null);

  async function convert(){
    const res = await fetch(`${API}/api/convert?from=INR&to=USD&amount=${amount}`);
    const json = await res.json();
    setData(json.data);
  }

  return (
    <div className="card">
      <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} />
      <button onClick={convert}>Convert</button>
      {data && <p>{amount} INR = {data.result} USD</p>}
    </div>
  );
}
