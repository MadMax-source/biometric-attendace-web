import { Fingerprint, ShieldCheck } from "lucide-react";

const LEFT_SIDE_IMAGE =
  "https://res.cloudinary.com/wgoxg8df/image/upload/v1783207995/Biometric_ajlodd.webp";

export default function AsideBanner() {
  return (
    <aside className="relative hidden overflow-hidden bg-[#0a2f66] text-white md:flex md:flex-col p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(123,191,255,0.18),_transparent_36%),linear-gradient(135deg,_rgba(10,47,102,0.98),_rgba(23,72,145,0.86))]" />
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.82)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.82)_1px,transparent_1px)] [background-size:38px_38px]" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="space-y-10">
          <h1 className="text-3xl font-semibold leading-tight text-white capitalize">
            blockchain-based multimodal attendance system
          </h1>

          <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/8 shadow-[0_18px_55px_rgba(0,0,0,0.2)] backdrop-blur-sm">
            <img
              src={LEFT_SIDE_IMAGE}
              alt="Biometric attendance concept"
              className="h-[320px] w-full object-cover object-center xl:h-[520px]"
            />
          </div>

          <h1 className="text-3xl font-semibold leading-tight text-white capitalize">
            with offline synchronization for low-connectivity environments
          </h1>

          <div className="flex flex-wrap gap-7">
            <Feature
              icon={<Fingerprint className="size-5" />}
              label="Hardware scan"
            />
            <Feature
              icon={<ShieldCheck className="size-5" />}
              label="Trusted records"
            />
            <Feature
              icon={<Fingerprint className="size-5" />}
              label="Secure sync"
            />
            <Feature
              icon={<ShieldCheck className="size-5" />}
              label="Live verification"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="flex size-10 items-center justify-center rounded-lg bg-white/15 text-white">
        {icon}
      </div>
      <span className="text-xs text-white/80">{label}</span>
    </div>
  );
}
