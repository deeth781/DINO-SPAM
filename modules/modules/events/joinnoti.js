module.exports.config = {
  name: "joinNoti",
  eventType: ["log:subscribe"],
  version: "1.0.1",
  credits: "Mirai Team",
  description: "Thông báo bot hoặc người vào nhóm",
  dependencies: {
    "fs-extra": ""
  }
};

module.exports.run = async function({ api, event, Users }) {
  const { threadID } = event;

  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "Made by CatalizCS and SpermLord" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
    api.sendMessage(`[𝐊𝐞̂́𝐭 𝐍𝐨̂́𝐢 𝐓𝐡𝐚̀𝐧𝐡 𝐂𝐨̂𝐧𝐠]`, threadID);
  } else {
    try {
      const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
      const { threadName, participantIDs } = await api.getThreadInfo(threadID);

      const nameArray = [];
      const mentions = [];
      const memLength = [];
      let i = 0;

      for (const id in event.logMessageData.addedParticipants) {
        const userName = event.logMessageData.addedParticipants[id].fullName;
        nameArray.push(userName);
        mentions.push({ tag: userName, id });
        memLength.push(participantIDs.length - i++);

        if (!global.data.allUserID.includes(id)) {
          await Users.createData(id, { name: userName, data: {} });
          global.data.userName.set(id, userName);
          global.data.allUserID.push(id);
        }
      }
      memLength.sort((a, b) => a - b);

      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      let msg = "";

      if (typeof threadData.customJoin === "undefined") {
        msg = `✿——————————————✿\n𝐗𝐢𝐧 𝐜𝐡𝐚̀𝐨: [ {name} ]\n𝐂𝐡𝐚̀𝐨 𝐦𝐮̛̀𝐧𝐠 𝐛𝐚̣𝐧 𝐝̄𝐞̂́𝐧 𝐯𝐨̛́𝐢: [ {threadName} ]\n𝐁𝐚̣𝐧 𝐥𝐚̀ 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐬𝐨̂́: [ {soThanhVien} ]\n𝐃̄𝐮̛𝐨̛̣𝐜 𝐭𝐡𝐞̂𝐦 𝐛𝐨̛̉𝐢: [ {author} ]\n🎉 𝑪𝒉𝒖́𝒏𝒈 𝒕𝒐̂𝒊 𝒓𝒂̂́𝒕 𝒗𝒖𝒊 𝒌𝒉𝒊 𝒃𝒂̣𝒏 𝒈𝒊𝒂 𝒏𝒉𝒂̣̂𝒑 𝒄𝒐̣̂𝒏𝒈 𝒅𝒐̂̀𝒏𝒈 𝒄𝒖̉𝒂 𝒄𝒉𝒖́𝒏𝒈 𝒕𝒐̂𝒊. 𝑯𝒂̃𝒚 𝒕𝒉𝒂𝒎 𝒈𝒊𝒂 𝒕𝒓𝒐̀ 𝒄𝒉𝒖𝒚𝒆̣̂𝒏, 𝒄𝒉𝒊𝒂 𝒔𝒆̉ 𝒚́ 𝒕𝒖̛𝒐̛̉𝒏𝒈 𝒗𝒂̀ 𝒏𝒆̂́𝒖 𝒄𝒐́ 𝒃𝒂̂́𝒕 𝒌𝒚̀ 𝒄𝒂̂𝒖 𝒉𝒐̉𝒊 𝒏𝒂̀𝒐, 𝒅𝒖̛̀𝒏𝒈 𝒏𝒈𝒂̂̀𝒏 𝒏𝒈𝒂̣𝒊 𝒉𝒐̉𝒊 𝒏𝒉𝒆́!\n𝐂𝐡𝐮́𝐜 𝐛𝐚̣𝐧 𝐜𝐨́ 𝐦𝐨̣̂𝐭 𝐧𝐠𝐚̀𝐲 𝐯𝐮𝐢 𝐯𝐞̉ 💝\n✿——————————————✿`;
      } else {
        msg = threadData.customJoin;
      }

      const getData = await Users.getData(event.author);
      const nameAuthor = typeof getData.name === "undefined" ? "link join" : getData.name;

      const time = require("moment-timezone").tz("Asia/Ho_Chi_Minh");
      const gio = time.format("HH");
      const moment = require("moment-timezone");
      const bok = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY" || "HH:mm:ss");

      let get = "";
      if (gio >= 5) get = "𝐁𝐮𝐨̂̉𝐢 𝐒𝐚́𝐧𝐠";
      if (gio >= 11) get = "𝐁𝐮𝐨̂̉𝐢 𝐓𝐫𝐮̛𝐚";
      if (gio >= 14) get = "𝐁𝐮𝐨̂̉𝐢 𝐂𝐡𝐢Ề̀u";
      if (gio >= 19) get = "𝐁𝐮𝐨̂̉𝐢 𝐓𝐨̂́𝐢";

      msg = msg
        .replace(/\{name}/g, nameArray.join(", "))
        .replace(/\{type}/g, memLength.length > 1 ? "𝐜𝐚́𝐜 𝐛𝐚̣𝐧" : "𝐛𝐚̣𝐧")
        .replace(/\{soThanhVien}/g, memLength.join(", "))
        .replace(/\{threadName}/g, threadName)
        .replace(/\{get}/g, get)
        .replace(/\{author}/g, nameAuthor)
        .replace(/\{bok}/g, bok);

      const path = require("path");
      const pathGif = path.join(__dirname, "cache", "joinGif", `${1}.mp4`);

      if (existsSync(pathGif)) {
        formPush = { body: msg, attachment: createReadStream(pathGif), mentions };
      } else {
        formPush = { body: msg, mentions };
      }

      if (existsSync(pathGif)) {
        formPush = { body: msg, attachment: createReadStream(pathGif), mentions };
      } else {
        formPush = { body: msg, mentions };
      }

      return api.sendMessage(formPush, threadID);
    } catch (e) {
      console.log(e);
    }
  }
};