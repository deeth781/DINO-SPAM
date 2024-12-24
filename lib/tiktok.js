const axios = require('axios');
const searchVideo = async (keywords) => {
  var { data } = await axios(`https://api.phamvandien.xyz/tiktok?search=${encodeURI(keywords)}`);
  return data
};

const getData = async (url) => {
  var { data } = await axios(`https://api.phamvandien.xyz/tiktok?url=${url}`);
  return data
};
const getInfoUser = async (username) => {
  var { data } = await axios.get(`https://api.phamvandien.xyz/tiktok?username=${username}`)
  return data
}

module.exports = {
  getData,
  searchVideo,
  getInfoUser
}
