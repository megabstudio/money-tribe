import { ReactNode } from "react";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  /** Action row pinned to the bottom-right (e.g. Cancel / Confirm buttons). */
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
}

/**
 * Modal dialog with overlay, blur, Escape-to-close and scale-in entrance.
 * @startingPoint section="Overlay" subtitle="Modal dialog" viewport="700x460"
 */
export function Dialog(props: DialogProps): JSX.Element;
