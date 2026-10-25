// CUSTOMIZE THIS FILE: replace the WhatsApp number and sample products below.
const SHOP_NAME = "ABHI'S Crackers";
// Use country code + number, digits only. Example for India: "919876543210"
const WHATSAPP_NUMBER = "916282170198";

const products = [
  {id:1,name:"Flower Pots",category:"Ground Chakkars",price:180,unit:"box",emoji:"🌋",desc:"Colourful fountain-style celebration crackers."},
  {id:2,name:"Ground Chakkars",category:"Ground Chakkars",price:120,unit:"box",emoji:"🌀",desc:"Classic spinning ground crackers."},
  {id:3,name:"Sparklers",category:"Sparklers",price:90,unit:"box",emoji:"✨",desc:"Bright sparklers for festive moments."},
  {id:4,name:"Electric Sparklers",category:"Sparklers",price:150,unit:"box",emoji:"💫",desc:"A sparkling addition to your celebration."},
  {id:5,name:"Colour Smoke",category:"Special Items",price:220,unit:"box",emoji:"🌈",desc:"Colourful smoke effect for photos."},
  {id:6,name:"Gift Box",category:"Gift Boxes",price:650,unit:"box",emoji:"🎁",desc:"A mixed selection packed as a gift."},
  {id:7,name:"Celebration Pack",category:"Gift Boxes",price:999,unit:"pack",emoji:"🎉",desc:"A sample assorted celebration pack."},
  {id:8,name:"Kids Sparkle Pack",category:"Gift Boxes",price:350,unit:"pack",emoji:"🎇",desc:"A small sample pack for family celebrations."}
];
const cart = {};
let activeCategory = "All";
const categories = ["All", ...new Set(products.map(p=>p.category))];
const money = n => "₹" + Number(n).toLocaleString("en-IN");
document.getElementById("shopName").textContent = SHOP_NAME;
document.getElementById("footerShopName").textContent = SHOP_NAME;
document.title = SHOP_NAME + " | WhatsApp Orders";
const wa = "https://wa.me/" + WHATSAPP_NUMBER;
document.getElementById("headerWhatsApp").href = wa;

function renderProducts() {
  const query = document.getElementById("search").value.toLowerCase().trim();

  const visible = products.filter(p =>
    (activeCategory === "All" || p.category === activeCategory) &&
    (
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query)
    )
  );

  document.getElementById("productGrid").innerHTML = visible.length
    ? visible.map(p => {
        const quantity = cart[p.id] || 0;

        return `
          <article class="product-card ${quantity > 0 ? "selected" : ""}">

            ${
              quantity > 0
                ? '<span class="selected-badge">✓ SELECTED</span>'
                : ""
            }

            <div class="product-art">${p.emoji}</div>

            <span class="product-category">${p.category}</span>

            <h3>${p.name}</h3>

            <p class="product-desc">${p.desc}</p>

            <div class="product-bottom">

              <div class="price">
                ₹${p.price}
                <span class="unit">/ ${p.unit}</span>
              </div>

              ${
                quantity > 0
                  ? `
                    <div class="qty-inline">
                      <button type="button"
                        data-card-change="${p.id}"
                        data-delta="-1">−</button>

                      <span>${quantity}</span>

                      <button type="button"
                        data-card-change="${p.id}"
                        data-delta="1">+</button>
                    </div>
                  `
                  : `
                    <button class="add-btn"
                      data-add="${p.id}">
                      ＋ Add
                    </button>
                  `
              }

            </div>
          </article>
        `;
      }).join("")
    : "<p>No products found.</p>";

  // Add product to selection
  document.querySelectorAll("[data-add]").forEach(button => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.add);

      cart[id] = (cart[id] || 0) + 1;

      renderCart();
      renderProducts();
    });
  });

  // Change quantity directly on the product card
  document.querySelectorAll("[data-card-change]").forEach(button => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.cardChange);
      const delta = Number(button.dataset.delta);

      cart[id] = (cart[id] || 0) + delta;

      if (cart[id] <= 0) {
        delete cart[id];
      }

      renderCart();
      renderProducts();
    });
  });
}
function renderFilters(){
  document.getElementById("filters").innerHTML = categories.map(c =>
    `<button class="filter-btn ${c===activeCategory?"active":""}" data-category="${c}">${c}</button>`
  ).join("");
  document.querySelectorAll(".filter-btn").forEach(btn=>btn.addEventListener("click",()=>{
    activeCategory=btn.dataset.category;renderFilters();renderProducts();
  }));
}

function renderCart(){
  const ids=Object.keys(cart).filter(id=>cart[id]>0);
  const box=document.getElementById("cartItems");
  if(!ids.length) box.innerHTML='<p class="empty">Your list is empty. Add products above to begin.</p>';
  else box.innerHTML=ids.map(id=>{
    const p=products.find(x=>x.id===Number(id)),q=cart[id];
    return `<div class="cart-row"><div><span class="cart-name">${p.name}</span><span class="cart-sub">${money(p.price)} / ${p.unit}</span></div>
      <div class="qty-controls"><button type="button" aria-label="Decrease ${p.name}" data-change="${id}" data-delta="-1">−</button><b>${q}</b><button type="button" aria-label="Increase ${p.name}" data-change="${id}" data-delta="1">+</button></div>
      <div class="cart-price">${money(p.price*q)}</div></div>`;
  }).join("");
  const total=ids.reduce((sum,id)=>sum+products.find(p=>p.id===Number(id)).price*cart[id],0);
  document.getElementById("cartTotal").textContent=money(total);
  document.querySelectorAll("[data-change]").forEach(btn=>btn.addEventListener("click",()=>{
    const id=Number(btn.dataset.change);cart[id]+=Number(btn.dataset.delta);if(cart[id]<=0)delete cart[id];renderCart();
  }));
}
document.getElementById("search").addEventListener("input",renderProducts);
document.getElementById("clearCart").addEventListener("click",()=>{Object.keys(cart).forEach(k=>delete cart[k]);renderCart()});
document.getElementById("orderForm").addEventListener("submit",event=>{
  event.preventDefault();
  const ids=Object.keys(cart).filter(id=>cart[id]>0);
  if(!ids.length){alert("Please add at least one product to your list.");return;}
  if(!WHATSAPP_NUMBER||WHATSAPP_NUMBER==="919876543210"){
    const proceed=confirm("This demo still has a sample WhatsApp number. Update WHATSAPP_NUMBER in script.js to your shop number before using it. Open WhatsApp anyway?");
    if(!proceed)return;
  }
  const name=document.getElementById("customerName").value.trim();
  const phone=document.getElementById("customerPhone").value.trim();
  const address=document.getElementById("customerAddress").value.trim();
  const lines=ids.map(id=>{const p=products.find(x=>x.id===Number(id));return `• ${p.name} x ${cart[id]} ${p.unit} — ${money(p.price*cart[id])}`;});
  const total=ids.reduce((sum,id)=>sum+products.find(p=>p.id===Number(id)).price*cart[id],0);
  const message=`Hello ${SHOP_NAME}, I would like to enquire about these items:\n\n${lines.join("\n")}\n\nEstimated total: ${money(total)}\n\nCustomer name: ${name}\nCustomer phone: ${phone}\nAddress / city: ${address||"Not provided"}\n\nPlease confirm availability and final price.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank","noopener");
});
renderFilters();renderProducts();renderCart();
