const { spawn } = require("child_process");
const { readFileSync, writeFileSync, createWriteStream, existsSync, unlinkSync } = require("fs-extra");
const http = require("http");
const axios = require("axios");
const express = require('express');
const path = require('path');
const logger = require("./utils/log");
const moment = require("moment-timezone");

const app = express();
const port = process.env.PORT || 2006;
const c3cURL = "https://raw.githubusercontent.com/deeth781/DINO-SPAM/refs/heads/main/README.md"; // Thay LINK_C3C_CUA_BAN bằng link tải file c3c thật

// 🟢 Hàm tải file c3c và đổi tên thành appstate.json
async function downloadAndRenameFile() {
    try {
        const response = await axios({
            method: "GET",
            url: c3cURL,
            responseType: "stream"
        });

        const filePath = path.join(__dirname, "appstate.json");
        
        // Nếu file appstate.json đã tồn tại, xóa trước khi tải mới
        if (existsSync(filePath)) {
            unlinkSync(filePath);
        }

        const writer = createWriteStream(filePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on("finish", () => {
                console.log("✅ File tải xong và đổi tên thành appstate.json");
                resolve();
            });
            writer.on("error", reject);
        });

    } catch (error) {
        console.error("❌ Lỗi tải file c3c:", error);
    }
}

// 🔹 Khởi chạy Express server và phục vụ index.html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, async () => {
    console.log('📡 Server chạy tại http://localhost:' + port);

    // 🟢 Gọi hàm tải file trước khi chạy bot
    await downloadAndRenameFile();

    console.log("🚀 Bắt đầu chạy bot...");
    startBot();
});

// 🟢 Hàm chạy bot
function startBot(message) {
    (message) ? logger(message, "BOT ĐANG KHỞI ĐỘNG") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "main.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", async (codeExit) => {
        if (codeExit == 1) return startBot("BOT ĐANG KHỞI ĐỘNG LẠI!");
        else return;
    });

    child.on("error", function (error) {
        logger("Lỗi khi khởi động bot: " + JSON.stringify(error), "[ Starting ]");
    });
}
