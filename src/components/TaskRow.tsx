import { motion } from "framer-motion";
import { Check, Trash2 } from "lucide-react";
import { Task, dateKey } from "@/lib/tasks";

interface TaskRowProps {
  task: Task;
  weekDays: Date[];
  onToggle: (taskId: string, day: string) => void;
  onDelete: (taskId: string) => void;
}

export function TaskRow({ task, weekDays, onToggle, onDelete }: TaskRowProps) {
  const completedCount = weekDays.filter((d) => task.checks[dateKey(d)]).length;
  const isToday = (date: Date) =>
    dateKey(date) === dateKey(new Date());

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="group grid grid-cols-[1fr_repeat(7,_minmax(0,_1fr))_auto] items-center gap-2 rounded-xl bg-card px-4 py-3 transition-colors hover:bg-task-hover"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="font-display font-medium text-sm truncate">
          {task.name}
        </span>
        <span className="text-xs text-muted-foreground shrink-0">
          {completedCount}/7
        </span>
      </div>

      {weekDays.map((day) => {
        const key = dateKey(day);
        const checked = !!task.checks[key];
        return (
          <button
            key={key}
            onClick={() => onToggle(task.id, key)}
            className={`relative mx-auto flex h-9 w-9 items-center justify-center rounded-lg border-2 transition-all duration-200 ${
              checked
                ? "border-check-success bg-check-success"
                : isToday(day)
                ? "border-primary/40 bg-primary/5 hover:border-primary"
                : "border-border hover:border-primary/30"
            }`}
          >
            {checked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                <Check className="h-4 w-4 text-primary-foreground" strokeWidth={3} />
              </motion.div>
            )}
          </button>
        );
      })}

      <button
        onClick={() => onDelete(task.id)}
        className="ml-1 rounded-lg p-1.5 text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
