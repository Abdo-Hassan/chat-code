const moment = require('moment');

function formatMessage(username, text = null, image = null, typing = null) {
  return {
    username,
    text,
    image,
    typing,
    time: moment().format('h:mm a'),
  };
}
module.exports = formatMessage;
