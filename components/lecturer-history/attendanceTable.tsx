import { Users, Search, CheckCircle2, XCircle } from "lucide-react";

interface AttendanceTableProps {
  attendanceData: any[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalEnrolled: number;
}

export default function AttendanceTable({
  attendanceData,
  searchQuery,
  onSearchChange,
  totalEnrolled,
}: AttendanceTableProps) {
  const filteredData = attendanceData.filter((s) =>
    s.matric.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search matric no..."
            className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="text-sm font-bold text-slate-500 flex items-center gap-2">
          <Users className="size-4" /> {totalEnrolled} Enrolled
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-bold">
            <tr>
              <th className="px-6 py-4">Matric No.</th>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Time In</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredData.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <td className="px-6 py-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                  {student.matric}
                </td>
                <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-100">
                  {student.name}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-bold flex w-fit items-center gap-1.5 ${
                      student.status === "Present"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400"
                    }`}
                  >
                    {student.status === "Present" ? (
                      <CheckCircle2 className="size-3" />
                    ) : (
                      <XCircle className="size-3" />
                    )}
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-slate-500">
                  {student.timeIn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
