const API_KEY = '6b86252dc61a9321bc87c3bcd0a5dcf4'; // Replace with your actual key
const cities = [
  { name: 'Ho Chi Minh City', continent: 'Asia' },
  { name: 'London', continent: 'Europe' },
  { name: 'New York', continent: 'North America' },
  { name: 'São Paulo', continent: 'South America' },
  { name: 'Nairobi', continent: 'Africa' },
  { name: 'Sydney', continent: 'Oceania' }
];

const container = document.getElementById('weather-section');
const cityOffsets = {}; // Store timezone offsets for each city

function renderClock(containerId, timezoneOffset) {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const local = new Date(utc + timezoneOffset * 1000);

  const hours = local.getHours() % 12;
  const minutes = local.getMinutes();
  const seconds = local.getSeconds();

  const hourDeg = (hours + minutes / 60) * 30;
  const minuteDeg = minutes * 6;
  const secondDeg = seconds * 6;

  const svg = `
    <svg width="80" height="80" viewBox="0 0 100 100">
      <defs>
        <radialGradient id="face" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff"/>
          <stop offset="100%" stop-color="#eee"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#face)" stroke="#333" stroke-width="3"/>
      
      <!-- Roman numerals -->
      <text x="50" y="18" text-anchor="middle" font-size="8" fill="#333">XII</text>
      <text x="82" y="52" text-anchor="middle" font-size="8" fill="#333">III</text>
      <text x="50" y="88" text-anchor="middle" font-size="8" fill="#333">VI</text>
      <text x="18" y="52" text-anchor="middle" font-size="8" fill="#333">IX</text>

      <!-- Hour hand -->
      <line x1="50" y1="50" x2="${50 + 20 * Math.sin(Math.PI * hourDeg / 180)}" y2="${50 - 20 * Math.cos(Math.PI * hourDeg / 180)}" stroke="#222" stroke-width="4" stroke-linecap="round"/>
      
      <!-- Minute hand -->
      <line x1="50" y1="50" x2="${50 + 30 * Math.sin(Math.PI * minuteDeg / 180)}" y2="${50 - 30 * Math.cos(Math.PI * minuteDeg / 180)}" stroke="#444" stroke-width="3" stroke-linecap="round"/>
      
      <!-- Second hand -->
      <line x1="50" y1="50" x2="${50 + 35 * Math.sin(Math.PI * secondDeg / 180)}" y2="${50 - 35 * Math.cos(Math.PI * secondDeg / 180)}" stroke="#e33" stroke-width="2" stroke-linecap="round"/>
      
      <!-- Center pivot -->
      <circle cx="50" cy="50" r="3" fill="#333"/>
    </svg>
  `;

  const clockEl = document.getElementById(containerId);
  if (clockEl) {
    clockEl.innerHTML = svg;
  }
}


async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.name)}&units=metric&appid=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    const timezoneOffset = data.timezone; // in seconds
    cityOffsets[city.name] = timezoneOffset;

    const card = document.createElement('div');
    card.className = 'weather-card';
    card.innerHTML = `
      <div class="weather-content">
        <div class="weather-info">
          <h3>${city.continent} — ${city.name}</h3>
          <p>🌡️ ${data.main.temp}°C — ${data.weather[0].description}</p>
          <p>Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s</p>
          <small>Updated: ${new Date().toLocaleTimeString()}</small>
        </div>
        <div class="clock" id="clock-${city.name.replace(/\s+/g, '')}"></div>
      </div>
    `;

    container.appendChild(card);
    renderClock(`clock-${city.name.replace(/\s+/g, '')}`, timezoneOffset);
  } catch (err) {
    console.error(`Failed to load weather for ${city.name}`, err);
  }
}

// Initial load
container.innerHTML = '';
cities.forEach(fetchWeather);

// Refresh weather every hour
setInterval(() => {
  container.innerHTML = '';
  cities.forEach(fetchWeather);
}, 3600000);

// Refresh clocks every minute
setInterval(() => {
  cities.forEach(city => {
    const offset = cityOffsets[city.name];
    if (offset !== undefined) {
      renderClock(`clock-${city.name.replace(/\s+/g, '')}`, offset);
    }
  });
}, 60000);
