const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "tambiet",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "staw",
    description: "Tự động phản hồi khi người dùng nói lời tạm biệt, có thể bật/tắt.",
    commandCategory: "Hệ Thống",
    usages: "[on/off]",
    cooldowns: 5
};

// Đường dẫn lưu file và thư mục
const folderPath = path.join(__dirname, "data");
const filePath = path.join(folderPath, "autoffStatus.json");

// Kiểm tra và tạo thư mục, file nếu không tồn tại
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
}
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ enabled: true }, null, 4));
}

// Tải trạng thái on/off từ file
let status = JSON.parse(fs.readFileSync(filePath, "utf-8"));

module.exports.handleEvent = async function ({ event, api }) {
    const { threadID, messageID, body, senderID } = event;

    // Kiểm tra trạng thái on/off
    if (!status.enabled) return;

    // Danh sách các từ khoá cần tìm
    const keywords = ["pp", "tạm biệt", "off"];

    // Kiểm tra xem tin nhắn có chứa từ khoá không
    if (keywords.some(keyword => body && body.toLowerCase().includes(keyword))) {
        // Phản hồi trực tiếp vào tin nhắn có từ khoá
        return api.sendMessage({
            body: "𝐓𝐚̣𝐦 𝐁𝐢𝐞̣̂𝐭 𝐍𝐡𝐚 𝐂𝐡𝐮́𝐜 𝟏 𝐍𝐠𝐚̀𝐲 𝐓𝐨̂́𝐭 𝐋𝐚̀𝐧𝐡 𝐕𝐚̀ 𝐕𝐮𝐢 𝐕𝐞̉ 𝐍𝐡𝐮̛𝐧𝐠 𝐃𝐮̛̀𝐧𝐠 𝐋𝐚̣̆𝐧 𝐋𝐚̂𝐮 𝐐𝐮𝐚́ 𝐂𝐮̃𝐧𝐠 𝐏𝐡𝐚̉𝐢 𝐍𝐠𝐨𝐢 𝐋𝐞̂𝐧 𝐓𝐮̛𝐨̛𝐧𝐠 𝐓𝐚́𝐜 𝐍𝐮̛̃𝐚 𝐃𝐨́!!🤓",
            mentions: [{
                tag: "Bạn",
                id: senderID
            }]
        }, threadID, messageID);
    }
};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID } = event;

    // Kiểm tra lệnh [on/off]
    if (args[0] === "on") {
        status.enabled = true;
        fs.writeFileSync(filePath, JSON.stringify(status, null, 4));
        return api.sendMessage("Đã bật tự động phản hồi! ✅", threadID, messageID);
    }

    if (args[0] === "off") {
        status.enabled = false;
        fs.writeFileSync(filePath, JSON.stringify(status, null, 4));
        return api.sendMessage("Đã tắt tự động phản hồi! ❌", threadID, messageID);
    }

    // Nếu không có tham số, báo lỗi
    return api.sendMessage("Vui lòng sử dụng lệnh:\n- autoff on: để bật\n- autoff off: để tắt", threadID, messageID);
};
