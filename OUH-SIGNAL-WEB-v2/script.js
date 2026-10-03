const cfg = OUH_CONFIG;
const rupiah = n => new Intl.NumberFormat("id-ID", {style:"currency", currency:"IDR", maximumFractionDigits:0}).format(n);

const plansEl = document.getElementById("plans");
const selectedEl = document.getElementById("selectedPlan");
let selectedPlan = null;

cfg.plans.forEach((p, i) => {
  const el = document.createElement("article");
  el.className = "plan";
  el.innerHTML = `
    <span class="tag">${p.type}</span>
    <h3>${p.duration}</h3>
    <div class="type">PROCESS MODE // ${p.type}</div>
    <div class="price">${rupiah(p.price)}</div>
    <div class="eta">ESTIMASI ${p.eta}</div>
    <p>${p.note}</p>
    <button type="button">PILIH PAKET</button>`;
  el.addEventListener("click", () => selectPlan(p, el));
  plansEl.appendChild(el);
});

function selectPlan(p, el){
  selectedPlan = p;
  document.querySelectorAll(".plan").forEach(x=>x.classList.remove("selected"));
  el.classList.add("selected");
  selectedEl.textContent = `PAKET DIPILIH: ${p.duration} • ${p.type} • ${rupiah(p.price)} • ETA ${p.eta}`;
  document.getElementById("order").scrollIntoView({behavior:"smooth", block:"start"});
}

const waUrl = "https://wa.me/" + cfg.whatsapp;
["navWa","paymentWa","aboutWa"].forEach(id => {
  const a = document.getElementById(id);
  if (a) a.href = waUrl;
});
document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("orderForm").addEventListener("submit", e => {
  e.preventDefault();
  if (!selectedPlan) {
    alert("Silakan pilih paket terlebih dahulu.");
    document.getElementById("paket").scrollIntoView({behavior:"smooth"});
    return;
  }

  const fd = new FormData(e.target);
  const msg = [
    "🔐 *OUH SIGNAL — ORDER BARU*",
    "",
    `👤 Nama: ${fd.get("customerName")}`,
    `📱 No. WA: ${fd.get("customerPhone")}`,
    `📲 Device: ${fd.get("device")}`,
    `🔢 IMEI 1: ${fd.get("imei1")}`,
    `🧾 Paket: ${selectedPlan.duration} ${selectedPlan.type}`,
    `💰 Harga: ${rupiah(selectedPlan.price)}`,
    `⏱️ Estimasi: ${selectedPlan.eta}`,
    `📝 Kendala: ${fd.get("issue") || "-"}`,
    "",
    "📎 File sudah dipilih di form:",
    `• Identitas IMEI: ${fd.get("imeiProof")?.name || "-"}`,
    `• Bukti payment: ${fd.get("paymentProof")?.name || "-"}`,
    "",
    "⚠️ Saya akan mengirim 2 file tersebut secara manual di chat WhatsApp setelah halaman WhatsApp terbuka.",
    "",
    "— Sent from OUH SIGNAL Web"
  ].join("\n");

  const url = waUrl + "?text=" + encodeURIComponent(msg);
  document.getElementById("formMsg").textContent = "Membuka WhatsApp dengan detail order…";
  window.open(url, "_blank");
});
