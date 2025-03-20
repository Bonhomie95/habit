// app/index.tsx
import { useState } from 'react';
import {
  Text,
  Button,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { getHabits, Habit } from '../utils/storage';
import { calculateStreak } from '../utils/stats';
import { useCallback, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);

  // Re-fetch habits whenever the screen becomes active
  useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, [])
  );

  async function fetchHabits() {
    const data = await getHabits();
    console.log('Home screen re-fetched habits:', data);
    setHabits(data);
  }

  // Navigate to the detail screen for a selected habit
  function handlePressHabit(habitId: string) {
    router.push(`/${habitId}`);
  }

  // Render a single habit item using our animated component
  const renderHabit = ({ item }: { item: Habit }) => {
    return (
      <HabitListItem habit={item} onPress={() => handlePressHabit(item.id)} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Habits</Text>

      <SafeAreaView style={styles.createButtonWrapper}>
        <Button
          title="Create New Habit"
          onPress={() => router.push('/createHabit')}
        />
      </SafeAreaView>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={renderHabit}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

/**
 * HabitListItem: Renders a single habit row with a gentle "press" animation.
 * - Shrinks to 95% scale on press in, returns to 100% on press out.
 * - Displays habit name and streak.
 */
function HabitListItem({
  habit,
  onPress,
}: {
  habit: Habit;
  onPress: () => void;
}) {
  // For a small press animation
  const scaleAnim = useRef(new Animated.Value(1)).current;

  function onPressIn() {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  }

  function onPressOut() {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  // Calculate the streak for display
  const streak = calculateStreak(habit.history);

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={1}
      style={styles.touchable}
    >
      <Animated.View
        style={[styles.habitItem, { transform: [{ scale: scaleAnim }] }]}
      >
        <Text style={styles.habitName}>{habit.name}</Text>
        <Text style={styles.streakText}>Streak: {streak} days</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  createButtonWrapper: {
    marginBottom: 16,
  },
  touchable: {
    marginBottom: 10,
  },
  habitItem: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
  },
  habitName: {
    fontSize: 18,
    marginBottom: 4,
  },
  streakText: {
    color: '#666',
  },
});
