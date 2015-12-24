# ApiClient

This small daemon can query APIs based on AMQP messages and push the result into a queue.

Designed to work especially with APIs which have time interval quotas, like Hypixel API (60 requests/min).

## Example

Examples can be found here: [Example Requests](https://github.com/maxikg/api-client/wiki/Example-Requests).

## Installation

Node.js >= 10.0.0 and npm is required to be installed. Furthermore a RabbitMQ instance is required.

 1. Clone this repository: `git clone https://github.com/maxikg/api-client.git`
 2. cd into the cloned repository: `cd api-client`
 3. Install npm dependencies: `npm install`
 4. Configure (modify `config.js` or use environment variables as they are used in config.js)

## Usage

Since the software should be already configured during the installation process you only have to type:

`node index.js`

After the software is started something like `1/1 APIs started successfully` should be displayed.

For production use you should take a look at [PM2](https://github.com/Unitech/pm2).
