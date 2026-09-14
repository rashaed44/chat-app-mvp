# Push notifications & Cloud Functions

This project includes a Cloud Function that triggers on new messages and sends push notifications through the Expo Push API.

Deploy Cloud Functions
1) Install Firebase CLI: https://firebase.google.com/docs/cli
   npm install -g firebase-tools
2) Login and initialize functions (if not already):
   firebase login
   firebase init functions
   (choose JavaScript and place code in the `functions` folder)
3) From project root deploy functions:
   cd functions
   npm install
   firebase deploy --only functions

Notes
- The Cloud Function uses the Expo Push API, so the client must register Expo push tokens and save them into `users/{userId}.expoPushTokens`.
- The function assumes `users` documents contain an array field `expoPushTokens` with valid Expo push tokens.
