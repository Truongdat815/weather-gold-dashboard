
function convertCurrency(amount, fromCurrency, toCurrency) {
    // API call to currency conversion service here
    return result;
}
function convertCurrency(from, to, amount) {
  // API call to currency conversion service
  fetch('https://api.exchangerate-api.com/v4/latest/' + from)
    .then(response => response.json())
    .then(data => {
      const rate = data.rates[to];
      return amount * rate;
    });
}