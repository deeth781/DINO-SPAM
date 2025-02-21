const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "antijob",
    version: "1.2.0",
    hasPermssion: 0,
    credits: "staw",
    description: "Anti Out, Anti Join và Anti Spam.",
    commandCategory: "System",
    usages: "[menu/on/off]",
    cooldowns: 5
};

// Đường dẫn lưu trạng thái anti
const folderPath = path.join(__dirname, "data");
const filePath = path.join(folderPath, "antiState.json");

// Kiểm tra và tạo thư mục + file nếu chưa tồn tại
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
        filePath,
        JSON.stringify({ antiOut: false, antiJoin: false, antiSpam: false }, null, 4)
    );
}

// Tải trạng thái từ file
let antiState = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// Biến đếm tin nhắn spam
const userMessageCount = {};

module.exports.handleEvent = async function ({ event, api }) {
    const { threadID, messageID, senderID, logMessageType, logMessageData, body } = event;

    // Xử lý Anti Out
    if (logMessageType === "log:unsubscribe" && antiState.antiOut) {
        const userID = logMessageData.leftParticipantFbId;
        const userName = logMessageData.leftParticipantFbName;
        try {
            await api.addUserToGroup(userID, threadID);
            api.sendMessage(`✅ Đã mời ${userName} quay lại nhóm thành công!`, threadID);
        } catch (error) {
            api.sendMessage(`❌ Không thể mời ${userName} quay lại nhóm.`, threadID);
        }
    }

    // Xử lý Anti Join
    if (logMessageType === "log:subscribe" && antiState.antiJoin) {
        const userID = logMessageData.addedParticipants[0].userFbId;
        const userName = logMessageData.addedParticipants[0].fullName;
        try {
            await api.removeUserFromGroup(userID, threadID);
            api.sendMessage(`⛔ Anti Join: Đã kick ${userName} ra khỏi nhóm!`, threadID);
        } catch (error) {
            api.sendMessage(`❌ Không thể kick ${userName}.`, threadID);
        }
    }

    // Xử lý Anti Spam
    if (antiState.antiSpam) {
        if (!userMessageCount[senderID]) {
            userMessageCount[senderID] = { count: 0, timeout: null };
        }

        userMessageCount[senderID].count++;

        if (userMessageCount[senderID].count > 5) { // Số lần spam tối đa
            try {
                await api.removeUserFromGroup(senderID, threadID);
                api.sendMessage(`⛔ Anti Spam: Đã kick ${senderID} vì spam quá nhiều!`, threadID);
            } catch (error) {
                api.sendMessage(`❌ Không thể kick người dùng ${senderID}.`, threadID);
            }
        }

        // Reset đếm tin nhắn sau 10 giây
        clearTimeout(userMessageCount[senderID].timeout);
        userMessageCount[senderID].timeout = setTimeout(() => {
            userMessageCount[senderID].count = 0;
        }, 10000);
    }
};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID, senderID } = event;

    // Hiển thị menu
    if (args[0] === "list") {
        const menu = `
📜 Menu Anti:
1️⃣ Anti Out: ${antiState.antiOut ? "✅ ON" : "❌ OFF"}
2️⃣ Anti Join: ${antiState.antiJoin ? "✅ ON" : "❌ OFF"}
3️⃣ Anti Spam: ${antiState.antiSpam ? "✅ ON" : "❌ OFF"}

🛠 Cách sử dụng:
- !anti on [out/join/spam] (VD: !anti on spam)
- !anti off [out/join/spam] (VD: !anti off join)
        `;
        return api.sendMessage(menu, threadID, messageID);
    }

    // Kiểm tra quyền admin
    const adminUID = "61562004788243"; // Thay bằng UID của bạn
    if (senderID !== adminUID) {
        return api.sendMessage("⛔ Bạn không có quyền thực hiện thao tác này!", threadID, messageID);
    }

    // Bật tính năng
    if (args[0] === "on") {
        const feature = args[1];
        if (!["out", "join", "spam"].includes(feature)) {
            return api.sendMessage("⛔ Vui lòng chọn tính năng hợp lệ (out, join hoặc spam)!", threadID, messageID);
        }

        const featureKey = `anti${feature.charAt(0).toUpperCase()}${feature.slice(1)}`;
        antiState[featureKey] = true;
        fs.writeFileSync(filePath, JSON.stringify(antiState, null, 4));
        return api.sendMessage(`✅ Đã bật Anti ${feature}!`, threadID, messageID);
    }

    // Tắt tính năng
    if (args[0] === "off") {
        const feature = args[1];
        if (!["out", "join", "spam"].includes(feature)) {
            return api.sendMessage("⛔ Vui lòng chọn tính năng hợp lệ (out, join hoặc spam)!", threadID, messageID);
        }

        const featureKey = `anti${feature.charAt(0).toUpperCase()}${feature.slice(1)}`;
        antiState[featureKey] = false;
        fs.writeFileSync(filePath, JSON.stringify(antiState, null, 4));
        return api.sendMessage(`✅ Đã tắt Anti ${feature}!`, threadID, messageID);
    }

    // Hướng dẫn sử dụng
    return api.sendMessage(
        "Cách sử dụng lệnh:\n- menu: Hiển thị trạng thái và menu\n- on [out/join/spam]: Bật tính năng\n- off [out/join/spam]: Tắt tính năng",
        threadID,
        messageID
    );
};
