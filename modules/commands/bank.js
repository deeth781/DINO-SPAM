module.exports.config = {
        name: "bank",
        version: "0.0.1",
        hasPermssion: 0,
        credits: "D-Jukie-keychinhle (chinhle đã sủi)",
        description: "",
        commandCategory: "Tiện ích",
        usages: "",
        cooldowns: 0,
dependencies: {
         "fs-extra": "",
      "request": "",
      "axios": ""
}  
};
module.exports.onLoad = async () => {
  const { existsSync, writeFileSync, mkdirSync } = require("fs-extra")
  const { join } = require("path")
  const axios = require("axios");
  const dir = __dirname + `/data`;
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    const pathData = join(__dirname + '/data/bank.json');
    if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8"); 
  return;
}
module.exports.run = async function({ api, event, args, models, Users, Threads, Currencies, permssion }) {
  const { threadID, messageID, senderID } = event;
  const axios = require("axios")
   try{
  const { readFileSync, writeFileSync } = require("fs-extra")
  const { join } = require("path")
  const pathData = join(__dirname + '/data/bank.json');
  const user = require('./data/bank.json');
  const timeIM = 60*60
  const laisuat = 0.05
  const moneyInput = parseInt(args[1])
  if(args[0] == '-r' || args[0] == 'register') {
    if (!user.find(i => i.senderID == senderID)) {
      var add = { senderID: senderID,  money: "0" }
      user.push(add);
      writeFileSync(pathData, JSON.stringify(user, null, 2));
      return api.sendMessage(`[ ✅ SUCCESS ] - Bạn đã đăng kí thành công, gửi ít nhất 10000$ để có lãi💰`, threadID, messageID)
    }
  else return api.sendMessage(`[ ⚠️ WARNING ] - Bạn đã có tài khoản trên hệ thống MIRAI Bank🏦`, threadID, messageID)
  }
  if(args[0] == 'check' || args[0] == 'coins') {
  if (!user.find(i => i.senderID == senderID)) return api.sendMessage(`[⚠️ WARNING] - Bạn chưa đăng kí sử dụng banking, ${global.config.PREFIX}${this.config.name} register để đăng kí🏦`, threadID, messageID)
    else { 
      var userData = user.find(i => i.senderID == senderID);
      return api.sendMessage(`[ BANKING ] - Số tiền bạn gửi Mirai Bank là: ${formatNumber(userData.money)}$\n💷 Lãi: +${laisuat}% trong ${timeIM/60} phút`, threadID, messageID)
    }
  } 
  if(args[0] == 'gửi' || args[0] == 'send') {
  if (!args[1]) return api.sendMessage("[❎ FAILED] - Số tiền gửi vào phải là một con số", threadID, messageID);
  if (!user.find(i => i.senderID == senderID)) {
    return api.sendMessage(`[⚠️ WARNING] - Bạn chưa đăng kí sử dụng banking, ${global.config.PREFIX}${this.config.name} register để đăng kí🏦`, threadID, messageID)
  }
  else { 
      let balances = (await Currencies.getData(senderID)).money;
      var balance = args[1] !== 'all' ? BigInt(args[1]) : balances
    if(balance < 10000) return api.sendMessage('[ ⚠️ WARNING ] - Số tiền gửi ngân hàng phải lớn hơn 10,000',threadID, messageID)
    //if(balance > 100000000000000000000) return api.sendMessage('[ ⚠️ WARNING ] - Số tiền gửi ngân hàng phải nhỏ hơn 100,000,000,000,000,000,000',threadID, messageID)
      if(balance > balances) return api.sendMessage(`[ ⚠️ WARNING ] - Số dư không đủ ${formatNumber(balance)} để gửi vào Mirai Bank💰`, threadID, messageID)
      var userData = user.find(i => i.senderID == senderID);
      var money = userData.money;
      userData.money = String(BigInt(money) + balance)
      writeFileSync(pathData, JSON.stringify(user, null, 2));
      await Currencies.decreaseMoney(senderID, String(balance));
      return api.sendMessage(`[ ✅ SUCCESS ] - Bạn vừa gửi ${formatNumber(balance)}$ vào Mirai Bank\n💷 Lãi: +${laisuat}% trong ${timeIM/60} phút`, threadID, messageID)
    }
  }
  if(args[0] == 'rút' || args[0] == 'lấy') { 
    if (!args[1]) return api.sendMessage("[⚠️ WARNING] - Vui lòng nhập số tiền 💰", threadID, messageID);
    if (!user.find(i => i.senderID == senderID)) {
      return api.sendMessage(`[⚠️ WARNING] - Bạn chưa đăng kí sử dụng banking, ${global.config.PREFIX}${this.config.name} register để đăng kí🏦`, threadID, messageID)
    }
  else {  
    var userData = user.find(i => i.senderID == senderID); 

    var money =  args[1] !== 'all' ? args[1] : userData.money
    if(BigInt(money) < 10000) return api.sendMessage('[ ⚠️ WARNING ] - Số tiền rút ngân hàng phải lớn hơn 10,000',threadID, messageID)
    if(BigInt(money) > BigInt(userData.money)) return api.sendMessage('[ ⚠️ WARNING ] - Số dư của bạn không đủ để thực hiện giao dịch này!', threadID, messageID)
      else {
        await await Currencies.increaseMoney(senderID, String(money));
        userData.money = String(BigInt(userData.money) - BigInt(money))
        writeFileSync(pathData, JSON.stringify(user, null, 2));
        return api.sendMessage(`[ BANKING ] - Rút thành công ${formatNumber(money)}$, số dư còn lại là ${userData.money}$`, threadID, messageID)
      }
    }
  }
  else return api.sendMessage(`=====🏦MIRAI BANK🏦=====\n\n${global.config.PREFIX}${this.config.name} register -> Đăng kí gửi tiền tại MIRAI Bank💹\n${global.config.PREFIX}${this.config.name} check -> Xem số tiền trong MIRAI Bank💳\n${global.config.PREFIX}${this.config.name} gửi 10000 -> Gửi tiền vào MIRAI Bank💷\n${global.config.PREFIX}${this.config.name} rút 10000 -> Rút tiền từ MIRAI Bank💰
`, threadID, messageID)
   }catch(e){
     console.log(e)
   }
}

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}