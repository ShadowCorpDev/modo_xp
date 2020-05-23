const Discord = require('discord.js');
const Client = new Discord.Client();
const fs = require('fs');
const Canvas = require('canvas');
const Snekfetch = require('snekfetch');
var prefix = "*";

Client.login(process.env.TOKEN);

Client.on('ready', () => {
    console.log("I'm ready !!!");
    Client.user.setActivity('you', { type: 'WATCHING' })

    Client.channels.cache.get('712984576473169960').messages.fetch()
})

