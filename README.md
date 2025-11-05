# InfoHub

InfoHub is a simple full-stack web application that combines three useful tools:

- **Weather Information**
- **Currency Conversion (INR → USD/EUR)**
- **Motivational Quote Generator**

This project demonstrates integrating a React frontend with a Node.js + Express backend, along with external third-party APIs and environment variables.
## Live Links

| Service | Link |
| **Frontend (Vercel)** | https://infohub-three.vercel.app/ |
| **Backend (Render)** | https://infohub-server-enmw.onrender.com |

---

## Features

| Module | Description |
| **Weather** | Enter a city and view live temperature, humidity, and conditions using the OpenWeather API. |
| **Currency Converter** | Convert Indian Rupee (INR) to USD or EUR with real-time exchange rates. |
| **Motivational Quotes** | Generates a new motivational quote on request. |

## Tech Stack
| Layer | Technologies |
| **Frontend** | React (Vite), HTML, CSS |
| **Backend** | Node.js, Express.js |
| **APIs Used** | OpenWeather API, exchangerate.host API, Free Quotes API |
| **Deployment** | Vercel (Frontend), Render (Backend) |

## Backend API Endpoints

| Endpoint | Description | Example |
| `/api/weather?q=city` | Get weather for a city | `/api/weather?q=Hyderabad` |
| `/api/convert?amount=100&to=USD` | Convert INR → USD/EUR | `/api/convert?amount=100&to=USD` |
| `/api/quote` | Get a motivational quote | `/api/quote` |
| `/api/health` | Check server status | `/api/health` |
## How to Run Locally
### Backend
cd server
npm install
node server.js

### Frontend
cd client
npm install
npm run dev


## Environment Variables

### On Server (Render)
OPENWEATHER_API_KEY = 1b7d9ec23e9c9e5afe961871fe3727b6


### On Client (Vercel)
VITE_API_ROOT = https://infohub-server-enmw.onrender.com

## License
This project is created for educational purposes.
