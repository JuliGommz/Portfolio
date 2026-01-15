# Deployment Checklist

## ✅ Pre-Deployment

### **1. Content Verification**
- [ ] All project descriptions accurate and complete
- [ ] Email address correct: `internship@juliangomez.de`
- [ ] Phone number correct: `+49 176 22057364`
- [ ] LinkedIn URL works: [linkedin.com/in/julian-gomez-hd](https://linkedin.com/in/julian-gomez-hd)
- [ ] GitHub URL works: [github.com/JuliGommz](https://github.com/JuliGommz)
- [ ] All project data in `js/main.js` reviewed

### **2. Media Files**
- [ ] Add project thumbnails to `media/images/`
- [ ] Add project screenshots to `media/images/`
- [ ] Add videos to `media/videos/` OR configure embeds
- [ ] Update gallery placeholder code in `js/main.js` with real paths
- [ ] Optimize all images (compress to < 500KB each)
- [ ] Optimize all videos (compress to < 50MB each)

### **3. Testing**
- [ ] Test locally first (open `index.html` in browser)
- [ ] Check all 8 project modals open correctly
- [ ] Verify modal gallery displays correctly
- [ ] Test on mobile (responsive design)
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Check all links work (email, LinkedIn, GitHub)
- [ ] Verify filter buttons work (pillar filtering)
- [ ] Test keyboard navigation (ESC closes modal)
- [ ] Check console for JavaScript errors (F12 → Console)

### **4. Performance**
- [ ] Total page size < 5MB (including all media)
- [ ] Images optimized (use TinyPNG or similar)
- [ ] Videos compressed (or use embeds)
- [ ] Test page load speed (Google PageSpeed Insights)

---

## 📤 Strato.de FTP Upload

### **Step 1: Prepare FTP Client**
- Download FileZilla (free FTP client)
- Get Strato FTP credentials:
  - Hostname: (from Strato)
  - Username: (from Strato)
  - Password: (from Strato)
  - Port: 21 (standard FTP)

### **Step 2: Connect to Server**
1. Open FileZilla
2. Enter credentials
3. Click "Quickconnect"
4. Navigate to web root directory (usually `/` or `/html`)

### **Step 3: Upload Files**
Upload folder contents maintaining structure:
```
yoursite.com/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── media/
    ├── images/
    └── videos/
```

**IMPORTANT:** Upload the *contents* of `portfolio-julian-gomez` folder, not the folder itself.

### **Step 4: Set Permissions**
- Files: 644 (rw-r--r--)
- Folders: 755 (rwxr-xr-x)
(FileZilla: Right-click → File permissions)

### **Step 5: Verify Upload**
- [ ] Visit your domain in browser
- [ ] Check homepage loads
- [ ] Test all modal buttons
- [ ] Verify images/videos display
- [ ] Check mobile view

---

## 🔧 Post-Deployment

### **1. SEO & Analytics**
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Analytics (optional)
- [ ] Test meta tags: [metatags.io](https://metatags.io)
- [ ] Check page speed: [PageSpeed Insights](https://pagespeed.web.dev)

### **2. Domain Configuration**
- [ ] Verify domain points to correct directory
- [ ] Test `www` and non-`www` versions
- [ ] Add SSL certificate (HTTPS) if available
- [ ] Test on different devices

### **3. Maintenance**
- [ ] Bookmark portfolio URL for reference
- [ ] Keep source files backed up
- [ ] Document any custom changes
- [ ] Plan regular content updates

---

## 🆘 Troubleshooting

### **Problem: CSS/JS not loading**
- Check file paths in `index.html`
- Verify folder structure on server matches local
- Check file permissions (644 for files)
- Clear browser cache (Ctrl+F5)

### **Problem: Images not displaying**
- Verify images uploaded to correct folder
- Check image file names match code
- Test image URLs directly in browser
- Verify file extensions (.jpg, .png, not .JPG)

### **Problem: Modals not opening**
- Check browser console for JavaScript errors (F12)
- Verify `main.js` uploaded correctly
- Clear cache and reload
- Check if JavaScript is enabled in browser

### **Problem: Mobile layout broken**
- Test viewport meta tag in `<head>`
- Check CSS media queries
- Verify responsive images loading
- Test on actual mobile device, not just browser resize

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors (F12 → Console)
2. Verify all files uploaded correctly
3. Test locally first to isolate server issues
4. Contact Strato support for server-specific issues

---

**Good luck with your deployment! 🚀**
