module.exports.config = {
name: "dịch",
version: "1.0.1",
hasPermssion: 0,
credits: "Mirai Team",
escription: "dịch",
commandCategory: "Công cụ",
usages: "[Dịch tất cả ngôn ngữ] [Text]",
cooldowns: 5,
dependencies: {
"request":  ""
}
};

module.exports.run = async ({ api, event, args }) => {
const request = global.nodemodule["request"];
var content = args.join(" ");
if (content.length == 0 && event.type != "message_reply") return global.utils.throwError(this.config.name, event.threadID,event.messageID);
var translateThis = content.slice(0, content.indexOf(" ->"));
var lang = content.substring(content.indexOf(" -> ") + 4);
if (event.type == "message_reply") {
translateThis = event.messageReply.body
if (content.indexOf("-> ") !== -1) lang = content.substring(content.indexOf("-> ") + 3);
else lang = global.config.language;
}
else if (content.indexOf(" -> ") == -1) {
translateThis = content.slice(0, content.length)
lang = global.config.language;
}
return request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${translateThis}`), (err, response, body) => {
if (err) return api.sendMessage("⚠️Đ𝙖̃ 𝙨𝙖̉𝙮 𝙧𝙖 𝙡𝙤̂̃𝙞 𝙫𝙚̂̀ 𝙡𝙚̣̂𝙣𝙝 𝙢𝙖̀ 𝙗𝙖̣𝙣 đ𝙖𝙣𝙜 𝙨𝙪̛̉ 𝙙𝙪̣𝙣𝙜 𝙫𝙪𝙞 𝙡𝙤̀𝙣𝙜 𝙨𝙪̛̉ 𝙙𝙪̣𝙣𝙜 đ𝙤𝙖̣𝙣 𝙩𝙞𝙣 𝙣𝙝𝙖̆́𝙣 𝙠𝙝𝙖́𝙘", event.threadID, event.messageID);
var retrieve = JSON.parse(body);
var text = '';
retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');
var fromLang = (retrieve[2] === retrieve[8][0][0]) ? retrieve[2] : retrieve[8][0][0]
api.sendMessage(`${text}`, event.threadID, event.messageID);
});
}