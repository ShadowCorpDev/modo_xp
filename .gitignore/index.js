const Discord = require('discord.js');
const Client = new Discord.Client();
const fs = require('fs');
const Canvas = require('canvas');
const Snekfetch = require('snekfetch');
let xp = JSON.parse(fs.readFileSync('./xp/xp.json', 'utf8'));
let xp_lol = JSON.parse(fs.readFileSync('./xp/xp_lol.json', 'utf8'));
let xp_ftn = JSON.parse(fs.readFileSync('./xp/xp_ftn.json', 'utf8'));
let xp_rl = JSON.parse(fs.readFileSync('./xp/xp_rl.json', 'utf8'));
let xp_cs = JSON.parse(fs.readFileSync('./xp/xp_cs.json', 'utf8'));
let xp_min = JSON.parse(fs.readFileSync('./xp/xp_min.json', 'utf8'));
let xp_war = JSON.parse(fs.readFileSync('./xp/xp_war.json', 'utf8'));
var prefix = "*";

Client.login(process.env.TOKEN);

Client.on('ready', () => {
    console.log("I'm ready !!!");
    Client.user.setActivity('you', { type: 'WATCHING' })

    Client.channels.cache.get('712984576473169960').messages.fetch()
})

