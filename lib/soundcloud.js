const axios = require('axios');
async function getData(url) {
    var { data } = await axios(`https://api.phamvandien.xyz/soundcloud?url=${encodeURI(url)}`);
    return data
}

async function search(keywords, limit) {
    var { data } = await axios.get(`https://api.phamvandien.xyz/soundcloud?search=${encodeURI(keywords)}&limit=${limit || 10}`);
    return data
}
module.exports = {
    getData,
    search
}