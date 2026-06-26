import { ReactNode } from "react";

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  orientation?: "vertical" | "horizontal";
  children?: ReactNode;
}

export interface RadioProps {
  /** Value reported to the parent RadioGroup when selected. */
  value: string;
  label?: ReactNode;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

/**
 * Grouped single-select radio buttons with the Money Tribe green dot.
 * @startingPoint section="Forms" subtitle="Radio group — single select" viewport="700x180"
 */
export function RadioGroup(props: RadioGroupProps): JSX.Element;
export function Radio(props: RadioProps): JSX.Element;
