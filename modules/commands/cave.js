/*
@credit Trankhuong
@chỉnh sửa credit cái con cặc
*/
const fs = require("fs");
module.exports.config = {
    name: "cavev3",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Trankhuong dz",
    description: "Làm cave random quốc gia",
    commandCategory: "Kiếm money",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 60
    },
    denpendencies: {
        "fs": "",
        "request": ""
}
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/cache/`;
    if (!fs.existsSync(dirMaterial + "cache")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "cave.jpg")) request("https://i.imgur.com/bSFfTQR.jpg").pipe(fs.createWriteStream(dirMaterial + "cave.jpg"));
}
module.exports.handleReply = async ({
    event:e,
    api,
    handleReply,
    Currencies }) => {
    const { threadID, messageID, senderID } = e;
    let data = (await Currencies.getData(senderID)).data || {};
if (handleReply.author != e.senderID)
return api.sendMessage("⚡𝑨𝒊 𝒄𝒉𝒐̣𝒏 𝒍𝒂̀𝒎 𝒄𝒂𝒗𝒆 𝒕𝒉𝒊̀ 𝒏𝒈𝒖̛𝒐̛̀𝒊 đ𝒐́ 𝒕𝒖̛̣ 𝒂̂́𝒏 𝒍𝒂̀𝒎 𝒏𝒉𝒂!", e.threadID, e.messageID)

var a = Math.floor(Math.random() * 100) + 90;
var b = Math.floor(Math.random() * 100) + 80;
var c = Math.floor(Math.random() * 100) + 70;
var x = Math.floor(Math.random() * 100) + 60;
var y = Math.floor(Math.random() * 100) + 50;
var f = Math.floor(Math.random() * 100) + 40;

  var msg = "";
    switch(handleReply.type) {
        case "choosee": {
            var t = Date.parse("") - Date.parse(new Date()),
            m = Math.floor( (t/00/60) % 60 ),
            h = Math.floor( (t/(00*60*60)) % 24 ),
            d = Math.floor( t/(00*60*60*24) );

            switch(e.body) {
                case "1": msg = `🇻🇳 𝑩𝒂̣𝒏 𝒗𝒖̛̀𝒂 𝒍𝒂̀𝒎 𝒄𝒂𝒗𝒆 𝒐̛̉ 𝑽𝒊𝒆̣̂𝒕 𝑵𝒂𝒎 𝒗𝒂̀ đ𝒖̛𝒐̛̣𝒄 𝒂𝒏𝒉 đ𝒆̣𝒑 𝒕𝒓𝒂𝒊 𝒕𝒓𝒂̉ ${a}.𝑽𝑵𝑫`;
                await Currencies.increaseMoney(e.senderID, parseInt(a));
                break;            
                case "2": msg = `🇨🇳 𝑩𝒂̣𝒏 𝒗𝒖̛̀𝒂 𝒍𝒂̀𝒎 𝒄𝒂𝒗𝒆 𝒐̛̉ 𝒏𝒖̛𝒐̛́𝒄 𝑻𝒓𝒖𝒏𝒈 𝑸𝒖𝒐̂́𝒄 𝒗𝒂̀ đ𝒖̛𝒐̛̣𝒄 𝒎𝒂̂́𝒚 𝒆𝒎 𝒏𝒈𝒐̣𝒕 𝒏𝒖̛𝒐̛́𝒄 𝒕𝒓𝒂̉ ${b}.𝑻𝒆̣̂`;
                await Currencies.increaseMoney(e.senderID, parseInt(b));
                break;
                case "3": msg = `🇯🇵 𝑩𝒂̣𝒏 𝒗𝒖̛̀𝒂 𝒍𝒂̀𝒎 𝒄𝒂𝒗𝒆 𝒐̛̉ 𝒏𝒖̛𝒐̛́𝒄 𝑵𝒉𝒂̣̂𝒕 𝒗𝒂̀ đ𝒖̛𝒐̛̣𝒄 𝒎𝒂̂́𝒚 𝒃𝒆́ 𝒈𝒂́𝒊 𝒎𝒐̛́𝒊 𝒍𝒐̛́𝒏 𝒕𝒓𝒂̉ ${c}.𝒀𝒆̂𝒏`;
                await Currencies.increaseMoney(e.senderID, parseInt(c));
                break;
                case "4": msg = `🇹🇭 𝑩𝒂̣𝒏 𝒗𝒖̛̀𝒂 𝒍𝒂̀𝒎 𝒄𝒂𝒗𝒆 𝒐̛̉ 𝒏𝒖̛𝒐̛́𝒄 𝑻𝒉𝒂́𝒊 𝑳𝒂𝒏 𝒗𝒂̀ đ𝒖̛𝒐̛̣𝒄 𝒎𝒂̂́𝒚 𝒂𝒏𝒉 𝒃𝒆̂đ𝒆̂ 𝒕𝒓𝒂̉ ${x}.𝑩𝒂̣𝒕`;
                await Currencies.increaseMoney(e.senderID, parseInt(x));
                break;
                case "5": msg = `🇺🇸 𝑩𝒂̣𝒏 𝒗𝒖̛̀𝒂 𝒍𝒂̀𝒎 𝒄𝒂𝒗𝒆 𝒐̛̉ 𝒏𝒖̛𝒐̛́𝒄 𝑴𝒚̃ 𝒗𝒂̀ đ𝒖̛𝒐̛̣𝒄 𝒎𝒂̂́𝒚 𝒂𝒏𝒉 𝒄𝒊𝒖 𝒕𝒐 𝒅𝒂 đ𝒆𝒏 𝒕𝒓𝒂̉ ${y}.Đ𝒐̂`;
                await Currencies.increaseMoney(e.senderID, parseInt(y));
                break;
                case "6": msg = `🇰🇭 𝑩𝒂̣𝒏 𝒗𝒖̛̀𝒂 𝒍𝒂̀𝒎 𝒄𝒂𝒗𝒆 𝒐̛̉ 𝒏𝒖̛𝒐̛́𝒄 𝑪𝒂𝒎𝒑𝒖𝒄𝒉𝒊𝒂 𝒗𝒂̀ đ𝒖̛𝒐̛̣𝒄 𝒎𝒂̂́𝒚 𝒐̂𝒏𝒈 𝒏𝒐̣̂𝒊 𝒕𝒓𝒂̉ ${f}.𝑹𝒊𝒆𝒍`;
                await Currencies.increaseMoney(e.senderID, parseInt(f));
                break;
                default: break;
            };
            const choose = parseInt(e.body);
            if (isNaN(e.body))
            return api.sendMessage("⚡𝑩𝒂̣𝒏 𝒎𝒖𝒐̂́𝒏 𝒍𝒂̀𝒎 𝒄𝒂𝒗𝒆 𝒐̛̉ 𝒒𝒖𝒐̂́𝒄 𝒈𝒊𝒂 𝒏𝒂̀𝒐 𝒕𝒉𝒊̀ 𝒄𝒉𝒐̣𝒏 𝒕𝒉𝒆𝒐 𝒔𝒐̂́ 𝒐̛̉ 𝒒𝒖𝒐̂́𝒄 𝒈𝒊𝒂 đ𝒐́!", e.threadID, e.messageID);
            if (choose > 6 || choose < 1)
            return api.sendMessage("⚡𝑸𝒖𝒐̂́𝒄 𝒈𝒊𝒂 𝒎𝒂̀ 𝒃𝒂̣𝒏 𝒄𝒉𝒐̣𝒏 𝒉𝒊𝒆̣̂𝒏 𝒕𝒂̣𝒊 𝒌𝒉𝒐̂𝒏𝒈 𝒄𝒐́ 𝒕𝒓𝒐𝒏𝒈 𝒅𝒂𝒏𝒉 𝒔𝒂́𝒄𝒉 𝒄𝒂𝒗𝒆!", e.threadID, e.messageID);
            api.unsendMessage(handleReply.messageID);
            if (msg == "...") {
                msg = "...";
            };
            return api.sendMessage(`${msg}`, threadID, async () => {
            data.work2Time = Date.now();
            await Currencies.setData(senderID, { data });

        });

    };
}
}


module.exports.run = async ({ 
    event:e,
    api,
    handleReply,
    Currencies }) => {
    const { threadID, messageID, senderID } = e;
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    var   t = Date.parse("") - Date.parse(new Date()),
    d = Math.floor( t/(10*60*00) ),
    h = Math.floor( (t/(10*60*00)) % 00 ),
    m = Math.floor( (t/10/60) % 00 );

    if (typeof data !== "undefined" && cooldown - (Date.now() - data.work2Time) > 0) {

        var time = cooldown - (Date.now() - data.work2Time),
            hours = Math.floor((time / (10* 60 ))/00),
            minutes = Math.floor(time / 10),
            seconds = ((time % 30) / 00).toFixed(0);
        return api.sendMessage(`⚡𝑩𝒂̣𝒏 𝒗𝒖̛̀𝒂 𝒍𝒂̀𝒎 𝒄𝒂𝒗𝒆 𝒙𝒐𝒏𝒈 𝒏𝒈𝒉𝒊̉ 𝒏𝒈𝒐̛𝒊 𝒅𝒖̛𝒐̛̃𝒏𝒈 𝒔𝒖̛́𝒄 đ𝒊!`, e.threadID, e.messageID);
    }
    else {   
        var msg = {
            body: "========== 𝑪𝒂𝑽𝒆 =========="+`\n`+
                "\n1 ≻ 🇻🇳 𝑽𝒊𝒆̣̂𝒕 𝑵𝒂𝒎" +
                "\n2 ≻ 🇨🇳 𝑻𝒓𝒖𝒏𝒈 𝑸𝒖𝒐̂́𝒄" +
                "\n3 ≻ 🇯🇵 𝑵𝒉𝒂̣̂𝒕 𝑩𝒂̉𝒏" +
                "\n4 ≻ 🇹🇭 𝑻𝒉𝒂́𝒊 𝑳𝒂𝒏" +
                "\n5 ≻ 🇺🇸 𝑴𝒚̃" +
                "\n6 ≻ 🇰🇭 𝑪𝒂𝒎𝒑𝒖𝒄𝒉𝒊𝒂" +
                `\n\n📌𝑹𝒆𝒑𝒍𝒚 𝒕𝒊𝒏 𝒏𝒉𝒂̆́𝒏 𝒏𝒂̀𝒚 𝒕𝒉𝒆𝒐 𝒔𝒐̂́ đ𝒆̂̉ 𝒄𝒉𝒐̣𝒏 𝒒𝒖𝒐̂́𝒄 𝒈𝒊𝒂 𝒍𝒂̀𝒎 𝒄𝒂𝒗𝒆!`,
                attachment: fs.createReadStream(__dirname + `/cache/cave.jpg`)}
                return api.sendMessage(msg,e.threadID,  (error, info) => {
                data.work2Time = Date.now();
        global.client.handleReply.push({
            type: "choosee",
            name: this.config.name,
            author: e.senderID,
            messageID: info.messageID
          }) 
        })
    }
} 