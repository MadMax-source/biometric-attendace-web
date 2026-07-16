import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="relative w-full sm:max-w-sm">
      <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
      <Input
        placeholder="Search by code or title..."
        className="pl-9 focus-visible:ring-[#0c2a5d]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
