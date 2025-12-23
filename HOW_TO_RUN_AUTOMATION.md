# 🔐 How to Run the Automation Script - SECURE INSTRUCTIONS

## ⚠️ Security Notice

The script uses your Strapi API token. **NEVER commit your API token to git!** It should only be set as an environment variable.

---

## 🚀 Where to Run

Run this script from your **local machine** (your computer), in the project root directory.

**You need:**
- Node.js installed
- Your Strapi API token
- Internet connection to reach your Strapi instance

---

## 📝 Step-by-Step Instructions

### Step 1: Open Terminal/PowerShell

- **Windows**: Press `Win + X`, then click "Terminal" or "PowerShell"
- **Mac/Linux**: Open Terminal

### Step 2: Navigate to Project Directory

```bash
cd d:\district-interiors-bloom-main
```

### Step 3: Set Your API Token (SECURE - Not saved to disk)

**Windows PowerShell:**
```powershell
$env:STRAPI_API_TOKEN="your-actual-token-here"
```

**Windows CMD:**
```cmd
set STRAPI_API_TOKEN=your-actual-token-here
```

**Mac/Linux:**
```bash
export STRAPI_API_TOKEN="your-actual-token-here"
```

**⚠️ IMPORTANT:** 
- Replace `your-actual-token-here` with your REAL API token
- This token is only stored in memory (your current terminal session)
- It will NOT be saved to any file
- It will disappear when you close the terminal

### Step 4: (Optional) Set Strapi URL

If your Strapi URL is different from `https://admin.districtflowers.com`:

**Windows PowerShell:**
```powershell
$env:NEXT_PUBLIC_STRAPI_URL="https://your-strapi-url.com"
```

**Windows CMD:**
```cmd
set NEXT_PUBLIC_STRAPI_URL=https://your-strapi-url.com
```

**Mac/Linux:**
```bash
export NEXT_PUBLIC_STRAPI_URL="https://your-strapi-url.com"
```

### Step 5: Run the Script

```bash
node auto-fix-client-logos-complete-auto.js
```

---

## 🔐 How to Get Your API Token

### Option 1: From Strapi Admin

1. Go to: https://admin.districtflowers.com/admin
2. Login to Strapi
3. Go to: **Settings** → **API Tokens**
4. Find an existing token OR create a new one
5. Copy the token value

### Option 2: From Coolify Environment Variables

1. Go to your Coolify dashboard
2. Find your Strapi (CMS) service
3. Go to **Configuration** → **Environment Variables**
4. Find `STRAPI_API_TOKEN`
5. Copy the value

---

## ✅ What the Script Does (Safely)

The script will:
1. ✅ Check if `row2Logos` field exists (read-only check)
2. ✅ Create/update content in Strapi (uses your API token for authentication)
3. ✅ Publish the content
4. ✅ Set public API permissions (read-only access for frontend)

**It will NOT:**
- ❌ Modify your database directly
- ❌ Delete any existing content
- ❌ Change your Strapi configuration
- ❌ Access anything outside of the Client Logos Section

---

## 🔒 Security Best Practices

1. ✅ **Never commit tokens to git** - The script now requires environment variables only
2. ✅ **Use environment variables** - Tokens are stored in memory, not files
3. ✅ **Token scope** - Make sure your API token only has the permissions it needs
4. ✅ **Rotate tokens** - If you suspect a token is compromised, generate a new one
5. ✅ **Delete terminal history** - After running, you can clear your terminal to remove token from history

---

## 🛡️ What Permissions Does the Script Need?

Your API token needs these permissions:
- ✅ `client-logos-section` - **find** (read content)
- ✅ `client-logos-section` - **findOne** (read single content)
- ✅ `client-logos-section` - **update** (create/update content)
- ✅ `client-logos-section` - **publish** (publish content)
- ✅ `users-permissions` - **read roles** (check permissions)
- ✅ `users-permissions` - **update roles** (set permissions)

---

## 📋 Full Example (Windows PowerShell)

```powershell
# Navigate to project
cd d:\district-interiors-bloom-main

# Set API token (replace with your actual token)
$env:STRAPI_API_TOKEN="96e3fa22f3c9ac6102a529567b66534cd092945332b874bc1e77a1e617ee6e65a61d153cc2a445aa02bbb489417d96d365cb487b79c484d92cdd2d745dfe475e8504de03fd9978e1beb1ae61cf2b4f4274bf473637a124d0b3fab65de7436d7fef7f61957a5c5a52beb3c6dfcdcf807622d5fb6d658d364d85875307a39db96b"

# (Optional) Set Strapi URL if different
$env:NEXT_PUBLIC_STRAPI_URL="https://admin.districtflowers.com"

# Run the script
node auto-fix-client-logos-complete-auto.js

# After running, you can clear the token from memory:
$env:STRAPI_API_TOKEN=""
```

---

## ❓ Troubleshooting

### "STRAPI_API_TOKEN environment variable is required"
- You forgot to set the environment variable
- Make sure you set it in the SAME terminal window where you run the script
- See Step 3 above

### "HTTP 401: Unauthorized"
- Your API token is incorrect or expired
- Get a new token from Strapi Admin
- Make sure you copied the entire token (they're very long)

### "HTTP 403: Forbidden"
- Your API token doesn't have the right permissions
- Check token permissions in Strapi Admin → Settings → API Tokens
- Make sure it has permissions for `client-logos-section`

### "Could not connect"
- Check your internet connection
- Verify the Strapi URL is correct
- Make sure Strapi is running and accessible

---

## ✅ After Running

1. Check the output - it will tell you what was done
2. The script will show ✅ for successful steps
3. If `row2Logos` field doesn't exist, the script will tell you (frontend will still work)
4. Check your frontend: https://web.districtflowers.com/interiors

---

## 🔐 Clearing Your Token After Use

**Windows PowerShell:**
```powershell
$env:STRAPI_API_TOKEN=""
```

**Windows CMD:**
```cmd
set STRAPI_API_TOKEN=
```

**Mac/Linux:**
```bash
unset STRAPI_API_TOKEN
```

Or simply close the terminal window - the token will be gone from memory.

