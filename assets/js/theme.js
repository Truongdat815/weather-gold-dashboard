
function toggleDarkMode() {
    var body = document.body;
    body.classList.contains('dark-mode') ?
        body.classList.remove('dark-mode'):
         body.classList.add('dark-mode');
}
/*
 * Toggle dark mode.
 */
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
}
const toggleButton = document.getElementsByClassName('toggle-button')[0]
toggleButton.addEventListener('click', () => {
document.body.classList.toggle('dark-mode');
}
)
// Toggle dark mode
function toggleDarkMode() {
  var body = document.body;
  body.classList.toggle('dark-mode');
}
function toggleDarkMode() {
  var body = document.body;
  body.classList.toggle('dark-mode');
}
function toggleDarkMode() {
  const body = document.body;
  if (localStorage.getItem('darkMode') === 'true') {
     localStorage.setItem('darkMode', 'false');
     body.classList.remove('dark-mode');
   } else {
     localStorage.setItem('darkMode', 'true');
     body.classList.add('dark-mode');
   }
}
// Expose functions to global scope for HTML onclick
window.toggleDarkMode = toggleDarkMode;
window.toggleDarkMode = toggleDarkMode;
window.toggleDarkMode = toggleDarkMode;
window.toggleDarkMode = toggleDarkMode;
window.toggleDarkMode = toggleDarkMode;
