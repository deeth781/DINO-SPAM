let axios = require('axios');
let fs = require('fs');

let is_url = url=>/^http(s|):\/\//.test(url);
let stream_url = (url, type)=>axios.get(url, {
  responseType: 'arraybuffer'
}).then(res=> {
  let path = __dirname+'/cache/'+Date.now()+'.'+type;

  fs.writeFileSync(path, res.data);
  setTimeout(p=>fs.unlinkSync(p), 1000*60, path);

  return fs.createReadStream(path);
});

exports.config = {
  name: 'autotiktok',
  version: '0.0.1',
  hasPermssion: 0,
  Rent: 2,
  credits: 'DC-Nam',
  description: '.',
  commandCategory: 'Admin-Hệ Thống',
  usages: 'autodowntiktok',
  cooldowns: 0
};
exports.run = function(o) {};
exports.handleEvent = async function(o) {
  try {
    let a = o.event.args[0];
    let send = (msg, callback)=>o.api.sendMessage(msg, o.event.threadID, callback, o.event.messageID);

    if (!is_url(a))return;
    if (/tiktok\.com/.test(a)) {
      let res = await axios.post(`https://www.tikwm.com/api/`, {
        url: a
      });
      if (res.data.code != 0)throw res;

      let tiktok = res.data.data;
      let attachment = [];

      if (typeof tiktok.images == 'object')for (let image_url of tiktok.images)attachment.push(await stream_url(image_url, 'jpg')); else attachment.push(await stream_url(tiktok.play, 'mp4'));

      send({
        body: `== [ AUTODOWN TIKTOK ] ==\n‣ Tiêu đề:${tiktok.title}\n‣ Lượt thích: ${tiktok.digg_count}\n‣ Tác giả: ${tiktok.author.nickname}\n‣ ID tiktok: ${tiktok.author.unique_id}`,
        attachment
      });
    }
  }catch {};
};