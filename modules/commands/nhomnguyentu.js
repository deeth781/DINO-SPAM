module.exports.config = {
	name: "nhomnguyentu",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "LeMinh",
	description: "Nhóm nguyên tử",
	commandCategory: "Study",
	cooldowns: 0
};

module.exports.run = ({ event, api }) => api.sendMessage(`Bảng hóa trị một số nhóm nguyên tử
Tên/Hoá trị/Gốc axit/Axit tương ứng/Tính axit
Hiđroxit(*)(OH);Nitrat(NO3);Clorua(Cl) / I / NO3 / HNO3 / Mạnh
Sunfat(SO4);Cacbonat(CO3) /II / SO4 / H2SO4 / Mạnh
Photphat(PO4) / III / Cl / HCl / Mạnh 
(*):Tên này dùng trong các hợp chất với kim loại.`, event.threadID, event.messageID);
