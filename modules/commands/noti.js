const fs = require('fs');
const request = require('request');

module.exports.config = {
    name: "noti",
    version: "1.0.0",
    hasPermssion: 3,
    credits: "TruongMini",
    description: "Thông báo cho các nhóm",
    commandCategory: "Hệ Thống",
    usages: "noti [msg]",
    cooldowns: 5,
}

let atmDir = [];

const getAtm = (atm, body) => new Promise(async (resolve) => {
    let msg = {}, attachment = [];
    msg.body = body;
    for(let eachAtm of atm) {
        await new Promise(async (resolve) => {
            try {
                let response =  await request.get(eachAtm.url),
                    pathName = response.uri.pathname,
                    ext = pathName.substring(pathName.lastIndexOf(".") + 1),
                    path = __dirname + `/cache/${eachAtm.filename}.${ext}`
                response
                    .pipe(fs.createWriteStream(path))
                    .on("close", () => {
                        attachment.push(fs.createReadStream(path));
                        atmDir.push(path);
                        resolve();
                    })
            } catch(e) { console.log(e); }
        })
    }
    msg.attachment = attachment;
    resolve(msg);
})

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads }) {
    const { threadID, messageID, senderID, body } = event;
    let name = await Users.getNameUser(senderID);
    switch (handleReply.type) {
        case "noti": {
            let text = `[📝] Nội dung : ${body}\n『 🌸 』 Từ ${name}  nhóm ${(await Threads.getInfo(threadID)).threadName || "Unknow"}`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `[📝] Nội dung: ${body}\n『 🌸 』 Từ ${name} Trong nhóm ${(await Threads.getInfo(threadID)).threadName || "Unknow"}`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "reply",
                    messageID: info.messageID,
                    messID: messageID,
                    threadID
                })
            });
            break;
        }
        case "reply": {
            let text = `[📝] Nội dung : ${body}\n『 🌸 』 Từ ${name} With Love!\nreply tin nhắn này để báo về admin`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `[❗] ${body}\n\n『 🌸 』 From ${name} With Love!\nreply tin nhắn này để báo về admin`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "noti",
                    messageID: info.messageID,
                    threadID
                })
            }, handleReply.messID);
            break;
        }
    }
}

module.exports.run = async function ({ api, event, args, Users }) {
    const { threadID, messageID, senderID, messageReply } = event;
  //if (event.senderID != 100033478361032) return api.sendMessage(`???`, event.threadID, event.messageID)
    if (!args[0]) return api.sendMessage("『 🌸 』 Please input message", threadID);
    let allThread = global.data.allThreadID || [];
    let can = 0, canNot = 0;
    let text = `[📝] Nội dung : ${args.join(" ")}\n『 🌸 』 Từ ${await Users.getNameUser(senderID)} \n[❤️] Reply tin nhắn này để báo về admin`;
    if(event.type == "message_reply") text = await getAtm(messageReply.attachments, `[📝] Nội dung : ${args.join(" ")}\n『 🌸 』 Từ ${await Users.getNameUser(senderID)}\n[❤️] Reply tin nhắn này để báo về admin`);
    await new Promise(resolve => {
        allThread.forEach((each) => {
            try {
                api.sendMessage(text, each, (err, info) => {
                    if(err) { canNot++; }
                    else {
                        can++;
                        atmDir.forEach(each => fs.unlinkSync(each))
                        atmDir = [];
                        global.client.handleReply.push({
                            name: this.config.name,
                            type: "noti",
                            messageID: info.messageID,
                            messID: messageID,
                            threadID
                        })
                        resolve();
                    }
                })
            } catch(e) { console.log(e) }
        })
    })
    api.sendMessage(`『 🌸 』 Send to ${can} thread, not send to ${canNot} thread`, threadID);
}
