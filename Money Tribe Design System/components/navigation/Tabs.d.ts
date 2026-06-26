import { ReactNode } from "react";

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** "underline" (default) or "pill" segmented control. */
  variant?: "underline" | "pill";
  children?: ReactNode;
}
export interface TabsListProps { children?: ReactNode; }
export interface TabsTriggerProps { value: string; disabled?: boolean; children?: ReactNode; }
export interface TabsContentProps { value: string; children?: ReactNode; }

/**
 * Tabbed navigation. Underline or pill (segmented) variants.
 * @startingPoint section="Navigation" subtitle="Tabs — underline & pill" viewport="700x200"
 */
export function Tabs(props: TabsProps): JSX.Element;
export function TabsList(props: TabsListProps): JSX.Element;
export function TabsTrigger(props: TabsTriggerProps): JSX.Element;
export function TabsContent(props: TabsContentProps): JSX.Element;
