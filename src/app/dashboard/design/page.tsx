import type { Metadata } from "next";
import { DesignPageShell } from "../../../../components/design/DesignPageShell";
import { DesignShowcase } from "./DesignShowxase";

export const metadata: Metadata = {
  title: "Design System — LinkPulse",
  description: "Explore and customize LinkPulse UI components and design tokens.",
};

export default function DesignSystemPage() {
  return (
    <DesignPageShell>
      <DesignShowcase />
    </DesignPageShell>
  );
}
