import {
  Award,
  Brain,
  ChartColumn,
  CodeXml,
  Compass,
  MessagesSquare,
  Mic,
  Palette,
  Presentation,
  Users,
  type LucideIcon,
} from "lucide-react";

/** Content refers to icons by key so site.ts stays framework-free. */
export const icons: Record<string, LucideIcon> = {
  award: Award,
  brain: Brain,
  chart: ChartColumn,
  code: CodeXml,
  compass: Compass,
  messages: MessagesSquare,
  mic: Mic,
  palette: Palette,
  presentation: Presentation,
  users: Users,
};
