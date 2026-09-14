// Simple Node script example to send FCM notifications using server key
// Usage: node scripts/send-fcm.js <FCM_SERVER_KEY> <deviceToken> "Title" "Body"

const fetch = require('node-fetch');

const key = process.argv[2];
const token = process.argv[3];
const title = process.argv[4] || 'New message';
const body = process.argv[5] || 'You have a new message';

if (!key || !token) {
  console.error('Usage: node send-fcm.js <FCM_SERVER_KEY> <deviceToken> "Title" "Body"');
  process.exit(1);
}

const payload = {
  to: token,
  notification: {
    title,
    body,
    sound: 'default',
  },
  data: { customData: 'chat' },
};

fetch('https://fcm.googleapis.com/fcm/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `key=${key}`,
  },
  body: JSON.stringify(payload),
})
  .then((res) => res.json())
  .then((json) => console.log('FCM response:', json))
  .catch((err) => console.error('FCM error:', err));
