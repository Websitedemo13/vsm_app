#!/bin/bash

echo "🚀 Starting VSM Go Backend Server..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "📝 Please configure your .env file with Supabase credentials"
    exit 1
fi

# Install dependencies
echo "📦 Installing Go dependencies..."
go mod tidy

# Check if Supabase credentials are configured
if grep -q "your-project" .env; then
    echo "⚠️  Please configure your Supabase credentials in .env file"
    echo "   SUPABASE_URL=https://your-project.supabase.co"
    echo "   SUPABASE_ANON_KEY=your-anon-key"
    exit 1
fi

# Build and run
echo "🔨 Building application..."
go build -o vsm-api .

echo "🌟 Starting server on http://localhost:8080"
echo "📊 Admin dashboard: http://localhost:5173/admin"
echo "✏️  Editor dashboard: http://localhost:5173/editor"
echo ""
echo "Press Ctrl+C to stop"

./vsm-api
