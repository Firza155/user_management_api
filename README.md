#  User Management API

Project ini adalah RESTful API sederhana untuk **manajemen user** dengan fitur **autentikasi JWT**, **upload avatar ke Cloudinary**, dan **keamanan server menggunakan CORS & Helmet**.

---

##  Fitur Utama
- **Autentikasi** (Register & Login menggunakan JWT)
- **CRUD Data User**
- **Upload Foto Profil (Avatar)** ke Cloudinary
- **Keamanan Server**
  - CORS hanya untuk domain tertentu
  - Helmet untuk HTTP Security Headers
- **Password di-hash** menggunakan bcryptjs
- **Pencatatan waktu `updated_at`** setiap profil diubah

---

## Tech Stack
- **Node.js + Express.js**
- **PostgreSQL** (pg)
- **Cloudinary** (upload avatar)
- **bcryptjs** (hashing password)
- **jsonwebtoken (JWT)** (autentikasi)
- **multer + streamifier** (upload file)
- **helmet + cors** (keamanan)
- **dotenv** (konfigurasi environment)

---

## Struktur Folder
user_management_api/
│
├── index.js
├── .env
├── .env.example
├── package.json
│
└── src/
├── config/
│ ├── db.js
│ └── cloudinary.js
├── middleware/
│ ├── auth.js
│ ├── upload.js
├── controllers/
│ ├── authController.js
│ └── userController.js
├── routes/
│ ├── authRoutes.js
│ └── userRoutes.js
└── models/
  └── userModel.js


---

## ⚙️ Konfigurasi `.env`

Buat file `.env` di root project dan isi dengan konfigurasi pribadi kamu:

```env
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=kampus
DB_PASS=your_password_here
DB_PORT=5432
JWT_SECRET=rahasia_super_aman
CLOUDINARY_NAME=nama_cloudinary_kamu
CLOUDINARY_KEY=apikey_cloudinary_kamu
CLOUDINARY_SECRET=apisecret_cloudinary_kamu
CORS_ORIGIN=http://localhost:3000

# Instalasi & Menjalankan Server

1. Clone repository ini
  - git clone https://github.com/Firza155/user_management_api.git

2. Masuk ke folder project:
  - cd user_management_api

3. Install dependencies:
  - npm install

4. Jalankan server:
  - npm run dev

5. Server akan berjalan di:
  - http://localhost:5000


# Database Setup

Pastikan PostgreSQL sudah berjalan dan buat tabel berikut:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  avatar_url TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# Endpoint API

Endpoint	Method	Deskripsi	Proteksi
/api/auth/register	POST	Registrasi user baru	❌
/api/auth/login	POST	Login dan dapatkan JWT	❌
/api/users	GET	Mendapatkan semua user	✅ JWT
/api/users/profile	PUT	Update profil user login	✅ JWT
/api/users/avatar	POST	Upload foto profil	✅ JWT

# Dokumentasi Postman
Kamu dapat melihat dan menguji semua endpoint API melalui link berikut:
https://www.postman.com/firza-mushermansah2015-5123314/workspace/firza-backend/request/49469875-b4d5da64-0fc8-406d-9385-84737b82eef9?action=share&creator=49469875&ctx=documentation

# Keamanan Server
 - Menggunakan Helmet untuk HTTP Security Headers
 - Menggunakan CORS agar hanya domain tertentu yang dapat mengakses API
 - Setiap endpoint CRUD wajib token JWT

# Kontributor
Nama: Firza Mushermansyah
NIM: 23091397155
Proyek: Tugas Backend - User Management API





