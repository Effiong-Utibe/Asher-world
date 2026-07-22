import { STATUS_META  } from "@/lib/orders"
import type {OrderStatus} from "@/lib/orders";
import { cn } from "@/lib/utils"

const TONE_CLASSES: Record<string, string> = {
  neutral: "bg-muted text-muted-foreground",
  info: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  success:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  danger: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
}

export function StatusBadge({
  status,
  className,
}: {
  status: OrderStatus
  className?: string
}) {
  const meta = STATUS_META[status]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        TONE_CLASSES[meta.tone],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {meta.label}
    </span>
  )
}
