"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import BACKENDAPI from "@/API";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DangerZone({
  courseId,
  courseCode,
}: {
  courseId: string;
  courseCode: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await BACKENDAPI.delete(`/courses/${courseId}`);
      toast.success(`${courseCode} has been permanently deleted.`);
      router.push("/admin/courses");
    } catch (err) {
      toast.error("Failed to delete course.");
      setIsDeleting(false);
    }
  };

  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/20 border-t-4 border-t-red-500 dark:border-t-red-500 shadow-sm transition-all">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-red-600 dark:text-red-500">
          <AlertTriangle className="size-5" />
          Danger Zone
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400">
          Permanently remove this course, its timetable, and all associated
          attendance records from the system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700 shadow-sm transition-colors"
            >
              {isDeleting ? (
                <Loader2 className="size-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="size-4 mr-2" />
              )}
              Delete Course
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="dark:bg-slate-900 dark:border-slate-800">
            <AlertDialogHeader>
              <AlertDialogTitle className="dark:text-white">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="dark:text-slate-400">
                This action cannot be undone. This will permanently delete{" "}
                <strong className="dark:text-white">{courseCode}</strong> and
                remove all related data from the servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="dark:bg-transparent dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700 transition-colors"
              >
                Yes, delete course
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
