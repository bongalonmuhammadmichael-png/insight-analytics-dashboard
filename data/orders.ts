export const orderTrendData = [
  { date: "Nov 01", orders: 42 },
  { date: "Nov 05", orders: 56 },
  { date: "Nov 09", orders: 49 },
  { date: "Nov 13", orders: 72 },
  { date: "Nov 17", orders: 65 },
  { date: "Nov 21", orders: 88 },
  { date: "Nov 25", orders: 79 },
  { date: "Nov 30", orders: 96 },
];

export const orderStatusData = [
  { name: "Completed", value: 1240, color: "#10b981" },
  { name: "Pending", value: 280, color: "#f59e0b" },
  { name: "Processing", value: 234, color: "#6366f1" },
  { name: "Cancelled", value: 100, color: "#ef4444" },
];

export const orderMetrics = [
  {
    title: "Total Orders",
    value: "1,854",
    change: "5.4%",
    trend: "up",
    description: "Total orders this month",
  },
  {
    title: "Completed Orders",
    value: "1,240",
    change: "8.6%",
    trend: "up",
    description: "Successfully completed orders",
  },
  {
    title: "Pending Orders",
    value: "280",
    change: "3.2%",
    trend: "down",
    description: "Orders awaiting confirmation",
  },
  {
    title: "Average Order Value",
    value: "$45.44",
    change: "6.8%",
    trend: "up",
    description: "Average revenue per order",
  },
];

export const orderRecords = [
  {
    id: "ORD-2026-001",
    customer: "Olivia Rhye",
    date: "Nov 15, 2026",
    amount: 249.00,
    status: "Completed",
  },
  {
    id: "ORD-2026-002",
    customer: "Phoenix Baker",
    date: "Nov 14, 2026",
    amount: 189.00,
    status: "Pending",
  },
  {
    id: "ORD-2026-003",
    customer: "Lana Steiner",
    date: "Nov 14, 2026",
    amount: 125.50,
    status: "Completed",
  },
  {
    id: "ORD-2026-004",
    customer: "Demi Wilkinson",
    date: "Nov 13, 2026",
    amount: 98.00,
    status: "Processing",
  },
  {
    id: "ORD-2026-005",
    customer: "Candice Wu",
    date: "Nov 12, 2026",
    amount: 76.00,
    status: "Cancelled",
  },
];

export const orderSummary = {
  totalOrders: orderStatusData.reduce(
    (total, status) => total + status.value,
    0
  ),
  completedOrders: orderStatusData.find(
    (status) => status.name === "Completed"
  )?.value ?? 0,
  totalRecords: orderRecords.length,
};
