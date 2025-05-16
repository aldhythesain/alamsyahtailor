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
    <td><input type="number" value="" onchange="hitung()"></td>
    <td class="jumlah"></td>
  `;
  tbody.appendChild(row);
}

// Simpan sebagai gambar PNG
function simpanGambar() {
  html2canvas(document.getElementById("notaArea")).then(canvas => {
    const link = document.createElement("a");
    link.download = "nota Alamsyah Tailor.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}


// Hitung saat pertama kali dibuka
hitung();
