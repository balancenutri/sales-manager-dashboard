import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const keyString = (str: string): string => {
  if (!str) return "";
  let result = str.replace(/_/g, " ");
  result = result.replace(/([A-Z])/g, " $1").trim();
  result = result.replace(/\b\w/g, (char) => char.toUpperCase());
  return result;
};