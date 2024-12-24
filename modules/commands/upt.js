module.exports.config = {
  name: "upt",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SimonProject",
  description: "Xem thơi gian của BOT online",
  commandCategory: "Hệ Thống",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  const moment = require("moment-timezone");
  const time = process.uptime();
     var hours = Math.floor(time / (60 * 60));
    var minutes = Math.floor((time % (60 * 60)) / 60);
  var seconds = Math.floor(time % 60);
  var { threadID, messageID, body, senderID } = event;
  //if (senderID == global.data.botID) return;
  if ((this.config.credits) != "SimonProject") { return api.sendMessage(`𝐖𝐫𝐨𝐧𝐠 𝐜𝐫𝐞𝐝𝐢𝐭, 𝐟𝐢𝐱 𝐭𝐡𝐞 𝐜𝐫𝐞𝐝𝐢𝐭 𝐛𝐢𝐭𝐜𝐡`, threadID, messageID)}
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data; 
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};

  var arr = ["upt","uptime"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) {
    const prefix = threadSetting.PREFIX || global.config.PREFIX;
      if (data.PREFIX == null) {
        return out(` 𝐓𝐡𝐨̛̀𝐢 𝐆𝐢𝐚𝐧 𝐁𝐨𝐭 𝐃̄𝐚̃ 𝐎𝐧𝐥𝐢𝐧𝐞 \n================\n${hours} 𝐠𝐢𝐨̛̀  ${minutes} 𝐩𝐡𝐮́𝐭 ${seconds} 𝐠𝐢𝐚̂𝐲 `)
      }
      else return out(` 𝐓𝐡𝐨̛̀𝐢 𝐆𝐢𝐚𝐧 𝐁𝐨𝐭 𝐃̄𝐚̃ 𝐎𝐧𝐥𝐢𝐧𝐞 \n================\n ${hours} 𝐠𝐢𝐨̛̀ ${minutes} 𝐩𝐡𝐮́𝐭 ${seconds} 𝐠𝐢𝐚̂𝐲 ` + data.PREFIX)
    }

  });
};
module.exports.run = async({ event, api }) => {
    return api.sendMessage({body:`𝐓𝐡𝐨̛̀𝐢 𝐆𝐢𝐚𝐧 𝐁𝐨𝐭 𝐃̄𝐚̃ 𝐎𝐧𝐥𝐢𝐧𝐞 \n================\n ${hours} 𝐠𝐢𝐨̛̀ ${minutes} 𝐩𝐡𝐮́𝐭 ${seconds} 𝐠𝐢𝐚̂𝐲`, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://vnhhoang.vnhoang06.repl.co/image/phongcanh')).data.data,
method: "GET",
responseType: "stream"
})).data                                      }, event.threadID)
      }