
import axios from 'axios';

const getWeather = async (city) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`);
    return response.data;
  } catch (error) {
    console.log('Error:', error);
  }
};
export default getWeather;