import { useState } from "react";
import { Idea, createIdea } from "@/models/Idea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface IdeaFormProps {
  onSave: (idea: Idea) => void;
  onCancel: () => void;
}

export function IdeaForm({ onSave, onCancel }: IdeaFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [implementation, setImplementation] = useState("");
  const [steps, setSteps] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const idea = createIdea({
      title,
      description,
      goal,
      implementation,
      steps,
    });

    onSave(idea);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setGoal("");
    setImplementation("");
    setSteps("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded-lg shadow"
    >
      <div className="space-y-2">
        <Label htmlFor="title">عنوان الفكرة</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="أدخل عنوان الفكرة"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">وصف الفكرة</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="أدخل وصف الفكرة"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="goal">الهدف من الفكرة</Label>
        <Textarea
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="أدخل الهدف من الفكرة"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="implementation">كيفية التطبيق</Label>
        <Textarea
          id="implementation"
          value={implementation}
          onChange={(e) => setImplementation(e.target.value)}
          placeholder="أدخل كيفية تطبيق الفكرة"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="steps">الخطوات المحتملة</Label>
        <Textarea
          id="steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          placeholder="أدخل الخطوات المحتملة لتنفيذ الفكرة"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2 rtl:space-x-reverse">
        <Button type="button" variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
        <Button type="submit">حفظ الفكرة</Button>
      </div>
    </form>
  );
}
