const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const sendError = (res, error) => {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  console.log('Sending error');
  console.log(error);
  res.end(typeof error === 'string' ? error : error.toString());
};

proxy.on('error', (err, req, res) => (sendError(res, err)));

const server = http.createServer((req, res) => {
  const { host } = req.headers;

  if (!host) return sendError(res, 'not found');

  const subdomain = host.substring(0, host.indexOf('.digituz.com.br'));
  proxy.web(req, res, { target: `http://${subdomain}` });
});

server.listen(3000, () => {
  console.log('Ok, proxy is up & running.');
});
