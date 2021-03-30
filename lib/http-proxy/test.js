const http = require('http');
const httpProxy = require('http-proxy');

// Create your proxy server and set the target in the options.
const proxy = httpProxy.createProxyServer({ target: 'http://localhost:9000' }).listen(8000);
proxy.on('error', (err, req, res) => {
    console.log("Error in http proxy.", err);
    // Send the response.
    let response = { status: false, message: "Something went wrong." };
    res.writeHead(500, {
        'Content-Type': 'application/json'
    });

    res.end(response);
});

// Create your target server
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
}).listen(9000);