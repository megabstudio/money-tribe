import { useNavigate } from "react-router";
import {
  ArrowLeft, User, Phone, Mail, MapPin, Wallet, CreditCard,
  Shield, CheckCircle, Clock, AlertCircle,
} from "lucide-react";
import MobileStatusBar from "./MobileStatusBar";

// ── Types ──────────────────────────────────────────────────────────────────────

type KycStatus = "verified" | "pending" | "not_submitted";

// ── Mock data ──────────────────────────────────────────────────────────────────

const USER = {
  firstName:  "Amara",
  lastName:   "Johnson",
  initials:   "AJ",
  email:      "amara@moneytribe.co.za",
  phone:      "+1 829-555-0142",
  salary:     "RD$ 85,000 / month",
  personalId: "001-1234567-8",
  address:    "Av. Winston Churchill 1099, Piantini, Santo Domingo",
  kyc:        "verified" as KycStatus,
};

// ── Config ─────────────────────────────────────────────────────────────────────

const KYC_CONFIG: Record<KycStatus, { label: string; desc: string; Icon: React.ElementType; cls: string }> = {
  verified:      { label: "Verified",      desc: "Identity confirmed",   Icon: CheckCircle,  cls: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  pending:       { label: "Under review",  desc: "Verification pending", Icon: Clock,        cls: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20"         },
  not_submitted: { label: "Not submitted", desc: "Action required",      Icon: AlertCircle,  cls: "text-muted-foreground bg-muted border-border"                                   },
};

// ── Sub-components ─────────────────────────────────────────────────────────────

function FieldRow({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) {
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-border last:border-0">
      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={14} className="text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-0.5">
          {label}
        </p>
        <p className="text-foreground text-[14px] font-medium leading-snug">{value}</p>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-1 px-1 mt-5 first:mt-0">
      {children}
    </p>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function Profile() {
  const navigate = useNavigate();
  const kyc = KYC_CONFIG[USER.kyc];
  const KycIcon = kyc.Icon;

  return (
    <div className="h-screen overflow-hidden bg-background flex items-start justify-center md:items-center md:py-8">
      <div
        className="relative w-full max-w-[390px] bg-background flex flex-col md:rounded-[44px] md:shadow-2xl md:border md:border-border"
        style={{ height: "100svh" }}
      >
        <MobileStatusBar />

        {/* Header */}
        <div className="flex-shrink-0 flex items-center gap-3 px-4 py-4 bg-background border-b border-border">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center text-foreground hover:text-foreground/70 transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="font-bold text-foreground text-base flex-1">Profile</h1>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-10">

          {/* Avatar hero */}
          <div className="flex flex-col items-center pt-6 pb-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-white text-[26px] font-extrabold mb-3 shadow-lg"
              style={{ background: "var(--cta-gradient)" }}
            >
              {USER.initials}
            </div>
            <p className="font-bold text-foreground text-[20px] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              {USER.firstName} {USER.lastName}
            </p>
            <p className="text-muted-foreground text-[13px] mt-0.5">{USER.email}</p>
          </div>

          {/* Personal */}
          <SectionLabel>Personal</SectionLabel>
          <div className="bg-card border border-border rounded-2xl px-4">
            <FieldRow label="First name"  value={USER.firstName}  icon={User}       />
            <FieldRow label="Last name"   value={USER.lastName}   icon={User}       />
            <FieldRow label="Personal ID" value={USER.personalId} icon={CreditCard} />
          </div>

          {/* Contact */}
          <SectionLabel>Contact</SectionLabel>
          <div className="bg-card border border-border rounded-2xl px-4">
            <FieldRow label="Email address" value={USER.email}   icon={Mail}   />
            <FieldRow label="Phone number"  value={USER.phone}   icon={Phone}  />
            <FieldRow label="Address"       value={USER.address} icon={MapPin} />
          </div>

          {/* Financial */}
          <SectionLabel>Financial</SectionLabel>
          <div className="bg-card border border-border rounded-2xl px-4">
            <FieldRow label="Monthly salary" value={USER.salary} icon={Wallet} />
          </div>

          {/* KYC */}
          <SectionLabel>Verification</SectionLabel>
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Shield size={14} className="text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-2">
                  KYC status
                </p>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold border ${kyc.cls}`}>
                    <KycIcon size={12} />
                    {kyc.label}
                  </span>
                  <span className="text-[12px] text-muted-foreground">{kyc.desc}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
