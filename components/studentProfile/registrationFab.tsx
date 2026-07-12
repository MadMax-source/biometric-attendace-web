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
        className="flex items-center gap-2 rounded-full bg-[#16085a] px-6 py-4 font-bold text-white shadow-xl hover:bg-[#5e3bce] transition-colors disabled:opacity-70"
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
