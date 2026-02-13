# 🔄 Update Client Apps untuk Production

Setelah license server di-deploy ke Koyeb, client apps (bms-exe, blm-exe, vcomm-exee) perlu diupdate untuk menggunakan URL production.

---

## 📍 URL Production Anda

Setelah deploy di Koyeb, Anda akan mendapat URL seperti:
```
https://license-server-xxx.koyeb.app
```

**Catat URL ini!** Anda akan membutuhkannya untuk update client apps.

---

## 🎯 Cara Update Client Apps

Ada **2 cara** untuk set production URL:

### ✅ Cara 1: Environment Variable (RECOMMENDED)

Set environment variable sebelum menjalankan aplikasi:

**Windows (CMD):**
```cmd
set LICENSE_SERVER_URL=https://license-server-xxx.koyeb.app
npm start
```

**Windows (PowerShell):**
```powershell
$env:LICENSE_SERVER_URL="https://license-server-xxx.koyeb.app"
npm start
```

**Linux/Mac:**
```bash
export LICENSE_SERVER_URL=https://license-server-xxx.koyeb.app
npm start
```

**Atau buat file `.env` di root folder setiap app:**
```
LICENSE_SERVER_URL=https://license-server-xxx.koyeb.app
```

### ✅ Cara 2: Update Default URL di Code

Edit file berikut untuk setiap aplikasi:

#### 📁 bms-exe
**File:** `bms-exe/src/license/license-manager.js`  
**Line ~20:**
```javascript
const CONFIG = {
    SERVER_URL: 'https://license-server-xxx.koyeb.app', // ← Update ini
    // ... rest of config
};
```

#### 📁 blm-exe
**File:** `blm-exe/src/license/license-manager.js`  
**Line ~20:**
```javascript
const CONFIG = {
    SERVER_URL: 'https://license-server-xxx.koyeb.app', // ← Update ini
    // ... rest of config
};
```

#### 📁 vcomm-exee
**File:** `vcomm-exee/src/license/license-manager.js`  
**Line ~20:**
```javascript
const CONFIG = {
    SERVER_URL: 'https://license-server-xxx.koyeb.app', // ← Update ini
    // ... rest of config
};
```

---

## ✅ Testing

Setelah update, test koneksi ke license server:

### 1. Start aplikasi client
```bash
cd bms-exe  # atau blm-exe / vcomm-exee
npm start
```

### 2. Cek console logs
Anda harusnya melihat:
```
[License Client] Server URL set to: https://license-server-xxx.koyeb.app
[License] Checking license...
[License Client] GET /api/license/validate/YOUR_HARDWARE_ID
```

### 3. Test aktivasi license
- Buka aplikasi
- Masukkan license key
- Harus bisa activate tanpa error

---

## 🔍 Troubleshooting

### Error: "Cannot connect to license server"

**Penyebab:**
- URL salah
- License server belum running
- Network/firewall issue

**Solusi:**
1. Test URL di browser:
   ```
   https://license-server-xxx.koyeb.app/health
   ```
   Harusnya return JSON dengan status "ok"

2. Pastikan URL di client app sudah benar (tanpa trailing slash)

3. Cek firewall tidak block HTTPS requests

### Error: "License validation failed"

**Penyebab:**
- License key belum di-generate
- Database belum ada data

**Solusi:**
1. Login ke admin panel: `https://license-server-xxx.koyeb.app/`
2. Generate license key untuk product yang sesuai
3. Gunakan key tersebut di client app

---

## 📦 Build untuk Production

Jika ingin build executable:

```bash
cd bms-exe  # atau app lainnya
npm run build
```

File executable akan include environment variable yang sudah di-set.

---

## 🔐 Multiple Environments

Untuk development vs production:

**Development (local server):**
```bash
set LICENSE_SERVER_URL=http://localhost:3000
npm run dev
```

**Production (Koyeb):**
```bash
set LICENSE_SERVER_URL=https://license-server-xxx.koyeb.app
npm start
```

---

## 📝 Checklist Update

- [ ] Deploy license server ke Koyeb
- [ ] Catat production URL
- [ ] Update environment variable atau code di:
  - [ ] bms-exe
  - [ ] blm-exe
  - [ ] vcomm-exee
- [ ] Test koneksi dari setiap app
- [ ] Generate license keys di admin panel
- [ ] Test aktivasi license di setiap app
- [ ] Build production executable (optional)

---

**Done! 🎉** Client apps sekarang sudah terhubung ke production server!
