module.exports.config = {
name: "checkrank",
version: "1.0.0",
hasPermssion: 0,
credits: "SenProject",//fix by Qz
description: "check tương tác theo phong cách liên quân",
commandCategory: "Quản Lí Box",
usages: "checktt",
cooldowns: 0,
dependencies: {
"fs-extra": ""
}
}

const path = __dirname + '/tuongtac/checkrank/';

module.exports.onLoad = () => {
    const fs = require('fs');
    if (!fs.existsSync(path) || !fs.statSync(path).isDirectory()) {
        fs.mkdirSync(path, { recursive: true });
const request = require("request");
    const dirMaterial = __dirname + `/Noprefix/`;
    if (!fs.existsSync(dirMaterial + "Noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "checkrank.jpg")) request("https://i.imgur.com/mCM4o7t.jpg ").pipe(fs.createWriteStream(dirMaterial + "checkrank.jpg"));
    }
}

module.exports.handleEvent = function ({ event }) {
    const { messageID, threadID, senderID } = event;
    if (!global.data.allThreadID.some(tid => tid == threadID)) return;
    const fs = global.nodemodule['fs'];
    const threadPath = path + threadID + '.json';
    if (!fs.existsSync(threadPath) || fs.statSync(threadPath).isDirectory()) {
        fs.writeFileSync(threadPath, JSON.stringify({}, null, 4));
    }
    const getThreadJSON = JSON.parse(fs.readFileSync(threadPath)) || {};
    if (!getThreadJSON.hasOwnProperty(senderID)) {
        getThreadJSON[senderID] = 0;
    }
    getThreadJSON[senderID]++;
    fs.writeFileSync(threadPath, JSON.stringify(getThreadJSON, null, 4));
}


const getRankName = count => {
    return count > 4440 ? 'Thách Đấu ( 🏆 )'
    : count > 3440 ? 'Chiến Tướng (🏅)'
    : count > 3240 ? 'Cao Thủ (40 x ⭐)'
    : count > 3040 ? 'Cao Thủ (30 x ⭐)'
    : count > 2840 ? 'Cao Thủ (20 x ⭐)'
    : count > 2640 ? 'Cao Thủ (10 x ⭐)'
    : count > 2440 ? 'Cao Thủ (0 x ⭐)'
    : count > 2240 ? 'Tinh Anh I (⭐⭐⭐⭐⭐)'
    : count > 2220 ? 'Tinh Anh I (⭐⭐⭐⭐)'
    : count > 2200 ? 'Tinh Anh I (⭐⭐⭐)'
    : count > 2180 ? 'Tinh Anh I (⭐⭐)'
    : count > 2160 ? 'Tinh Anh I (⭐)'
    : count > 2140 ? 'Tinh Anh II (⭐⭐⭐⭐⭐)'
    : count > 2120 ? 'Tinh Anh II (⭐⭐⭐⭐)'
    : count > 2100 ? 'Tinh Anh II (⭐⭐⭐)'
    : count > 2080 ? 'Tinh Anh II (⭐⭐)'
    : count > 2060 ? 'Tinh Anh II (⭐)'
    : count > 2040 ? 'Tinh Anh III (⭐⭐⭐⭐⭐)'
    : count > 2020 ? 'Tinh Anh III (⭐⭐⭐⭐)'
    : count > 2000 ? 'Tinh Anh III (⭐⭐⭐)'
    : count > 1980 ? 'Tinh Anh III (⭐⭐)'
    : count > 1960 ? 'Tinh Anh III (⭐)'
    : count > 1940 ? 'Tinh Anh IV (⭐⭐⭐⭐⭐)'
    : count > 1920 ? 'Tinh Anh IV (⭐⭐⭐⭐)'
    : count > 1900 ? 'Tinh Anh IV (⭐⭐⭐)'
    : count > 1880 ? 'Tinh Anh IV (⭐⭐)'
    : count > 1860 ? 'Tinh Anh IV (⭐)'
    : count > 1840 ? 'Tinh Anh V (⭐⭐⭐⭐⭐)'
    : count > 1820 ? 'Tinh Anh V (⭐⭐⭐⭐)'
    : count > 1800 ? 'Tinh Anh V (⭐⭐⭐)'
    : count > 1780 ? 'Tinh Anh V (⭐⭐)'
    : count > 1760 ? 'Tinh Anh V (⭐)'
    : count > 1740 ? 'Kim Cương I (⭐⭐⭐⭐⭐)'
    : count > 1720 ? 'Kim Cương I (⭐⭐⭐⭐)'
    : count > 1700 ? 'Kim Cương I (⭐⭐⭐)'
    : count > 1680 ? 'Kim Cương I (⭐⭐)'
    : count > 1660 ? 'Kim Cương I (⭐)'
    : count > 1640 ? 'Kim Cương II (⭐⭐⭐⭐⭐)'
    : count > 1620 ? 'Kim Cương II (⭐⭐⭐⭐)'
    : count > 1600 ? 'Kim Cương II (⭐⭐⭐)'
    : count > 1580 ? 'Kim Cương II (⭐⭐)'
    : count > 1560 ? 'Kim Cương II (⭐)'
    : count > 1540 ? 'Kim Cương III (⭐⭐⭐⭐⭐)'
    : count > 1520 ? 'Kim Cương III (⭐⭐⭐⭐)'
    : count > 1500 ? 'Kim Cương III (⭐⭐⭐)'
    : count > 1480 ? 'Kim Cương III (⭐⭐)'
    : count > 1460 ? 'Kim Cương III (⭐)'
    : count > 1440 ? 'Kim Cương IV (⭐⭐⭐⭐⭐)'
    : count > 1420 ? 'Kim Cương IV (⭐⭐⭐⭐)'
    : count > 1400 ? 'Kim Cương IV (⭐⭐⭐)'
    : count > 1380 ? 'Kim Cương IV (⭐⭐)'
    : count > 1360 ? 'Kim Cương IV (⭐)'
    : count > 1340 ? 'Kim Cương V (⭐⭐⭐⭐⭐)'
    : count > 1320 ? 'Kim Cương V (⭐⭐⭐⭐)'
    : count > 1300 ? 'Kim Cương V (⭐⭐⭐)'
    : count > 1280 ? 'Kim Cương V (⭐⭐)'
    : count > 1260 ? 'Kim Cương V (⭐)'
    : count > 1240 ? 'Bạch Kim I (⭐⭐⭐⭐⭐)'
    : count > 1220 ? 'Bạch Kim I (⭐⭐⭐⭐)'
    : count > 1200 ? 'Bạch Kim I (⭐⭐⭐)'
    : count > 1180 ? 'Bạch Kim I (⭐⭐)'
    : count > 1160 ? 'Bạch Kim I (⭐)'
    : count > 1140 ? 'Bạch Kim II (⭐⭐⭐⭐⭐)'
    : count > 1120 ? 'Bạch Kim II (⭐⭐⭐⭐)'
    : count > 1100 ? 'Bạch Kim II (⭐⭐⭐)'
    : count > 1080 ? 'Bạch Kim II (⭐⭐)'
    : count > 1060 ? 'Bạch Kim II (⭐)'
    : count > 1040 ? 'Bạch Kim III (⭐⭐⭐⭐⭐)'
    : count > 1020 ? 'Bạch Kim III (⭐⭐⭐⭐)'
    : count > 1000 ? 'Bạch Kim III (⭐⭐⭐)'
    : count > 980 ? 'Bạch Kim III (⭐⭐)'
    : count > 960 ? 'Bạch Kim III (⭐)'
    : count > 940 ? 'Bạch Kim IV (⭐⭐⭐⭐⭐)'
    : count > 920 ? 'Bạch Kim IV (⭐⭐⭐⭐)'
    : count > 900 ? 'Bạch Kim IV (⭐⭐⭐)'
    : count > 880 ? 'Bạch Kim IV (⭐⭐)'
    : count > 860 ? 'Bạch Kim IV (⭐)'
    : count > 840 ? 'Bạch Kim V (⭐⭐⭐⭐⭐)'
    : count > 820 ? 'Bạch Kim V (⭐⭐⭐⭐)'
    : count > 800 ? 'Bạch Kim V (⭐⭐⭐)'
    : count > 780 ? 'Bạch Kim V (⭐⭐)'
    : count > 760 ? 'Bạch Kim V (⭐)'
    : count > 740 ? 'Vàng I (⭐⭐⭐⭐)'
    : count > 720 ? 'Vàng I (⭐⭐⭐)'
    : count > 700 ? 'Vàng I (⭐⭐)'
    : count > 680 ? 'Vàng I (⭐)'
    : count > 660 ? 'Vàng II (⭐⭐⭐⭐)'
    : count > 640 ? 'Vàng II (⭐⭐⭐)'
    : count > 620 ? 'Vàng II (⭐⭐)'
    : count > 600 ? 'Vàng II (⭐)'
    : count > 580 ? 'Vàng III (⭐⭐⭐⭐)'
    : count > 560 ? 'Vàng III (⭐⭐⭐)'
    : count > 540 ? 'Vàng III (⭐⭐)'
    : count > 520 ? 'Vàng III (⭐)'
    : count > 500 ? 'Vàng IV (⭐⭐⭐⭐)'
    : count > 480 ? 'Vàng IV (⭐⭐⭐)'
    : count > 460 ? 'Vàng IV (⭐⭐)'
    : count > 440 ? 'Vàng IV (⭐)'
    : count > 420 ? 'Bạc I (⭐⭐⭐⭐)'
    : count > 400 ? 'Bạc I (⭐⭐⭐)'
    : count > 380 ? 'Bạc I (⭐⭐)'
    : count > 360 ? 'Bạc I (⭐)'
    : count > 340 ? 'Bạc II (⭐⭐⭐⭐)'
    : count > 320 ? 'Bạc II (⭐⭐⭐)'
    : count > 300 ? 'Bạc II (⭐⭐)'
    : count > 280 ? 'Bạc II (⭐)'
    : count > 260 ? 'Bạc III (⭐⭐⭐⭐)'
    : count > 240 ? 'Bạc III (⭐⭐⭐)'
    : count > 220 ? 'Bạc III (⭐⭐)'
    : count > 200 ? 'Bạc III (⭐)'
    : count > 180 ? 'Đồng I (⭐⭐⭐)'
    : count > 160 ? 'Đồng I (⭐⭐)'
    : count > 140 ? 'Đồng I (⭐)'
    : count > 120 ? 'Đồng II (⭐⭐⭐)'
    : count > 100 ? 'Đồng II (⭐⭐)'
    : count > 80 ? 'Đồng II (⭐)'
    : count > 60 ? 'Đồng III (⭐⭐⭐)'
    : count > 40 ? 'Đồng III (⭐⭐)'
    : count > 20 ? 'Đồng III (⭐)'
    : 'Đồng III'
}



module.exports.run = async function ({ api, event, args, Users }) {
    const fs = global.nodemodule['fs'];
    const { messageID, threadID, senderID, mentions } = event;
    const threadPath = path + threadID + '.json';
    if (!fs.existsSync(threadPath) || fs.statSync(threadPath).isDirectory()) {
        fs.writeFileSync(threadPath, JSON.stringify({}, null, 4));
    }
    const query = args[0] ? args[0].toLowerCase() : '';
    const getThreadJSON = JSON.parse(fs.readFileSync(threadPath)) || {};
    if (!getThreadJSON.hasOwnProperty(senderID)) {
        getThreadJSON[senderID] = 1;
    }
    var storage = [],
        msg = '';
    if (query == 'all') {
        const allThread = await api.getThreadInfo(threadID) || { participantIDs: [] };
        for (id of allThread.participantIDs) {
            if (!getThreadJSON.hasOwnProperty(id)) {
                getThreadJSON[id] = 0;
            }
        }
    }
    for (const id in getThreadJSON) {
        const name = await Users.getNameUser(id);
        storage.push({ id, name, count: getThreadJSON[id] });
    }
    storage.sort((a, b) => {
        if (a.count > b.count) return -1;
        else if (a.count < b.count) return 1;
        else return a.name.localeCompare(b.name);
    });
    if (query == 'all') {
        let count = 1;
        msg += '『 🌸 』==== 𝐂𝐇𝐄𝐂𝐊 𝐀𝐋𝐋 ====『 🌸 』 ';
        for (const user of storage) {
            msg += `\n𝗧𝗼𝗽 ${count++}〉『 ${user.name} 』\n➜𝗧𝗼̂̉𝗻𝗴 𝘀𝗼̂́ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 : ${user.count}\n𝗥𝗮𝗻𝗸: ${getRankName(storage.count)}`;
        }
    } else if (query == 'help') {
        msg += '》Đ𝗼̂̀𝗻𝗴 (0 tin nhắn)\n》𝗕𝗮̣𝗰 (200 tin nhắn)\n》𝗩𝗮̀𝗻𝗴 (440 tin nhắn)\n》𝗕𝗮̣𝗰𝗵 𝗞𝗶𝗺 (760 tin nhắn)\n》𝗞𝗶𝗺 𝗖𝘂̛𝗼̛𝗻𝗴 (1260 tin nhắn)\n》𝗧𝗶𝗻𝗵 𝗔𝗻𝗵 (1760 tin nhắn)\n》𝗖𝗮𝗼 𝗧𝗵𝘂̉ (2260 tin nhắn)\n》𝗖𝗵𝗶𝗲̂́𝗻 𝗧𝘂̛𝗼̛́𝗻𝗴 (3440 tin nhắn)\n》𝗧𝗵𝗮́𝗰𝗵 Đ𝗮̂́𝘂 (4440 tin nhắn)\n𝗦𝗮̆́𝗽 𝘅𝗲̂́𝗽 𝘁𝗵𝗲𝗼 𝘁𝗵𝘂̛́ 𝘁𝘂̛̣ 𝘁𝘂̛̀ đ𝗼̂̀𝗻𝗴 𝗜𝗜𝗜 -> 𝗖𝗵𝗶𝗲̂́𝗻 𝗧𝘂̛𝗼̛́𝗻𝗴 𝗻𝗵𝘂̛ 𝗿𝗮𝗻𝗸 𝗟𝗶𝗲̂𝗻 𝗤𝘂𝗮̂𝗻 𝗠𝗼𝗯𝗶𝗹𝗲\n𝗠𝗼̂̃𝗶 𝟮𝟬 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗯𝗮̣𝗻 𝘀𝗲̃ đ𝘂̛𝗼̛̣𝗰 𝟭⭐'
    } else if (!query) {
      const moment = require("moment-timezone");
  const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
        const userID = event.type == "message_reply" && !event.args[1] ? event.messageReply.senderID : !event.args[1] ? event.senderID : Object.keys(event.mentions)[0];
        const rankUser = storage.findIndex(e => e.id == userID);
        msg += `『 🌸 』=== 𝗖𝗛𝗘𝗖𝗞 𝗥𝗔𝗡𝗞 ===『 🌸 』\n\n🏆 𝗧𝗼𝗽 𝗰𝘂̉𝗮 ${userID == senderID ? '𝗯𝗮̣𝗻' : storage[rankUser].name} : ${rankUser + 1}\n💬 𝗧𝗼̂̉𝗻𝗴 𝘀𝗼̂́ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 : ${storage[rankUser].count}\n🏅 𝗥𝗮𝗻𝗸 : ${getRankName(storage[rankUser].count)}\n⏰ 𝗧𝗶𝗺𝗲: ${timeNow}\n❓ [ ${global.config.PREFIX}𝗿𝗮𝗻𝗸 𝗵𝗲𝗹𝗽 ] , [ ${global.config.PREFIX}𝗿𝗮𝗻𝗸 𝗮𝗹𝗹 ]\n『 🌸 』 ➜ 𝗖𝗵𝘂́𝗰 𝗯𝗮̣𝗻 𝘁𝘂̛𝗼̛𝗻𝗴 𝘁𝗮́𝗰 𝘃𝘂𝗶 𝘃𝗲̉`;
    }
    api.sendMessage({body:`${msg}`, attachment: fs.createReadStream(__dirname + `/Noprefix/checkrank.jpg`)},event.threadID);
    return;
}