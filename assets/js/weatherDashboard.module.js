
import { WeatherForecast } from './services/WeatherService';

const weatherData = new WeatherForecast();
let temperatureWarning;

function updateTemperatureWarning(threshold) {
temperatureWarning = document.getElementById('temperature-warning');
if (weatherData.currentTemp > threshold) {
temperatureWarning.style.display = 'block';
temperatureWarning.innerHTML = `<p>Warn: Temperature is above recommended limit of ${threshold} degree Celsius. Please consider adding an appropriate level of clothing to your wardrobe.</p>`;
}
else {
temperatureWarning.style.display = 'none';
}
}

weatherData.getWeather().then(data => {
updateTemperatureWarning(25);
});
// Expose functions to global scope for HTML onclick
window.updateTemperatureWarning = updateTemperatureWarning;
