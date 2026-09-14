const fetch = require('node-fetch');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

// Trigger on new messages in conversations/{convId}/messages/{msgId}
exports.onMessageCreated = functions.firestore
  .document('conversations/{convId}/messages/{msgId}')
  .onCreate(async (snap, context) => {
    const message = snap.data();
    const convId = context.params.convId;

    try {
      const convRef = db.doc(`conversations/${convId}`);
      const convSnap = await convRef.get();
      if (!convSnap.exists) return null;
      const conv = convSnap.data();
      const members = conv.members || [];

      // Get expo push tokens for each member except sender
      const tokens = [];
      for (const uid of members) {
        if (uid === message.senderId) continue;
        const userSnap = await db.doc(`users/${uid}`).get();
        if (!userSnap.exists) continue;
        const userData = userSnap.data();
        const expoTokens = userData.expoPushTokens || [];
        tokens.push(...expoTokens);
      }

      if (tokens.length === 0) return null;

      // Build messages for Expo Push API
      const messages = tokens.map((token) => ({
        to: token,
        sound: 'default',
        title: conv.title || 'رسالة جديدة',
        body: message.text ? (message.text.length > 100 ? message.text.substring(0, 97) + '...' : message.text) : 'صورة',
        data: { convId, messageId: snap.id },
      }));

      // Send in chunks (Expo recommends max 100 per request)
      const chunkSize = 100;
      for (let i = 0; i < messages.length; i += chunkSize) {
        const chunk = messages.slice(i, i + chunkSize);
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: { Accept: 'application/json', 'Accept-encoding': 'gzip, deflate', 'Content-Type': 'application/json' },
          body: JSON.stringify(chunk),
        });
      }
    } catch (err) {
      console.error('Error sending push notifications', err);
    }

    return null;
  });
