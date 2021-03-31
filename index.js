const config = require("config");
const httpProxy = require('http-proxy');
const { LoggerFactory } = require("motifer");
const { host, port } = config.get("target");

const Logger = new LoggerFactory("router", "debug");
const logger = Logger.getLogger(__filename);

const proxy = httpProxy.createProxyServer({
    target: {
        host, port
    }
});

proxy.on('error', (err, req, res) => {
    logger.error("Error in http proxy.", err);
    // Send the response.
    let response = { status: false, message: "Something went wrong." };
    res.writeHead(500, {
        'Content-Type': 'application/json'
    });

    res.end(response);
});

proxy.on('close', (res, socket, head) => {
    // view disconnected websocket connections
    logger.info('Http proxy client disconnected.');
});

proxy.listen(8080);