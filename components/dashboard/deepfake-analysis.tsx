"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, Activity, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface AnalysisMetric {
  label: string;
  value: string;
  status: "passed" | "failed" | "warning";
  score?: number;
  description: string;
}

function AnalysisCard({ metric }: { metric: AnalysisMetric }) {
  const statusColors = {
    passed: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30" },
    failed: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30" },
    warning: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30" },
  };

  const statusIcons = {
    passed: <CheckCircle className="h-4 w-4" />,
    failed: <XCircle className="h-4 w-4" />,
    warning: <AlertTriangle className="h-4 w-4" />,
  };

  const colors = statusColors[metric.status];
  const IconComponent = statusIcons[metric.status];

  return (
    <div className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-300">{metric.label}</span>
        <Badge className={`${colors.bg} ${colors.text} ${colors.border}`}>
          {IconComponent}
          <span className="ml-1">{metric.value}</span>
        </Badge>
      </div>
      {metric.score !== undefined && (
        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              metric.status === "failed" ? "bg-red-500" :
              metric.status === "warning" ? "bg-amber-500" : "bg-emerald-500"
            }`}
            style={{ width: `${metric.score}%` }}
          />
        </div>
      )}
      <p className="text-xs text-slate-500 mt-2">{metric.description}</p>
    </div>
  );
}

export function DeepfakeAnalysisPanel() {
  const metrics: AnalysisMetric[] = [
    {
      label: "rPPG Blood Flow Analysis",
      value: "Failed",
      status: "failed",
      score: 78,
      description: "Remote photoplethysmography shows inconsistent pulse patterns across facial regions.",
    },
    {
      label: "Eye-Blink Rate Anomaly",
      value: "88% Fake",
      status: "failed",
      score: 88,
      description: "Unnatural blink frequency detected. Expected: 15-20 per minute. Detected: 3 per minute.",
    },
    {
      label: "Spectral Audio Artifacts",
      value: "High",
      status: "failed",
      score: 82,
      description: "Audio spectrum analysis reveals synthetic voice artifacts and pitch inconsistencies.",
    },
    {
      label: "Facial Landmark Stability",
      value: "Warning",
      status: "warning",
      score: 45,
      description: "Minor inconsistencies detected in temporal landmark tracking across frames.",
    },
    {
      label: "Lip Sync Correlation",
      value: "Failed",
      status: "failed",
      score: 92,
      description: "Audio-visual synchronization misalignment detected in 34% of frames.",
    },
  ];

  return (
    <Card className="bg-slate-900/80 border-slate-800 h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Video className="h-5 w-5 text-amber-400" />
          <CardTitle className="text-lg text-white font-semibold">Deepfake Video Forensics</CardTitle>
        </div>
        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Critical Threat
        </Badge>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="relative aspect-video bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center mb-3 mx-auto">
                <Video className="h-8 w-8 text-slate-500" />
              </div>
              <p className="text-sm text-slate-400">Flagged Video Analysis</p>
              <p className="text-xs text-slate-600 mt-1">HDFC Bank CFO Deepfake</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-3">
            <div className="flex items-center gap-3">
              <div className="h-1 flex-1 bg-slate-700 rounded-full">
                <div className="h-full w-1/3 bg-amber-500 rounded-full" />
              </div>
              <span className="text-xs text-slate-400">01:23 / 04:56</span>
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <Badge className="bg-red-500 text-white">
              <AlertTriangle className="h-3 w-3 mr-1" />
              96% Fake
            </Badge>
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan-400" />
            Biological Marker Analysis
          </h4>
          {metrics.map((metric, index) => (
            <AnalysisCard key={index} metric={metric} />
          ))}
        </div>
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-400 animate-pulse" />
            <div>
              <p className="text-sm font-medium text-red-400">High Confidence Deepfake Detected</p>
              <p className="text-xs text-red-300/70 mt-1">
                Multiple forensic indicators confirm synthetic media. Recommend immediate content removal.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
