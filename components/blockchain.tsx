import {
  CheckCircle2,
  Hexagon,
  X,
  Fingerprint,
  Link as LinkIcon,
} from "lucide-react";

interface ReceiptData {
  date: string;
  courseCode?: string;
  transactionHash?: string;
  biometricHash?: string;
}

interface BlockchainReceiptModalProps {
  receipt: ReceiptData;
  onClose: () => void;
}

export function BlockchainReceiptModal({
  receipt,
  onClose,
}: BlockchainReceiptModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#041024]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-[24px] bg-white dark:bg-[#0a1c3a] shadow-2xl border border-[#d9e3f6] dark:border-[#1a365d] overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#0a2f66] dark:bg-[#1a4b96] p-5 text-white">
          <div className="flex items-center gap-2">
            <Hexagon className="size-5" />
            <h3 className="font-bold tracking-wide">Blockchain Receipt</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-white/20 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-[#eafff0] dark:bg-[#1a4b96]/40 text-green-600 dark:text-green-400">
                <CheckCircle2 className="size-6" />
              </div>
              <p className="text-sm font-bold text-[#0a2f66] dark:text-white">
                Verified on Hyperledger
              </p>
              <p className="text-xs text-[#6b6b6b] dark:text-[#8ba3c7]">
                {receipt.courseCode ? `${receipt.courseCode} • ` : ""}
                Recorded on {receipt.date}
              </p>
            </div>
          </div>

          {/* Cryptographic Data */}
          <div className="rounded-xl border border-[#d9e3f6] dark:border-[#1a365d] bg-[#f2f2f2] dark:bg-[#041024] p-4 space-y-4">
            <div>
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#b2b2b2] dark:text-[#8ba3c7] mb-1">
                <LinkIcon className="size-3" /> Transaction Hash
              </p>
              <p className="font-mono text-xs text-[#262626] dark:text-[#8ba3c7] break-all bg-white dark:bg-[#0a1c3a] p-2 rounded-md border border-[#d9e3f6] dark:border-[#1a365d]">
                {receipt.transactionHash || "0x8fB321a9c84eD521b4...c982A1"}
              </p>
            </div>

            <div>
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#b2b2b2] dark:text-[#8ba3c7] mb-1">
                <Fingerprint className="size-3" /> Biometric Vector Hash
              </p>
              <p className="font-mono text-xs text-[#262626] dark:text-[#8ba3c7] break-all bg-white dark:bg-[#0a1c3a] p-2 rounded-md border border-[#d9e3f6] dark:border-[#1a365d]">
                {receipt.biometricHash || "SHA256: 9a3e21...f1b7"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
