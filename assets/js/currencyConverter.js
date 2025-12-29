
import axios from 'axios';

const CurrencyConversionService = {
  convertCurrencies: async (from, to, amount) => {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
    return Math.round((response.data.rates[to] * amount) * 100) / 100;
  }
};
export default CurrencyConversionService;
function CurrencyConversion(from, to) {
  // Call API to fetch the exchange rate data
  fetch('https://api.exchangerate-api.com/v4/latest/' + from)
    .then(response => response.json())
    .then(data => {
      // Convert the currency based on the 'to' parameter
      const conversionRate = data.rates[to];
      return conversionRate;
    }).catch(error => console.log('Error: ', error));
}
// Import thư viện axios để gọi API
function currencyConversion(from, to, amount) {
    // Code để chuyển đổi tiền tệ
}
// Expose functions to global scope for HTML onclick
window.CurrencyConversion = CurrencyConversion;
window.currencyConversion = currencyConversion;
