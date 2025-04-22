export interface Idea {
  id: string;
  title: string;
  description: string;
  linkedTaskIds?: string[];
  linkedGoalIds?: string[];
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const createIdea = (idea: Partial<Idea>): Idea => {
  const now = new Date();
  return {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    linkedTaskIds: [],
    linkedGoalIds: [],
    tags: [],
    createdAt: now,
    updatedAt: now,
    ...idea,
  };
};
