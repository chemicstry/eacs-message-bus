module.exports = [
    {
        name: 'port',
        alias: 'p',
        type: Number,
        defaultValue: 3000,
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
        name: 'tls_cert',
        type: String,
        defaultValue: 'tls_cert.pem',
        description: 'TLS certificate file (leave blank to disable TLS)'
    },
    {
        name: 'tls_key',
        type: String,
        defaultValue: 'tls_key.pem',
        description: 'TLS key file'
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
