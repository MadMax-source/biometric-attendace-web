import { cn } from "@/lib/utils"

/**
 * Engineering / blueprint vibe background.
 * Works in both light and dark mode via design tokens.
 * - Fine "graph paper" grid
 * - Larger blueprint grid
 * - Soft circuit-node dots
 * - Radial vignette so content stays readable
 */
export function EngineeringBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background", className)}
    >
      {/* fine grid */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* bold blueprint grid */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "150px 150px",
        }}
      />
      {/* circuit nodes */}
      <div
        className="absolute inset-0 opacity-50 dark:opacity-40"
        style={{
          backgroundImage: "radial-gradient(var(--color-primary) 2px, transparent 2.2px)",
          backgroundSize: "150px 150px",
          backgroundPosition: "0 0",
        }}
      />
      {/* glow accents */}
      <div className="absolute -left-32 -top-32 size-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -bottom-40 -right-24 size-96 rounded-full bg-primary/15 blur-3xl" />
      {/* readability vignette */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-background/50 to-background/70" />
    </div>
  )
}
