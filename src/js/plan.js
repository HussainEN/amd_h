document.addEventListener("DOMContentLoaded", () => {
  const plansContainer = document.getElementById("plansContainer");
  let plan = JSON.parse(localStorage.getItem("activePlan"));

  if (!plan) {
    plansContainer.innerHTML = "<p>لم تقم بإضافة أي خطة بعد.</p>";
    return;
  }

  const { name, price, duration, paid = 0, startDate = new Date() } = plan;
  const monthly = Math.round(price / duration);
  const start = new Date(startDate);
  const installments = [];

  for (let i = 0; i < duration; i++) {
    const date = new Date(start);
    date.setMonth(start.getMonth() + i);
    installments.push({
      amount: monthly,
      date: date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      paid: i < paid
    });
  }

  const progressPercent = Math.floor((paid / duration) * 100);

  const planEl = document.createElement("div");
  planEl.className = "plan";
  planEl.innerHTML = `
    <h2>${name}</h2>
    <p>إجمالي السعر: ${price} ﷼ | مدة الخطة: ${duration} شهور</p>
    <div class="progress-bar">
      <div class="progress-bar-inner" style="width: ${progressPercent}%"></div>
    </div>
    <div class="installments">
      ${installments.map((inst, index) => `
        <div class="installment" style="background:${inst.paid ? '#d1fae5' : '#fff'}">
          <span>${inst.date}</span>
          <span>${inst.amount} ﷼</span>
          <span>${inst.paid ? ' مدفوعة' : ''}</span>
        </div>
      `).join("")}
    </div>
    <div class="button-group">
      ${paid < duration
        ? `<button class="confirm-btn" onclick="confirmNextPayment()">تأكيد الدفع التالي</button>`
        : `<p style="text-align:center; color:#10b981; font-weight:bold;"> تم الانتهاء من كل الدفعات!</p>`
      }
      
  `;

  plansContainer.innerHTML = "";
  plansContainer.appendChild(planEl);
});

function confirmNextPayment() {
  let plan = JSON.parse(localStorage.getItem("activePlan"));
  if (!plan) return;

  if (!plan.paid) plan.paid = 0;
  if (!plan.startDate) plan.startDate = new Date();

  if (plan.paid < plan.duration) {
    plan.paid += 1;
    localStorage.setItem("activePlan", JSON.stringify(plan));
    location.reload(); // إعادة تحميل الصفحة لتحديث العرض
  }
}

function resetPlan() {
  if (confirm("هل أنت متأكد من إعادة تعيين الخطة؟")) {
    localStorage.removeItem("activePlan");
    window.location.reload();
  }
}


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