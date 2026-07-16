import { UserPlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LecturerAssignmentProps {
  form: { lecturerId: string };
  update: (key: any, value: string | null) => void;
  lecturerLists: any[];
  isLoadingLecturers: boolean;
}

export function LecturerAssignment({
  form,
  update,
  lecturerLists,
  isLoadingLecturers,
}: LecturerAssignmentProps) {
  // 1. THE TEXT FIX: We manually search your array to find the exact name that matches the selected ID
  const selectedLecturer = lecturerLists.find(
    (l) => String(l.id) === String(form.lecturerId),
  );

  // 2. We determine exactly what string should be printed on the screen
  const displayText =
    form.lecturerId === "unassigned"
      ? "Leave unassigned for now"
      : selectedLecturer?.full_name || "Select a lecturer";

  return (
    <div className="p-6 md:p-8 space-y-6 bg-slate-50">
      <div className="flex items-center gap-2 text-[#0c2a5d] pb-2">
        <UserPlus className="size-5" />
        <h3 className="font-semibold text-lg tracking-tight">
          Personnel Assignment
        </h3>
      </div>

      <div className="space-y-2 sm:max-w-md">
        <Label className="text-muted-foreground font-semibold">
          Primary Lecturer (Optional)
        </Label>

        <Select
          value={form.lecturerId}
          onValueChange={(v) => update("lecturerId", v)}
        >
          {/* 3. THE COLOR FIX: We put text-[#0c2a5d] directly on the trigger. It is physically impossible for the text to be white now! */}
          <SelectTrigger className="focus:ring-[#0c2a5d] text-[#0c2a5d] font-medium">
            {/* 4. We force Shadcn to ignore its own logic and strictly render our displayText */}
            <SelectValue placeholder="Select a lecturer">
              {displayText}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="unassigned"
              className="text-muted-foreground italic"
            >
              Leave unassigned for now
            </SelectItem>

            {isLoadingLecturers ? (
              <SelectItem value="loading" disabled>
                Loading personnel...
              </SelectItem>
            ) : (
              lecturerLists.map((lecturer) => (
                <SelectItem key={lecturer.id} value={String(lecturer.id)}>
                  {lecturer.full_name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>

        <p className="text-xs text-muted-foreground mt-2">
          You can always assign or change the lecturer later from the Manage
          Courses page.
        </p>
      </div>
    </div>
  );
}
