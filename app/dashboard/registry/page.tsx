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
import { FileKey, CheckCircle, XCircle, Clock, ExternalLink, Search, Filter, Shield, Upload, Download, AlertCircle, Link2, Copy, Eye, FileText, Lock, Unlock, RefreshCw } from "lucide-react";
import { useState } from "react";

interface VerifiedDocument {
  id: string;
  companyName: string;
  documentType: string;
  timestamp: string;
  signatureHash: string;
  verificationStatus: "verified_valid" | "verified_invalid" | "pending" | "expired";
  blockchainTxId: string;
  fileSize: string;
  category: "financial_results" | "board_minutes" | "regulatory" | "announcement" | "agm_notice";
}

const verifiedDocuments: VerifiedDocument[] = [
  { id: "1", companyName: "Reliance Industries Ltd", documentType: "Quarterly Results Q4 2026", timestamp: "2026-06-23 09:15", signatureHash: "0x7f8a2d...c3d291", verificationStatus: "verified_valid", blockchainTxId: "0x1a2b3c...9d8e", fileSize: "2.4 MB", category: "financial_results" },
  { id: "2", companyName: "HDFC Bank", documentType: "Board Meeting Minutes", timestamp: "2026-06-22 14:30", signatureHash: "0x3b2e71...a9f452", verificationStatus: "verified_valid", blockchainTxId: "0x4d5e6f...a1b2", fileSize: "856 KB", category: "board_minutes" },
  { id: "3", companyName: "Tata Consultancy Services", documentType: "Dividend Declaration", timestamp: "2026-06-22 11:00", signatureHash: "0x9c4d28...e8b176", verificationStatus: "verified_valid", blockchainTxId: "0x7g8h9i...c3d4", fileSize: "320 KB", category: "announcement" },
  { id: "4", companyName: "Infosys Limited", documentType: "IPO Allotment Notice", timestamp: "2026-06-21 16:45", signatureHash: "0x5f1a93...d7c382", verificationStatus: "verified_valid", blockchainTxId: "0x0j1k2l...e5f6", fileSize: "1.1 MB", category: "regulatory" },
  { id: "5", companyName: "ICICI Bank", documentType: "Rights Issue Announcement", timestamp: "2026-06-21 10:20", signatureHash: "0x2e8b47...f4a691", verificationStatus: "verified_valid", blockchainTxId: "0x3m4n5o...g7h8", fileSize: "567 KB", category: "announcement" },
  { id: "6", companyName: "Bharti Airtel", documentType: "AGM Notice 2026", timestamp: "2026-06-20 15:00", signatureHash: "0x8a3c61...b1d579", verificationStatus: "expired", blockchainTxId: "0x6p7q8r...i9j0", fileSize: "2.1 MB", category: "agm_notice" },
  { id: "7", companyName: "Wipro Limited", documentType: "Quarterly Results Q3 2026", timestamp: "2026-06-20 09:30", signatureHash: "0x1d5e82...f9c403", verificationStatus: "pending", blockchainTxId: "", fileSize: "1.8 MB", category: "financial_results" },
  { id: "8", companyName: "Axis Bank", documentType: "Director Appointment Letter", timestamp: "2026-06-19 14:00", signatureHash: "0x6f2a94...e8d172", verificationStatus: "verified_invalid", blockchainTxId: "0x2k3l4m...n5o6", fileSize: "245 KB", category: "board_minutes" },
  { id: "9", companyName: "Kotak Mahindra Bank", documentType: "Risk Assessment Report", timestamp: "2026-06-19 11:30", signatureHash: "0x4c7b35...a2f819", verificationStatus: "verified_valid", blockchainTxId: "0x7p8q9r...s1t2", fileSize: "3.2 MB", category: "regulatory" },
  { id: "10", companyName: "Maruti Suzuki", documentType: "Production Update Q2", timestamp: "2026-06-18 16:00", signatureHash: "0x9e3d26...b7c415", verificationStatus: "verified_valid", blockchainTxId: "0x0u1v2w...x3y4", fileSize: "678 KB", category: "announcement" },
];

const categoryLabels: Record<string, string> = {
  financial_results: "Financial Results",
  board_minutes: "Board Minutes",
  regulatory: "Regulatory Filing",
  announcement: "Corporate Announcement",
  agm_notice: "AGM Notice",
};

function DocumentRow({ doc }: { doc: VerifiedDocument }) {
  const statusBadge = () => {
    switch (doc.verificationStatus) {
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
            <AlertCircle className="h-3 w-3 mr-1" />
            Invalid
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "expired":
        return (
          <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
            <XCircle className="h-3 w-3 mr-1" />
            Expired
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <TableRow className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300">
            {doc.companyName.substring(0, 2)}
          </div>
          <span className="font-medium text-white">{doc.companyName}</span>
        </div>
      </TableCell>
      <TableCell className="text-slate-300">
        <div>
          <p>{doc.documentType}</p>
          <p className="text-xs text-slate-500">{doc.fileSize}</p>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
          {categoryLabels[doc.category]}
        </Badge>
      </TableCell>
      <TableCell className="text-slate-400 text-sm">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          <span>{doc.timestamp}</span>
        </div>
      </TableCell>
      <TableCell className="font-mono text-xs text-cyan-400">
        <div className="flex items-center gap-2">
          <span>{doc.signatureHash}</span>
          <Copy className="h-3 w-3 opacity-50 hover:opacity-100 cursor-pointer" />
        </div>
      </TableCell>
      <TableCell className="font-mono text-xs text-slate-400">
        {doc.blockchainTxId ? (
          <div className="flex items-center gap-2">
            <Link2 className="h-3 w-3" />
            <span>{doc.blockchainTxId}</span>
            <ExternalLink className="h-3 w-3 opacity-50 hover:opacity-100 cursor-pointer" />
          </div>
        ) : (
          <span className="text-slate-600">N/A</span>
        )}
      </TableCell>
      <TableCell>{statusBadge()}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default function RegistryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredDocs = verifiedDocuments.filter((doc) => {
    const matchesSearch = doc.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.documentType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || doc.verificationStatus === statusFilter;
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    totalVerified: verifiedDocuments.filter(d => d.verificationStatus === "verified_valid").length,
    totalPending: verifiedDocuments.filter(d => d.verificationStatus === "pending").length,
    totalInvalid: verifiedDocuments.filter(d => d.verificationStatus === "verified_invalid").length,
    totalExpired: verifiedDocuments.filter(d => d.verificationStatus === "expired").length,
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/80 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase">Verified Valid</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.totalVerified}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-500/10">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/80 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase">Pending</p>
                <p className="text-2xl font-bold text-amber-400">{stats.totalPending}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-500/10">
                <Clock className="h-5 w-5 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/80 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase">Invalid</p>
                <p className="text-2xl font-bold text-red-400">{stats.totalInvalid}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-red-500/10">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/80 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase">Trust Score</p>
                <p className="text-2xl font-bold text-cyan-400">99.4%</p>
              </div>
              <div className="p-2.5 rounded-lg bg-cyan-500/10">
                <Shield className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-wrap gap-3">
        <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Lock className="h-4 w-4 mr-2" />
          Sign & Register
        </Button>
        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
          <RefreshCw className="h-4 w-4 mr-2" />
          Sync Blockchain
        </Button>
        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Registry Table */}
      <Card className="bg-slate-900/80 border-slate-800">
        <CardHeader className="pb-4 border-b border-slate-800">
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <FileKey className="h-5 w-5 text-cyan-400" />
            Document Registry
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search companies or documents..."
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
                <SelectItem value="verified_valid">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified_invalid">Invalid</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="financial_results">Financial Results</SelectItem>
                <SelectItem value="board_minutes">Board Minutes</SelectItem>
                <SelectItem value="regulatory">Regulatory</SelectItem>
                <SelectItem value="announcement">Announcement</SelectItem>
                <SelectItem value="agm_notice">AGM Notice</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-slate-800 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-800 hover:bg-transparent bg-slate-800/50">
                  <TableHead className="text-slate-400 font-medium">Company Name</TableHead>
                  <TableHead className="text-slate-400 font-medium">Document Type</TableHead>
                  <TableHead className="text-slate-400 font-medium">Category</TableHead>
                  <TableHead className="text-slate-400 font-medium">Timestamp</TableHead>
                  <TableHead className="text-slate-400 font-medium">Signature Hash</TableHead>
                  <TableHead className="text-slate-400 font-medium">Blockchain TX</TableHead>
                  <TableHead className="text-slate-400 font-medium">Status</TableHead>
                  <TableHead className="text-slate-400 font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocs.map((doc) => (
                  <DocumentRow key={doc.id} doc={doc} />
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Blockchain Info */}
      <Card className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border-cyan-500/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-cyan-500/20">
              <Link2 className="h-6 w-6 text-cyan-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-cyan-400">Anchor Blockchain: Ethereum Mainnet</p>
              <p className="text-xs text-cyan-300/70 mt-1">
                All documents are cryptographically anchored on Ethereum. Last block synced: #19,845,234 • Contract: 0x7a3b...f2d1
              </p>
            </div>
            <Button variant="outline" size="sm" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20">
              View Contract
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
