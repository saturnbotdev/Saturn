module.exports = (client, message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(client.Config.Prefix) !== 0) return;
    if (message.channel.type == "dm" || message.channel.type == "group") return;

    const Arguments = message.content.slice(client.Config.Prefix.length).trim().split(/ +/g);
    const Command = Arguments.shift().toLowerCase();

    const Cmd = client.Commands.get(Command);
    if (!Cmd) return;

    Cmd.run(client, message, Arguments);
}