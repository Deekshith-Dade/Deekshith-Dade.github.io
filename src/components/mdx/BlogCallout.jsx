import { cn } from "@/lib/utils";

export default function BlogCallout({ 
  children, 
  title,
  variant = "default" // "default" | "warn"
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border p-6 my-6",
        variant === "warn"
          ? "border-red-400/30 bg-red-500/5 text-red-50"
          : "border-white/15 bg-white/5 text-white"
      )}
    >
      {title && <p className="text-xs uppercase tracking-[0.35em] text-white/50 mb-3">{title}</p>}
      <div className="text-sm text-white/80">{children}</div>
    </div>
  );
}
