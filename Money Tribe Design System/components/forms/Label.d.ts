import { ReactNode, LabelHTMLAttributes } from "react";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

/** Field label; renders a red asterisk when required. */
export function Label(props: LabelProps): JSX.Element;
