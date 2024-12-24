const axios = require("axios");
const regExMatchPinterest = /(https:\/\/(www.)?(pinterest.com|pin.it)[^ \n]*)/g;

module.exports.config = {
  name: "pin",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "NTKhang",
  description: "Tải video hoặc tìm kiếm ảnh trên pinterest",
  commandCategory: "Công cụ",
  usages: "down {url}\n-pinterest search {keyword}",
  cooldowns: 0
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "pinterest.jpg")) request("https://i.imgur.com/KJ8ozPz.jpg").pipe(fs.createWriteStream(dirMaterial + "pinterest.jpg"));
}
module.exports.run = async function ({ api, event, args }) {
  const p = global.config.PREFIX;
  const fs = require("fs");
  const short = require("tinyurl").shorten;
  const t = module.exports.config.name;
  const targetBody = event.messageReply ? event.messageReply.body : event.body;
  if (args[0] == "down") {
    var data = require("qs").stringify({
      'url': args[1]
    });
    const o = {
      method: 'POST',
      url: 'https://www.expertsphp.com/twitter-video-downloader.php',
      headers: {
        'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.33'
      },
      data
    };

    const res = await axios(o);
    const newData = res.data;
    const link = newData.split('<td><a href="')[1].split('"')[0];
    const t = (await axios.get(link, {
      responseType: "stream"
    })).data;
    return api.sendMessage({
      body: "Url: " + await short(link),
      attachment: t
    }, event.threadID)
  }
  else if (args[0] == "search") {
    try {
      let keyword = event.messageReply ? event.messageReply.body : args.slice(1).join(" ");
      let limit = null;

      if (!isNaN(args[args.length - 1])) {
        limit = parseInt(args[args.length - 1]);
        if (limit > 50)
          return api.sendMessage("𝗕𝗮̣𝗻 𝗰𝗵𝗶̉ 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝘁𝗮̉𝗶 𝗻𝗵𝗶𝗲̂̀𝘂 𝗻𝗵𝗮̂́𝘁 𝟱𝟬 𝗮̉𝗻𝗵", event.threadID, event.messageID);
        keyword = event.messageReply ? keyword : keyword.replace(/(\d+)$/, "").trim();
      }

      if (!keyword)
        return api.sendMessage('𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗻𝗵𝗮̣̂𝗽 𝘁𝘂̛̀ 𝗸𝗵𝗼𝗮́ 𝘁𝗶̀𝗺 𝗸𝗶𝗲̂́𝗺 🔎', event.threadID, event.messageID);

      const url = `https://apiuwuapi.ducdz999.repl.co/pinterest?search=${encodeURIComponent(keyword)}`;
      const { data } = await axios.get(url);
      let results = data.data;
      if (data.length == 0)
        return api.sendMessage(`𝗞𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗸𝗲̂́𝘁 𝗾𝘂𝗮̉ 𝘁𝗶́𝗺 𝗸𝗶𝗲̂́𝗺 𝗻𝗮̀𝗼 𝗰𝗵𝗼 𝘁𝘂̛̀ 𝗸𝗵𝗼́𝗮: ${keyword}`, event.threadID, event.messageID);

      if (limit)
        results = results.slice(0, limit);

      let getAll = await Promise.allSettled(results.map(url => axios.get(url, { responseType: "stream" })
        .then(({ data: result }) => {
          const pathDefault = result.path;
          result.path = pathDefault ? pathDefault : global.utils.randomString(10) + ".png";
          return result;
        })
        .catch(e => {
          throw e;
        })
      ));

      getAll = getAll.filter(e => e.status == "fulfilled").map(e => e.value).slice(0, 50);

      return api.sendMessage({
        body: `🌸=== [ 𝗣𝗜𝗡𝗧𝗘𝗥𝗘𝗦𝗧 ] ===🌸\n━━━━━━━━━━━━━\n\n𝗖𝗼́ ${getAll.length} 𝗸𝗲̂́𝘁 𝗾𝘂𝗮̉ 𝘁𝗶̀𝗺 𝗸𝗶𝗲̂́𝗺 𝗮̉𝗻𝗵 𝘁𝗿𝗲̂𝗻 𝗽𝗶𝗻𝘁𝗲𝗿𝗲𝘀𝘁 𝗰𝘂̉𝗮 𝘁𝘂̛̀ 𝗸𝗵𝗼𝗮́ ${keyword} 🌸\n` + (limit && limit > getAll.length ? `Đã xảy ra lỗi khi tải ${limit - getAll.length} ảnh` : ""),
        attachment: getAll
      }, event.threadID, event.messageID);
    }
    catch (e) {
      console.log(e);
      return api.sendMessage("Đã có lỗi xảy ra", event.threadID, event.messageID);
    }
  }
  else {
    return api.sendMessage({body:`🌸==『 𝗣𝗜𝗡𝗧𝗘𝗥𝗘𝗦𝗧 』==🌸\n\n→ 𝗕𝗮̣𝗻 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗱𝘂̀𝗻𝗴 𝗻𝗵𝘂̛̃𝗻𝗴 𝗰𝗵𝘂̛́𝗰 𝗻𝗮̆𝗻𝗴 𝘀𝗮𝘂:\n🔎 ${p}𝗽𝗶𝗻 𝘀𝗲𝗮𝗿𝗰𝗵: 𝗧𝘂̛̀ 𝗸𝗵𝗼𝗮́ 𝘁𝗶̀𝗺 𝗸𝗶𝗲̂́𝗺 - 𝘀𝗼̂́ 𝗮̉𝗻𝗵\n🔰 ${p}𝗽𝗶𝗻 𝗱𝗼𝘄𝗻 + 𝗹𝗶𝗻𝗸: 𝘁𝗮̉𝗶 𝗮̉𝗻𝗵/𝘃𝗱 𝗰𝗼́ 𝗰𝗵𝘂̛́𝗮 𝗹𝗶𝗻𝗸`, attachment: fs.createReadStream(__dirname + `/noprefix/pinterest.jpg`) }, event.threadID, event.messageID);
  }
};

async function getUrlDownloadImage(url) {
  const res = await axios.get(url);
  const json = JSON.parse(res.data.split('<script id="__PWS_DATA__" type="application/json">')[1].split('</script>')[0]);
  const pins = json.props.initialReduxState.pins;
  let getPins = pins[Object.keys(pins)[0]];
  if (getPins.images) {
    const images = getPins.images;
    const keyLength = Object.keys(images);
    const latestImages = images.orig || images[keyLength[keyLength.length - 1]];
    return latestImages.url;
  } else if (getPins.videos) {
    getPins = getPins.videos.video_list;
    return Object.values(getPins).pop().url;
  }
}