"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe, ShieldAlert, ExternalLink, Clock, AlertTriangle, CheckCircle, XCircle, Search, Filter, TrendingUp, TrendingDown, Radio, Ban, Eye, FileText, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { useState } from "react";

interface PhishingThreat {
  id: string;
  type: "lookalike_domain" | "phishing_site" | "phishing_account" | "fraudulent_app";
  target: string;
  platform: string;
  riskScore: number;
  status: "active" | "investigating" | "taken_down" | "whitelisted";
  firstSeen: string;
  lastActivity: string;
  victims: number;
}

const phishingThreats: PhishingThreat[] = [
  { id: "1", type: "lookalike_domain", target: "nse-india-bonus.com", platform: "Web", riskScore: 89, status: "active", firstSeen: "2026-06-23 08:15", lastActivity: "5 min ago", victims: 127 },
  { id: "2", type: "phishing_site", target: "sebi-govt-notification.com", platform: "Web", riskScore: 94, status: "active", firstSeen: "2026-06-22 14:30", lastActivity: "12 min ago", victims: 89 },
  { id: "3", type: "phishing_account", target: "@MukeshAmbani_OfficiaI", platform: "Twitter", riskScore: 85, status: "investigating", firstSeen: "2026-06-22 11:00", lastActivity: "1 hr ago", victims: 234 },
  { id: "4", type: "phishing_site", target: "zerodha-support-login.com", platform: "Web", riskScore: 78, status: "active", firstSeen: "2026-06-21 16:45", lastActivity: "2 hr ago", victims: 56 },
  { id: "5", type: "lookalike_domain", target: "hdfc-bank-verify.net", platform: "Web", riskScore: 82, status: "taken_down", firstSeen: "2026-06-21 10:20", lastActivity: "3 hr ago", victims: 34 },
  { id: "6", type: "phishing_account", target: "Fake_TATA_Group_Support", platform: "Telegram", riskScore: 76, status: "active", firstSeen: "2026-06-20 15:00", lastActivity: "4 hr ago", victims: 145 },
  { id: "7", type: "fraudulent_app", target: "StockTips_Pro_Guaranteed", platform: "Mobile App", riskScore: 91, status: "active", firstSeen: "2026-06-20 09:30", lastActivity: "5 hr ago", victims: 312 },
  { id: "8", type: "lookalike_domain", target: "groww-investments.com", platform: "Web", riskScore: 88, status: "whitelisted", firstSeen: "2026-06-19 14:15", lastActivity: "1 day ago", victims: 0 },
  { id: "9", type: "phishing_site", target: "icici-ipo-apply.in", platform: "Web", riskScore: 73, status: "active", firstSeen: "2026-06-19 11:45", lastActivity: "1 day ago", victims: 67 },
  { id: "10", type: "phishing_account", target: "@InfosysIR_Fake", platform: "Twitter", riskScore: 79, status: "investigating", firstSeen: "2026-06-18 16:30", lastActivity: "2 days ago", victims: 23 },
];

const typeLabels: Record<string, string> = {
  lookalike_domain: "Lookalike Domain",
  phishing_site: "Phishing Site",
  phishing_account: "Phishing Account",
  fraudulent_app: "Fraudulent App",
};

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Twitter: Twitter,
  Telegram: MessageCircle,
  Web: Globe,
  "Mobile App": Globe,
  LinkedIn: Linkedin,
};

function ThreatRow({ threat }: { threat: PhishingThreat }) {
  const IconComponent = platformIcons[threat.platform] || Globe;

  const statusBadge = () => {
    switch (threat.status) {
      case "active":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Active</Badge>;
      case "investigating":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Investigating</Badge>;
      case "taken_down":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Taken Down</Badge>;
      case "whitelisted":
        return <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">Whitelisted</Badge>;
      default:
        return null;
    }
  };

  const riskColor = threat.riskScore >= 80 ? "text-red-400" : threat.riskScore >= 60 ? "text-amber-400" : "text-emerald-400";

  return (
    <TableRow className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
      <TableCell>
        <div className="flex items-center gap-2">
          <IconComponent className="h-4 w-4 text-slate-400" />
          <span>{threat.platform}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
          {typeLabels[threat.type]}
        </Badge>
      </TableCell>
      <TableCell className="font-mono text-sm text-white max-w-xs truncate">
        {threat.target}
      </TableCell>
      <TableCell>
        <span className={`font-bold ${riskColor}`}>{threat.riskScore}%</span>
      </TableCell>
      <TableCell>{statusBadge()}</TableCell>
      <TableCell className="text-slate-400 text-sm">{threat.firstSeen}</TableCell>
      <TableCell className="text-slate-400 text-sm">{threat.lastActivity}</TableCell>
      <TableCell>
        <span className={`font-medium ${threat.victims > 100 ? "text-red-400" : threat.victims > 50 ? "text-amber-400" : "text-slate-300"}`}>
          {threat.victims}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default function PhishingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredThreats = phishingThreats.filter((threat) => {
    const matchesSearch = threat.target.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || threat.status === statusFilter;
    const matchesType = typeFilter === "all" || threat.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    totalActive: phishingThreats.filter(t => t.status === "active").length,
    totalVictims: phishingThreats.reduce((sum, t) => sum + t.victims, 0),
    highRisk: phishingThreats.filter(t => t.riskScore >= 80).length,
    takenDown: phishingThreats.filter(t => t.status === "taken_down").length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/80 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase">Active Threats</p>
                <p className="text-2xl font-bold text-red-400">{stats.totalActive}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-red-500/10">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/80 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase">Total Victims</p>
                <p className="text-2xl font-bold text-white">{stats.totalVictims}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800">
                <TrendingUp className="h-5 w-5 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/80 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase">High Risk</p>
                <p className="text-2xl font-bold text-amber-400">{stats.highRisk}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-500/10">
                <Radio className="h-5 w-5 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/80 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase">Taken Down</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.takenDown}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-500/10">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-slate-900/80 border-slate-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-400" />
            Threat Database
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search domains, accounts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px] bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="taken_down">Taken Down</SelectItem>
                <SelectItem value="whitelisted">Whitelisted</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="lookalike_domain">Lookalike Domain</SelectItem>
                <SelectItem value="phishing_site">Phishing Site</SelectItem>
                <SelectItem value="phishing_account">Phishing Account</SelectItem>
                <SelectItem value="fraudulent_app">Fraudulent App</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-slate-800 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-800 hover:bg-transparent bg-slate-800/50">
                  <TableHead className="text-slate-400 font-medium">Platform</TableHead>
                  <TableHead className="text-slate-400 font-medium">Type</TableHead>
                  <TableHead className="text-slate-400 font-medium">Target</TableHead>
                  <TableHead className="text-slate-400 font-medium">Risk</TableHead>
                  <TableHead className="text-slate-400 font-medium">Status</TableHead>
                  <TableHead className="text-slate-400 font-medium">First Seen</TableHead>
                  <TableHead className="text-slate-400 font-medium">Last Activity</TableHead>
                  <TableHead className="text-slate-400 font-medium">Victims</TableHead>
                  <TableHead className="text-slate-400 font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredThreats.map((threat) => (
                  <ThreatRow key={threat.id} threat={threat} />
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-900/80 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-red-500/10">
                <Ban className="h-6 w-6 text-red-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Initiate Takedown</p>
                <p className="text-xs text-slate-500">Request removal from host/registrar</p>
              </div>
              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                Select
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/80 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-amber-500/10">
                <FileText className="h-6 w-6 text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Generate Report</p>
                <p className="text-xs text-slate-500">Create SEBI compliance report</p>
              </div>
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                Generate
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/80 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-emerald-500/10">
                <CheckCircle className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Bulk Whitelist</p>
                <p className="text-xs text-slate-500">Mark selected as false positives</p>
              </div>
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                Select
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
