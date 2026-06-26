import { TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

/** Multi-line text field with brand focus ring. */
export function Textarea(props: TextareaProps): JSX.Element;
