-- Insert sample data for AI Analytics Dashboard

-- 1. Insert Products (All 6 Injala products)
INSERT INTO products (product_id, name, description, team_owner, created_at) VALUES
('wrapportal', 'WrapPortal', 'AI-powered content wrapping and optimization platform', 'team_alpha', '2024-01-15T08:00:00Z'),
('asureify', 'Asureify', 'Assurance and verification platform for insurance claims', 'team_beta', '2024-02-01T09:00:00Z'),
('kinetic', 'Kinetic', 'Dynamic process optimization and automation engine', 'team_gamma', '2024-01-20T10:00:00Z'),
('riskguru', 'RiskGuru', 'Advanced risk assessment and management system', 'team_delta', '2024-03-10T11:00:00Z'),
('anzenn', 'Anzenn', 'Advanced neural network analytics for customer insights', 'team_epsilon', '2024-02-15T12:00:00Z'),
('prequaligy', 'Prequaligy', 'Pre-qualification and quality assessment tools', 'team_zeta', '2024-01-25T13:00:00Z');

-- 2. Insert AI Models
INSERT INTO models (model_id, name, provider, cost_per_1k_tokens, created_at) VALUES
('gpt-4o-mini', 'GPT-4o Mini', 'openai', 0.000150, '2024-01-01T00:00:00Z'),
('gpt-4', 'GPT-4', 'openai', 0.030000, '2024-01-01T00:00:00Z'),
('gpt-3.5-turbo', 'GPT-3.5 Turbo', 'openai', 0.001500, '2024-01-01T00:00:00Z'),
('claude-3-sonnet', 'Claude 3 Sonnet', 'anthropic', 0.003000, '2024-01-01T00:00:00Z'),
('claude-3-haiku', 'Claude 3 Haiku', 'anthropic', 0.000250, '2024-01-01T00:00:00Z'),
('gemini-pro', 'Gemini Pro', 'google', 0.000500, '2024-01-01T00:00:00Z');

-- 3. Insert AI Call Logs (Sample data for last 7 days)
INSERT INTO ai_call_logs (product_id, model_id, timestamp, tokens_used, prompt_tokens, completion_tokens, accuracy, response_time_ms, status, api_cost_usd) VALUES
-- WrapPortal calls
('wrapportal', 'gpt-4o-mini', '2025-01-25T10:30:00Z', 1500, 800, 700, 96.5, 245, 'success', 0.225),
('wrapportal', 'gpt-4', '2025-01-25T11:15:00Z', 2200, 1200, 1000, 98.2, 180, 'success', 66.0),
('wrapportal', 'claude-3-sonnet', '2025-01-25T12:00:00Z', 1800, 900, 900, 97.1, 320, 'success', 5.4),
('wrapportal', 'gpt-4o-mini', '2025-01-25T14:30:00Z', 1200, 600, 600, 95.8, 190, 'success', 0.18),
('wrapportal', 'gemini-pro', '2025-01-25T15:45:00Z', 2500, 1500, 1000, 94.3, 280, 'success', 1.25),

-- Asureify calls
('asureify', 'gpt-4o-mini', '2025-01-25T09:00:00Z', 1800, 1000, 800, 97.8, 205, 'success', 0.27),
('asureify', 'claude-3-haiku', '2025-01-25T10:30:00Z', 2200, 1200, 1000, 96.4, 150, 'success', 0.55),
('asureify', 'gpt-4', '2025-01-25T13:15:00Z', 3200, 1800, 1400, 98.9, 220, 'success', 96.0),
('asureify', 'gpt-4o-mini', '2025-01-25T16:00:00Z', 1600, 800, 800, 96.1, 175, 'success', 0.24),

-- Kinetic calls
('kinetic', 'gpt-3.5-turbo', '2025-01-25T08:30:00Z', 2800, 1500, 1300, 92.5, 120, 'success', 4.2),
('kinetic', 'gpt-4o-mini', '2025-01-25T11:45:00Z', 2100, 1100, 1000, 94.2, 165, 'success', 0.315),
('kinetic', 'claude-3-sonnet', '2025-01-25T14:20:00Z', 1900, 1000, 900, 95.7, 290, 'success', 5.7),
('kinetic', 'gemini-pro', '2025-01-25T17:00:00Z', 2400, 1300, 1100, 93.8, 310, 'success', 1.2),

-- RiskGuru calls
('riskguru', 'gpt-4', '2025-01-25T09:15:00Z', 2800, 1500, 1300, 97.6, 195, 'success', 84.0),
('riskguru', 'claude-3-haiku', '2025-01-25T12:30:00Z', 3200, 1800, 1400, 95.1, 140, 'success', 0.8),
('riskguru', 'gpt-4o-mini', '2025-01-25T15:15:00Z', 1700, 900, 800, 96.8, 210, 'success', 0.255),

-- Anzenn calls
('anzenn', 'claude-3-sonnet', '2025-01-25T10:00:00Z', 2600, 1400, 1200, 91.2, 340, 'success', 7.8),
('anzenn', 'gpt-3.5-turbo', '2025-01-25T13:45:00Z', 3100, 1700, 1400, 89.7, 135, 'success', 4.65),
('anzenn', 'gemini-pro', '2025-01-25T16:30:00Z', 2200, 1200, 1000, 90.5, 295, 'success', 1.1),

-- Prequaligy calls
('prequaligy', 'gpt-4o-mini', '2025-01-25T11:00:00Z', 1900, 1000, 900, 94.8, 225, 'success', 0.285),
('prequaligy', 'claude-3-haiku', '2025-01-25T14:45:00Z', 2500, 1300, 1200, 93.5, 155, 'success', 0.625),
('prequaligy', 'gpt-4', '2025-01-25T17:30:00Z', 2100, 1100, 1000, 95.2, 200, 'success', 63.0);

-- 4. Insert Daily Metrics (Last 7 days aggregated data)
INSERT INTO metrics_daily (id, date, product_id, model_id, total_ai_calls, total_tokens, avg_accuracy, avg_response_time_ms, success_count, error_count, api_cost_usd) VALUES
-- WrapPortal metrics
('wrapportal_2025-01-25_gpt-4o-mini', '2025-01-25', 'wrapportal', 'gpt-4o-mini', 850, 127500, 96.2, 218, 840, 10, 19.125),
('wrapportal_2025-01-25_gpt-4', '2025-01-25', 'wrapportal', 'gpt-4', 120, 264000, 98.1, 190, 118, 2, 7920.0),
('wrapportal_2025-01-25_claude-3-sonnet', '2025-01-25', 'wrapportal', 'claude-3-sonnet', 95, 171000, 97.3, 305, 94, 1, 513.0),

-- Asureify metrics  
('asureify_2025-01-25_gpt-4o-mini', '2025-01-25', 'asureify', 'gpt-4o-mini', 920, 165600, 96.8, 195, 915, 5, 24.84),
('asureify_2025-01-25_gpt-4', '2025-01-25', 'asureify', 'gpt-4', 85, 272000, 98.7, 215, 84, 1, 8160.0),
('asureify_2025-01-25_claude-3-haiku', '2025-01-25', 'asureify', 'claude-3-haiku', 180, 396000, 96.1, 148, 178, 2, 99.0),

-- Kinetic metrics
('kinetic_2025-01-25_gpt-3.5-turbo', '2025-01-25', 'kinetic', 'gpt-3.5-turbo', 420, 1176000, 92.8, 125, 412, 8, 1764.0),
('kinetic_2025-01-25_gpt-4o-mini', '2025-01-25', 'kinetic', 'gpt-4o-mini', 380, 798000, 94.5, 172, 375, 5, 119.7),

-- RiskGuru metrics
('riskguru_2025-01-25_gpt-4', '2025-01-25', 'riskguru', 'gpt-4', 65, 182000, 97.2, 200, 64, 1, 5460.0),
('riskguru_2025-01-25_claude-3-haiku', '2025-01-25', 'riskguru', 'claude-3-haiku', 220, 704000, 95.6, 145, 218, 2, 176.0),

-- Anzenn metrics
('anzenn_2025-01-25_claude-3-sonnet', '2025-01-25', 'anzenn', 'claude-3-sonnet', 150, 390000, 91.5, 325, 147, 3, 1170.0),
('anzenn_2025-01-25_gpt-3.5-turbo', '2025-01-25', 'anzenn', 'gpt-3.5-turbo', 280, 868000, 90.2, 140, 275, 5, 1302.0),

-- Prequaligy metrics
('prequaligy_2025-01-25_gpt-4o-mini', '2025-01-25', 'prequaligy', 'gpt-4o-mini', 290, 551000, 94.2, 215, 287, 3, 82.65),
('prequaligy_2025-01-25_claude-3-haiku', '2025-01-25', 'prequaligy', 'claude-3-haiku', 195, 487500, 93.8, 160, 193, 2, 121.875);

-- 5. Insert Billing Data (Last 30 days)
INSERT INTO billing (date, product_id, provider, service, usage_metric, usage_amount, cost_usd, notes) VALUES
-- OpenAI billing
('2025-01-25', 'wrapportal', 'openai', 'API Usage', 'tokens', 562500, 375.50, 'High GPT-4 usage for document processing'),
('2025-01-25', 'asureify', 'openai', 'API Usage', 'tokens', 833600, 485.25, 'Mixed model usage for claim verification'),
('2025-01-25', 'kinetic', 'openai', 'API Usage', 'tokens', 1974000, 245.80, 'Primarily GPT-3.5 and GPT-4o-mini'),
('2025-01-25', 'riskguru', 'openai', 'API Usage', 'tokens', 886000, 412.30, 'GPT-4 heavy usage for risk analysis'),
('2025-01-25', 'anzenn', 'openai', 'API Usage', 'tokens', 868000, 156.90, 'Cost-optimized with GPT-3.5'),
('2025-01-25', 'prequaligy', 'openai', 'API Usage', 'tokens', 1038500, 142.75, 'Balanced model usage'),

-- AWS billing  
('2025-01-25', 'wrapportal', 'aws', 'EC2', 'instance-hours', 744, 125.50, 'Production servers'),
('2025-01-25', 'wrapportal', 'aws', 'S3', 'storage-gb', 2500, 57.50, 'Document storage'),
('2025-01-25', 'wrapportal', 'aws', 'Lambda', 'executions', 125000, 23.75, 'Serverless processing'),

('2025-01-25', 'asureify', 'aws', 'EC2', 'instance-hours', 1488, 251.00, 'High availability setup'),
('2025-01-25', 'asureify', 'aws', 'RDS', 'db-hours', 744, 180.25, 'PostgreSQL database'),
('2025-01-25', 'asureify', 'aws', 'CloudFront', 'data-transfer-gb', 850, 42.50, 'CDN for claim documents'),

('2025-01-25', 'kinetic', 'aws', 'EC2', 'instance-hours', 372, 62.75, 'Development environment'),
('2025-01-25', 'kinetic', 'aws', 'Lambda', 'executions', 95000, 18.05, 'Event processing'),

('2025-01-25', 'riskguru', 'aws', 'EC2', 'instance-hours', 744, 125.50, 'Risk computation servers'),
('2025-01-25', 'riskguru', 'aws', 'S3', 'storage-gb', 1800, 41.40, 'Risk model storage'),

('2025-01-25', 'anzenn', 'aws', 'EC2', 'instance-hours', 372, 62.75, 'Analytics processing'),
('2025-01-25', 'anzenn', 'aws', 'API Gateway', 'requests', 2500000, 8.75, 'API traffic'),

('2025-01-25', 'prequaligy', 'aws', 'EC2', 'instance-hours', 372, 62.75, 'Qualification servers'),
('2025-01-25', 'prequaligy', 'aws', 'Lambda', 'executions', 65000, 12.35, 'Quality checks'),

-- Infrastructure billing
('2025-01-25', 'wrapportal', 'infra', 'Monitoring', 'services', 5, 89.95, 'DataDog monitoring'),
('2025-01-25', 'asureify', 'infra', 'CI/CD', 'build-minutes', 1200, 45.00, 'GitHub Actions'),
('2025-01-25', 'kinetic', 'infra', 'Monitoring', 'services', 3, 53.97, 'New Relic monitoring'),
('2025-01-25', 'riskguru', 'infra', 'Security', 'scans', 50, 125.00, 'Security scanning tools'),
('2025-01-25', 'anzenn', 'infra', 'Analytics', 'events', 500000, 75.50, 'Analytics platform'),
('2025-01-25', 'prequaligy', 'infra', 'Backup', 'storage-gb', 500, 25.75, 'Backup storage service');
