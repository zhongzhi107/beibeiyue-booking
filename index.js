const { fetch, formatDate } = require('./util');

function booking(date) {
  // 预订席位数量
  const COUNT = 2;

  // 预订的时间段
  const HOUR = 10;

  const promises = [];
  for (let i = 0; i < COUNT; i++) {
    promises.push(new Promise(resolve => {
      setTimeout(() => {
        fetch(`reserve?babyType=1&date=${date}&hour=${HOUR}&minute=00&remark=&storeId=1210&teacher=2881`).then((data) => {
          resolve(data);
        });
      }, i * 1000);
    }));
  }

  console.log(`\n当前时间：${new Date()}`);
  console.log(`> 正在预订 ${date} 的席位...`);
  Promise.all(promises).then((res) => {
    // console.log('--res:', res);
    const successResults = res.filter(item => item.data.result === '0');
    if (successResults.length === COUNT) {
      console.log('  预订成功');
    } else {
      // 退订
      console.log(`  预订数量不足(${successResults.length} < ${COUNT})，预订失败`);

      if (successResults.length > 0) {
        console.log('> 正在取消已预订席位...');
        successResults.forEach(item => {
          const { id } = item.data.data;
          fetch(`reserveCancel?id=${id}`).then(res => {
            if (res.data.result === '0') {
              console.log(`  取消 ${id} ... 成功`);
            } else {
              console.log(`  取消 ${id} ... 失败`);
            }
          });
        });
      }
    }
  })
}

const bookDate = new Date(Date.now() + 1000 * 3600 * 24 * 8); // 能预订8天后
const weekIndex = bookDate.getDay(); // 0（周日） 到 6（周六）

// 预订每周日、三的席位
if ([0, 3].indexOf(weekIndex) > -1) {
  booking(formatDate(bookDate));
}
