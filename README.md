# PhishGuard AI - SEBI Compliance Dashboard

An enterprise-grade cybersecurity and regulatory compliance dashboard for SEBI (Securities and Exchange Board of India), designed to monitor, detect, and mitigate digital threats targeting Indian capital markets and listed entities.

## Overview

PhishGuard AI provides real-time surveillance across multiple digital channels to protect investors, market intermediaries, and listed companies from:

- **Deepfake Content** - Synthetic media impersonating corporate executives
- **Phishing Attacks** - Fraudulent websites, domains, and accounts
- **Market Manipulation** - Misinformation campaigns affecting stock prices
- **Identity Impersonation** - Fake social media accounts posing as regulated entities

## Features

### Dashboard Overview
- Real-time KPI cards displaying channels monitored, active threats, and trust index
- Live threat feed with risk scoring and action buttons
- Deepfake video forensics with biological marker analysis
- Cryptographic document registry for verified announcements

### Deepfake Auditing
- AI-powered synthetic media detection
- Video and audio file upload and analysis
- 8+ biological marker analysis including:
  - rPPG (remote photoplethysmography) blood flow analysis
  - Eye-blink rate anomaly detection
  - Spectral audio artifact detection
  - Lip sync correlation analysis
  - Facial landmark stability scoring
- Analysis history with confidence scores
- SEBI reporting integration

### Phishing & Fraud Tracker
- Comprehensive threat database with filtering
- Support for multiple threat types:
  - Lookalike domains
  - Phishing websites
  - Impersonator accounts
  - Fraudulent mobile applications
- Risk scoring and victim tracking
- Takedown request automation
- Bulk whitelist functionality

### Cryptographic Registry
- Blockchain-anchored document verification (Ethereum)
- Support for corporate announcements:
  - Financial results
  - Board meeting minutes
  - Regulatory filings
  - AGM notices
- Cryptographic signature validation
- Document upload and signing workflow

### System Configuration
- Multi-tab settings interface
- Entity monitoring management
- Platform toggle controls (Twitter, YouTube, Telegram, etc.)
- Alert notification preferences (Email, Slack, SMS)
- User management and access controls
- System health monitoring

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL with RLS)
- **Blockchain**: Ethereum (document anchoring)

## Database Schema

The application uses the following tables:

- `channels` - Monitored platforms and sources
- `threats` - Detected threats with metadata
- `phishing_sites` - Flagged phishing domains
- `verified_announcements` - Cryptographically verified documents
- `deepfake_analyses` - Forensic analysis results

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Create a `.env` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Project Structure

```
app/
  dashboard/
    layout.tsx           # Dashboard shell with sidebar
    page.tsx             # Main dashboard overview
    deepfake/
      page.tsx           # Deepfake analysis interface
    phishing/
      page.tsx           # Threat database
    registry/
      page.tsx            # Document registry
    settings/
      page.tsx            # Configuration panel
components/
  dashboard/
    sidebar-nav.tsx      # Navigation sidebar
    stats-cards.tsx      # KPI cards
    threat-feed.tsx      # Real-time threat list
    deepfake-analysis.tsx # Forensics panel
    verified-registry.tsx # Document table
  ui/                    # shadcn/ui components
supabase/
  migrations/
    001_initial_schema.sql
```

## Security Features

- Row-Level Security (RLS) on all tables
- Two-Factor Authentication support
- IP whitelisting
- Session timeout controls
- Role-based access (Admin, Analyst)
- Cryptographic document verification

## Status Indicators

| Color | Status |
|-------|--------|
| Emerald Green | Safe / Verified |
| Amber | Warning / Investigating |
| Crimson Red | Critical Threat / Invalid |

## License

Proprietary - SEBI Compliance Division

## Support

For issues or feature requests, contact: compliance@sebi.gov.in
