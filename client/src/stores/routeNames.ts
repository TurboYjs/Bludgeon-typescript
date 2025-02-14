import type { RouteLinksTypeT } from "../types";

export const RouteLinks: RouteLinksTypeT[] = [
  {
    path: "/Clients",
    component: "Clients",
    name: "Clients",
    icon: "👭",
  },
  {
    path: "/Vendors",
    component: "Vendors",
    name: "Sellers",
    icon: "👥",
  },
  {
    path: "/Products",
    component: "Products",
    name: "Products",
    icon: "📦",
  },
  {
    path: "/Commands/all",
    component: "Commands",
    name: "Commands",
    icon: "🚚",
  },
  {
    path: "/Invoices/all",
    component: "Invoices",
    name: "Invoices",
    icon: "📋",
  },
  {
    path: "/Stocks",
    component: "Stocks",
    name: "Stock",
    icon: "🏪",
  },
  {
    path: "/Stats",
    component: "Stats",
    name: "Statistics",
    icon: "📊",
  },
  {
    path: "/Credit",
    component: "Credit",
    name: "Credit",
    icon: "💵",
  },
];
