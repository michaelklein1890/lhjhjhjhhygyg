import { Task } from "@/models/Task";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, AlignLeft } from "lucide-react";
import { useState } from "react";
import { isOverdue } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onComplete?: (taskId: string) => void;
}

export function TaskCard({ task, onComplete = () => {} }: TaskCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const priorityLabels = {
    low: "منخفضة",
    medium: "متوسطة",
    high: "عالية",
  };

  const categoryColors = {
    work: "bg-purple-100 text-purple-800",
    personal: "bg-green-100 text-green-800",
    other: "bg-gray-100 text-gray-800",
  };

  const categoryLabels = {
    work: "العمل",
    personal: "شخصي",
    other: "أخرى",
  };

  const statusLabels = {
    pending: "قيد الانتظار",
    inProgress: "قيد التنفيذ",
    completed: "مكتملة",
  };

  const isTaskOverdue = task.status !== "completed" && isOverdue(task.dueDate);

  return (
    <Card
      className={`mb-4 shadow-md hover:shadow-lg transition-all duration-300 border-0 overflow-hidden ${isTaskOverdue ? "bg-red-50" : "bg-white"}`}
    >
      <CardHeader className="pb-2 flex flex-row items-center justify-between bg-gradient-to-r from-primary/5 to-transparent">
        <CardTitle className="text-base font-medium flex items-center">
          {task.time && (
            <span className="inline-flex items-center ml-2 text-primary/80 bg-primary/5 px-2 py-1 rounded-full text-xs">
              <Clock className="h-3.5 w-3.5 ml-1" />
              {task.time}
            </span>
          )}
          <span className="mr-2">{task.title}</span>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge
            className={`${categoryColors[task.category]} rounded-full px-3 py-0.5 text-xs font-medium`}
          >
            {categoryLabels[task.category]}
          </Badge>
          <Badge
            className={`${priorityColors[task.priority]} rounded-full px-3 py-0.5 text-xs font-medium`}
          >
            {priorityLabels[task.priority]}
          </Badge>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-gray-500 hover:text-primary bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full transition-colors"
            aria-label="عرض التفاصيل"
          >
            <AlignLeft className="h-3.5 w-3.5" />
          </button>
          {task.status !== "completed" && (
            <button
              onClick={() => onComplete(task.id)}
              className="text-green-500 hover:text-green-600 bg-green-50 hover:bg-green-100 p-1.5 rounded-full transition-colors"
              aria-label="إكمال المهمة"
            >
              <CheckCircle className="h-4 w-4" />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-2 text-sm text-gray-600">
        {showDetails && (
          <div className="mt-3 border-t border-dashed border-gray-200 pt-3">
            <h4 className="font-medium mb-2 text-primary/90 flex items-center">
              <AlignLeft className="h-4 w-4 ml-1" />
              تفاصيل المهمة:
            </h4>
            <p className="mb-3 bg-gray-50 p-2 rounded-md text-gray-700">
              {task.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-gray-50 p-2 rounded-md">
                <span className="font-medium text-primary/80 block mb-1">
                  الحالة:{" "}
                </span>
                <span className="inline-flex items-center">
                  <span
                    className={`w-2 h-2 rounded-full mr-1 ${task.status === "completed" ? "bg-green-500" : task.status === "inProgress" ? "bg-yellow-500" : "bg-blue-500"}`}
                  ></span>
                  {statusLabels[task.status] || task.status}
                </span>
              </div>

              {task.category && (
                <div className="bg-gray-50 p-2 rounded-md">
                  <span className="font-medium text-primary/80 block mb-1">
                    التصنيف:{" "}
                  </span>
                  <span>{categoryLabels[task.category]}</span>
                </div>
              )}

              {task.tags && task.tags.length > 0 && (
                <div className="col-span-2 bg-gray-50 p-2 rounded-md">
                  <span className="font-medium text-primary/80 block mb-1">
                    الوسوم:{" "}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {task.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {task.notes && (
                <div className="col-span-2 bg-gray-50 p-2 rounded-md">
                  <span className="font-medium text-primary/80 block mb-1">
                    ملاحظات:{" "}
                  </span>
                  <span>{task.notes}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
