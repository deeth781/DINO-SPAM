const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "tvm",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "staw",
    description: "Quản lý bảng luật, chỉ admin được phép thêm hoặc xóa.",
    commandCategory: "Hệ Thống",
    usages: "[add/remove/view] [nội dung luật]",
    cooldowns: 5
};

// Đường dẫn lưu thư mục và file luật
const dirPath = path.join(__dirname, "data"); // Thư mục "data"
const filePath = path.join(dirPath, "luat.json"); // File "luat.json"

// Kiểm tra và tạo thư mục nếu không tồn tại
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }); // Tạo thư mục
    console.log(`Đã tạo thư mục: ${dirPath}`);
}

// Kiểm tra và tạo file nếu không tồn tại
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ rules: [] }, null, 4));
    console.log(`Đã tạo file: ${filePath}`);
}

// Tải dữ liệu luật từ file
let rulesData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

module.exports.handleEvent = async function ({ event, api }) {
    const { threadID, messageID, body } = event;

    // Kiểm tra tin nhắn có chứa từ "tvm"
    if (body && body.toLowerCase().trim() === "tvm") {
        const rules = rulesData.rules;
        if (rules.length === 0) {
            return api.sendMessage("Hiện tại không có luật nào được lưu!", threadID, messageID);
        }

        // Gửi bảng luật
        const rulesList = rules.map((rule, index) => `${index + 1}. ${rule}`).join("\n");
        return api.sendMessage(`📜 Bảng Luật:\n\n${rulesList}`, threadID, messageID);
    }
};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID, senderID } = event;

    // Kiểm tra quyền admin
    const adminUID = "61562004788243";
    if (senderID !== adminUID) {
        return api.sendMessage("Quyền Lồn Biên Giới😏", threadID, messageID);
    }

    // Lệnh thêm luật
    if (args[0] === "add") {
        const rule = args.slice(1).join(" ");
        if (!rule) {
            return api.sendMessage("Vui lòng nhập nội dung luật cần thêm!", threadID, messageID);
        }

        rulesData.rules.push(rule);
        fs.writeFileSync(filePath, JSON.stringify(rulesData, null, 4));
        return api.sendMessage(`✅ Đã thêm luật: "${rule}"`, threadID, messageID);
    }

    // Lệnh xóa luật
    if (args[0] === "remove") {
        const index = parseInt(args[1]) - 1;
        if (isNaN(index) || index < 0 || index >= rulesData.rules.length) {
            return api.sendMessage("⛔ Vui lòng nhập số thứ tự luật hợp lệ để xóa!", threadID, messageID);
        }

        const removedRule = rulesData.rules.splice(index, 1);
        fs.writeFileSync(filePath, JSON.stringify(rulesData, null, 4));
        return api.sendMessage(`✅ Đã xóa luật: "${removedRule}"`, threadID, messageID);
    }

    // Lệnh xem luật (cho admin)
    if (args[0] === "") {
        const rules = rulesData.rules;
        if (rules.length === 0) {
            return api.sendMessage("Hiện tại không có luật nào được lưu!", threadID, messageID);
        }

        const rulesList = rules.map((rule, index) => `${index + 1}. ${rule}`).join("\n");
        return api.sendMessage(`📜 𝐁𝐚̉𝐧𝐠 𝐋𝐮𝐚̣̂𝐭:\n\n${rulesList}𝐕𝐮𝐢 𝐋𝐨̀𝐧𝐠 𝐓𝐡𝐮̛̣𝐜 𝐇𝐢𝐞̣̂𝐧 𝐃𝐮́𝐧𝐠 𝐋𝐮𝐚̣̂𝐭 𝐃𝐞̂̉ 𝐊𝐡𝐨̂𝐧𝐠 𝐁𝐢̣ 𝐊𝐢𝐜𝐤 𝐍𝐡𝐚😉`, threadID, messageID);
    }

    // Hướng dẫn sử dụng lệnh
    return api.sendMessage(
        "Cách sử dụng:\n- add [nội dung luật]: Thêm luật\n- remove [số thứ tự]: Xóa luật\n- view: Xem danh sách luật",
        threadID,
        messageID
    );
};
