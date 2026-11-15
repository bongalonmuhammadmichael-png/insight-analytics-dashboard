export const productPerformanceData = [
  {
    id: "PRD-001",
    name: "Wireless Headphones",
    category: "Electronics",
    revenue: 18450,
    unitsSold: 185,
    growth: 18.5,
  },
  {
    id: "PRD-002",
    name: "Smart Watch",
    category: "Electronics",
    revenue: 15200,
    unitsSold: 160,
    growth: 14.2,
  },
  {
    id: "PRD-003",
    name: "Leather Backpack",
    category: "Fashion",
    revenue: 12800,
    unitsSold: 128,
    growth: 11.8,
  },
  {
    id: "PRD-004",
    name: "Running Shoes",
    category: "Fashion",
    revenue: 10950,
    unitsSold: 150,
    growth: 9.6,
  },
  {
    id: "PRD-005",
    name: "Skin Care Set",
    category: "Beauty",
    revenue: 8950,
    unitsSold: 179,
    growth: 8.4,
  },
  {
    id: "PRD-006",
    name: "Desk Lamp",
    category: "Home & Living",
    revenue: 7200,
    unitsSold: 90,
    growth: 6.7,
  },
];

export const productSummary = {
  totalProducts: productPerformanceData.length,
  totalRevenue: productPerformanceData.reduce(
    (total, product) => total + product.revenue,
    0
  ),
  totalUnitsSold: productPerformanceData.reduce(
    (total, product) => total + product.unitsSold,
    0
  ),
};
