
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