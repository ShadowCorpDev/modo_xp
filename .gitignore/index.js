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

Client.on('message', async message => {
    let argsf = message.content.trim().split(/ +/g);



   /* if (message.content== prefix + "f"){
        let roleID = "710548656201269299";
        let filtered = message.guild.roles.cache.get(roleID).members;
        
        console.log(filtered.size);

        
        const test = [0];
        
        for(i=0; i<filtered.size; i++){
            test[i] = xp_lol[filtered.keyArray()[i]].xp;
        }

        
        console.log(test);
        test.sort();
        console.log(test);

        

        
        
        /********************************** 

        let embed = new Discord.MessageEmbed()
        .setTitle("Xp leaderboard")

        for(i=0; i<filtered.size; i++){
            let name = message.guild.members.cache.get(filtered.keyArray()[i]) || "User Left"
            if(name === "User Left"){
                embed.addField(`${i+1},${name}`,`**XP** : ${xp_lol[filtered.keyArray()[i]].xp}` );
            }else{
                embed.addField(`${i+1},${name.user.username}`,`**XP** : ${xp_lol[filtered.keyArray()[i]].xp}` );
            }
        }
        message.channel.send(embed);



        //message.channel.send("Ton classement est :");
        
       
    }*/
    




    if (message.content.startsWith(prefix + "go")) {
        if (message.author.id != 339131189791031297) {
            message.delete();
            return
        } else {
            message.delete();
            (await message.channel.send('Clique sur la reaction pour créer ton ***Game Profile*** !!!')).react('✅');
        }


    }


    if (message.content === prefix + "classement") {

        let roleID = "712212270196981770";
        let filtered = message.guild.roles.cache.get(roleID).members;
        
        console.log(filtered.size);

        
        const test = [0];
        
        for(i=0; i<filtered.size; i++){
            test[i] = xp[filtered.keyArray()[i]];
        }

        
        console.log(test);
        test.sort((a, b) => b.xp - a.xp);
        console.log(test);

        const embed = new Discord.MessageEmbed()
        .setTitle('Classement ***Game Profile*** :')


        if(test.length<10){
        for(j=0; j<test.length; j++){
            embed.addField(`${j+1} :`, `<@${test[j].user}> avec **${test[j].xp}** xp !`)
        }
        }else{
            for(j=0; j<10; j++){
                embed.addField(`${j+1} :`, `<@${test[j].user}> avec **${test[j].xp}** xp !`)
            }
        }

       message.channel.send(embed);

        

    }





   


    
    if (message.content.startsWith(prefix + "xp") && message.author.id == "339131189791031297") {

        

        let args = message.content.replace("*xp", "").split(/ +/g);
        let mention = message.mentions.users.first()
        console.log(args);

        if(mention == null){
            message.channel.send("Mention non valide !");
            return
        }

        

        switch (args[1]) {
            case "lol":
                console.log('lol');
                if (!xp_lol[mention.id]) {
                    xp_lol[mention.id] = {
                        xp: 0,
                        niveau: 1
                    };
                }

                let currentExp = xp_lol[mention.id].xp;
                let currentNiv = xp_lol[mention.id].niveau;
                let nextLevel = currentNiv * 100;

                console.log(currentExp);

                xp_lol[mention.id].xp = currentExp + parseInt(args[2]);



                if (nextLevel <= xp_lol[mention.id].xp) {
                    while (nextLevel < xp_lol[mention.id].xp) {
                        xp_lol[mention.id].niveau = xp_lol[mention.id].niveau + 1;
                        nextLevel = xp_lol[mention.id].niveau * 100;
                    }
                }

                fs.writeFile('./xp/xp_lol.json', JSON.stringify(xp_lol), err => {
                    if (err) throw err;
                });

                break

            case "ftn":
                console.log('ftn');
                if (!xp_ftn[mention.id]) {
                    xp_ftn[mention.id] = {
                        xp: 0,
                        niveau: 1
                    };
                }

                let currentExp2 = xp_ftn[mention.id].xp;
                let currentNiv2 = xp_ftn[mention.id].niveau;
                let nextLevel2 = currentNiv2 * 100;

                console.log(currentExp2);

                xp_ftn[mention.id].xp = currentExp2 + parseInt(args[2]);



                if (nextLevel2 <= xp_ftn[mention.id].xp) {
                    while (nextLevel2 < xp_ftn[mention.id].xp) {
                        xp_ftn[mention.id].niveau = xp_ftn[mention.id].niveau + 1;
                        nextLevel2 = xp_ftn[mention.id].niveau * 100;
                    }
                }

                fs.writeFile('./xp/xp_ftn.json', JSON.stringify(xp_ftn), err => {
                    if (err) throw err;
                });
                break

            case "rl":
                if (!xp_rl[mention.id]) {
                    xp_rl[mention.id] = {
                        xp: 0,
                        niveau: 1
                    };
                }

                let currentExp3 = xp_rl[mention.id].xp;
                let currentNiv3 = xp_rl[mention.id].niveau;
                let nextLevel3 = currentNiv3 * 100;

                console.log(currentExp3);

                xp_rl[mention.id].xp = currentExp3 + parseInt(args[2]);



                if (nextLevel3 <= xp_rl[mention.id].xp) {
                    while (nextLevel3 < xp_rl[mention.id].xp) {
                        xp_rl[mention.id].niveau = xp_rl[mention.id].niveau + 1;
                        nextLevel3 = xp_rl[mention.id].niveau * 100;
                    }
                }

                fs.writeFile('./xp/xp_rl.json', JSON.stringify(xp_rl), err => {
                    if (err) throw err;
                });

                break

            case "cs":
                if (!xp_cs[mention.id]) {
                    xp_cs[mention.id] = {
                        xp: 0,
                        niveau: 1
                    };
                }

                let currentExp4 = xp_cs[mention.id].xp;
                let currentNiv4 = xp_cs[mention.id].niveau;
                let nextLevel4 = currentNiv4 * 100;

                console.log(currentExp4);

                xp_cs[mention.id].xp = currentExp4 + parseInt(args[2]);



                if (nextLevel4 <= xp_cs[mention.id].xp) {
                    while (nextLevel4 < xp_cs[mention.id].xp) {
                        xp_cs[mention.id].niveau = xp_cs[mention.id].niveau + 1;
                        nextLevel4 = xp_cs[mention.id].niveau * 100;
                    }
                }

                fs.writeFile('./xp/xp_cs.json', JSON.stringify(xp_cs), err => {
                    if (err) throw err;
                });
                break


            case "min":
                if (!xp_min[mention.id]) {
                    xp_min[mention.id] = {
                        xp: 0,
                        niveau: 1
                    };
                }

                let currentExp5 = xp_min[mention.id].xp;
                let currentNiv5 = xp_min[mention.id].niveau;
                let nextLevel5 = currentNiv5 * 100;

                console.log(currentExp5);

                xp_min[mention.id].xp = currentExp5 + parseInt(args[2]);



                if (nextLevel5 <= xp_min[mention.id].xp) {
                    while (nextLevel5 < xp_min[mention.id].xp) {
                        xp_min[mention.id].niveau = xp_min[mention.id].niveau + 1;
                        nextLevel5 = xp_min[mention.id].niveau * 100;
                    }
                }

                fs.writeFile('./xp/xp_min.json', JSON.stringify(xp_min), err => {
                    if (err) throw err;
                });
                break


                case "war":
                if (!xp_war[mention.id]) {
                    xp_war[mention.id] = {
                        xp: 0,
                        niveau: 1
                    };
                }

                let currentExp6 = xp_war[mention.id].xp;
                let currentNiv6 = xp_war[mention.id].niveau;
                let nextLevel6 = currentNiv6 * 100;

                console.log(currentExp6);

                xp_war[mention.id].xp = currentExp6 + parseInt(args[2]);



                if (nextLevel6 <= xp_war[mention.id].xp) {
                    while (nextLevel6 < xp_war[mention.id].xp) {
                        xp_war[mention.id].niveau = xp_war[mention.id].niveau + 1;
                        nextLevel6 = xp_war[mention.id].niveau * 100;
                    }
                }

                fs.writeFile('./xp/xp_war.json', JSON.stringify(xp_war), err => {
                    if (err) throw err;
                });
                break

        }

        if (!xp[mention.id]) {
            xp[mention.id] = {
                xp: 0,
                niveau: 1
            };
        }

        let currentExp7 = xp[mention.id].xp;
        let currentNiv7 = xp[mention.id].niveau;
        let nextLevel7 = currentNiv7 * 100;

        console.log(currentExp7);

        xp[mention.id].xp =  xp_lol[mention.id].xp + xp_ftn[mention.id].xp + xp_cs[mention.id].xp + xp_war[mention.id].xp + xp_min[mention.id].xp + xp_rl[mention.id].xp;



        if (nextLevel7 <= xp[mention.id].xp) {
            while (nextLevel7 < xp[mention.id].xp) {
                xp[mention.id].niveau = xp[mention.id].niveau + 1;
                nextLevel7 = xp[mention.id].niveau * 100;
            }
        }

        fs.writeFile('./xp/xp.json', JSON.stringify(xp), err => {
            if (err) throw err;
        });
        message.channel.send("Ajout d'xp effectué !").then(msg => {
            setTimeout(() => { msg.delete() }, 3000)});
    }

    if (message.content.startsWith(prefix + 'GP')) {

        let roleID = "712212270196981770";
        let filtered = message.guild.roles.cache.get(roleID).members;

        if(!message.guild.members.cache.get(message.author.id).roles.cache.has(roleID)){
            message.channel.send("Tu n'as pas de ***Game Profile*** !");
            return
        }

        message.delete();

        message.channel.send("Wait 10 sec...").then(msg => {
            setTimeout(() => { msg.delete() }, 10000)});

        
        
        console.log(filtered.size);

        const r_xp = [0];
        const r_lol = [0];
        const r_cs = [0];
        const r_min = [0];
        const r_ftn = [0];
        const r_rl = [0];
        const r_war = [0];

        var i;
        for(i=0; i<filtered.size; i++){
            r_lol[i] = xp_lol[filtered.keyArray()[i]].xp;
            r_cs[i] = xp_cs[filtered.keyArray()[i]].xp;
            r_min[i] = xp_min[filtered.keyArray()[i]].xp;
            r_ftn[i] = xp_ftn[filtered.keyArray()[i]].xp;
            r_rl[i] = xp_rl[filtered.keyArray()[i]].xp;
            r_war[i] = xp_war[filtered.keyArray()[i]].xp;
            r_xp[i] = xp[filtered.keyArray()[i]].xp;   
        }

        
        
        r_xp.sort((a, b) => a - b);
        r_lol.sort((a, b) => a - b);
        r_cs.sort((a, b) => a - b);
        r_min.sort((a, b) => a - b); 
        r_ftn.sort((a, b) => a - b ); 
        r_rl.sort((a, b) => a - b);
        r_war.sort((a, b) => a - b);

        console.log(r_war + " war");
        console.log(r_ftn + " ftn");
        console.log(r_lol + " lol");
        console.log(r_rl + " rl");
        console.log(r_min + " min");
        console.log(r_cs + " cs");
        
        var rang_xp = 1;
        var rang_lol = 1;
        var rang_ftn = 1;
        var rang_cs = 1;
        var rang_rl = 1;
        var rang_war = 1;
        var rang_min = 1;

        var j_xp = r_xp.length;
        var j_lol = r_lol.length;
        var j_ftn = r_ftn.length;
        var j_cs = r_cs.length;
        var j_rl = r_rl.length;
        var j_war = r_war.length;
        var j_min = r_min.length;
    
        while(xp_lol[message.author.id].xp != r_lol[j_lol - 1]){
            
            rang_lol = rang_lol + 1;
            j_lol = j_lol - 1;
        }

        while(xp_ftn[message.author.id].xp != r_ftn[j_ftn - 1]){
            
            rang_ftn = rang_ftn + 1;
            j_ftn = j_ftn - 1;
        }

        while(xp_cs[message.author.id].xp != r_cs[j_cs - 1]){
            
            rang_cs = rang_cs + 1;
            j_cs = j_cs - 1;
        }

        while(xp_min[message.author.id].xp != r_min[j_min - 1]){
            
            rang_min = rang_min + 1;
            j_min = j_min - 1;
        }

        while(xp_war[message.author.id].xp != r_war[j_war - 1]){
            
            rang_war = rang_war + 1;
            j_war = j_war - 1;
        }

        while(xp_rl[message.author.id].xp != r_rl[j_rl - 1]){
            
            rang_rl = rang_rl + 1;
            j_rl = j_rl - 1;
        }

        while(xp[message.author.id].xp != r_xp[j_xp - 1]){
            
            rang_xp = rang_xp + 1;
            j_xp = j_xp - 1;
        }

        
        

        const canvas = Canvas.createCanvas(1004, 720);
        const ctx = canvas.getContext("2d");

        const background = await Canvas.loadImage("./img/fond-xp.png");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        //bordure
        /*ctx.strokeStyle = "#000";
        ctx.strokeRect(8, 11, 880, 569);*/

        //recup logo
        const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 21, 21, 180, 180);

        //ecriture(user)
        ctx.font = '70px Berlin Sans FB Demi';
        ctx.fillStyle = "#FFF";
        ctx.fillText(message.author.username, 220, 90);
        ctx.strokeStyle = "black"; //set the color of the stroke line 
        ctx.lineWidth = 3;
        ctx.strokeText(`${message.author.username}`, 220, 90);

         //ecriture (niveau)
         ctx.font = '90px Berlin Sans FB Demi';
         ctx.fillStyle = "#FFF";
         ctx.fillText(`${xp[message.author.id].niveau} (${xp[message.author.id].xp} xp)`, 450, 180);
         ctx.strokeStyle = "black"; //set the color of the stroke line 
         ctx.lineWidth = 3;
         ctx.strokeText(`${xp[message.author.id].niveau} (${xp[message.author.id].xp} xp)`, 450, 180);

            var color ="";
            var placement="";
            var taille="";
            console.log(rang_xp);
         switch (rang_xp){
            case 1:
                color = "#fb0";
                placement = "er";
                console.log("color 1");
            break

            case 2:
                color = "#bbb";
                placement = "e";
                console.log("color 2");
            break

            case 3:
                color = "#640";
                placement = "e";
                console.log("color 3");
            break
         }

         if(rang_xp != 1 && rang_xp != 2 && rang_xp != 3 ){
            color = "#FFF"
            placement = "e";
            console.log("color autre");
         }

         if(rang_xp>= 10){
             taille="60px Berlin Sans FB Demi";
         }else{
             taille="75px Berlin Sans FB Demi";
         }
        
         //ecriture (rank)
         ctx.fillStyle = color;
         ctx.fillRect(880,25,100,100);
         ctx.font = taille;
         ctx.fillStyle = "#FFF";
         ctx.fillText(`${rang_xp}${placement}`, 885, 100);
        ctx.strokeStyle = "black"; //set the color of the stroke line 
        ctx.lineWidth = 2;
        ctx.strokeText(`${rang_xp}${placement}`, 885, 100);


        //ecriture (lol)
        ctx.font = '40px Berlin Sans FB Demi';
        ctx.fillStyle = "#FFF";
        ctx.fillText(`Niveau ${xp_lol[message.author.id].niveau} (${xp_lol[message.author.id].xp} xp) / rang : ${rang_lol}`, 425, 300);
        ctx.strokeStyle = "black"; //set the color of the stroke line 
        ctx.lineWidth = 2;
        ctx.strokeText(`Niveau ${xp_lol[message.author.id].niveau} (${xp_lol[message.author.id].xp} xp) / rang : ${rang_lol}`, 425, 300);

        //ecriture (ftn)
        ctx.font = '40px Berlin Sans FB Demi';
        ctx.fillStyle = "#FFF";
        ctx.fillText(`Niveau ${xp_ftn[message.author.id].niveau} (${xp_ftn[message.author.id].xp} xp) / rang : ${rang_ftn}`, 425, 370);
        ctx.strokeStyle = "black"; //set the color of the stroke line 
        ctx.lineWidth = 2;
        ctx.strokeText(`Niveau ${xp_ftn[message.author.id].niveau} (${xp_ftn[message.author.id].xp} xp) / rang : ${rang_ftn}`, 425, 370);

        //ecriture (cs)
        ctx.font = '40px Berlin Sans FB Demi';
        ctx.fillStyle = "#FFF";
        ctx.fillText(`Niveau ${xp_cs[message.author.id].niveau} (${xp_cs[message.author.id].xp} xp) / rang : ${rang_cs}`, 425, 440);
        ctx.strokeStyle = "black"; //set the color of the stroke line 
        ctx.lineWidth = 2;
        ctx.strokeText(`Niveau ${xp_cs[message.author.id].niveau} (${xp_cs[message.author.id].xp} xp) / rang : ${rang_cs}`, 425, 440);

        //ecriture (min)
        ctx.font = '40px Berlin Sans FB Demi';
        ctx.fillStyle = "#FFF";
        ctx.fillText(`Niveau ${xp_min[message.author.id].niveau} (${xp_min[message.author.id].xp} xp) / rang : ${rang_min}`, 425, 510);
        ctx.strokeStyle = "black"; //set the color of the stroke line 
        ctx.lineWidth = 2;
        ctx.strokeText(`Niveau ${xp_min[message.author.id].niveau} (${xp_min[message.author.id].xp} xp) / rang : ${rang_min}`, 425, 510);

        //ecriture (rl)
        ctx.font = '40px Berlin Sans FB Demi';
        ctx.fillStyle = "#FFF";
        ctx.fillText(`Niveau ${xp_rl[message.author.id].niveau} (${xp_rl[message.author.id].xp} xp) / rang : ${rang_rl}`, 425, 585);
        ctx.strokeStyle = "black"; //set the color of the stroke line 
        ctx.lineWidth = 2;
        ctx.strokeText(`Niveau ${xp_rl[message.author.id].niveau} (${xp_rl[message.author.id].xp} xp) / rang : ${rang_rl}`, 425, 585);

        //ecriture (WAR)
        ctx.font = '40px Berlin Sans FB Demi';
        ctx.fillStyle = "#FFF";
        ctx.fillText(`Niveau ${xp_war[message.author.id].niveau} (${xp_war[message.author.id].xp} xp) / rang : ${rang_war}`, 425, 655);
        ctx.strokeStyle = "black"; //set the color of the stroke line 
        ctx.lineWidth = 2;
        ctx.strokeText(`Niveau ${xp_war[message.author.id].niveau} (${xp_war[message.author.id].xp} xp) / rang : ${rang_war}`, 425, 655);



        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "profil-game-image.png");

        message.channel.send(attachment);
    }

})

Client.on("messageReactionAdd", (reaction, user) => {

    console.log(reaction.emoji.name + 'test')

    if (reaction.message.channel.id === "712984576473169960") {
        console.log(reaction.emoji.name)

        if (user.id === "710065397747023883") return

        if (reaction.emoji.name != "✅") {
            reaction.users.remove(user);
            return
        }

        if (reaction.message.guild.members.cache.get(user.id).roles.cache.has("712212270196981770")) {
            console.log("role interdit");
            reaction.users.remove(user);
            reaction.message.channel.send(`${user} vous avez déjà un ***Game Profile*** !!!`).then(msg => {
                setTimeout(() => { msg.delete() }, 5000);
            })
            return
        } else {
            reaction.users.remove(user);
            console.log("Creation profile");


            if (!xp_min[user.id]) {
                xp_min[user.id] = {
                    user: user.id,
                    xp: 0,
                    niveau: 1
                };
            }

            fs.writeFile('./xp/xp_min.json', JSON.stringify(xp_min), err => {
                if (err) throw err;
            });

            if (!xp_rl[user.id]) {
                xp_rl[user.id] = {
                    user: user.id,
                    xp: 0,
                    niveau: 1
                };
            }

            fs.writeFile('./xp/xp_rl.json', JSON.stringify(xp_rl), err => {
                if (err) throw err;
            });

            if (!xp_cs[user.id]) {
                xp_cs[user.id] = {
                    user: user.id,
                    xp: 0,
                    niveau: 1
                };
            }

            fs.writeFile('./xp/xp_cs.json', JSON.stringify(xp_cs), err => {
                if (err) throw err;
            });

            if (!xp_ftn[user.id]) {
                xp_ftn[user.id] = {
                    user: user.id,
                    xp: 0,
                    niveau: 1
                };
            }

            fs.writeFile('./xp/xp_ftn.json', JSON.stringify(xp_ftn), err => {
                if (err) throw err;
            });

            if (!xp_lol[user.id]) {
                xp_lol[user.id] = {
                    user: user.id,
                    xp: 0,
                    niveau: 1
                };
            }

            fs.writeFile('./xp/xp_lol.json', JSON.stringify(xp_lol), err => {
                if (err) throw err;
            });

            if (!xp[user.id]) {
                xp[user.id] = {
                    user: user.id,
                    xp: 0,
                    niveau: 1
                };
            }

            fs.writeFile('./xp/xp.json', JSON.stringify(xp), err => {
                if (err) throw err;
            });

            if (!xp_war[user.id]) {
                xp_war[user.id] = {
                    user: user.id,
                    xp: 0,
                    niveau: 1
                };
            }

            fs.writeFile('./xp/xp_war.json', JSON.stringify(xp_war), err => {
                if (err) throw err;
            });

            reaction.message.guild.members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.get("712212270196981770"));

        }


    }
})
