// Code JS module toàn bộ logic của biểu đồ giá vàng...
 
var ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {type: 'line', data: {labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], datasets: [{label: '# of Votes', data: [12, 19, 3, 5, 2, 3], backgroundColor: [], borderColor: [], borderWidth: 1}]}, options: {scales: {xAxes: [{display: true}], yAxes: [{display: true}]}});