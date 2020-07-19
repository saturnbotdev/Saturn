const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
    var heapUsed = process.memoryUsage().heapUsed;
    var MBUsed = heapUsed / 1024 / 1024;
    var percentage = heapUsed / process.memoryUsage().heapTotal * 100;

    const Embed = new Discord.MessageEmbed()
    .setColor("#ff8336")
    .setTitle("Saturn Statistics")
    .setDescription("Statistics about Saturn!")
    .addField("Heap Usage:", `${MBUsed.toFixed(2)}MB`, true)
    .addField("Percentage Used:", `${percentage.toFixed(2)}%`, true)
    .addField("Bot Libraries:", "discord.js")
    .addField("Creators:", "Bot Developer: TheEpicPenguin13\nDatabase Manager: AaronBlossoms");
    message.channel.send(Embed);
}

module.exports.config = {
    name: "statistics",
    aliases: ["stats", "stat"],
    module: "general",
    usage: "s!statistics",
    description: "Gives statistics about the bot itself."
}
