// Tampilkan tanggal sekarang
document.getElementById("tanggal").innerText = new Date().toLocaleDateString('id-ID');

// Hitung total dan jumlah
function hitung() {
  const rows = document.querySelectorAll("#notaTable tbody tr");
  let total = 0;
  rows.forEach(row => {
    const qty = row.cells[0].querySelector("input").value || 0;
    const harga = row.cells[2].querySelector("input").value || 0;
    const jumlah = qty * harga;
    row.cells[3].innerText = jumlah;
    total += jumlah;
  });
  document.getElementById("total").value = total;
  hitungSisa();
}

function hitungSisa() {
  const total = parseFloat(document.getElementById("total").value) || 0;
  const dp = parseFloat(document.getElementById("dp").value) || 0;
  document.getElementById("sisa").value = total - dp;
}

function tambahBaris() {
  const tbody = document.querySelector("#notaTable tbody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><input type="number" min="1" value="1" onchange="hitung()"></td>
    <td><input type="text" placeholder="Isi keterangan" onchange="hitung()"></td>
    <td><input type="number" value="0" onchange="hitung()"></td>
    <td class="jumlah">0</td>
  `;
  tbody.appendChild(row);
}

// Simpan sebagai gambar PNG
function simpanGambar() {
  html2canvas(document.getElementById("notaArea")).then(canvas => {
    const link = document.createElement("a");
    link.download = "nota-masrupi.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

// Kirim ke WhatsApp
function kirimNota() {
  const tanggal = document.getElementById("tanggal").innerText;
  const nama = document.getElementById("namaPelanggan").value || "-";
  const noNota = document.getElementById("noNota").value || "-";
  const nomorWa = document.getElementById("nomorWa").value.trim();

  if (!nomorWa || !/^62\d{9,}$/.test(nomorWa)) {
    alert("Masukkan nomor WA yang valid, dimulai dengan 62");
    return;
  }

  const rows = document.querySelectorAll("#notaTable tbody tr");
  let pesan = `*Nota Masrupi Tailor*\n`;
  pesan += `Tanggal: ${tanggal}\n`;
  pesan += `Nama: ${nama}\n`;
  pesan += `No. Nota: ${noNota}\n\n`;
  pesan += `*Rincian:*\n`;

  rows.forEach(row => {
    const qty = row.cells[0].querySelector("input").value || 0;
    const ket = row.cells[1].querySelector("input").value || "-";
    const harga = row.cells[2].querySelector("input").value || 0;
    const jumlah = row.cells[3].innerText || 0;
    pesan += `- ${qty}x ${ket} @${harga} = ${jumlah}\n`;
  });

  const total = document.getElementById("total").value;
  const dp = document.getElementById("dp").value;
  const sisa = document.getElementById("sisa").value;

  pesan += `\nTotal: Rp${total}\nDP: Rp${dp}\nSisa: Rp${sisa}`;
  pesan += `\n\nTerima kasih telah menjahit di Masrupi Tailor.`;

  const url = `https://wa.me/${nomorWa}?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank");
}

// Hitung saat pertama kali dibuka
hitung();
