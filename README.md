# 🎨 PortofolioWeb - Website Portfolio Pribadi

Website portfolio pribadi dengan tema dark mode yang elegan dan modern. Dibuat menggunakan HTML, CSS, JavaScript, dan GSAP untuk animasi yang smooth.

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Teknologi](#️-teknologi)
- [Struktur Proyek](#-struktur-proyek)
- [Cara Menjalankan](#-cara-menjalankan)
- [Sections Website](#-sections-website)
- [Komponen](#-komponen)
- [Customization](#️-customization)

## ✨ Fitur Utama

- 🎨 **Dark Mode Theme** - Desain elegan dengan kontras hitam putih
- 📱 **Fully Responsive** - Optimal di semua perangkat
- 🎬 **Smooth Animations** - Menggunakan GSAP untuk animasi halus
- 🎯 **Single Page Application** - Navigasi smooth antar section
- 🔄 **Interactive Components** - Modal, chat room, dan animasi interaktif
- 🎵 **Music Player** - Floating music player dengan kontrol

## 🛠️ Teknologi

- **HTML5** - Struktur semantic
- **CSS3** - Styling modern (Flexbox, Grid, Animations)
- **JavaScript ES6+** - Interaktivitas dan logika
- **GSAP** - Library animasi profesional
- **Firebase** - Backend untuk chat room
- **Font Awesome** - Ikon vektor
- **Google Fonts** - Typography Poppins

## 📁 Struktur Proyek

```
Portofolio/
├── index.html                 # File HTML utama
├── style.css                  # Styling global
├── script.js                  # JavaScript utama
├── assets/                    # Assets (images, songs)
│   ├── img/                  # Images (profile, project, certificate, tools)
│   └── songs/                # Music files
└── components/               # Komponen reusable
    ├── navbar/               # Navigation bar
    ├── hero-card/            # Hero section card
    ├── about-card/           # About section card
    ├── project-card/         # Project cards
    ├── certificate-modal/    # Certificate modal popup
    ├── chat-room/            # Chat room dengan Firebase
    └── primary-button/       # Button component
```

## 🚀 Cara Menjalankan

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd Portofolio
   ```

2. **Buka di browser**

   - Buka file `index.html` di browser modern
   - Atau gunakan live server (VS Code, Live Server extension)

3. **Setup Firebase (Opsional)**
   - Untuk fitur chat room, konfigurasi Firebase di `components/chat-room/firebase-config.js`

## 📄 Sections Website

| Section                  | Deskripsi                                        |
| ------------------------ | ------------------------------------------------ |
| **Home**                 | Profil utama dengan foto, quote, dan CTA buttons |
| **About**                | Latar belakang, statistik, dan informasi pribadi |
| **Tools & Technologies** | Grid tools dan teknologi yang dikuasai           |
| **Certificates**         | Galeri sertifikat dengan modal popup             |
| **Projects**             | Portfolio proyek dengan infinite scroll          |
| **Chat Room**            | Chat room interaktif dengan Firebase             |
| **Contact**              | Form kontak dan links sosial media               |

## 🧩 Komponen

### Navigation

- Sticky navbar dengan smooth scroll
- Mobile hamburger menu
- Floating bottom navigation
- Active section highlighting

### Interactive Components

- **Certificate Modal** - Popup untuk melihat detail sertifikat dengan navigasi gambar
- **Project Cards** - Card proyek dengan hover effects dan link ke GitHub/Live demo
- **Chat Room** - Real-time chat dengan Google authentication
- **Music Player** - Floating music player dengan playlist

### Animations

- Scroll-triggered animations (GSAP)
- Hover micro-interactions
- Smooth transitions
- Parallax effects

## 🎨 Customization

### Mengubah Konten

1. Edit `index.html` untuk teks dan konten
2. Update gambar di folder `assets/img/`
3. Modifikasi data di file JavaScript komponen:
   - `components/project-card/project-card.js` - Data proyek
   - `components/certificate-modal/certificate-modal.js` - Data sertifikat

### Mengubah Styling

1. Edit `style.css` untuk styling global
2. Edit file CSS di folder `components/` untuk styling komponen
3. Sesuaikan breakpoints responsive sesuai kebutuhan

### Mengubah Animasi

1. Edit `script.js` untuk animasi GSAP
2. Modifikasi scroll triggers dan hover effects
3. Tambahkan animasi baru sesuai kebutuhan

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 📞 Kontak & Links

- **GitHub**: [LippyyDev](https://github.com/LippyyDev)
- **LinkedIn**: [Muhammad Alif Qadri](https://www.linkedin.com/in/muhalifqadri)
- **Email**: alifqadry@gmail.com

---

**Dibuat dengan ❤️ oleh Muhammad Alif Qadri**
