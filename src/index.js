const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  try {
    const { host } = req.headers;
    const subdomain = host.substring(0, host.indexOf('.digituz.com.br'));
    proxy.web(req, res, { target: `http://${subdomain}` });
  } catch (error) {
    res.status(404).send(error);
  }
});

server.listen(3000, () => {
  console.log('Ok, proxy is up & running.');
});
