export default {
  async fetch(request, env, ctx) {
    // Define the JSON data
    const jsonData = [
      {
        "dns": {
          "servers": [
            "1.1.1.1",
            "1.0.0.1"
          ],
          "queryStrategy": "UseIP"
        },
        "inbounds": [
          {
            "tag": "socks",
            "port": 10808,
            "listen": "127.0.0.1",
            "protocol": "socks",
            "settings": {
              "udp": true,
              "auth": "noauth"
            },
            "sniffing": {
              "enabled": true,
              "routeOnly": false,
              "destOverride": [
                "http",
                "tls",
                "quic"
              ]
            }
          },
          {
            "tag": "http",
            "port": 10809,
            "listen": "127.0.0.1",
            "protocol": "http",
            "settings": {
              "allowTransparent": false
            },
            "sniffing": {
              "enabled": true,
              "routeOnly": false,
              "destOverride": [
                "http",
                "tls",
                "quic"
              ]
            }
          }
        ],
        "observatory": {
          "enableConcurrency": true,
          "probeInterval": "1m",
          "probeUrl": "https://www.google.com/generate_204",
          "subjectSelector": [
            "de-1"
          ]
        },
        "outbounds": [
          {
            "tag": "de-1",
            "protocol": "vless",
            "settings": {
              "vnext": [
                {
                  "address": "de-new.datanode-internal.net",
                  "port": 443,
                  "users": [
                    {
                      "id": "9d5e7e04-53e4-4d98-bb26-236c907078a5",
                      "encryption": "none",
                      "flow": "xtls-rprx-vision"
                    }
                  ]
                }
              ]
            },
            "streamSettings": {
              "network": "tcp",
              "security": "reality",
              "realitySettings": {
                "serverName": "ads.x5.ru",
                "show": false,
                "publicKey": "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
                "shortId": "abbcd128",
                "fingerprint": "qq"
              },
              "tcpSettings": {}
            }
          },
          {
            "tag": "direct",
            "protocol": "freedom"
          },
          {
            "tag": "block",
            "protocol": "blackhole"
          }
        ],
        "remarks": "🇩🇪 Германия",
        "routing": {
          "domainMatcher": "hybrid",
          "domainStrategy": "IPIfNonMatch",
          "balancers": [
            {
              "tag": "bal_de-1",
              "selector": [
                "de-1"
              ],
              "fallbackTag": "direct",
              "strategy": {
                "type": "leastLoad",
                "settings": {
                  "baselines": [
                    "4s"
                  ],
                  "costs": [
                    {
                      "match": "de-1",
                      "regexp": false,
                      "value": 1
                    }
                  ],
                  "expected": 1,
                  "maxRTT": "6s"
                }
              }
            }
          ],
          "rules": [
            {
              "type": "field",
              "protocol": [
                "bittorrent"
              ],
              "outboundTag": "block"
            },
            {
              "domain": [
                "domain:mtalk.google.com",
                "domain:push.apple.com",
                "domain:api.push.apple.com"
              ],
              "outboundTag": "direct",
              "type": "field"
            },
            {
              "ip": [
                "17.0.0.0/8"
              ],
              "outboundTag": "direct",
              "type": "field"
            },
            {
              "type": "field",
              "inboundTag": [
                "socks",
                "http"
              ],
              "network": "tcp,udp",
              "balancerTag": "bal_de-1"
            }
          ]
        }
      },
      {
        "dns": {
          "servers": [
            "1.1.1.1",
            "1.0.0.1"
          ],
          "queryStrategy": "UseIP"
        },
        "inbounds": [
          {
            "tag": "socks",
            "port": 10808,
            "listen": "127.0.0.1",
            "protocol": "socks",
            "settings": {
              "udp": true,
              "auth": "noauth"
            },
            "sniffing": {
              "enabled": true,
              "routeOnly": false,
              "destOverride": [
                "http",
                "tls",
                "quic"
              ]
            }
          },
          {
            "tag": "http",
            "port": 10809,
            "listen": "127.0.0.1",
            "protocol": "http",
            "settings": {
              "allowTransparent": false
            },
            "sniffing": {
              "enabled": true,
              "routeOnly": false,
              "destOverride": [
                "http",
                "tls",
                "quic"
              ]
            }
          }
        ],
        "observatory": {
          "enableConcurrency": true,
          "probeInterval": "1m",
          "probeUrl": "https://www.google.com/generate_204",
          "subjectSelector": [
            "se-1"
          ]
        },
        "outbounds": [
          {
            "tag": "se-1",
            "protocol": "vless",
            "settings": {
              "vnext": [
                {
                  "address": "se-new.datanode-internal.net",
                  "port": 443,
                  "users": [
                    {
                      "id": "9d5e7e04-53e4-4d98-bb26-236c907078a5",
                      "encryption": "none",
                      "flow": "xtls-rprx-vision"
                    }
                  ]
                }
              ]
            },
            "streamSettings": {
              "network": "tcp",
              "security": "reality",
              "realitySettings": {
                "serverName": "ads.x5.ru",
                "show": false,
                "publicKey": "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
                "shortId": "abbcd128",
                "fingerprint": "qq"
              },
              "tcpSettings": {}
            }
          },
          {
            "tag": "direct",
            "protocol": "freedom"
          },
          {
            "tag": "block",
            "protocol": "blackhole"
          }
        ],
        "remarks": "🇸🇪 Швеция",
        "routing": {
          "domainMatcher": "hybrid",
          "domainStrategy": "IPIfNonMatch",
          "balancers": [
            {
              "tag": "bal_se-1",
              "selector": [
                "se-1"
              ],
              "fallbackTag": "direct",
              "strategy": {
                "type": "leastLoad",
                "settings": {
                  "baselines": [
                    "4s"
                  ],
                  "costs": [
                    {
                      "match": "se-1",
                      "regexp": false,
                      "value": 1
                    }
                  ],
                  "expected": 1,
                  "maxRTT": "6s"
                }
              }
            }
          ],
          "rules": [
            {
              "type": "field",
              "protocol": [
                "bittorrent"
              ],
              "outboundTag": "block"
            },
            {
              "domain": [
                "domain:mtalk.google.com",
                "domain:push.apple.com",
                "domain:api.push.apple.com"
              ],
              "outboundTag": "direct",
              "type": "field"
            },
            {
              "ip": [
                "17.0.0.0/8"
              ],
              "outboundTag": "direct",
              "type": "field"
            },
            {
              "type": "field",
              "inboundTag": [
                "socks",
                "http"
              ],
              "network": "tcp,udp",
              "balancerTag": "bal_se-1"
            }
          ]
        }
      },
      {
        "dns": {
          "servers": [
            "1.1.1.1",
            "1.0.0.1"
          ],
          "queryStrategy": "UseIP"
        },
        "inbounds": [
          {
            "tag": "socks",
            "port": 10808,
            "listen": "127.0.0.1",
            "protocol": "socks",
            "settings": {
              "udp": true,
              "auth": "noauth"
            },
            "sniffing": {
              "enabled": true,
              "routeOnly": false,
              "destOverride": [
                "http",
                "tls",
                "quic"
              ]
            }
          },
          {
            "tag": "http",
            "port": 10809,
            "listen": "127.0.0.1",
            "protocol": "http",
            "settings": {
              "allowTransparent": false
            },
            "sniffing": {
              "enabled": true,
              "routeOnly": false,
              "destOverride": [
                "http",
                "tls",
                "quic"
              ]
            }
          }
        ],
        "observatory": {
          "enableConcurrency": true,
          "probeInterval": "1m",
          "probeUrl": "https://www.google.com/generate_204",
          "subjectSelector": [
            "pl-1"
          ]
        },
        "outbounds": [
          {
            "tag": "pl-1",
            "protocol": "vless",
            "settings": {
              "vnext": [
                {
                  "address": "pl.datanode-internal.net",
                  "port": 443,
                  "users": [
                    {
                      "id": "9d5e7e04-53e4-4d98-bb26-236c907078a5",
                      "encryption": "none",
                      "flow": "xtls-rprx-vision"
                    }
                  ]
                }
              ]
            },
            "streamSettings": {
              "network": "tcp",
              "security": "reality",
              "realitySettings": {
                "serverName": "sun9-35.userapi.com",
                "show": false,
                "publicKey": "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
                "shortId": "abbcd128",
                "fingerprint": "qq"
              },
              "tcpSettings": {}
            }
          },
          {
            "tag": "direct",
            "protocol": "freedom"
          },
          {
            "tag": "block",
            "protocol": "blackhole"
          }
        ],
        "remarks": "🇵🇱 Польша",
        "routing": {
          "domainMatcher": "hybrid",
          "domainStrategy": "IPIfNonMatch",
          "balancers": [
            {
              "tag": "bal_pl-1",
              "selector": [
                "pl-1"
              ],
              "fallbackTag": "direct",
              "strategy": {
                "type": "leastLoad",
                "settings": {
                  "baselines": [
                    "4s"
                  ],
                  "costs": [
                    {
                      "match": "pl-1",
                      "regexp": false,
                      "value": 1
                    }
                  ],
                  "expected": 1,
                  "maxRTT": "6s"
                }
              }
            }
          ],
          "rules": [
            {
              "type": "field",
              "protocol": [
                "bittorrent"
              ],
              "outboundTag": "block"
            },
            {
              "domain": [
                "domain:mtalk.google.com",
                "domain:push.apple.com",
                "domain:api.push.apple.com"
              ],
              "outboundTag": "direct",
              "type": "field"
            },
            {
              "ip": [
                "17.0.0.0/8"
              ],
              "outboundTag": "direct",
              "type": "field"
            },
            {
              "type": "field",
              "inboundTag": [
                "socks",
                "http"
              ],
              "network": "tcp,udp",
              "balancerTag": "bal_pl-1"
            }
          ]
        }
      },
      {
        "dns": {
          "servers": [
            "1.1.1.1",
            "1.0.0.1"
          ],
          "queryStrategy": "UseIP"
        },
        "inbounds": [
          {
            "tag": "socks",
            "port": 10808,
            "listen": "127.0.0.1",
            "protocol": "socks",
            "settings": {
              "udp": true,
              "auth": "noauth"
            },
            "sniffing": {
              "enabled": true,
              "routeOnly": false,
              "destOverride": [
                "http",
                "tls",
                "quic"
              ]
            }
          },
          {
            "tag": "http",
            "port": 10809,
            "listen": "127.0.0.1",
            "protocol": "http",
            "settings": {
              "allowTransparent": false
            },
            "sniffing": {
              "enabled": true,
              "routeOnly": false,
              "destOverride": [
                "http",
                "tls",
                "quic"
              ]
            }
          }
        ],
        "observatory": {
          "enableConcurrency": true,
          "probeInterval": "1m",
          "probeUrl": "https://www.google.com/generate_204",
          "subjectSelector": [
            "fi-1"
          ]
        },
        "outbounds": [
          {
            "tag": "fi-1",
            "protocol": "vless",
            "settings": {
              "vnext": [
                {
                  "address": "fi.datanode-internal.net",
                  "port": 443,
                  "users": [
                    {
                      "id": "9d5e7e04-53e4-4d98-bb26-236c907078a5",
                      "encryption": "none",
                      "flow": "xtls-rprx-vision"
                    }
                  ]
                }
              ]
            },
            "streamSettings": {
              "network": "tcp",
              "security": "reality",
              "realitySettings": {
                "serverName": "sun9-36.userapi.com",
                "show": false,
                "publicKey": "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
                "shortId": "abbcd128",
                "fingerprint": "qq"
              },
              "tcpSettings": {}
            }
          },
          {
            "tag": "direct",
            "protocol": "freedom"
          },
          {
            "tag": "block",
            "protocol": "blackhole"
          }
        ],
        "remarks": "🇫🇮 Финляндия",
        "routing": {
          "domainMatcher": "hybrid",
          "domainStrategy": "IPIfNonMatch",
          "balancers": [
            {
              "tag": "bal_fi-1",
              "selector": [
                "fi-1"
              ],
              "fallbackTag": "direct",
              "strategy": {
                "type": "leastLoad",
                "settings": {
                  "baselines": [
                    "4s"
                  ],
                  "costs": [
                    {
                      "match": "fi-1",
                      "regexp": false,
                      "value": 1
                    }
                  ],
                  "expected": 1,
                  "maxRTT": "6s"
                }
              }
            }
          ],
          "rules": [
            {
              "type": "field",
              "protocol": [
                "bittorrent"
              ],
              "outboundTag": "block"
            },
            {
              "domain": [
                "domain:mtalk.google.com",
                "domain:push.apple.com",
                "domain:api.push.apple.com"
              ],
              "outboundTag": "direct",
              "type": "field"
            },
            {
              "ip": [
                "17.0.0.0/8"
              ],
              "outboundTag": "direct",
              "type": "field"
            },
            {
              "type": "field",
              "inboundTag": [
                "socks",
                "http"
              ],
              "network": "tcp,udp",
              "balancerTag": "bal_fi-1"
            }
          ]
        }
      },
      {
        "dns": {
          "servers": [
            "1.1.1.1",
            "1.0.0.1"
          ],
          "queryStrategy": "UseIP"
        },
        "inbounds": [
          {
            "tag": "socks",
            "port": 10808,
            "listen": "127.0.0.1",
            "protocol": "socks",
            "settings": {
              "udp": true,
              "auth": "noauth"
            },
            "sniffing": {
              "enabled": true,
              "routeOnly": false,
              "destOverride": [
                "http",
                "tls",
                "quic"
              ]
            }
          },
          {
            "tag": "http",
            "port": 10809,
            "listen": "127.0.0.1",
            "protocol": "http",
            "settings": {
              "allowTransparent": false
            },
            "sniffing": {
              "enabled": true,
              "routeOnly": false,
              "destOverride": [
                "http",
                "tls",
                "quic"
              ]
            }
          }
        ],
        "observatory": {
          "enableConcurrency": true,
          "probeInterval": "1m",
          "probeUrl": "https://www.google.com/generate_204",
          "subjectSelector": [
            "ru-1"
          ]
        },
        "outbounds": [
          {
            "tag": "ru-1",
            "protocol": "vless",
            "settings": {
              "vnext": [
                {
                  "address": "ru.datanode-internal.net",
                  "port": 443,
                  "users": [
                    {
                      "id": "9d5e7e04-53e4-4d98-bb26-236c907078a5",
                      "encryption": "none",
                      "flow": "xtls-rprx-vision"
                    }
                  ]
                }
              ]
            },
            "streamSettings": {
              "network": "tcp",
              "security": "reality",
              "realitySettings": {
                "serverName": "sun9-38.userapi.com",
                "show": false,
                "publicKey": "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
                "shortId": "abbcd128",
                "fingerprint": "qq"
              },
              "tcpSettings": {}
            }
          },
          {
            "tag": "direct",
            "protocol": "freedom"
          },
          {
            "tag": "block",
            "protocol": "blackhole"
          }
        ],
        "remarks": "🇷🇺 Россия",
        "routing": {
          "domainMatcher": "hybrid",
          "domainStrategy": "IPIfNonMatch",
          "balancers": [
            {
              "tag": "bal_ru-1",
              "selector": [
                "ru-1"
              ],
              "fallbackTag": "direct",
              "strategy": {
                "type": "leastLoad",
                "settings": {
                  "baselines": [
                    "4s"
                  ],
                  "costs": [
                    {
                      "match": "ru-1",
                      "regexp": false,
                      "value": 1
                    }
                  ],
                  "expected": 1,
                  "maxRTT": "6s"
                }
              }
            }
          ],
          "rules": [
            {
              "type": "field",
              "protocol": [
                "bittorrent"
              ],
              "outboundTag": "block"
            },
            {
              "domain": [
                "domain:mtalk.google.com",
                "domain:push.apple.com",
                "domain:api.push.apple.com"
              ],
              "outboundTag": "direct",
              "type": "field"
            },
            {
              "ip": [
                "17.0.0.0/8"
              ],
              "outboundTag": "direct",
              "type": "field"
            },
            {
              "type": "field",
              "inboundTag": [
                "socks",
                "http"
              ],
              "network": "tcp,udp",
              "balancerTag": "bal_ru-1"
            }
          ]
        }
      },
      {
        "dns": {
          "servers": [
            "1.1.1.1",
            "1.0.0.1"
          ],
          "queryStrategy": "UseIP"
        },
        "inbounds": [
          {
            "tag": "socks",
            "port": 10808,
            "listen": "127.0.0.1",
            "protocol": "socks",
            "settings": {
              "udp": true,
              "auth": "noauth"
            },
            "sniffing": {
              "enabled": true,
              "routeOnly": false,
              "destOverride": [
                "http",
                "tls",
                "quic"
              ]
            }
          },
          {
            "tag": "http",
            "port": 10809,
            "listen": "127.0.0.1",
            "protocol": "http",
            "settings": {
              "allowTransparent": false
            },
            "sniffing": {
              "enabled": true,
              "routeOnly": false,
              "destOverride": [
                "http",
                "tls",
                "quic"
              ]
            }
          }
        ],
        "observatory": {
          "enableConcurrency": true,
          "probeInterval": "1m",
          "probeUrl": "https://www.google.com/generate_204",
          "subjectSelector": [
            "tr-1"
          ]
        },
        "outbounds": [
          {
            "tag": "tr-1",
            "protocol": "vless",
            "settings": {
              "vnext": [
                {
                  "address": "tr.datanode-internal.net",
                  "port": 443,
                  "users": [
                    {
                      "id": "9d5e7e04-53e4-4d98-bb26-236c907078a5",
                      "encryption": "none",
                      "flow": "xtls-rprx-vision"
                    }
                  ]
                }
              ]
            },
            "streamSettings": {
              "network": "tcp",
              "security": "reality",
              "realitySettings": {
                "serverName": "sun9-38.userapi.com",
                "show": false,
                "publicKey": "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
                "shortId": "abbcd128",
                "fingerprint": ""
              },
              "tcpSettings": {}
            }
          },
          {
            "tag": "direct",
            "protocol": "freedom"
          },
          {
            "tag": "block",
            "protocol": "blackhole"
          }
        ],
        "remarks": "🇹🇷 Турция",
        "routing": {
          "domainMatcher": "hybrid",
          "domainStrategy": "IPIfNonMatch",
          "balancers": [
            {
              "tag": "bal_tr-1",
              "selector": [
                "tr-1"
              ],
              "fallbackTag": "direct",
              "strategy": {
                "type": "leastLoad",
                "settings": {
                  "baselines": [
                    "4s"
                  ],
                  "costs": [
                    {
                      "match": "tr-1",
                      "regexp": false,
                      "value": 1
                    }
                  ],
                  "expected": 1,
                  "maxRTT": "6s"
                }
              }
            }
          ],
          "rules": [
            {
              "type": "field",
              "protocol": [
                "bittorrent"
              ],
              "outboundTag": "block"
            },
            {
              "domain": [
                "domain:mtalk.google.com",
                "domain:push.apple.com",
                "domain:api.push.apple.com"
              ],
              "outboundTag": "direct",
              "type": "field"
            },
            {
              "ip": [
                "17.0.0.0/8"
              ],
              "outboundTag": "direct",
              "type": "field"
            },
            {
              "type": "field",
              "inboundTag": [
                "socks",
                "http"
              ],
              "network": "tcp,udp",
              "balancerTag": "bal_tr-1"
            }
          ]
        }
      },
      {
        "dns": {
          "servers": [
            "1.1.1.1",
            "1.0.0.1"
          ],
          "queryStrategy": "UseIP"
        },
        "inbounds": [
          {
            "tag": "socks",
            "port": 10808,
            "listen": "127.0.0.1",
            "protocol": "socks",
            "settings": {
              "udp": true,
              "auth": "noauth"
            },
            "sniffing": {
              "enabled": true,
              "routeOnly": false,
              "destOverride": [
                "http",
                "tls",
                "quic"
              ]
            }
          },
          {
            "tag": "http",
            "port": 10809,
            "listen": "127.0.0.1",
            "protocol": "http",
            "settings": {
              "allowTransparent": false
            },
            "sniffing": {
              "enabled": true,
              "routeOnly": false,
              "destOverride": [
                "http",
                "tls",
                "quic"
              ]
            }
          }
        ],
        "observatory": {
          "enableConcurrency": true,
          "probeInterval": "1m",
          "probeUrl": "https://www.google.com/generate_204",
          "subjectSelector": [
            "mobile-1"
          ]
        },
        "outbounds": [
          {
            "tag": "mobile-1",
            "protocol": "vless",
            "settings": {
              "vnext": [
                {
                  "address": "de-new.datanode-internal.net",
                  "port": 443,
                  "users": [
                    {
                      "id": "9d5e7e04-53e4-4d98-bb26-236c907078a5",
                      "encryption": "none",
                      "flow": "xtls-rprx-vision"
                    }
                  ]
                }
              ]
            },
            "streamSettings": {
              "network": "tcp",
              "security": "reality",
              "realitySettings": {
                "serverName": "ads.x5.ru",
                "show": false,
                "publicKey": "r6lN34m1nN-xQZ458j5NPD5xJ3_QBF2bGzY4KJEo4ic",
                "shortId": "abbcd128",
                "fingerprint": "qq"
              },
              "tcpSettings": {}
            }
          },
          {
            "tag": "direct",
            "protocol": "freedom"
          },
          {
            "tag": "block",
            "protocol": "blackhole"
          }
        ],
        "remarks": "🇩🇪 Мобильная связь #1",
        "routing": {
          "domainMatcher": "hybrid",
          "domainStrategy": "IPIfNonMatch",
          "balancers": [
            {
              "tag": "bal_mobile-1",
              "selector": [
                "mobile-1"
              ],
              "fallbackTag": "direct",
              "strategy": {
                "type": "leastLoad",
                "settings": {
                  "baselines": [
                    "4s"
                  ],
                  "costs": [
                    {
                      "match": "mobile-1",
                      "regexp": false,
                      "value": 1
                    }
                  ],
                  "expected": 1,
                  "maxRTT": "6s"
                }
              }
            }
          ],
          "rules": [
            {
              "type": "field",
              "protocol": [
                "bittorrent"
              ],
              "outboundTag": "block"
            },
            {
              "domain": [
                "domain:mtalk.google.com",
                "domain:push.apple.com",
                "domain:api.push.apple.com"
              ],
              "outboundTag": "direct",
              "type": "field"
            },
            {
              "ip": [
                "17.0.0.0/8"
              ],
              "outboundTag": "direct",
              "type": "field"
            },
            {
              "type": "field",
              "inboundTag": [
                "socks",
                "http"
              ],
              "network": "tcp,udp",
              "balancerTag": "bal_mobile-1"
            }
          ]
        }
      }
    ];

    // Return the JSON response
    return new Response(JSON.stringify(jsonData, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
};
