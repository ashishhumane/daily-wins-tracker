import { startOfWeek, addDays, format } from "date-fns";

export interface Task {
  id: string;
  name: string;
  checks: Record<string, boolean>; // date string -> checked
  createdAt: string;
}

const STORAGE_KEY = "progress-tracker-tasks";

export function getWeekDays(weekStart: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
}

export function getWeekStart(date: Date): Date {
  return startOfWeek(date, { weekStartsOn: 1 });
}

export function dateKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function loadTasks(): Task[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
