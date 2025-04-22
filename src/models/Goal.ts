export type GoalTimeFrame = "daily" | "weekly" | "monthly" | "yearly";

export interface GoalStep {
  id: string;
  description: string;
  completed: boolean;
}

export interface Goal {
  id: string;
  description: string;
  timeFrame: GoalTimeFrame;
  startDate: Date;
  endDate: Date;
  steps: GoalStep[];
  progress: number; // 0-100
  createdAt: Date;
  updatedAt: Date;
}

export const createGoal = (goal: Partial<Goal>): Goal => {
  const now = new Date();
  return {
    id: crypto.randomUUID(),
    description: "",
    timeFrame: "daily",
    startDate: now,
    endDate: now,
    steps: [],
    progress: 0,
    createdAt: now,
    updatedAt: now,
    ...goal,
  };
};

export const createGoalStep = (description: string): GoalStep => {
  return {
    id: crypto.randomUUID(),
    description,
    completed: false,
  };
};

export const calculateGoalProgress = (steps: GoalStep[]): number => {
  if (steps.length === 0) return 0;
  const completedSteps = steps.filter((step) => step.completed).length;
  return Math.round((completedSteps / steps.length) * 100);
};
