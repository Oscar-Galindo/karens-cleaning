#!/bin/bash

# WordPress Migration Helper Script
# Makes it easy to migrate from WordPress

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                                                           ║${NC}"
echo -e "${CYAN}║   ${GREEN}📦 WORDPRESS MIGRATION WIZARD${CYAN}                          ║${NC}"
echo -e "${CYAN}║                                                           ║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ No .env file found!${NC}"
    echo -e "${YELLOW}Run ./setup.sh first to configure your project${NC}"
    exit 1
fi

# Get WordPress URL
echo -e "${BLUE}WordPress Site Information${NC}"
echo -e "${BLUE}─────────────────────────${NC}"
read -p "WordPress site URL (e.g., https://oldsite.com): " WP_URL

if [ -z "$WP_URL" ]; then
    echo -e "${RED}❌ WordPress URL is required${NC}"
    exit 1
fi

# Add to .env if not there
if ! grep -q "WORDPRESS_URL" .env; then
    echo "" >> .env
    echo "# WordPress Migration" >> .env
    echo "WORDPRESS_URL=${WP_URL}" >> .env
    echo -e "${GREEN}✅ Added WORDPRESS_URL to .env${NC}"
else
    # Update existing
    sed -i.bak "s|WORDPRESS_URL=.*|WORDPRESS_URL=${WP_URL}|" .env && rm .env.bak
    echo -e "${GREEN}✅ Updated WORDPRESS_URL in .env${NC}"
fi

# Ask what to migrate
echo ""
echo -e "${BLUE}What would you like to migrate?${NC}"
echo -e "${BLUE}────────────────────────────────${NC}"
echo "1) Everything (posts, pages, media)"
echo "2) Just blog posts"
echo "3) Just pages"
read -p "Select [1-3]: " migration_choice

echo ""
echo -e "${YELLOW}🔄 Starting migration...${NC}"
echo ""

# Run the migration script
WORDPRESS_URL=$WP_URL node scripts/migrate/wordpress-to-markdown.js

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                 MIGRATION COMPLETE! 🎉                    ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo ""
echo "  1. Check migrated content in src/content/ folder"
echo "  2. Review and fix any formatting issues"
echo "  3. Download images manually if needed"
echo "  4. Test your site:"
echo -e "     ${CYAN}npm run dev${NC}"
echo ""
echo -e "${BLUE}💡 Tip: Original WordPress URLs are preserved in image links.${NC}"
echo -e "${BLUE}   You can update them later to use local images.${NC}"
echo ""
