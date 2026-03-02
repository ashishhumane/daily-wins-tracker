import { useState, useCallback, useEffect } from "react";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Target } from "lucide-react";
import {
  Task,
  getWeekStart,
  getWeekDays,
  dateKey,
  loadTasks,
  saveTasks,
} from "@/lib/tasks";
import { TaskRow } from "@/components/TaskRow";
import { AddTaskInput } from "@/components/AddTaskInput";
import { WeekNavigator } from "@/components/WeekNavigator";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));

  const weekDays = getWeekDays(weekStart);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((name: string) => {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, checks: {}, createdAt: new Date().toISOString() },
    ]);
  }, []);

  const toggleCheck = useCallback((taskId: string, day: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, checks: { ...t.checks, [day]: !t.checks[day] } }
          : t
      )
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }, []);

  const totalChecks = tasks.reduce(
    (sum, t) => sum + weekDays.filter((d) => t.checks[dateKey(d)]).length,
    0
  );
  const totalPossible = tasks.length * 7;
  const progress = totalPossible > 0 ? (totalChecks / totalPossible) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Target className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">
              Progress Tracker
            </h1>
            <p className="text-sm text-muted-foreground">
              Build consistency, one day at a time
            </p>
          </div>
        </motion.div>

        {/* Overall progress */}
        {tasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 rounded-xl bg-card p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Weekly Progress
              </span>
              <span className="font-display text-sm font-semibold">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}

        {/* Week navigator */}
        <div className="mb-4">
          <WeekNavigator weekStart={weekStart} onChangeWeek={setWeekStart} />
        </div>

        {/* Day labels header */}
        <div className="mb-2 grid grid-cols-[1fr_repeat(7,_minmax(0,_1fr))_auto] gap-2 px-4">
          <div />
          {weekDays.map((day, i) => {
            const today = dateKey(day) === dateKey(new Date());
            return (
              <div key={i} className="flex flex-col items-center">
                <span
                  className={`text-xs font-medium ${
                    today ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {DAY_LABELS[i]}
                </span>
                <span
                  className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-md text-xs font-semibold ${
                    today
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground"
                  }`}
                >
                  {format(day, "d")}
                </span>
              </div>
            );
          })}
          <div className="w-8" />
        </div>

        {/* Task list */}
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                weekDays={weekDays}
                onToggle={toggleCheck}
                onDelete={deleteTask}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {tasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 rounded-xl border-2 border-dashed border-border py-12 text-center"
          >
            <p className="font-display text-lg font-medium text-muted-foreground">
              No tasks yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add your first task below to start tracking
            </p>
          </motion.div>
        )}

        {/* Add task input */}
        <div className="mt-3">
          <AddTaskInput onAdd={addTask} />
        </div>
      </div>
    </div>
  );
};

export default Index;
