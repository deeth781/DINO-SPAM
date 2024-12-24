module.exports.config = {
    name: "autosetname",
    version: "1.0.1",
    hasPermssion: 1,
    credits: "Vtuan",
    description: "Tự động setname cho thành viên mới",
    commandCategory: "Quản Lí Box",
    usages: "[add <name> /remove] ",
    cooldowns: 0
}

module.exports.onLoad = () => {
    const { existsSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
    const pathData = join(__dirname, "cache","data", "autosetname.json");
    if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8"); 
}

module.exports.run = async function  ({ event, api, args, permssionm, Users })  {
    const { threadID, messageID } = event;
    const { readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
    const pathData = join(__dirname, "cache", "data", "autosetname.json");
    const content = (args.slice(1, args.length)).join(" ");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var thisThread = dataJson.find(item => item.threadID == threadID) || { threadID, nameUser: [] };

  const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
    var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
    if (thu == 'Sunday') thu = 'Chủ Nhật'
    if (thu == 'Monday') thu = 'Thứ Hai'
    if (thu == 'Tuesday') thu = 'Thứ Ba'
    if (thu == 'Wednesday') thu = 'Thứ Tư'
    if (thu == "Thursday") thu = 'Thứ Năm'
    if (thu == 'Friday') thu = 'Thứ Sáu'
    if (thu == 'Saturday') thu = 'Thứ Bảy'
  
    switch (args[0]) {
        case "add": {
            if (content.length == 0) return api.sendMessage("→ Phần cấu hình tên thành viên mới không được bỏ trống!", threadID, messageID);
            if (thisThread.nameUser.length > 0) return api.sendMessage("→ Vui lòng xóa cấu hình tên cũ trước khi đặt tên mới!!!", threadID, messageID); 
            thisThread.nameUser.push(content);
            const name = (await Users.getData(event.senderID)).name
            writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
            api.sendMessage(`→ Đặt cấu hình tên thành viên mới thành công\n→ Preview: ${content}`, threadID, messageID);
            break;
        }
        case "rm":
        case "remove":
        case "delete": {
                if (thisThread.nameUser.length == 0) return api.sendMessage("→ Nhóm bạn chưa đặt cấu hình tên thành viên mới!!", threadID, messageID);
                thisThread.nameUser = [];
                api.sendMessage(`→ Xóa thành công phần cấu hình tên thành viên mới`, threadID, messageID);
                break;
        }
        default: {
                api.sendMessage(`====『 𝐇𝐃𝐒𝐃 』====\n▱▱▱▱▱▱▱▱▱▱▱▱▱\n→ Dùng: autosetname add <name> để cấu hình biệt danh cho thành viên mới\n→ Dùng: autosetname remove để xóa cấu hình đặt biệt danh cho thành viên mới\n▱▱▱▱▱▱▱▱▱▱▱▱▱\n\n=== 「${thu} || ${gio}`, threadID, messageID);
        }
    }
    if (!dataJson.some(item => item.threadID == threadID)) dataJson.push(thisThread);
    return writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
}