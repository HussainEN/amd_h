// product.js

function logout() {
  alert("تم تسجيل الخروج بنجاح.");
  window.location.href = "index.html";
}

function navigate(sectionId) {
  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });
  document.getElementById(sectionId).classList.add("active");
}

const categories = {
  "منتجات تقنية": [
    { name: "iPhone 15", price: 5000, brand: "Apple" },
    { name: "Galaxy S24", price: 4200, brand: "Samsung" },
    { name: "MacBook Pro", price: 8500, brand: "Apple" },
    { name: "Dell XPS", price: 7000, brand: "Dell" },
    { name: "كاميرا Canon", price: 3200, brand: "Canon" },
    { name: "AirPods Pro", price: 950, brand: "Apple" },
    { name: "PlayStation 5", price: 2500, brand: "Sony" },
    { name: "Xbox Series X", price: 2300, brand: "Microsoft" },
    { name: "ماوس Logitech", price: 150, brand: "Logitech" },
    { name: "كيبورد ميكانيكي", price: 300, brand: "Redragon" }
  ],
  "منتجات سفر": [
    { name: "رحلة إلى دبي", price: 3000, brand: "طيران الإمارات" },
    { name: "رحلة إلى باريس", price: 6000, brand: "Air France" },
    { name: "رحلة إلى القاهرة", price: 2500, brand: "مصر للطيران" },
    { name: "رحلة إلى لندن", price: 6500, brand: "British Airways" }
  ],
  "منتجات سيارات": [
    { name: "تويوتا كورولا", price: 78000, brand: "Toyota" },
    { name: "هونداي إلنترا", price: 73000, brand: "Hyundai" },
    { name: "نيسان باترول", price: 150000, brand: "Nissan" },
    { name: "فورد تورس", price: 97000, brand: "Ford" },
    { name: "كيا سبورتاج", price: 88000, brand: "Kia" },
    { name: "شفروليه تاهو", price: 180000, brand: "Chevrolet" },
    { name: "مازدا 6", price: 86000, brand: "Mazda" },
    { name: "جيب رانجلر", price: 175000, brand: "Jeep" },
    { name: "تيسلا موديل 3", price: 160000, brand: "Tesla" }
  ]
};

function renderHomeProducts() {
  const container = document.getElementById("product-categories");
  container.innerHTML = "";

  const name = document.getElementById("searchInput").value.trim().toLowerCase();
  const brand = document.getElementById("brandFilter").value.trim().toLowerCase();
  const selectedCategory = document.getElementById("categoryFilter").value;
  const minPrice = parseFloat(document.getElementById("minPriceFilter")?.value) || null;
  const maxPrice = parseFloat(document.getElementById("maxPriceFilter")?.value) || null;
  const sortOption = document.getElementById("sortFilter").value;

  for (const category in categories) {
    if (selectedCategory && category !== selectedCategory) continue;

    let filtered = categories[category].filter(product => {
      const matchesName = product.name.toLowerCase().includes(name);
      const matchesBrand = brand ? product.brand.toLowerCase() === brand : true;
      const matchesMin = minPrice !== null ? product.price >= minPrice : true;
      const matchesMax = maxPrice !== null ? product.price <= maxPrice : true;
      return matchesName && matchesBrand && matchesMin && matchesMax;
    });

    if (sortOption === "highest") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "lowest") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "newest") {
      filtered = filtered.sort(() => Math.random() - 0.5);
    }

    if (filtered.length === 0) continue;

    const catTitle = document.createElement("h3");
    catTitle.textContent = category;
    container.appendChild(catTitle);

    const list = document.createElement("div");
    list.className = "product-list";

    filtered.forEach(product => {
      const item = document.createElement("div");
      item.className = "product";
      item.innerHTML = `
        <h4>${product.name}</h4>
        <p>${product.price} ﷼</p>
        <p><small>ماركة: ${product.brand}</small></p>
        <button onclick="openPlanModal('${product.name}', ${product.price})">ابدأ خطة شراء</button>
      `;
      list.appendChild(item);
    });

    container.appendChild(list);
  }
}

function openPlanModal(productName, defaultPrice) {
  document.getElementById('modalProductName').textContent = productName;
  document.getElementById('modalPrice').value = defaultPrice;
  document.getElementById('modalDuration').value = 4;
  document.getElementById('planModal').style.display = 'block';
  document.getElementById('planForm').dataset.product = productName;
}

function closePlanModal() {
  document.getElementById('planModal').style.display = 'none';
}

document.getElementById("planForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const product = this.dataset.product;
  const price = document.getElementById("modalPrice").value;
  const duration = document.getElementById("modalDuration").value;

  const plan = {
    name: product,
    price: parseFloat(price),
    duration: parseInt(duration),
    paid: 0,
    startDate: new Date()
  };

  localStorage.setItem("activePlan", JSON.stringify(plan));
  window.location.href = "plan.html";
});

document.addEventListener("DOMContentLoaded", () => {
  renderHomeProducts();

  ["searchInput", "brandFilter", "categoryFilter", "minPriceFilter", "maxPriceFilter", "sortFilter"]
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", renderHomeProducts);
      }
    });
});
function navigate(link) {
  window.location.href = link;
}