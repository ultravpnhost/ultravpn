export default {
  async fetch(request, env, ctx) {
    const userAgent = request.headers.get("user-agent") || "";
    const isClient = userAgent.includes("V2Ray") || userAgent.includes("Happ") || userAgent.includes("sing-box");

    const configs = [
      { addr: "de-new.datanode-internal.net", port: 443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "ads.x5.ru", pk: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", sid: "abbcd128", name: "🇩🇪 Германия" },
      { addr: "se-new.datanode-internal.net", port: 443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "ads.x5.ru", pk: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", sid: "abbcd128", name: "🇸🇪 Швеция" },
      { addr: "pl.datanode-internal.net", port: 443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "sun9-35.userapi.com", pk: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", sid: "abbcd128", name: "🇵🇱 Польша" },
      { addr: "ru.datanode-internal.net", port: 443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "sun9-38.userapi.com", pk: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", sid: "abbcd128", name: "🇷🇺 Россия" },
      { addr: "hole3.datanode-internal.net", port: 9443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "ads.x5.ru", pk: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", sid: "abbcd128", name: "🇩🇪 LTE #1" }
    ];

    if (isClient) {
      // Формируем полный массив JSON с полной структурой VLESS Reality
      const jsonResponse = configs.map(c => ({
        "remarks": c.name,
        "protocol": "vless",
        "settings": {
          "vnext": [{
            "address": c.addr,
            "port": c.port,
            "users": [{ "id": c.id, "encryption": "none", "flow": "xtls-rprx-vision" }]
          }]
        },
        "streamSettings": {
          "network": "tcp",
          "security": "reality",
          "realitySettings": {
            "publicKey": c.pk,
            "serverName": c.serverName,
            "shortId": c.sid,
            "fingerprint": "qq"
          }
        }
      }));

      return new Response(JSON.stringify(jsonResponse), {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "subscription-userinfo": "upload=0; download=383331401728; total=0; expire=1899589200",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // Если это браузер — оставляем твой красивый Dashboard
    return new Response(`<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><title>Dashboard</title><style>body{font-family:sans-serif;background:#09090b;color:#fff;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}.card{background:#161b22;padding:40px;border-radius:20px;border:1px solid #27272a;text-align:center;}</style></head><body><div class="card"><h1>🚀 Ultra VPN Plus</h1><p>JSON API активен</p></div></body></html>`, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
};
