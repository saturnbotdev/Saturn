module.exports.run = (client, message, args) => {
    message.channel.send("Pinging...").then((m => {
        let ping = m.createdTimestamp - message.createdTimestamp;
        m.edit(`Bot Latency: **${ping} ms**\nAPI Latency: **${client.ws.ping} ms**`);
    }));
}

module.exports.config = {
    name: "ping",
    aliases: [],
    module: "general",
    usage: "s!ping",
    description: "Receives the client and API ping."
}
