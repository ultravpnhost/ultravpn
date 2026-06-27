// 1. АНОНС ДЛЯ VPN-КЛИЕНТОВ (В САМЫЙ ВЕРХ ВЫДАЧИ)
const announce = "#announce: Ultra VPN Plus — стабильное и быстрое подключение без ограничений.\n";

// 2. ДАННЫЕ ДЛЯ ТЕКСТОВОГО ВЕБ-ИНТЕРФЕЙСА И ЗАГОВОРОВ
const totalTraffic = "357 GB";
const expirationDate = "13.03.2030";
const supportContact = "@fhcsupport"; // Твой контакт поддержки

// Кодируем "Ultra VPN Plus" в Base64 для заголовка профиля
const profileTitleBase64 = "VWx0cmEgVlBOIFBsdXM="; 

// Обработчик запроса (пример интеграции в твой fetch)
async function handleRequest(request) {
  const url = new URL(request.url);
  const userAgent = request.headers.get("user-agent") || "";

  // Проверяем: если открыли в обычном браузере, отдаем красивую веб-страницу
  if (userAgent.includes("Mozilla") && !url.searchParams.has("config")) {
    const html = `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ultra VPN Plus — Личный кабинет</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #121212; color: #e0e0e0; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .card { background: #1e1e1e; padding: 24px; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.5); width: 100%; max-width: 360px; border: 1px solid #2d2d2d; }
            h1 { font-size: 20px; margin-top: 0; color: #fff; display: flex; align-items: center; gap: 8px; }
            .status { display: inline-block; padding: 4px 8px; background: #2e7d32; color: #fff; font-size: 12px; border-radius: 6px; font-weight: bold; margin-bottom: 16px; }
            .info-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #2d2d2d; font-size: 14px; }
            .info-item:last-child { border-bottom: none; }
            .label { color: #888; }
            .value { font-weight: 500; color: #fff; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            .footer a { color: #2196f3; text-decoration: none; }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>⚡ Ultra VPN Plus</h1>
            <div class="status">ПОДПИСКА АКТИВНА</div>
            <div class="info-item">
                <span class="label">Доступный трафик:</span>
                <span class="value">${totalTraffic} / ∞</span>
            </div>
            <div class="info-item">
                <span class="label">Дата окончания:</span>
                <span class="value">${expirationDate}</span>
            </div>
            <div class="info-item">
                <span class="label">Обновление данных:</span>
                <span class="value">Каждый час</span>
            </div>
            <div class="footer">
                Поддержка и новости: <a href="https://t.me/${supportContact.replace('@', '')}" target="_blank">${supportContact}</a>
            </div>
        </div>
    </body>
    </html>
    `;
    return new Response(html, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
  }

  // --- ЕСЛИ ЗАПРОС ОТ VPN-КЛИЕНТА (ОТДАЕМ КОНФИГИ) ---
  
  // Собираем финальную строку (сначала анонс, потом твои зашифрованные конфиги)
  // Допустим, твои конфиги лежат в переменной vpnConfigsString
  const finalResponseText = announce + vpnConfigsString;

  const newHeaders = new Headers();
  newHeaders.set("profile-title", `base64:${profileTitleBase64}`);
  newHeaders.set("subscription-userinfo", "upload=0; download=383331401728; total=383331401728; expire=1899589200");
  newHeaders.set("profile-update-interval", "1");
  newHeaders.set("Access-Control-Allow-Origin", "*");

  return new Response(finalResponseText, { headers: newHeaders });
}
