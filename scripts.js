// Weather API implementation
async function fetchWeather() {
    const apiKey = '9dcefe327a3a18e8a96072ddc046550e';
    const city = "Las Vegas";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Weather data:', data);

        if (!data.main || !data.weather) {
            console.warn('Weather data is incomplete or malformed:', data);
            return;
        }

        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    const iconElement = document.createElement('img');
    iconElement.src = `https://openweathermap.org/img/w/${iconCode}.png`;
    iconElement.alt = description;

    const weatherIconContainer = document.getElementById('weather-icon');
    weatherIconContainer.innerHTML = '';
    weatherIconContainer.appendChild(iconElement);

    document.getElementById('weather-temp').textContent = `${temp}°F`;
    document.getElementById('weather-description').textContent = description;
}

document.addEventListener('DOMContentLoaded', fetchWeather);
