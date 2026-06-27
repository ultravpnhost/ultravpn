addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Исправленная структура: вытащили address, port, id и flow наружу
  const configsObj = [
    {
      "protocol": "vless",
      "remarks": "🇩🇪 Германия⚡",
      "address": "de-new.datanode-internal.net",
      "port": 443,
      "id": "9d5e7e04-53e4-4d98-bb26-236c907078a5",
      "encryption": "none",
      "flow": "xtls-rprx-vision",
      "streamSettings": {
        "network": "tcp",
        "security": "reality",
        "realitySettings": {
          "fingerprint": "qq",
          "publicKey": "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
          "serverName": "ads.x5.ru",
          "shortId": "abbcd128"
        }
      }
    },
    {
      "protocol": "vless",
      "remarks": "🇸🇪 Швеция⚡",
      "address": "se-new.datanode-internal.net",
      "port": 443,
      "id": "9d5e7e04-53e4-4d98-bb26-236c907078a5",
      "encryption": "none",
      "flow": "xtls-rprx-vision",
      "streamSettings": {
        "network": "tcp",
        "security": "reality",
        "realitySettings": {
          "fingerprint": "qq",
          "publicKey": "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
          "serverName": "ads.x5.ru",
          "shortId": "abbcd128"
        }
      }
    },
    {
      "protocol": "vless",
      "remarks": "🇵🇱 Польша",
      "address": "pl.datanode-internal.net",
      "port": 443,
      "id": "9d5e7e04-53e4-4d98-bb26-236c907078a5",
      "encryption": "none",
      "flow": "xtls-rprx-vision",
      "streamSettings": {
        "network": "tcp",
        "security": "reality",
        "realitySettings": {
          "fingerprint": "qq",
          "publicKey": "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
          "serverName": "sun9-35.userapi.com",
          "shortId": "abbcd128"
        }
      }
    },
    {
      "protocol": "vless",
      "remarks": "🇷🇺 Россия",
      "address": "ru.datanode-internal.net",
      "port": 443,
      "id": "9d5e7e04-53e4-4d98-bb26-236c907078a5",
      "encryption": "none",
      "flow": "xtls-rprx-vision",
      "streamSettings": {
        "network": "tcp",
        "security": "reality",
        "realitySettings": {
          "fingerprint": "qq",
          "publicKey": "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
          "serverName": "sun9-38.userapi.com",
          "shortId": "abbcd128"
        }
      }
    },
    {
      "protocol": "vless",
      "remarks": "🇩🇪 LTE №1 ⚡",
      "address": "hole3.datanode-internal.net",
      "port": 9443,
      "id": "9d5e7e04-53e4-4d98-bb26-236c907078a5",
      "encryption": "none",
      "flow": "xtls-rprx-vision",
      "streamSettings": {
        "network": "tcp",
        "security": "reality",
        "realitySettings": {
          "fingerprint": "qq",
          "publicKey": "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
          "serverName": "ads.x5.ru",
          "shortId": "abbcd128"
        }
      }
    },
    {
      "protocol": "vless",
      "remarks": "🇵🇱 LTE №2",
      "address": "178.250.242.194",
      "port": 6443,
      "id": "b92337e0-6819-4f17-a3cc-f860b138b27a",
      "encryption": "none",
      "flow": "xtls-rprx-vision",
      "streamSettings": {
        "network": "tcp",
        "security": "reality",
        "realitySettings": {
          "fingerprint": "firefox",
          "publicKey": "noOR7PAxYWRRrbQywDahrBlTkbNuNFkMLCPcX-wfa5TY",
          "serverName": "a.wb.ru",
          "shortId": "086007"
        }
      }
    },
    {
      "protocol": "vless",
      "remarks": "🇳🇱 LTE №3",
      "address": "178.250.242.194",
      "port": 443,
      "id": "7573908b-d981-4153-92aa-33ee2d22144c",
      "encryption": "none",
      "flow": "xtls-rprx-vision",
      "streamSettings": {
        "network": "tcp",
        "security": "reality",
        "realitySettings": {
          "fingerprint": "firefox",
          "publicKey": "grRXV9R0CYdwQX8R4S1qfMde1b8g6Ejr1UZCxM5-PkM",
          "serverName": "api.ok.ru",
          "shortId": "3efa66e0"
        }
      }
    }
  ];

  const cleanJson = JSON.stringify(configsObj);

  const newHeaders = new Headers();
  newHeaders.set("Content-Type", "application/json; charset=utf-8");
  
  // Строго "Ultra VPN" в Base64, вообще без флагов
  newHeaders.set("profile-title", "base64:VWx0cmEgVlBO");
  
  // Лимиты: 357 ГБ / ∞ / Окончание 13.03.2030
  newHeaders.set("subscription-userinfo", "upload=0; download=383331401728; total=0; expire=1899589200");
  newHeaders.set("profile-update-interval", "1");
  newHeaders.set("Access-Control-Allow-Origin", "*");

  return new Response(cleanJson, {
    status: 200,
    headers: newHeaders
  });
}
