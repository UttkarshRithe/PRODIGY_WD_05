const API_KEY = "9a0d58fdf8f5a26a6d99406c0344b75d"; // Your actual OpenWeatherMap API key

const searchButton = document.getElementById("searchButton");
const currentLocationButton = document.getElementById("currentLocationButton");
const locationInput = document.getElementById("locationInput");
const weatherDisplay = document.getElementById("weatherDisplay");

// Fetch weather data from OpenWeatherMap
async function fetchWeather(location) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
    console.log("Fetching weather for URL:", url); // Log the URL being called for debugging

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Location not found");
    }

    const data = await response.json();
    console.log("Weather data:", data); // Log the returned data for debugging
    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather:", error); // Log the error for debugging
    displayError(error.message);
  }
}

// Fetch weather using current location
async function fetchWeatherByCoordinates(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    console.log("Fetching weather for coordinates:", url); // Log the URL for debugging

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable to fetch weather for your location");
    }

    const data = await response.json();
    console.log("Weather data for current location:", data); // Log data for debugging
    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather by coordinates:", error);
    displayError(error.message);
  }
}

// Display weather information on the page
function displayWeather(data) {
  weatherDisplay.innerHTML = `
    <p><strong>Location:</strong> ${data.name}, ${data.sys.country}</p>
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Condition:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
}

// Display error message
function displayError(message) {
  weatherDisplay.innerHTML = `<p class="error">${message}</p>`;
}

// Get user's current location
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoordinates(latitude, longitude);
      },
      () => displayError("Unable to retrieve your location")
    );
  } else {
    displayError("Geolocation is not supported by your browser");
  }
}

// Event listeners
searchButton.addEventListener("click", () => {
  const location = locationInput.value.trim();
  if (location) {
    fetchWeather(location);
  }
});

currentLocationButton.addEventListener("click", getCurrentLocation);
