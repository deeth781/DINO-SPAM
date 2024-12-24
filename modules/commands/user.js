module.exports.config = {
  name: "user",
  version: "1.0.5",
  hasPermssion: 2,
  credits: "Mirai Team",//Mod by H.Thanh
  description: "Cấm hoặc gỡ cấm người dùng",
  commandCategory: "Hệ Thống",
  usages: "< unban/ban/search + ID + text >",
  cooldowns: 5
};

module.exports.languages = {
  "vi": {
    "reason": "Lí do",
    "at": "Vào lúc",
    "allCommand": "toàn bộ lệnh",
    "commandList": "những lệnh",
    "banSuccess": "[ 𝗠𝗢𝗗𝗘 ] → Đã xử lý thành công yêu cầu cấm người dùng: %1",
    "unbanSuccess": "[ 𝗠𝗢𝗗𝗘 ] → Đã xử lý thành công yêu cầu gỡ cấm người dùng %1",
    "banCommandSuccess": "[ 𝗠𝗢𝗗𝗘 ] → Đã xử lý thành công yêu cầu cấm lệnh đối với người dùng: %1",
    "unbanCommandSuccess": "[ 𝗠𝗢𝗗𝗘 ] → Đã xử lý thành công yêu cầu gỡ cấm %1 đối với người dùng: %2",
    "errorReponse": "%1 Không thể hoàn tất công việc bạn yêu cầu",
    "IDNotFound": "%1 ID người dùng bạn nhập không tồn tại trong cơ sở dữ liệu",
    "existBan": "[ 𝗠𝗢𝗗𝗘 ] → Người dùng %1 đã bị ban từ trước %2 %3",
    "notExistBan": "[ 𝗠𝗢𝗗𝗘 ] → Người dùng bạn nhập chưa từng bị cấm sử dụng Bot",
    "missingCommandInput": "%1 Phần command cần cấm không được để trống",
    "notExistBanCommand": "[ 𝗠𝗢𝗗𝗘 ] → Hiện tại ID người dùng bạn nhập chưa từng bị cấm sử dụng lệnh",

    "returnBan": "[ 𝗠𝗢𝗗𝗘 ] → Hiện tại bạn đang yêu cầu cấm người dùng:\n- ID và tên người dùng cần cấm: %1%2\n\n❮ Reaction tin nhắn này để xác thực ❯",
    "returnUnban": "[ 𝗠𝗢𝗗𝗘 ] → Hiện tại bạn đang yêu cầu gỡ cấm người dùng:\n- ID và tên người dùng cần gỡ cấm: %1\n\n❮ Reaction tin nhắn này để xác thực ❯",
    "returnBanCommand": "[ 𝗠𝗢𝗗𝗘 ] → Hiện tại bạn đang yêu cầu cấm sử dụng lệnh đối với người dùng:\n - ID và tên người dùng cần cấm: %1\n- Các lệnh cần cấm: %2\n\n❮ Reaction tin nhắn này để xác thực ❯",
    "returnUnbanCommand": "[ 𝗠𝗢𝗗𝗘 ] → Hiện tại bạn đang yêu cầu gỡ cấm sử dụng lệnh đối với với người dùng:\n - ID và tên người dùng cần gỡ cấm lệnh: %1\n- Các lệnh cần gỡ cấm: %2\n\n❮ Reaction tin nhắn này để xác thực ❯",

    "returnResult": "Đây là kết quả phù hợp:\n%1",
    "returnNull": "Không tìm thấy kết quả dựa vào tìm kiếm của bạn",
    "returnList": "[ 𝗠𝗢𝗗𝗘 ] → Hiện tại đang có %1 người dùng bị ban, dưới đây là %2 người dùng\n\n%3",
    "returnInfo": "[ 𝗠𝗢𝗗𝗘 ] → Đây là một số thông tin về người dùng bạn cần tìm:\n- ID và tên của người dùng: %1\n- Có bị ban: %2 %3 %4\n- Bị ban lệnh: %5"
  },
  "en": {
    "reason": "Reason",
    "at": "At",
    "allCommand": "All commands",
    "commandList": "Commands",
    "banSuccess": "[ Ban User ] Banned user: %1",
    "unbanSuccess": "[ Unban User ] Unbanned user %1",
    "banCommandSuccess": "[ banCommand User ] Banned command with user: %1",
    "unbanCommandSuccess": "[ UnbanCommand User ] Unbanned command %1 with user: %2",
    "errorReponse": "%1 Can't do what you request",
    "IDNotFound": "%1 ID you import doesn't exist in database",
    "existBan": "[ Ban User ] User %1 has been banned before %2 %3",
    "notExistBan": "[ Unban User ] User hasn't been banned before",
    "missingCommandInput": "%1 You have to import the command you want to ban!",
    "notExistBanCommand": "[ UnbanCommand User ] User ID hasn't been banned before",

    "returnBan": "[ Ban User ] You are requesting to ban user:\n- User ID and name who you want to ban: %1%2\n\n❮ Reaction this message to complete ❯",
    "returnUnban": "[ Unban User ] You are requesting to unban user:\n- User ID and name who you want to ban: %1\n\n❮ Reaction this message to complete ❯",
    "returnBanCommand": "[ banCommand User ] You are requesting to ban command with user:\n - User ID and name who you want to ban: %1\n- Commands: %2\n\n❮ Reaction this message to complete ❯",
    "returnUnbanCommand": "[ UnbanCommand User ] You are requesting to unban command with user:\n - User ID and name: %1\n- Commands: %2\n\n❮ Reaction this message to complete ❯",

    "returnResult": "This is your result: \n",
    "returnNull": "There is no result with your input!",
    "returnList": "[ User List ]\There are %1 banned user, here are %2 user\n\n%3",
    "returnInfo": "[ Info User ] Here is some information about the user who you want to find:\n- User ID and name: %1n- Banned?: %2 %3 %4\n- Command banned?: %5"
  }
}

module.exports.handleReaction = async ({ event, api, Users, handleReaction, getText }) => {
  if (parseInt(event.userID) !== parseInt(handleReaction.author)) return;
  const moment = require("moment-timezone");
  const { threadID } = event;
  const { messageID, type, targetID, reason, commandNeedBan, nameTarget } = handleReaction;

  const time = moment.tz("Asia/Ho_Chi_minh").format("DD/MM/YYYY HH:mm:ss");
  global.client.handleReaction.splice(global.client.handleReaction.findIndex(item => item.messageID == messageID), 1);

  switch (type) {
    case "ban": {
      try {
        let data = (await Users.getData(targetID)).data || {};
        data.banned = true;
        data.reason = reason || null;
        data.dateAdded = time;
        await Users.setData(targetID, { data });
        global.data.userBanned.set(targetID, { reason: data.reason, dateAdded: data.dateAdded });
        return api.sendMessage(getText("banSuccess", `${targetID} - ${nameTarget}`), threadID, () => {
          return api.unsendMessage(messageID);
        });
      } catch { return api.sendMessage(getText("errorReponse", "[ 𝗠𝗢𝗗𝗘 ] → "), threadID) };
    }

    case "unban": {
      try {
        let data = (await Users.getData(targetID)).data || {};
        data.banned = false;
        data.reason = null;
        data.dateAdded = null;
        await Users.setData(targetID, { data });
        global.data.userBanned.delete(targetID);
        return api.sendMessage(getText("unbanSuccess", `${targetID} - ${nameTarget}`), threadID, () => {
          return api.unsendMessage(messageID);
        });
      } catch { return api.sendMessage(getText("errorReponse", "[ 𝗠𝗢𝗗𝗘 ] → "), threadID) };
    }

    case "banCommand": {
      try {	
        let data = (await Users.getData(targetID)).data || {};
        data.commandBanned = [...data.commandBanned || [], ...commandNeedBan];
        await Users.setData(targetID, { data });
        global.data.commandBanned.set(targetID, data.commandBanned);
        return api.sendMessage(getText("banCommandSuccess", `${targetID} - ${nameTarget}`), threadID, () => {
          return api.unsendMessage(messageID);
        });
      } catch (e) { return api.sendMessage(getText("errorReponse", "[ 𝗠𝗢𝗗𝗘 ] → "), threadID) };
    }

    case "unbanCommand": {
      try {
        let data = (await Users.getData(targetID)).data || {};
        data.commandBanned = [...data.commandBanned.filter(item => !commandNeedBan.includes(item))];
        await Users.setData(targetID, { data });
        global.data.commandBanned.set(targetID, data.commandBanned);
        if(data.commandBanned.length == 0) global.data.commandBanned.delete(targetID)
        return api.sendMessage(getText("unbanCommandSuccess", ((data.commandBanned.length == 0) ? getText("allCommand") : `${getText("commandList")}: ${commandNeedBan.join(", ")}`), `${targetID} - ${nameTarget}`), threadID, () => {
          return api.unsendMessage(messageID);
        });
      } catch (e) { return api.sendMessage(getText("errorReponse", "[ 𝗠𝗢𝗗𝗘 ] → "), threadID) };
    }
  }
}

module.exports.run = async ({ event, api, args, Users, getText }) => {
  const { threadID, messageID } = event;
  const type = args[0];
  var targetID = String(args[1]);
  var reason = (args.slice(2, args.length)).join(" ") || null;

  if (isNaN(targetID)) {
    const mention = Object.keys(event.mentions);
    args = args.join(" ");
    targetID = String(mention[0]);
    reason = (args.slice(args.indexOf(event.mentions[mention[0]]) + (event.mentions[mention[0]] || "").length + 1, args.length)) || null;
  }

  switch (type) {
    case "ban":
    case "-b": {
      if (!global.data.allUserID.includes(targetID)) return api.sendMessage(getText("IDNotFound", "[ 𝗠𝗢𝗗𝗘 ] → "), threadID, messageID);
      if (global.data.userBanned.has(targetID)) {
        const { reason, dateAdded } = global.data.userBanned.get(targetID) || {};
        return api.sendMessage(getText("existBan", targetID, ((reason) ? `${getText("reason")}: "${reason}"` : ""), ((dateAdded) ? `${getText("at")} ${dateAdded}` : "")), threadID, messageID);
      }
      const nameTarget = global.data.userName.get(targetID) || await Users.getNameUser(targetID);
      return api.sendMessage(getText("returnBan", `${targetID} - ${nameTarget}`, ((reason) ? `\n- ${getText("reason")}: ${reason}` : "")), threadID, (error, info) => {
        global.client.handleReaction.push({
          type: "ban",
          targetID,
          reason,
          nameTarget,
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,

        });
      }, messageID);
    }

    case "unban":
    case "-ub": {
      if (!global.data.allUserID.includes(targetID)) return api.sendMessage(getText("IDNotFound", "[ 𝗠𝗢𝗗𝗘 ] → "), threadID, messageID);
      if (!global.data.userBanned.has(targetID)) return api.sendMessage(getText("notExistBan"), threadID, messageID);
      const nameTarget = global.data.userName.get(targetID) || await Users.getNameUser(targetID);
      return api.sendMessage(getText("returnUnban", `${targetID} - ${nameTarget}`), threadID, (error, info) => {
        global.client.handleReaction.push({
          type: "unban",
          targetID,
          nameTarget,
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,

        });
      }, messageID);
    }

  case "search":
    case "-s": {
        var{userName}=global.data,txt='',count=0;
        userName.forEach((v,k) => {
           if(v.toLowerCase().includes(reason.replace(event.args[1],'').trim().toLowerCase())) txt+=`${++count}. ${v}\nURL: https://www.facebook.com/profile.php?id=${k}\n`;
            });
  /*		const contentJoin = reason || "";
      const getUsers = (await Users.getAll(['userID', 'name'])).filter(item => !!item.name);
      var matchUsers = [], a = '', b = 0;
      getUsers.forEach(i => {
        if (i.name.toLowerCase().includes(contentJoin.toLowerCase())) {
          matchUsers.push({
            name: i.name,
            id: i.userID
          });
        }
      });
      matchUsers.forEach(i => a += `\n${b += 1}. ${i.name} - ${i.id}`);*/
    //	if(!!txt)
      api.sendMessage(getText("returnResult", txt), threadID); //else api.sendMessage(getText("returnNull"), threadID);
    }
        break;

    case "banCommand":
    case "-bc": {
      if (!global.data.allUserID.includes(targetID)) return api.sendMessage(getText("IDNotFound", "[ 𝗠𝗢𝗗𝗘 ] → "), threadID, messageID);
      if (reason == null || reason.length == 0) return api.sendMessage(getText("missingCommandInput", "[ 𝗠𝗢𝗗𝗘 ] → "), threadID, messageID);
      if (reason == "all") {
        var allCommandName = [];
        const commandValues = global.client.commands.keys();
        for (const cmd of commandValues) allCommandName.push(cmd);
        reason = allCommandName.join(" ");
      }
      const commandNeedBan = reason.split(" ");
      const nameTarget = global.data.userName.get(targetID) || await Users.getNameUser(targetID);
      return api.sendMessage(getText("returnBanCommand", `${targetID} - ${nameTarget}`, ((commandNeedBan.length == global.client.commands.size) ? getText("allCommand") : commandNeedBan.join(", "))), threadID, (error, info) => {
        global.client.handleReaction.push({
          type: "banCommand",
          targetID,
          commandNeedBan,
          nameTarget,
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,

        });
      }, messageID);
    }

    case "unbanCommand":
    case "-ubc": {
      if (!global.data.allUserID.includes(targetID)) return api.sendMessage(getText("IDNotFound", "[ 𝗠𝗢𝗗𝗘 ] → "), threadID, messageID);
      if (!global.data.commandBanned.has(targetID)) return api.sendMessage(getText("notExistBanCommand"), threadID, messageID);
      if (reason == null || reason.length == 0) return api.sendMessage(getText("missingCommandInput", "[ 𝗠𝗢𝗗𝗘 ] → "), threadID, messageID);
      if (reason == "all") {
        reason = (global.data.commandBanned.get(targetID)).join(" ");
      }
      const commandNeedBan = reason.split(" ");
      const nameTarget = global.data.userName.get(targetID) || await Users.getNameUser(targetID);
      return api.sendMessage(getText("returnUnbanCommand", `${targetID} - ${nameTarget}`, ((commandNeedBan.length == global.data.commandBanned.get(targetID).length) ? getText("allCommand") : commandNeedBan.join(", "))), threadID, (error, info) => {
        global.client.handleReaction.push({
          type: "unbanCommand",
          targetID,
          commandNeedBan,
          nameTarget,
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,

        });
      }, messageID);
    }	
      case "info":
    case "-i": {
      if (!global.data.allUserID.includes(targetID)) return api.sendMessage(getText("IDNotFound", "[ 𝗠𝗢𝗗𝗘 ] → "), threadID, messageID);
      if (global.data.commandBanned.has(targetID)) { var commandBanned = global.data.commandBanned.get(targetID) || [] };
      if (global.data.userBanned.has(targetID)) { var { reason, dateAdded } = global.data.userBanned.get(targetID) || {} };
      const nameTarget = global.data.userName.get(targetID) || await Users.getNameUser(targetID);
      return api.sendMessage(getText("returnInfo", `${targetID} - ${nameTarget}`, ((!dateAdded) ? "" : ""), ((reason) ? `${getText("reason")}: "${reason}"` : ""), ((dateAdded) ? `${getText("at")}: ${dateAdded}` : ""), ((commandBanned) ? `${(commandBanned.length == global.client.commands.size) ? getText("allCommand") : commandBanned.join(", ")}` : "")), threadID, messageID);
  }
}
      }