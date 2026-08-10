# Purvaa Tours & Travels - Static Website Deployment Guide

## Overview
This website has been converted to a clean static site structure, optimized for Hostinger deployment. All inline CSS and JavaScript have been externalized, and all assets have been organized in a standard folder structure.

---

## Directory Structure

```
outputs/
├── index.html                          # Homepage (entry point)
├── about.html                          # About Us page
├── contact.html                        # Contact page
├── gallery.html                        # Gallery page
├── our-tours.html                      # Tours listing page
├── privacy-policy.html                 # Privacy Policy
├── terms-conditions.html               # Terms & Conditions
├── assets/
│   ├── css/
│   │   └── style.css                  # All styles (1006 lines)
│   ├── js/
│   │   └── script.js                  # Shared React components (174 lines)
│   ├── images/
│   │   ├── logo/                      # Logo files
│   │   ├── tour-images/               # Tour package images (39 files)
│   │   ├── gallery-*.jpeg             # Gallery images (17 files)
│   │   ├── destination-images/        # Destination images (10 files)
│   │   ├── hero-section-images/       # Hero section images (5 files)
│   │   ├── corporate-logos/           # Partner logos (8 files)
│   │   └── *.png                      # Icon files
│   ├── fonts/                         # Reserved for custom fonts (optional)
│   └── icons/                         # Reserved for custom icons (optional)
```

---

## Key Features

✓ **Externalized CSS**: All styles consolidated in `assets/css/style.css`
✓ **Externalized JavaScript**: React components in `assets/js/script.js`
✓ **Organized Assets**: All images in `assets/images/` with subdirectories
✓ **Responsive Design**: Full mobile, tablet, and desktop support
✓ **React-based**: Uses React 18 via CDN for dynamic functionality
✓ **No Broken Links**: All internal links updated to relative paths
✓ **Image Optimization**: All images organized and accessible

---

## What's Included

### HTML Pages (7 main files)
1. **index.html** - Homepage with hero, destinations, and tours
2. **about.html** - About Us page with company story
3. **contact.html** - Contact form and location information
4. **gallery.html** - Image gallery with lightbox
5. **our-tours.html** - Tours catalog and listings
6. **privacy-policy.html** - Privacy policy terms
7. **terms-conditions.html** - Terms & conditions

### Styling
- **style.css** (1006 lines)
  - Global reset and typography
  - Navigation and footer styles
  - All page-specific styles
  - Responsive breakpoints (1100px, 900px, 768px, 480px)
  - Animations and transitions
  - Form styles and buttons
  - Gallery and grid layouts

### JavaScript
- **script.js** (174 lines)
  - React hooks: `useInView`, `useCountUp`, `useNavShadow`
  - SVG icons: Phone, Facebook, Instagram
  - Enquiry Modal component
  - Navbar component with navigation links
  - Footer component with links
  - Reveal animation component
  - Global modal state handler

### Assets
- **Images**: 120+ image files organized by category
- **Fonts**: Google Fonts integration (Playfair Display, DM Sans)
- **Colors**: Brand colors - Purple (#432267), Yellow (#FEED01)

---

## How to Deploy to Hostinger

### Method 1: File Manager (Recommended)

1. **Login to Hostinger Control Panel**
2. **Go to File Manager**
3. **Navigate to `public_html` folder**
4. **Upload all files maintaining directory structure:**
   ```
   public_html/
   ├── index.html
   ├── about.html
   ├── contact.html
   ├── gallery.html
   ├── our-tours.html
   ├── privacy-policy.html
   ├── terms-conditions.html
   └── assets/
       ├── css/style.css
       ├── js/script.js
       └── images/[all image folders and files]
   ```

5. **Set index.html as default page** (usually automatic)
6. **Test all links**: Visit https://yourdomain.com

### Method 2: FTP Upload

1. **Connect via FTP** using Hostinger credentials
2. **Upload to `public_html/` directory**
3. **Maintain exact folder structure**
4. **Verify file permissions** (usually 644 for files, 755 for folders)

### Method 3: Git Deploy (if available)

1. **Push to GitHub repository**
2. **Connect Hostinger to GitHub**
3. **Auto-deploy on push**

---

## Important Notes

- **No Build Process Required**: This is a pure static HTML/CSS/JS website
- **React via CDN**: No Node.js or build tools needed
- **Relative Paths**: All paths use `./` for relative linking (works on any domain)
- **Images**: Keep all images in `assets/images/` structure
- **Fonts**: Uses Google Fonts (no local font files needed)
- **Responsive**: Automatic on all devices - no separate mobile version needed

---

## Verification Checklist

Before going live:

- [ ] All 7 HTML pages are uploaded
- [ ] `assets/css/style.css` is in place
- [ ] `assets/js/script.js` is in place
- [ ] All image subdirectories exist with their files
- [ ] Navigation links between pages work
- [ ] Logo links return to index.html
- [ ] Form submission works (opens WhatsApp)
- [ ] Images load correctly
- [ ] Responsive design works on mobile
- [ ] No console errors in browser DevTools
- [ ] All Google Fonts load correctly

---

## Troubleshooting

### Images Not Loading
- Check that image paths start with `./assets/images/`
- Verify image files are in correct subdirectories
- Check file permissions (should be readable)

### Styles Not Applying
- Verify `./assets/css/style.css` link exists in HTML
- Check browser cache (Ctrl+Shift+Del to clear)
- Ensure no duplicate style rules

### JavaScript Not Working
- Verify `./assets/js/script.js` is loaded after React CDN
- Check browser console for JavaScript errors
- Ensure jQuery/dependencies aren't conflicting

### Forms Not Submitting
- Check WhatsApp link is correct (+91 98692 72960)
- Verify phone number format
- Test on mobile and desktop

---

## Performance Optimization Tips

- Minify CSS/JS (optional, not critical for this size)
- Enable gzip compression in Hostinger settings
- Set up browser caching headers
- Optimize images further if needed
- Use CDN for static assets (Hostinger may provide)

---

## Support & Maintenance

- All code is documented and self-explanatory
- No external dependencies (except React via CDN)
- Easy to update content in HTML files
- Easy to modify styles in CSS file
- Mobile-responsive by default

---

## Contact Information

- **Phone**: +91 98692 72960
- **Email**: info.purvaatravels@gmail.com
- **Address**: Sitaram Niwas, 4, Shivadarshan Path, Nardas Nagar, W, Bhandup West, Mumbai, Maharashtra 400078
- **Domain**: https://purvaatravels.com

---

**Deployment Date**: August 11, 2026
**Status**: Ready for Production
