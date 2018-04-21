const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const sendError = (res) => {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end(typeof err === 'string' ? err : err.toString());
};

proxy.on('error', (err, req, res) => (sendError(res)));

const server = http.createServer((req, res) => {
  const { host } = req.headers;

  if (!host) return sendError(res);

  const subdomain = host.substring(0, host.indexOf('.digituz.com.br'));
  proxy.web(req, res, { target: `http://${subdomain}` });
});

server.listen(3000, () => {
  console.log('Ok, proxy is up & running.');
});
