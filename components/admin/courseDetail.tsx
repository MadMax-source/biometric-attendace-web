import { BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CourseDetailsProps {
  form: {
    code: string;
    title: string;
    level: string;
    semester: string;
    credits: string;
  };
  update: (key: any, value: string | null) => void;
}

export function CourseDetails({ form, update }: CourseDetailsProps) {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-2 text-[#0c2a5d] pb-2">
        <BookOpen className="size-5" />
        <h3 className="font-semibold text-lg tracking-tight">Course Details</h3>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="code" className="text-muted-foreground font-semibold">
            Course Code
          </Label>
          <Input
            id="code"
            placeholder="e.g. CPE121"
            value={form.code}
            onChange={(e) => update("code", e.target.value)}
            className="focus-visible:ring-[#0c2a5d]"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground font-semibold">Level</Label>
          <Select value={form.level} onValueChange={(v) => update("level", v)}>
            <SelectTrigger className="focus:ring-[#0c2a5d]">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {["100", "200", "300", "400", "500"].map((l) => (
                <SelectItem key={l} value={l}>
                  {l} Level
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label
            htmlFor="title"
            className="text-muted-foreground font-semibold"
          >
            Course Title
          </Label>
          <Input
            id="title"
            placeholder="e.g. Introduction to Computer Engineering"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className="focus-visible:ring-[#0c2a5d]"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground font-semibold">
            Semester
          </Label>
          <Select
            value={form.semester}
            onValueChange={(v) => update("semester", v)}
          >
            <SelectTrigger className="focus:ring-[#0c2a5d]">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="First Semester">First Semester</SelectItem>
              <SelectItem value="Second Semester">Second Semester</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground font-semibold">
            Credit Units
          </Label>
          <Select
            value={form.credits}
            onValueChange={(v) => update("credits", v)}
          >
            <SelectTrigger className="focus:ring-[#0c2a5d]">
              <SelectValue placeholder="Select credits" />
            </SelectTrigger>
            <SelectContent>
              {["1", "2", "3", "4", "5", "6"].map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit} Unit{unit !== "1" ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
