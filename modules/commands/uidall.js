module.exports.config = {
    name: "uidall",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "TatsuYTB",
    description: "Get all uid and names in Group.",
    commandCategory: "Nhóm",
    cooldowns: 2,
    prefix: "",
};

module.exports.handleEvent = async ({ api, event, Users }) => {
    const { threadID, messageID, body } = event;
    if (body.startsWith("uidall")) {
        const ep = event.participantIDs;
        let msg = "";
        let msgs = "";
        let m = 0;
        for (const i of ep) {
            m += 1;
            const name = await Users.getNameUser(i);
            msg += `${m}. ${name}\nUID: ${i}\n\n`;
        }
        msgs += "Uid của all thành viên\n\n" + msg;
        api.sendMessage(msgs, threadID, messageID);
    }
};

module.exports.run = async ({ api, event, Users, args }) => {
    const ep = event.participantIDs;
    let msg = "";
    let msgs = "";
    let m = 0;
    for (const i of ep) {
        m += 1;
        const name = await Users.getNameUser(i);
        msg += `${m}. ${name}\nUID: ${i}\n\n`;
    }
    msgs += "Uid của all thành viên\n\n" + msg;
    api.sendMessage(msgs, event.threadID, event.messageID);
};
