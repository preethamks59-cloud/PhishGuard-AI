-- Channels being monitored
CREATE TABLE channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  name TEXT NOT NULL,
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Threats detected
CREATE TABLE threats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID REFERENCES channels(id),
  target_entity TEXT NOT NULL,
  threat_type TEXT NOT NULL CHECK (threat_type IN ('deepfake_video', 'deepfake_audio', 'phishing_site', 'phishing_account', 'lookalike_domain')),
  risk_score INTEGER CHECK (risk_score >= 0 AND risk_score <= 100),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'investigating', 'resolved', 'whitelisted')),
  platform TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

-- Phishing sites
CREATE TABLE phishing_sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT NOT NULL,
  target_company TEXT NOT NULL,
  first_seen TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'taken_down', 'inactive')),
  risk_level TEXT DEFAULT 'high'
);

-- Verified corporate announcements
CREATE TABLE verified_announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  document_type TEXT NOT NULL,
  document_url TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  signature_hash TEXT NOT NULL,
  verification_status TEXT DEFAULT 'verified_valid' CHECK (verification_status IN ('verified_valid', 'verified_invalid', 'pending', 'expired')),
  blockchain_tx_id TEXT
);

-- Deepfake analysis results
CREATE TABLE deepfake_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  threat_id UUID REFERENCES threats(id),
  rppg_status TEXT DEFAULT 'failed',
  rppg_score INTEGER,
  eye_blink_anomaly REAL,
  spectral_audio_status TEXT,
  spectral_audio_score INTEGER,
  overall_fake_probability REAL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE threats ENABLE ROW LEVEL SECURITY;
ALTER TABLE phishing_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE verified_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE deepfake_analyses ENABLE ROW LEVEL SECURITY;

-- RLS Policies (public read for dashboard demo)
CREATE POLICY "select_channels" ON channels FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_channels" ON channels FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_channels" ON channels FOR UPDATE TO authenticated USING (true);

CREATE POLICY "select_threats" ON threats FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_threats" ON threats FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_threats" ON threats FOR UPDATE TO authenticated USING (true);

CREATE POLICY "select_phishing_sites" ON phishing_sites FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_phishing_sites" ON phishing_sites FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "select_verified_announcements" ON verified_announcements FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_verified_announcements" ON verified_announcements FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "select_deepfake_analyses" ON deepfake_analyses FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_deepfake_analyses" ON deepfake_analyses FOR INSERT TO authenticated WITH CHECK (true);

-- Insert sample data
INSERT INTO channels (platform, name, url) VALUES
('Twitter', 'Official NSE India', 'https://twitter.com/NSEIndia'),
('Twitter', 'SEBI Official', 'https://twitter.com/SEBI'),
('Telegram', 'Stock Tips Official', 't.me/stocktips'),
('YouTube', 'CNBC TV18', 'https://youtube.com/@CNBC'),
('WhatsApp', 'Investment Groups', null),
('Twitter', 'Reliance Corporate', 'https://twitter.com/Reliance'),
('Telegram', 'Trading Community', 't.me/tradingcommunity'),
('YouTube', 'ET Now', 'https://youtube.com/@ETNow'),
('Facebook', 'Stock Market News', 'https://facebook.com/stockmarketnews'),
('Instagram', 'Finance Influencers', 'https://instagram.com/finance');

INSERT INTO threats (target_entity, threat_type, risk_score, platform, status) VALUES
('Reliance Industries CEO deepfake audio claiming stock split', 'deepfake_audio', 94, 'Twitter', 'active'),
('Lookalike domain: nse-india-bonus.com', 'lookalike_domain', 89, 'Web', 'active'),
('Fake SEBI announcement on new IPO regulations', 'phishing_site', 78, 'Web', 'investigating'),
('Impersonator account: @MukeshAmbani_OfficiaI', 'phishing_account', 85, 'Twitter', 'active'),
('Deepfake video of HDFC Bank CFO announcing merger', 'deepfake_video', 96, 'YouTube', 'active'),
('Fraudulent WhatsApp group offering guaranteed returns', 'phishing_site', 72, 'WhatsApp', 'active'),
('Fake Telegram channel posing as Zerodha support', 'phishing_account', 81, 'Telegram', 'active'),
('Lookalike domain:Groww-investments.com', 'lookalike_domain', 88, 'Web', 'whitelisted'),
('Deepfake audio of Adani Group chairman', 'deepfake_audio', 91, 'Twitter', 'active'),
('Impersonator LinkedIn profile: Infosys CFO', 'phishing_account', 67, 'LinkedIn', 'investigating');

INSERT INTO phishing_sites (domain, target_company, risk_level) VALUES
('nse-india-bonus.com', 'NSE India', 'critical'),
('sebi-govt-notification.com', 'SEBI', 'critical'),
('zerodha-support-login.com', 'Zerodha', 'high'),
('hdfc-bank-verify.net', 'HDFC Bank', 'high'),
('groww-investments.com', 'Groww', 'medium'),
('icici-ipo-apply.in', 'ICICI Securities', 'high'),
('upstox-profit-claim.com', 'Upstox', 'medium'),
('angel-one-reward.net', 'Angel One', 'high');

INSERT INTO verified_announcements (company_name, document_type, signature_hash, verification_status) VALUES
('Reliance Industries Ltd', 'Quarterly Results Q4 2026', '0x7f8a...c3d2', 'verified_valid'),
('HDFC Bank', 'Board Meeting Minutes', '0x3b2e...a9f4', 'verified_valid'),
('Tata Consultancy Services', 'Dividend Declaration', '0x9c4d...e8b1', 'verified_valid'),
('Infosys Limited', 'IPO Allotment Notice', '0x5f1a...d7c3', 'verified_valid'),
('ICICI Bank', 'Rights Issue Announcement', '0x2e8b...f4a6', 'verified_valid'),
('Bharti Airtel', 'Merger Notification', '0x8a3c...b1d5', 'verified_valid');

INSERT INTO deepfake_analyses (threat_id, rppg_status, rppg_score, eye_blink_anomaly, spectral_audio_status, spectral_audio_score, overall_fake_probability)
SELECT 
  t.id,
  'failed', 
  78,
  0.88,
  'high',
  82,
  0.94
FROM threats t WHERE t.threat_type = 'deepfake_video' LIMIT 1;

INSERT INTO deepfake_analyses (threat_id, rppg_status, rppg_score, eye_blink_anomaly, spectral_audio_status, spectral_audio_score, overall_fake_probability)
SELECT 
  t.id,
  'inconsistent', 
  65,
  0.72,
  'critical',
  91,
  0.91
FROM threats t WHERE t.threat_type = 'deepfake_audio' LIMIT 2;