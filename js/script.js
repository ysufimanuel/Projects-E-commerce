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