// server/server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const OPENWEATHER_KEY = process.env.OPENWEATHER_API_KEY || null;

const ok = (data) => ({ ok: true, data });
const err = (message, code=400) => ({ ok: false, message, code });

app.get('/api/weather', async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.status(400).json(err('Missing city query parameter "q"'));
  try {
    if (OPENWEATHER_KEY) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&units=metric&appid=${OPENWEATHER_KEY}`;
      const r = await axios.get(url, { timeout: 5000 });
      const w = r.data;
      const out = {
        city: w.name,
        country: w.sys?.country,
        tempC: w.main?.temp,
        desc: w.weather?.[0]?.description || '',
        feels_like: w.main?.feels_like,
        humidity: w.main?.humidity
      };
      return res.json(ok(out));
    } else {
      return res.json(ok({ city:q, country:'IN', tempC:27, desc:'clear sky (mock)', feels_like:28, humidity:55 }));
    }
  } catch {
    return res.status(500).json(err('Failed to fetch weather data'));
  }
});

app.get('/api/convert', async (req, res) => {
  const from = (req.query.from || 'INR').toUpperCase();
  const to = (req.query.to || 'USD').toUpperCase();
  const amount = parseFloat(req.query.amount);
  if (!from || !to || Number.isNaN(amount)) return res.status(400).json(err('Invalid query: provide from, to, amount'));
  try {
    try {
      const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
      const r = await axios.get(url, { timeout: 5000 });
      if (r.data && r.data.success !== false) {
        return res.json(ok({
          from, to, amount: Number(amount),
          result: r.data.result,
          rate: r.data.info?.rate || (r.data.result / amount)
        }));
      }
    } catch {}
    const mockRates = { USD: 0.012, EUR: 0.011 };
    const rate = mockRates[to] || 1;
    const result = Number((amount * rate).toFixed(4));
    return res.json(ok({ from, to, amount: Number(amount), result, rate }));
  } catch {
    return res.status(500).json(err('Failed to convert currency'));
  }
});

const QUOTES = [
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Practice makes better.", author: "ByteXL Motto" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" }
];
app.get('/api/quote', (req, res) => {
  const i = Math.floor(Math.random()*QUOTES.length);
  res.json(ok(QUOTES[i]));
});

app.get('/api/health', (req, res)=> res.json(ok({ uptime: process.uptime() })));

app.listen(PORT, () => console.log(`InfoHub server on http://localhost:${PORT}`));
