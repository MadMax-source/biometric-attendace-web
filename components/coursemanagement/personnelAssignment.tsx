"use client";

import { Loader2, UserPlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lecturer } from "@/type";

interface PersonnelAssignmentProps {
  lecturerId: string;
  onChange: (val: string) => void;
  lecturers: Lecturer[];
  isLoading: boolean;
}

export function PersonnelAssignment({
  lecturerId,
  onChange,
  lecturers,
  isLoading,
}: PersonnelAssignmentProps) {
  const displayText =
    lecturerId === "unassigned"
      ? "Leave unassigned for now"
      : lecturers.find((l) => String(l.id) === String(lecturerId))?.full_name ||
        "Select a lecturer";

  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/20 border-t-4 border-t-[#0c2a5d] dark:border-t-white shadow-sm transition-all">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-[#0c2a5d] dark:text-white">
          <UserPlus className="size-5" />
          Assigned Lecturer
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400">
          Select the primary lecturer managing this course.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Loader2 className="size-4 animate-spin text-[#0c2a5d] dark:text-white" />{" "}
            Loading personnel...
          </div>
        ) : (
          <Select
            value={String(lecturerId)}
            onValueChange={(val) => onChange(val ?? "unassigned")}
          >
            <SelectTrigger className="w-full sm:max-w-md focus:ring-[#0c2a5d] dark:focus:ring-white dark:bg-slate-800 dark:border-white/20 dark:text-slate-100 transition-colors">
              <SelectValue placeholder="Select a lecturer">
                {displayText}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
              <SelectItem
                value="unassigned"
                className="text-slate-500 dark:text-slate-400 italic focus:bg-slate-100 dark:focus:bg-slate-700"
              >
                Unassigned
              </SelectItem>
              {lecturers.map((lecturer) => (
                <SelectItem
                  key={lecturer.id}
                  value={String(lecturer.id)}
                  className="focus:bg-slate-100 dark:focus:bg-slate-700 dark:text-slate-100"
                >
                  {lecturer.full_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardContent>
    </Card>
  );
}
