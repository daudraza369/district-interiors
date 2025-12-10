# 🚀 Simple Start Guide - Just Follow These Steps

## Step 1: Open TWO Terminal Windows

You need **2 separate terminal windows** running at the same time.

---

## Terminal 1: Start Strapi (CMS Backend)

**In your FIRST terminal window, type these commands one by one:**

```powershell
cd D:\district-interiors-bloom-main\apps\cms
npm install --legacy-peer-deps
npm run develop
```

**Wait for:**
- You see "Server started" message
- Browser opens to `http://localhost:1337/admin`
- **DON'T CLOSE THIS TERMINAL** - keep it running!

**Then:**
- Fill in the registration form in the browser
- Create your admin account
- You're done with Terminal 1!

---

## Terminal 2: Start Next.js (Frontend)

**Open a NEW terminal window** (don't close Terminal 1!)

**In your SECOND terminal window, type these commands:**

```powershell
cd D:\district-interiors-bloom-main\apps\web
npm install --legacy-peer-deps
npm run dev
```

**Wait for:**
- You see "Ready" message
- It says something like "Local: http://localhost:3000"
- **DON'T CLOSE THIS TERMINAL** - keep it running!

---

## Step 3: Open Your Website

**Open your browser and go to:**
```
http://localhost:3000
```

**That's it! Your website is running!** 🎉

---

## What You Should See

- **Terminal 1**: Strapi running (showing logs)
- **Terminal 2**: Next.js running (showing logs)
- **Browser**: Your website at `http://localhost:3000`

---

## If Something Goes Wrong

### Strapi won't start?
- Check if PostgreSQL is running
- Make sure `.env` file exists in `apps/cms` folder
- Check the error message in Terminal 1

### Next.js won't start?
- Make sure Strapi is running first
- Check if port 3000 is already in use
- Check the error message in Terminal 2

### Website shows errors?
- Make sure BOTH terminals are running
- Check browser console (F12) for errors
- Make sure Strapi is accessible at `http://localhost:1337`

---

## Quick Commands Reference

**Terminal 1 (Strapi):**
```powershell
cd D:\district-interiors-bloom-main\apps\cms
npm run develop
```

**Terminal 2 (Next.js):**
```powershell
cd D:\district-interiors-bloom-main\apps\web
npm run dev
```

---

## That's It!

Just keep both terminals open and your website will keep running. 

To stop:
- Press `Ctrl + C` in each terminal
- Or just close the terminal windows

