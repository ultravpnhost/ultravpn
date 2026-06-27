export default {
  async fetch(request, env, ctx) {
    const userAgent = request.headers.get("user-agent") || "";
    // Определяем, запрос от VPN-клиента или браузера
    const isClient = userAgent.includes("V2Ray") || userAgent.includes("Happ") || userAgent.includes("sing-box");

    // ---- ТОЛЬКО 5 СЕРВЕРОВ (LTE №2 и №3 УДАЛЕНЫ) ----
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
        remarks: "🇩🇪 Германия⚡"
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
        remarks: "🇸🇪 Швеция⚡"
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
        remarks: "🇵🇱 Польша"
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
        remarks: "🇷🇺 Россия"
      },
      {
        tag: "lte-1",
        address: "hole3.datanode-internal.net",
        port: 9443,
        id: "9d5e7e04-53e4-4d98-bb26-236c907078a5",
        serverName: "ads.x5.ru",
        publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
        shortId: "abbcd128",
        fingerprint: "qq",
        remarks: "🇩🇪 LTE №1 ⚡"
      }
    ];

    // ---- Функция генерации полного конфига (как в вашем примере) ----
    function makeConfig({ tag, address, port, id, serverName, publicKey, shortId, fingerprint, remarks }) {
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
          subjectSelector: [tag]
        },
        outbounds: [
          {
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
                      encryption: "none",
                      flow: "xtls-rprx-vision"
                    }
                  ]
                }
              ]
            },
            streamSettings: {
              network: "tcp",
              tcpSettings: {},
              security: "reality",
              realitySettings: {
                serverName: serverName,
                show: false,
                publicKey: publicKey,
                shortId: shortId,
                fingerprint: fingerprint
              }
            }
          },
          { tag: "direct", protocol: "freedom" },
          { tag: "block", protocol: "blackhole" }
        ],
        remarks: remarks,
        routing: {
          domainMatcher: "hybrid",
          domainStrategy: "IPIfNonMatch",
          balancers: [
            {
              tag: `bal_${tag}`,
              selector: [tag],
              fallbackTag: "direct",
              strategy: {
                type: "leastLoad",
                settings: {
                  baselines: ["4s"],
                  costs: [{ match: tag, regexp: false, value: 1 }],
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
              balancerTag: `bal_${tag}`
            }
          ]
        }
      };
    }

    // ---- ЕСЛИ ЗАПРОС ОТ VPN-КЛИЕНТА ----
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

    // ---- ВЕБ-ИНТЕРФЕЙС для браузеров ----
    // Функция для генерации VLESS-ссылки (для кнопок)
    function buildVlessLink(n) {
      return `vless://${n.id}@${n.address}:${n.port}?encryption=none&flow=xtls-rprx-vision&security=reality&sni=${n.serverName}&fp=${n.fingerprint}&pbk=${n.publicKey}&sid=${n.shortId}#${encodeURIComponent(n.remarks)}`;
    }

    // Генерируем карточки для 5 серверов
    const cardsHtml = nodes.map((n, index) => {
      const link = buildVlessLink(n);
      const config = {
        protocol: "vless",
        remarks: n.remarks,
        address: n.address,
        port: n.port,
        id: n.id,
        encryption: "none",
        flow: "xtls-rprx-vision",
        streamSettings: {
          network: "tcp",
          security: "reality",
          realitySettings: {
            fingerprint: n.fingerprint,
            publicKey: n.publicKey,
            serverName: n.serverName,
            shortId: n.shortId
          }
        }
      };
      const jsonConfig = JSON.stringify(config, null, 2);
      const escapedLink = link.replace(/\\/g, '\\\\').replace(/"/g, '&quot;');
      const escapedJson = jsonConfig.replace(/\\/g, '\\\\').replace(/"/g, '&quot;');
      return `
        <div class="card" data-index="${index}">
          <div class="card-header">
            <span class="flag">${n.remarks.split(' ')[0]}</span>
            <span class="name">${n.remarks}</span>
            <span class="badge">vless</span>
          </div>
          <div class="card-body">
            <div class="field"><span class="label">Адрес:</span> ${n.address}</div>
            <div class="field"><span class="label">Порт:</span> ${n.port}</div>
            <div class="field"><span class="label">ID:</span> <code>${n.id}</code></div>
            <div class="field"><span class="label">SNI:</span> ${n.serverName}</div>
            <div class="field"><span class="label">Public Key:</span> <code>${n.publicKey}</code></div>
            <div class="field"><span class="label">Short ID:</span> ${n.shortId}</div>
          </div>
          <div class="card-actions">
            <button class="btn copy-json" data-json='${escapedJson}'>📋 Копировать JSON</button>
            <button class="btn copy-link" data-link='${escapedLink}'>🔗 Копировать ссылку</button>
          </div>
        </div>
      `;
    }).join('');

    const html = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ultra VPN Plus — Подписка</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: #09090b;
      color: #e4e9f0;
      padding: 20px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .container {
      max-width: 1200px;
      width: 100%;
    }
    header {
      text-align: center;
      padding: 30px 0 20px;
    }
    header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #58a6ff, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    header p {
      color: #8b95a9;
      margin-top: 6px;
      font-size: 1rem;
    }
    .stats {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 16px;
      padding: 16px 24px;
      margin: 20px 0 30px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }
    .stats .stat-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.95rem;
    }
    .stats .stat-item span:first-child {
      color: #8b949e;
    }
    .stats .stat-item span:last-child {
      font-weight: 600;
      color: #58a6ff;
    }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
      margin-bottom: 30px;
    }
    .toolbar .btn {
      background: #1e293b;
      border: none;
      color: #cbd5e1;
      padding: 10px 20px;
      border-radius: 30px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    }
    .toolbar .btn:hover { background: #2d3b52; color: #fff; }
    .toolbar .btn:active { transform: scale(0.96); }
    .toolbar .btn-primary {
      background: #3b82f6;
      color: #fff;
    }
    .toolbar .btn-primary:hover { background: #2563eb; }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }
    .card {
      background: #161b22;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      transition: transform 0.15s, box-shadow 0.2s;
      border: 1px solid #1e293b;
      display: flex;
      flex-direction: column;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.7);
      border-color: #334155;
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
      flex-wrap: wrap;
    }
    .flag { font-size: 1.8rem; line-height: 1; }
    .name { font-weight: 600; font-size: 1.2rem; flex: 1; }
    .badge {
      background: #2d3b52;
      padding: 2px 12px;
      border-radius: 20px;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #94a3b8;
    }
    .card-body {
      flex: 1;
      font-size: 0.9rem;
      line-height: 1.6;
    }
    .field {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 8px;
      padding: 3px 0;
      border-bottom: 1px solid #1e293b;
    }
    .field:last-child { border-bottom: none; }
    .label { color: #8b95a9; min-width: 80px; }
    code {
      background: #0b0e14;
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 0.8rem;
      color: #d1d5db;
      word-break: break-all;
    }
    .card-actions {
      display: flex;
      gap: 10px;
      margin-top: 16px;
      flex-wrap: wrap;
    }
    .card-actions .btn {
      flex: 1;
      min-width: 100px;
      background: #1e293b;
      border: none;
      color: #cbd5e1;
      padding: 8px 12px;
      border-radius: 30px;
      font-size: 0.8rem;
      cursor: pointer;
      transition: background 0.2s;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .card-actions .btn:hover { background: #2d3b52; color: #fff; }
    .card-actions .btn-success {
      background: #22c55e;
      color: #fff;
    }
    .card-actions .btn-success:hover { background: #16a34a; }
    .toast {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      background: #1e293b;
      color: #e4e9f0;
      padding: 12px 28px;
      border-radius: 40px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6);
      font-size: 0.95rem;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      border: 1px solid #334155;
      z-index: 999;
    }
    .toast.show { opacity: 1; }
    footer {
      margin-top: 40px;
      color: #4b5563;
      font-size: 0.8rem;
      text-align: center;
    }
    footer a { color: #58a6ff; text-decoration: none; }
    @media (max-width: 600px) {
      header h1 { font-size: 1.8rem; }
      .cards { grid-template-columns: 1fr; }
      .toolbar .btn { font-size: 0.8rem; padding: 8px 14px; }
      .stats { flex-direction: column; gap: 8px; align-items: flex-start; }
    }
  </style>
</head>
<body>
<div class="container">
  <header>
    <h1>🚀 Ultra VPN Plus</h1>
    <p>Выберите сервер и скопируйте конфигурацию</p>
  </header>

  <div class="stats">
    <div class="stat-item"><span>Использовано:</span><span>357 GB / ∞</span></div>
    <div class="stat-item"><span>Статус:</span><span style="color:#22c55e;">● Активна</span></div>
    <div class="stat-item"><span>Поддержка:</span><a href="https://t.me/fhcsupport" style="color:#58a6ff; text-decoration:none;">@fhcsupport</a></div>
  </div>

  <div class="toolbar">
    <button class="btn btn-primary" id="downloadAllJson">📥 Скачать все JSON</button>
    <button class="btn btn-primary" id="downloadAllLinks">📥 Скачать все ссылки</button>
    <button class="btn" id="copyAllLinks">📋 Копировать все ссылки</button>
    <button class="btn" id="copyAllJson">📋 Копировать все JSON</button>
  </div>

  <div class="cards" id="cardsContainer">
    ${cardsHtml}
  </div>

  <footer>
    Обновлено: ${new Date().toLocaleString('ru-RU')} · Данные получены с Cloudflare Worker
  </footer>
</div>

<div id="toast" class="toast"></div>

<script>
  (function() {
    // Данные серверов (дублируем из Worker для JS)
    const nodes = ${JSON.stringify(nodes)};

    // Функция генерации JSON-конфига для одного сервера (плоский для v2ray)
    function buildConfig(n) {
      return {
        protocol: "vless",
        remarks: n.remarks,
        address: n.address,
        port: n.port,
        id: n.id,
        encryption: "none",
        flow: "xtls-rprx-vision",
        streamSettings: {
          network: "tcp",
          security: "reality",
          realitySettings: {
            fingerprint: n.fingerprint,
            publicKey: n.publicKey,
            serverName: n.serverName,
            shortId: n.shortId
          }
        }
      };
    }

    // Генерация vless-ссылки
    function buildLink(n) {
      return \`vless://\${n.id}@\${n.address}:\${n.port}?encryption=none&flow=xtls-rprx-vision&security=reality&sni=\${n.serverName}&fp=\${n.fingerprint}&pbk=\${n.publicKey}&sid=\${n.shortId}#\${encodeURIComponent(n.remarks)}\`;
    }

    // Уведомления
    function showToast(message, duration = 2000) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(toast._timer);
      toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
    }

    // Копирование
    function copyText(text, successMsg = 'Скопировано!') {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => showToast(successMsg))
          .catch(() => fallbackCopy(text, successMsg));
      } else {
        fallbackCopy(text, successMsg);
      }
    }
    function fallbackCopy(text, successMsg) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try { document.execCommand('copy'); showToast(successMsg); } catch (e) { showToast('Не удалось скопировать'); }
      document.body.removeChild(textarea);
    }

    // Скачивание файла
    function downloadFile(content, filename, mimeType = 'application/json') {
      const blob = new Blob([content], { type: mimeType });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }

    // ---------- Обработчики для карточек ----------
    document.querySelectorAll('.copy-json').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const json = this.dataset.json;
        copyText(json, 'JSON скопирован!');
      });
    });

    document.querySelectorAll('.copy-link').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const link = this.dataset.link;
        copyText(link, 'Ссылка скопирована!');
      });
    });

    // ---------- Глобальные кнопки ----------
    document.getElementById('downloadAllJson').addEventListener('click', function() {
      const allConfigs = nodes.map(n => buildConfig(n));
      const json = JSON.stringify(allConfigs, null, 2);
      downloadFile(json, 'vless_configs.json', 'application/json');
      showToast('JSON-файл скачан');
    });

    document.getElementById('downloadAllLinks').addEventListener('click', function() {
      const links = nodes.map(n => buildLink(n)).join('\\n');
      downloadFile(links, 'vless_links.txt', 'text/plain');
      showToast('Ссылки скачаны в файл');
    });

    document.getElementById('copyAllLinks').addEventListener('click', function() {
      const links = nodes.map(n => buildLink(n)).join('\\n');
      copyText(links, 'Все ссылки скопированы!');
    });

    document.getElementById('copyAllJson').addEventListener('click', function() {
      const allConfigs = nodes.map(n => buildConfig(n));
      const json = JSON.stringify(allConfigs, null, 2);
      copyText(json, 'Все JSON скопированы!');
    });

    // Приветствие
    window.addEventListener('load', function() {
      showToast('Добро пожаловать! Выберите сервер', 1800);
    });
  })();
</script>
</body>
</html>
    `;

    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
};
