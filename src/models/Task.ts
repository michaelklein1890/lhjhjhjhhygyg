export interface Task {
  id: string;
  title: string;
  description: string;
  time?: string; // Time of day for the task (e.g., "08:00")
  priority: "low" | "medium" | "high";
  category: "work" | "personal" | "other";
  dueDate: Date;
  status: "pending" | "in-progress" | "completed";
  notes?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const createTask = (task: Partial<Task>): Task => {
  const now = new Date();
  return {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    priority: "medium",
    category: "personal",
    dueDate: now,
    status: "pending",
    notes: "",
    tags: [],
    createdAt: now,
    updatedAt: now,
    ...task,
  };
};
