
function refreshForecast() {
	fetch('https://api.openweathermap.org/data/2.5/forecast?q={city_name}&appid={APIkey}') 
	  .then(response => response.json()) 
	  .then(data => displayForecast(data)) 
	  .catch((error) => console.log('Error:', error));
}