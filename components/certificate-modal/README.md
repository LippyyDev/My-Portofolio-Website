# Certificate Modal Component

Component modal untuk menampilkan detail sertifikat dengan galeri foto yang dapat dinavigasi.

## Struktur File

```
components/certificate-modal/
├── certificate-modal.html    # Template HTML untuk modal
├── certificate-modal.css     # Styling CSS untuk modal
├── certificate-modal.js      # JavaScript untuk fungsi modal
└── README.md                 # Dokumentasi component
```

## Fitur

- **Modal Responsif**: Modal yang menyesuaikan dengan ukuran layar
- **Galeri Foto**: Tampilan foto utama dengan thumbnail navigasi
- **Navigasi**: Tombol previous/next dan keyboard navigation (arrow keys, ESC)
- **Informasi Sertifikat**: Menampilkan nama, penerbit, dan deskripsi sertifikat
- **Animasi Smooth**: Transisi dan efek hover yang halus
- **Backdrop Blur**: Efek blur pada background

## Cara Penggunaan

1. **Include CSS** di head HTML:

```html
<link
  rel="stylesheet"
  href="components/certificate-modal/certificate-modal.css"
/>
```

2. **Include JavaScript** sebelum closing body tag:

```html
<script src="components/certificate-modal/certificate-modal.js"></script>
```

3. **Tambahkan container** di HTML:

```html
<div id="certificate-modal-container"></div>
```

4. **Tambahkan class** pada certificate cards:

```html
<div class="certificate-card" data-certificate-index="0">
  <!-- Content sertifikat -->
</div>
```

## Data Sertifikat

Component ini menggunakan data sertifikat yang didefinisikan dalam method `getCertificateData()` di file JavaScript. Setiap sertifikat memiliki:

- `id`: ID unik sertifikat
- `name`: Nama sertifikat
- `issuer`: Penerbit sertifikat
- `description`: Deskripsi sertifikat
- `images`: Array path gambar sertifikat

## Interaksi

- **Klik card sertifikat**: Membuka modal dengan detail sertifikat
- **Klik thumbnail**: Mengganti foto utama
- **Tombol navigasi**: Previous/Next untuk navigasi foto
- **Keyboard**: Arrow keys untuk navigasi, ESC untuk menutup
- **Klik overlay/close**: Menutup modal

## Responsive Design

- **Desktop**: Layout 2 kolom (gallery + info)
- **Tablet**: Layout 1 kolom dengan ukuran yang disesuaikan
- **Mobile**: Layout kompak dengan thumbnail yang lebih kecil

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Dependencies

- Font Awesome 6.0+ (untuk ikon)
- Poppins font (untuk typography)
