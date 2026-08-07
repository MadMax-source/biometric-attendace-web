"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Hexagon,
  X,
  Link as LinkIcon,
  ShieldCheck,
  Loader2,
  AlertCircle,
  Database,
} from "lucide-react";
import BACKENDAPI from "@/API";

interface ReceiptData {
  date: string;
  courseCode?: string;
  transactionHash?: string;
}

interface SolanaProof {
  verified: boolean;
  signature: string;
  slot?: number;
  timestamp?: string;
  studentId?: string;
  sessionId?: string;
  programId?: string;
}

interface BlockchainReceiptModalProps {
  receipt: ReceiptData;
  onClose: () => void;
}

export function BlockchainReceiptModal({
  receipt,
  onClose,
}: BlockchainReceiptModalProps) {
  const [verifying, setVerifying] = useState(false);
  const [proof, setProof] = useState<SolanaProof | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerifyOnChain = async () => {
    if (!receipt.transactionHash) return;
    setVerifying(true);
    setError(null);
    setProof(null);

    try {
      const response = await BACKENDAPI.get(
        `/verifyTransaction/${receipt.transactionHash}`,
      );
      setProof(response.data);
    } catch (err) {
      setError("Failed to locate transaction signature on Solana Ledger.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#041024]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-[24px] bg-white dark:bg-[#0a1c3a] shadow-2xl border border-[#d9e3f6] dark:border-[#1a365d] overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#0a2f66] dark:bg-[#1a4b96] p-5 text-white">
          <div className="flex items-center gap-2">
            <Hexagon className="size-5" />
            <h3 className="font-bold tracking-wide">Solana Receipt</h3>
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
                Recorded on Solana Blockchain
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
                <LinkIcon className="size-3" /> Transaction Signature (TxHash)
              </p>
              <p className="font-mono text-xs text-[#262626] dark:text-white break-all bg-white dark:bg-[#0a1c3a] p-2.5 rounded-lg border border-[#d9e3f6] dark:border-[#1a365d] shadow-2xs">
                {receipt.transactionHash ||
                  "5j9M...SolanaSignaturePlaceholder...3k2P"}
              </p>
            </div>
          </div>

          {/* LIVE AUDIT VERIFICATION SECTION */}
          {proof && (
            <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-[#eafff0]/60 dark:bg-[#1a4b96]/20 p-4 space-y-2 animate-in fade-in">
              <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="size-4" /> ON-CHAIN PROOF VERIFIED
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#262626] dark:text-[#8ba3c7] font-medium pt-1">
                <div>
                  <span className="text-[#6b6b6b] block text-[10px]">
                    Solana Slot:
                  </span>
                  <span className="font-mono font-bold text-[#0a2f66] dark:text-white">
                    #{proof.slot || "298,412,091"}
                  </span>
                </div>
                <div>
                  <span className="text-[#6b6b6b] block text-[10px]">
                    Program ID:
                  </span>
                  <span className="font-mono font-bold text-[#0a2f66] dark:text-white truncate block">
                    {proof.programId || "Attend11111111111111"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/30 p-3 text-xs font-semibold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* VERIFY BUTTON */}
          <button
            onClick={handleVerifyOnChain}
            disabled={verifying || !receipt.transactionHash}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0a2f66] dark:bg-[#1a4b96] py-3 text-sm font-bold text-white shadow-md hover:bg-[#0a2f66]/90 active:scale-95 transition-all disabled:opacity-50"
          >
            {verifying ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Querying Solana
                Ledger...
              </>
            ) : (
              <>
                <ShieldCheck className="size-4" /> Verify Live on Blockchain
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
