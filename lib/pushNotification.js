var env = require('./env.js');

function sendPushNotification(content) {
  return fetch(env('PUSH_NOTIFICATION_ENDPOINT'), {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content })
  })
  .then(res => res.json())
}

module.exports = sendPushNotification
