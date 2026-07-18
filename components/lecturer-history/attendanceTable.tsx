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
    <div className="rounded-2xl bg-white dark:bg-[#0a1c3a] shadow-sm border border-[#d9e3f6] dark:border-[#1a365d] overflow-hidden">
      <div className="p-4 border-b border-[#d9e3f6] dark:border-[#1a365d] flex items-center justify-between bg-[#f2f2f2]/50 dark:bg-[#041024]/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#b2b2b2] dark:text-[#8ba3c7]" />
          <input
            type="text"
            placeholder="Search matric no..."
            className="pl-9 pr-4 py-2 rounded-lg border border-[#d9e3f6] dark:border-[#1a365d] bg-[#f2f2f2] dark:bg-[#041024] text-sm focus:outline-none focus:ring-2 focus:ring-[#0a2f66] dark:focus:ring-white text-[#262626] dark:text-white"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="text-sm font-bold text-[#6b6b6b] dark:text-[#8ba3c7] flex items-center gap-2">
          <Users className="size-4" /> {totalEnrolled} Enrolled
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f2f2f2] dark:bg-[#041024]/50 text-[#6b6b6b] dark:text-[#8ba3c7] font-bold">
            <tr>
              <th className="px-6 py-4">Matric No.</th>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Time In</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f2f2f2] dark:divide-[#1a365d]">
            {filteredData.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-[#f2f2f2] dark:hover:bg-[#1a365d]/40 transition-colors"
              >
                <td className="px-6 py-4 font-mono font-bold text-[#262626] dark:text-[#8ba3c7]">
                  {student.matric}
                </td>
                <td className="px-6 py-4 font-semibold text-[#0a2f66] dark:text-white">
                  {student.name}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-bold flex w-fit items-center gap-1.5 ${
                      student.status === "Present"
                        ? "bg-[#eafff0] text-emerald-700 dark:bg-[#1a365d] dark:text-emerald-400"
                        : "bg-[#fff5eb] text-rose-700 dark:bg-[#1a365d] dark:text-rose-400"
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
                <td className="px-6 py-4 font-medium text-[#6b6b6b] dark:text-[#8ba3c7]">
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
