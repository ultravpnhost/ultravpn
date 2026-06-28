export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const accept = request.headers.get("Accept") || "";
    const userAgent = request.headers.get("user-agent") || "";

    // ---- Реальные серверы ----
    const nodes = [
      { tag: "de-1", address: "de-new.datanode-internal.net", port: 443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "ads.x5.ru", publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", shortId: "abbcd128", fingerprint: "qq", remarks: "🇩🇪 Германия", network: "tcp", flow: "xtls-rprx-vision" },
      { tag: "se-1", address: "se-new.datanode-internal.net", port: 443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "ads.x5.ru", publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", shortId: "abbcd128", fingerprint: "qq", remarks: "🇸🇪 Швеция", network: "tcp", flow: "xtls-rprx-vision" },
      { tag: "pl-1", address: "pl.datanode-internal.net", port: 443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "sun9-35.userapi.com", publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", shortId: "abbcd128", fingerprint: "qq", remarks: "🇵🇱 Польша", network: "tcp", flow: "xtls-rprx-vision" },
      { tag: "ru-1", address: "ru.datanode-internal.net", port: 443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "sun9-38.userapi.com", publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", shortId: "abbcd128", fingerprint: "qq", remarks: "🇷🇺 Россия", network: "tcp", flow: "xtls-rprx-vision" },
      { tag: "lte-1", address: "hole-nn.datanode-internal.net", port: 443, id: "9d5e7e04-53e4-4d98-bb26-236c907078a5", serverName: "ads.x5.ru", publicKey: "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic", shortId: "abbcd128", fingerprint: "qq", remarks: "🇩🇪 LTE #1", network: "grpc", flow: "", grpcServiceName: "ads.x5.ru" }
    ];

    function makeOutbound(n) {
      const outbound = {
        tag: n.tag,
        protocol: "vless",
        settings: {
          vnext: [{
            address: n.address,
            port: n.port,
            users: [{ id: n.id, encryption: "none" }]
          }]
        },
        streamSettings: {
          network: n.network,
          security: "reality",
          realitySettings: {
            serverName: n.serverName,
            show: false,
            publicKey: n.publicKey,
            shortId: n.shortId,
            fingerprint: n.fingerprint
          }
        }
      };
      if (n.flow) outbound.settings.vnext[0].users[0].flow = n.flow;
      if (n.network === "grpc") {
        outbound.streamSettings.grpcSettings = { serviceName: n.grpcServiceName || "" };
      } else {
        outbound.streamSettings.tcpSettings = {};
      }
      return outbound;
    }

    function makeFullConfig(node) {
      const outbound = makeOutbound(node);
      return {
        dns: { servers: ["1.1.1.1", "1.0.0.1"], queryStrategy: "UseIP" },
        inbounds: [
          { tag: "socks", port: 10808, listen: "127.0.0.1", protocol: "socks", settings: { udp: true, auth: "noauth" }, sniffing: { enabled: true, routeOnly: false, destOverride: ["http", "tls", "quic"] } },
          { tag: "http", port: 10809, listen: "127.0.0.1", protocol: "http", settings: { allowTransparent: false }, sniffing: { enabled: true, routeOnly: false, destOverride: ["http", "tls", "quic"] } }
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
          balancers: [{
            tag: "bal_" + node.tag,
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
          }],
          rules: [
            { type: "field", protocol: ["bittorrent"], outboundTag: "block" },
            { domain: ["domain:mtalk.google.com", "domain:push.apple.com", "domain:api.push.apple.com"], outboundTag: "direct", type: "field" },
            { ip: ["17.0.0.0/8"], outboundTag: "direct", type: "field" },
            { type: "field", inboundTag: ["socks", "http"], network: "tcp,udp", balancerTag: "bal_" + node.tag }
          ]
        }
      };
    }

    // Отдаём JSON
    const configs = nodes.map(function(n) { return makeFullConfig(n); });
    
    return new Response(JSON.stringify(configs, null, 2), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Profile-Title": "Ultra VPN Plus",
        "Subscription-Status": "active",
        "Subscription-Traffic": "876 GB / ∞",
        "Subscription-Expire": "1899589200",
        "subscription-userinfo": "upload=0; download=876000000000; total=0; expire=1899589200"
      }
    });
  }
};
