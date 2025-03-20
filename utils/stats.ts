// utils/stats.ts
import { Habit } from './storage';

// Calculate consecutive days done up to today
export function calculateStreak(history: Record<string, boolean>): number {
  let streak = 0;
  const todayString = new Date().toISOString().slice(0, 10);
  let currentDate = new Date(todayString);

  while (true) {
    const dateKey = currentDate.toISOString().slice(0, 10);
    if (history[dateKey]) {
      streak++;
      // move back one day
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

// Completion rate: how many days completed vs total days since start
export function calculateCompletionRate(habit: Habit): number {
  const start = new Date(habit.startDate);
  const today = new Date();
  
  let totalDays = 0;
  let daysCompleted = 0;

  const currentDay = new Date(start);
  while (currentDay <= today) {
    totalDays++;
    const dateKey = currentDay.toISOString().slice(0, 10);
    if (habit.history[dateKey]) {
      daysCompleted++;
    }
    currentDay.setDate(currentDay.getDate() + 1);
  }

  return totalDays > 0 ? (daysCompleted / totalDays) * 100 : 0;
}
