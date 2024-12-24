const getIP = require('ipware')().get_ip;
const fs = require("fs-extra");
module.exports = function (req, res, next) {
  const listIPBlocked = JSON.parse(fs.readFileSync('./blockedIP.json', { encoding: 'utf-8' }));
  if (listIPBlocked.includes(getIP(req).clientIp)) {
    res.status(403).send({
      AUTHOR: 'R1zaX',
      STATUS: 'ERROR 404',
      MESSAGE: 'NGU THÌ CHẾT THÔI, LẦN SAU CHỪA TẬT XÀM LỒN NHÉ 😏',
      INBOX: 'MUỐN GỠ THÌ INB FACEBOOK'
    });
  } 
  else {
    next();
  }
}