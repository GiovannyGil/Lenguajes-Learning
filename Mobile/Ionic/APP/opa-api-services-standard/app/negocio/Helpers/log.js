const fs = require('fs');
const path = require('path');

function log(flag, content) {
  const str = typeof content === 'string' ? content : JSON.stringify(content, null, 4);

  fs
    .appendFile(path.join(process.cwd(), 'temp/message.txt'), `\n\n${flag}${str}`, () => {});
}
module.exports = log;
