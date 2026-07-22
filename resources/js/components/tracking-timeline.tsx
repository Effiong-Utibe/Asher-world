import { Check } from "lucide-react"
import {
  STATUS_FLOW,
  formatDate
  
  
} from "@/lib/orders"
import type {Order, OrderStatus} from "@/lib/orders";
import { cn } from "@/lib/utils"

export function TrackingProgress({ order }: { order: Order }) {
  if (order.status === "cancelled") {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
        This order was cancelled and is no longer being tracked.
      </div>
    )
  }

  const currentIndex = STATUS_FLOW.indexOf(order.status)

  return (
    <ol className="flex items-center">
      {STATUS_FLOW.map((step, index) => {
        const reached = index <= currentIndex
        const completed = index < currentIndex
        const isLast = index === STATUS_FLOW.length - 1

        return (
          <li
            key={step}
            className={cn("flex items-center", !isLast && "flex-1")}
          >
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors",
                  reached
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground",
                )}
              >
                {completed ? (
                  <Check className="size-4" aria-hidden="true" />
                ) : (
                  index + 1
                )}
              </span>
              <span
                className={cn(
                  "max-w-20 text-center text-[11px] leading-tight",
                  reached ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {labelFor(step)}
              </span>
            </div>
            {!isLast && (
              <span
                className={cn(
                  "mx-1 h-0.5 flex-1 rounded-full",
                  index < currentIndex ? "bg-primary" : "bg-border",
                )}
                aria-hidden="true"
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}

export function TrackingHistory({ order }: { order: Order }) {
  return (
    <ol className="relative space-y-6 border-l border-border pl-6">
      {[...order.history].reverse().map((event, index) => {
        const isCurrent = index === 0

        return (
          <li key={`${event.status}-${event.timestamp}`} className="relative">
            <span
              className={cn(
                "absolute -left-[31px] top-0.5 flex size-3.5 items-center justify-center rounded-full border-2 border-background",
                isCurrent ? "bg-primary" : "bg-muted-foreground/40",
              )}
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="text-sm font-medium text-foreground">
                {event.label}
              </p>
              <time className="text-xs text-muted-foreground">
                {formatDate(event.timestamp)}
              </time>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {event.description}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {event.location}
            </p>
          </li>
        )
      })}
    </ol>
  )
}

function labelFor(status: OrderStatus) {
  return {
    pending: "Placed",
    processing: "Processing",
    shipped: "Shipped",
    out_for_delivery: "Out for delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
  }[status]
}
