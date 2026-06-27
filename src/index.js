export default {
  async fetch(request, env, ctx) {
    const userAgent = request.headers.get("user-agent") || "";
    // Проверяем, является ли запрос от VPN-клиента
    const isClient = userAgent.includes("V2Ray") || userAgent.includes("Happ") || userAgent.includes("sing-box");

    // ---- Функция генерации конфига ----
    function makeConfig({ tag, address, port, id, serverName, publicKey, shortId, fingerprint, remarks }) {
      return {
        tag: tag,
        protocol: "vless",
        settings: { vnext: [{ address, port, users: [{ id, encryption: "none", flow: "xtls-rprx-vision" }] }] },
        streamSettings: {
          network: "tcp",
          security: "reality",
          realitySettings: { serverName, show: false, publicKey, shortId, fingerprint }
        }
      };
    }

    const nodes = [
      { tag: "de-1", address: "de-new.datanode-internal.net", port: 443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "ads.x5.ru", publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", shortId: "abbcd128", fingerprint: "qq", remarks: "🇩🇪 Германия⚡" },
      { tag: "se-1", address: "se-new.datanode-internal.net", port: 443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "ads.x5.ru", publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", shortId: "abbcd128", fingerprint: "qq", remarks: "🇸🇪 Швеция⚡" },
      { tag: "pl-1", address: "pl.datanode-internal.net", port: 443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "sun9-35.userapi.com", publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", shortId: "abbcd128", fingerprint: "qq", remarks: "🇵🇱 Польша" },
      { tag: "ru-1", address: "ru.datanode-internal.net", port: 443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "sun9-38.userapi.com", publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", shortId: "abbcd128", fingerprint: "qq", remarks: "🇷🇺 Россия" },
      { tag: "lte-1", address: "hole3.datanode-internal.net", port: 9443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "ads.x5.ru", publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", shortId: "abbcd128", fingerprint: "qq", remarks: "🇩🇪 LTE №1 ⚡" }
    ];

    // ---- ОТДАЧА JSON ДЛЯ КЛИЕНТА ----
    if (isClient) {
      const configs = nodes.map(n => makeConfig(n));
      return new Response(JSON.stringify(configs, null, 2), {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "subscription-userinfo": "upload=0; download=383331401728; total=0; expire=1899589200"
        }
      });
    }

    // ---- ВЕБ-ИНТЕРФЕЙС ----
    const html = `<!DOCTYPE html>
    <html lang="ru"><head><meta charset="UTF-8"><title>Ultra VPN | Dashboard</title>
    <style>
        body { font-family: sans-serif; background: #09090b; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .card { background: #161b22; padding: 40px; border-radius: 20px; border: 1px solid #30363d; text-align: center; width: 320px; }
        h1 { margin: 0 0 20px 0; color: #58a6ff; }
        .stat { background: #27272a; padding: 15px; border-radius: 10px; margin-bottom: 20px; }
    </style></head><body>
    <div class="card">
        <h1>🚀 Ultra VPN Plus</h1>
        <div class="stat">Использовано: 357 GB / ∞</div>
        <p style="color:#8b949e">Подписка активна</p>
        <a href="https://t.me/fhcsupport" style="color:#58a6ff">Поддержка @fhcsupport</a>
    </div></body></html>`;

    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
};
