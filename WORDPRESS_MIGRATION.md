# 🔄 WordPress Migration Guide (Super Simple!)

Got an old WordPress site? Let's move it here! Easy peasy! 🎉

---

## 🎯 Two Migration Options

### Option 1: WordPress → Markdown (Easiest!)
Converts WordPress to simple markdown files on your computer.

### Option 2: WordPress → Contentful (Fancy!)
Uploads WordPress content directly to Contentful CMS.

**Pick based on what CMS you chose during setup!**

---

## 🎨 What Gets Migrated

Both options migrate:
- ✅ Blog posts
- ✅ Pages  
- ✅ Categories and tags
- ✅ Images/media

---

## 🚀 Option 1: WordPress → Markdown

**Best if you chose**: `CMS_PROVIDER=markdown`

### Step 1: Run Setup (if you haven't)
```bash
./setup.sh
# Choose: markdown as CMS
```

### Step 2: Run Migration
```bash
npm run migrate:wordpress
```

### Step 3: Enter WordPress URL
```
WordPress site URL: https://oldsite.com
```

### Step 4: Wait (1-5 minutes) ☕
Content is converted to markdown files in `src/content/`

---

## 🎨 Option 2: WordPress → Contentful

**Best if you chose**: `CMS_PROVIDER=contentful`

### Step 1: Install Migration Dependencies
```bash
npm install contentful-management axios dotenv
```

### Step 2: Add Contentful Token to .env
```env
CONTENTFUL_MANAGEMENT_TOKEN=your_token_here
```

**Get token from**: Contentful → Settings → API Keys → Content Management Tokens

### Step 3: Run Migration
```bash
npm run migrate:wp:contentful
```

### Step 4: Wait (10-30 minutes for large sites) ☕
Images and content are uploaded directly to Contentful!

**⚠️ Important**: Delete the management token from `.env` after migration!

---

## 🎨 Option 3: WordPress → Sanity

**Best if you chose**: `CMS_PROVIDER=sanity`

### Step 1: Install Dependencies
```bash
npm install @sanity/client axios dotenv
```

### Step 2: Add Sanity Token to .env
```env
SANITY_TOKEN=your_write_token_here
```

**Get token from**: Sanity.io → Manage → Your Project → API → Add Token  
**Permissions needed**: Editor or Admin

### Step 3: Create Schemas in Sanity
Copy schema definitions from `scripts/sanity-schemas-example.js` to your Sanity Studio project.

### Step 4: Run Migration
```bash
npm run migrate:wp:sanity
```

### Step 5: Wait (10-30 minutes) ☕
Content and images uploaded to Sanity!

**⚠️ Important**: Delete the write token from `.env` after migration!

---

## 🤔 Which Migration Should You Use?

### Use Markdown If:
- ✅ You want it FREE (no CMS costs)
- ✅ Simple site, rarely updates
- ✅ You'll maintain content
- ✅ Want local control

### Use Sanity If:
- ✅ Client wants to edit content themselves
- ✅ Great editing experience
- ✅ Real-time collaboration
- ✅ Free tier generous (3 users, 10k docs)

### Use Contentful If:
- ✅ Need enterprise features
- ✅ Multiple environments
- ✅ Established platform
- ✅ Client has budget (~$25-300/month)

**Still not sure?** Start with Markdown! You can always move to Contentful later. 😊

---

## ✅ What You'll Get

### After Markdown Migration:

Your `src/content/` folder will have:

```
src/content/
├── blog/
│   ├── old-post-1.md      ← Your WordPress posts!
│   ├── old-post-2.md
│   └── old-post-3.md
│
└── pages/
    ├── about.md           ← Your WordPress pages!
    ├── contact.md
    └── services.md
```

### After Contentful Migration:

All content is in your Contentful space! 🎉
- Go to app.contentful.com
- See all your WordPress posts and images
- Edit in the Contentful web interface

---

## 🖼️ What About Images?

**Images stay on your old WordPress site** (for now).

Example:
```markdown
![Image](https://oldwordpresssite.com/wp-content/uploads/2024/image.jpg)
```

This still works! Your new site will load images from the old site.

**Want to move images locally?**
1. Go to your old site
2. Download images from `wp-content/uploads/`
3. Put them in `public/images/` folder
4. Update markdown files with new paths

---

## 🎨 Before and After

### Before (WordPress):
```
https://oldsite.com/blog/my-awesome-post
→ Stored in WordPress database
→ Uses WordPress themes
→ Needs WordPress hosting
```

### After:
```
src/content/blog/my-awesome-post.md
→ Simple markdown file
→ Modern Astro/React
→ Deploy anywhere!
```

---

## 🔧 Troubleshooting

### "WordPress URL not set"
**Fix**: Add to your .env file:
```env
WORDPRESS_URL=https://youroldsite.com
```

### "Can't connect to WordPress"
**Check**:
- Is the URL correct?
- Is the WordPress site online?
- Does it have REST API enabled? (it should by default)

### "Posts look weird"
**Why**: WordPress HTML → Markdown isn't perfect

**Fix**: Manually clean up the markdown files:
1. Open the file in `src/content/blog/`
2. Fix any weird formatting
3. Save
4. Done!

### "Images don't show"
**Fix**: Two options:
1. Leave them (they load from old WordPress site)
2. Download images manually and update paths

---

## 🎯 Quick Migration Checklist

- [ ] Run `./setup.sh` (if you haven't)
- [ ] Make migration script runnable: `chmod +x scripts/migrate/wordpress-migration.sh`
- [ ] Run migration: `./scripts/migrate/wordpress-migration.sh`
- [ ] Enter your WordPress URL
- [ ] Wait for it to finish
- [ ] Check `src/content/blog/` folder
- [ ] Review migrated content
- [ ] Fix any formatting issues
- [ ] Test: `npm run dev`
- [ ] View: `localhost:4321`

---

## 💡 Pro Tips

### Tip 1: Test First
Don't delete your WordPress site immediately! Keep it running while you test the migration.

### Tip 2: Small Batch First
Migrate a few posts first, check them, then do the rest.

### Tip 3: Save Originals
Keep a backup of your WordPress database/files just in case!

### Tip 4: Check Categories
WordPress categories might not match exactly - review and organize them.

### Tip 5: Update Links
If you have internal links (like linking to other blog posts), you might need to update those URLs.

---

## 🎬 Real Example

**Migrating Grace Church from WordPress:**

```bash
# 1. You're in your project
cd karens-cleaning

# 2. Run migration
./scripts/migrate/wordpress-migration.sh

# 3. Enter URL
WordPress site URL: https://gracechurch.wordpress.com

# 4. Wait...
Fetching: posts...
  ✅ Migrated: Sunday Sermon - January 15
  ✅ Migrated: Community Potluck Recap
  ✅ Migrated: New Bible Study Series
✅ Migrated 25 blog posts!

Fetching: pages...
  ✅ Migrated: About Us
  ✅ Migrated: Contact
  ✅ Migrated: Service Times
✅ Migrated 5 pages!

🎉 MIGRATION COMPLETE!

# 5. Check results
npm run dev
# Open localhost:4321 and see your content!
```

---

## ⚠️ Important Notes

### What Gets Migrated:
- ✅ Blog posts (published only)
- ✅ Pages (published only)
- ✅ Categories and tags
- ✅ Featured images (URLs only)
- ✅ Post dates and authors

### What Doesn't Get Migrated:
- ❌ Comments (you'll need to use a comment service)
- ❌ WordPress plugins
- ❌ Custom post types (unless you modify the script)
- ❌ WordPress settings/theme options
- ❌ Widgets

---

## 🆘 Still Have WordPress-Specific Features?

### Comments
**Options**:
- Use Disqus (embed code)
- Use Facebook Comments
- Use Hyvor Talk
- Skip comments

### Contact Form 7
**Solution**: Use the built-in forms (already better!)

### Yoast SEO
**Solution**: SEO fields are built-in

### Page Builders (Elementor, etc.)
**Challenge**: These won't migrate cleanly
**Solution**: Rebuild pages with Astro components (better anyway!)

---

## 🎓 After Migration

Your checklist:
- [ ] Review all migrated posts
- [ ] Fix formatting issues
- [ ] Update image paths (optional)
- [ ] Set up redirects from old URLs
- [ ] Test all pages
- [ ] Update internal links
- [ ] Configure SEO
- [ ] Deploy!

---

## 📚 Need More Help?

- Check migrated files in `src/content/blog/` and `src/content/pages/`
- Each file is simple markdown
- Edit them like regular text files
- Save and refresh browser to see changes

---

**That's it!** Migration is easier than you think! 🚀

The script does most of the work, you just review and fix little things.

**Got questions?** Just ask! 😊
