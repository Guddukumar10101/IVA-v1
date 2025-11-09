import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors",
        variant === "default" &&
          "bg-[var(--primary)]/15 text-[var(--primary)]",
        variant === "secondary" &&
          "bg-[var(--accent)]/15 text-[var(--accent)]",
        variant === "outline" &&
          "border border-[var(--border)] text-[var(--foreground)]",
        className
      )}
      {...props}
    />
  );
}
