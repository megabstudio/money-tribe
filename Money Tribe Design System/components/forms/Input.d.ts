import { ReactNode, InputHTMLAttributes } from "react";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

/** Single-line text field with brand focus ring and optional adornments. */
export function Input(props: InputProps): JSX.Element;
