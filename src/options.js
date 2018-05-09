module.exports = [
    {
        name: 'port',
        alias: 'p',
        type: Number,
        defaultValue: 3002,
        description: 'Port number of websocket'
    },
    {
        name: 'host',
        alias: 'h',
        type: String,
        defaultValue: '::',
        description: 'Host (IP) of websocket'
    },
    {
        name: 'mqttport',
        type: Number,
        defaultValue: 1883,
        description: 'Port number of MQTT broker'
    },
    {
        name: 'mqtthost',
        type: String,
        defaultValue: '::',
        description: 'Host (IP) of MQTT broker'
    },
    {
        name: 'jwtPublicKey',
        type: String,
        defaultValue: 'jwt.pem',
        description: 'Public key (in PEM format) used for JWT verification'
    },
    {
        name: 'help',
        type: Boolean,
        description: 'Prints usage information'
    }
];
