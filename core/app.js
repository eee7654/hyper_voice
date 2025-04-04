const HyperExpress = require('hyper-express');
/** @type {import('hyper-express').ServerConfiguration} */
const serverConfig = {
    // 🔐 امنیت
    fast_buffers: true,                 // استفاده از fast buffer allocation
    trust_proxy: true,                  // اگر پشت Nginx یا reverse proxy هستی
  
    // 🌐 اتصال‌ها
    max_body_length: 100 * 1024 * 1024, // 100MB برای آپلود فایل
    max_headers: 64,                    // امنیت - حداکثر تعداد هدرها
    max_header_size: 8 * 1024,          // امنیت - حداکثر حجم هدرها (8KB)
  
    // 🚀 عملکرد
    idle_timeout: 60,                   // اتصال idle بعد از 60 ثانیه قطع می‌شه
    send_timeout: 15,                   // اگر ارسال بیش از 15 ثانیه طول کشید قطع می‌شه
    receive_timeout: 15,                // دریافت هم همینطور
  
    // 🧱 پایداری
    max_requests_per_socket: 1000,      // هر connection بیش از این مقدار بسته می‌شه و re-use نمی‌شه
    force_close_connections: false,     // اگر true باشه persistent connection نداریم
  
    // 🌍 دیگر تنظیمات پیشرفته
    http2: false,                       // آماده برای اضافه کردن http2
    fast_abort: true,                   // سریع‌تر بستن connection در صورت خطا
    slow_body_timeout: 10,              // جلوگیری از slowloris attack (تاخیر در ارسال بدنه)
  
    // 🧪 امکان اضافه کردن tls later:
    // tls_options: {
    //   key: fs.readFileSync('./ssl/key.pem'),
    //   cert: fs.readFileSync('./ssl/cert.pem')
    // }
  };
const app = new HyperExpress.Server(serverConfig);
module.exports = app;