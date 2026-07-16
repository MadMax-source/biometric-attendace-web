"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  ScanFace,
  Fingerprint,
  Database,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import BACKENDAPI from "@/API";

import StudentListHeader from "@/components/admin/studentListHeader";
import PendingEnrollmentCard from "@/components/admin/pendingEnrollmentCard";
import { useStudents, Students } from "@/hook/useStudent";

export default function StudentsPage() {
  const [query, setQuery] = useState("");
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  const { studentLists, isLoading, isError } = useStudents();

  //this is for enrollment i will link it with backeend later

  const handleTriggerEnrollment = async (
    studentId: string,
    matricNumber: string,
  ) => {
    setEnrollingId(studentId);
    try {
      const response = await BACKENDAPI.post(`/enrollment`, {
        studentId,
        matricNumber,
      });
      if (response.status === 200) {
        console.log("Enrollment successful for student:", studentId);
      } else {
        console.error("Enrollment failed:", response.data);
      }
    } catch (error) {
      console.error("Failed to trigger enrollment:", error);
    } finally {
      setEnrollingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="relative min-h-[80vh] w-full p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <Loader2 className="size-12 animate-spin text-blue-950 dark:text-blue-400 mb-4 relative z-10" />
        <p className="text-lg font-bold text-blue-950 dark:text-white relative z-10">
          loading students...
        </p>
        <p className="text-sm text-slate-500 relative z-10">
          Retrieving enrollment records
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="relative min-h-[80vh] w-full p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-400/10 rounded-full blur-3xl"></div>
        <div className="p-4 bg-rose-100 dark:bg-rose-900/30 rounded-full mb-4 relative z-10">
          <AlertTriangle className="size-10 text-rose-600 dark:text-rose-400" />
        </div>
        <p className="text-xl font-bold text-slate-900 dark:text-white relative z-10">
          Connection Error
        </p>
        <p className="text-sm text-slate-500 mt-2 max-w-sm relative z-10">
          {isError instanceof Error
            ? isError.message
            : "An unexpected error occurred."}
        </p>
      </div>
    );
  }

  // Fallback to empty array just in case  there is no student
  const searchedStudents = (studentLists || []).filter(
    (s: Students) =>
      s.full_name?.toLowerCase().includes(query.toLowerCase()) ||
      s.matric_number?.toLowerCase().includes(query.toLowerCase()),
  );

  const pendingStudents = searchedStudents.filter((s: Students) => !s.enrolled);

  const enrolledStudents = searchedStudents.filter((s: Students) => s.enrolled);

  return (
    <div className="relative min-h-[80vh] w-full p-4 sm:p-8 rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200/40 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
      <div className="absolute top-40 -right-20 w-96 h-96 bg-slate-300/40 dark:bg-slate-800/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

      <div className="relative z-10 space-y-8 max-w-5xl mx-auto">
        <StudentListHeader
          totalPending={pendingStudents.length}
          searchQuery={query}
          onSearchChange={setQuery}
        />

        {pendingStudents.length > 0 && (
          <section className="space-y-5 mt-10">
            <div className="flex items-center gap-4">
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
              <span className="text-xs font-black text-rose-600 uppercase tracking-widest flex items-center gap-2">
                <XCircle className="size-4" /> Pending Biometrics (
                {pendingStudents.length})
              </span>
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
            </div>

            <div className="grid gap-4">
              {pendingStudents.map((s: Students) => (
                <PendingEnrollmentCard
                  key={s.id}
                  student={s}
                  isEnrolling={enrollingId === s.id}
                  onTriggerEnrollment={handleTriggerEnrollment}
                />
              ))}
            </div>
          </section>
        )}

        {enrolledStudents.length > 0 && (
          <section className="space-y-5 pt-8">
            <div className="flex items-center gap-4">
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
              <span className="text-xs font-black text-blue-950 dark:text-blue-400 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="size-4" /> Enrollment Complete (
                {enrolledStudents.length})
              </span>
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
            </div>

            <div className="grid gap-3 opacity-90 hover:opacity-100 transition-opacity">
              {enrolledStudents.map((s: Students) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    {/* Small Profile Image / Initials Fallback */}
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-950 dark:text-blue-400 font-bold text-sm overflow-hidden">
                      {s.profile_image ? (
                        <img
                          src={s.profile_image}
                          alt={`${s.full_name} profile`}
                          className="size-full object-cover"
                        />
                      ) : (
                        s.full_name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2) || "?"
                      )}
                    </div>

                    <div>
                      <p className="font-bold text-blue-950 dark:text-slate-200 text-sm">
                        {s.full_name}
                      </p>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">
                        {s.matric_number} • {s.level}L • {s.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 flex items-center gap-1 border border-emerald-100">
                      <ScanFace className="size-3" /> Face
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 flex items-center gap-1 border border-emerald-100">
                      <Fingerprint className="size-3" /> Print
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {searchedStudents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl bg-white/50 backdrop-blur-sm">
            <Database className="size-10 text-slate-300 mb-3" />
            <p className="text-lg font-bold text-slate-500">
              No students found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
