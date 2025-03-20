// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <SafeAreaProvider>
    <SafeAreaView  style={{ flex: 1 }}>
      {/* A global Stack navigator provided by expo-router */}
      <Stack
        screenOptions={{
          headerShown: false, // Hide top header if you prefer
        }}
      />
      {/* Optional: a universal StatusBar style */}
      <StatusBar style="auto" />
    </SafeAreaView>
    </SafeAreaProvider>
  );
}
