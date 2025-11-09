# Chat Room Component

Komponen Chat Room yang menggunakan Firebase Authentication dan Firestore untuk fitur chat real-time.

## Fitur

- **Firebase Authentication**: Login dengan Google
- **Firestore Database**: Menyimpan dan mengambil pesan secara real-time
- **Real-time Updates**: Pesan muncul secara otomatis tanpa perlu refresh
- **Responsive Design**: Tampilan yang optimal di desktop dan mobile
- **Modern UI**: Desain yang menarik dengan efek blur dan gradient

## File yang Diperlukan

- `chat-room.html` - Struktur HTML untuk chat room
- `chat-room.css` - Styling untuk chat room
- `chat-room.js` - Logika JavaScript untuk Firebase dan chat functionality

## Setup Firebase

### 1. Buat Project Firebase

1. Kunjungi [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project"
3. Masukkan nama project (contoh: "portofolio-chat")
4. Pilih region yang dekat dengan lokasi Anda
5. Klik "Create project"

### 2. Enable Authentication

1. Di Firebase Console, pilih project Anda
2. Klik "Authentication" di sidebar
3. Klik "Get started"
4. Pilih tab "Sign-in method"
5. Enable "Google" provider
6. Masukkan project support email
7. Klik "Save"

### 3. Setup Firestore Database

1. Klik "Firestore Database" di sidebar
2. Klik "Create database"
3. Pilih "Start in test mode" (untuk development)
4. Pilih lokasi database (pilih yang sama dengan region project)
5. Klik "Done"

### 4. Dapatkan Konfigurasi Firebase

1. Klik ikon gear (⚙️) di sidebar
2. Pilih "Project settings"
3. Scroll ke bawah ke bagian "Your apps"
4. Klik ikon web (</>) untuk menambahkan web app
5. Masukkan nama app (contoh: "Portfolio Chat")
6. Centang "Also set up Firebase Hosting" jika diperlukan
7. Klik "Register app"
8. Copy konfigurasi Firebase yang diberikan

### 5. Setup Security Rules (Opsional)

Untuk keamanan yang lebih baik, Anda bisa mengatur Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to messages collection
    match /messages/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Integrasi ke Website

### 1. Tambahkan Firebase SDK

Tambahkan script Firebase ke HTML Anda (sebelum script chat-room.js):

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore-compat.js"></script>
```

### 2. Update Konfigurasi Firebase

Edit file `chat-room.js` dan ganti konfigurasi Firebase:

```javascript
this.firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### 3. Tambahkan CSS dan JS ke HTML

Tambahkan link ke CSS dan script ke HTML utama:

```html
<link rel="stylesheet" href="components/chat-room/chat-room.css" />
<script src="components/chat-room/chat-room.js"></script>
```

### 4. Tambahkan HTML ke Website

Tambahkan section chat room ke HTML utama:

```html
<!-- Chat Room Component -->
<div id="chat-room-container"></div>
```

## Penggunaan

1. User mengunjungi halaman dengan chat room
2. Klik "Login dengan Google" untuk masuk
3. Setelah login, user bisa mengirim pesan
4. Pesan akan muncul secara real-time untuk semua user yang online

## Troubleshooting

### Error: "Firebase SDK belum dimuat"

- Pastikan script Firebase sudah ditambahkan sebelum script chat-room.js
- Pastikan URL script Firebase benar dan dapat diakses

### Error: "Firebase Auth tidak tersedia"

- Pastikan konfigurasi Firebase sudah benar
- Pastikan Authentication sudah di-enable di Firebase Console

### Error: "Gagal mengirim pesan"

- Pastikan Firestore Database sudah dibuat
- Pastikan user sudah login
- Cek console browser untuk error detail

### Pesan tidak muncul secara real-time

- Pastikan Firestore rules mengizinkan read/write
- Pastikan koneksi internet stabil
- Cek apakah ada error di console browser

## Customization

### Mengubah Tampilan

Edit file `chat-room.css` untuk mengubah:

- Warna tema
- Font dan ukuran
- Layout dan spacing
- Animasi dan efek

### Mengubah Fungsi

Edit file `chat-room.js` untuk:

- Menambah fitur baru
- Mengubah logika chat
- Menambah validasi pesan
- Mengubah format waktu

## Keamanan

- Selalu gunakan Firestore Security Rules yang sesuai
- Jangan expose API keys di frontend untuk production
- Pertimbangkan untuk menggunakan Firebase Functions untuk logika backend yang sensitif
- Monitor penggunaan dan aktivitas di Firebase Console
