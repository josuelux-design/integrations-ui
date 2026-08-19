import { useState } from "react";
import { CompanyPanel } from "./components/CompanyPanel";
import { PitchbookGlyph } from "./lib/pitchbook";
import { tysonFoods } from "./data/company";

export default function App() {
  const [connected, setConnected] = useState(true);

  return (
    <div className="min-h-full">
      {/* Demo toolbar — not part of the panel, just to compare the two states */}
      <div className="fixed left-1/2 top-4 z-20 -translate-x-1/2">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 px-4 py-2 shadow-sm backdrop-blur">
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-slate-700">
            <PitchbookGlyph className="h-2 w-2 text-slate-400" />
            PitchBook access
          </span>
          <button
            role="switch"
            aria-checked={connected}
            onClick={() => setConnected((v) => !v)}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              connected ? "bg-brand-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                connected ? "left-[22px]" : "left-0.5"
              }`}
            />
          </button>
          <span className="text-[12px] tabular-nums text-slate-400">
            {connected ? "Connected" : "Not connected"}
          </span>
        </div>
      </div>

      {/* Faux app backdrop with the panel centered, as it appears today */}
      <div className="flex min-h-screen items-center justify-center bg-slate-900/30 p-4">
        <CompanyPanel company={tysonFoods} connected={connected} />
      </div>
    </div>
  );
}
