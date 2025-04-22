import { STORAGE_KEYS, loadFromStorage, saveToStorage } from "./storageService";
import { Task } from "../models/Task";
import { Goal } from "../models/Goal";
import { Idea } from "../models/Idea";
import * as db from "./databaseService";

/**
 * Service for handling data synchronization between IndexedDB and localStorage
 */

// Track online status
export let isOnline = navigator.onLine;

// Listen for online/offline events
window.addEventListener("online", () => {
  isOnline = true;
  syncDataWithStorage();
});

window.addEventListener("offline", () => {
  isOnline = false;
});

/**
 * Initialize the database with data from localStorage
 */
export const initializeDatabase = async (): Promise<void> => {
  try {
    // Load tasks from localStorage
    const tasks = loadFromStorage<Task[]>(STORAGE_KEYS.TASKS, []);
    for (const task of tasks) {
      await db.saveTask(task);
    }

    // Load goals from localStorage
    const goals = loadFromStorage<Goal[]>(STORAGE_KEYS.GOALS, []);
    for (const goal of goals) {
      await db.saveGoal(goal);
    }

    // Load ideas from localStorage
    const ideas = loadFromStorage<Idea[]>(STORAGE_KEYS.IDEAS, []);
    for (const idea of ideas) {
      await db.saveIdea(idea);
    }

    console.log("Database initialized with data from localStorage");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

/**
 * Sync data from IndexedDB to localStorage
 */
export const syncDataWithStorage = async (): Promise<void> => {
  try {
    // Sync tasks
    const tasks = await db.getAllTasks();
    saveToStorage(STORAGE_KEYS.TASKS, tasks);

    // Sync goals
    const goals = await db.getAllGoals();
    saveToStorage(STORAGE_KEYS.GOALS, goals);

    // Sync ideas
    const ideas = await db.getAllIdeas();
    saveToStorage(STORAGE_KEYS.IDEAS, ideas);

    console.log("Data synced with localStorage");
  } catch (error) {
    console.error("Error syncing data with localStorage:", error);
  }
};

/**
 * Convert ISO date strings back to Date objects
 */
export const convertDatesFromISOStrings = <T>(items: any[]): T[] => {
  return items.map((item) => {
    const result = { ...item };

    // Convert common date fields
    ["dueDate", "startDate", "endDate", "createdAt", "updatedAt"].forEach(
      (field) => {
        if (item[field] && typeof item[field] === "string") {
          result[field] = new Date(item[field]);
        }
      },
    );

    return result as T;
  });
};
