module.exports.config = {
 name: "thamgia",
 version: "1.0.0", 
 hasPermssion: 3,
 credits: "TatsuYTB",
 description: "Thêm bạn vào nhóm mà bot đang ở",
 commandCategory: "Hệ Thống", 
 usages: "thamgia", 
 cooldowns: 0,
 dependencies: {}
};
module.exports.handleReply = async ({ event, api, handleReply, Threads }) => {
    var { threadID, messageID, body, senderID } = event;
    var { threadList, author } = handleReply;
    /*if (senderID != author) return;
    api.unsendMessage(handleReply.messageID);*/
   if (handleReply.author != event.senderID) return api.sendMessage("?????", threadID, messageID)
    if (!body || !parseInt(body)) return api.sendMessage('Lựa chọn của bạn phải là một con số.', threadID, messageID);
    if (!threadList[parseInt(body) - 1]) return api.sendMessage("Lựa chọn của bạn không nằm trong danh sách", threadID, messageID);
    else {
        try {
            var threadInfo = threadList[parseInt(body) - 1];
            var { participantIDs } = threadInfo;
            if (participantIDs.includes(senderID)) return api.sendMessage('→ Bạn đã có mặt trong nhóm này.', threadID, messageID);
            api.addUserToGroup(senderID, threadInfo.threadID, (e) => {
              if (e) api.sendMessage(`Đã xảy ra lỗi: ${e.errorDescription}`, threadID, messageID);
              else api.sendMessage(`→ Bot đã thêm bạn vào nhóm ${threadInfo.name} rồi nka. Kiểm tra ở mục spam hoặc tin nhắn chờ nếu không thấy box nka.`, threadID, messageID);
            });
        }
        catch (error) {
            return api.sendMessage(`Chưa thể thực thi ${error}`, threadID, messageID);
        }
    }
};
module.exports.run = async function({ api, event }) {
const permission = ["100040472494187"];
         if (!permission.includes(event.senderID)) return api.sendMessage("Bạn không có quyền", event.threadID, event.messageID);	
const { threadID, messageID, senderID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    try {
    var spam = await api.getThreadList(50, null, ["INBOX"]) || [];
  } catch (e) { return api.sendMessage(`→ Không thể lấy danh sách nhóm\nVui lòng thử lại sau`, threadID, messageID) }
  const list = [...spam].filter(group => group.isSubscribed && group.isGroup);
  //fix lại lọc box M-Drasew
    for (const single of list) 
      msg += `${index++}.${single.name}\n`;
  var tpk = `⬇️==== [ 𝗧𝗛𝗔𝗠 𝗚𝗜𝗔 ] ====⬇️
  ━━━━━━━━━━━━━━━\n❤ 𝗛𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶 𝗰𝗼́ ${list.length} 𝗻𝗵𝗼́𝗺 𝗯𝗼𝘁 đ𝗮𝗻𝗴 𝗵𝗼𝗮̣𝘁 đ𝗼̣̂𝗻𝗴\n\n`;
    if (list.length != 0) return api.sendMessage(tpk + msg + `\n👉 𝗩𝘂̛̀𝗮 𝗹𝗼̣𝗰 𝗿𝗮 ${list.length} 𝗻𝗵𝗼́𝗺 𝗺𝗮̀ 𝗯𝗮̣𝗻 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝘁𝗵𝗮𝗺 𝗴𝗶𝗮 𝘃𝗮̀𝗼\n━━━━━━━━━━━━━━━\n⚠️ 𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝗸𝗲̀𝗺 𝘀𝗼̂́ 𝘁𝘂̛𝗼̛𝗻𝗴 𝘂̛́𝗻𝗴 𝘃𝗼̛́𝗶 𝗯𝗼𝘅 𝗺𝗮̀ 𝗯𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 𝘃𝗮̀𝗼\n🌸 𝗧𝗼̂̉𝗻𝗴 𝗻𝗵𝗼́𝗺 đ𝗮̃ 𝗹𝘂̛𝘂 𝘃𝗮̀𝗼 𝗱𝘂̛̃ 𝗹𝗶𝗲̣̂𝘂 𝗵𝗲̣̂ 𝘁𝗵𝗼̂́𝗻𝗴: ${global.data.allThreadID.length} 𝗻𝗵𝗼́𝗺`, threadID, (error, info) => {
    global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: senderID,
            threadList: list

        });
  }, messageID);
    else return api.sendMessage(`[ Lỗi ] #244`, threadID, messageID);
}