# 🔐 Environment Variables untuk Koyeb

## ⚡ Quick Copy-Paste

Set environment variables ini di **Koyeb Dashboard → App → Settings → Environment Variables**:

```
PORT=8000
HOST=0.0.0.0
NODE_ENV=production
OFFLINE_TOLERANCE_HOURS=24
ADMIN_PASSWORD=GantiDenganPasswordAman123!
```

---

## 📋 Detail Variabel

### Required (Wajib)

| Variable | Value | Keterangan |
|----------|-------|------------|
| `PORT` | `8000` | Port default Koyeb (jangan diubah) |
| `HOST` | `0.0.0.0` | Bind ke semua network interfaces |
| `ADMIN_PASSWORD` | `<password-aman>` | **GANTI INI!** Password untuk admin panel |
| `OFFLINE_TOLERANCE_HOURS` | `24` | Berapa jam aplikasi bisa offline sebelum lisensi invalid |

### Optional (Opsional)

| Variable | Default | Keterangan |
|----------|---------|------------|
| `NODE_ENV` | - | Set ke `production` untuk production mode |

---

## 🔒 Security Notes

### ⚠️ PENTING!
1. **JANGAN gunakan password default** `admin123`
2. **JANGAN commit file `.env`** ke Git
3. **GUNAKAN password yang kuat** untuk `ADMIN_PASSWORD`
   - Minimal 12 karakter
   - Kombinasi huruf besar, kecil, angka, simbol
   - Contoh: `MyS3cur3P@ssw0rd!2024`

### Cara Set di Koyeb

**Method 1: Via Dashboard (Recommended)**
1. Koyeb Dashboard → Pilih App
2. Tab **"Settings"**
3. Section **"Environment variables"**
4. Klik **"Add variable"**
5. Input: `Name` dan `Value`
6. Klik **"Save"**
7. Redeploy app untuk apply changes

**Method 2: Via koyeb.yaml**
```yaml
env:
  - name: PORT
    value: "8000"
  - name: HOST
    value: "0.0.0.0"
  # JANGAN taruh ADMIN_PASSWORD di sini!
  # Gunakan Koyeb Dashboard untuk sensitive data
```

---

## ✅ Verification

Setelah deployment, test environment variables:

```bash
# Health check (harusnya return 200 OK)
curl https://your-app.koyeb.app/health

# Get API info
curl https://your-app.koyeb.app/

# Test admin endpoint (dengan password)
curl -X GET https://your-app.koyeb.app/api/admin/stats \
  -H "Content-Type: application/json" \
  -d '{"password": "YOUR_ADMIN_PASSWORD"}'
```

Jika ada error "Missing environment variable", cek:
1. Variable sudah di-set di Koyeb Dashboard?
2. Nama variable sudah benar? (case-sensitive!)
3. Sudah redeploy setelah menambahkan variable?

---

## 🔄 Update Variables

Jika perlu update environment variables:
1. Update di Koyeb Dashboard
2. Klik **"Redeploy"**
3. Wait for deployment to complete (~2-3 minutes)

Server akan restart otomatis dengan environment variables yang baru.
