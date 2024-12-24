exports.config = {
  name: 'eval',
  version: '0.0.1',
  hasPermssion: 2,
  credits: 'DC-Nam',
  description: 'Run code js',
  commandCategory: 'Hệ Thống',
  usages: '[code]',
  cooldowns: 1
};
exports.run = function(o) {
  let send =x=>o.api.sendMessage(x, o.event.threadID, o.event.messageID);
  try {
    eval(o.args.join(' '));
  } catch (e) {
    send(e.toString());
  };
};