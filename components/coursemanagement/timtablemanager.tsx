"use client";

import { CalendarDays, Plus, Clock, MapPin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseSchedule } from "@/type";

interface TimetableManagerProps {
  schedules: CourseSchedule[];
  onChange: (schedules: CourseSchedule[]) => void;
}

export function TimetableManager({
  schedules,
  onChange,
}: TimetableManagerProps) {
  const addSlot = () => {
    onChange([
      ...schedules,
      {
        day_of_week: "Monday",
        start_time: "08:00",
        end_time: "10:00",
        venue: "",
      },
    ]);
  };

  const updateSlot = (
    index: number,
    field: keyof CourseSchedule,
    value: string,
  ) => {
    const updated = [...schedules];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeSlot = (index: number) => {
    const updated = schedules.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/20 border-t-4 border-t-[#0c2a5d] dark:border-t-white shadow-sm transition-all">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-lg text-[#0c2a5d] dark:text-white">
            <CalendarDays className="size-5" />
            Weekly Timetable
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            Set the recurring weekly schedule for lecturer dashboards.
          </CardDescription>
        </div>
        <Button
          onClick={addSlot}
          size="sm"
          variant="outline"
          className="text-[#0c2a5d] dark:text-white border-[#0c2a5d]/30 dark:border-white/30 hover:bg-[#0c2a5d]/10 dark:hover:bg-white/10 transition-colors"
        >
          <Plus className="size-4 mr-1" /> Add Slot
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {schedules.length === 0 ? (
          <div className="text-center py-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No schedule assigned yet.
            </p>
          </div>
        ) : (
          schedules.map((slot, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-end bg-[#0c2a5d]/5 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700/50 transition-colors"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1 w-full">
                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Day
                  </Label>
                  <Select
                    value={slot.day_of_week}
                    onValueChange={(v) =>
                      updateSlot(index, "day_of_week", v ?? "Monday")
                    }
                  >
                    <SelectTrigger className="bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-white focus:ring-[#0c2a5d] dark:focus:ring-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ].map((day) => (
                        <SelectItem
                          key={day}
                          value={day}
                          className="focus:bg-slate-100 dark:focus:bg-slate-700 dark:text-slate-100"
                        >
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Clock className="size-3" /> Start
                  </Label>
                  <Input
                    type="time"
                    value={slot.start_time}
                    onChange={(e) =>
                      updateSlot(index, "start_time", e.target.value)
                    }
                    className="bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-white focus-visible:ring-[#0c2a5d] dark:focus-visible:ring-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Clock className="size-3" /> End
                  </Label>
                  <Input
                    type="time"
                    value={slot.end_time}
                    onChange={(e) =>
                      updateSlot(index, "end_time", e.target.value)
                    }
                    className="bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-white focus-visible:ring-[#0c2a5d] dark:focus-visible:ring-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="size-3" /> Venue
                  </Label>
                  <Input
                    placeholder="e.g. LH-1"
                    value={slot.venue}
                    onChange={(e) => updateSlot(index, "venue", e.target.value)}
                    className="bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-white focus-visible:ring-[#0c2a5d] dark:focus-visible:ring-white"
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSlot(index)}
                className="text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-300 mt-2 sm:mt-0 shrink-0 transition-colors"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
