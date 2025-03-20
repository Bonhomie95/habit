// app/notificationsTest.tsx
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {
  requestNotificationPermissions,
  scheduleDailyReminder,
} from '../utils/notifications';

export default function NotificationsTest() {
  const router = useRouter();

  async function handleRequestPermissions() {
    await requestNotificationPermissions();
  }

  async function handleSchedule() {
    // Example: schedule a 8 AM daily reminder
    await scheduleDailyReminder(8, 0);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications Test</Text>
      <Button title="Request Permissions" onPress={handleRequestPermissions} />
      <Button title="Schedule 8 AM Daily" onPress={handleSchedule} />
      <Button title="Go Home" onPress={() => router.push('/')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
});
