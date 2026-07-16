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
  return (
    <Card className="border-t-4 border-t-indigo-600 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-indigo-600">
          <UserPlus className="size-5" />
          Assigned Lecturer
        </CardTitle>
        <CardDescription>
          Select the primary lecturer managing this course.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="size-4 animate-spin text-indigo-600" /> Loading
            personnel...
          </div>
        ) : (
          <Select
            value={lecturerId}
            onValueChange={(val) => onChange(val ?? "unassigned")}
          >
            <SelectTrigger className="focus:ring-indigo-600 w-full sm:max-w-md">
              <SelectValue placeholder="Select a lecturer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="unassigned"
                className="text-muted-foreground italic"
              >
                Unassigned
              </SelectItem>
              {lecturers.map((lecturer) => (
                <SelectItem key={lecturer.id} value={lecturer.id}>
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
