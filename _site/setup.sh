#!/bin/bash

# setup.sh — Bootstrap script for MediScope Jekyll Dashboard

echo "🔧 Setting up MediScope Jekyll project structure..."

# Create root files
touch index.html login.html editor.html unauthorized.html README.md LICENSE _config.yml

# Create core directories
mkdir -p _layouts _includes assets/css assets/js assets/images data pages .github/workflows

# Create placeholder layout and includes
echo "<!DOCTYPE html><html><head><title>{{ page.title }}</title></head><body>{% include header.html %}{{ content }}{% include footer.html %}</body></html>" > _layouts/default.html
echo "<header><h1>MediScope</h1></header>" > _includes/header.html
echo "<footer><p>© 2025 CHUONG</p></footer>" > _includes/footer.html

# Create JS files
touch assets/js/main.js assets/js/auth.js assets/js/editor.js

# Create CSS file
echo "body { font-family: sans-serif; margin: 2rem; }" > assets/css/style.css

# Create encrypted auth file placeholder
echo "# Encrypted credentials will be stored here" > data/auth.json.enc

# Create sample pages
touch pages/weather.html pages/drugs.html pages/nutrition.html

# Create GitHub Actions workflow
cat <<EOF > .github/workflows/deploy.yml
name: Deploy MediScope

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Decrypt auth.json.enc
        run: |
          echo "\$AUTH_KEY" > key.txt
          openssl enc -aes-256-cbc -d -in data/auth.json.enc -out data/auth.json -pass file:key.txt

      - name: Build and Deploy
        uses: jekyll/jekyll-action@v2
        with:
          token: \${{ secrets.GITHUB_TOKEN }}
EOF

# Make script executable
chmod +x setup.sh

echo "✅ MediScope project structure created successfully!"
