module.exports.config = {
	name: "nguyentohoahoc",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "LeMinh",
	description: "Nguyên tố hoá học",
	commandCategory: "Study",
	cooldowns: 0
};

module.exports.run = ({ event, api }) => api.sendMessage(`Bảng Nguyên Tố
Số/Tên/Kí hiệu/Nguyên tử khối/Hóa trị
1 / Hiđro / H / 1 / I
2 / Heli / He / 4/ không có
3 / Liti / Li / 7 / I
4 / Beri / Be / 9 / II
5 / Bo/ B / 11 / III
6 / Cacbon / C / 12 / IV,II
7 / Nitơ / N / 14 / III,II,IV...
8 / Oxi / O / 16 / II
9 / Flo / F / 19 / I
10 / Neon / Ne / 20 / Không có
11 / Natri / Na / 23 / I
12 / Magie / Mg / 24 / II
13 / Nhôm / Al / 27/ III
14 / Silic / Si / 28 / IV
15 / Photpho / P / 31 / III,V
16 / Lưu Huỳnh / S / 32 / II,IV,V
17 / Clo / Cl / 35,5 / I,...
18 / Agon / Ar / 39,9 / Không có
19 / Kali / K / 39 / I
20 / Canxin / Ca / 40 / II

24/ Crom / Cr / 52 / II,III...
25 / Mangan / Mn / 55 / II,IV,VII..
26 / Sắt / Fe / 56 / II,III
29 / Đồng / Cu / 64 / I,II
30 / Kẽm / Zn / 65 / II
35 / Brom / Br / 80 / I...
47 / Bạc / Ag / 108 / I
56 / Bari / Ba / 137 / II
80 / Thủy Ngân / Hg / 201 / I,II
82 / Chì / Pb / 207 / II,IV`, event.threadID, event.messageID);
