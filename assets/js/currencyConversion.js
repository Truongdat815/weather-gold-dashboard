
// Khai báo biến và hàm chuyển đổi tiền tệ.
let fromCurrency = 'USD';
let toCurrency = 'EUR';
let amount = 100;
function convertCurrency() {
    // Gọi API, lưu kết quả vào biến result.
    fetch('https://api.exchangerate-api.com/v4/latest/{fromCurrency}') 
        .then(response => response.json()) 
        .then(data => {
            let rate = data['rates'][toCurrency];
            result = amount * rate;
        });
}
// Expose functions to global scope for HTML onclick
window.convertCurrency = convertCurrency;
