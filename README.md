# Julian Gomez - Portfolio Website

**Learning Experience Designer & Creative Producer**

Portfolio website showcasing expertise in:
- Learning Experience Design
- Game Design & Creative Production
- Organizational Development
- AI-Assisted Prototyping

🌐 **Live:** [juliangomez.de](https://juliangomez.de)

---

## 📁 Project Structure

```
portfolio/
├── index.html              # German version (main)
├── index-en.html           # English version
├── css/
│   └── styles.css          # Complete stylesheet (1434 lines)
├── js/
│   └── main.js             # Vanilla JavaScript (545 lines)
├── media/
│   └── images/             # WebP optimized images (22 files)
└── README.md               # This file
```

---

## 🚀 Deployment Instructions

### **Strato.de FTP Upload**

1. Connect to Strato FTP server
2. Navigate to your web directory (usually `/` or `/html`)
3. Upload the following files and folders:
   - `index.html`
   - `index-en.html`
   - `css/` folder
   - `js/` folder
   - `media/` folder
4. Verify at: `https://juliangomez.de/`

### **Local Testing (XAMPP)**

1. Place folder in `C:\xampp\htdocs\webspace\portfolio\`
2. Start Apache server in XAMPP Control Panel
3. Visit: `http://localhost/webspace/portfolio/`

### **Alternative Local Server**

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

---

## ✅ Features

### **Design & UX**
- ✅ Fully responsive (mobile-first design)
- ✅ Clean, professional aesthetic with warm color palette
- ✅ Smooth animations and transitions
- ✅ Accessible (keyboard navigation, ARIA labels, semantic HTML)

### **Functionality**
- ✅ Bilingual support (German/English)
- ✅ Interactive lightbox for images and Vimeo videos
- ✅ Responsive navigation with mobile hamburger menu
- ✅ Smooth scroll navigation
- ✅ Collapsible project sections

### **Technical**
- ✅ WebP optimized images for fast loading
- ✅ Vimeo video embeds with responsive aspect ratios
- ✅ Zero dependencies (vanilla JavaScript)
- ✅ SEO-optimized meta tags and Open Graph
- ✅ Security headers configured
- ✅ No build process required

---

## 🎨 Featured Projects

1. **mind.set.play (2019)** - Corporate culture transformation board game
2. **Journey (2024)** - Contemplative first-person mindfulness experience
3. **Gourmet Invader (2024)** - JavaScript game teaching project management
4. **Chest Quest (2024)** - Unity 2D game with AI-assisted development
5. **Showroom TANGO (2025)** - Motion design title sequence

---

## 🔧 Customization Guide

### **Update Content**
Edit `index.html` (German) or `index-en.html` (English) directly.

### **Change Colors**
Edit `css/styles.css` → `:root` CSS variables (lines 14-50):
```css
--color-primary: #2B2621;    /* Dark brown */
--color-accent: #8B7355;     /* Warm brown */
--color-background: #FAF8F5; /* Warm white */
```

### **Modify Typography**
Current fonts (loaded from Google Fonts CDN):
- **Poppins** (headings, serif style)
- **Inter** (body text, sans-serif)

Change in `css/styles.css` (lines 28-29) and `index.html` (line 30).

### **Add/Update Images**
1. Convert images to WebP format for optimization
2. Place in `media/images/` folder
3. Update `src` attributes in HTML
4. Recommended naming: `project-name-#.webp`

### **Update Vimeo Videos**
1. Upload video to Vimeo
2. Get embed code from Vimeo
3. Update `<iframe>` in project gallery sections
4. Use responsive container with appropriate aspect ratio padding:
   - 16:9 → `padding: 56.25% 0 0 0`
   - 4:3 → `padding: 75% 0 0 0`

---

## 📧 Contact Information

**Email:** internship@juliangomez.de
**LinkedIn:** [linkedin.com/in/julian-gomez-hd](https://linkedin.com/in/julian-gomez-hd)
**GitHub:** [github.com/JuliGommz](https://github.com/JuliGommz)

---

## 📝 Technical Stack

| Technology | Details |
|------------|---------|
| **HTML5** | Semantic markup, bilingual structure |
| **CSS3** | Custom properties, Grid/Flexbox, responsive design |
| **JavaScript** | Vanilla ES6+ (no frameworks) |
| **Fonts** | Google Fonts: Poppins & Inter |
| **Images** | WebP format (optimized) |
| **Videos** | Vimeo embeds (responsive) |
| **Build** | None required (static site) |

---

## 🛠️ Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

---

## 📊 Performance

- **Images:** WebP format (50-80% smaller than JPG/PNG)
- **Fonts:** Google Fonts CDN with `preconnect` optimization
- **JavaScript:** No external dependencies, minimal DOM manipulation
- **CSS:** Optimized with CSS custom properties
- **Total deployable size:** ~2-5MB (with optimized images)

---

## 🔄 Recent Updates

### **v2.0 (February 2026)**
- ✅ Migrated all images from JPG/PNG to WebP format
- ✅ Added English language version (index-en.html)
- ✅ Fixed Tango video aspect ratio and vertical displacement
- ✅ Added thumbnail borders to mini-galleries
- ✅ Updated contact section with internship availability
- ✅ Removed large video files (migrated to Vimeo)
- ✅ CSS improvements for video container handling
- ✅ Bold formatting for key internship text

### **v1.0 (November 2025)**
- 🎉 Initial portfolio launch
- ✅ Project showcase structure
- ✅ Responsive design implementation
- ✅ Lightbox gallery functionality

---

## 🚧 Known Issues & Fixes

### **Git Line Endings Warning**
```
warning: LF will be replaced by CRLF
```
This is normal on Windows. Git automatically converts line endings. No action needed.

### **Large Archive Folder**
The `Archive/` folder contains backup files and is excluded from deployment via `.gitignore`. Don't upload to production server.

---

**Version:** 2.0
**Last Updated:** February 2026
**Author:** Julian Gomez
**License:** Personal Portfolio - All Rights Reserved
