var winston = require('winston');

const Log = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'debug'
        }),
    ]
});

module.exports = Log;
