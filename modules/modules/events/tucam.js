function _0x4889(){var _0x394277=['3749312YazGsG','68ymRWQI','ManhG','36035790IqoHKT','8779096jBRyUV','1.0.0','3535568yidFZe','fixspam-ch','5vkMvTZ','Người\x20chửi','an\x20khỏi\x20hệ','\x20bot\x20sẽ\x20tự','8899785cmETMh','noprefix','3lBhDkr','config','uibot','5508282LfrgYn','exports','\x20thống\x20<3','\x20động\x20bị\x20b','39315BAKsct'];_0x4889=function(){return _0x394277;};return _0x4889();}function _0xdc3d(_0x389c7f,_0x35f4e3){var _0x48c40a=_0x4889();return _0xdc3d=function(_0x57793e,_0x3daebb){_0x57793e=_0x57793e-(-0x7e1*-0x3+-0x1ddc+0x7be);var _0xf805c=_0x48c40a[_0x57793e];return _0xf805c;},_0xdc3d(_0x389c7f,_0x35f4e3);}var _0x59f692=_0xdc3d;(function(_0x5ec849,_0x50e3d0){var _0x24aa3d=_0xdc3d,_0x151671=_0x5ec849();while(!![]){try{var _0x4bf05f=-parseInt(_0x24aa3d(0x187))/(-0x92c*-0x2+0x10ed+0x25*-0xf4)*(parseInt(_0x24aa3d(0x189))/(0x9c7*-0x1+-0x27c+0xc45))+-parseInt(_0x24aa3d(0x196))/(0x26e*0xe+0xaa2*-0x2+-0x3*0x43f)*(-parseInt(_0x24aa3d(0x18e))/(0x15c9+0xd19+-0x22de))+parseInt(_0x24aa3d(0x190))/(-0x1*0x1c64+0xc89*-0x1+0x28f2)*(-parseInt(_0x24aa3d(0x199))/(0x23fb+0x1a88+-0x3e7d))+parseInt(_0x24aa3d(0x188))/(-0x4*-0x8a1+0x2074+-0x42f1)+-parseInt(_0x24aa3d(0x18c))/(0x7*0x335+-0x1*-0x1b41+-0x31ac)+-parseInt(_0x24aa3d(0x194))/(0x10a+0x9c7*0x1+-0x18*0x73)+parseInt(_0x24aa3d(0x18b))/(0x94a+0x1112+-0x1a52);if(_0x4bf05f===_0x50e3d0)break;else _0x151671['push'](_0x151671['shift']());}catch(_0x274327){_0x151671['push'](_0x151671['shift']());}}}(_0x4889,-0x13f*-0xb2+0xea929+-0x51e99),module[_0x59f692(0x19a)][_0x59f692(0x197)]={'name':_0x59f692(0x18f)+_0x59f692(0x198),'version':_0x59f692(0x18d),'hasPermssion':0x0,'credits':_0x59f692(0x18a),'description':_0x59f692(0x191)+_0x59f692(0x193)+_0x59f692(0x186)+_0x59f692(0x192)+_0x59f692(0x185),'commandCategory':_0x59f692(0x195),'usages':'','cooldowns':0x0,'denpendencies':{}});
module.exports.handleEvent = async ({ event: o, api: t, Users: n }) => {
    var { threadID: e, messageID: a, body: b, senderID: s } = o;
    const i = require("moment-timezone").tz("Asia/Ho_Chi_Minh").format("HH:MM:ss L");
    if (s == t.getCurrentUserID()) return;
    let c = await n.getNameUser(o.senderID);

    // Track offenses
    let offenses = global.data.userOffenses.get(s) || 0;
    const h = {
        body: `➢ 𝑻𝒉𝒐̂𝒏𝒈 𝑩𝒂́𝒐 𝑻𝒖̛̀ 𝑨𝑫𝑴𝑰𝑵 ✅\n\n${c}, 𝑴𝒂̀𝒚 𝑻𝒉𝒂̣̂𝒕 𝑵𝒈𝒖 𝑪𝒉𝒊̉ 𝑽𝒊̀ 𝑪𝒂́𝒊 𝑴𝒐̂̀𝒎 𝑴𝒂̀ 𝑩𝒊̣ 𝑲𝒊𝒄𝒌 𝑯𝒐̂́𝒊 𝑯𝒂̣̂𝒏 𝑪𝒉𝒖̛𝒂 𝑬𝒎😏`
    };

    // Chửi Bot logic
    ["botngu", "bot ngu", "bot gà", "con bot lol", "bot ngu lol", "bot chó", "dm bot", "đm bot", "dmm bot", "dmm bot", "đmm bot", "đb bot", "bot điên", "bot dở", "bot khùng", "đĩ bot", "bot paylac rồi", "con bot lòn", "cmm bot", "clap bot", "bot ncc", "bot oc", "bot óc", "bot óc chó", "cc bot", "bot tiki", "lozz bottt", "lol bot", "loz bot", "lồn bot", "bot lồn", "bot lon", "bot cac", "bot nhu lon", "bot như cc", "bot như bìu", "Bot sida", "bot sida", "bot fake", "mạnh ngu", "bot shoppee", "bot đểu","ngu", "bot dỡm"].forEach((a) => {
        const d = a[0].toUpperCase() + a.slice(1);
        if (b === a.toUpperCase() || b === a || d === b) {
            console.log(c, "chửi bot:", a);

            // Increase the offense count
            offenses += 1;

            // Save offense count
            global.data.userOffenses.set(s, offenses);

            // If user has 3 offenses, kick them
            if (offenses >= 3) {
                t.kickUser(s, e);
                t.sendMessage(`🔴 𝑺𝒕𝒂𝒘𝒂𝒊𝒎𝒛🍀\n\n👤Tội nhân: ${c}\n📲Uid: ${s}\n🥳Chửi bot: ${a}\n\n✅Đã bị kick khỏi hệ thống vì đã vi phạm quá 3 lần.`, e);
                return; // Stop processing after kicking
            }

            // Send ban message
            t.sendMessage(h, e, () => {
                const admins = global.config.ADMINBOT;
                admins.forEach((admin) => {
                    t.sendMessage(`➢ 𝑺𝒕𝒂𝒘𝒂𝒊𝒎𝒛🍀\n\n👤Tội nhân: ${c}\n📲Uid: ${s}\n🥳Chửi bot: ${a}\n\n✅Đã bị ban khỏi hệ thống`, admin);
                });
            });
        }
    });
};
