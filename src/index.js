export default {
  async fetch(request, env, ctx) {
    // --- ДАННЫЕ ПОДПИСКИ ---
    const profileTitleBase64 = "VWx0cmEgVlBOIFBsdXM="; // Base64 для "Ultra VPN Plus"

    // Анонс для VPN-клиентов
    const announceStr = "#announce: Ultra VPN Plus — стабильное и быстрое подключение без ограничений.\n";

    // Твои 5 оригинальных рабочих конфигов
    const configsObj = [
      {
        address: "de-new.datanode-internal.net",
        port: 443,
        id: "9d5e7e04-53e4-4d98-bb26-236c907078a5",
        flow: "xtls-rprx-vision",
        serverName: "ads.x5.ru",
        publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
        shortId: "abbcd128",
        remarks: "🇩🇪 Германия⚡"
      },
      {
        address: "se-new.datanode-internal.net",
        port: 443,
        id: "9d5e7e04-53e4-4d98-bb26-236c907078a5",
        flow: "xtls-rprx-vision",
        serverName: "ads.x5.ru",
        publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
        shortId: "abbcd128",
        remarks: "🇸🇪 Швеция⚡"
      },
      {
        address: "pl.datanode-internal.net",
        port: 443,
        id: "9d5e7e04-53e4-4d98-bb26-236c907078a5",
        flow: "xtls-rprx-vision",
        serverName: "sun9-35.userapi.com",
        publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
        shortId: "abbcd128",
        remarks: "🇵🇱 Польша"
      },
      {
        address: "ru.datanode-internal.net",
        port: 443,
        id: "9d5e7e04-53e4-4d98-bb26-236c907078a5",
        flow: "xtls-rprx-vision",
        serverName: "sun9-38.userapi.com",
        publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
        shortId: "abbcd128",
        remarks: "🇷🇺 Россия"
      },
      {
        address: "hole3.datanode-internal.net",
        port: 9443,
        id: "9d5e7e04-53e4-4d98-bb26-236c907078a5",
        flow: "xtls-rprx-vision",
        serverName: "ads.x5.ru",
        publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
        shortId: "abbcd128",
        remarks: "🇩🇪 LTE #1"
      }
    ];

    // ГЕНЕРАЦИЯ СТАНДАРТНЫХ ССЫЛОК (VLESS://)
    const vlessLinks = configsObj.map(c => {
      const label = encodeURIComponent(c.remarks);
      return `vless://${c.id}@${c.address}:${c.port}?encryption=none&flow=${c.flow}&security=reality&sni=${c.serverName}&fp=qq&pbk=${c.publicKey}&sid=${c.shortId}#${label}`;
    });

    // Формируем финальный текстовый ответ (анонс + ссылки через перенос строки)
    const plainTextPayload = announceStr + vlessLinks.join("\n");

    const newHeaders = new Headers();
    // Передаем строго чистый текст, чтобы регулярки без проблем парсили ссылки
    newHeaders.set("Content-Type", "text/plain; charset=utf-8");
    
    // Данные подписки в хедерах (для v2rayNG, Nekobox, Sing-box и др.)
    newHeaders.set("profile-title", `base64:${profileTitleBase64}`);
    newHeaders.set("subscription-userinfo", "upload=0; download=383331401728; total=383331401728; expire=1899589200");
    newHeaders.set("profile-update-interval", "1");
    newHeaders.set("Access-Control-Allow-Origin", "*");

    return new Response(plainTextPayload, { status: 200, headers: newHeaders });
  }
};
