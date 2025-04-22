import Dexie, { Table } from "dexie";
import { Task } from "../models/Task";
import { Goal, GoalStep } from "../models/Goal";
import { Idea } from "../models/Idea";

/**
 * Database class for handling IndexedDB operations
 */
export class TaskManagerDatabase extends Dexie {
  tasks!: Table<Task>;
  goals!: Table<Goal>;
  ideas!: Table<Idea>;

  constructor() {
    super("TaskManagerDatabase");
    this.version(1).stores({
      tasks: "id, title, priority, category, dueDate, status",
      goals: "id, description, timeFrame, startDate, endDate, progress",
      ideas: "id, title, description",
    });
  }
}

// Create a database instance
export const db = new TaskManagerDatabase();

/**
 * Get all tasks from the database
 */
export const getAllTasks = async (): Promise<Task[]> => {
  try {
    return await db.tasks.toArray();
  } catch (error) {
    console.error("Error getting tasks from database:", error);
    return [];
  }
};

/**
 * Save a task to the database
 */
export const saveTask = async (task: Task): Promise<string> => {
  try {
    // Convert Date objects to ISO strings for storage
    const taskToSave = {
      ...task,
      dueDate: task.dueDate.toISOString(),
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    };

    await db.tasks.put(taskToSave as any);
    return task.id;
  } catch (error) {
    console.error("Error saving task to database:", error);
    throw error;
  }
};

/**
 * Delete a task from the database
 */
export const deleteTask = async (id: string): Promise<void> => {
  try {
    await db.tasks.delete(id);
  } catch (error) {
    console.error("Error deleting task from database:", error);
    throw error;
  }
};

/**
 * Get all goals from the database
 */
export const getAllGoals = async (): Promise<Goal[]> => {
  try {
    return await db.goals.toArray();
  } catch (error) {
    console.error("Error getting goals from database:", error);
    return [];
  }
};

/**
 * Save a goal to the database
 */
export const saveGoal = async (goal: Goal): Promise<string> => {
  try {
    // Convert Date objects to ISO strings for storage
    const goalToSave = {
      ...goal,
      startDate: goal.startDate.toISOString(),
      endDate: goal.endDate.toISOString(),
      createdAt: goal.createdAt.toISOString(),
      updatedAt: goal.updatedAt.toISOString(),
    };

    await db.goals.put(goalToSave as any);
    return goal.id;
  } catch (error) {
    console.error("Error saving goal to database:", error);
    throw error;
  }
};

/**
 * Delete a goal from the database
 */
export const deleteGoal = async (id: string): Promise<void> => {
  try {
    await db.goals.delete(id);
  } catch (error) {
    console.error("Error deleting goal from database:", error);
    throw error;
  }
};

/**
 * Get all ideas from the database
 */
export const getAllIdeas = async (): Promise<Idea[]> => {
  try {
    return await db.ideas.toArray();
  } catch (error) {
    console.error("Error getting ideas from database:", error);
    return [];
  }
};

/**
 * Save an idea to the database
 */
export const saveIdea = async (idea: Idea): Promise<string> => {
  try {
    // Convert Date objects to ISO strings for storage
    const ideaToSave = {
      ...idea,
      createdAt: idea.createdAt.toISOString(),
      updatedAt: idea.updatedAt.toISOString(),
    };

    await db.ideas.put(ideaToSave as any);
    return idea.id;
  } catch (error) {
    console.error("Error saving idea to database:", error);
    throw error;
  }
};

/**
 * Delete an idea from the database
 */
export const deleteIdea = async (id: string): Promise<void> => {
  try {
    await db.ideas.delete(id);
  } catch (error) {
    console.error("Error deleting idea from database:", error);
    throw error;
  }
};
