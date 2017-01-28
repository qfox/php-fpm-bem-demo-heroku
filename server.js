const http = require('http');

// -----------------------------------------------------------------------------
// Apache emulation below:

const server2 = http.createServer(function(req, res) {
    switch (req.url) {
        case '/':
        case '/index.html':
            res.writeHead('200', { 'Content-Type': 'text/html' });
            res.write(`<html><body><h1>It's a title</h1><p>Pure HTML`);
            break;
        case '/bem.html':
            res.writeHead('200', { 'Content-Type': 'text/html', 'X-Content-Type': 'application/x-bemjson' });
            res.write(JSON.stringify([
                '<html><body>',
                { tag: 'h1', content: `It's a title BRAH` },
                { tag: 'p', content: 'BEMJSON' }
            ]));
            break;
        default:
            res.writeHead('404', { 'Content-Type': 'text/html' });
            res.write(`<html><body><h1>Not found</h1><p>Supported pages: /index.html, /bem.bemjson.js, /bem.html`);
    }
    res.end();
});

server2.listen(process.env.NODE_PORT, () => console.log('Listening php-emulation server on ', server2.address()));
