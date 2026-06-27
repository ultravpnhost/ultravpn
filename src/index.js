export default {
  async fetch(request, env, ctx) {
    const announce = "Ultra VPN Plus — стабильное и быстрое подключение.";
    
    // В структуре rjsxrd конфиги часто требуют поле "proxy" 
    // или строгого соответствия вложенности vnext/users.
    const configs = [
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
            "shortId": "abbcd128"
          }
        }
      }
    ];

    // rjsxrd ожидает именно такой формат ответа
    const data = {
      "announce": announce,
      "configs": configs
    };

    const headers = new Headers();
    headers.set("Content-Type", "application/json; charset=utf-8");
    headers.set("subscription-userinfo", "upload=0; download=383331401728; total=5497558138880; expire=1899589200");
    headers.set("Access-Control-Allow-Origin", "*");

    return new Response(JSON.stringify(data), { status: 200, headers });
  }
};
