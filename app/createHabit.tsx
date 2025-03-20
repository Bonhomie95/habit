// app/createHabit.tsx
import { useState } from 'react';
import { Text, TextInput, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { v4 as uuidv4 } from 'uuid';

import { saveHabit } from '../utils/storage';

export default function CreateHabitScreen() {
  const router = useRouter();
  const [habitName, setHabitName] = useState('');

  async function handleSaveHabit() {
    console.log('Save button clicked'); // debug log
    if (!habitName.trim()) {
      alert('Please enter a habit name');
      return;
    }

    const newHabit = {
      id: uuidv4(),
      name: habitName.trim(),
      startDate: new Date().toISOString().slice(0, 10),
      history: {},
    };

    const dataCheck = await saveHabit(newHabit);
    console.log('New habit saved:', dataCheck);
    router.replace('/'); // or router.push('/')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Create a New Habit</Text>
      <TextInput
        style={styles.input}
        placeholder="Habit name"
        value={habitName}
        onChangeText={setHabitName}
      />
      <Button title="Save" onPress={handleSaveHabit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 22,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
