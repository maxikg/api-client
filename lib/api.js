var Q = require('q');
var logger = require('log4js').getLogger('api');

module.exports = function(conn, apis) {
    Q.allSettled(apis.map(function(api) { return Q.nfcall(api, conn); }))
        .then(function(result) {
            var success = 0;
            result.forEach(function(result) {
                if (result.state !== 'fulfilled')
                    logger.error('Error while starting up api.', result.reason);
                else
                    success++;
            });
            logger.info(success + '/' + result.length + ' APIs started successfully.');
        });
};
