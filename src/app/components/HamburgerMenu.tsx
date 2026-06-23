import { useNavigate, useLocation } from "react-router";
import {
  X, User, BarChart2, Compass, Users, Bell, ChevronRight, LogOut,
} from "lucide-react";

// ─── Menu definition ─────────────────────────────────────────────────────────

const MENU_ITEMS = [
  { icon: User,     label: "Profile",      path: "/profile"        },
  { icon: BarChart2, label: "Analytics",   path: "/analytics"      },
  { icon: Compass,  label: "Find a tribe", path: "/find-tribe"     },
  { icon: Users,    label: "Your tribes",  path: "/your-tribes"    },
  { icon: Bell,     label: "Notifications", path: "/notifications" },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

interface HamburgerMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function HamburgerMenu({ open, onClose }: HamburgerMenuProps) {
  const navigate  = useNavigate();
  const location  = useLocation();

  function handleNav(path: string) {
    onClose();
    navigate(path);
  }

  return (
    /* Outer container — fills the phone frame, sits on top of everything */
    <div
      className={`absolute inset-0 z-40 transition-all duration-300 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        style={{ background: "rgba(0,0,0,0.45)" }}
        onClick={onClose}
      />

      {/* Drawer — slides in from the right */}
      <div
        className={`absolute top-0 right-0 bottom-0 bg-card flex flex-col shadow-2xl transition-transform duration-300 ease-out`}
        style={{
          width: "82%",
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-14 pb-5 flex-shrink-0">
          <p className="text-foreground font-bold text-[17px]">Menu</p>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors"
          >
            <X size={18} className="text-foreground" />
          </button>
        </div>

        {/* User card */}
        <div className="mx-5 mb-5 p-4 rounded-2xl flex items-center gap-3 flex-shrink-0 border border-primary/20 bg-primary/5">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white text-[15px] font-bold flex-shrink-0"
            style={{ background: "var(--cta-gradient)" }}
          >
            AJ
          </div>
          <div className="min-w-0">
            <p className="text-foreground font-bold text-[15px] leading-tight truncate">Amara Johnson</p>
            <p className="text-muted-foreground text-[12px] truncate mt-0.5">amara@moneytribe.co.za</p>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px bg-border mb-2 flex-shrink-0" />

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-2">
          {MENU_ITEMS.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => handleNav(path)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 transition-colors text-left ${
                  active ? "bg-primary/8" : "hover:bg-muted/60 active:bg-muted"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    active ? "text-white" : "bg-muted text-foreground"
                  }`}
                  style={active ? { background: "var(--cta-gradient)" } : undefined}
                >
                  <Icon size={18} />
                </div>
                <span
                  className={`flex-1 text-[15px] font-medium transition-colors ${
                    active ? "text-primary" : "text-foreground"
                  }`}
                >
                  {label}
                </span>
                <ChevronRight
                  size={16}
                  className={active ? "text-primary" : "text-muted-foreground"}
                />
              </button>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="px-5 py-6 flex-shrink-0 border-t border-border">
          <button
            className="w-full h-12 rounded-xl border border-border flex items-center justify-center gap-2 text-muted-foreground text-[14px] font-medium hover:bg-muted hover:text-foreground transition-all"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
