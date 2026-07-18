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
  const selectedLecturer = lecturerLists.find(
    (l) => String(l.id) === String(form.lecturerId),
  );

  const displayText =
    form.lecturerId === "unassigned"
      ? "Leave unassigned for now"
      : selectedLecturer?.full_name || "Select a lecturer";

  return (
    <div className="p-6 md:p-8 space-y-6 bg-[#f2f2f2]/50 dark:bg-[#041024]/50">
      <div className="flex items-center gap-2 text-[#0a2f66] dark:text-white pb-2">
        <UserPlus className="size-5" />
        <h3 className="font-semibold text-lg tracking-tight">
          Personnel Assignment
        </h3>
      </div>

      <div className="space-y-2 sm:max-w-md">
        <Label className="text-[#6b6b6b] dark:text-[#8ba3c7] font-semibold">
          Primary Lecturer (Optional)
        </Label>

        <Select
          value={form.lecturerId}
          onValueChange={(v) => update("lecturerId", v)}
        >
          <SelectTrigger className="focus:ring-[#0a2f66] dark:focus:ring-white text-[#0a2f66] dark:text-white font-medium border-[#d9e3f6] dark:border-[#1a365d] bg-white dark:bg-[#0a1c3a]">
            <SelectValue placeholder="Select a lecturer">
              {displayText}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-[#0a1c3a] border-[#d9e3f6] dark:border-[#1a365d]">
            <SelectItem
              value="unassigned"
              className="text-[#6b6b6b] dark:text-[#8ba3c7] italic hover:bg-[#f2f2f2] dark:hover:bg-[#1a4b96]/40"
            >
              Leave unassigned for now
            </SelectItem>

            {isLoadingLecturers ? (
              <SelectItem
                value="loading"
                disabled
                className="text-[#6b6b6b] dark:text-[#8ba3c7]"
              >
                Loading personnel...
              </SelectItem>
            ) : (
              lecturerLists.map((lecturer) => (
                <SelectItem
                  key={lecturer.id}
                  value={String(lecturer.id)}
                  className="text-[#262626] dark:text-white hover:bg-[#f2f2f2] dark:hover:bg-[#1a4b96]/40"
                >
                  {lecturer.full_name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>

        <p className="text-xs text-[#b2b2b2] dark:text-[#8ba3c7] mt-2">
          You can always assign or change the lecturer later from the Manage
          Courses page.
        </p>
      </div>
    </div>
  );
}
