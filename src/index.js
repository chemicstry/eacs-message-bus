var commandLineArgs = require('command-line-args');
var commandLineUsage = require('command-line-usage');
var EACSSocket = require('eacs-socket');
var fs = require('fs');
var Log = require('./Log');
var RPC = require('modular-json-rpc');
var optionDefinitions = require('./options');
var aedes = require('aedes');
var net = require('net');
var path = require('path');
var util = require('util');

// Options
const options = commandLineArgs(optionDefinitions);

// Print usage
if (options.help)
{
    const sections = [
        {
            header: 'eacs-user-auth',
            content: 'Extensible Access Control System. User Authentication Module.'
        },
        {
            header: 'Options',
            optionList: optionDefinitions
        }
    ];

    console.log(commandLineUsage(sections));
    process.exit();
}

// setup mqtt broker
var broker = aedes();
var brokersrv = net.createServer(broker.handle);
brokersrv.listen(options.mqttport, function() {
    Log.info('MQTT broker up.');
});

// Load JWT public key
const jwtPublicKey = fs.readFileSync(options.jwtPublicKey, "utf8");

// Setup EACSSocket (websockets with JWT auth)
const socket = new EACSSocket.EACSSocket({
    host: options.host,
    port: options.port,
    jwtPubKey: jwtPublicKey
});

socket.on('connection', (ws, req) => {
    let token = req.token;

    Log.info(`index: New connection from ${req.connection.remoteAddress}. Identifier: ${token.identifier}`);

    // Create RPC transport over websocket
    let transport = new RPC.WSTransport(ws);

    // Create bidirectional RPC connection
    let node = new RPC.RPCNode(transport);

    // Handle error
    node.on('error', (e) => {
        Log.error("Internal JSONRPC Error", e);
    });
    ws.on('error', (e) => {
        Log.error("WebSocket Error", e);
    });

    node.bind("publish", (topic, message) => {
        // Check if topic format is valid
        if (!topic.match(/^([A-Za-z/]*)$/))
            throw new RPC.RPCMethodError(0, 'Invalid topic format');

        let fullTopic = path.posix.join('devices', token.identifier, topic);

        let packet = {
            topic: fullTopic,
            payload: message
        };

        // Publish message
        Log.debug(`index: RPC publish: \n${util.inspect(packet)}`);
        broker.publish(packet);
    })
});

process.on('unhandledRejection', (reason, promise) => {
    Log.error("Unhandled promise rejection", {reason, promise});
});
