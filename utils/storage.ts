import AsyncStorage from '@react-native-async-storage/async-storage';

const HABITS_KEY = 'HABITS_LIST';

export type Habit = {
  id: string;
  name: string;
  startDate: string;
  history: Record<string, boolean>;
};

export async function getHabits(): Promise<Habit[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(HABITS_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error reading habits', error);
    return [];
  }
}

export async function saveHabit(newHabit: Habit) {
  const current = await getHabits();
  current.push(newHabit);
  await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(current));
}
