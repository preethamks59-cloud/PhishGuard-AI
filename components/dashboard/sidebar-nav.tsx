"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Video,
  ShieldAlert,
  FileKey,
  Settings,
  Shield
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Deepfake Auditing", href: "/dashboard/deepfake", icon: Video },
  { name: "Phishing & Fraud Tracker", href: "/dashboard/phishing", icon: ShieldAlert },
  { name: "Cryptographic Registry", href: "/dashboard/registry", icon: FileKey },
  { name: "System Configuration", href: "/dashboard/settings", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-slate-950 border-r border-slate-800">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 shadow-lg shadow-emerald-500/20">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">PhishGuard AI</h1>
          <p className="text-xs text-slate-500">SEBI Compliance Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-slate-800 text-white shadow-inner"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-colors",
                isActive ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"
              )} />
              <span>{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-800">
        <div className="flex items-center gap-2 px-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-slate-500">All systems operational</span>
        </div>
        <p className="px-2 mt-2 text-xs text-slate-600">v2.4.1 • SEBI Regulated</p>
      </div>
    </div>
  );
}
