"use client";

import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, { title: string; description: string }> = {
  "/dashboard": { title: "Dashboard Overview", description: "SEBI Regulatory Compliance Dashboard" },
  "/dashboard/deepfake": { title: "Deepfake Auditing", description: "AI-Powered Synthetic Media Detection" },
  "/dashboard/phishing": { title: "Phishing & Fraud Tracker", description: "Real-time Threat Intelligence" },
  "/dashboard/registry": { title: "Cryptographic Registry", description: "Verified Corporate Announcements" },
  "/dashboard/settings": { title: "System Configuration", description: "Platform Settings & Preferences" },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pageInfo = pageTitles[pathname] || pageTitles["/dashboard"];

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <SidebarNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm flex items-center justify-between px-6">
          <div>
            <h1 className="text-lg font-semibold text-white">{pageInfo.title}</h1>
            <p className="text-xs text-slate-500">{pageInfo.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-slate-300">Live Monitoring</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-300 font-medium">June 23, 2026</p>
              <p className="text-xs text-slate-500">Last updated: Just now</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
}
