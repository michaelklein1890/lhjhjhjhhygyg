import { useState } from "react";
import { Task, createTask } from "@/models/Task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskFormProps {
  onSave: (task: Task) => void;
  onCancel: () => void;
}

export function TaskForm({ onSave, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [category, setCategory] = useState<"work" | "personal" | "other">(
    "personal",
  );
  const [dueDate, setDueDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const task = createTask({
      title,
      description,
      time,
      priority,
      category,
      dueDate: new Date(dueDate),
      notes: notes.trim() ? notes : undefined,
    });

    onSave(task);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTime("");
    setPriority("medium");
    setCategory("personal");
    setDueDate(new Date().toISOString().split("T")[0]);
    setNotes("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded-lg shadow"
    >
      <div className="space-y-2">
        <Label htmlFor="title">عنوان المهمة</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="أدخل عنوان المهمة"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">وصف المهمة</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="أدخل وصف المهمة"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="time">الوقت (اختياري)</Label>
        <Input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">الأولوية</Label>
        <Select
          value={priority}
          onValueChange={(value: "low" | "medium" | "high") =>
            setPriority(value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="اختر الأولوية" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">منخفضة</SelectItem>
            <SelectItem value="medium">متوسطة</SelectItem>
            <SelectItem value="high">عالية</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">نوع المهمة</Label>
        <Select
          value={category}
          onValueChange={(value: "work" | "personal" | "other") =>
            setCategory(value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="اختر نوع المهمة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="work">خاصة بالعمل</SelectItem>
            <SelectItem value="personal">حياتي اليومية</SelectItem>
            <SelectItem value="other">أخرى</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dueDate">تاريخ الاستحقاق</Label>
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">ملاحظات إضافية</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="أدخل أي ملاحظات إضافية"
          rows={2}
        />
      </div>

      <div className="flex justify-end space-x-2 rtl:space-x-reverse">
        <Button type="button" variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
        <Button type="submit">حفظ المهمة</Button>
      </div>
    </form>
  );
}
