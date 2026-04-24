import { ThemePanel } from "../../../../components/design/ThemePanel";
import { DesignShowcase } from "./DesignShowxase";

export default function DesignSystemPage() {
  return (
    <div className="flex">
      <ThemePanel />
      <div className="ml-60 flex-1 p-8 min-h-screen">
        <DesignShowcase />
      </div>
    </div>
  );
}