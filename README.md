# ApiClient

This small daemon can query APIs based on AMQP messages and push the result into a queue.

Designed to work especially with APIs which have time interval quotas, like Hypixel API (60 requests/min).

## Example

The following json can be inserted into queue for Hypixel API query:

```json
{
    "method": "friends",
    "parameters": {
        "uuid": "952d258fc0fa49df844e745131367a98"
    },
    "respond": "responses"
}
```

Getting the friends for the player with the uuid `952d258f-c0fa-49df-844e-745131367a98` and pushes the result to the
queue `responses`.

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

## ToDo

 * Support Mojang Profiles API (for querying player names by their UUIDs)