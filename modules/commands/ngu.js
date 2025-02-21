const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "dingu",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Bạn",
    description: "Chúc ngủ ngon kèm tên người dùng, có on/off.",
    commandCategory: "System",
    usages: "[on/off]",
    cooldowns: 5
};

// Đường dẫn thư mục và file trạng thái
const folderPath = path.join(__dirname, "data");
const filePath = path.join(folderPath, "sleepwishState.json");

// Kiểm tra và tạo thư mục + file nếu chưa tồn tại
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ isOn: true }, null, 4));
}

// Tải trạng thái từ file
let sleepwishState = JSON.parse(fs.readFileSync(filePath, "utf-8"));

module.exports.handleEvent = async function ({ event, api }) {
    const { threadID, messageID, senderID, body } = event;

    // Kiểm tra nếu tính năng đang bật và nội dung tin nhắn là "đi ngủ"
    if (sleepwishState.isOn && body && body.toLowerCase().trim() === "đi ngủ") {
        // Lấy tên người dùng
        const userInfo = await api.getUserInfo(senderID);
        const userName = userInfo[senderID]?.name || "bạn";

        // Gửi lời chúc
        const sleepMessage = `Chúc ${userName} ngủ ngon, mơ đẹp nhé! 😴💤`;
        return api.sendMessage(sleepMessage, threadID, messageID);
    }
};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID } = event;

    // Lệnh bật tính năng
    if (args[0] === "on") {
        sleepwishState.isOn = true;
        fs.writeFileSync(filePath, JSON.stringify(sleepwishState, null, 4));
        return api.sendMessage("✅ Đã bật tính năng chúc ngủ ngon!", threadID, messageID);
    }

    // Lệnh tắt tính năng
    if (args[0] === "off") {
        sleepwishState.isOn = false;
        fs.writeFileSync(filePath, JSON.stringify(sleepwishState, null, 4));
        return api.sendMessage("❌ Đã tắt tính năng chúc ngủ ngon!", threadID, messageID);
    }

    // Hướng dẫn sử dụng
    return api.sendMessage(
        "Cách sử dụng lệnh:\n- on: Bật tính năng chúc ngủ ngon\n- off: Tắt tính năng chúc ngủ ngon",
        threadID,
        messageID
    );
};
