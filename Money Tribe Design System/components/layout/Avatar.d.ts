import { ReactNode } from "react";

export interface AvatarProps {
  src?: string;
  /** Used for the alt text and the initials fallback. */
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Adds a brand-green status ring. */
  ring?: boolean;
}
export interface AvatarGroupProps {
  max?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  children?: ReactNode;
}

/** Circular avatar with initials fallback. */
export function Avatar(props: AvatarProps): JSX.Element;
export function AvatarGroup(props: AvatarGroupProps): JSX.Element;
