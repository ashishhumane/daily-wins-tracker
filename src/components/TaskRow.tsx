import { motion } from "framer-motion";
import { Check, Trash2 } from "lucide-react";
import { Task, dateKey } from "@/lib/tasks";
import { format } from "date-fns";

interface TaskRowProps {
  task: Task;
  weekDays: Date[];
  onToggle: (taskId: string, day: string) => void;
  onDelete: (taskId: string) => void;
}

const SHORT_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export function TaskRow({ task, weekDays, onToggle, onDelete }: TaskRowProps) {
  const completedCount = weekDays.filter((d) => task.checks[dateKey(d)]).length;
  const isToday = (date: Date) => dateKey(date) === dateKey(new Date());

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="group rounded-xl bg-card p-4 transition-colors hover:bg-task-hover"
    >
      {/* Task name + delete */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-display font-medium text-sm truncate">
            {task.name}
          </span>
          <span className="text-xs text-muted-foreground shrink-0">
            {completedCount}/7
          </span>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="rounded-lg p-1.5 text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Checkboxes row */}
      <div className="grid grid-cols-7 gap-1.5">
        {weekDays.map((day, i) => {
          const key = dateKey(day);
          const checked = !!task.checks[key];
          const today = isToday(day);
          return (
            <button
              key={key}
              onClick={() => onToggle(task.id, key)}
              className={`flex flex-col items-center gap-1 rounded-lg py-1.5 transition-all duration-200 ${
                checked
                  ? "bg-check-success/10"
                  : today
                  ? "bg-primary/5"
                  : ""
              }`}
            >
              <span className={`text-[10px] font-medium ${today ? "text-primary" : "text-muted-foreground"}`}>
                {SHORT_DAYS[i]}
              </span>
              <span className={`text-[10px] ${today ? "font-bold text-foreground" : "text-muted-foreground"}`}>
                {format(day, "d")}
              </span>
              <div
                className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                  checked
                    ? "border-check-success bg-check-success"
                    : today
                    ? "border-primary/40 hover:border-primary"
                    : "border-border hover:border-primary/30"
                }`}
              >
                {checked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  >
                    <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={3} />
                  </motion.div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
