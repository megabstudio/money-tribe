import { ReactNode, ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Maps to the Money Tribe Figma button family. */
  variant?: "primary" | "secondary" | "dark" | "outline" | "outline-dark" | "ghost";
  /** Control height. */
  size?: "sm" | "md" | "lg";
  /** Corner treatment from the Figma corner set. */
  shape?: "rounded" | "pill" | "sharp";
  fullWidth?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

/**
 * Primary call-to-action and action button for Money Tribe surfaces.
 * @startingPoint section="Buttons" subtitle="Brand button — 6 variants, 3 shapes" viewport="700x220"
 */
export function Button(props: ButtonProps): JSX.Element;
