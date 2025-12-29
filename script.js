// Config - Thay thế bằng API Key thật nếu có
const CONFIG = {
    WEATHER_API_KEY: 'YOUR_OPENWEATHER_API_KEY', // Thay key của bạn vào đây
    WEATHER_LAT: 10.7769,
    WEATHER_LON: 106.7009,
    REFRESH_INTERVAL: 60 * 60 * 1000, // 60 phút
};

// State
let lastUpdate = null;

// DOM Elements
const els = {
    time: document.getElementById('current-time'),
    themeToggle: document.getElementById('checkbox'),
    weatherContent: document.getElementById('weather-content'),
    weatherLastUpdate: document.getElementById('weather-last-update'),
    financeContent: document.getElementById('finance-content'),
    financeLastUpdate: document.getElementById('finance-last-update'),
    refreshBtn: document.getElementById('refresh-btn'),
};

// --- Utilities ---

function formatTime(date) {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(date) {
    return date.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// --- Theme Management ---
function initTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        els.themeToggle.checked = true;
    }

    els.themeToggle.addEventListener('change', function(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

// --- Clock ---
function startClock() {
    function update() {
        const now = new Date();
        els.time.textContent = `${formatDate(now)} | ${formatTime(now)}`;
    }
    update();
    setInterval(update, 1000);
}

// --- Data Fetching ---

// Mock Data Generators (làm backup khi không có API key)
function getMockWeather() {
    const hours = new Date().getHours();
    const isDay = hours > 6 && hours < 18;
    
    // Giả lập nhiệt độ thay đổi theo giờ
    let temp = 30; 
    if (hours < 6) temp = 25;
    else if (hours < 12) temp = 28 + Math.random() * 2;
    else if (hours < 16) temp = 32 + Math.random() * 3;
    else temp = 29;

    return {
        main: {
            temp: temp,
            humidity: 60 + Math.random() * 20,
            pressure: 1010
        },
        items: [
            { icon: isDay ? 'sun' : 'moon', description: isDay ? 'Có nắng' : 'Quang đãng' }
        ],
        wind: { speed: 3.5 + Math.random() }
    };
}

function getMockFinance() {
    // Giá vàng SJC ~ 74-76tr, Bạc ~ 24k
    const goldBase = 76000000;
    const silverBase = 24500;
    
    // Biến động ngẫu nhiên
    const goldPrice = goldBase + (Math.random() - 0.5) * 500000;
    const silverPrice = silverBase + (Math.random() - 0.5) * 500;
    
    return {
        gold: {
            buy: goldPrice,
            sell: goldPrice + 2000000,
            trend: Math.random() > 0.5 ? 'up' : 'down'
        },
        silver: {
            buy: silverPrice,
            sell: silverPrice + 1000,
            trend: Math.random() > 0.5 ? 'up' : 'down'
        }
    };
}

async function fetchWeather() {
    els.weatherContent.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Đang cập nhật...</div>';
    
    try {
        let data;
        let isMock = false;

        // Thử gọi API thật nếu key không phải default
        if (CONFIG.WEATHER_API_KEY !== 'YOUR_OPENWEATHER_API_KEY') {
            try {
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${CONFIG.WEATHER_LAT}&lon=${CONFIG.WEATHER_LON}&appid=${CONFIG.WEATHER_API_KEY}&units=metric&lang=vi`);
                if (res.ok) {
                    data = await res.json();
                } else {
                    console.warn("Weather API call failed, falling back to mock");
                    isMock = true;
                }
            } catch (e) {
                console.warn("Weather API network error, falling back to mock");
                isMock = true;
            }
        } else {
            // Delay tí cho giống thật
            await new Promise(r => setTimeout(r, 800));
            isMock = true;
        }

        if (isMock) {
            data = getMockWeather();
        }

        renderWeather(data, isMock);
        els.weatherLastUpdate.textContent = formatTime(new Date());

    } catch (err) {
        els.weatherContent.innerHTML = `<div class="error-msg">Lỗi: ${err.message}</div>`;
    }
}

function renderWeather(data, isMock) {
    // Xử lý dữ liệu API chuẩn vs Mock data
    const temp = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const desc = data.weather ? data.weather[0].description : (data.items ? data.items[0].description : 'Không xác định');
    
    // Icon mapping đơn giản (nếu dùng API thật thì có code icon, đây map thủ công cho mock)
    let iconClass = 'fa-cloud-sun';
    if (desc.includes('mưa')) iconClass = 'fa-cloud-rain';
    else if (desc.includes('nắng') || desc.includes('quang')) iconClass = 'fa-sun';
    else if (desc.includes('mây')) iconClass = 'fa-cloud';

    const html = `
        <div class="weather-main">
            <div class="weather-temp">${temp}°C</div>
            <div class="weather-desc">
                <i class="fas ${iconClass}"></i> ${desc} ${isMock ? '(Giả lập)' : ''}
            </div>
        </div>
        <div class="weather-details">
            <div class="weather-detail-item">
                <i class="fas fa-tint"></i>
                <span>Độ ẩm: ${humidity}%</span>
            </div>
            <div class="weather-detail-item">
                <i class="fas fa-wind"></i>
                <span>Gió: ${wind} m/s</span>
            </div>
        </div>
    `;
    els.weatherContent.innerHTML = html;
}

async function fetchFinance() {
    els.financeContent.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Đang cập nhật...</div>';
    
    // Delay giả lập network
    await new Promise(r => setTimeout(r, 1200));
    
    // Sử dụng Mock data vì API vàng free rất hiếm và thường bị chặn CORS
    const data = getMockFinance();
    
    renderFinance(data);
    els.financeLastUpdate.textContent = formatTime(new Date());
}

function renderFinance(data) {
    const html = `
        <div class="finance-item">
            <div class="metal-name metal-gold">
                <i class="fas fa-ring"></i> Vàng SJC 9999
            </div>
            <div class="price-box">
                <div class="current-price">${formatCurrency(data.gold.sell)}</div>
                <div class="${data.gold.trend === 'up' ? 'trend-up' : 'trend-down'}">
                    <i class="fas fa-caret-${data.gold.trend}"></i> Biến động
                </div>
            </div>
        </div>
        <div class="finance-item">
            <div class="metal-name metal-silver">
                <i class="fas fa-coins"></i> Bạc
            </div>
            <div class="price-box">
                <div class="current-price">${formatCurrency(data.silver.sell)}</div>
                <div class="${data.silver.trend === 'up' ? 'trend-up' : 'trend-down'}">
                    <i class="fas fa-caret-${data.silver.trend}"></i> Biến động
                </div>
            </div>
        </div>
        <div style="text-align: center; font-size: 0.75rem; color: var(--text-sec); margin-top: 1rem;">
            *Dữ liệu demo (Giá bán ra)
        </div>
    `;
    els.financeContent.innerHTML = html;
}

// --- Main App Logic ---

async function refreshAll() {
    els.refreshBtn.disabled = true;
    els.refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tải...';
    
    await Promise.all([fetchWeather(), fetchFinance()]);
    
    setTimeout(() => {
        els.refreshBtn.disabled = false;
        els.refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Cập nhật ngay';
    }, 500);
}

function init() {
    initTheme();
    startClock();
    refreshAll();
    
    // Auto refresh loop
    setInterval(refreshAll, CONFIG.REFRESH_INTERVAL);
    
    // Manual refresh
    els.refreshBtn.addEventListener('click', refreshAll);
}

// Start
init();
