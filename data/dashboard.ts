
import {
  Wallet,
  Users,
  ShoppingBag,
  ChartNoAxesCombined,
} from "lucide-react";

export const dashboardStats = [
  {
    title: "Total Revenue",
    value: "$84,254.00",
    change: "+12.8%",
    description: "Compared to last month",
    trend: "up",
    icon: Wallet,
    color: "indigo",
  },
  {
    title: "Total Customers",
    value: "2,420",
    change: "+8.2%",
    description: "Compared to last month",
    trend: "up",
    icon: Users,
    color: "blue",
  },
  {
    title: "Total Orders",
    value: "1,854",
    change: "+5.4%",
    description: "Compared to last month",
    trend: "up",
    icon: ShoppingBag,
    color: "violet",
  },
  {
    title: "Conversion Rate",
    value: "3.64%",
    change: "+2.1%",
    description: "Compared to last month",
    trend: "up",
    icon: ChartNoAxesCombined,
    color: "emerald",
  },
] as const;
