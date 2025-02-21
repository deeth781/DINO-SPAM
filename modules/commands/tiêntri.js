module.exports.config = {
  name: "tientri",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "binee",
  description: "Tiên tri về bạn",
  commandCategory: "Bói toán",
  usages: "",
  cooldowns: 3,
  dependencies: {
      "request": "",
      "fs": ""
  }

};

module.exports.run = async({ api, event, args, Users }) => {

  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];
  const nn = ["Kế toán","Ca sĩ","Thợ sửa ổ khóa","Bán ve chai","Đào mỏ","Bác sĩ","Bác sĩ thú ý","diễn viên","Nghệ sĩ","Công nhân","Làm đĩ","Bán vé số","Tiếp viên hàng không","Quản lí ngân hàng","Chủ cửa hàng thú cưng","Ăn hàng ở không","Vô gia cư","Thất nghiệp","Bán chè","Kinh doanh ma túy","Chế tạo máy tính","Hacker","Tricker","Ăn bám gia đình","Phụ hồ","Staker chuyên nghiệp","Công tác viên Facebook","Bán hàng sida","Bán hàng online","Thợ may","Làm móng/nail","Thợ điện","Thu tiền nước","Dọn vệ sing","Lao công","Bảo vệ ở Bách Hóa Xanh","Bảo vệ ở Điện máy xanh","Streamer","Cầu thủ bóng đá","Họa sĩ","Thạc sĩ","Tổng thống","Chủ tịch xã","Chủ tịch huyện","Chủ tịch tỉnh","Chủ tịch nước","Cận vệ của tổng thống","Osin","Nhân viên bán hàng","Giang hồ","Giang Hồ mõm","Tiktoker","Youtuber","Giao dịch","Quản trị khách sạn","Lắp đặt camera","Giao hàng online","Bán xe đạp","Bán xe máy","Bán xe máy","Bán xe oto","Bán nhà","Bán đất","Nông dân","làm ruộng","lồng tiến phim hoạt hình","lồng tiến phim sex","Đóng phim sex","Người hầu","Kế ngôi Thầy ông nội","Lau kính","Chà bồn cầu","Nhà tiên tri","Chế tạo máy móc","Xưởng gỗ","Hải tặc","Mhà phép thuật","Tài xế","Xe ôm","Bán bánh mì","Thợ câu cá",];
  var tile = Math.floor(Math.random() * 101);
  var tm = Math.floor(Math.random() * 101);
  var sm = Math.floor(Math.random() * 101);
  var st = Math.floor(Math.random() * 101);
  var sl = Math.floor(Math.random() * 101);
  var giau = Math.floor(Math.random() * 101);
  var chet = Math.floor(Math.random() * 150);

if (!args[0]) {
  var id = event.senderID;
  var name = (await Users.getData(id)).name
  var callback = () => api.sendMessage({body:`💈──── •🍄• ────💈\n💛${name}💛\n🧠 𝐓𝐡𝐨̂𝐧𝐠 𝐌𝐢𝐧𝐡: 【${tm}%】\n🎀 𝐍𝐠𝐡𝐞̂̀ 𝐧𝐠𝐡𝐢𝐞̣̂𝐩: ${nn[Math.floor(Math.random() * nn.length)]}\n💪 𝐒𝐮̛́𝐜 𝐌𝐚̣𝐧𝐡: 【${sm}%】\n🧛‍♂️ 𝐒𝐢𝐧𝐡 𝐓𝐨̂̀𝐧: 【${st}%】\n🧟‍♀️ 𝐓𝐫𝐢̀𝐧𝐡 𝐗𝐚̣𝐨 𝐋𝐨̂̀𝐧: 【${sl}%】\n💸 𝐒𝐮̛̣ 𝐆𝐢𝐚̀𝐮 𝐂𝐨́: 【${giau}%】\n⏳ 𝐓𝐮𝐨̂̉𝐢 𝐓𝐡𝐨̣: 【${chet}】\n💈──── •🍄• ────💈`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
     return request(encodeURI(`https://graph.facebook.com/${id}/picture?height=750&width=750&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
 }

else if (Object.keys(event.mentions).length == 1) {
  var mentions = Object.keys(event.mentions)
  var name = (await Users.getData(mentions)).name
  var callback = () => api.sendMessage({body:`💈──── •🍄• ────💈\n💛${name}💛\n🧠 𝐓𝐡𝐨̂𝐧𝐠 𝐌𝐢𝐧𝐡: 【${tm}%】\n🎀 𝐍𝐠𝐡𝐞̂̀ 𝐧𝐠𝐡𝐢𝐞̣̂𝐩: ${nn[Math.floor(Math.random() * nn.length)]}\n💪 𝐒𝐮̛́𝐜 𝐌𝐚̣𝐧𝐡: 【${sm}%】\n🧛‍♂️ 𝐒𝐢𝐧𝐡 𝐓𝐨̂̀𝐧: 【${st}%】\n🧟‍♀️ 𝐓𝐫𝐢̀𝐧𝐡 𝐗𝐚̣𝐨 𝐋𝐨̂̀𝐧: 【${sl}%】\n💸 𝐒𝐮̛̣ 𝐆𝐢𝐚̀𝐮 𝐂𝐨́: 【${giau}%】\n⏳ 𝐓𝐮𝐨̂̉𝐢 𝐓𝐡𝐨̣: 【${chet}】\n💈──── •🍄• ────💈`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
     return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?height=750&width=750&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
  }

else {
if(!args[1]){
if (event.type == "message_reply") idmen = event.messageReply.senderID
  else idmen = event.senderID;
  var name = (await Users.getData(idmen)).name
  var callback = () => api.sendMessage({body:`💈──── •🍄• ────💈\n💛${name}💛\n🧠 𝐓𝐡𝐨̂𝐧𝐠 𝐌𝐢𝐧𝐡: 【${tm}%】\n🎀 𝐍𝐠𝐡𝐞̂̀ 𝐧𝐠𝐡𝐢𝐞̣̂𝐩: ${nn[Math.floor(Math.random() * nn.length)]}\n💪 𝐒𝐮̛́𝐜 𝐌𝐚̣𝐧𝐡: 【${sm}%】\n🧛‍♂️ 𝐒𝐢𝐧𝐡 𝐓𝐨̂̀𝐧: 【${st}%】\n🧟‍♀️ 𝐓𝐫𝐢̀𝐧𝐡 𝐗𝐚̣𝐨 𝐋𝐨̂̀𝐧: 【${sl}%】\n💸 𝐒𝐮̛̣ 𝐆𝐢𝐚̀𝐮 𝐂𝐨́: 【${giau}%】\n⏳ 𝐓𝐮𝐨̂̉𝐢 𝐓𝐡𝐨̣: 【${chet}】\n💈──── •🍄• ────💈`,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
     return request(encodeURI(`https://graph.facebook.com/${idmen}/picture?height=750&width=750&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());

  }
}
}
