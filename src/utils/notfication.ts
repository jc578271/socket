import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import DeviceInfo from 'react-native-device-info';
import notifee from '@notifee/react-native';
import RNCallKeep from 'react-native-callkeep';
import {PermissionsAndroid} from 'react-native';

const ref = database().ref('/fcmtokens');

/* -- setup notification when boot the app -- */
export const setupNotification = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await messaging().registerDeviceForRemoteMessages();

      // Get the token
      const token = await messaging().getToken();

      const deviceId = await DeviceInfo.getUniqueId();

      await ref.child(deviceId).set(token);

      console.log('register fcm success');
    }
  } catch (e) {
    console.log('err:', e);
  }
};

/* -- on receive notification -- */
export const onNotification = () => {
  const onMessageReceived = async (
    message: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    console.log('message', message);
    if (message.notification) {
      // RNCallKeep.displayIncomingCall(
      //   uuid,
      //   '123123123',
      //   'wefwefewf',
      //   'number',
      //   false,
      // );
      await notifee.displayNotification(message.notification);
    }
  };

  messaging().onMessage(onMessageReceived);
  messaging().setBackgroundMessageHandler(onMessageReceived);
};

const options = {
  ios: {
    appName: 'ReactNativeWazoDemo',
    imageName: 'sim_icon',
    supportsVideo: false,
    maximumCallGroups: '1',
    maximumCallsPerCallGroup: '1',
  },
  android: {
    alertTitle: 'Permissions Required',
    alertDescription:
      'This application needs to access your phone calling accounts to make calls',
    cancelButton: 'Cancel',
    okButton: 'ok',
    imageName: 'sim_icon',
    additionalPermissions: [PermissionsAndroid.PERMISSIONS.READ_CONTACTS],
  },
};

RNCallKeep.setup(options).then(accepted => {});

RNCallKeep.getInitialEvents().then();
RNCallKeep.setAvailable(true);

RNCallKeep.setForegroundServiceSettings({
  channelId: 'com.company.my',
  channelName: 'Foreground service for my app',
  notificationTitle: 'My app is running on background',
  notificationIcon: 'Path to the resource icon of the notification',
});
