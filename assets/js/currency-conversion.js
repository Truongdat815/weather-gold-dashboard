
// Currency conversion widget
const convertCurrencies = async (base, symbols) => {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
    const data = await response.json();
    return symbols.map((symbol) => ({
        symbol: symbol,
        rate: data['rates'][symbol]
    }));
}
// Example usage:
convertCurrencies('USD', ['EUR', 'GBP']).then(console.log);