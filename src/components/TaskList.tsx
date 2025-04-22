import { useState } from "react";
import { Task } from "@/models/Task";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onAddTask?: () => void;
  onCompleteTask?: (taskId: string) => void;
}

export function TaskList({
  tasks = [],
  onAddTask = () => {},
  onCompleteTask = (taskId: string) => {},
}: TaskListProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(
    new Set(),
  );

  const handleCompleteTask = (taskId: string) => {
    setCompletedTaskIds((prev) => new Set([...prev, taskId]));
    onCompleteTask(taskId);
  };

  const filteredTasks = tasks.filter((task) => {
    // Don't show tasks that were just completed
    if (completedTaskIds.has(task.id)) return false;

    if (filter === "all") return true;
    if (filter === "pending") return task.status !== "completed";
    if (filter === "completed") return task.status === "completed";
    return true;
  });

  // Group tasks by time
  const groupedTasks: Record<string, Task[]> = {};

  filteredTasks.forEach((task) => {
    const timeKey = task.time || "بدون وقت";
    if (!groupedTasks[timeKey]) {
      groupedTasks[timeKey] = [];
    }
    groupedTasks[timeKey].push(task);
  });

  // Sort time keys
  const sortedTimeKeys = Object.keys(groupedTasks).sort((a, b) => {
    if (a === "بدون وقت") return 1;
    if (b === "بدون وقت") return -1;
    return a.localeCompare(b);
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            الكل
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("pending")}
          >
            قيد الانتظار
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("completed")}
          >
            مكتملة
          </Button>
        </div>
        <Button onClick={onAddTask} size="sm">
          <Plus className="h-4 w-4 ml-1" /> إضافة مهمة
        </Button>
      </div>

      {sortedTimeKeys.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          لا توجد مهام. انقر على "إضافة مهمة" لإنشاء واحدة.
        </div>
      ) : (
        sortedTimeKeys.map((timeKey) => (
          <div key={timeKey} className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              {timeKey}
            </h3>
            {groupedTasks[timeKey].map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={handleCompleteTask}
              />
            ))}
          </div>
        ))
      )}
    </div>
  );
}
