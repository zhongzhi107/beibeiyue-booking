const axios = require('axios');

function paddingZero(n) {
  if (parseInt(n, 10) < 10) {
    return `0${n}`;
  }
  return n;
}

function formatDate(now) {
  return [
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate()
  ].map(n => paddingZero(n)).join('-');
}

module.exports = {
  formatDate,
  fetch: url => axios.request({
    baseURL: 'https://newmobile.beibeiyue.com/s/',
    url,
    method: 'get',
    headers: {
      // 会员信息：小爱
      Cookie: 'JSESSIONID=C63A4577A6026B01BE6D5A108936F717'
    }
  })
};
