import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const keyString = (str: string): string => {
  if (!str || typeof str !== "string") return "";
  let result = str.replace(/_/g, " ");
  // result = result.replace(/([A-Z])/g, " $1").trim();
  result = result.replace(/\b\w/g, (char) => char.toUpperCase());
  return result;
};

export const formatCurrency = (amount: number | undefined) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount ?? 0);

export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 capitalize";
    case "inactive":
      return "bg-red-100 text-red-800 capitalize";
    case "new":
      return "bg-blue-100 text-blue-800 capitalize";
    case "contacted":
      return "bg-yellow-100 text-yellow-800 capitalize";
    case "follow-up":
      return "bg-purple-100 text-purple-800 capitalize";
    case "HOT":
      return "bg-red-100 text-red-800 capitalize";
    case "WARM":
      return "bg-orange-100 text-orange-800 capitalize";
    case "COLD":
      return "bg-blue-100 text-blue-800 capitalize";
    default:
      return "bg-gray-100 text-gray-800 capitalize";
  }
};
