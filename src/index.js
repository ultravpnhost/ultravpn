export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("user-agent") || "";
    
    // Определяем, кто стучится: VPN-клиенты (Happ, V2Ray, и т.д.)
    const isClient = userAgent.includes("V2Ray") || userAgent.includes("Happ") || userAgent.includes("sing-box");

    const configs = [
      { addr: "de-new.datanode-internal.net", port: 443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "ads.x5.ru", pk: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", sid: "abbcd128", name: "🇩🇪 Германия" },
      { addr: "se-new.datanode-internal.net", port: 443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "ads.x5.ru", pk: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", sid: "abbcd128", name: "🇸🇪 Швеция" },
      { addr: "pl.datanode-internal.net", port: 443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "sun9-35.userapi.com", pk: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", sid: "abbcd128", name: "🇵🇱 Польша" },
      { addr: "ru.datanode-internal.net", port: 443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "sun9-38.userapi.com", pk: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", sid: "abbcd128", name: "🇷🇺 Россия" },
      { addr: "hole3.datanode-internal.net", port: 9443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "ads.x5.ru", pk: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", sid: "abbcd128", name: "🇩🇪 LTE #1" }
    ];

    // Если это VPN-клиент — отдаем "стерильные" ссылки
    if (isClient) {
      const links = configs.map(c => 
        `vless://${c.id}@${c.addr}:${c.port}?encryption=none&flow=xtls-rprx-vision&security=reality&sni=${c.serverName}&fp=qq&pbk=${c.pk}&sid=${c.sid}#${encodeURIComponent(c.name)}`
      ).join("\n");

      return new Response(links, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "subscription-userinfo": "upload=0; download=383331401728; total=0; expire=1899589200",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // Если это браузер — показываем современный Dashboard
    const html = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ultra VPN Plus | Dashboard</title>
    <style>
        body { font-family: 'Segoe UI', system-ui, sans-serif; background: #09090b; color: #e4e4e7; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
        .card { background: linear-gradient(145deg, #18181b, #09090b); padding: 40px; border-radius: 20px; border: 1px solid #27272a; width: 100%; max-width: 400px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); text-align: center; }
        .logo { font-size: 48px; margin-bottom: 10px; }
        h1 { font-size: 24px; margin: 0; color: #fff; }
        .badge { display: inline-block; background: #16a34a; color: #fff; padding: 4px 12px; border-radius: 99px; font-size: 12px; font-weight: bold; margin: 15px 0; text-transform: uppercase; }
        .grid { display: grid; gap: 15px; margin-top: 30px; }
        .stat { background: #27272a; padding: 15px; border-radius: 12px; display: flex; justify-content: space-between; }
        .label { color: #a1a1aa; font-size: 14px; }
        .value { color: #fff; font-weight: 600; }
        .footer { margin-top: 30px; font-size: 13px; color: #71717a; }
        a { color: #3b82f6; text-decoration: none; }
    </style>
</head>
<body>
    <div class="card">
        <div class="logo">🚀</div>
        <h1>Ultra VPN Plus</h1>
        <div class="badge">Активен</div>
        <div class="grid">
            <div class="stat"><span class="label">Трафик:</span><span class="value">357 GB / ∞</span></div>
            <div class="stat"><span class="label">Статус:</span><span class="value">Безлимит</span></div>
        </div>
        <div class="footer">
            Есть вопросы? Пиши в <a href="https://t.me/fhcsupport">@fhcsupport</a>
        </div>
    </div>
</body>
</html>`;

    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
};
