import { useState, useEffect } from "react";
import { Task, createTask } from "@/models/Task";
import { Idea } from "@/models/Idea";
import { TaskList } from "@/components/TaskList";
import { TaskForm } from "@/components/TaskForm";
import { IdeaForm } from "@/components/IdeaForm";
import { QuoteDisplay } from "@/components/QuoteDisplay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Local storage keys
const TASKS_STORAGE_KEY = "taskManager_tasks";
const IDEAS_STORAGE_KEY = "taskManager_ideas";

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isAddingIdea, setIsAddingIdea] = useState(false);
  const [activeTab, setActiveTab] = useState("daily");

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    if (savedTasks) {
      try {
        // Parse the JSON string and convert date strings back to Date objects
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          dueDate: new Date(task.dueDate),
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        }));
        setTasks(parsedTasks);
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
        // If there's an error, initialize with default tasks
        initializeDefaultTasks();
      }
    } else {
      // If no tasks in localStorage, initialize with default tasks
      initializeDefaultTasks();
    }

    // Load ideas from localStorage
    const savedIdeas = localStorage.getItem(IDEAS_STORAGE_KEY);
    if (savedIdeas) {
      try {
        const parsedIdeas = JSON.parse(savedIdeas).map((idea: any) => ({
          ...idea,
          createdAt: new Date(idea.createdAt),
          updatedAt: new Date(idea.updatedAt),
        }));
        setIdeas(parsedIdeas);
      } catch (error) {
        console.error("Error parsing ideas from localStorage:", error);
        setIdeas([]);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Save ideas to localStorage whenever ideas change
  useEffect(() => {
    localStorage.setItem(IDEAS_STORAGE_KEY, JSON.stringify(ideas));
  }, [ideas]);

  const initializeDefaultTasks = () => {
    const defaultTasks = [
      createTask({
        title: "تمارين صباحية",
        description: "ممارسة التمارين الرياضية لمدة 30 دقيقة",
        time: "08:00",
        priority: "high",
        category: "personal",
        dueDate: new Date(),
      }),
      createTask({
        title: "قراءة كتاب",
        description: "قراءة 20 صفحة من كتاب التنمية الذاتية",
        time: "09:00",
        priority: "medium",
        category: "personal",
        dueDate: new Date(),
      }),
      createTask({
        title: "العمل على المشروع",
        description: "إكمال تقرير المشروع الأسبوعي",
        time: "10:00",
        priority: "high",
        category: "work",
        dueDate: new Date(),
      }),
      createTask({
        title: "اجتماع فريق العمل",
        description: "مناقشة خطة العمل للأسبوع القادم",
        time: "14:00",
        priority: "high",
        category: "work",
        dueDate: new Date(),
      }),
    ];
    setTasks(defaultTasks);
  };

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
    setIsAddingTask(false);
  };

  const handleAddIdea = (idea: Idea) => {
    setIdeas([...ideas, idea]);
    setIsAddingIdea(false);
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: "completed" } : task,
      ),
    );
  };

  return (
    <div
      className="container mx-auto p-4 min-h-screen w-full"
      dir="rtl"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-3xl font-bold mb-4 text-center text-white pb-1 text-shadow">
        لم يبقى الكثير فقط ركز Aminos
      </h1>

      <div className="mb-6">
        <QuoteDisplay />
      </div>

      <Tabs
        defaultValue="daily"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-4 mb-6 p-1 bg-white/80 backdrop-blur-sm rounded-xl">
          <TabsTrigger
            value="daily"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md"
          >
            يومي
          </TabsTrigger>
          <TabsTrigger
            value="weekly"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md"
          >
            أسبوعي
          </TabsTrigger>
          <TabsTrigger
            value="monthly"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md"
          >
            شهري
          </TabsTrigger>
          <TabsTrigger
            value="ideas"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md"
          >
            أفكار
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <TaskList
            tasks={tasks}
            onAddTask={() => setIsAddingTask(true)}
            onCompleteTask={handleCompleteTask}
          />
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-primary flex items-center">
                <span className="bg-primary/10 text-primary p-1.5 rounded-md mr-2">
                  <Calendar className="h-5 w-5" />
                </span>
                المهام الأسبوعية
              </h3>
              <Button
                onClick={() => setIsAddingTask(true)}
                size="sm"
                className="rounded-full"
              >
                <Plus className="h-4 w-4 ml-1" /> إضافة مهمة
              </Button>
            </div>
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              لا توجد مهام أسبوعية. انقر على "إضافة مهمة" لإنشاء واحدة.
            </div>
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-primary flex items-center">
                <span className="bg-primary/10 text-primary p-1.5 rounded-md mr-2">
                  <Calendar className="h-5 w-5" />
                </span>
                المهام الشهرية
              </h3>
              <Button
                onClick={() => setIsAddingTask(true)}
                size="sm"
                className="rounded-full"
              >
                <Plus className="h-4 w-4 ml-1" /> إضافة مهمة
              </Button>
            </div>
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              لا توجد مهام شهرية. انقر على "إضافة مهمة" لإنشاء واحدة.
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ideas" className="space-y-4">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-primary flex items-center">
                <span className="bg-primary/10 text-primary p-1.5 rounded-md mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-lightbulb"
                  >
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                  </svg>
                </span>
                دفتر الأفكار
              </h3>
              <Button
                onClick={() => setIsAddingIdea(true)}
                size="sm"
                className="rounded-full bg-primary/90 hover:bg-primary"
              >
                <Plus className="h-4 w-4 ml-1" /> إضافة فكرة جديدة
              </Button>
            </div>
            {ideas.length > 0 ? (
              <div className="space-y-5">
                {ideas.map((idea) => (
                  <div
                    key={idea.id}
                    className="border border-gray-100 p-5 rounded-xl bg-gradient-to-r from-white to-gray-50 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <h4 className="font-bold text-lg mb-3 text-primary/90">
                      {idea.title}
                    </h4>
                    {idea.description && (
                      <div className="mb-3 bg-white p-3 rounded-lg border border-gray-100">
                        <span className="font-semibold text-primary/80 block mb-1">
                          وصف الفكرة:
                        </span>
                        <p className="text-gray-700">{idea.description}</p>
                      </div>
                    )}
                    {idea.goal && (
                      <div className="mb-3 bg-white p-3 rounded-lg border border-gray-100">
                        <span className="font-semibold text-primary/80 block mb-1">
                          الهدف من الفكرة:
                        </span>
                        <p className="text-gray-700">{idea.goal}</p>
                      </div>
                    )}
                    {idea.implementation && (
                      <div className="mb-3 bg-white p-3 rounded-lg border border-gray-100">
                        <span className="font-semibold text-primary/80 block mb-1">
                          كيفية التطبيق:
                        </span>
                        <p className="text-gray-700">{idea.implementation}</p>
                      </div>
                    )}
                    {idea.steps && (
                      <div className="mb-3 bg-white p-3 rounded-lg border border-gray-100">
                        <span className="font-semibold text-primary/80 block mb-1">
                          الخطوات المحتملة:
                        </span>
                        <p className="text-gray-700">{idea.steps}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                لا توجد أفكار مسجلة. انقر على "إضافة فكرة" لإنشاء واحدة.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
        <DialogContent
          dir="rtl"
          className="sm:max-w-[500px] rounded-xl border-0 shadow-xl bg-gradient-to-b from-white to-gray-50"
        >
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-xl text-primary flex items-center">
              <span className="bg-primary/10 text-primary p-1.5 rounded-md mr-2">
                <Plus className="h-5 w-5" />
              </span>
              إضافة مهمة جديدة
            </DialogTitle>
          </DialogHeader>
          <TaskForm
            onSave={handleAddTask}
            onCancel={() => setIsAddingTask(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isAddingIdea} onOpenChange={setIsAddingIdea}>
        <DialogContent
          dir="rtl"
          className="sm:max-w-[500px] rounded-xl border-0 shadow-xl bg-gradient-to-b from-white to-gray-50"
        >
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-xl text-primary flex items-center">
              <span className="bg-primary/10 text-primary p-1.5 rounded-md mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-lightbulb"
                >
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                </svg>
              </span>
              إضافة فكرة جديدة
            </DialogTitle>
          </DialogHeader>
          <IdeaForm
            onSave={handleAddIdea}
            onCancel={() => setIsAddingIdea(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
