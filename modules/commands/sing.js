const fs = require('fs');
const ytdl = require('ytdl-core');
const { resolve } = require('path');
const moment = require("moment-timezone");
const Youtube = require('youtube-search-api');
const { createReadStream, unlinkSync, statSync } = require("fs-extra");

// Hàm tải nhạc từ YouTube
async function downloadMusicFromYoutube(link, path) {
    try {
        const timestart = Date.now();
        if (!link) throw new Error('Thiếu link YouTube!');

        await new Promise((resolve, reject) => {
            ytdl(link, {
                filter: format => format.quality === 'tiny' && format.audioBitrate === 48 && format.hasAudio
            })
            .pipe(fs.createWriteStream(path))
            .on("finish", resolve)
            .on("error", reject);
        });

        const data = await ytdl.getInfo(link);
        return {
            title: data.videoDetails.title,
            dur: Number(data.videoDetails.lengthSeconds),
            viewCount: data.videoDetails.viewCount,
            likes: data.videoDetails.likes,
            author: data.videoDetails.author.name,
            timestart: timestart
        };
    } catch (error) {
        throw new Error(`Lỗi khi tải nhạc: ${error.message}`);
    }
}

// Hàm chuyển đổi giây sang định dạng giờ, phút, giây
function convertHMS(value) {
    const sec = parseInt(value, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec % 3600) / 60);
    let seconds = sec % 60;
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    return (hours !== '00' ? hours + ':' : '') + minutes + ':' + seconds;
}

module.exports.config = {
    name: "sing",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm",
    commandCategory: "Tiện ích",
    usages: "[searchMusic]",
    cooldowns: 0
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
    const path = `${__dirname}/cache/sing-${event.senderID}.mp3`;
    try {
        const link = handleReply.link[event.body - 1];
        const data = await downloadMusicFromYoutube('https://www.youtube.com/watch?v=' + link, path);

        // Kiểm tra dung lượng file
        if (statSync(path).size > 26214400) {
            return api.sendMessage('Không thể gửi file vì dung lượng lớn hơn 25MB.', event.threadID, () => unlinkSync(path), event.messageID);
        }

        api.unsendMessage(handleReply.messageID);
        return api.sendMessage({
            body: `==== 『 𝐒𝐈𝐍𝐆 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 』 ====\n\n→ Title: ${data.title}\n→ Thời lượng video: ${convertHMS(data.dur)}\n→ Tên kênh: ${data.author}\n→ Số view: ${data.viewCount}\n→ Thời gian xử lý: ${Math.floor((Date.now() - data.timestart) / 1000)} giây\n━━━━━━━━━━━━━━━\n=== 『 staw💤 』 ===`,
            attachment: createReadStream(path)
        }, event.threadID, () => unlinkSync(path), event.messageID);

    } catch (error) {
        return api.sendMessage(`Đã xảy ra lỗi: ${error.message}`, event.threadID, event.messageID);
    }
};

module.exports.run = async function ({ api, event, args }) {
    const path = `${__dirname}/cache/sing-${event.senderID}.mp3`;
    try {
        if (args.length === 0) return api.sendMessage('Phần tìm kiếm không được để trống!', event.threadID, event.messageID);

        const keywordSearch = args.join(" ");
        const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");

        if (fs.existsSync(path)) unlinkSync(path);

        // Nếu là link YouTube
        if (keywordSearch.startsWith("https://")) {
            const data = await downloadMusicFromYoutube(keywordSearch, path);

            if (statSync(path).size > 26214400) {
                return api.sendMessage('Không thể gửi file vì dung lượng lớn hơn 25MB.', event.threadID, () => unlinkSync(path), event.messageID);
            }

            return api.sendMessage({
                body: `==== 『 𝐒𝐈𝐍𝐆 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 』 ====\n\n→ Title: ${data.title}\n→ Thời lượng video: ${convertHMS(data.dur)}\n→ Tên kênh: ${data.author}\n→ Số view: ${data.viewCount}\n→ Thời gian xử lý: ${Math.floor((Date.now() - data.timestart) / 1000)} giây\n━━━━━━━━━━━━━━━\n=== 『 Staw💤 』 ===`,
                attachment: createReadStream(path)
            }, event.threadID, () => unlinkSync(path), event.messageID);
        }

        // Nếu là từ khóa tìm kiếm
        const searchResults = await Youtube.GetListByKeyword(keywordSearch, false, 10);
        const videos = searchResults.items;
        const links = [];
        let msg = "";

        videos.forEach((video, index) => {
            links.push(video.id);
            msg += `${index + 1}. [🎬]→ Title: ${video.title}\n[⏰]→ Thời lượng: ${video.length.simpleText}\n\n`;
        });

        const body = `[🔎]→ Có ${links.length} kết quả trùng với từ khoá tìm kiếm của bạn:\n━━━━━━━━━━━━━━━\n\n${msg}\n━━━━━━━━━━━━━━━\n\n→ Hãy reply chọn một trong những tìm kiếm trên.\n===「${timeNow}」===`;
        return api.sendMessage({
            body: body
        }, event.threadID, (error, info) => global.client.handleReply.push({
            type: 'reply',
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            link: links
        }), event.messageID);

    } catch (error) {
        return api.sendMessage(`Đã xảy ra lỗi: ${error.message}`, event.threadID, event.messageID);
    }
};
