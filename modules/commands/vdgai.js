module.exports.config = {
  name: "vdgai",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Vtuan",
  Rent: 2,
  description: "Xem video về anime chill",
  commandCategory: "Random-img",
  usages: "",
  cooldowns: 2
};

module.exports.run = async ({ api, event ,Users}) => {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  const video = require('./../../img/vdgai.json');
  const randomVideo = video[Math.floor(Math.random() * video.length)].trim();
  const fileName = '2.mp4';
  const filePath = __dirname + `/${fileName}`;

  function downloadAndSendImage(image, fileName, callback) {
    request(image).pipe(fs.createWriteStream(fileName)).on("close", callback);
  }

  let callback = function () {
    return api.sendMessage({
      body: 'Video gái của bạn đây',
      attachment: [
        fs.createReadStream(filePath)
      ]
    }, event.threadID, () => {
      fs.unlinkSync(filePath);
    }, event.messageID);
  };
  downloadAndSendImage(randomVideo, filePath, callback);
}
