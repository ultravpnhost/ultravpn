export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const wantsHtml = url.searchParams.has("html");

    const configs = [
     [
  {
    "remarks": "🇩🇪 Германия",
    "protocol": "vless",
    "address": "de-new.datanode-internal.net",
    "port": 443,
    "id": "9d5e7e04-53e4-4d98-bb26-236c907078a5",
    "encryption": "none",
    "flow": "xtls-rprx-vision",
    "streamSettings": {
      "network": "tcp",
      "security": "reality",
      "realitySettings": {
        "publicKey": "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
        "serverName": "ads.x5.ru",
        "shortId": "abbcd128",
        "fingerprint": "qq"
      }
    },
    "dns": { "queryStrategy": "UseIP" }
  },
  {
    "remarks": "🇸🇪 Швеция",
    "protocol": "vless",
    "address": "se-new.datanode-internal.net",
    "port": 443,
    "id": "9d5e7e04-53e4-4d98-bb26-236c907078a5",
    "encryption": "none",
    "flow": "xtls-rprx-vision",
    "streamSettings": {
      "network": "tcp",
      "security": "reality",
      "realitySettings": {
        "publicKey": "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
        "serverName": "ads.x5.ru",
        "shortId": "abbcd128",
        "fingerprint": "qq"
      }
    },
    "dns": { "queryStrategy": "UseIP" }
  },
  {
    "remarks": "🇵🇱 Польша",
    "protocol": "vless",
    "address": "pl.datanode-internal.net",
    "port": 443,
    "id": "9d5e7e04-53e4-4d98-bb26-236c907078a5",
    "encryption": "none",
    "flow": "xtls-rprx-vision",
    "streamSettings": {
      "network": "tcp",
      "security": "reality",
      "realitySettings": {
        "publicKey": "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
        "serverName": "sun9-35.userapi.com",
        "shortId": "abbcd128",
        "fingerprint": "qq"
      }
    },
    "dns": { "queryStrategy": "UseIP" }
  },
  {
    "remarks": "🇷🇺 Россия",
    "protocol": "vless",
    "address": "ru.datanode-internal.net",
    "port": 443,
    "id": "9d5e7e04-53e4-4d98-bb26-236c907078a5",
    "encryption": "none",
    "flow": "xtls-rprx-vision",
    "streamSettings": {
      "network": "tcp",
      "security": "reality",
      "realitySettings": {
        "publicKey": "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
        "serverName": "sun9-38.userapi.com",
        "shortId": "abbcd128",
        "fingerprint": "qq"
      }
    },
    "dns": { "queryStrategy": "UseIP" }
  },
  {
    "remarks": "🇩🇪 LTE #1",
    "protocol": "vless",
    "address": "hole3.datanode-internal.net",
    "port": 9443,
    "id": "9d5e7e04-53e4-4d98-bb26-236c907078a5",
    "encryption": "none",
    "flow": "xtls-rprx-vision",
    "streamSettings": {
      "network": "tcp",
      "security": "reality",
      "realitySettings": {
        "publicKey": "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
        "serverName": "ads.x5.ru",
        "shortId": "abbcd128",
        "fingerprint": "qq"
      }
    },
    "dns": { "queryStrategy": "UseIP" }
  }
];

    if (wantsHtml) {
      const html = `<body style="background:#0d1117; color:#fff; font-family:sans-serif; display:flex; justify-content:center; align-items:center; height:100vh; margin:0;">
        <div style="background:#161b22; padding:30px; border-radius:12px; border:1px solid #30363d; text-align:center;">
          <h1>Ultra VPN Plus</h1>
          <p>Статус: Активен</p>
          <div style="background:#0d1117; padding:10px; border-radius:6px; margin-top:20px;">
            Использовано: 874 GB / ∞
          </div>
        </div>
      </body>`;
      return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    const headers = new Headers();
    headers.set("Content-Type", "application/json; charset=utf-8");
    // 357 GB = 383331401728 байт, total=0 означает бесконечность
    headers.set("subscription-userinfo", "upload=0; download=938460353216; total=0; expire=1899589200");
    headers.set("Access-Control-Allow-Origin", "*");

    return new Response(JSON.stringify(configs), { status: 200, headers });
  }
};
