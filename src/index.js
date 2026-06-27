export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const accept = request.headers.get("Accept") || "";
    const userAgent = request.headers.get("user-agent") || "";

    // ---- Серверы (обновлены названия) ----
    const nodes = [
      {
        tag: "de-1",
        address: "de-new.datanode-internal.net",
        port: 443,
        id: "9d5e7e04-53e4-4d98-bb26-236c907078a5",
        serverName: "ads.x5.ru",
        publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
        shortId: "abbcd128",
        fingerprint: "qq",
        remarks: "🇩🇪 Германия",
        network: "tcp",
        flow: "xtls-rprx-vision"
      },
      {
        tag: "se-1",
        address: "se-new.datanode-internal.net",
        port: 443,
        id: "9d5e7e04-53e4-4d98-bb26-236c907078a5",
        serverName: "ads.x5.ru",
        publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
        shortId: "abbcd128",
        fingerprint: "qq",
        remarks: "🇸🇪 Швеция",
        network: "tcp",
        flow: "xtls-rprx-vision"
      },
      {
        tag: "pl-1",
        address: "pl.datanode-internal.net",
        port: 443,
        id: "9d5e7e04-53e4-4d98-bb26-236c907078a5",
        serverName: "sun9-35.userapi.com",
        publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
        shortId: "abbcd128",
        fingerprint: "qq",
        remarks: "🇵🇱 Польша",
        network: "tcp",
        flow: "xtls-rprx-vision"
      },
      {
        tag: "ru-1",
        address: "ru.datanode-internal.net",
        port: 443,
        id: "9d5e7e04-53e4-4d98-bb26-236c907078a5",
        serverName: "sun9-38.userapi.com",
        publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
        shortId: "abbcd128",
        fingerprint: "qq",
        remarks: "🇷🇺 Россия",
        network: "tcp",
        flow: "xtls-rprx-vision"
      },
      {
        tag: "lte-1",
        address: "hole-nn.datanode-internal.net",
        port: 443,
        id: "9d5e7e04-53e4-4d98-bb26-236c907078a5",
        serverName: "ads.x5.ru",
        publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
        shortId: "abbcd128",
        fingerprint: "qq",
        remarks: "🇩🇪 LTE #1",
        network: "grpc",
        flow: "",
        grpcServiceName: "ads.x5.ru"
      }
    ];

    // ---- Функции генерации конфигов (без изменений) ----
    function makeOutbound({ tag, address, port, id, serverName, publicKey, shortId, fingerprint, network, flow, grpcServiceName }) {
      const outbound = {
        tag: tag,
        protocol: "vless",
        settings: {
          vnext: [
            {
              address: address,
              port: port,
              users: [
                {
                  id: id,
                  encryption: "none"
                }
              ]
            }
          ]
        },
        streamSettings: {
          network: network,
          security: "reality",
          realitySettings: {
            serverName: serverName,
            show: false,
            publicKey: publicKey,
            shortId: shortId,
            fingerprint: fingerprint
          }
        }
      };
      if (flow) {
        outbound.settings.vnext[0].users[0].flow = flow;
      }
      if (network === "grpc") {
        outbound.streamSettings.grpcSettings = {
          serviceName: grpcServiceName || ""
        };
      } else {
        outbound.streamSettings.tcpSettings = {};
      }
      return outbound;
    }

    function makeFullConfig(node) {
      const outbound = makeOutbound(node);
      return {
        dns: {
          servers: ["1.1.1.1", "1.0.0.1"],
          queryStrategy: "UseIP"
        },
        inbounds: [
          {
            tag: "socks",
            port: 10808,
            listen: "127.0.0.1",
            protocol: "socks",
            settings: { udp: true, auth: "noauth" },
            sniffing: { enabled: true, routeOnly: false, destOverride: ["http", "tls", "quic"] }
          },
          {
            tag: "http",
            port: 10809,
            listen: "127.0.0.1",
            protocol: "http",
            settings: { allowTransparent: false },
            sniffing: { enabled: true, routeOnly: false, destOverride: ["http", "tls", "quic"] }
          }
        ],
        observatory: {
          enableConcurrency: true,
          probeInterval: "1m",
          probeUrl: "https://www.google.com/generate_204",
          subjectSelector: [node.tag]
        },
        outbounds: [
          outbound,
          { tag: "direct", protocol: "freedom" },
          { tag: "block", protocol: "blackhole" }
        ],
        remarks: node.remarks,
        routing: {
          domainMatcher: "hybrid",
          domainStrategy: "IPIfNonMatch",
          balancers: [
            {
              tag: `bal_${node.tag}`,
              selector: [node.tag],
              fallbackTag: "direct",
              strategy: {
                type: "leastLoad",
                settings: {
                  baselines: ["4s"],
                  costs: [{ match: node.tag, regexp: false, value: 1 }],
                  expected: 1,
                  maxRTT: "6s"
                }
              }
            }
          ],
          rules: [
            { type: "field", protocol: ["bittorrent"], outboundTag: "block" },
            {
              domain: [
                "domain:mtalk.google.com",
                "domain:push.apple.com",
                "domain:api.push.apple.com"
              ],
              outboundTag: "direct",
              type: "field"
            },
            { ip: ["17.0.0.0/8"], outboundTag: "direct", type: "field" },
            {
              type: "field",
              inboundTag: ["socks", "http"],
              network: "tcp,udp",
              balancerTag: `bal_${node.tag}`
            }
          ]
        }
      };
    }

    // ---- Условия для JSON ----
    const wantsJson = (path === '/json') 
                   || accept.includes('application/json')
                   || userAgent.includes('V2Ray') 
                   || userAgent.includes('Happ') 
                   || userAgent.includes('sing-box')
                   || userAgent.includes('INCy');

    if (wantsJson) {
      const configs = nodes.map(n => makeFullConfig(n));
      const expireTimestamp = 1899589200;

      return new Response(JSON.stringify(configs, null, 2), {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Profile-Title": "Ultra VPN Plus",
          "Subscription-Status": "active",
          "Subscription-Traffic": "357 GB / ∞",
          "Subscription-Expire": String(expireTimestamp),
          "subscription-userinfo": `upload=0; download=383331401728; total=0; expire=${expireTimestamp}`
        }
      });
    }

    // ---- Генерация HTML через обычную конкатенацию (без вложенных шаблонных строк) ----
    // Сначала подготовим данные для клиента в виде JSON
    const serverData = nodes.map(n => ({
      flag: n.remarks.split(' ')[0],
      name: n.remarks,
      tag: n.tag
    }));
    const serverDataJson = JSON.stringify(serverData);

    const html = String.raw`
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ultra VPN Plus</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', system-ui, sans-serif;
            background: #0b0e14;
            color: #e4e9f0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 420px; width: 100%; }
        .page { display: none; animation: fade 0.25s ease; }
        .page.active { display: block; }
        @keyframes fade { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .card {
            background: linear-gradient(145deg, #18181b, #0d0d10);
            border-radius: 28px;
            border: 1px solid #27272a;
            padding: 32px 24px 24px;
            box-shadow: 0 30px 60px -20px rgba(0,0,0,0.8);
            transition: 0.3s;
        }
        .card:hover { border-color: #3f3f46; }
        .header { text-align: center; margin-bottom: 24px; }
        .icon { font-size: 52px; display: block; margin-bottom: 4px; }
        .title {
            font-size: 26px;
            font-weight: 700;
            background: linear-gradient(135deg, #58a6ff, #a78bfa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .badge {
            display: inline-block;
            background: rgba(22, 163, 74, 0.15);
            color: #22c55e;
            padding: 4px 18px;
            border-radius: 99px;
            font-size: 13px;
            font-weight: 600;
            margin-top: 6px;
            border: 1px solid rgba(34, 197, 94, 0.2);
        }
        .stats {
            background: #111113;
            border-radius: 18px;
            padding: 18px 16px;
            border: 1px solid #1e1e21;
            margin-bottom: 20px;
        }
        .stat-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
        }
        .stat-item + .stat-item {
            border-top: 1px solid #1e1e21;
            margin-top: 4px;
            padding-top: 12px;
        }
        .stat-label { font-size: 14px; color: #8b95a9; display: flex; align-items: center; gap: 8px; }
        .stat-value { font-size: 16px; font-weight: 600; }
        .stat-value .date { color: #fca5a5; }
        .btn {
            display: block;
            width: 100%;
            padding: 12px;
            border-radius: 99px;
            font-weight: 600;
            font-size: 15px;
            cursor: pointer;
            border: 1px solid #27272a;
            background: #1e1e21;
            color: #e4e9f0;
            transition: 0.2s;
            text-align: center;
        }
        .btn:hover { background: #2a2a2e; border-color: #3f3f46; }
        .btn-primary { background: #3b82f6; border-color: #3b82f6; color: #fff; }
        .btn-primary:hover { background: #2563eb; }
        .back-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 18px;
        }
        .back-header button {
            background: transparent;
            border: none;
            color: #58a6ff;
            font-size: 18px;
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 8px;
            transition: 0.2s;
        }
        .back-header button:hover { background: #1e293b; }
        .back-header h2 { font-size: 22px; font-weight: 600; }
        .server-list { display: flex; flex-direction: column; gap: 12px; }
        .server-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #111113;
            padding: 14px 16px;
            border-radius: 14px;
            border: 1px solid #1e1e21;
        }
        .server-info { display: flex; align-items: center; gap: 10px; }
        .server-flag { font-size: 24px; }
        .server-name { font-weight: 500; font-size: 15px; }
        .server-stats { display: flex; gap: 16px; font-size: 13px; color: #8b95a9; }
        .server-stats span { font-weight: 600; color: #e4e9f0; }
        .ping { color: #58a6ff; }
        .speed { color: #22c55e; }
        .footer { text-align: center; font-size: 14px; color: #5a5f6b; margin-top: 16px; }
        .footer a { color: #58a6ff; text-decoration: none; }
        .footer a:hover { text-decoration: underline; }
        @media (max-width: 400px) {
            .card { padding: 20px 14px; }
            .title { font-size: 22px; }
        }
    </style>
</head>
<body>
<div class="container">
    <!-- Главная страница -->
    <div id="page-main" class="page active">
        <div class="card">
            <div class="header">
                <span class="icon">🚀</span>
                <div class="title">Ultra VPN Plus</div>
                <div class="badge">● Активен</div>
            </div>
            <div class="stats">
                <div class="stat-item">
                    <span class="stat-label">📦 Трафик</span>
                    <span class="stat-value">357 GB <span style="color:#8b95a9;font-weight:400;">/ ∞</span></span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">📅 Истекает</span>
                    <span class="stat-value date">13.03.2030</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">🖥️ Серверов</span>
                    <span class="stat-value">5</span>
                </div>
            </div>
            <button class="btn btn-primary" id="statusBtn">📊 Статус серверов</button>
            <div class="footer">
                Вопросы? <a href="https://t.me/fhcsupport">@fhcsupport</a>
            </div>
        </div>
    </div>

    <!-- Страница статуса серверов -->
    <div id="page-servers" class="page">
        <div class="card">
            <div class="back-header">
                <button id="backBtn">← Назад</button>
                <h2>Статус серверов</h2>
            </div>
            <div id="serverList" class="server-list">
                <!-- заполняется JS -->
            </div>
            <div class="footer" style="margin-top:18px;">
                <span style="color:#5a5f6b;">Обновлено: <span id="updateTime"></span></span>
            </div>
        </div>
    </div>
</div>

<script>
// Данные серверов (переданы с сервера)
var servers = ${serverDataJson};

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateStatus() {
    var ping = random(50, 200);
    var speed = random(70, 500);
    return { ping: ping, speed: speed };
}

function renderServers() {
    var container = document.getElementById('serverList');
    var now = new Date().toLocaleString('ru-RU');
    document.getElementById('updateTime').textContent = now;

    var html = '';
    for (var i = 0; i < servers.length; i++) {
        var s = servers[i];
        var status = generateStatus();
        html += '<div class="server-item">' +
            '<div class="server-info">' +
                '<span class="server-flag">' + s.flag + '</span>' +
                '<span class="server-name">' + s.name + '</span>' +
            '</div>' +
            '<div class="server-stats">' +
                '<span>📶 <span class="ping">' + status.ping + '</span> мс</span>' +
                '<span>⚡ <span class="speed">' + status.speed + '</span> Мбит/с</span>' +
            '</div>' +
        '</div>';
    }
    container.innerHTML = html;
}

// Переключение страниц
var pageMain = document.getElementById('page-main');
var pageServers = document.getElementById('page-servers');
var statusBtn = document.getElementById('statusBtn');
var backBtn = document.getElementById('backBtn');

function showPage(page) {
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove('active');
    }
    document.getElementById('page-' + page).classList.add('active');
    if (page === 'servers') {
        renderServers();
    }
}

statusBtn.addEventListener('click', function() { showPage('servers'); });
backBtn.addEventListener('click', function() { showPage('main'); });
</script>
</body>
</html>`;

    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
};
