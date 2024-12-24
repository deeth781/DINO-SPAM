module.exports.config = {
	name: "tungdongxu",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Sunii",
	description: "Tung đồng xu may rủi",
	commandCategory: "Trò Chơi",
	usages: "tungdongxu t 500",
	cooldowns: 10
};
module.exports.run = async function({ api, event, args, Currencies, utils }) {
        const { threadID, senderID, messageID } = event;
        let money = (await Currencies.getData(event.senderID)).money;
        var content = args.join(" ");
        if (!content) return api.sendMessage("Bạn chưa nhập thông tin đặt cược!", threadID, messageID);
        var xu = args[0];
		var moneys = args[args.length -1];
        if (isNaN(moneys) || moneys.indexOf("-") !== -1) return api.sendMessage("Số tiền đặt cược của bạn không phải là một con số, vui lòng xem lại cách sử dụng tại help tungdongxu", threadID, messageID);
				if (!moneys || !xu) return api.sendMessage("Sai format", threadID, messageID);
				if (moneys > money) return api.sendMessage("Số tiền của bạn không đủ", threadID, messageID);
				if (moneys < 10000) return api.sendMessage("Số tiền đặt cược của bạn quá nhỏ, tối thiểu là 10000 RP", threadID, messageID);
				var check = (num) => (num == 0) ? 'heads' : (num % 0 == 1 != 1) ? 'xấp' : (num % 1 == 0 != 0);
				let random = Math.random() < 0.5;
                if (xu == "n" || xu == "ngửa") xu = 0;
				else if (xu == "x" || xu == "xấp") xu = 1;
				else return api.sendMessage("Bạn chưa nhập thông tin cá cược!, <ngửa/xấp>", threadID, messageID);
       if (xu == 0 && check(random) == 'ngửa') api.sendMessage(`Bạn đã chọn ngửa, bạn đã thắng với số tiền: ${moneys * 2} RP`, threadID, () => Currencies.increaseMoney(senderID, parseInt(moneys * 2)), messageID);
			 else if (xu == 1 && check(random) == 'xấp') api.sendMessage(`Bạn đã chọn xấp, bạn đã thắng với số tiền: ${moneys * 2} RP`, threadID, () => Currencies.increaseMoney(senderID, parseInt(moneys * 2)), messageID);
			 else api.sendMessage(`Đồng xu ra mặt ${check(random)}\nBạn đã thua và bị trừ: ${moneys} RP`, threadID, () => Currencies.decreaseMoney(senderID, money), messageID)
		};