import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isOverdue(dueDate: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDateCopy = new Date(dueDate);
  dueDateCopy.setHours(0, 0, 0, 0);
  return dueDateCopy < today;
}
