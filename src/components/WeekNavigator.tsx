import { format, addWeeks } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getWeekDays } from "@/lib/tasks";

interface WeekNavigatorProps {
  weekStart: Date;
  onChangeWeek: (newStart: Date) => void;
}

export function WeekNavigator({ weekStart, onChangeWeek }: WeekNavigatorProps) {
  const days = getWeekDays(weekStart);
  const monthLabel = format(weekStart, "MMMM yyyy");

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="font-display text-lg font-semibold">{monthLabel}</h2>
        <p className="text-sm text-muted-foreground">
          {format(days[0], "MMM d")} – {format(days[6], "MMM d")}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChangeWeek(addWeeks(weekStart, -1))}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => onChangeWeek(addWeeks(weekStart, 1))}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
