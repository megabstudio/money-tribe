import { ReactNode, HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "solid" | "dark" | "neutral" | "outline" | "destructive";
  size?: "sm" | "md";
  children?: ReactNode;
}

/** Pill badge for status, counts and category labels. */
export function Badge(props: BadgeProps): JSX.Element;
