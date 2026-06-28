"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Twitter, Youtube, MessageCircle, Globe, Linkedin, AlertCircle, Shield, XCircle, Clock, LucideIcon } from "lucide-react";

interface Threat {
  id: string;
  platform: "Twitter" | "YouTube" | "Telegram" | "Web" | "WhatsApp" | "LinkedIn";
  targetEntity: string;
  threatType: "deepfake_audio" | "deepfake_video" | "lookalike_domain" | "phishing_site" | "phishing_account";
  riskScore: number;
  status: "active" | "investigating" | "resolved" | "whitelisted";
  timestamp: string;
}

const platformIcons: Record<string, LucideIcon> = {
  Twitter: Twitter,
  YouTube: Youtube,
  Telegram: MessageCircle,
  Web: Globe,
  WhatsApp: MessageCircle,
  LinkedIn: Linkedin,
};

const threatTypeLabels: Record<string, string> = {
  deepfake_audio: "Deepfake Audio",
  deepfake_video: "Deepfake Video",
  lookalike_domain: "Lookalike Domain",
  phishing_site: "Phishing Site",
  phishing_account: "Phishing Account",
};

function ThreatCard({ threat }: { threat: Threat }) {
  const IconComponent = platformIcons[threat.platform] || Globe;

  const getRiskColor = (score: number) => {
    if (score >= 90) return "bg-red-500";
    if (score >= 70) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Active</Badge>;
      case "investigating":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Investigating</Badge>;
      case "resolved":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Resolved</Badge>;
      case "whitelisted":
        return <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">Whitelisted</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="group p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 transition-all duration-200">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-slate-300">
          <IconComponent className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
              {threatTypeLabels[threat.threatType]}
            </Badge>
            {getStatusBadge(threat.status)}
            <span className="text-xs text-slate-500 ml-auto flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {threat.timestamp}
            </span>
          </div>
          <p className="text-sm text-white font-medium truncate mb-3">
            {threat.targetEntity}
          </p>
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400">Threat Score</span>
              <span className={`font-semibold ${threat.riskScore >= 90 ? "text-red-400" : threat.riskScore >= 70 ? "text-amber-400" : "text-emerald-400"}`}>
                {threat.riskScore}% Risk
              </span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getRiskColor(threat.riskScore)}`}
                style={{ width: `${threat.riskScore}%` }}
              />
            </div>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Shield className="h-3 w-3 mr-1" />
              Initiate Takedown
            </Button>
            <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <XCircle className="h-3 w-3 mr-1" />
              Whitelist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const sampleThreats: Threat[] = [
  {
    id: "1",
    platform: "Twitter",
    targetEntity: "Reliance Industries CEO deepfake audio claiming stock split",
    threatType: "deepfake_audio",
    riskScore: 94,
    status: "active",
    timestamp: "2 min ago",
  },
  {
    id: "2",
    platform: "Web",
    targetEntity: "Lookalike domain: nse-india-bonus.com",
    threatType: "lookalike_domain",
    riskScore: 89,
    status: "active",
    timestamp: "8 min ago",
  },
  {
    id: "3",
    platform: "Web",
    targetEntity: "Fake SEBI announcement on new IPO regulations",
    threatType: "phishing_site",
    riskScore: 78,
    status: "investigating",
    timestamp: "15 min ago",
  },
  {
    id: "4",
    platform: "Twitter",
    targetEntity: "Impersonator account: @MukeshAmbani_OfficiaI",
    threatType: "phishing_account",
    riskScore: 85,
    status: "active",
    timestamp: "23 min ago",
  },
  {
    id: "5",
    platform: "YouTube",
    targetEntity: "Deepfake video of HDFC Bank CFO announcing merger",
    threatType: "deepfake_video",
    riskScore: 96,
    status: "active",
    timestamp: "45 min ago",
  },
  {
    id: "6",
    platform: "WhatsApp",
    targetEntity: "Fraudulent WhatsApp group offering guaranteed returns",
    threatType: "phishing_site",
    riskScore: 72,
    status: "active",
    timestamp: "1 hr ago",
  },
  {
    id: "7",
    platform: "Telegram",
    targetEntity: "Fake Telegram channel posing as Zerodha support",
    threatType: "phishing_account",
    riskScore: 81,
    status: "active",
    timestamp: "1.5 hr ago",
  },
  {
    id: "8",
    platform: "Web",
    targetEntity: "Lookalike domain: Groww-investments.com",
    threatType: "lookalike_domain",
    riskScore: 88,
    status: "whitelisted",
    timestamp: "2 hr ago",
  },
];

export function ThreatFeed() {
  return (
    <Card className="bg-slate-900/80 border-slate-800 h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <CardTitle className="text-lg text-white font-semibold">Real-time Threat Feed</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs text-slate-400">Live</span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2">
          {sampleThreats.map((threat) => (
            <ThreatCard key={threat.id} threat={threat} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
