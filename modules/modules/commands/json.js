module.exports.config = {
  name: "json",
  version: "1.0.0",
  hasPermssion: 3,
  credits: "Vtuan",
  description: "Xem ảnh",
  commandCategory: "Hệ Thống",
  usages: "",
  cooldowns: 2
};
module.exports.run = async ({ api, event ,Users}) => {
  const fs = require('fs');
  const readline = require('readline');
  const path = require('path');

  let urls = [];

  let fileStream = fs.createReadStream(path.join(__dirname, 'ảnh','tag.txt'));

  let rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    urls.push(`"${line}"`);
  });

  fileStream.on('end', () => {
    let result = `[${urls.join(",\n")}]`;

    let outputDir = path.join(__dirname, 'output');
    let outputFile = path.join(outputDir, 'tag.json');


    if (!fs.existsSync(outputDir)){
      fs.mkdirSync(outputDir);
    }

    fs.writeFile(outputFile, result, function (err) {
      if (err) return console.log(err);
      console.log('đã thay đổi ' + outputFile);
    });
  });


}
