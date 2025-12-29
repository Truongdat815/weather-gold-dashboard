
function toggleDarkMode() {
  var body = document.body;
  body.classList.toggle('dark-mode');
}
Cập nhật hàm để xác định kiểu chủ đề (light mode, dark mode). Có thể sử dụng biến boole toán tử ‘not’ hoặc '!' để đổi ngược giá trị của darkMode. Sau đó, thay đổi CSS của từng phần tử dựa vào biến này.