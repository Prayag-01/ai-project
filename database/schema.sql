-- Create SQLite database schema for AI Analytics Dashboard

-- 1. Products table
CREATE TABLE products (
    product_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    team_owner TEXT,
    created_at DATETIME NOT NULL
);

-- 2. Models table
CREATE TABLE models (
    model_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    provider TEXT NOT NULL,
    cost_per_1k_tokens REAL,
    created_at DATETIME NOT NULL
);

-- 3. AI Call Logs table
CREATE TABLE ai_call_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT NOT NULL,
    model_id TEXT NOT NULL,
    timestamp DATETIME NOT NULL,
    tokens_used INTEGER NOT NULL,
    prompt_tokens INTEGER,
    completion_tokens INTEGER,
    accuracy REAL,
    response_time_ms INTEGER NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('success', 'error')),
    error_message TEXT,
    api_cost_usd REAL NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (model_id) REFERENCES models(model_id)
);

-- 4. Daily Metrics table
CREATE TABLE metrics_daily (
    id TEXT PRIMARY KEY, -- format: productId_date_modelId
    date TEXT NOT NULL, -- YYYY-MM-DD format
    product_id TEXT NOT NULL,
    model_id TEXT NOT NULL,
    total_ai_calls INTEGER NOT NULL,
    total_tokens INTEGER NOT NULL,
    avg_accuracy REAL,
    avg_response_time_ms REAL,
    success_count INTEGER NOT NULL,
    error_count INTEGER NOT NULL,
    api_cost_usd REAL NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (model_id) REFERENCES models(model_id)
);

-- 5. Billing table
CREATE TABLE billing (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL, -- YYYY-MM-DD format
    product_id TEXT NOT NULL,
    provider TEXT NOT NULL CHECK (provider IN ('openai', 'aws', 'infra')),
    service TEXT NOT NULL,
    usage_metric TEXT,
    usage_amount REAL,
    cost_usd REAL NOT NULL,
    notes TEXT,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_ai_call_logs_product_timestamp ON ai_call_logs(product_id, timestamp);
CREATE INDEX idx_ai_call_logs_model_timestamp ON ai_call_logs(model_id, timestamp);
CREATE INDEX idx_metrics_daily_date ON metrics_daily(date);
CREATE INDEX idx_metrics_daily_product ON metrics_daily(product_id);
CREATE INDEX idx_billing_date_product ON billing(date, product_id);
CREATE INDEX idx_billing_provider ON billing(provider);
