import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { auth, db } from './firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

export async function registerForPushNotificationsAsync() {
  let token;
  if (!Constants.isDevice) {
    console.warn('Must use physical device for Push Notifications');
    return null;
  }
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    console.warn('Failed to get push token for push notification!');
    return null;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;

  // For Android, you may want to set notification channel
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // Save token to Firestore under users/{uid}/expoPushTokens
  const user = auth.currentUser;
  if (user && token) {
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { expoPushTokens: arrayUnion(token) });
    } catch (e) {
      console.warn('Failed to save push token to Firestore', e);
    }
  }

  return token;
}
