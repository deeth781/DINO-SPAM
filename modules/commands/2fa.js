class get2fa {
    get config() {
      return {
        name: "2fa",
        version: "1.1.2",
        hasPermssion: 3,
        credits: "Judas",
        description: "get2fa",
        commandCategory: "Hệ Thống",
        usages: "2fa [new/get/added/check]",
        cooldowns: 5
      }
    }
    async onLoad(){
      try {
          const { existsSync, writeFileSync, readFileSync } = require('fs-extra');
          const { resolve } = require('path');
          const path = resolve(__dirname, "cache", "data", "get2fabyJudas.json");
          if (!global.moduleData.get2fa) global.moduleData.get2fa = new Map();
          if (!existsSync(path)) writeFileSync(path, JSON.stringify([]), "utf-8");
          const data = JSON.parse(readFileSync(path, "utf-8"));
          if (typeof global.moduleData.get2fa == "undefined") global.moduleData.get2fa = new Map();
          for (const threadData of data) global.moduleData.get2fa.set(threadData.threadID, threadData.get2fas);
      } catch (e) { console.log(e) }
      return;
    }
    async run({ event, api, args, Users }) {
      const type = ["new","get","added","check"]
      const totp = require("totp-generator");
    const { join } = require("path")
    const { existsSync, writeFileSync, readFileSync } = require('fs-extra');
    const pathData = join(__dirname, "cache", "data", "get2fabyJudas.json");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
     var userData = dataJson.find(item => item.senderID == event.senderID) || { senderID: event.senderID,  list2fa: [] };
      if(args[0] == "new"){
  if (!dataJson.some(i => i.senderID == event.senderID)) {
     dataJson.push(userData);
      writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
   return api.sendMessage('Đã tạo dữ liệu 2fa cho bạn thành công vui lòng nhập mã 2fa', event.threadID, (error, info) =>{
    if(error) console.log(e)
   global.client.handleReply.push({
        step: 1,
        name: this.config.name, 
        messageID: info.messageID,
        author: event.senderID,
      }),
     event.messageID
   })
} else {
    api.sendMessage('Bạn đã có 2fa rồi vui lòng dùng 2fa get để lấy 2fa của mình', event.threadID, event.messageID)
}
      }
  if(args[0] == "get"){
    console.log(userData.list2fa.length)
     if (dataJson.some(i => i.senderID == event.senderID)) {
      if(userData.list2fa.length < 2){
       return api.sendMessage(totp(userData.list2fa[0]), event.threadID);
      } else {
        const a = [];
        for(let i = 0; i < userData.list2fa.length; i++){
            a.push(`\n[ ${i + 1} ] | [ ${userData.list2fa[i]} ]\n`)
        }
     return api.sendMessage(`reply theo số thứ tự để lấy 2fa ${a}`, event.threadID, (error, info) =>{
    if(error) console.log(e)
   global.client.handleReply.push({
        step: 2,
        name: this.config.name, 
        messageID: info.messageID,
        author: event.senderID,
      }),
     event.messageID
   })
  } 
} else {
     return api.sendMessage(`Bạn chưa tạo dữ liệu dùng ${global.config.PREFIX}${this.config.name} new để tạo nhé !`, event.threadID)
  }
} else if(args[0] == "added"){
  const content = (args.slice(1, args.length)).join(" ")
     if (content.indexOf("\n") != -1) {
                const contentSplit = content.split("\n");
                for (const item of contentSplit) userData.list2fa.push(item);
            }
            else {
                userData.list2fa.push(content);
            }
  writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
  api.sendMessage('Đã Thêm 2fa thành công', event.threadID)
} else if(args[0] == "del"){
  //từ từ làm :))
}
else if(args[0] == "check"){
  const z = []
  for(let i = 0; i < userData.list2fa.length; i++){
    z.push(`${i + 1} | ${userData.list2fa[i]} | ${totp(userData.list2fa[i])}\n`)
  }
  return api.sendMessage(`${z}`, event.threadID)
} 
  if(!args[0]){
    api.sendMessage('Nhập type', event.threadID, event.messageID)
  } if(!type.includes(args[0])) {
   return api.sendMessage(totp(args[0]), event.threadID)
  } 
   }
  async handleReply({ event, api, handleReply, global, config }) {
    try {
      
     const { senderID, messageID, threadID , body } = event;
    const totp = require("totp-generator");
   const { join } = require("path")
    const { existsSync, writeFileSync, readFileSync } = require('fs-extra');
    const pathData = join(__dirname, "cache", "data", "get2fabyJudas.json");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
     var userData = dataJson.find(item => item.senderID == senderID) || { senderID: event.senderID,  list2fa: [] };
    if(handleReply.author !== senderID){
      api.sendMessage('con cặc', event.threadID)
    }
    console.log(`"${userData.list2fa[body - 1]}"`)
    if(handleReply.step == 1){
    const token = totp(body);
    userData.list2fa.push(body)
    console.log(userData)
    writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
      api.sendMessage(`bạn đã ghi thành công 2fa và mã 2fa của bạn là ${token} bạn có thể dùng ${global.config.PREFIX}${this.config.name} get để lấy mã 2fa tiếp theo`, threadID)
  } else if(handleReply.step == 2){
   // if(isNaN(body)) return console.log("đã xãy ra lỗi")
    const token = totp(userData.list2fa[body - 1]);
    return api.sendMessage(token, event.threadID)
   }
  }
    catch (error) {
      console.log(error)
    }
}
      }
  module.exports = new get2fa();