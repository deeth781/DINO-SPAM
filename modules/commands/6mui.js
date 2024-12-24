module.exports.config = {
  name: "6mui",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Vtuan",
  description: "Xem ảnh",
  commandCategory: "Random-img",
  usages: "",
  cooldowns: 2
};

module.exports.run = async ({ api, event, Users }) => {
  const axios = require('axios');
  const fs = require("fs");
  const girl = require('./../../img/mui.json');

  let imagesToDownload = [];
  for (let i = 0; i < 4; i++) {
    let image = girl[Math.floor(Math.random() * girl.length)].trim();
    imagesToDownload.push(image);
  }

  function downloadAndSendImages(index) {
    if (index < imagesToDownload.length) {
      let fileName = `${index + 1}.png`;
      axios({
        method: 'get',
        url: imagesToDownload[index],
        responseType: 'stream'
      }).then(response => {
        response.data.pipe(fs.createWriteStream(__dirname + '/' + fileName))
          .on('finish', () => {
            downloadAndSendImages(index + 1);
          });
      }).catch(error => {
        console.error('Error downloading image:', error);
      });
    } else {
      sendImages();
    }
  }

  function sendImages() {
    let attachments = [];
    for (let i = 1; i <= 4; i++) {
      attachments.push(fs.createReadStream(__dirname + `/${i}.png`));
    }

    api.sendMessage({
      body: 'Six múi của bé đây:3',
      attachment: attachments
    }, event.threadID, () => {
      for (let i = 1; i <= 4; i++) {
        fs.unlinkSync(__dirname + `/${i}.png`);
      }
    }, event.messageID);
  }

  downloadAndSendImages(0);
}