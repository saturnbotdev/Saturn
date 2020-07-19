const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
    const Embed = new Discord.MessageEmbed()
    .setColor("#ff8336");
    switch (args.length) {
        case 0: {
            Embed.setTitle("help | Command List")
            .setDescription("All the current commands in Saturn.");
            client.Commands.forEach(command => {
                if (command.config.name == "help") return;
                Embed.addField(`${command.config.name}`, `${command.config.description}`);
            });
            message.channel.send(Embed);
            break;
        }
        case 1: {
            if (client.Commands.has(args[0])) {
                let com = client.Commands.get(args[0]);
                Embed.setTitle(`help | ${args[0]}`)
                .setDescription(`${com.config.description}`)
                .addField("Module:", `${com.config.module}`)
                .addField("Usage:", `${com.config.usage}`);
                if (com.config.aliases.length > 0) {
                    let aliasList = "";
                    for (let i = 0; i < com.config.aliases.length; i++) {
                        if (i == com.config.aliases.length - 1) {
                            aliasList += com.config.aliases[i];
                            break;
                        }
                        aliasList += com.config.aliases[i] + ", ";
                    }
                    Embed.addField("Aliases:", `${aliasList}`);
                }
                else {
                    Embed.addField("Aliases:", "None");
                }
                message.channel.send(Embed);
            }
            else {
                const FailEmbed = new Discord.MessageEmbed()
                .setColor("#ff4a4a")
                .setTitle("Error")
                .setDescription("Uh Oh! Looks Like Saturn Encountered A Problem!")
                .addField("Description:", "The Command You Tried To Look Up Doesn't Exist!");
                message.channel.send(FailEmbed);
            }
            
            break;
        }
        default: {
            var usage = client.Commands.get("help").config.usage;
            Embed.setTitle("help | Usage")
            .setDescription(`Usage: ${usage}`);
            message.channel.send(Embed);
        }
    }
}

module.exports.config = {
    name: "help",
    aliases: ["h"],
    module: "general",
    usage: "s!help <command>",
    description: "Lists all the commmands if no command is specified or specific information about the given command."
}