### Push Notifications

This project includes a simple example script to send FCM push notifications from a server using the FCM server key.

1) To send a notification from your server or locally:
   node scripts/send-fcm.js <FCM_SERVER_KEY> <deviceToken> "Title" "Body"

2) To get device tokens in a production mobile app, use `expo-notifications` (Expo) or `@react-native-firebase/messaging` (bare RN) to obtain the device token and store it in `users/{userId}/tokens` collection.

3) For serverless approach, you can implement a Firebase Cloud Function (Node.js) that triggers on new messages to send notifications to conversation members.
