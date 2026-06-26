import { ReactNode, HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  /** Adds hover lift + pointer cursor. */
  interactive?: boolean;
  /** Highlights the border in brand green. */
  selected?: boolean;
  children?: ReactNode;
}
export interface CardHeaderProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}

/**
 * Rounded surface container with soft shadow and optional hover lift.
 * @startingPoint section="Layout" subtitle="Card surface" viewport="700x220"
 */
export function Card(props: CardProps): JSX.Element;
export function CardHeader(props: CardHeaderProps): JSX.Element;
