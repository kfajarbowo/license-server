# 🚀 Panduan Deploy ke Koyeb

## Persiapan

### 1. Push Code ke Git Repository
Pastikan code sudah di-push ke GitHub/GitLab:
```bash
git init
git add .
git commit -m "Initial commit - License Server"
git remote add origin <your-repository-url>
git push -u origin main
```

### 2. Setup Koyeb Account
1. Buka https://www.koyeb.com/
2. Sign up menggunakan GitHub account (recommended)
3. Free tier sudah cukup untuk mulai

## Deployment Steps

### Step 1: Create New App di Koyeb

1. Login ke Koyeb Dashboard
2. Klik **"Create App"**
3. Pilih **"Deploy a GitHub Repository"**

### Step 2: Connect Repository

1. Authorize Koyeb untuk akses GitHub repository Anda
2. Pilih repository `eyesee-exe` atau repository tempat code berada
3. Klik **"Configure"**

### Step 3: Configure Build Settings

**Service Configuration:**
- **Name**: `license-server` (atau nama yang Anda inginkan)
- **Region**: Pilih region terdekat (Singapore/Frankfurt untuk Asia)
- **Branch**: `main` (atau branch yang Anda gunakan)
- **Build**: 
  - Builder: **Docker** atau **Buildpack** (pilih Buildpack untuk Node.js)
  - Working Directory: `/license-server` (jika license-server ada di subfolder)

**Build Command:**
```bash
npm install
```

**Run Command:**
```bash
npm start
```

### Step 4: Configure Environment Variables

Tambahkan environment variables ini di Koyeb:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `PORT` | `8000` | Port yang akan digunakan (Koyeb expose port 8000) |
| `HOST` | `0.0.0.0` | Host binding |
| `ADMIN_PASSWORD` | `<your-secure-password>` | Password untuk admin panel |
| `OFFLINE_TOLERANCE_HOURS` | `24` | Toleransi offline dalam jam |
| `NODE_ENV` | `production` | Environment mode |

**PENTING**: Ganti `ADMIN_PASSWORD` dengan password yang aman!

### Step 5: Configure Port

- **Port**: `8000` (default Koyeb port)
- **Protocol**: `HTTP`
- **Health Check Path**: `/health`

### Step 6: Deploy

1. Review semua konfigurasi
2. Klik **"Deploy"**
3. Tunggu proses build dan deployment (~2-5 menit)

## Post-Deployment

### Mendapatkan Public URL

Setelah deployment berhasil, Koyeb akan memberikan URL seperti:
```
https://<app-name>-<random-id>.koyeb.app
```

### Testing API

Test menggunakan curl atau Postman:

1. **Health Check**
```bash
curl https://your-app.koyeb.app/health
```

2. **API Endpoints**
```bash
# Get license info
curl https://your-app.koyeb.app/

# Validate license (contoh)
curl https://your-app.koyeb.app/api/license/validate/HARDWARE_ID_HERE
```

### Update Client Applications

Setelah deploy, update URL di aplikasi client Anda (bms-exe, blm-exe, vcomm-exee):
- Update `LICENSE_SERVER_URL` di file konfigurasi
- Ganti dari `http://localhost:3000` ke `https://your-app.koyeb.app`

## Monitoring & Maintenance

### Melihat Logs
1. Di Koyeb Dashboard
2. Pilih app Anda
3. Tab **"Logs"** untuk melihat real-time logs

### Update Code
Setiap kali push ke Git:
```bash
git add .
git commit -m "Update"
git push
```

Koyeb akan otomatis rebuild dan redeploy!

### Database Persistence

⚠️ **PENTING**: SQLite database di Koyeb akan reset setiap deployment!

**Solusi untuk Production:**
1. Gunakan external database (PostgreSQL/MySQL)
2. Atau, setup volume persistence di Koyeb (lihat Koyeb documentation)
3. Atau, backup database secara berkala

## Troubleshooting

### Build Failed
- Cek logs untuk error message
- Pastikan `package.json` sudah benar
- Pastikan semua dependencies ter-install

### App Crashed
- Cek environment variables sudah lengkap
- Cek PORT sudah sesuai (8000)
- Review logs untuk error messages

### Database Issues
- Pastikan folder `data/` dan `database/` ada
- Mungkin perlu migration script

## Security Checklist

✅ Ganti `ADMIN_PASSWORD` dengan password yang kuat  
✅ File `.env` tidak ter-commit ke Git  
✅ CORS configuration sudah sesuai  
✅ Rate limiting (optional, tapi recommended)  
✅ HTTPS enabled (otomatis di Koyeb)  

## Custom Domain (Optional)

Jika ingin custom domain:
1. Di Koyeb Dashboard → App Settings
2. Tab **"Domains"**
3. Add custom domain
4. Update DNS records sesuai instruksi

---

**Need Help?**
- Koyeb Docs: https://www.koyeb.com/docs
- Koyeb Community: https://community.koyeb.com/
