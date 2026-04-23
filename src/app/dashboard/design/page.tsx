// import { ThemePanel } from "@/components/design/ThemePanel";

import { ThemePanel } from "../../../../components/design/ThemePanel";
// import { ThemePanel } from "@/components/design/ThemePanel";

export default function DesignSystemPage() {
  return (
    <div className="relative">
      <ThemePanel />
      <div className="ml-56 p-8">
        <div
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{
            backgroundColor: "#1c1c1f",
            border: "1px solid #27272a",
            color: "#71717a",
          }}
        >
          Design System
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Shorly UI</h1>
        <p className="text-sm" style={{ color: "#71717a" }}>
          Edit tokens on the left — all components update instantly.
        </p>
      </div>
    </div>
  );
}