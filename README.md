# Chat App MVP

This repository is an Expo React Native (TypeScript) scaffold for a chat application using Firebase (Auth, Firestore, Storage, FCM).

Features included:
- Authentication (email/password) scaffold
- Chats list + Chat screen with realtime messages (Firestore listeners)
- Media upload (Firebase Storage) scaffold
- FCM setup instructions (server key not included)

Setup (local)
1. Install prerequisites: Node.js, npm, Expo CLI
   npm install -g expo-cli

2. Clone and install
   git clone https://github.com/rashaed44/chat-app-mvp.git
   cd chat-app-mvp
   npm install

3. Create Firebase project and enable:
   - Authentication (Email/Password)
   - Firestore (start in test mode during development)
   - Storage
   - Cloud Messaging (FCM)

4. Create a .env file at project root (see .env.example) and fill your Firebase config.

5. Run the app
   npm start

Notes
- Fill in FCM server key if you plan to send push notifications from your server or Cloud Functions.
- For production, secure Firestore rules and enable app signing keys for iOS.

License: MIT
