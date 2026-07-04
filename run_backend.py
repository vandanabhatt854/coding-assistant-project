#!/usr/bin/env python3
"""
Run the Flask backend server
"""
import os
import sys
from dotenv import load_dotenv

# Load environment variables from .env.development.local
load_dotenv('.env.development.local')

# Ensure AI_GATEWAY_API_KEY is set
if not os.getenv('AI_GATEWAY_API_KEY'):
    print("[v0] ERROR: AI_GATEWAY_API_KEY is not set in environment")
    sys.exit(1)

os.environ.setdefault('FLASK_ENV', 'development')
os.environ.setdefault('FLASK_APP', 'backend.app:create_app')

from backend.app import create_app

if __name__ == '__main__':
    app = create_app()
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True,
        use_reloader=True,
    )
