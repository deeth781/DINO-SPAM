module.exports.config = {
  name: "echo", // Tên lệnh, được sử dụng trong việc gọi lệnh
  version: "1.0.0", // phiên bản của module này
  hasPermssion: 0, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
  credits: "DungUwU", // Công nhận module sở hữu là ai
  description: "gửi tin nhắn", // Thông tin chi tiết về lệnh
  commandCategory: "Tiện ích", // Thuộc vào nhóm nào: system, other, game-sp, game-mp, random-img, edit-img, media, economy, ...
  usages: "", // Cách sử dụng lệnh
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
    return api.sendMessage(args.join(" "), event.threadID);
}