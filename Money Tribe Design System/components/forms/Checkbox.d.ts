import { ReactNode } from "react";

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  /** Optional inline label rendered to the right. */
  label?: ReactNode;
  id?: string;
}

/**
 * Checkbox with the Money Tribe green check. Controlled or uncontrolled.
 * @startingPoint section="Forms" subtitle="Checkbox with brand checkmark" viewport="700x160"
 */
export function Checkbox(props: CheckboxProps): JSX.Element;
