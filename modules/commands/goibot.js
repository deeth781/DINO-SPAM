module.exports.config = {
    name: 'goibot',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'DC-Nam',//mod thêm by tpk 
    description: 'Trò truyện cùng simi chat',
    commandCategory: 'Hệ Thống',
    usages: '[hey simi]',
    cooldowns: 2,
};
const {
    get
} = require('axios');
const CN = `https://vanthuan.name.vn/sim?type=ask&ask=`
//https://docs-api.catteam123.repl.co/sim?type=ask&ask=sim%20%C6%A1i
module.exports.run = () => {};
module.exports.handleEvent = async function( {
    api, event 
}) {
var hm =['kêu bot có gì hok 💓', 'ơi bot nghe nè','ơi anh/chị bot nghe 🌸','có gì hog bot nè','bot nè','kêu em có gì không','💞 em nghe','em đây', "hmmmm", "Đừng spam em nha :<<", "Đừng để em nóng!!!", "cậu gọi bot có gì không?", "mệt kêu hoài -.-", "Chăm chỉ học hành đi", "Bae ăn cơm chưa?", "Tuyển phi công nè ạ", "Nếu cậu đang cô đơn thì chúng ta có thể thành đôi :3", "Đang làm gì vậy?", "Được của ló :)))", "Làm chồng em không ạ?", "đi ga chỗ khác chơi", "Công chúa em sao đấy?", "Có gì ăn không:(( đói quáaa", "Yêu em không?", "cậu bị làm sao í@@", "Bạn là nhất!!!", "Kêu chi lắm thế? Bộ thích tao rồi à :v", "Chần chờ gì chồng ơi em đâyyy", "Em... Sao em lại nói những cái lời đó chi zay em?", "Thầy dạy phờ ri màaa", "Yeu em rat nhieu ^^", "Đồ con lợn lùn :))", "Đợi xí. Đi ẻ cái :()", "500k bao phòng!!!", "Yeu anh den luy ^^", "Nên nhớ đừng bao giờ cướp chồng của admin :))", "Anh quát em à?\nNói to thế á?", "Trả quần cho em huhu", "Baby, take my hand. I want you to be my husband. Cause you're my Iron Man. And I love you 3000 <3", "Tao cười tao đi toilet=))", "Hãy nên nhớ, cuộc tình nào cũng có lúc tàn phai", "hoa hồng nở rộ 4 mùa...nối tiếp đi:)", "lalalalaaaa", "Đừng quá yêu một ai đó, khi chính bản thân bạn vẫn bị tổn thương!", "Bae, em nhu bong hoa. Nhung nguoi hai dau phai ta 💔", "Nuôi cậu để thịt ~~", "Overnight không?", "Hãy gọi cho admin tôi để được yêu thương<3", "Hát đi cho kẹo 🍭", "vợ gọi có việc gì không?", "Dzạaaaaa~~~", "gọi bot có gì hemm :3", "Dzạ em đây :>", "sao thế bae yêu dấu :>", "Sao thế công chúa", ":)))", "Nếu một ngày nào đó bạn gọi tôi mà tôi không trả lời nghĩa là bot bị payyy acccc ;-;", "Em đây", "chào bạn tôi là bot của Bảo BadBoy ", "Vợ gọi có việc gì không?", "Sử dụng •callad để liên lạc với admin!", "Em đây~~~~", "Yêu anh nhất", "chị ấy là bae của Hanh", "Sao thế công chúa nhõng nhẽo của em", "Đừng làm em đau ~~~~", "Tuyển máy bay trực thăng nè ai yêu em hog", "Cậu có cô đơn ko để mik tâm sự", "Yêu ko ạ vã quá!!!", "bot dthw như chủ của bot ạ", "Đừng khen anh ngại quá hí hí", "Làm vợ anh ko ạ?", "Đừng spam anh nha :<<, cậu chủ anh mệt lắm ời", "Cút ra😏 tớ có vợ rồi😏🖕", "Ai Làm Vợ Em Hog?", "Alaba Trap", "không được spam bot nhé các bae", "Yêu anh ko?", "Vợ anh đây rồi", "chủ tớ là thứ hai hong ai là nhất", "làm Vợ em đuy😏", "Chủ Em Đẹp Zai Khoai To Lắm UwU", "Yêu Tất Cả Mụi Người:3", "Tuyển Ghệ nè các bbi😏🖕y ạ :3", "Tôi đã học được tìm kiếm hạnh phúc bằng cách giới hạn những ham muốn của mình, hơn là tìm cách thỏa mãn chúng.", "Nếu bạn muốn thành công trong thế giới này, hãy hứa hẹn mọi thứ, và chẳng trao gì đi.", "Lòng can đảm không phải là có sức lực để đi tiếp - đó là đi tiếp khi bạn không còn sức lực.", "Mục đích của tôn giáo là để ngăn cản kẻ nghèo không giết kẻ giàu.", "Trừ phi bạn giang rộng đôi cánh, bạn sẽ không biết mình bay được bao xa.", "Tình bạn có thể giống như các tài khoản ngân hàng. Khi bạn kiếm được tiền, bạn gửi vào tài khoản tiết kiệm, và khi bạn cần tiền, bạn rút tiền. Bạn càng tiết kiệm được nhiều, bạn càng có nhiều để giúp mình vượt qua được thời buổi khó khăn. Tương tự như vậy, khi bạn đối xử tốt với ai đó, bạn bổ sung cho tình bạn (gửi vào 'ngân hàng tin cậy' của mình), và khi bạn làm ai đó tổn thương, bạn dùng bớt tình bạn. Nếu một người bạn cứ mãi rút ra từ tài khoản tình bạn của bạn, người đó sẽ làm nó cạn kiệt theo thời gian.", "Hãy nhớ rằng nợ nần chỉ là một công cụ, giống như búa hoặc cưa. Nó có thể được sử dụng để giúp bạn xây dựng một tương lai tài chính vững mạnh, hoặc đẩy sụp tương lai ấy. Bạn là người quyết định mình muốn sử dụng nó như thế nào.", "Những người đáng sợ không phải là người bất đồng ý kiến với bạn, mà là người bất đồng ý kiến với bạn nhưng quá hèn nhát để cho bạn biết điều đó.", "Kẻ ngốc nói về quá khứ, người khôn nói về hiện tại, kẻ khờ nói về tương lai.", "Thà sống cuộc đời của riêng mình một cách không hoàn hảo còn hơn bắt chước cuộc đời của người khác một cách hoàn hảo.", "Luyện tập không cho bạn sự hoàn hảo.Luyện tập làm giảm sự không hoàn hảo"]
  var t = hm[Math.random()*hm.length<<0]
    if (['bot', 'hi bot','bot đâu','bot off','bot ơi','bot xịn','kêu mọi người lên tương tác đi bot','Chào bot','hello bot','sim','sim ơi','bye bot'].includes(event.body.toLowerCase())) {
       api.sendMessage({body: `${t} `
  }, event.threadID, (err, data) => global.client.handleReply.push({
        name: this.config.name, messageID: data.messageID
    }), event.messageID);
    };
};
module.exports.handleReply = async function({
    handleReply: $, api, event
}) {
    const res = await get(`${CN}${encodeURI(event.body)}`);
   if (res.data.error) return api.sendMessage(`${res.data.error}`, event.threadID, (err, data) => global.client.hhandleReply.push({
       name: this.config.name,
       messageID: data.messageID,
       ask: event.body
   }), event.messageID); else api.sendMessage({body: `${res.data.answer} `
},event.threadID, (err, data) => global.client.handleReply.push({
        name: this.config.name, messageID: data.messageID
    }), event.messageID);
};