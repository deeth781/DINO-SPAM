module.exports.config = {
  name: "spam2",
  version: "1.0.1",
  hasPermssion: 2,
  credits: "Kz Khánhh", //code dựa trên idea từ Vtuan
  description: "spam nội dung nhiều lần",
  commandCategory: "Spam",
  usages: "spam <nội dung> <khoảng cách> <số lần>",
  cooldowns: 5,
  dependencies: {"moment-timezone": ""}
};

module.exports.run = async function({ api, event, args }) {
  const moment = require("moment-timezone");
  const { threadID, messageID, senderID } = event;
  const { sendMessage } = api;


  
  let content, delay, times;
  if (args.length < 2) return sendMessage("Syntax: spam <nội dung> <khoảng cách> <số lần>", threadID, messageID);
  if (isNaN(args[args.length - 1])) {
    times = 10;
    content = args.slice(0, args.length - 1).join(" ");
    delay = Number(args[args.length - 1]);
  } else {
    times = Number(args[args.length - 1]);
    content = args.slice(0, args.length - 2).join(" ");
    delay = Number(args[args.length - 2]);
  }

  if (isNaN(delay) || isNaN(times) || times <= 0 || delay <= 0) 
    return sendMessage("Số lần spam và khoảng cách thời gian phải là số và lớn hơn 0", threadID, messageID);


  for (let i = 1; i <= times; i++) {
    sendMessage(`${content}`, threadID);
    await new Promise(resolve => setTimeout(resolve, delay * 1000));
  }

  
}