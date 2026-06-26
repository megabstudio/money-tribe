import { ReactNode, ButtonHTMLAttributes } from "react";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "dark" | "outline" | "outline-dark" | "ghost";
  size?: "sm" | "md" | "lg";
  shape?: "rounded" | "pill" | "sharp";
  disabled?: boolean;
  /** Required for accessibility — names the action. */
  "aria-label": string;
  children?: ReactNode;
}

/** Square single-icon button matching the Money Tribe Button family. */
export function IconButton(props: IconButtonProps): JSX.Element;
