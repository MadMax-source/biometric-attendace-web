import { Fingerprint, ShieldCheck } from "lucide-react";

const LEFT_SIDE_IMAGE =
  "https://res.cloudinary.com/wgoxg8df/image/upload/v1783207995/Biometric_ajlodd.webp";

export default function MobileSplashOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a2f66] px-4 py-6 md:hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(123,191,255,0.22),_transparent_36%),linear-gradient(135deg,_rgba(10,47,102,0.98),_rgba(23,72,145,0.84))]" />
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:38px_38px]" />

      <div className="relative z-10 flex h-full max-h-[920px] w-full max-w-[520px] flex-col justify-center space-y-5">
        <div className="flex items-center justify-between text-white/85">
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-white capitalize">
            blockchain-based multimodal attendance system
          </h1>
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
            <ShieldCheck className="size-5" />
          </div>
        </div>

        <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm">
          <img
            src={LEFT_SIDE_IMAGE}
            alt="Biometric attendance concept"
            className="h-[420px] w-full object-cover object-center sm:h-[520px]"
          />
        </div>

        <h1 className="mt-2 text-3xl font-semibold leading-tight text-white capitalize">
          with offline synchronization for low-connectivity environments
        </h1>

        <div className="flex flex-wrap gap-4 text-white/80">
          <div className="flex flex-col items-center gap-2">
            <Fingerprint className="size-5" />{" "}
            <span className="text-xs">Hardware scan</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="size-5" />{" "}
            <span className="text-xs">Trusted records</span>
          </div>
        </div>
      </div>
    </div>
  );
}
