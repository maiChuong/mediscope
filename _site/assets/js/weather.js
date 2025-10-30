const API_KEY = '6b86252dc61a9321bc87c3bcd0a5dcf4'; // Replace with your actual key
const CITY = 'Ho Chi Minh';
const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`;

async function fetchWeather() {
  try {
    const response = await fetch(URL);
    const data = await response.json();

    const weatherHTML = `
      <h3>🌡️ ${data.main.temp}°C — ${data.weather[0].description}</h3>
      <p>Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s</p>
      <small>Updated: ${new Date().toLocaleTimeString()}</small>
    `;

    document.getElementById('weather-card').innerHTML = weatherHTML;
  } catch (err) {
    document.getElementById('weather-card').innerHTML = '<p>Failed to load weather data.</p>';
    console.error('Weather fetch error:', err);
  }
}

// Initial fetch
fetchWeather();

// Refresh every hour
setInterval(fetchWeather, 3600000);
