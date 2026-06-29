export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const accept = request.headers.get("Accept") || "";
    const userAgent = request.headers.get("user-agent") || "";
    const method = request.method;

    // ---- ФУНКЦИИ ДЛЯ KV ----
    async function getSubscriptions() {
      try {
        const data = await env.KV.get('subscriptions', 'json');
        if (data) return data;
      } catch (e) {}
      const defaultData = {
        'default': {
          name: 'Основная',
          active: true,
          expire: null,
          createdAt: Date.now(),
          traffic: 0
        }
      };
      await env.KV.put('subscriptions', JSON.stringify(defaultData));
      return defaultData;
    }

    async function saveSubscriptions(data) {
      await env.KV.put('subscriptions', JSON.stringify(data));
    }

    const subscriptions = await getSubscriptions();

    // ---- КОНСТАНТЫ ДЛЯ ТРАФИКА ----
    const START_DATE = new Date('2026-06-28T00:00:00Z');
    const BASE_TRAFFIC_GB = 0;

    function getHourlyIncrement(date) {
      const seed = date.getFullYear() * 1000000 + (date.getMonth() + 1) * 10000 + date.getDate() * 100 + date.getHours();
      const x = Math.sin(seed) * 10000;
      const r = x - Math.floor(x);
      const dayOfYear = Math.floor((date - START_DATE) / (1000 * 60 * 60 * 24));
      const isBonusDay = (dayOfYear % 10 === 0 && dayOfYear > 0);
      const hour = date.getHours();
      
      if (isBonusDay && hour < 12) {
        return 1;
      } else if (isBonusDay && hour >= 12) {
        return Math.floor(r * 0.5) + 0.1;
      } else {
        return Math.floor(r * 0.5) + 0.1;
      }
    }

    function getCurrentTrafficGB() {
      const now = new Date();
      const diffTime = now - START_DATE;
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours <= 0) return BASE_TRAFFIC_GB;
      let total = BASE_TRAFFIC_GB;
      for (let h = 1; h <= diffHours; h++) {
        const hourDate = new Date(START_DATE.getTime() + h * 60 * 60 * 1000);
        total += getHourlyIncrement(hourDate);
      }
      return total;
    }

    // ---- ФУНКЦИЯ ДЛЯ ТРАФИКА ПОДПИСКИ (с учётом ручного сброса) ----
    function getSubscriptionTraffic(sub) {
      if (!sub) return 0;
      if (sub.traffic !== undefined) {
        return sub.traffic;
      }
      if (!sub.createdAt) return 0;
      const now = new Date();
      const diffTime = now - sub.createdAt;
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours <= 0) return 0;
      let total = 0;
      for (let h = 1; h <= diffHours; h++) {
        const hourDate = new Date(sub.createdAt.getTime() + h * 60 * 60 * 1000);
        total += getHourlyIncrement(hourDate);
      }
      return total;
    }

    // ---- СЕРВЕРЫ (6 штук) ----
    const realNodes = [
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
      },
      // НОВЫЙ СЕРВЕР: 🇳🇱 LTE #3 (Нидерланды)
      { 
        tag: "lte-3", 
        address: "city-most-5.harknmav.fun", 
        port: 443, 
        id: "a6c595e7-34e2-4762-8947-1ffd25bf99de", 
        serverName: "max.ru", 
        publicKey: "BGW71GlS7ucRWEx-tYF0n2JKvo8uBSLnKdtMMdwBNDY", 
        shortId: "88ec10761480dce4", 
        fingerprint: "qq", 
        remarks: "🇳🇱 LTE #3", 
        network: "tcp", 
        flow: "xtls-rprx-vision" 
      }
    ];

    // ---- ОСТАЛЬНОЙ КОД (админка, подписки, страницы) ----
    // ... (весь остальной код из предыдущего сообщения)
  }
};
