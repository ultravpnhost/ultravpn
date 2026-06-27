export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const wantsHtml = url.searchParams.get("html") === "1";

    const profileTitle = "Ultra VPN Plus";
    const announceStr = "Ultra VPN Plus — стабильное и быстрое подключение без ограничений.";
    
    // Твои данные, преобразованные в ссылки (стандарт для подписок)
    const configs = [
      { id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", addr: "de-new.datanode-internal.net", port: 443, sni: "ads.x5.ru", remark: "🇩🇪 Германия⚡" },
      { id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", addr: "se-new.datanode-internal.net", port: 443, sni: "ads.x5.ru", remark: "🇸🇪 Швеция⚡" },
      { id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", addr: "pl.datanode-internal.net", port: 443, sni: "sun9-35.userapi.com", remark: "🇵🇱 Польша" },
      { id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", addr: "ru.datanode-internal.net", port: 443, sni: "sun9-38.userapi.com", remark: "🇷🇺 Россия" },
      { id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", addr: "hole3.datanode-internal.net", port: 9443, sni: "ads.x5.ru", remark: "🇩🇪 LTE #1" }
    ];

    const vlessLinks = configs.map(c => 
      `vless://${c.id}@${c.addr}:${c.port}?encryption=none&flow=xtls-rprx-vision&security=reality&sni=${c.sni}&fp=qq&pbk=r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic&sid=abbcd128#${encodeURIComponent(c.remark)}`
    ).join("\n");

    // ВЕБ-ИНТЕРФЕЙС
    if (wantsHtml) {
      const html = `<html><body style="background:#0d1117;color:#fff;font-family:sans-serif;padding:20px;">
        <h1>${profileTitle}</h1>
        <p>${announceStr}</p>
        <div style="background:#161b22;padding:15px;border-radius:8px;">
          Статистика: 357 GB из 5 TB
        </div>
      </body></html>`;
      return new Response(html, { headers: { "Content-Type": "text/html" } });
    }

    // ПОДПИСКА (стандартная)
    const headers = new Headers();
    headers.set("Content-Type", "text/plain; charset=utf-8");
    headers.set("profile-title", btoa(profileTitle));
    headers.set("profile-notice", announceStr);
    headers.set("subscription-userinfo", "upload=0; download=383331401728; total=5497558138880; expire=1899589200");
    
    return new Response(vlessLinks, { headers });
  }
};
