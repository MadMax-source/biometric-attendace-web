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
    <Card className="border-t-4 border-t-indigo-600 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-lg text-indigo-600">
            <CalendarDays className="size-5" />
            Weekly Timetable
          </CardTitle>
          <CardDescription>
            Set the recurring weekly schedule for lecturer dashboards.
          </CardDescription>
        </div>
        <Button
          onClick={addSlot}
          size="sm"
          variant="outline"
          className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
        >
          <Plus className="size-4 mr-1" /> Add Slot
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {schedules.length === 0 ? (
          <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-200">
            <p className="text-sm text-slate-500">No schedule assigned yet.</p>
          </div>
        ) : (
          schedules.map((slot, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-end bg-slate-50 p-4 rounded-lg border border-slate-100"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1 w-full">
                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500 uppercase tracking-wider">
                    Day
                  </Label>
                  {/* FIX: Handled the null value from the Select component right here */}
                  <Select
                    value={slot.day_of_week}
                    onValueChange={(v) =>
                      updateSlot(index, "day_of_week", v ?? "Monday")
                    }
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ].map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Clock className="size-3" /> Start
                  </Label>
                  <Input
                    type="time"
                    value={slot.start_time}
                    onChange={(e) =>
                      updateSlot(index, "start_time", e.target.value)
                    }
                    className="bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Clock className="size-3" /> End
                  </Label>
                  <Input
                    type="time"
                    value={slot.end_time}
                    onChange={(e) =>
                      updateSlot(index, "end_time", e.target.value)
                    }
                    className="bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="size-3" /> Venue
                  </Label>
                  <Input
                    placeholder="e.g. LH-1"
                    value={slot.venue}
                    onChange={(e) => updateSlot(index, "venue", e.target.value)}
                    className="bg-white"
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSlot(index)}
                className="text-red-500 hover:bg-red-50 hover:text-red-600 mt-2 sm:mt-0 shrink-0"
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
