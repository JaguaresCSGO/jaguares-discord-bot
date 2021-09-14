const Discord = require('discord.js');
const config = require("./config.json");

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES'] });
var httpRequest = require('./app/Jaguares/JaguaresApiHandle.js');


client.on("message", async (msg) => {

    if (msg.content === "ping") {
        msg.reply('Pong');
    }

    if (msg.content === "role") {

        var request = new httpRequest();

        request.request_call.then((response) => {

            var vipRole = msg.guild.roles.cache.get('885259729025261678').members.map(p => p.user.id);

            var fromApi = response;
            var fromDiscord = vipRole;

            var toAddVip = giveNewVips(fromApi, fromDiscord);
            var toRemoveVip = giveMeToRemoveVips(fromApi, fromDiscord)

            msg.reply("Lista de comandos para ADD Vips identificados:")
            toAddVip.forEach(userId => {
                msg.reply("j/addrole 885259729025261678 " + userId)

            });

            msg.reply("Lista de comandos para remover antigos VIPS:")
            toRemoveVip.forEach(userId => {
                msg.reply("j/help removerole 885259729025261678 " + userId)
            });



        }).catch((error) => {
            console.log(error);
        });



    }

    if (msg.content === "updatevip") {
        var vipRole = msg.guild.roles.cache.get('885259729025261678').members.map(p => p.user.id);



        vipRole.forEach(vip => {
            console.log(vip)
        });
    }

});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(config.BOT_TOKEN);

function giveNewVips(fromApi, fromDiscord) {
    return fromApi.filter(n1 => !fromDiscord.includes(n1))
}

function giveMeToRemoveVips(fromApi, fromDiscord) {
    return fromDiscord.filter(n1 => !fromApi.includes(n1))
}

request_user = new Promise((resolve) => {
    resolve(async id => client.users.fetch(toAddVipUnit))
});