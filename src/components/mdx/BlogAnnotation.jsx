import { cn } from "@/lib/utils";

export default function BlogAnnotation({ 
  children,
  variant = "default" // "default" | "tip"
}) {
  return (
    <p
      className={cn(
        "rounded-full px-5 py-2 text-xs uppercase tracking-[0.35em] inline-block my-4",
        variant === "tip"
          ? "bg-emerald-500/10 text-emerald-200"
          : "bg-white/10 text-white/90"
      )}
    >
      {children}
    </p>
  );
}
