  const coinsup = 5000 //thay số coins được nhận khi đoán trúng
const coinsdown = 3000 //thay số coins bị mất khi yêu cầu gợi ý
const timeUnsend = 1 //thời gian thu hồi tin nhắn sau khi trả lời đúng trong thời gian timeUnsend
const axios = global.nodemodule["axios"];
module.exports.config = {
    name: "dhbc",
    version: "1.2.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Đuổi hình bắt chữ trên chính messenger của bạn!!!",
    commandCategory: "Trò Chơi",
    usages: "[1/2]",
    cooldowns: 10
};


module.exports.handleReply = async function ({
    args,
    event,
    Users,
    api,
    handleReply,
    Currencies
}) {
    var {
        tukhoa,
        suggestions
    } = handleReply;
    switch (handleReply.type) {
    case "choosee": {
        switch (event.body) {
        case "2": {
            api.unsendMessage(handleReply.messageID);
            const res = await axios.get(`https://raw.githubusercontent.com/TuanDeepTry-14072003/API/mainV2/data.json`);
            const length1 = res.data.doanhinh.length
            const dataGame = res.data.doanhinh[Math.floor(Math.random() * length1)]
            const tukhoadung = dataGame.tukhoa;
            const suggestions = dataGame.suggestions
            const fs = global.nodemodule["fs-extra"];
            const sokitu = dataGame.sokitu;
            const anh1 = dataGame.link1
            const anh2 = dataGame.link2


            let Avatar = (await axios.get(anh1, {
                responseType: "arraybuffer"
            })).data;
            fs.writeFileSync(__dirname + "/cache/anh1.png", Buffer.from(Avatar, "utf-8"));
            let Avatar2 = (await axios.get(anh2, {
                responseType: "arraybuffer"
            })).data;
            fs.writeFileSync(__dirname + "/cache/anh2.png", Buffer.from(Avatar2, "utf-8"));
            var imglove = [];
            imglove.push(fs.createReadStream(__dirname + "/cache/anh1.png"));
            imglove.push(fs.createReadStream(__dirname + "/cache/anh2.png"));

            var msg = {
                body: `🌸 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗿𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝘃𝗮̀ 𝘁𝗿𝗮̉ 𝗹𝗼̛̀𝗶:\n𝗚𝗼̛̣𝗶 𝘆́: ${sokitu}\n\n🌸 𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝘃𝗮̀ 𝗻𝗵𝗮̣̂𝗽 "𝗚𝗼̛̣𝗶 𝘆́" - 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝘅𝗲𝗺 𝗴𝗼̛̣𝗶 𝘆́ 𝟮 (-${coinsdown}$)`,
                attachment: imglove
            }
            return api.sendMessage(msg, event.threadID, (error, info) => {
                global.client.handleReply.push({
                    type: "reply",
                    name: this.config.name,
                    author: event.senderID,
                    messageID: info.messageID,
                    tukhoa: tukhoadung,
                    suggestions: suggestions
                })
            })
        }
        case "1": {
            api.unsendMessage(handleReply.messageID);
            const res = await axios.get(`https://raw.githubusercontent.com/TuanDeepTry-14072003/API/mainV2/data2.json`);
            const length2 = res.data.doanhinh.length
            const dataGame = res.data.doanhinh[Math.floor(Math.random() * length2)]
            const tukhoadung = dataGame.tukhoa;
            const suggestions = dataGame.suggestions
            const fs = global.nodemodule["fs-extra"];
            const sokitu = dataGame.sokitu;
            const anh1 = dataGame.link


            let Avatar = (await axios.get(anh1, {
                responseType: "arraybuffer"
            })).data;
            fs.writeFileSync(__dirname + "/cache/anh1.png", Buffer.from(Avatar, "utf-8"));
            var imglove = [];
            imglove.push(fs.createReadStream(__dirname + "/cache/anh1.png"));

            var msg = {
                body: `🌸 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗿𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝘃𝗮̀ 𝘁𝗿𝗮̉ 𝗹𝗼̛̀𝗶:\n𝗚𝗼̛̣𝗶 𝘆́: ${sokitu}\n\n🌸 𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝘃𝗮̀ 𝗻𝗵𝗮̣̂𝗽 "𝗚𝗼̛̣𝗶 𝘆́" - 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝘅𝗲𝗺 𝗴𝗼̛̣𝗶 𝘆́ 𝟮 (-${coinsdown}$)`,
                attachment: imglove
            }
            return api.sendMessage(msg, event.threadID, (error, info) => {
                global.client.handleReply.push({
                    type: "reply2",
                    name: this.config.name,
                    author: event.senderID,
                    messageID: info.messageID,
                    tukhoa: tukhoadung,
                    suggestions: suggestions
                })
            })
        }
        }
        const choose = parseInt(event.body);
        if (isNaN(event.body)) return api.sendMessage("🌸 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗻𝗵𝗮̣̂𝗽 𝟭 𝗰𝗼𝗻 𝘀𝗼̂́", event.threadID, event.messageID);
        if (choose > 2 || choose < 1) return api.sendMessage("🌸 𝗟𝘂̛̣𝗮 𝗰𝗵𝗼̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗻𝗮̆̀𝗺 𝘁𝗿𝗼𝗻𝗴 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵.", event.threadID, event.messageID)
    }


    case "reply": {
        const dapan = event.body
        if (dapan.toLowerCase() == "gợi ý" ) { 
            let balance = (await Currencies.getData(event.senderID)).money;
            if (coinsdown > balance) return api.sendMessage(`🌸 𝗦𝗼̂́ 𝗱𝘂̛ 𝗯𝗶̣ 𝘁𝗵𝗶𝗲̂́𝘂, 𝗰𝗮̂̀𝗻 ${coinsdown}$ 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝘅𝗲𝗺 𝗴𝗼̛̣𝗶 𝘆́`,event.threadID,event.messageID);
            await Currencies.decreaseMoney(event.senderID, parseInt(coinsdown))
            api.sendMessage(`🌸 𝗚𝗼̛̣𝗶 𝘆́ 𝗰𝗵𝗼 𝗯𝗮̣𝗻 𝗹𝗮̀: \n${suggestions} (-${coinsdown}$)`, event.threadID, event.messageID) 
        }
        else { 
        if (dapan.toLowerCase() == tukhoa) {
            //console.log(suggestions)
            await Currencies.increaseMoney(event.senderID, parseInt(coinsup))
            var name1 = await Users.getData(event.senderID)
            setTimeout(function () {
                api.unsendMessage(handleReply.messageID);
            }, timeUnsend*1000);
            return api.sendMessage(`🌸 ${name1.name} 𝘃𝘂̛̀𝗮 𝘁𝗿𝗮̉ 𝗹𝗼̛̀𝗶 𝗰𝗵𝗶́𝗻𝗵 𝘅𝗮́𝗰\n🌸 𝗞𝗲̂́𝘁 𝗾𝘂𝗮̉: ${tukhoa} (+${coinsup}$)`, event.threadID, event.messageID)
        } else
            return api.sendMessage(`🌸 𝗦𝗮𝗶 𝗿𝗼̂̀𝗶 𝗻𝗵𝗮`, event.threadID, event.messageID)
    }
} ; break;
    case "reply2": {
        const dapan1 = event.body
        if (dapan1.toLowerCase() == "gợi ý") { 
            let balance = (await Currencies.getData(event.senderID)).money;
            if (coinsdown > balance) return api.sendMessage(`𝗦𝗼̂́ 𝗱𝘂̛ 𝗯𝗶̣ 𝘁𝗵𝗶𝗲̂́𝘂, 𝗰𝗮̂̀𝗻 ${coinsdown}$ 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝘅𝗲𝗺 𝗴𝗼̛̣𝗶 𝘆́`,event.threadID,event.messageID);
            await Currencies.decreaseMoney(event.senderID, parseInt(coinsdown))
            api.sendMessage(`🌸 𝗚𝗼̛̣𝗶 𝘆́ 𝗰𝗵𝗼 𝗯𝗮̣𝗻 𝗹𝗮̀: \n${suggestions} (-${coinsdown}$)`, event.threadID, event.messageID) 
        }
            else {

        if (dapan1.toLowerCase() == tukhoa) {
            await Currencies.increaseMoney(event.senderID, parseInt(coinsup))
            var name1 = await Users.getData(event.senderID)
            setTimeout(function () {
                api.unsendMessage(handleReply.messageID);
            }, timeUnsend*1000);
            return api.sendMessage(`🌸 ${name1.name} 𝘃𝘂̛̀𝗮 𝘁𝗿𝗮̉ 𝗹𝗼̛̀𝗶 𝗰𝗵𝗶́𝗻𝗵 𝘅𝗮́𝗰\n🌸 𝗞𝗲̂́𝘁 𝗾𝘂𝗮̉: ${tukhoa} (+${coinsup}$)`, event.threadID, event.messageID)
        } else
            return api.sendMessage(`🌸 𝗦𝗮𝗶 𝗿𝗼̂̀𝗶 𝗻𝗵𝗮`, event.threadID, event.messageID)
}
}
default: break;

}
}

module.exports.run = async function ({
    args,
    api,
    event,
    Users
}) {
    if ((this.config.credits) != "D-Jukie") { return api.sendMessage(`⚡️Phát hiện credits đã bị thay đổi`, event.threadID, event.messageID)}
    if (!args[0]) {
    return api.sendMessage(`💮===== [ 𝗗𝗛𝗕𝗖 ] =====💮\n━━━━━━━━━━━━━\n\n🌸 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗰𝗵𝗼̣𝗻 𝗸𝗶𝗲̂̉𝘂 𝗰𝗵𝗼̛𝗶:\n\n𝟭: 𝗠𝗼̣̂𝘁 𝗮̉𝗻𝗵\n𝟮: 𝗛𝗮𝗶 𝗮̉𝗻𝗵\n\n🌸 𝗛𝗮̃𝘆 𝗿𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝘃𝗮̀ 𝗰𝗵𝗼̣𝗻 𝗻𝗵𝗲́`, event.threadID, (error, info) => {

            global.client.handleReply.push({
                type: "choosee",
                name: this.config.name,
                author: event.senderID,
                messageID: info.messageID
            })
        })
    }
    if (args[0] == '1') {
    //api.unsendMessage(handleReply.messageID);
            const res = await axios.get(`https://raw.githubusercontent.com/TuanDeepTry-14072003/API/mainV2/data2.json`);
            const length2 = res.data.doanhinh.length
            const dataGame = res.data.doanhinh[Math.floor(Math.random() * length2)]
            const tukhoadung = dataGame.tukhoa;
            const suggestions = dataGame.suggestions
            const fs = global.nodemodule["fs-extra"];
            const sokitu = dataGame.sokitu;
            const anh1 = dataGame.link


            let Avatar = (await axios.get(anh1, {
                responseType: "arraybuffer"
            })).data;
            fs.writeFileSync(__dirname + "/cache/anh1.png", Buffer.from(Avatar, "utf-8"));
            var imglove = [];
            imglove.push(fs.createReadStream(__dirname + "/cache/anh1.png"));

            var msg = {
                body: `🌸 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗿𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝘃𝗮̀ 𝘁𝗿𝗮̉ 𝗹𝗼̛̀𝗶:\n𝗚𝗼̛̣𝗶 𝘆́: ${sokitu}\n\n🌸 𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝘃𝗮̀ 𝗻𝗵𝗮̣̂𝗽 "𝗚𝗼̛̣𝗶 𝘆́" - 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝘅𝗲𝗺 𝗴𝗼̛̣𝗶 𝘆́ 𝟮 (-${coinsdown}$)`,
                attachment: imglove
            }
            return api.sendMessage(msg, event.threadID, (error, info) => {
                global.client.handleReply.push({
                    type: "reply2",
                    name: this.config.name,
                    author: event.senderID,
                    messageID: info.messageID,
                    tukhoa: tukhoadung,
                    suggestions: suggestions
                })
            })    
    }
    if (args[0] == '2') {
    //api.unsendMessage(handleReply.messageID);
            const res = await axios.get(`https://raw.githubusercontent.com/TuanDeepTry-14072003/API/mainV2/data2.json`);
            const length1 = res.data.doanhinh.length
            const dataGame = res.data.doanhinh[Math.floor(Math.random() * length1)]
            const tukhoadung = dataGame.tukhoa;
            const suggestions = dataGame.suggestions
            const fs = global.nodemodule["fs-extra"];
            const sokitu = dataGame.sokitu;
            const anh1 = dataGame.link1
            const anh2 = dataGame.link2


            let Avatar = (await axios.get(anh1, {
                responseType: "arraybuffer"
            })).data;
            fs.writeFileSync(__dirname + "/cache/anh1.png", Buffer.from(Avatar, "utf-8"));
            let Avatar2 = (await axios.get(anh2, {
                responseType: "arraybuffer"
            })).data;
            fs.writeFileSync(__dirname + "/cache/anh2.png", Buffer.from(Avatar2, "utf-8"));
            var imglove = [];
            imglove.push(fs.createReadStream(__dirname + "/cache/anh1.png"));
            imglove.push(fs.createReadStream(__dirname + "/cache/anh2.png"));

            var msg = {
                body: `🌸 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗿𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝘃𝗮̀ 𝘁𝗿𝗮̉ 𝗹𝗼̛̀𝗶:\n𝗚𝗼̛̣𝗶 𝘆́: ${sokiu}\n\n🌸 𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝘃𝗮̀ 𝗻𝗵𝗮̣̂𝗽 "𝗚𝗼̛̣𝗶 𝘆́" - 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝘅𝗲𝗺 𝗴𝗼̛̣𝗶 𝘆́ 𝟮 (-${coinsdown}$)`,
                attachment: imglove
            }
            return api.sendMessage(msg, event.threadID, (error, info) => {
                global.client.handleReply.push({
                    type: "reply",
                    name: this.config.name,
                    author: event.senderID,
                    messageID: info.messageID,
                    tukhoa: tukhoadung,
                    suggestions: suggestions
                })
            })    
    }
}