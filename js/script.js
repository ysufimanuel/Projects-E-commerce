// ----------------------------
// Data Menu & Kamar
// ----------------------------
const menuList = [
  { nama: "Nasi Goreng Spesial", harga: 20000, img: "img/1.nasi goreng.jpg", desc: "Nasi goreng khas Nusantara dengan telur dan ayam suwir." },
  { nama: "Soto Ayam Lamongan", harga: 18000, img: "img/2. Soto Ayam Lamongan.jpg", desc: "Kuah gurih, ayam empuk, disajikan dengan koya dan sambal." },
  { nama: "Rawon Daging", harga: 25000, img: "img/3. rawon daging.jpg", desc: "Sup daging khas Jawa Timur dengan kuah hitam pekat." },
  { nama: "Mie Goreng Jawa", harga: 19000, img: "img/4. mie goreng jawa.jpg", desc: "Mie goreng dengan bumbu kecap manis dan sayur segar." },
  { nama: "Ayam Bakar Madu", harga: 24000, img: "img/5. ayam bakar madu.jpg ", desc: "Ayam bakar dengan olesan madu dan sambal terasi." },
  { nama: "Ikan Bakar Jimbaran", harga: 30000, img: "img/6. Ikan Bakar Jimbaran.png", desc: "Ikan segar dibakar dengan bumbu khas Bali." },
  { nama: "Rendang Padang", harga: 27000, img: "img/7. rendang padang.jpg", desc: "Daging sapi dimasak lama hingga empuk dengan santan dan rempah." },
  { nama: "Nasi Liwet Sunda", harga: 22000, img: "img/8. nasi liwet sunda.jpg", desc: "Nasi gurih dengan ikan asin dan sambal terasi." },
  { nama: "Bakso Malang", harga: 15000, img: "img/9. bakso malang.jpeg", desc: "Bakso kenyal, tahu, dan pangsit goreng dalam kuah kaldu gurih." },
  { nama: "Gado-Gado Betawi", harga: 16000, img: "img/10. gado gado betawi.jpg", desc: "Sayur segar dengan bumbu kacang dan telur rebus." },
];

const roomList = [
  { nama: "Kamar Standard", harga: 120000, img: "https://i.imgur.com/RkU1I1z.jpg", desc: "Kamar nyaman dengan 1 kasur ukuran queen." },
  { nama: "Kamar Deluxe", harga: 180000, img: "https://i.imgur.com/1uWIBVQ.jpg", desc: "Kamar luas dengan TV, AC, dan kamar mandi pribadi." },
  { nama: "Kamar Family", harga: 250000, img: "https://i.imgur.com/Tdf5zyG.jpg", desc: "Cocok untuk keluarga, 2 kasur besar dan ruang tamu kecil." },
  { nama: "Kamar VIP", harga: 300000, img: "https://i.imgur.com/4FW5ZqE.jpg", desc: "Fasilitas lengkap, view taman, layanan kamar 24 jam." },
  { nama: "Villa Mini", harga: 400000, img: "https://i.imgur.com/G47C4ZQ.jpg", desc: "Rumah kecil dengan dapur pribadi dan teras." },
  { nama: "Suite Room", harga: 500000, img: "https://i.imgur.com/8kA4u5U.jpg", desc: "Suite eksklusif dengan jacuzzi dan pemandangan pegunungan." },
];

// ----------------------------
// Render Menu & Kamar
// ----------------------------
if (document.getElementById("menuNames")) {
  const menuContainer = document.getElementById("menuNames");
  menuContainer.innerHTML = menuList.map((m, i) => `
    <div class="menu-name" onclick="bukaPopup('menu', ${i})">
      <div class="idx">${i + 1}</div>
      <div class="title">${m.nama}</div>
      <div class="price">Rp ${m.harga.toLocaleString()}</div>
    </div>
  `).join("");

  const roomContainer = document.getElementById("roomList");
  roomContainer.innerHTML = roomList.map((r, i) => `
    <div class="room-card" onclick="bukaPopup('room', ${i})">
      <img src="${r.img}" alt="${r.nama}">
      <div class="title">${r.nama}</div>
      <div class="price">Rp ${r.harga.toLocaleString()}</div>
    </div>
  `).join("");
}

// ----------------------------
// Popup Detail
// ----------------------------
let currentType = "", currentIndex = 0;
function bukaPopup(type, index) {
  currentType = type;
  currentIndex = index;
  const item = type === "menu" ? menuList[index] : roomList[index];
  document.getElementById("popupImg").src = item.img;
  document.getElementById("popupNama").textContent = item.nama;
  document.getElementById("popupDesc").textContent = item.desc;
  document.getElementById("popupHarga").textContent = `Rp ${item.harga.toLocaleString()}`;
  document.getElementById("popup").style.display = "flex";
}
function tutupPopup() {
  document.getElementById("popup").style.display = "none";
}

// ----------------------------
// Keranjang
// ----------------------------
let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
function updateKeranjang() {
  const list = document.getElementById("cartList");
  const total = document.getElementById("cartTotal");
  if (!list) return;

  if (keranjang.length === 0) {
    list.innerHTML = `<p class="muted">Keranjang kosong.</p>`;
    total.textContent = "0";
    return;
  }

  let totalHarga = 0;
  list.innerHTML = keranjang.map((item, i) => {
    totalHarga += item.harga * item.jumlah;
    return `
      <div class="cart-item">
        <img src="${item.img}" alt="">
        <div class="meta">
          <b>${item.nama}</b>
          <small>Rp ${item.harga.toLocaleString()} × ${item.jumlah}</small>
        </div>
        <div class="controls">
          <input type="number" min="1" value="${item.jumlah}" onchange="ubahJumlah(${i}, this.value)">
        </div>
      </div>
    `;
  }).join("");
  total.textContent = totalHarga.toLocaleString();
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
}
function ubahJumlah(i, jumlah) {
  keranjang[i].jumlah = parseInt(jumlah);
  updateKeranjang();
}
function tambahKeKeranjang() {
  const jumlah = parseInt(document.getElementById("popupJumlah").value);
  const item = currentType === "menu" ? menuList[currentIndex] : roomList[currentIndex];
  keranjang.push({ ...item, jumlah });
  tutupPopup();
  updateKeranjang();
}
function kosongkanKeranjang() {
  keranjang = [];
  updateKeranjang();
}

// ----------------------------
// Simpan Pesanan (ke localStorage)
// ----------------------------
function simpanPesanan() {
  if (keranjang.length === 0) {
    alert("Keranjang kosong!");
    return;
  }
  const semuaPesanan = JSON.parse(localStorage.getItem("pesanan")) || [];
  semuaPesanan.push({
    waktu: new Date().toLocaleString("id-ID"),
    items: keranjang,
  });
  localStorage.setItem("pesanan", JSON.stringify(semuaPesanan));
  alert("Pesanan berhasil disimpan!");
  keranjang = [];
  updateKeranjang();
}

// ----------------------------
// Halaman Admin
// ----------------------------
if (document.getElementById("rincianPesanan")) {
  const daftar = JSON.parse(localStorage.getItem("pesanan")) || [];
  const container = document.getElementById("rincianPesanan");
  if (daftar.length === 0) {
    container.innerHTML = `<p class="muted">Belum ada pesanan.</p>`;
  } else {
    container.innerHTML = daftar.map((p, i) => {
      let total = 0;
      p.items.forEach(it => total += it.harga * it.jumlah);
      return `
        <div class="card" style="border-bottom:1px dashed #ccc;padding:8px 0">
          <h3>Pesanan ${i + 1} - <small>${p.waktu}</small></h3>
          <ul>
            ${p.items.map(it => `<li>${it.nama} × ${it.jumlah} (Rp ${it.harga.toLocaleString()})</li>`).join("")}
          </ul>
          <p><b>Total: Rp ${total.toLocaleString()}</b></p>
        </div>
      `;
    }).join("");
  }
}

// ----------------------------
// Cetak & Hapus dari Admin
// ----------------------------
function cetakPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;
  const daftar = JSON.parse(localStorage.getItem("pesanan")) || [];
  if (daftar.length === 0) {
    alert("Belum ada pesanan untuk dicetak!");
    return;
  }
  doc.text("Laporan Pesanan - Warung & Penginapan Nusantara", 10, y);
  y += 10;
  daftar.forEach((p, i) => {
    let total = 0;
    doc.text(`Pesanan ${i + 1} (${p.waktu})`, 10, y);
    y += 8;
    p.items.forEach(it => {
      doc.text(`- ${it.nama} x${it.jumlah} = Rp ${it.harga.toLocaleString()}`, 14, y);
      total += it.harga * it.jumlah;
      y += 6;
    });
    doc.text(`Total: Rp ${total.toLocaleString()}`, 14, y);
    y += 10;
  });
  doc.save("Pesanan_Nusantara.pdf");
}

function resetTotal() {
  if (confirm("Hapus semua pesanan?")) {
    localStorage.removeItem("pesanan");
    alert("Semua pesanan telah dihapus!");
    location.reload();
  }
}

// ----------------------------
updateKeranjang();