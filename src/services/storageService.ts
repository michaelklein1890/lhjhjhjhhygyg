/**
 * Service for handling local storage operations
 */

// Storage keys
export const STORAGE_KEYS = {
  TASKS: "taskManager_tasks",
  GOALS: "taskManager_goals",
  IDEAS: "taskManager_ideas",
  SETTINGS: "taskManager_settings",
};

/**
 * Save data to localStorage
 * @param key Storage key
 * @param data Data to save
 */
export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
  }
};

/**
 * Load data from localStorage
 * @param key Storage key
 * @param defaultValue Default value if nothing found
 * @returns Parsed data or default value
 */
export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const storedData = localStorage.getItem(key);
    if (!storedData) return defaultValue;
    return JSON.parse(storedData) as T;
  } catch (error) {
    console.error(`Error loading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

/**
 * Helper function to convert date strings back to Date objects in loaded data
 * @param obj Object with potential date strings
 * @param dateFields Array of field names that should be converted to Date objects
 * @returns Object with converted Date objects
 */
export const convertDates = <T>(obj: any, dateFields: string[]): T => {
  const result = { ...obj };

  dateFields.forEach((field) => {
    if (obj[field] && typeof obj[field] === "string") {
      result[field] = new Date(obj[field]);
    }
  });

  return result as T;
};

/**
 * Clear all application data from localStorage
 */
export const clearAllStorageData = (): void => {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
};
