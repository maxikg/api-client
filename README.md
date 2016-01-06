# ApiClient

This small daemon can query APIs based on AMQP messages and push the result into a queue.

Designed to work especially with APIs which have time interval quotas, like Hypixel API (60 requests/min).

## Example

Examples can be found here: [Example Requests](https://github.com/maxikg/api-client/wiki/Example-Requests).

## Installation

There are two ways to use this software: 

### Manual way

Node.js >= 10.0.0 and npm is required to be installed. Furthermore a RabbitMQ instance is required.

 1. Clone this repository: `git clone https://github.com/maxikg/api-client.git`
 2. cd into the cloned repository: `cd api-client`
 3. Install npm dependencies: `npm install`
 4. Configure (modify `config.js` or use environment variables as they are used in config.js)

To run this software just type: `node index.js`.

For production use you should take a look at [PM2](https://github.com/Unitech/pm2).

### Using docker

This app ships with a Docker image which you can use to run this app. Please install Docker and follow the
instructions:

 1. Clone this repository: `git clone https://github.com/maxikg/api-client.git`
 2. cd into the cloned repository: `cd api-client`
 3. Build Docker image: `docker build -t maxikg/api-client .`

Now you can run this software by using the `docker` command:

```
docker run -e "AMQP_URL=<amqp-url>" \
           -e "HYPIXEL_KEY=<hypixel-api-key>" \
           -e "HYPIXEL_QUEUE=<hypixel-queue-name>" \
           -e "MOJANG_UUID_QUEUE=<mojang-uuid-queue-name>" \
           --restart=on-failure \
           -d maxikg/api-client
```

In this case some environment variables are configured as well as the restart policy. 