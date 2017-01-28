const http = require('http');
const spawn = require('child_process').spawn;

const PHP_PORT = Number(process.env.PORT) + 1;

const _eval = require('node-eval');
const morgan = require('morgan');
const finalhandler = require('finalhandler');
const httpProxy = require('http-proxy');
const httpProxyMitm = require('http-proxy-mitm');

const templates = require('bem-components-dist/desktop/bem-components.bemhtml').BEMHTML;
const templator = require('bem-xjst').bemhtml;

// Create a proxy server with custom application logic
const proxy = httpProxy.createProxyServer({
    headers: { 'X-Proxied-By': 'bem-proxy' },
    target: 'http://localhost:' + PHP_PORT
});

// Apply templates on `x-content-type: x-bemjson`
proxy.on('proxyRes', httpProxyMitm([{
    condition: (pRes) => (pRes.statusCode === 200 && pRes.headers['x-content-type'] === 'application/x-bemjson'),
    bodyTransform: function(body) {
        try {
            return templates.apply(JSON.parse(body));
        } catch (e) {
            console.error(e);
            return e.stack + '<br>' + body;
        }
    }
}, {
    condition: (pRes) => (pRes.statusCode === 200 && pRes.headers['x-content-type'] === 'application/x-bemjson-inline'),
    bodyTransform: function(body) {
        const additionalTemplates = [];
        if (body.indexOf(/\u0008/)) {
            body = body.split(/\u0008/g).map(function(v, i) {
                return !(i % 2) ? v : (additionalTemplates.push(v), false);
            }).filter(Boolean).join('');
        }
        const tmpls = !additionalTemplates.length ? templates : templator.compile(additionalTemplates.join(''));

        var res = body.split(/\u0007/g);
        for (var i = 0; i < res.length; i += 2) {
            if (!res[i + 1]) continue;
            try {
                var bemjson = res[i + 1][0] === '{' ? JSON.parse(res[i + 1]) : _eval(res[i + 1]);
                res[i + 1] = tmpls.apply(bemjson);
            } catch (e) {
                console.error(e.stack);
                res[i + 1] = '<pre>' + e.stack + '</pre>';
            }
        }
        return res.join('');
    }
}]));

const logger = morgan('combined');

// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
const server = http.createServer(function(req, res) {
    logger(req, res, (err) => {
        if (err) {
            console.error(err);
            return finalhandler(req, res)(err);
        }
    });

    proxy.web(req, res, {}, e => {
        console.error(e);
    });
});

server.listen(process.env.PORT, () => {
    console.log('Proxy server listening on ', server.address());
});

// Starting right here because of heroku specifics
//#php: env NODE_PORT=55276 node server.js
//apache: env PORT=55276 vendor/bin/heroku-php-nginx web/
const child = spawn('vendor/bin/heroku-php-nginx',
    ['web/'],
    {
        stdio: 'inherit',
        env: Object.assign({}, process.env, { PORT: PHP_PORT })
    }
);

child.on('error', function(e) {
    console.log(e);
    process.exit(1);
});
