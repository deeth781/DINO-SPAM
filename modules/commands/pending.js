module.exports.config = {
    "name": "pending",
    "version": "1.0.6",
    "credits": "Niiozic",
    "hasPermssion": 2,
    "description": "Quản lý tin nhắn chờ của bot",
    "commandCategory": "Hệ Thống",
    "usages": "[u] [t] [a]",
    "cooldowns": 5
};

module.exports.handleReply = async function({ api, event, handleReply, getText }) {
  const axios = require("axios")
  const fs = require('fs-extra');
  const request = require('request')
    if (String(event.senderID) !== String(handleReply.author)) return;
    const { body, threadID, messageID } = event;
    var count = 0;

    if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
        const index = (body.slice(1, body.length)).split(/\s+/);
        for (const singleIndex of index) {
            console.log(singleIndex);
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(`→ ${singleIndex} Không phải là một con số hợp lệ`, threadID, messageID);
        }
        return api.sendMessage(`[ PENDING ] - Đã từ chối thành công`, threadID, messageID);
    }
    else {

        const index = body.split(/\s+/);
        const fs = require("fs");       
        for (const singleIndex of index) {
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(`→ ${singleIndex} Không phải là một con số hợp lệ`, threadID, messageID);
            api.unsendMessage(handleReply.messageID);
            api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "Ngô Trung Kiên" : global.config.BOTNAME}`, handleReply.pending[singleIndex - 1].threadID, api.getCurrentUserID());
            api.sendMessage("", event.threadID, () => api.sendMessage(`❯ Admin: fb.com/TatsuYTB`, handleReply.pending[singleIndex - 1].threadID));
            count+=1;
            
        }
        return api.sendMessage(`[ PENDING ] - Đã phê duyệt thành công`, threadID, messageID);
    }
}

module.exports.run = async function({ api, event, args, permission, handleReply }) {
        if (args.join() == "") {api.sendMessage("❯ Pending user: Hàng chờ người dùng\n❯ Pending thread: Hàng chờ nhóm\n❯ Pending all: Tất cả box đang chờ duyệt",event.threadID, event.messageID);
    }
        const content = args.slice(1, args.length);   
     switch (args[0]) {
    case "user":
    case "u":
    case "-u":
    case "User": {
    const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    
    try {
        var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
        var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage("[ PENDING ] - Không thể lấy danh sách chờ", threadID, messageID) }

      const list = [...spam, ...pending].filter(group => group.isGroup == false);

    for (const single of list) msg += `${index++}. ${single.name}\n${single.threadID}\n`;

    if (list.length != 0) return api.sendMessage(`→ Tổng số người dùng cần duyệt: ${list.length} người dùng\n${msg}\nReply (phản hồi) theo stt để duyệt`, threadID, (error, info) => {
        global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("[ PENDING ] - Hiện tại không có người dùng nào trong hàng chờ", threadID, messageID);
}
    case "thread":
    case "-t":
    case "t":
    case "Thread": {
     const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    
    try {
        var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
        var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage("[ PENDING ] - Không thể lấy danh sách đang chờ", threadID, messageID) }

    const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

    for (const single of list) msg += `${index++}. ${single.name}\n${single.threadID}\n`;

    if (list.length != 0) return api.sendMessage(`→ Tổng số nhóm cần duyệt: ${list.length} nhóm\n${msg}\nReply (phản hồi) theo stt để duyệt`, threadID, (error, info) => {
        global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("[ PENDING ] - Hiện tại không có nhóm nào trong hàng chờ", threadID, messageID);
        }
    case "all":
    case "a":
    case "-a":
    case "al": {
     const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    
    try {
        var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
        var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage("[ PENDING ] - Không thể lấy danh sách chờ", threadID, messageID) }

            const listThread = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);
        const listUser = [...spam, ...pending].filter(group => group.isGroup == false)
    const list = [...spam, ...pending].filter(group => group.isSubscribed);

    for (const single of list) msg += `${index++}. ${single.name}\n${single.threadID}\n`;

    if (list.length != 0) return api.sendMessage(`→ Tổng số User & Thread cần duyệt: ${list.length} User & Thread\n${msg}\nReply (phản hồi) theo stt để duyệt`, threadID, (error, info) => {
        global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("[ PENDING ] - Hiện tại không có User & Thread nào trong hàng chờ", threadID, messageID);
        }
    }       
}