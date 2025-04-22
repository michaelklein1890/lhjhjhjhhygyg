import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage keys
const TASKS_STORAGE_KEY = "taskManager_tasks";
const IDEAS_STORAGE_KEY = "taskManager_ideas";

interface Task {
  id: string;
  title: string;
  description: string;
  time?: string;
  priority: "low" | "medium" | "high";
  category: "work" | "personal" | "other";
  dueDate: Date;
  status: "pending" | "in-progress" | "completed";
  notes?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface Idea {
  id: string;
  title: string;
  description?: string;
  goal?: string;
  implementation?: string;
  steps?: string;
  createdAt: Date;
  updatedAt: Date;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [activeTab, setActiveTab] = useState("daily");
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from AsyncStorage on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        if (savedTasks) {
          // Parse the JSON string and convert date strings back to Date objects
          const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
            ...task,
            dueDate: new Date(task.dueDate),
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
          }));
          setTasks(parsedTasks);
        } else {
          // If no tasks in AsyncStorage, initialize with default tasks
          initializeDefaultTasks();
        }

        // Load ideas from AsyncStorage
        const savedIdeas = await AsyncStorage.getItem(IDEAS_STORAGE_KEY);
        if (savedIdeas) {
          const parsedIdeas = JSON.parse(savedIdeas).map((idea: any) => ({
            ...idea,
            createdAt: new Date(idea.createdAt),
            updatedAt: new Date(idea.updatedAt),
          }));
          setIdeas(parsedIdeas);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        initializeDefaultTasks();
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save tasks to AsyncStorage whenever tasks change
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error("Error saving tasks:", error);
      }
    };

    if (!isLoading) {
      saveData();
    }
  }, [tasks, isLoading]);

  // Save ideas to AsyncStorage whenever ideas change
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(IDEAS_STORAGE_KEY, JSON.stringify(ideas));
      } catch (error) {
        console.error("Error saving ideas:", error);
      }
    };

    if (!isLoading) {
      saveData();
    }
  }, [ideas, isLoading]);

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
    ];
    setTasks(defaultTasks);
  };

  const createTask = (task: Partial<Task>): Task => {
    const now = new Date();
    return {
      id: Math.random().toString(36).substring(2, 15),
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

  const renderTabs = () => {
    return (
      <View style={styles.tabContainer}>
        {["daily", "weekly", "monthly", "ideas"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab === "daily"
                ? "يومي"
                : tab === "weekly"
                  ? "أسبوعي"
                  : tab === "monthly"
                    ? "شهري"
                    : "أفكار"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>جاري التحميل...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
      }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>لم يبقى الكثير فقط ركز Aminos</Text>

        {renderTabs()}

        <View style={styles.contentContainer}>
          {activeTab === "daily" && (
            <View>
              <Text style={styles.sectionTitle}>المهام اليومية</Text>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <View key={task.id} style={styles.taskCard}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <Text style={styles.taskDescription}>
                      {task.description}
                    </Text>
                    {task.time && (
                      <Text style={styles.taskTime}>{task.time}</Text>
                    )}
                  </View>
                ))
              ) : (
                <Text style={styles.emptyMessage}>
                  لا توجد مهام. انقر على "إضافة مهمة" لإنشاء واحدة.
                </Text>
              )}
            </View>
          )}

          {/* Other tabs will be implemented in future updates */}
          {(activeTab === "weekly" || activeTab === "monthly") && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyMessage}>
                لا توجد مهام. انقر على "إضافة مهمة" لإنشاء واحدة.
              </Text>
            </View>
          )}

          {activeTab === "ideas" && (
            <View>
              <Text style={styles.sectionTitle}>دفتر الأفكار</Text>
              {ideas.length > 0 ? (
                ideas.map((idea) => (
                  <View key={idea.id} style={styles.ideaCard}>
                    <Text style={styles.ideaTitle}>{idea.title}</Text>
                    {idea.description && (
                      <Text style={styles.ideaDescription}>
                        {idea.description}
                      </Text>
                    )}
                  </View>
                ))
              ) : (
                <Text style={styles.emptyMessage}>
                  لا توجد أفكار مسجلة. انقر على "إضافة فكرة" لإنشاء واحدة.
                </Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 16,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
    marginBottom: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  tabText: {
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#333",
    fontWeight: "bold",
  },
  contentContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center",
  },
  emptyMessage: {
    textAlign: "center",
    color: "#666",
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ddd",
  },
  taskCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  taskDescription: {
    color: "#666",
    marginBottom: 4,
  },
  taskTime: {
    color: "#0066cc",
    fontSize: 12,
    fontWeight: "500",
    backgroundColor: "rgba(0, 102, 204, 0.1)",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  ideaCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ideaTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#0066cc",
  },
  ideaDescription: {
    color: "#666",
  },
});

export default Dashboard;
