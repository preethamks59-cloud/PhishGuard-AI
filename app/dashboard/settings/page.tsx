"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Bell, Shield, Users, Database, Mail, Key, Globe, Server, Cpu, AlertTriangle, CheckCircle, RefreshCw, Save, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface MonitoredEntity {
  id: string;
  name: string;
  type: "company" | "individual" | "domain";
  status: "active" | "inactive";
}

const monitoredEntities: MonitoredEntity[] = [
  { id: "1", name: "Reliance Industries Ltd", type: "company", status: "active" },
  { id: "2", name: "HDFC Bank", type: "company", status: "active" },
  { id: "3", name: "Tata Consultancy Services", type: "company", status: "active" },
  { id: "4", name: "Infosys Limited", type: "company", status: "active" },
  { id: "5", name: "ICICI Bank", type: "company", status: "active" },
  { id: "6", name: "NSE India", type: "domain", status: "active" },
  { id: "7", name: "SEBI Official", type: "domain", status: "active" },
  { id: "8", name: "Mukesh Ambani", type: "individual", status: "active" },
];

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    slack: true,
    sms: false,
    criticalOnly: false,
    digest: true,
  });

  const [scanning, setScanning] = useState({
    frequency: "continuous",
    depth: "comprehensive",
    autoTakedown: true,
    autoWhitelist: false,
  });

  const [platforms, setPlatforms] = useState({
    twitter: true,
    youtube: true,
    telegram: true,
    facebook: true,
    linkedin: true,
    instagram: true,
    whatsapp: true,
    web: true,
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-2xl bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="general" className="data-[state=active]:bg-slate-700 text-slate-300 data-[state=active]:text-white">
            General
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="data-[state=active]:bg-slate-700 text-slate-300 data-[state=active]:text-white">
            Monitoring
          </TabsTrigger>
          <TabsTrigger value="platforms" className="data-[state=active]:bg-slate-700 text-slate-300 data-[state=active]:text-white">
            Platforms
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-slate-700 text-slate-300 data-[state=active]:text-white">
            Alerts
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-slate-700 text-slate-300 data-[state=active]:text-white">
            Security
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="bg-slate-900/80 border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-slate-400" />
                Platform Settings
              </CardTitle>
              <CardDescription className="text-slate-500">
                Configure general platform preferences and behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-300">Organization Name</Label>
                  <Input defaultValue="SEBI Compliance Division" className="bg-slate-800 border-slate-700 text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Admin Email</Label>
                  <Input defaultValue="compliance@sebi.gov.in" className="bg-slate-800 border-slate-700 text-white" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-300">Timezone</Label>
                  <Select defaultValue="ist">
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Server className="h-5 w-5 text-slate-400" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-slate-500">API Gateway</span>
                  </div>
                  <p className="text-lg font-bold text-emerald-400">Operational</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-slate-500">ML Pipeline</span>
                  </div>
                  <p className="text-lg font-bold text-emerald-400">Operational</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-slate-500">Database</span>
                  </div>
                  <p className="text-lg font-bold text-emerald-400">Operational</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-xs text-slate-500">CDN Cache</span>
                  </div>
                  <p className="text-lg font-bold text-amber-400">Degraded</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Cpu className="h-5 w-5 text-slate-400" />
                Resource Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">CPU Usage</span>
                  <span className="text-white font-medium">42%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-[42%] bg-emerald-500 rounded-full" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Memory Usage</span>
                  <span className="text-white font-medium">68%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-[68%] bg-amber-500 rounded-full" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Storage</span>
                  <span className="text-white font-medium">324 GB / 500 GB</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-cyan-500 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monitoring Settings */}
        <TabsContent value="monitoring" className="space-y-6">
          <Card className="bg-slate-900/80 border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-slate-400" />
                Monitored Entities
              </CardTitle>
              <CardDescription className="text-slate-500">
                Companies, individuals, and domains under surveillance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">{monitoredEntities.length} entities monitored</span>
                <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Entity
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                {monitoredEntities.map((entity) => (
                  <div key={entity.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                    <div className="flex-1">
                      <p className="text-sm text-white">{entity.name}</p>
                      <Badge variant="outline" className="text-xs border-slate-600 text-slate-400 mt-1">
                        {entity.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-slate-400" />
                Scanning Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-300">Scan Frequency</Label>
                  <Select value={scanning.frequency} onValueChange={(v) => setScanning({ ...scanning, frequency: v })}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="continuous">Continuous (Real-time)</SelectItem>
                      <SelectItem value="hourly">Every Hour</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Analysis Depth</Label>
                  <Select value={scanning.depth} onValueChange={(v) => setScanning({ ...scanning, depth: v })}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="quick">Quick (Surface Level)</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive (Deep)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator className="bg-slate-700" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Auto-initiate Takedown Requests</p>
                    <p className="text-xs text-slate-500">Automatically request removal for high-confidence threats</p>
                  </div>
                  <Switch checked={scanning.autoTakedown} onCheckedChange={(v) => setScanning({ ...scanning, autoTakedown: v })} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Auto-whitelist False Positives</p>
                    <p className="text-xs text-slate-500">Automatically whitelist verified legitimate content</p>
                  </div>
                  <Switch checked={scanning.autoWhitelist} onCheckedChange={(v) => setScanning({ ...scanning, autoWhitelist: v })} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Platforms Settings */}
        <TabsContent value="platforms" className="space-y-6">
          <Card className="bg-slate-900/80 border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-slate-400" />
                Platform Monitoring
              </CardTitle>
              <CardDescription className="text-slate-500">
                Select which platforms to monitor for threats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(platforms).map(([platform, enabled]) => (
                  <div key={platform} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-slate-700 flex items-center justify-center">
                        <Globe className="h-5 w-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-white capitalize">{platform}</p>
                        <p className="text-xs text-slate-500">{enabled ? "Monitoring active" : "Not monitoring"}</p>
                      </div>
                    </div>
                    <Switch
                      checked={enabled}
                      onCheckedChange={(v) => setPlatforms({ ...platforms, [platform]: v })}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Key className="h-5 w-5 text-slate-400" />
                API Connections
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Twitter API", status: "connected", key: "connected" },
                { name: "YouTube Data API", status: "connected", key: "connected" },
                { name: "Telegram Bot API", status: "connected", key: "connected" },
                { name: "Domain WHOIS API", status: "connected", key: "connected" },
                { name: "SEBI EDIFAR API", status: "error", key: "error" },
              ].map((api) => (
                <div key={api.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${api.status === "connected" ? "bg-emerald-500" : "bg-red-500"}`} />
                    <span className="text-white">{api.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={api.status === "connected" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}>
                      {api.status === "connected" ? "Connected" : "Error"}
                    </Badge>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                      Configure
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Settings */}
        <TabsContent value="alerts" className="space-y-6">
          <Card className="bg-slate-900/80 border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Bell className="h-5 w-5 text-slate-400" />
                Alert Preferences
              </CardTitle>
              <CardDescription className="text-slate-500">
                Configure how and when you receive threat notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Email Notifications</p>
                    <p className="text-xs text-slate-500">Receive alerts via email</p>
                  </div>
                  <Switch checked={notifications.email} onCheckedChange={(v) => setNotifications({ ...notifications, email: v })} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Slack Integration</p>
                    <p className="text-xs text-slate-500">Post alerts to Slack channel</p>
                  </div>
                  <Switch checked={notifications.slack} onCheckedChange={(v) => setNotifications({ ...notifications, slack: v })} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">SMS Alerts</p>
                    <p className="text-xs text-slate-500">Receive critical alerts via SMS</p>
                  </div>
                  <Switch checked={notifications.sms} onCheckedChange={(v) => setNotifications({ ...notifications, sms: v })} />
                </div>
                <Separator className="bg-slate-700" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Critical Alerts Only</p>
                    <p className="text-xs text-slate-500">Only notify for high-severity threats</p>
                  </div>
                  <Switch checked={notifications.criticalOnly} onCheckedChange={(v) => setNotifications({ ...notifications, criticalOnly: v })} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Daily Digest</p>
                    <p className="text-xs text-slate-500">Receive a daily summary of all activity</p>
                  </div>
                  <Switch checked={notifications.digest} onCheckedChange={(v) => setNotifications({ ...notifications, digest: v })} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Mail className="h-5 w-5 text-slate-400" />
                Alert Recipients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {["compliance@sebi.gov.in", "investigations@sebi.gov.in", "chairman@sebi.gov.in"].map((email) => (
                  <Badge key={email} className="bg-slate-700 text-slate-300 border-slate-600">
                    {email}
                    <button className="ml-2 hover:text-red-400">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input placeholder="Add email address" className="bg-slate-800 border-slate-700 text-white" />
                <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-slate-900/80 border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-slate-400" />
                Security Settings
              </CardTitle>
              <CardDescription className="text-slate-500">
                Configure access controls and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Two-Factor Authentication</p>
                    <p className="text-xs text-slate-500">Require 2FA for all admin accounts</p>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Enabled
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">IP Whitelist</p>
                    <p className="text-xs text-slate-500">Restrict dashboard access to specific IPs</p>
                  </div>
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">3 IPs configured</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Session Timeout</p>
                    <p className="text-xs text-slate-500">Automatically log out inactive sessions</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-[120px] bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-slate-400" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">5 active users</span>
                <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  <Plus className="h-4 w-4 mr-1" />
                  Invite User
                </Button>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Admin User", email: "admin@sebi.gov.in", role: "Admin", status: "active" },
                  { name: "Compliance Officer", email: "compliance@sebi.gov.in", role: "Analyst", status: "active" },
                  { name: "Investigator", email: "investigator@sebi.gov.in", role: "Analyst", status: "active" },
                ].map((user) => (
                  <div key={user.email} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                    <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300">
                      {user.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    <Badge className={user.role === "Admin" ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" : "bg-slate-500/20 text-slate-400 border-slate-500/30"}>
                      {user.role}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
          Reset to Defaults
        </Button>
        <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
