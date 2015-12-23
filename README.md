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

## ToDo

 * Support Mojang Profiles API (for querying player names by their UUIDs)