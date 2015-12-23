var config = require('./config');
var logger = require('log4js').getLogger('main');

logger.info("Starting...");
require('amqplib/callback_api').connect(config.amqp.url, function(err, conn) {
    if (err)
        logger.error(err);
    else
        require('./lib/api')(conn, config.apis);
});
