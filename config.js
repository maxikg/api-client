module.exports = {
    amqp: {
        url: process.env['AMQP_URL'] || 'amqp://localhost/api'
    },
    apis: [
        require('./lib/api/hypixel')({ api_key: process.env['HYPIXEL_KEY'], queue: process.env['HYPIXEL_QUEUE'] || 'requests_hypixel' }),
        require('./lib/api/minecraft-uuid')({ queue: process.env['MOJANG_UUID_QUEUE'] || 'requests_mojang_uuid' })
    ]
};
