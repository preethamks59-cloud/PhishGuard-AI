"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Activity, AlertTriangle, CheckCircle, XCircle, Upload, Play, Pause, RotateCcw, ZoomIn, ZoomOut, Volume2, VolumeX, SkipBack, SkipForward, Eye, Brain, Scan, AlertOctagon, Clock } from "lucide-react";
import { useState } from "react";

interface AnalysisResult {
  id: string;
  name: string;
  type: "video" | "audio";
  status: "analyzing" | "completed" | "queued";
  fakeProbability: number;
  timestamp: string;
  duration: string;
}

const analysisResults: AnalysisResult[] = [
  { id: "1", name: "HDFC_CFO_Merger_Announcement.mp4", type: "video", status: "completed", fakeProbability: 96, timestamp: "2026-06-23 09:15", duration: "04:56" },
  { id: "2", name: "Reliance_CEO_Stock_Split.mp3", type: "audio", status: "completed", fakeProbability: 94, timestamp: "2026-06-23 08:42", duration: "02:23" },
  { id: "3", name: "TCS_Board_Member_Interview.mp4", type: "video", status: "completed", fakeProbability: 23, timestamp: "2026-06-22 16:30", duration: "12:45" },
  { id: "4", name: "Infosys_FA_Latest_Announcement.mp4", type: "video", status: "analyzing", fakeProbability: 0, timestamp: "2026-06-23 10:05", duration: "03:22" },
  { id: "5", name: "ICICI_Bank_CEO_Message.mp3", type: "audio", status: "queued", fakeProbability: 0, timestamp: "2026-06-23 10:00", duration: "01:45" },
];

const biomarkers: Array<{
  label: string;
  value: string;
  status: "passed" | "failed" | "warning";
  score: number;
  description: string;
}> = [
  { label: "rPPG Blood Flow Analysis", value: "Failed", status: "failed", score: 78, description: "Inconsistent pulse patterns detected across facial regions" },
  { label: "Eye-Blink Rate Anomaly", value: "88% Fake", status: "failed", score: 88, description: "Unnatural blink frequency: 3/min (expected 15-20)" },
  { label: "Spectral Audio Artifacts", value: "High", status: "failed", score: 82, description: "Synthetic voice artifacts and pitch inconsistencies" },
  { label: "Facial Landmark Stability", value: "Warning", status: "warning", score: 45, description: "Minor temporal tracking inconsistencies" },
  { label: "Lip Sync Correlation", value: "Failed", status: "failed", score: 92, description: "Audio-visual misalignment in 34% of frames" },
  { label: "Head Pose Consistency", value: "Warning", status: "warning", score: 38, description: "Subtle unnatural head movements detected" },
  { label: "Skin Texture Analysis", value: "Failed", status: "failed", score: 76, description: "Artificial smoothing artifacts present" },
  { label: "Lighting Consistency", value: "Passed", status: "passed", score: 85, description: "Environmental lighting matches scene" },
];

function BiomarkerCard({ biomarker }: { biomarker: typeof biomarkers[0] }) {
  const statusStyles: Record<"passed" | "failed" | "warning", { bg: string; border: string; text: string; icon: React.ComponentType<{ className?: string }> }> = {
    passed: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", icon: CheckCircle },
    failed: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", icon: XCircle },
    warning: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", icon: AlertTriangle },
  };
  const style = statusStyles[biomarker.status];
  const Icon = style.icon;

  return (
    <div className={`p-3 rounded-lg ${style.bg} border ${style.border}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-300 truncate pr-2">{biomarker.label}</span>
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${style.bg} ${style.text} text-xs font-medium whitespace-nowrap`}>
          <Icon className="h-3.5 w-3.5" />
          {biomarker.value}
        </div>
      </div>
      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${biomarker.status === "passed" ? "bg-emerald-500" : biomarker.status === "failed" ? "bg-red-500" : "bg-amber-500"}`}
          style={{ width: `${biomarker.score}%` }}
        />
      </div>
      <p className="text-xs text-slate-500 mt-2">{biomarker.description}</p>
    </div>
  );
}

function AnalysisHistoryItem({ result }: { result: AnalysisResult }) {
  const statusColors = {
    completed: result.fakeProbability >= 70 ? "text-red-400" : result.fakeProbability >= 40 ? "text-amber-400" : "text-emerald-400",
    analyzing: "text-cyan-400",
    queued: "text-slate-400",
  };

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors cursor-pointer">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
        {result.type === "video" ? <Video className="h-5 w-5 text-slate-400" /> : <Volume2 className="h-5 w-5 text-slate-400" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white truncate">{result.name}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-slate-500">{result.duration}</span>
          <span className="text-xs text-slate-500">{result.timestamp}</span>
        </div>
      </div>
      <div className="flex-shrink-0">
        {result.status === "completed" && (
          <div className={`text-right ${statusColors.completed}`}>
            <p className="text-lg font-bold">{result.fakeProbability}%</p>
            <p className="text-xs">{result.fakeProbability >= 70 ? "Deepfake" : result.fakeProbability >= 40 ? "Suspicious" : "Authentic"}</p>
          </div>
        )}
        {result.status === "analyzing" && (
          <div className="flex items-center gap-2 text-cyan-400">
            <Activity className="h-4 w-4 animate-pulse" />
            <span className="text-xs">Analyzing...</span>
          </div>
        )}
        {result.status === "queued" && (
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="h-4 w-4" />
            <span className="text-xs">Queued</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DeepfakePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="bg-slate-900/80 border-slate-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <Upload className="h-5 w-5 text-cyan-400" />
            Upload Media for Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-cyan-500/50 transition-colors cursor-pointer">
            <Upload className="h-12 w-12 text-slate-500 mx-auto mb-4" />
            <p className="text-sm text-slate-300 mb-2">Drag and drop video or audio files here</p>
            <p className="text-xs text-slate-500 mb-4">Supports MP4, AVI, MOV, MP3, WAV (Max 500MB)</p>
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
              <Upload className="h-4 w-4 mr-2" />
              Browse Files
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player & Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <Card className="bg-slate-900/80 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-800">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Video className="h-5 w-5 text-amber-400" />
                Video Analysis: HDFC_CFO_Merger_Announcement.mp4
              </CardTitle>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                <AlertOctagon className="h-3 w-3 mr-1" />
                96% Deepfake
              </Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="relative aspect-video bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-slate-700/80 flex items-center justify-center mb-4 mx-auto">
                      <Video className="h-10 w-10 text-slate-500" />
                    </div>
                    <p className="text-sm text-slate-400">HDFC Bank CFO Merger Announcement</p>
                    <p className="text-xs text-slate-600 mt-1">Flagged Content</p>
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-red-600 text-white animate-pulse">96% FAKE</Badge>
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <Badge className="bg-amber-500/80 text-white">Frame Analysis Active</Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/95 to-transparent p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-1 flex-1 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-amber-500 rounded-full" />
                    </div>
                    <span className="text-xs text-slate-400 font-mono">01:23 / 04:56</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-md hover:bg-slate-700 transition-colors text-slate-300">
                        <SkipBack className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-3 rounded-full bg-cyan-600 hover:bg-cyan-700 transition-colors text-white"
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </button>
                      <button className="p-2 rounded-md hover:bg-slate-700 transition-colors text-slate-300">
                        <SkipForward className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-md hover:bg-slate-700 transition-colors text-slate-300">
                        <RotateCcw className="h-4 w-4" />
                      </button>
                      <button className="p-2 rounded-md hover:bg-slate-700 transition-colors text-slate-300">
                        <ZoomIn className="h-4 w-4" />
                      </button>
                      <button className="p-2 rounded-md hover:bg-slate-700 transition-colors text-slate-300">
                        <ZoomOut className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 rounded-md hover:bg-slate-700 transition-colors text-slate-300"
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-center">
                  <Eye className="h-5 w-5 text-cyan-400 mx-auto mb-1" />
                  <p className="text-xs text-slate-400">Visual Artifacts</p>
                  <p className="text-lg font-bold text-red-400">12</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-center">
                  <Volume2 className="h-5 w-5 text-cyan-400 mx-auto mb-1" />
                  <p className="text-xs text-slate-400">Audio Anomalies</p>
                  <p className="text-lg font-bold text-red-400">8</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-center">
                  <Brain className="h-5 w-5 text-cyan-400 mx-auto mb-1" />
                  <p className="text-xs text-slate-400">AI Confidence</p>
                  <p className="text-lg font-bold text-amber-400">96%</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-center">
                  <Scan className="h-5 w-5 text-cyan-400 mx-auto mb-1" />
                  <p className="text-xs text-slate-400">Frames Analyzed</p>
                  <p className="text-lg font-bold text-emerald-400">8,450</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Biomarker Analysis */}
          <Card className="bg-slate-900/80 border-slate-800">
            <CardHeader className="pb-4 border-b border-slate-800">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-cyan-400" />
                Biological & Forensic Markers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {biomarkers.map((bm, i) => (
                  <BiomarkerCard key={i} biomarker={bm} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis History Sidebar */}
        <div className="space-y-6">
          <Card className="bg-slate-900/80 border-slate-800">
            <CardHeader className="pb-4 border-b border-slate-800">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-slate-400" />
                Recent Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {analysisResults.map((result) => (
                  <AnalysisHistoryItem key={result.id} result={result} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Verdict Panel */}
          <Card className="bg-red-500/10 border-red-500/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-8 w-8 text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-red-400">Deepfake Verdict: HIGH CONFIDENCE</p>
                  <p className="text-xs text-red-300/80 mt-1">
                    This media has been flagged as synthetic with 96% confidence based on 12 forensic indicators.
                    Multiple biological marker failures including rPPG analysis, lip sync correlation, and eye-blink anomalies.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button className="bg-red-600 hover:bg-red-700 text-white text-xs">
                      Report to SEBI
                    </Button>
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 text-xs">
                      Request Review
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
