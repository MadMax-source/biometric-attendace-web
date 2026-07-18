import { Loader2, Check } from "lucide-react";

interface RegistrationFABProps {
  selectedCount: number;
  isSubmitting: boolean;
  onRegister: () => void;
}

export default function RegistrationFAB({
  selectedCount,
  isSubmitting,
  onRegister,
}: RegistrationFABProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-5">
      <button
        onClick={onRegister}
        disabled={isSubmitting}
        className="flex items-center gap-2 rounded-full bg-[#0a2f66] dark:bg-[#1a4b96] px-6 py-4 font-bold text-white shadow-[0_24px_80px_rgba(15,23,42,0.12)] hover:bg-[#0a2f66]/90 dark:hover:bg-[#1a4b96]/80 transition-colors disabled:opacity-70"
      >
        {isSubmitting ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <Check className="size-5" />
        )}
        Register {selectedCount} Course{selectedCount > 1 ? "s" : ""}
      </button>
    </div>
  );
}
