# 🚀 How to Use Your Portfolio

## ✅ Viewing Your Portfolio

**To see your portfolio:**
1. Navigate to `/Users/vyom/Desktop/Portfolio website/`
2. **Double-click on `index.html`** - This will open it in your default browser
3. OR right-click `index.html` → Open With → Choose your browser (Chrome, Safari, Firefox)

**Your portfolio is now live locally!** 🎉

---

## 📝 What Has Been Updated

### ✅ Real Social Media Links
- **GitHub**: https://github.com/vyomshah14
- **LinkedIn**: https://www.linkedin.com/in/vyom-shah-007632290/
- **Instagram**: https://www.instagram.com/_vyom_shah

All pages now have your correct links in:
- Hero section (Home page)
- Footer (All pages)
- Contact page social section

### ✅ Realistic Statistics
Changed from inflated numbers to realistic starter stats:
- ~~50+ Projects~~ → **10+ Projects Built**
- ~~100+ Technologies~~ → **15+ Technologies Learned**
- ~~1000+ Hours~~ → **500+ Hours of Coding**

---

## 🎨 Pages in Your Portfolio

1. **index.html** - Home page with hero section
2. **about.html** - About you page
3. **skills.html** - Your technical skills
4. **projects.html** - Your project showcase
5. **experience.html** - Work experience timeline
6. **education.html** - Education & certifications
7. **contact.html** - Contact form and info

---

## ✏️ How to Customize

### Update Your Email
**File**: `contact.html`
**Line**: 75

Change:
```html
<a href="mailto:vyom.shah@example.com">vyom.shah@example.com</a>
```

To your real email:
```html
<a href="mailto:your.email@gmail.com">your.email@gmail.com</a>
```

### Add Real Projects
**File**: `projects.html`

1. Find a project card (starts around line 60)
2. Update:
   - Project title
   - Project description
   - Technology tags
   - Project links (GitHub repo, live demo)
3. You can delete the sample projects and add your own

**Tip**: Keep 1 sample project as a template, then duplicate and modify it!

### Update Skills
**File**: `skills.html`

1. Find the skills you actually know
2. Update the percentage (be honest!)
3. Remove skills you don't know
4. Add new skills by copying the format

Example:
```html
<div class="skill-item">
    <div class="skill-info">
        <span class="skill-name">JavaScript</span>
        <span class="skill-percentage">75%</span>
    </div>
    <div class="skill-bar">
        <div class="skill-progress" style="width: 75%"></div>
    </div>
</div>
```

### Update Experience
**File**: `experience.html`

The current experience is placeholder data. You can:
1. Delete all timeline items
2. Add your real internships/jobs
3. Or keep it empty until you have experience to add

### Update Education
**File**: `education.html`

1. Update your actual degree/school
2. Remove fake certifications
3. Add real ones as you earn them

---

## 🎯 Next Steps

### 1. Clean Up Placeholder Content
- [ ] Remove fake projects from `projects.html`
- [ ] Remove fake experience from `experience.html`
- [ ] Update education with your real school
- [ ] Remove fake certifications

### 2. Add Your Real Content
- [ ] Add your actual email in `contact.html`
- [ ] Add your real projects (even small ones!)
- [ ] Update skills with what you actually know
- [ ] Add your real education details

### 3. Test Everything
- [ ] Click all navigation links
- [ ] Test the contact form
- [ ] Check all social media links open correctly
- [ ] View on mobile (resize browser window)

---

## 🌐 Deploying Online (When Ready)

### Option 1: GitHub Pages (FREE!)
1. Create a new repository on GitHub
2. Upload all your portfolio files
3. Go to Settings → Pages
4. Select main branch
5. Your site will be live at `https://vyomshah14.github.io/portfolio`

### Option 2: Netlify (FREE!)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your "Portfolio website" folder
3. Done! You'll get a free URL

### Option 3: Vercel (FREE!)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy with one click

---

## 💡 Tips

1. **Start Small**: Don't worry if you don't have 10 projects yet. Add what you have!
2. **Be Honest**: Better to show 2 real projects than 10 fake ones
3. **Update Regularly**: Add new projects and skills as you learn
4. **Get Feedback**: Share with friends and ask for their opinion
5. **Keep Learning**: Your portfolio will grow as you do!

---

## 🐛 Common Issues

### Portfolio looks broken?
- Make sure all files are in the same folder
- Check that `styles/main.css` and `scripts/main.js` exist
- Try opening in a different browser

### Links not working?
- Make sure you're clicking on `index.html` to start
- Navigation should work between all pages

### Want to change colors?
- Open `styles/main.css`
- Look for `:root` section at the top
- Change the color values (search for hex codes like `#6366f1`)

---

## 📧 Need Help?

If you need to make changes and aren't sure how:
1. Open the file in a text editor (VS Code, Sublime, etc.)
2. Use Ctrl+F (Cmd+F on Mac) to search for the text you want to change
3. Make small changes and test by refreshing your browser

---

**Remember**: This is YOUR portfolio. Make it reflect who you are! 🌟

Good luck! 🚀
