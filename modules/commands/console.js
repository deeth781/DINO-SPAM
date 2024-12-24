module.exports.config = {
  name: "console",
  version: "1.0.0",
  hasPermssion: 3,
  credits: "JRT",
  description: "Làm cho console đẹp hơn",
  commandCategory: "Hệ Thống",
  usages: "console ",
  cooldowns: 0
};
module.exports.handleEvent = async function ({ api, args, Users, event, Threads, utils, client }) {
  let { messageID, threadID, senderID, mentions } = event;
  const chalk = require('chalk');
   const moment = require("moment-timezone");
var time= moment.tz("Asia/Ho_Chi_Minh").format("LLLL");   
const thread = global.data.threadData.get(event.threadID) || {};
if (typeof thread["console"] !== "undefined" && thread["console"] == true) return;
if (event.senderID == global.data.botID) return;
var nameBox = global.data.threadInfo.get(event.threadID).threadName || "Tên không tồn tại";
var nameUser = await Users.getNameUser(event.senderID)
  var msg = event.body||"Ảnh, video hoặc kí tự đặc biệt";
  var job = ["FF9900", "FFFF33", "33FFFF", "FF99FF", "FF3366", "FFFF66", "FF00FF", "66FF99", "00CCFF", "FF0099", "FF0066", "7900FF", "93FFD8", "CFFFDC", "FF5B00", "3B44F6", "A6D1E6", "7F5283", "A66CFF", "F05454", "FCF8E8", "94B49F", "47B5FF", "B8FFF9", "42C2FF", "FF7396"];
  var random = 
job[Math.floor(Math.random() * job.length)]      
  var random1 = job[Math.floor(Math.random() * job.length)]
 var random2 = job[Math.floor(Math.random() * job.length)]
var random3 = job[Math.floor(Math.random() * job.length)]
var random4 = job[Math.floor(Math.random() * job.length)]
var random5 = job[Math.floor(Math.random() * job.length)]
var random6 = job[Math.floor(Math.random() * job.length)]
  console.log(chalk.hex("#" + random)(`[💓]→ Tên nhóm: ${nameBox}`) + `\n` + chalk.hex("#" + random5)(`[🔎]→ ID nhóm: ${event.threadID}`) + `\n` + chalk.hex("#" + random6)(`[🔱]→ Tên người dùng: ${nameUser}`) + `\n` + chalk.hex("#" + random1)(`[📝]→ ID người dùng: ${event.senderID}`) + `\n` + chalk.hex("#" + random2)(`[📩]→ Nội dung: ${msg}`) + `\n` + chalk.hex("#" + random3)(`[ ${time} ]`) + `\n` + chalk.hex("#" + random4)(`◆━━━━━━━━━◆𝘛𝘢𝘵𝘴𝘶𝘠𝘛𝘉◆━━━━━━━━◆\n`)); 
}
module.exports.run = async function ({ api, args, Users, event, Threads, utils, client }) {

}