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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-[24px] bg-white dark:bg-slate-950 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#5e3bce] p-5 text-white">
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
              <div className="flex size-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                <CheckCircle2 className="size-6" />
              </div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Verified on Hyperledger
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {/* Dynamically render courseCode if it exists (for History page) */}
                {receipt.courseCode ? `${receipt.courseCode} • ` : ""}
                Recorded on {receipt.date}
              </p>
            </div>
          </div>

          {/* Cryptographic Data */}
          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4 space-y-4">
            <div>
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                <LinkIcon className="size-3" /> Transaction Hash
              </p>
              <p className="font-mono text-xs text-slate-700 dark:text-slate-300 break-all bg-white dark:bg-slate-950 p-2 rounded-md border border-slate-200 dark:border-slate-800">
                {receipt.transactionHash || "0x8fB321a9c84eD521b4...c982A1"}
              </p>
            </div>

            <div>
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                <Fingerprint className="size-3" /> Biometric Vector Hash
              </p>
              <p className="font-mono text-xs text-slate-700 dark:text-slate-300 break-all bg-white dark:bg-slate-950 p-2 rounded-md border border-slate-200 dark:border-slate-800">
                {receipt.biometricHash || "SHA256: 9a3e21...f1b7"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
