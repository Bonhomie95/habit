// app/[id].tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getHabits, updateHabits, Habit } from '../utils/storage';
import { calculateStreak, calculateCompletionRate } from '../utils/stats';

export default function HabitDetailScreen() {
  const { id } = useLocalSearchParams(); // 'id' from the route param [id]
  const router = useRouter();
  const [habit, setHabit] = useState<Habit | null>(null);
  const [recentlyDone, setRecentlyDone] = useState(false);

  useEffect(() => {
    loadHabit();
  }, []);

  async function loadHabit() {
    if (!id) return;
    const allHabits = await getHabits();
    const found = allHabits.find((h) => h.id === id);
    if (found) {
      setHabit(found);
    }
  }

  // Mark done for today's date
  async function handleMarkDone() {
    if (!habit) return;
    const todayKey = new Date().toISOString().slice(0, 10);
    const updatedHistory = {
      ...habit.history,
      [todayKey]: true,
    };

    const allHabits = await getHabits();
    const newHabits = allHabits.map((h) => {
      if (h.id === habit.id) {
        return { ...h, history: updatedHistory };
      }
      return h;
    });

    await updateHabits(newHabits);
    setHabit((prev) => prev && { ...prev, history: updatedHistory });
    setRecentlyDone(true);
    setTimeout(() => setRecentlyDone(false), 3000);
  }

  if (!habit) {
    return (
      <View
        style={[
          styles.container,
          recentlyDone && { backgroundColor: '#e6ffe6' }, // light green background to indicate success
        ]}
      >
        <Text>Loading habit details...</Text>
      </View>
    );
  }

  const streak = calculateStreak(habit.history);
  const completionRate = calculateCompletionRate(habit);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{habit.name}</Text>
      <Text>Current Streak: {streak} days</Text>
      <Text>Completion Rate: {completionRate.toFixed(1)}%</Text>

      <Button title="Mark Done for Today" onPress={handleMarkDone} />
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
