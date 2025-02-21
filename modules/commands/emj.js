const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "emj",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "staw",
    description: "Phản hồi khi có người thả emoji hoặc gửi emoji nhanh. Có thể bật/tắt.",
    commandCategory: "Fun",
    usages: "[on/off]",
    cooldowns: 5
};

// Đường dẫn lưu trạng thái
const folderPath = path.join(__dirname, "data");
const filePath = path.join(folderPath, "reactionState.json");

// Kiểm tra và tạo thư mục + file trạng thái nếu chưa tồn tại
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath); // Tạo thư mục nếu chưa có
}
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ enabled: true }, null, 4)); // Tạo file và lưu trạng thái mặc định
}

// Tải trạng thái từ file
let reactionState = JSON.parse(fs.readFileSync(filePath, "utf-8"));

module.exports.handleReaction = async function ({ api, event }) {
    const { threadID } = event;

    // Kiểm tra nếu tính năng đang bị tắt
    if (!reactionState.enabled) return;

    // Bot trả lời khi có ai thả reaction
    api.sendMessage("Dục tương tác đi mày, thích thả icon không? 😏", threadID);
};

module.exports.handleEvent = async function ({ api, event }) {
    const { threadID, messageID, body } = event;

    // Kiểm tra nếu tính năng đang bị tắt
    if (!reactionState.enabled) return;

    // Kiểm tra nếu nội dung chỉ chứa emoji
    const emojiRegex = /^[^\w\s]{1,2}$/; // Regex kiểm tra emoji
    if (body && emojiRegex.test(body.trim())) {
        // Gửi tin nhắn trả lời
        return api.sendMessage(
            "Dậy tương tác đi mày, thích thả icon không? 😏",
            threadID,
            messageID
        );
    }
};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID, senderID } = event;

    // Kiểm tra quyền admin
    const adminUID = "61562004788243"; // Thay bằng UID của bạn
    if (senderID !== adminUID) {
        return api.sendMessage("⛔ Bạn không có quyền thực hiện thao tác này!", threadID, messageID);
    }

    // Bật tính năng
    if (args[0] === "on") {
        reactionState.enabled = true;
        fs.writeFileSync(filePath, JSON.stringify(reactionState, null, 4));
        return api.sendMessage("✅ Tính năng phản hồi emoji đã được bật!", threadID, messageID);
    }

    // Tắt tính năng
    if (args[0] === "off") {
        reactionState.enabled = false;
        fs.writeFileSync(filePath, JSON.stringify(reactionState, null, 4));
        return api.sendMessage("✅ Tính năng phản hồi emoji đã được tắt!", threadID, messageID);
    }

    // Hướng dẫn sử dụng
    return api.sendMessage(
        "Cách sử dụng:\n- on: Bật tính năng phản hồi emoji\n- off: Tắt tính năng phản hồi emoji",
        threadID,
        messageID
    );
};
