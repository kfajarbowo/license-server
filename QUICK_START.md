# 🚀 Quick Start - Deploy ke Koyeb

## Ringkasan 3 Langkah Cepat

### 1️⃣ Push ke GitHub
```bash
cd license-server
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git push -u origin main
```

### 2️⃣ Setup di Koyeb
1. Buka https://app.koyeb.com/
2. Sign in dengan GitHub
3. Klik **"Create Web Service"**
4. Pilih **"GitHub"** → Select repository
5. **Service Name**: `license-server`
6. **Region**: Singapore (atau terdekat)
7. **Build Configuration**:
   - Builder: **Buildpack**
   - Build command: `npm install`
   - Run command: `npm start`
8. **Port**: `8000`

### 3️⃣ Set Environment Variables
Di Koyeb Dashboard, tambahkan:
- `ADMIN_PASSWORD` = `<password_aman_anda>`
- `PORT` = `8000`
- `OFFLINE_TOLERANCE_HOURS` = `24`

Klik **Deploy** → Tunggu ~3 menit ✅

---

## 📡 URL Public API Anda

Setelah deploy, URL akan seperti:
```
https://license-server-xxx.koyeb.app
```

### Test API:
```bash
# Health check
curl https://your-app.koyeb.app/health

# Get API info
curl https://your-app.koyeb.app/
```

---

## 🔧 Update Client Apps

Update URL di client apps (bms-exe, blm-exe, vcomm-exee):

**File yang perlu diupdate:**
- `src/license/index.js` atau sejenisnya
- Cari `LICENSE_SERVER_URL` atau endpoint URL
- Ganti dari `http://localhost:3000` → `https://your-app.koyeb.app`

---

## ⚠️ Penting: Database Persistence

SQLite akan reset setiap redeploy! Ada 2 opsi:

**Opsi 1: Gunakan Koyeb Persistent Storage**
1. Di Koyeb, tambahkan persistent volume
2. Mount ke `/data` atau `/database`
3. Database akan persist

**Opsi 2: Migrate ke PostgreSQL/MySQL**
(Recommended untuk production)

---

## 📊 Monitoring

**View Logs:**
Koyeb Dashboard → Your App → Logs tab

**Auto-Redeploy:**
Setiap `git push` akan trigger auto-redeploy!

---

**Need detailed guide?** → Lihat `DEPLOYMENT.md`
