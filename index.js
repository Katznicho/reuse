/**
 * @format
 */
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import NotificationService from './src/services/NotificationService';


//check if there is a remote notification and alert
messaging().onNotificationOpenedApp(remoteMessage => {
    // console.log(
    //     'Notification caused app to open from background state:',
    //     remoteMessage.notification,
    // );
    // Alert.alert(
    //     'Notification caused app to open from background state:',
    //     remoteMessage.notification,
    // );
    NotificationService.displayLocalNotification(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
    )
    
    
});

messaging().onMessage(remoteMessage => {
  NotificationService.displayLocalNotification(
    remoteMessage.notification.title,
    remoteMessage.notification.body,

    );

});

AppRegistry.registerComponent(appName, () => App);
