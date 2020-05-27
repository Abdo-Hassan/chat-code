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

// function clearTyping(messages) {
//   messages.filter((message) => {
//     console.log(message);
//     return message;
//   });
// }

// module.exports = { clearTyping, formatMessage };
module.exports = formatMessage;
