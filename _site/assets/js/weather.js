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

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.name)}&units=metric&appid=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    const card = document.createElement('div');
    card.className = 'weather-card';
    card.innerHTML = `
      <h3>${city.continent} — ${city.name}</h3>
      <p>🌡️ ${data.main.temp}°C — ${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s</p>
      <small>Updated: ${new Date().toLocaleTimeString()}</small>
    `;
    container.appendChild(card);
  } catch (err) {
    console.error(`Failed to load weather for ${city.name}`, err);
  }
}

// Clear and load all cities
container.innerHTML = '';
cities.forEach(fetchWeather);

// Refresh every hour
setInterval(() => {
  container.innerHTML = '';
  cities.forEach(fetchWeather);
}, 3600000);


