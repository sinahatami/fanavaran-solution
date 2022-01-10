var url = require('url');
var https = require('https');
var HttpsProxyAgent = require('https-proxy-agent');

var proxyConfig = [
  {
    context: [
      '/api',
      '/odata',
      '/signalr',
      '/InvokeLogin',
      '/InvokeLogout',
      '/Metadata',
      '/Files',
      '/SignIn',
      '/SignOut',
      '/ClientAppProfile',
      '/core',
      '/jobs'
    ],
    target: 'https://localhost:44305/Bime',
    // target: 'https://eit-product/karwebappapi',
    secure: false,
    changeOrigin: true
  }
];

function setupForCorporateProxy(proxyConfig) {
  var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  if (proxyServer) {
    agent = new HttpsProxyAgent(proxyServer);
    console.log('Using corporate proxy server: ' + proxyServer);

    proxyConfig.forEach(function(entry) {
      entry.agent = agent;
    });
  }
  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
