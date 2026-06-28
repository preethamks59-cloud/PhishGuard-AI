"use client";

import { StatsCards } from "@/components/dashboard/stats-cards";
import { ThreatFeed } from "@/components/dashboard/threat-feed";
import { DeepfakeAnalysisPanel } from "@/components/dashboard/deepfake-analysis";
import { VerifiedRegistry } from "@/components/dashboard/verified-registry";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* KPI Stats Row */}
      <StatsCards />

      {/* Main Content - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Threat Feed */}
        <ThreatFeed />

        {/* Right Column - Deepfake Analysis */}
        <DeepfakeAnalysisPanel />
      </div>

      {/* Bottom Section - Verified Registry */}
      <VerifiedRegistry />
    </div>
  );
}
