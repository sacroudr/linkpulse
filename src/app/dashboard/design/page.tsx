import type { Metadata } from "next";
import { ThemePanel } from "../../../../components/design/ThemePanel";
import { DesignShowcase } from "./DesignShowxase";

export const metadata: Metadata = {
  title: "Design System — LinkPulse",
  description: "Explore and customize LinkPulse UI components and design tokens.",
};

export default function DesignSystemPage() {
  return (
    <div className="-m-8 flex" style={{ height: "100vh", overflow: "hidden" }}>
      <ThemePanel />
      <div
        className="ml-60 flex-1 overflow-y-auto theme-panel-scroll"
        style={{ height: "100vh" }}
      >
        <div className="p-8">
          <DesignShowcase />
        </div>
      </div>
    </div>
  );
}
