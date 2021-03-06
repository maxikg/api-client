var request = require('request');
var logger = require('log4js').getLogger('hypixel_api');

module.exports = function(config) {
    config.interval = config.interval || 500;
    config.queue = config.queue || 'requests_hypixel';
    config.message_options = config.message_options || {};
    if (!config.api_key)
        throw new Error('No api_key specified.');

    return function(conn, cb) {
        conn.createChannel(function(err, channel) {
            if (err) {
                cb(err);
                return;
            }

            setInterval(function() {
                channel.assertQueue(config.queue);
                channel.get(config.queue, {}, function(err, msg) {
                    if (msg !== false) {
                        var requestContent = msg.content.toString();
                        var parsedRequest;
                        try {
                            parsedRequest = JSON.parse(requestContent);
                        } catch (e) {
                            channel.ack(msg);
                            logger.error('Invalid json request: ' + requestContent);
                            return;
                        }

                        parsedRequest.parameters = parsedRequest.parameters || {};
                        if (!parsedRequest.parameters.key)
                            parsedRequest.parameters.key = config.api_key;

                        logger.info('Requesting ' + parsedRequest.method + '...');
                        var requestStart = Date.now();
                        request({
                            url: 'https://api.hypixel.net/' + parsedRequest.method,
                            qs: parsedRequest.parameters
                        }, function(err, response, body) {
                            if (err) {
                                channel.reject(msg, true);
                                logger.error(err);
                            } else if (response.statusCode >= 400) {
                                channel.reject(msg, true);
                                logger.error('Invalid response code: ' + response.statusCode);
                            } else {
                                channel.ack(msg);
                                var end = Date.now();
                                var parsedResponse;
                                try {
                                    parsedResponse = JSON.parse(body);
                                } catch (e) {
                                    logger.error('Invalid json response: ' + body);
                                    return;
                                }

                                if (parsedResponse['success'] && parsedRequest['respond']) {
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
                    }
                })
            }, config.interval);

            cb();
        });
    }
};
