class Judas {
  get config() {
    return {
      name: "cấm",
      version: "1.1.2",
      hasPermssion: 1,
      credits: "Judas",
      description: "Cấm đổi tên box và ảnh box",
      commandCategory: "Quản Lí Box",
      usages: "cấm avt/namebox",
      cooldowns: 5
    }
  }
 async handleEvent ({ event, api, models, Users, Threads, Currencies }) {
   try{
const { join } = require("path")
 const { threadID } = event;
 const { readFileSync, writeFileSync, existsSync } = require("fs-extra");
let threadInfo = await api.getThreadInfo(threadID);
let u = threadInfo.nicknames;
let v = threadInfo.threadName
 const pathxData = join(__dirname, "cache", "nickname", threadID + ".json");
     if (!existsSync(pathxData)) writeFileSync(pathxData, "[]", "utf-8");
 var dataJson = JSON.parse(readFileSync(pathxData, "utf-8"));
const z = dataJson.find(i => i == dataJson[0]) || { u }
if(!dataJson.find(i => i == dataJson[0])){
const a = {
  name: v, id: u
}
dataJson.push(a)
writeFileSync(pathxData, JSON.stringify(dataJson, null, 4), "utf-8");
}
     //console.log(!dataJson.find(i => i !== dataJson[0]))
} catch(e){
     console.log(e)
}}
 async onLoad(){
 const { existsSync, writeFileSync } = require('fs-extra')
 const { join } = require('path');
 const pathData = join(__dirname, "cache", "boxname.json");
 // const path1 = join(__dirname, "cache", "nickname", "nickname.json");
 if (!existsSync(pathData)) writeFileSync(pathData, "[]", "utf-8");
// if (!existsSync(path1))  writeFileSync(path, "[]", "utf-8");
   }
async run({ event, api, args, Users }) {
   const { readFileSync, writeFileSync } = require("fs-extra");
  const { join } = require("path")
const pathData = join(__dirname, "cache", "boxname.json");
  const { threadID, messageID } = event;
  var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
  var Thread_1 = dataJson.find(item => item.boxid == threadID) || { boxid: threadID, boxname: false, username: false, avtbox: false };
  if(!dataJson.find(item => item.boxid == threadID)){
    dataJson.push(Thread_1);
    writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
  } else if(args[0] == "boxname"){
      if(Thread_1.boxname == true){
          Thread_1.boxname = false
      } else {
          Thread_1.boxname = true
      }
  }  else if(args[0] == "avtbox"){
    if(Thread_1.avtbox == true){
          Thread_1.avtbox = false
      } else {
          Thread_1.avtbox = true
      }
  }

  writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
  if (!args[0]) return api.sendMessage(`=== 『 CẤM 』 ===\n◆━━━━━━━━━━━━━━━━◆\n\n${global.config.PREFIX}${this.config.name} boxname => Cấm đổi tên box\n${global.config.PREFIX}${this.config.name} avtbox => Cấm đổi ảnh box\n(true = Bật | false = tắt )`, event.threadID);
  return api.sendMessage(`➜ Đã ${args[0] == "boxname" ? Thread_1.boxname : args[0] == "username" ? Thread_1.username : Thread_1.avtbox} ${args[0] == "boxname" ? "boxname" : args[0] == "username" ? "đổi biệt danh" : "avt box"} thành công.`, threadID, messageID)
}
}
  module.exports = new Judas();