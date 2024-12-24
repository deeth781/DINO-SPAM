module.exports.config = {
  name: "timejoin",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Judas",
  description: "",
  commandCategory: "Quản Lí Box",
  usages: "",
  cooldowns: 3,
  dependencies: {
    canvas: "",
    axios: "",
    "fs-extra": "",
  },
};
module.exports.circle = async (image) => {
  const jimp = global.nodemodule["jimp"];
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}
module.exports.handleEvent = async function({ event, api, models, Users, Threads, Currencies }) {
     var get = require("moment-timezone").tz("Asia/Ho_Chi_Minh"),
        gio = get.format("HH:mm:ss"),
        ngay = get.format("YYYY-MM-D"),
        burh = get.format("D/MM/YYYY");
    const { join } = require("path")
   const { threadID, senderID } = event;
   const { readFileSync, writeFileSync, existsSync } = require("fs-extra");
    const pathxData = join(__dirname, "cache", "timejoin", threadID + ".json");
    if (!existsSync(pathxData)) writeFileSync(pathxData, "[]", "utf-8");
    var dataJson = JSON.parse(readFileSync(pathxData, "utf-8"));
  //if(dataJson.find(i => i.senderID == senderID)) return
    if(!dataJson.find(i => i.senderID == senderID)){
      const resname = (await Users.getData(senderID)).name
        var data = {
            senderID, opt : {
          name: resname ,
                gio: gio,
                ngay: ngay,
                burh: burh
            }
        }
        dataJson.push(data)
writeFileSync(pathxData, JSON.stringify(dataJson, null, 4), "utf-8");
    }
}
module.exports.run = async function({ api, event, args, getText, Users, Threads, Currencies }) {
 
  const { loadImage, createCanvas } = require("canvas");
  const request = require('request');
  const fs = global.nodemodule["fs-extra"];
 
  const axios = global.nodemodule["axios"];
  const Canvas = global.nodemodule["canvas"];
  let pathImg = __dirname + `/cache/1.png`;
  let pathAvata = __dirname + `/cache/2.png`;
  
     const { join } = require("path")
   const { threadID, senderID, messageID, mentions ,messageReply, type} = event;
   const { readFileSync, writeFileSync, existsSync } = require("fs-extra");
    const pathxData = join(__dirname, "cache", "timejoin", threadID + ".json");
    if (!existsSync(pathxData)) writeFileSync(pathxData, "[]", "utf-8");
    var dataJson = JSON.parse(readFileSync(pathxData, "utf-8"));
  
    if(!args[0]){
       let targetID = senderID;
    if (type == 'message_reply') {
        targetID = messageReply.senderID;
    } else if (Object.keys(mentions).length == 1) {
        targetID = Object.keys(mentions)[0];
    }

 if(!dataJson.find(i => i.senderID == senderID)){
      const resname = (await Users.getData(senderID)).name
        var data = {
            senderID, opt : {
          name: resname ,
                gio: gio,
                ngay: ngay,
                burh: burh
            }
        }
        dataJson.push(data)
writeFileSync(pathxData, JSON.stringify(dataJson, null, 4), "utf-8");
    }
      
      
        const user = dataJson.find(item => item.senderID == targetID) 

let ThreadInfo = await api.getThreadInfo(threadID),
        ThreadNames = ThreadInfo.threadName,
        timeN = user.opt.ngay,
        timeG = user.opt.gio;
    var gn1 = new Date(`${timeN} ${timeG}`),
        gn2 = new Date(),
        gn3 = gn1.getTime(),
        gn4 = gn2.getTime(),
        get_Ngay = Math.ceil((gn4 - gn3) / (24 * 60 * 60 * 1000));
 
 let getAvatarOne = (await axios.get(`https://graph.facebook.com/${user.senderID}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  let bg = (
    await axios.get(encodeURI(`https://i.imgur.com/8UaB48J.png`), {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
  avataruser = await this.circle(pathAvata);
  fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));
      /*-----------------download----------------------*/
if(!fs.existsSync(__dirname+`/cache/data/Play-Bold.ttf`)) { 
      let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=1uni8AiYk7prdrC7hgAmezaGTMH5R8gW8&export=download`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+`/cache/data/Play-Bold.ttf`, Buffer.from(getfont, "utf-8"));
    };
/*---------------------------------------------*/

      
  let baseImage = await loadImage(pathImg);
  let baseAvata = await loadImage(avataruser);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseAvata, 80, 73, 285, 285);
    
  Canvas.registerFont(__dirname+`/cache/Play-Bold.ttf`, {
        family: "Play-Bold"
    });
  ctx.font = `28px Play-Bold`;
  ctx.fillStyle = "#00FFFF";
  ctx.textAlign = "start";
  fontSize = 20;
  ctx.fillText(`» Box Name: ${ThreadNames}`, 455, 172);
  ctx.fillText(`» Name: ${user.opt.name}`, 455, 224);
  ctx.fillText(`» Uid: ${user.senderID}`, 455, 276);
  ctx.fillText(`» Time Join:  ${user.opt.gio}`, 455, 328);
  ctx.fillText(`» Ngày Join: ${user.opt.burh}`, 455, 380);
  ctx.fillText(`» Số ngày: ${get_Ngay}`, 455, 432);
 
  ctx.font = `20px Play-Bold`;
  ctx.fillStyle = "#00FF33";
  ctx.textAlign = "start";
  fontSize = 20;  
  ctx.fillText(`» Profile: https://www.facebook.com/profile.php?id=${user.senderID}`, 19, 468);
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  fs.removeSync(pathAvata);
  
  return api.sendMessage(
    { attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
    }
    else if(Object.keys(event.mentions).length == 1){
        var mention = Object.keys(mentions)[0];
      //api.sendMessage(mention , event.threadID)
    /*  if(!dataJson.find(i => i.senderID == mentions)){
      const resname = (await Users.getData(mentions)).name
        var data = {
            mentions, opt : {
          name: resname ,
                gio: gio,
                ngay: ngay,
                burh: burh
            }
        }
        dataJson.push(data)
writeFileSync(pathxData, JSON.stringify(dataJson, null, 4), "utf-8");
    }*/
          const user = dataJson.find(item => item.senderID == mention) 
        let ThreadInfo = await api.getThreadInfo(threadID),
        ThreadNames = ThreadInfo.threadName,
        timeN = user.opt.ngay,
        timeG = user.opt.gio;
    var gn1 = new Date(`${timeN} ${timeG}`),
        gn2 = new Date(),
        gn3 = gn1.getTime(),
        gn4 = gn2.getTime(),
        get_Ngay = Math.ceil((gn4 - gn3) / (24 * 60 * 60 * 1000));
 
 let getAvatarOne = (await axios.get(`https://graph.facebook.com/${user.senderID}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  let bg = (
    await axios.get(encodeURI(`https://i.imgur.com/8UaB48J.png`), {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
  avataruser = await this.circle(pathAvata);
  fs.writeFileSync(pathImg, Buffer.from(bg, "utf-8"));
      /*-----------------download----------------------*/
if(!fs.existsSync(__dirname+`/cache/data/Play-Bold.ttf`)) { 
      let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=1uni8AiYk7prdrC7hgAmezaGTMH5R8gW8&export=download`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+`/cache/data/Play-Bold.ttf`, Buffer.from(getfont, "utf-8"));
    };
/*---------------------------------------------*/

      
  let baseImage = await loadImage(pathImg);
  let baseAvata = await loadImage(avataruser);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseAvata, 80, 73, 285, 285);
    
  Canvas.registerFont(__dirname+`/cache/data/Play-Bold.ttf`, {
        family: "Play-Bold"
    });
  ctx.font = `28px Play-Bold`;
  ctx.fillStyle = "#00FFFF";
  ctx.textAlign = "start";
  fontSize = 20;
  ctx.fillText(`» Box Name: ${ThreadNames}`, 455, 172);
  ctx.fillText(`» Name: ${user.opt.name}`, 455, 224);
  ctx.fillText(`» Uid: ${user.senderID}`, 455, 276);
  ctx.fillText(`» Time Join:  ${user.opt.gio}`, 455, 328);
  ctx.fillText(`» Ngày Join: ${user.opt.burh}`, 455, 380);
  ctx.fillText(`» Số ngày: ${get_Ngay}`, 455, 432);
 
  ctx.font = `20px Play-Bold`;
  ctx.fillStyle = "#00FF33";
  ctx.textAlign = "start";
  fontSize = 20;  
  ctx.fillText(`» Profile: https://www.facebook.com/profile.php?id=${user.senderID}`, 19, 468);
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  fs.removeSync(pathAvata);
  
  return api.sendMessage(
    { attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
    }
    else if(args[0] == "all"){
        var msg = ""
        for(i in dataJson){
         msg +=  `\n\nName: ${dataJson[i].opt.name}\nUid: ${dataJson[i].senderID}\nTime Join: ${dataJson[i].opt.gio} • [${dataJson[i].opt.ngay}]`
        }
    return api.sendMessage(msg, threadID,messageID)
    }
}