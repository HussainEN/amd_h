document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("invoicesContainer");
  const plan = JSON.parse(localStorage.getItem("activePlan"));

  if (!plan || !plan.paid || plan.paid === 0) {
    container.innerHTML = "<p>لا توجد فواتير حتى الآن.</p>";
    return;
  }

  const { name, price, duration, paid, startDate } = plan;
  const monthly = Math.round(price / duration);
  const start = new Date(startDate);

  for (let i = 0; i < paid; i++) {
    const date = new Date(start);
    date.setMonth(start.getMonth() + i);

    const invoice = document.createElement("div");
    invoice.className = "invoice";
    invoice.innerHTML = `
      <h3>فاتورة #${i + 1}</h3>
      <p><strong>المنتج:</strong> ${name}</p>
      <p><strong>التاريخ:</strong> ${date.toLocaleDateString('en-GB')}</p>
      <p><strong>المبلغ:</strong> ${monthly} ﷼</p>
      <div class="bank-details">
        <strong>تفاصيل الحساب البنكي:</strong>
        <p>اسم البنك: بنك الإنماء</p>
        <p>رقم الحساب: 1234567890</p>
        <p>الآيبان: SA1234567890000001234567</p>
      </div>
    `;
    container.appendChild(invoice);
  }
});

async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const plan = JSON.parse(localStorage.getItem("activePlan"));
  if (!plan) return alert("No saved plan found.");

  const { name, price, duration, paid, startDate } = plan;
  const totalPaid = Math.round((paid / duration) * price);
  const remaining = price - totalPaid;
  const referenceNumber = Math.floor(100000 + Math.random() * 900000);
  const licenseNumber = Math.floor(100000 + Math.random() * 900000);

  // Generate chart
  const ctx = document.getElementById("invoiceChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Paid", "Remaining"],
      datasets: [{
        label: "Payments Overview",
        data: [totalPaid, remaining],
        backgroundColor: ["#10b981", "#f59e0b"]
      }]
    },
    options: {
      responsive: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  await new Promise(resolve => setTimeout(resolve, 150));
  const chartImage = document.getElementById("invoiceChart").toDataURL("image/png");

  // Start PDF
  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Purchase Report", 105, 15, { align: "center" });

  // --- Product Table ---
  let x = 20, y = 30, w = 170, h = 6;
  doc.setFontSize(12);
  doc.setDrawColor(0);
  doc.setFillColor(240);
  doc.rect(x, y, w, h, "F");  // Header background
  doc.text("Product Information", x + 2, y + 4);
  y += h;

  const productData = [
    ["Product Name", name],
    ["Total Price", `${price} SAR`],
    ["Installments", `${duration}`],
    ["Paid", `${totalPaid} SAR`],
    ["Remaining", `${remaining} SAR`],
    ["Start Date", new Date(startDate).toLocaleDateString("en-GB")]
  ];

  productData.forEach(([key, val]) => {
    doc.rect(x, y, 50, h); doc.text(key, x + 2, y + 4);
    doc.rect(x + 50, y, 120, h); doc.text(val.toString(), x + 52, y + 4);
    y += h;
  });

  y += 6;

  // --- Entity Table ---
  doc.setFillColor(240);
  doc.rect(x, y, w, h, "F");
  doc.text("Entity Details", x + 2, y + 4);
  y += h;

  const entityData = [
    ["Entity", "Sabbeq"],
    ["Reference No.", referenceNumber],
    ["License No.", licenseNumber],
    ["Country", "Saudi Arabia"],
    ["Region", "Riyadh"]
  ];

  entityData.forEach(([key, val]) => {
    doc.rect(x, y, 50, h); doc.text(key, x + 2, y + 4);
    doc.rect(x + 50, y, 120, h); doc.text(val.toString(), x + 52, y + 4);
    y += h;
  });

  // --- Chart ---
  y += 10;
  doc.addImage(chartImage, "PNG", 25, y, 160, 70);

  doc.save(`Purchase_Report_${name}.pdf`);
  chart.destroy();
}

  // Insert chart image
  doc.addImage(chartImage, "PNG", 35, y, 140, 70);

  doc.save(`Purchase_Report_${name}.pdf`);
  chart.destroy();



function logout() {
  alert("تم تسجيل الخروج بنجاح.");
  window.location.href = "index.html";
}

function navigate(link) {
  window.location.href = link;
}
function navigate(link) {
  window.location.href = link;
}