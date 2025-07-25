#!/usr/bin/env python3
"""
Create and populate SQLite database for AI Analytics Dashboard
"""

import sqlite3
import os
from pathlib import Path

def create_database():
    """Create the SQLite database and populate it with sample data"""
    
    # Get the directory where this script is located
    script_dir = Path(__file__).parent
    db_path = script_dir / 'ai_analytics.db'
    schema_path = script_dir / 'schema.sql'
    data_path = script_dir / 'sample_data.sql'
    
    # Remove existing database if it exists
    if db_path.exists():
        os.remove(db_path)
        print(f"Removed existing database: {db_path}")
    
    # Create new database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Execute schema creation
        print("Creating database schema...")
        with open(schema_path, 'r') as f:
            schema_sql = f.read()
        cursor.executescript(schema_sql)
        
        # Insert sample data
        print("Inserting sample data...")
        with open(data_path, 'r') as f:
            data_sql = f.read()
        cursor.executescript(data_sql)
        
        # Commit changes
        conn.commit()
        print(f"Database created successfully: {db_path}")
        
        # Display some statistics
        print("\n=== Database Statistics ===")
        
        # Count records in each table
        tables = ['products', 'models', 'ai_call_logs', 'metrics_daily', 'billing']
        for table in tables:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = cursor.fetchone()[0]
            print(f"{table}: {count} records")
        
        # Show total costs by provider
        print("\n=== Cost Summary ===")
        cursor.execute("""
            SELECT provider, SUM(cost_usd) as total_cost 
            FROM billing 
            GROUP BY provider 
            ORDER BY total_cost DESC
        """)
        
        for provider, cost in cursor.fetchall():
            print(f"{provider}: ${cost:.2f}")
        
        # Show AI call summary
        print("\n=== AI Calls Summary ===")
        cursor.execute("""
            SELECT product_id, COUNT(*) as calls, SUM(api_cost_usd) as total_cost
            FROM ai_call_logs 
            GROUP BY product_id 
            ORDER BY total_cost DESC
        """)
        
        for product, calls, cost in cursor.fetchall():
            print(f"{product}: {calls} calls, ${cost:.2f}")
            
    except Exception as e:
        print(f"Error creating database: {e}")
        conn.rollback()
        
    finally:
        conn.close()

def verify_database():
    """Verify the database was created correctly"""
    
    script_dir = Path(__file__).parent
    db_path = script_dir / 'ai_analytics.db'
    
    if not db_path.exists():
        print("Database file not found!")
        return False
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Test a complex query
        cursor.execute("""
            SELECT 
                p.name as product_name,
                m.name as model_name,
                SUM(md.total_ai_calls) as total_calls,
                SUM(md.api_cost_usd) as total_cost,
                AVG(md.avg_accuracy) as avg_accuracy
            FROM metrics_daily md
            JOIN products p ON md.product_id = p.product_id
            JOIN models m ON md.model_id = m.model_id
            GROUP BY p.product_id, m.model_id
            ORDER BY total_cost DESC
            LIMIT 5
        """)
        
        print("\n=== Top 5 Product-Model Combinations by Cost ===")
        for row in cursor.fetchall():
            product, model, calls, cost, accuracy = row
            print(f"{product} + {model}: {calls} calls, ${cost:.2f}, {accuracy:.1f}% accuracy")
        
        return True
        
    except Exception as e:
        print(f"Database verification failed: {e}")
        return False
        
    finally:
        conn.close()

if __name__ == "__main__":
    print("Creating AI Analytics SQLite Database...")
    create_database()
    print("\nVerifying database...")
    verify_database()
    print("\nDatabase setup complete!")
