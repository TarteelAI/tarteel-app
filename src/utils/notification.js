import { Notifications, Permissions } from "expo";


const localNotification = {
  title: 'Tarteel',
  body: 'Don\'t forget to contribute some ayas to Tarteel today', // (string) — body text of the notification.
  ios: { // (optional) (object) — notification configuration specific to iOS.
    sound: true // (optional) (boolean) — if true, play a sound. Default: false.
  },
  android: // (optional) (object) — notification configuration specific to Android.
      {
        sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
        //icon (optional) (string) — URL of icon to display in notification drawer.
        //color (optional) (string) — color of the notification icon in notification drawer.
        priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
        sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
        vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
        // link (optional) (string) — external link to open when notification is selected.
      }
};

export const bindNotifications = async (value) => {
  let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (result.status === "granted") {
    console.log("Notification permissions granted.");
  }
  let now = new Date();
  const day = 1000 * 60 * 60 * 24;
  const time = now.getTime() + (value === "day" ? day : (day * 7));
  const schedulingOptions = {
    time, // (date or number) — A Date object representing when to fire the notification .
    repeat: value
  };

  await Notifications.cancelAllScheduledNotificationsAsync();
  if(value !== "off")
    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);

}