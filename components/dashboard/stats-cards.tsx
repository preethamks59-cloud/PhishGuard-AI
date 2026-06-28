"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Radio, AlertTriangle, Globe, ShieldCheck, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  badge?: {
    text: string;
    variant: "success" | "warning" | "critical";
  };
  icon: React.ReactNode;
  progress?: number;
}

function StatCard({ title, value, subtitle, trend, badge, icon, progress }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden bg-slate-900/80 border-slate-800 hover:border-slate-700 transition-colors">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-white">{value}</h3>
              {subtitle && <span className="text-sm text-slate-500">{subtitle}</span>}
              {badge && (
                <Badge
                  variant={badge.variant === "success" ? "default" : badge.variant === "warning" ? "secondary" : "destructive"}
                  className={badge.variant === "success" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                             badge.variant === "warning" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                             "bg-red-500/20 text-red-400 border-red-500/30"}
                >
                  {badge.text}
                </Badge>
              )}
            </div>
            {trend && (
              <div className={`flex items-center gap-1 text-xs ${trend.positive ? "text-emerald-400" : "text-red-400"}`}>
                {trend.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{trend.value}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            {progress !== undefined && (
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle cx="24" cy="24" r="20" className="stroke-slate-800" strokeWidth="4" fill="none" />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    className={progress >= 99 ? "stroke-emerald-400" : progress >= 90 ? "stroke-amber-400" : "stroke-red-400"}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${progress * 1.256} 125.6`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                  {progress}%
                </span>
              </div>
            )}
            <div className="p-2.5 rounded-lg bg-slate-800 text-slate-400">
              {icon}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  const stats: StatCardProps[] = [
    {
      title: "Total Channels Monitored",
      value: "14,205",
      trend: { value: "+5% this week", positive: true },
      icon: <Radio className="h-5 w-5" />,
    },
    {
      title: "Active Deepfake Alerts",
      value: "3",
      badge: { text: "Critical", variant: "critical" },
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      title: "Phishing Sites Flagged",
      value: "42",
      subtitle: "This Week",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      title: "Verification Trust Index",
      value: "99.4%",
      progress: 99,
      icon: <ShieldCheck className="h-5 w-5" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
