import { Zap } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10  rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--accent)" }}>
        <Zap className="w-5 h-5 text-white fill-white" />
      </div>
      <span className="text-xl font-semibold text-white">Linkpulse</span>
    </div>
  );
}