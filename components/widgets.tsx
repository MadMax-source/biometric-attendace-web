import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-[#0a2f66] dark:text-white text-balance transition-colors">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-[#6b6b6b] dark:text-[#8ba3c7] leading-relaxed transition-colors">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
}) {
  return (
    <Card className="bg-white dark:bg-[#0a1c3a] border-[#d9e3f6] dark:border-[#1a365d] border-t-4 border-t-[#0a2f66] dark:border-t-white shadow-sm transition-all">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#f2f2f2] dark:bg-[#1a4b96]/40 text-[#0a2f66] dark:text-white transition-colors">
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm text-[#6b6b6b] dark:text-[#8ba3c7] transition-colors">
            {label}
          </p>
          <p className="text-2xl font-semibold tracking-tight text-[#0a2f66] dark:text-white transition-colors">
            {value}
          </p>
          {hint && (
            <p className="truncate text-xs text-[#b2b2b2] dark:text-[#8ba3c7]/70 transition-colors">
              {hint}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface BarRowProps {
  label: string;
  percentage: number;
}

export function BarRow({ label, percentage }: BarRowProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-[#262626] dark:text-white">
          {label}
        </span>
        <span className="text-[#0a2f66] dark:text-white font-semibold transition-colors">
          {percentage}%
        </span>
      </div>
      <Progress
        value={percentage}
        className="[&_[data-slot=progress-track]]:bg-[#f2f2f2] dark:[&_[data-slot=progress-track]]:bg-[#1a365d] [&_[data-slot=progress-indicator]]:bg-[#0a2f66] dark:[&_[data-slot=progress-indicator]]:bg-white"
      />
    </div>
  );
}
