export default function MobileStatusBar({ light = false }: { light?: boolean }) {
  const color = light ? "text-white/80" : "text-foreground/70";

  return (
    <div className={`flex-shrink-0 flex justify-between items-center px-7 pt-4 pb-1 ${color}`}>
      <span className="text-[12px] font-semibold">9:41</span>
      <div className="flex items-center gap-2">
        {/* Signal bars */}
        <div className="flex items-end gap-[2px]">
          {[1, 2, 3, 4].map((h) => (
            <div
              key={h}
              className="w-[3px] rounded-[1px] bg-current"
              style={{ height: `${h * 3}px` }}
            />
          ))}
        </div>
        {/* WiFi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
          <path d="M7.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
          <path d="M3.5 5.2a5.7 5.7 0 0 1 8 0l1.1-1.1a7.3 7.3 0 0 0-10.2 0l1.1 1.1z" />
          <path d="M5.7 7.4a2.8 2.8 0 0 1 3.6 0l1.1-1.1a4.3 4.3 0 0 0-5.8 0l1.1 1.1z" />
          <path d="M1.4 2.9a9.3 9.3 0 0 1 12.2 0l1-1A10.8 10.8 0 0 0 .4 1.9l1 1z" />
        </svg>
        {/* Battery */}
        <div className="relative w-[22px] h-[11px] rounded-[3px] border border-current/60">
          <div className="absolute left-[2px] top-[2px] bottom-[2px] w-[13px] bg-current rounded-[1px]" />
          <div className="absolute right-[-3px] top-[3px] bottom-[3px] w-[2px] bg-current/60 rounded-r-[1px]" />
        </div>
      </div>
    </div>
  );
}
