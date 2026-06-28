"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileKey, CheckCircle, ExternalLink, Clock } from "lucide-react";

interface VerifiedAnnouncement {
  id: string;
  companyName: string;
  documentType: string;
  timestamp: string;
  signatureHash: string;
  verificationStatus: "verified_valid" | "verified_invalid" | "pending" | "expired";
}

const sampleAnnouncements: VerifiedAnnouncement[] = [
  {
    id: "1",
    companyName: "Reliance Industries Ltd",
    documentType: "Quarterly Results Q4 2026",
    timestamp: "2026-06-22 09:15 IST",
    signatureHash: "0x7f8a...c3d2",
    verificationStatus: "verified_valid",
  },
  {
    id: "2",
    companyName: "HDFC Bank",
    documentType: "Board Meeting Minutes",
    timestamp: "2026-06-21 14:30 IST",
    signatureHash: "0x3b2e...a9f4",
    verificationStatus: "verified_valid",
  },
  {
    id: "3",
    companyName: "Tata Consultancy Services",
    documentType: "Dividend Declaration",
    timestamp: "2026-06-21 11:00 IST",
    signatureHash: "0x9c4d...e8b1",
    verificationStatus: "verified_valid",
  },
  {
    id: "4",
    companyName: "Infosys Limited",
    documentType: "IPO Allotment Notice",
    timestamp: "2026-06-20 16:45 IST",
    signatureHash: "0x5f1a...d7c3",
    verificationStatus: "verified_valid",
  },
  {
    id: "5",
    companyName: "ICICI Bank",
    documentType: "Rights Issue Announcement",
    timestamp: "2026-06-20 10:20 IST",
    signatureHash: "0x2e8b...f4a6",
    verificationStatus: "verified_valid",
  },
  {
    id: "6",
    companyName: "Bharti Airtel",
    documentType: "Merger Notification",
    timestamp: "2026-06-19 15:00 IST",
    signatureHash: "0x8a3c...b1d5",
    verificationStatus: "verified_valid",
  },
];

export function VerifiedRegistry() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified_valid":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified Valid
          </Badge>
        );
      case "verified_invalid":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            Invalid
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            Pending
          </Badge>
        );
      case "expired":
        return (
          <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
            Expired
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="bg-slate-900/80 border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <FileKey className="h-5 w-5 text-cyan-400" />
          <CardTitle className="text-lg text-white font-semibold">Cryptographic Registry</CardTitle>
        </div>
        <span className="text-xs text-slate-500">Verified Corporate Announcements</span>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-800 hover:bg-transparent">
              <TableHead className="text-slate-400 font-medium bg-slate-800/50">Company Name</TableHead>
              <TableHead className="text-slate-400 font-medium bg-slate-800/50">Document Type</TableHead>
              <TableHead className="text-slate-400 font-medium bg-slate-800/50">Timestamp</TableHead>
              <TableHead className="text-slate-400 font-medium bg-slate-800/50">Signature Hash</TableHead>
              <TableHead className="text-slate-400 font-medium bg-slate-800/50 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleAnnouncements.map((announcement) => (
              <TableRow
                key={announcement.id}
                className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors cursor-pointer"
              >
                <TableCell className="font-medium text-white">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300">
                      {announcement.companyName.substring(0, 2)}
                    </div>
                    <span>{announcement.companyName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-300">{announcement.documentType}</TableCell>
                <TableCell className="text-slate-400 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{announcement.timestamp}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-400 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span>{announcement.signatureHash}</span>
                    <ExternalLink className="h-3 w-3 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {getStatusBadge(announcement.verificationStatus)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
