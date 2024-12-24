module.exports.config = {
 name: "antijoin",
 version: "1.0.0",
 credits: "D-Jukie",
 hasPermssion: 1,
 description: "Cấm thành viên mới vào nhóm",
 usages: "antijoin",
 commandCategory: "Hệ Thống",
 cooldowns: 0
};

module.exports.run = async({ api, event, Threads}) => {
    const info = await api.getThreadInfo(event.threadID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) 
      return api.sendMessage('𝐁𝐨𝐭 𝐜𝐚̂̀𝐧 𝐪𝐮𝐲𝐞̂̀𝐧 𝐪𝐮𝐚̉𝐧 𝐭𝐫𝐢̣ 𝐯𝐢𝐞̂𝐧 𝐧𝐡𝐨́𝐦', event.threadID, event.messageID);
    const data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data.newMember == "undefined" || data.newMember == false) data.newMember = true;
    else data.newMember = false;
    await Threads.setData(event.threadID, { data });
      global.data.threadData.set(parseInt(event.threadID), data);
    return api.sendMessage(`𝐃𝐚̃ ${(data.newMember == true) ? "𝐛𝐚̣̂𝐭" : "𝐭𝐚̆́𝐭"} 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐚𝐧𝐭𝐢𝐣𝐨𝐢𝐧`, event.threadID, event.messageID);
}