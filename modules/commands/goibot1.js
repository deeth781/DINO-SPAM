const fs = require('fs');
const path = require('path');
const stringSimilarity = require('string-similarity');
const { simi } = require('./../../lib/sim.js'); // Thay đường dẫn tới mã mới của bạn

module.exports.config = {
    name: 'goibot1',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'Trò truyện cùng simi chat',
    commandCategory: 'Admin',
    usages: '[hey simi]',
    cooldowns: 2,
};

module.exports.run = () => {};

module.exports.handleEvent = async function({ api, event }) {
    var hm = ['kêu bot có gì hok 💓', 'ơi bot nghe nè','ơi anh/chị bot nghe 🌸','có gì hog bot nè','bot nè','kêu em có gì không','💞 em nghe','em đây', "hmmmm", "Đừng spam em nha :<<", "Đừng để em nóng!!!", "cậu gọi bot có gì không?", "mệt kêu hoài -.-", "Chăm chỉ học hành đi", "Bae ăn cơm chưa?", "Tuyển phi công nè ạ", "Nếu cậu đang cô đơn thì chúng ta có thể thành đôi :3", "Đang làm gì vậy?", "Được của ló :)))", "Làm chồng em không ạ?", "đi ra chỗ khác chơi", "Công chúa em sao đấy?", "Có gì ăn không:(( đói quáaa", "Yêu em không?", "cậu bị làm sao í@@", "Bạn là nhất!!!", "Kêu chi lắm thế? Bộ thích tao rồi à :v", "Chần chờ gì chồng ơi em đâyyy", "Em... Sao em lại nói những cái lời đó chi zay em?", "bắp luộc đyyy", "Yeu em rat nhieu ^^", "Đồ con lợn lùn :))", "Đợi xí. Đi ẻ cái :()", "500k bao phòng!!!", "Yeu anh den luy ^^", "Nên nhớ đừng bao giờ coi thường người khác\nwa man bu di a ", "Anh quát em à?\nNói to thế á?", "Trả quần cho em huhu", "I love you 3000 <3", "Tao cười tao đi ỉa", "Hãy nên nhớ, cuộc tình nào cũng có lúc tàn phai", "hoa hồng nở rộ 4 mùa...", "lalalalaaaa", "Đừng quá yêu một ai đó, khi chính bản thân bạn vẫn bị tổn thương!", "Bae, em nhu bong hoa. Nhung nguoi hai dau phai ta 💔", "Nuôi cậu để thịt ~~", "Overnight không?", "Hãy gọi cho admin tôi để được yêu thương<3", "Hát đi cho kẹo 🍭", "vợ gọi có việc gì không?", "Dzạaaaaa~~~", "gọi bot có gì hemm :3", "Dzạ em đây :>", "sao thế bae yêu dấu :>", "Sao thế công chúa", ":)))", "Nếu một ngày nào đó bạn gọi tôi mà tôi không trả lời nghĩa là bot bị payyy acccc ;-;", "Em đây", "chào bạn tôi là bot của TatsuYTB ", "Vợ gọi có việc gì không?", "Sử dụng #callad để liên lạc với admin!", "Em đây~~~~", "Yêu anh nhất", "ơi", "Sao thế công chúa nhõng nhẽo của em", "Yamete...", "Tuyển máy bay trực thăng nè ai yêu em hog", "Cậu có cô đơn ko để mik tâm sự", "Yêu ko ạ vã quá!!!", "bot dthw như chủ của bot ạ", "Đừng khen anh ngại quá hí hí", "Làm vợ anh ko ạ?", "ơ đừng", "bot có vợ rồi", "Ai Làm Vợ Em Hog?", "Hỏ?", "không được spam bot nhé các bae", "Yêu anh ko?", "Vợ anh đây rồi", "chủ tớ là thứ hai hong ai là nhất", "làm Vợ đuy", "Chủ Em Đẹp Zai Khoai To Lắm UwU", "Yêu Tất Cả Mụi Người:3", "Tuyển Ghệ nè các bbi :3", "tha em tới giường...", "thương em tới già"]
    var t = hm[Math.random()*hm.length << 0];
    if (['bot', 'hi bot', 'bot đâu', 'bot off', 'bot ơi', 'bot xịn', 'kêu mọi người lên tương tác đi bot', 'Chào bot', 'hello bot', 'sim', 'sim ơi', 'bye bot, ' , 'bot đâu'].includes(event.body.toLowerCase())) {
        api.sendMessage({body: `${t} `}, event.threadID, (err, data) => global.client.handleReply.push({ name: this.config.name, messageID: data.messageID }), event.messageID);
    };
};

module.exports.handleReply = async function({ handleReply: $, api, event }) {
    const response = simi('ask', event.body); // Sử dụng hàm simi từ mã mới
    if (response.error) return api.sendMessage(`${response.error}`, event.threadID, (err, data) => global.client.handleReply.push({ name: this.config.name, messageID: data.messageID }), event.messageID);
    else api.sendMessage({ body: `${response.answer} ` }, event.threadID, (err, data) => global.client.handleReply.push({ name: this.config.name, messageID: data.messageID }), event.messageID);
};