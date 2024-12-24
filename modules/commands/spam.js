module.exports.config = {
  name: "spam",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Vtuan",
  description: "spam đến chết một nội dung",
  commandCategory: "Spam",
  usages: "",
  cooldowns: 1,
  envConfig: {
    spamDelay: 2  
  }
};

const spamThreads = new Set();  
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports.run = async function ({ api, event, args }) { 
  const { threadID, messageID, senderID } = event;
  const content = (args.length != 0) ? args.join(" ") : "tddzs1tg";
  if (args[0] === "stop") {
    if (spamThreads.has(threadID)) {
      spamThreads.delete(threadID);
      return api.sendMessage('Đã dừng spam!', threadID, messageID);
    } 
    return api.sendMessage('Không có quá trình spam nào đang diễn ra!', threadID, messageID);
  } 
  if (!spamThreads.has(threadID)) {
    spamThreads.add(threadID);
    api.sendMessage(`Bắt đầu spam!`, threadID, messageID);
    while (spamThreads.has(threadID)) {
      await delay(this.config.envConfig.spamDelay * 1000);
      if (spamThreads.has(threadID)) {
        api.sendMessage(content, threadID);
      }
    }
  } else {
    api.sendMessage('Quá trình spam đã được bắt đầu trước đó!', threadID, messageID);
  }
};