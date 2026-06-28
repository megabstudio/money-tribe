import { useNavigate, useLocation } from "react-router";
import {
  X, BarChart2, Compass, Users, MessageCircle, ChevronRight, LogOut,
} from "lucide-react";
import { useAuth } from "../../lib/auth";

// ── Mock user display data ─────────────────────────────────────────────────────

const USER = {
  firstName: "Amara",
  lastName:  "Johnson",
  initials:  "AJ",
  email:     "amara@moneytribe.co.za",
};

// ── Menu items ─────────────────────────────────────────────────────────────────

const MENU_ITEMS = [
  { icon: BarChart2,     label: "Analytics",    path: "/analytics"   },
  { icon: MessageCircle, label: "Messages",     path: "/messages"    },
  { icon: Compass,       label: "Find a tribe", path: "/find-tribe"  },
  { icon: Users,         label: "Your tribes",  path: "/your-tribes" },
];

// ── Component ──────────────────────────────────────────────────────────────────

interface HamburgerMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function HamburgerMenu({ open, onClose }: HamburgerMenuProps) {
  const navigate    = useNavigate();
  const location    = useLocation();
  const { signOut } = useAuth();

  function go(path: string) {
    onClose();
    navigate(path);
  }

  async function handleSignOut() {
    onClose();
    await signOut();
    navigate("/");
  }

  return (
    <div
      className={`absolute inset-0 z-40 transition-all duration-300 ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "rgba(0,0,0,0.45)" }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="absolute top-0 right-0 bottom-0 bg-card flex flex-col shadow-2xl transition-transform duration-300 ease-out"
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

        {/* User card — navigates to profile */}
        <button
          onClick={() => go("/profile")}
          className="mx-5 mb-5 p-4 rounded-2xl flex items-center gap-3 flex-shrink-0 border border-border bg-muted/40 hover:bg-muted/70 active:bg-muted transition-colors text-left"
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white text-[15px] font-bold flex-shrink-0"
            style={{ background: "var(--cta-gradient)" }}
          >
            {USER.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-foreground font-bold text-[15px] leading-tight truncate">
              {USER.firstName} {USER.lastName}
            </p>
            <p className="text-muted-foreground text-[12px] truncate mt-0.5">{USER.email}</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
        </button>

        {/* Divider */}
        <div className="mx-5 h-px bg-border mb-2 flex-shrink-0" />

        {/* Nav list */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide py-2">
          {MENU_ITEMS.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => go(path)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 transition-colors text-left ${
                  active ? "bg-muted" : "hover:bg-muted/60 active:bg-muted"
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
                  className={`flex-1 text-[15px] ${
                    active ? "font-semibold text-foreground" : "font-medium text-foreground"
                  }`}
                >
                  {label}
                </span>
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="px-5 py-6 flex-shrink-0 border-t border-border">
          <button
            onClick={handleSignOut}
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
