import { Zap } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 flex items-center justify-center"
        style={{ backgroundColor: "var(--accent)", borderRadius: "var(--radius)" }}
      >
        <Zap className="w-5 h-5 text-white fill-white" />
      </div>
      <span
        className="font-semibold text-white"
        style={{ fontSize: "var(--text-xl)" }}
      >
        LinkPulse
      </span>
    </div>
  );
}
