const Discord = require("discord.js");
const Roblox = require("noblox.js");
const FileSystem = require("fs");
const Enmap = require("enmap");

const Secret = require("./secret.json");
const Config = require("./config.json")

const Client = new Discord.Client();
Client.Token = Secret.Token;
Client.Config = Config;

async function run() {
    await Roblox.setCookie(Secret.RobloxToken);
    Client.Roblox = Roblox;
}
run();

FileSystem.readdir("./Events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const Event = require(`./Events/${file}`);
        let eventName = file.split(".")[0];
        Client.on(eventName, Event.bind(null, Client));
    });
});

Client.Commands = new Enmap();
Client.Config.Modules.forEach(module => {
    FileSystem.readdir(`./Commands/${module}`, (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            const Command = require(`./Commands/${module}/${file}`);
            let commandName = file.split(".")[0];
            Client.Commands.set(commandName, Command);
            console.log(`[LOADED] Loaded Command ${commandName}.`);
        });
    });
    console.log(`[LOADED] Loaded Module ${module}`);
});


Client.login(Client.Token);