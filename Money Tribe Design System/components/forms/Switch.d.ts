import { ReactNode } from "react";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  label?: ReactNode;
}

/** On/off toggle with brand green track. */
export function Switch(props: SwitchProps): JSX.Element;
