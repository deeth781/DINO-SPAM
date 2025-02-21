const request = require("request");
const fs = require("fs")
const axios = require("axios")
module.exports.config = {
  name: "nhonyc",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Staw",
  description: "Nhớ người Bạn Muốn",
  commandCategory: "Tình yêu",
  usages: "@tag",
  cooldowns: 5,
  dependencies: {"request": "","fs": "","axios": ""}
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
        const request = require('request')
                const fs = require('fs')
                  var mention = Object.keys(event.mentions)[0];
let tag = event.mentions[mention].replace("@", "");
        var link = [
          "https://genk.mediacdn.vn/2016/04-1483112033497.gif",
             ];
   var callback = () => api.sendMessage({body: ` ${tag}𝘼𝙣𝙝 𝙉𝙝𝙤̛́ 𝙀𝙢 𝙉𝙝𝙞𝙚̂̀𝙪 𝙇𝙖̆́𝙢 𝙈𝙞̀𝙣𝙝 𝘾𝙤́ 𝙏𝙝𝙚̂̉ 𝙌𝙪𝙖𝙮 𝙇𝙖̣𝙞 𝘿𝙪̛𝙤̛̣𝙘 𝙆𝙝𝙤̂𝙣𝙜 𝘼𝙣𝙝 𝙑𝙖̂̃𝙣 𝘾𝙤̀𝙣 𝙈𝙪𝙤̂́𝙣 𝘽𝙚̂𝙣 𝙀𝙢 𝙉𝙤́𝙞 𝙉𝙝𝙪̛̃𝙣𝙜 𝙇𝙤̛̀𝙞 𝙉𝙜𝙤̣𝙩 𝙉𝙜𝙖̀𝙤 𝙑𝙤̛́𝙞 𝙀𝙢 😶` , mentions: [{
          tag: tag,
          id: Object.keys(event.mentions)[0]
        }],
  attachment: fs.createReadStream(__dirname + "/cache/nho.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/nho.gif"));
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/nho.gif")).on("close",() => callback());
   };