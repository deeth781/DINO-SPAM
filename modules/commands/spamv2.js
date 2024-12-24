module.exports.config = {
  name: "spamv2",
  version: "1.0.1",
  hasPermssion: 2,
  credits: "Vtuan",
  description: "spam nội dung nhiều lần và tag",
  commandCategory: "Spam",
  usages: "spam <nội dung>",
  cooldowns: 5,
  dependencies: {"moment-timezone": ""}
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, participantIDs, messageID } = event;
  const adminID = participantIDs[0]; // ID của admin
  const botID = api.getCurrentUserID();
  let spamContent = (args.length != 0) ? args.join(" ") : "Xin chao cac ban", mentions = [];
  let isSpamming = true;

  // Tạo mentions cho tin nhắn
  for (const userID of participantIDs) {
    if (userID !== botID) {
      mentions.push({ tag: spamContent, id: userID, length: spamContent.length });
    }
  }

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  while (isSpamming) {
    // Gửi tin nhắn spam và tag người dùng
    await api.sendMessage({ body: spamContent, mentions }, threadID);

    // Chờ một thời gian cố định trước khi gửi tin nhắn tiếp
    await delay(2000);

    // Kiểm tra điều kiện dừng sau mỗi tin nhắn đã gửi
    try {
      const messages = await api.getThreadHistory(threadID, 10, messageID);
      const stopMsg = messages.find(msg => msg.senderID === adminID && msg.body.toLowerCase() === "stop");
      if (stopMsg) {
        isSpamming = false;
        await api.sendMessage("Spam đã dừng theo yêu cầu của admin.", threadID, messageID);
      }
    } catch (error) {
      console.error(error);
      isSpamming = false; // Dừng spam nếu có lỗi
    }
  }
};