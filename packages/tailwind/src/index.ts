import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// biome-ignore lint/performance/noBarrelFile: shared module
export { cva, type VariantProps } from "class-variance-authority";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
