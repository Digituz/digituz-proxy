const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end(err);
});

const server = http.createServer((req, res) => {
  const { host } = req.headers;
  const subdomain = host.substring(0, host.indexOf('.digituz.com.br'));
  proxy.web(req, res, { target: `http://${subdomain}` });
});

server.listen(3000, () => {
  console.log('Ok, proxy is up & running.');
});
