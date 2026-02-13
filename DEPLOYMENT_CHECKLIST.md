# ✅ Deployment Checklist - License Server ke Koyeb

Gunakan checklist ini untuk memastikan deployment berjalan lancar.

---

## 📋 Pre-Deployment

### Preparation
- [ ] Code sudah complete dan tested locally
- [ ] Database berjalan dengan baik
- [ ] Admin panel bisa diakses
- [ ] API endpoints sudah tested

### Git Repository
- [ ] GitHub/GitLab account sudah ada
- [ ] Repository sudah dibuat (atau akan dibuat)
- [ ] `.gitignore` sudah ada dan benar
- [ ] File `.env` TIDAK ter-commit

### Files Check
Pastikan file-file ini ada:
- [ ] `package.json` (dengan engines specification)
- [ ] `server.js`
- [ ] `.gitignore`
- [ ] `.dockerignore`
- [ ] `Procfile`
- [ ] `koyeb.yaml` (optional)

### Run Pre-Check
```bash
cd license-server
npm run precheck
```
- [ ] Pre-check passed tanpa error

---

## 🚀 Deployment

### Step 1: Push to GitHub
```bash
cd license-server
git init
git add .
git commit -m "Initial commit - Ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

- [ ] Code ter-push ke GitHub
- [ ] Repository bisa diakses
- [ ] `.env` tidak ter-upload (double check!)

### Step 2: Koyeb Setup
- [ ] Sign up/Login ke https://app.koyeb.com/
- [ ] Connect GitHub account ke Koyeb
- [ ] Koyeb bisa akses repository Anda

### Step 3: Create App
Di Koyeb Dashboard:

**Basic Configuration:**
- [ ] Klik "Create Web Service"
- [ ] Pilih "GitHub" sebagai source
- [ ] Select repository yang benar
- [ ] Service name: `license-server` (atau pilihan Anda)
- [ ] Region: Pilih terdekat (Singapore untuk Asia)

**Build Settings:**
- [ ] Builder: **Buildpack**
- [ ] Build command: `npm install`
- [ ] Run command: `npm start`

**Port Configuration:**
- [ ] Port: `8000`
- [ ] Protocol: `HTTP`

**Health Check:**
- [ ] Path: `/health`

### Step 4: Environment Variables
Set di Koyeb Dashboard → Environment Variables:

**Required:**
- [ ] `PORT` = `8000`
- [ ] `HOST` = `0.0.0.0`
- [ ] `ADMIN_PASSWORD` = `<password-aman-anda>` ⚠️ GANTI!
- [ ] `OFFLINE_TOLERANCE_HOURS` = `24`

**Optional:**
- [ ] `NODE_ENV` = `production`

### Step 5: Deploy!
- [ ] Review semua konfigurasi
- [ ] Klik **"Deploy"**
- [ ] Tunggu build process (~2-5 menit)

---

## 🧪 Post-Deployment Testing

### Get Production URL
- [ ] Salin production URL dari Koyeb Dashboard
- [ ] Format: `https://license-server-xxx.koyeb.app`

### Test Endpoints

**Health Check:**
```bash
curl https://your-app.koyeb.app/health
```
- [ ] Return status 200 OK
- [ ] Response JSON dengan `status: "ok"`

**API Info:**
```bash
curl https://your-app.koyeb.app/
```
- [ ] Return API information
- [ ] List semua endpoints

**Admin Panel:**
- [ ] Buka di browser: `https://your-app.koyeb.app/`
- [ ] Admin panel UI muncul
- [ ] Bisa login dengan `ADMIN_PASSWORD`

**Test License Activation:**
- [ ] Generate license key di admin panel
- [ ] Test activate dari Postman/curl
- [ ] Validate license berjalan

### Check Logs
- [ ] Buka Koyeb Dashboard → Logs
- [ ] Tidak ada error critical
- [ ] Environment validation passed
- [ ] Database initialized

---

## 🔄 Update Client Apps

### Get Production URL
- [ ] Production URL sudah dicatat

### Update Apps
Untuk setiap aplikasi (bms-exe, blm-exe, vcomm-exee):

**Option 1: Environment Variable**
- [ ] Set `LICENSE_SERVER_URL` environment variable
- [ ] Test aplikasi bisa connect

**Option 2: Update Code**
- [ ] Update `SERVER_URL` di `license-manager.js`
- [ ] Rebuild aplikasi

### Test Client Apps
- [ ] BMS-exe bisa connect ke production server
- [ ] BLM-exe bisa connect ke production server
- [ ] VCOMM-exee bisa connect ke production server
- [ ] License activation berhasil dari client apps
- [ ] License validation berhasil

---

## 🔐 Security Check

- [ ] `ADMIN_PASSWORD` bukan default (`admin123`)
- [ ] Password minimal 12 karakter
- [ ] File `.env` tidak di-commit ke Git
- [ ] HTTPS enabled (otomatis di Koyeb)
- [ ] CORS configuration sudah benar

---

## 📊 Monitoring Setup

- [ ] Bookmark Koyeb Dashboard
- [ ] Setup notification (optional)
- [ ] Tahu cara cek logs
- [ ] Tahu cara redeploy

---

## 📝 Documentation

- [ ] Catat production URL di tempat aman
- [ ] Catat admin password di password manager
- [ ] Simpan dokumentasi deployment
- [ ] Share URL ke team (jika ada)

---

## 🎯 Optional: Advanced Setup

### Custom Domain (Optional)
- [ ] Beli custom domain
- [ ] Configure DNS records
- [ ] Add domain di Koyeb
- [ ] SSL certificate active

### Database Persistence (Recommended for Production)
- [ ] Setup Koyeb persistent volume, atau
- [ ] Migrate ke PostgreSQL/MySQL

### Monitoring & Analytics
- [ ] Setup uptime monitoring (UptimeRobot, etc)
- [ ] Setup error tracking (Sentry, etc)
- [ ] Analytics untuk API usage

---

## ✅ Final Checklist

- [ ] ✅ License server deployed dan running
- [ ] ✅ Production URL accessible
- [ ] ✅ Admin panel working
- [ ] ✅ Client apps connected
- [ ] ✅ License system end-to-end tested
- [ ] ✅ Documentation updated
- [ ] ✅ Team informed (if applicable)

---

## 🎉 Deployment Complete!

**Production URL:** `https://your-app.koyeb.app`  
**Admin Panel:** `https://your-app.koyeb.app/`  
**API Docs:** Lihat `API_DOCUMENTATION.md`

---

## 🆘 Need Help?

- **Deployment Issues:** Lihat `DEPLOYMENT.md`
- **Environment Variables:** Lihat `ENV_VARIABLES.md`
- **Client Updates:** Lihat `UPDATE_CLIENTS.md`
- **Koyeb Docs:** https://www.koyeb.com/docs
- **Community:** https://community.koyeb.com/

**Happy Deploying! 🚀**
