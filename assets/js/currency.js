
import React, { useEffect, useState } from 'react';

function CurrencyWidget() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD') // thay đổi URL API này thành một API tư vấn bảng cân đối khác
      .then(response => response.json())
      .then(data => setCurrencies(Object.entries(data.rates)));
  }, []);

  return (
    <div>
      <h2>Tỷ giá tiền tệ</h2>
      {currencies.map(([currency, rate]) => (
        <p key={currency}>1 USD = {rate} {currency}
// Expose functions to global scope for HTML onclick
window.CurrencyWidget = CurrencyWidget;
