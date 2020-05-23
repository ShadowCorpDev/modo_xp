const discord = require('discord.js');
const client = new discord.Client();

client.login(process.env.TOKEN);

client.on('ready', () =>{
    console.log("READY !!!");
});
