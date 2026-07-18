import { Fingerprint, ShieldCheck } from "lucide-react";

const LEFT_SIDE_IMAGE =
  "https://res.cloudinary.com/wgoxg8df/image/upload/v1783207995/Biometric_ajlodd.webp";

export default function AsideBanner() {
  return (
    <aside className="relative hidden overflow-hidden bg-[#0e3065] dark:bg-gray-950 text-white md:flex md:flex-col p-10 border-none transition-colors">
      <div className="absolute inset-0 bg-[#0e3065]" />

      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="space-y-10">
          <h1 className="text-3xl font-bold leading-tight text-white capitalize">
            Blockchain-Based Multimodal Attendance System
          </h1>

          <div className="relative overflow-hidden rounded-[24px] border-4 border-[#1c448a] bg-[#0e3065] shadow-xl group">
            <img
              src={LEFT_SIDE_IMAGE}
              alt="Biometric attendance concept"
              className="h-[320px] w-full object-cover object-center xl:h-[520px]"
            />
          </div>

          <div className="flex flex-wrap gap-7 invisible">
            <Feature
              icon={<Fingerprint className="size-5" />}
              label="Hardware scan"
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
      <div className="flex size-10 items-center justify-center rounded-lg bg-white/20 text-white">
        {icon}
      </div>
      <span className="text-xs font-medium text-white">{label}</span>
    </div>
  );
}
