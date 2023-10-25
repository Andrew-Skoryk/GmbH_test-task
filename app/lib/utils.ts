import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fromServerFormat(dateString: string): string {
  const [day, month, year] = dateString.split('-');

  return `20${year}-${month}-${day}`;
}

export function toServerFormat(dateString: string): string {
  const [year, month, day] = dateString.split('-');

  return `${day}-${month}-${year.slice(-2)}`;
}
