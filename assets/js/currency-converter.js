
// Function to fetch real-time exchange rates.
fetch('https://api.exchangerate-api.com/v4/latest/USD') // replace USD with your base currency
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayCurrencyData(data);
    });

function displayCurrencyData(data) {
    // Display the data in your chart or widget.
}
// Code JS module chuyển đổi tiền tệ.

const convertCurrency = async (from, to, amount) => {
  // Gọi API lấy dữ liệu từ currencyconverterapi.com hoặc các nguồn khác.
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Có lỗi xảy ra khi tải dữ liệu');
  }

  return amount * data.rates[to];
};