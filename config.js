module.exports = {
    amqp: {
        url: process.env['AMQP_URL'] || 'amqp://localhost/api'
    },
    apis: [
        require('./lib/api/hypixel')({ api_key: process.env['HYPIXEL_KEY'] })
    ]
};
