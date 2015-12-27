var request = require('request');
var logger = require('log4js').getLogger('minecraft_uuid_api');

module.exports = function(config) {
    config = config || {};
    config.interval = config.interval || 1000;
    config.queue = config.queue || 'requests_mojang_uuid';
    config.max_concurrent_requests = config.max_concurrent_requests || 1;
    config.message_options = config.message_options || {};

    return function(conn, cb) {
        conn.createChannel(function(err, channel) {
            if (err) {
                cb(err);
                return;
            }

            channel.prefetch(config.max_concurrent_requests, true);
            channel.assertQueue(config.queue);
            channel.consume(config.queue, function(msg) {
                var content = msg.content.toString();
                var parsedRequest;
                try {
                    parsedRequest = JSON.parse(content);
                } catch (e) {
                    logger.error('Malformed json request: ' + content);
                    return;
                }

                logger.info('Requesting uuid ' + parsedRequest['uuid'] + '...');
                var requestStart = Date.now();
                request({
                    url: 'https://sessionserver.mojang.com/session/minecraft/profile/' + parsedRequest['uuid']
                }, function(err, response, body) {
                    channel.ack(msg);
                    if (err) {
                        logger.error(err);
                    } else if (response.statusCode >= 400) {
                        logger.error('Invalid response code: ' + response.statusCode);
                    } else {
                        var end = Date.now();
                        var parsedResponse;
                        try {
                            parsedResponse = JSON.parse(body);
                        } catch (e) {
                            logger.error('Invalid json response: ' + body);
                            return;
                        }

                        if (parsedRequest['respond']) {
                            var queueResponse = new Buffer(JSON.stringify({
                                source: config.queue,
                                request_start: requestStart,
                                request_end: end,
                                request: parsedRequest,
                                response: parsedResponse
                            }));

                            channel.assertQueue(parsedRequest['respond']);
                            channel.sendToQueue(parsedRequest['respond'], queueResponse, config.message_options);
                        }
                    }
                });
            });

            cb();
        });
    };
};