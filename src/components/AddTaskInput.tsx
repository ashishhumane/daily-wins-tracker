import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface AddTaskInputProps {
  onAdd: (name: string) => void;
}

export function AddTaskInput({ onAdd }: AddTaskInputProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`flex items-center gap-3 rounded-xl border-2 border-dashed px-4 py-3 transition-all duration-200 ${
        focused
          ? "border-primary/40 bg-card"
          : "border-border bg-transparent hover:border-primary/20"
      }`}
    >
      <Plus className="h-5 w-5 text-muted-foreground shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Add a new task..."
        className="flex-1 bg-transparent font-body text-sm placeholder:text-muted-foreground focus:outline-none"
      />
      {value.trim() && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          type="submit"
          className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Add
        </motion.button>
      )}
    </motion.form>
  );
}
