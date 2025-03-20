// utils/notifications.ts
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// 1. Request Permissions (iOS needs an actual prompt, Android is usually automatic)
export async function requestNotificationPermissions() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Notifications permission not granted!');
  }
}

// 2. Schedule a daily reminder at a specific hour/minute
export async function scheduleDailyReminder(hour: number, minute: number) {
  // Some versions of expo-notifications require "calendar" triggers
  // with dateComponents, so let's do that:
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Daily Reminder',
      body: 'Don’t forget your habit!',
    },
    trigger: {
      type: 'calendar',
      repeats: true,
      dateComponents: {
        hour: 8,
        minute: 0,
        second: 0,
        isLeapMonth: false,
      },
    } as unknown as Notifications.NotificationTriggerInput,
  });
}
