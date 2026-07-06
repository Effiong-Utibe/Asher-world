/**
 * Domain types used by the order tracking UI.
 *
 * These types describe the order shape, items, and tracking events
 * surfaced in the order dashboard and detail views.
 */
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"

export type TrackingEvent = {
  status: OrderStatus
  label: string
  description: string
  location: string
  timestamp: string // ISO string
}

export type OrderItem = {
  name: string
  sku: string
  quantity: number
  price: number
}

export type Order = {
  id: string
  customer: string
  email: string
  status: OrderStatus
  total: number
  placedAt: string
  carrier: string
  trackingNumber: string
  estimatedDelivery: string
  shippingAddress: string
  items: OrderItem[]
  history: TrackingEvent[]
}

// Ordered pipeline used to render the tracking progress bar.
export const STATUS_FLOW: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "out_for_delivery",
  "delivered",
]

export const STATUS_META: Record<
  OrderStatus,
  { label: string; tone: "neutral" | "info" | "warning" | "success" | "danger" }
> = {
  pending: { label: "Pending", tone: "neutral" },
  processing: { label: "Processing", tone: "info" },
  shipped: { label: "Shipped", tone: "info" },
  out_for_delivery: { label: "Out for Delivery", tone: "warning" },
  delivered: { label: "Delivered", tone: "success" },
  cancelled: { label: "Cancelled", tone: "danger" },
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

export const ORDERS: Order[] = [
  {
    id: "ORD-10294",
    customer: "Amara Okafor",
    email: "amara.okafor@example.com",
    status: "out_for_delivery",
    total: 248.5,
    placedAt: "2026-06-19T09:12:00Z",
    carrier: "FedEx",
    trackingNumber: "FX884213905US",
    estimatedDelivery: "2026-06-23T18:00:00Z",
    shippingAddress: "482 Maple Ave, Austin, TX 78701",
    items: [
      { name: "Wireless Headphones", sku: "WH-200", quantity: 1, price: 179.0 },
      { name: "USB-C Cable", sku: "CB-USC", quantity: 2, price: 12.75 },
      { name: "Travel Case", sku: "TC-01", quantity: 1, price: 44.0 },
    ],
    history: [
      {
        status: "pending",
        label: "Order placed",
        description: "Order received and awaiting payment confirmation.",
        location: "Online",
        timestamp: "2026-06-19T09:12:00Z",
      },
      {
        status: "processing",
        label: "Processing",
        description: "Payment confirmed. Items being picked and packed.",
        location: "Dallas, TX Warehouse",
        timestamp: "2026-06-19T15:40:00Z",
      },
      {
        status: "shipped",
        label: "Shipped",
        description: "Package handed to carrier.",
        location: "Dallas, TX",
        timestamp: "2026-06-20T08:05:00Z",
      },
      {
        status: "out_for_delivery",
        label: "Out for delivery",
        description: "On the delivery vehicle for final delivery.",
        location: "Austin, TX",
        timestamp: "2026-06-23T07:22:00Z",
      },
    ],
  },
  {
    id: "ORD-10293",
    customer: "Liam Chen",
    email: "liam.chen@example.com",
    status: "delivered",
    total: 89.99,
    placedAt: "2026-06-15T13:30:00Z",
    carrier: "UPS",
    trackingNumber: "1Z9989W0345612",
    estimatedDelivery: "2026-06-18T18:00:00Z",
    shippingAddress: "23 Birch St, Seattle, WA 98101",
    items: [
      { name: "Mechanical Keyboard", sku: "KB-87", quantity: 1, price: 89.99 },
    ],
    history: [
      {
        status: "pending",
        label: "Order placed",
        description: "Order received.",
        location: "Online",
        timestamp: "2026-06-15T13:30:00Z",
      },
      {
        status: "processing",
        label: "Processing",
        description: "Payment confirmed and packed.",
        location: "Reno, NV Warehouse",
        timestamp: "2026-06-15T18:10:00Z",
      },
      {
        status: "shipped",
        label: "Shipped",
        description: "Package in transit.",
        location: "Reno, NV",
        timestamp: "2026-06-16T09:00:00Z",
      },
      {
        status: "out_for_delivery",
        label: "Out for delivery",
        description: "On the delivery vehicle.",
        location: "Seattle, WA",
        timestamp: "2026-06-18T08:15:00Z",
      },
      {
        status: "delivered",
        label: "Delivered",
        description: "Left at front door.",
        location: "Seattle, WA",
        timestamp: "2026-06-18T14:47:00Z",
      },
    ],
  },
  {
    id: "ORD-10292",
    customer: "Sofia Rossi",
    email: "sofia.rossi@example.com",
    status: "processing",
    total: 412.0,
    placedAt: "2026-06-22T11:05:00Z",
    carrier: "DHL",
    trackingNumber: "Pending",
    estimatedDelivery: "2026-06-27T18:00:00Z",
    shippingAddress: "9 Rue Lafayette, Brooklyn, NY 11201",
    items: [
      { name: "Standing Desk", sku: "SD-48", quantity: 1, price: 380.0 },
      { name: "Cable Tray", sku: "CT-02", quantity: 1, price: 32.0 },
    ],
    history: [
      {
        status: "pending",
        label: "Order placed",
        description: "Order received and awaiting payment confirmation.",
        location: "Online",
        timestamp: "2026-06-22T11:05:00Z",
      },
      {
        status: "processing",
        label: "Processing",
        description: "Payment confirmed. Items being picked and packed.",
        location: "Newark, NJ Warehouse",
        timestamp: "2026-06-22T16:20:00Z",
      },
    ],
  },
  {
    id: "ORD-10291",
    customer: "Noah Patel",
    email: "noah.patel@example.com",
    status: "pending",
    total: 56.25,
    placedAt: "2026-06-23T06:48:00Z",
    carrier: "USPS",
    trackingNumber: "Pending",
    estimatedDelivery: "2026-06-29T18:00:00Z",
    shippingAddress: "771 Oak Dr, Denver, CO 80202",
    items: [
      { name: "Notebook Set", sku: "NB-3PK", quantity: 1, price: 24.25 },
      { name: "Gel Pens (12)", sku: "PN-12", quantity: 2, price: 16.0 },
    ],
    history: [
      {
        status: "pending",
        label: "Order placed",
        description: "Order received and awaiting payment confirmation.",
        location: "Online",
        timestamp: "2026-06-23T06:48:00Z",
      },
    ],
  },
  {
    id: "ORD-10288",
    customer: "Grace Müller",
    email: "grace.muller@example.com",
    status: "cancelled",
    total: 134.0,
    placedAt: "2026-06-12T19:02:00Z",
    carrier: "UPS",
    trackingNumber: "Cancelled",
    estimatedDelivery: "—",
    shippingAddress: "12 Elm Ct, Portland, OR 97201",
    items: [
      { name: "Desk Lamp", sku: "DL-09", quantity: 1, price: 134.0 },
    ],
    history: [
      {
        status: "pending",
        label: "Order placed",
        description: "Order received.",
        location: "Online",
        timestamp: "2026-06-12T19:02:00Z",
      },
      {
        status: "cancelled",
        label: "Cancelled",
        description: "Order cancelled at customer request. Refund issued.",
        location: "Online",
        timestamp: "2026-06-13T08:30:00Z",
      },
    ],
  },
]
