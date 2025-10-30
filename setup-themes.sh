#!/bin/bash

# Setup modular CSS structure for MediScope themes
echo "🔧 Setting up modular CSS structure..."

# Create directories
mkdir -p assets/css/base
mkdir -p assets/css/components
mkdir -p assets/css/themes

# Create base CSS files
cat <<EOF > assets/css/base/reset.css
/* Reset styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
EOF

cat <<EOF > assets/css/base/typography.css
/* Typography styles */
body {
  font-family: 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  font-size: 16px;
}
EOF

cat <<EOF > assets/css/base/layout.css
/* Layout styles */
body {
  margin: 0;
  padding: 2rem;
}
section {
  margin-bottom: 2rem;
}
EOF

# Create theme files
cat <<EOF > assets/css/themes/light.css
:root {
  --bg-color: #f9f9fb;
  --text-color: #333;
  --accent-color: #0077cc;
  --card-bg: #ffffff;
}
EOF

cat <<EOF > assets/css/themes/dark.css
:root {
  --bg-color: #1e1e1e;
  --text-color: #eee;
  --accent-color: #00bfff;
  --card-bg: #2c2c2c;
}
EOF

# Create main.css that imports everything
cat <<EOF > assets/css/main.css
@import url('./base/reset.css');
@import url('./base/typography.css');
@import url('./base/layout.css');
@import url('./components/header.css');
@import url('./components/footer.css');
@import url('./components/weather.css');
@import url('./components/meal.css');
@import url('./components/nutrition.css');
@import url('./themes/light.css'); /* Default theme */

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}
section {
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
EOF

echo "✅ Theme setup complete. You can now toggle between light and dark modes!"
