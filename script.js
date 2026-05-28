const scents = {
  provocative: {
    title:"PROVOCATIVE",
    notes:"Wood · Amber · Cacao · Pepper",
    desc:"Designed to command attention. Warm, dark and addictive — this scent turns presence into power."
  },
  elusive: {
    title:"ELUSIVE",
    notes:"Bergamot · Sandalwood · Black Musk · Oud",
    desc:"Mysterious and magnetic. A fragrance that lingers in memory long after you leave."
  },
  apparition: {
    title:"APPARITION",
    notes:"White Musk · Rose · Amber · Apple Blossom",
    desc:"Soft, radiant and sensual — a ghost of beauty that surrounds you."
  },
  desert: {
    title:"DESERT APPARITION",
    notes:"White Musk · Sandalwood · Marine · Apple Blossom",
    desc:"Airy, warm and untouchable — like a mirage in golden light."
  }
};

function openScent(key){
  document.getElementById("scentTitle").innerText = scents[key].title;
  document.getElementById("scentNotes").innerText = scents[key].notes;
  document.getElementById("scentDesc").innerText = scents[key].desc;

  if (typeof setBuyLinks === "function") {
    setBuyLinks(key);
  }

  document.getElementById("scentModal").style.display="flex";
}

function closeScent(){
  document.getElementById("scentModal").style.display="none";
}

function openClub(){
  document.getElementById("clubModal").style.display="flex";
}

function closeClub(){
  document.getElementById("clubModal").style.display="none";
}

// ---------------- Cart Logic ----------------

function getSelectedSize(productName) {
  if (productName === "Provocative") {
    return document.getElementById("sizeSelectProvocative").value;
  }
  if (productName === "Elusive") {
    return document.getElementById("sizeSelectElusive").value;
  }
  if (productName === "Apparition") {
    return document.getElementById("sizeSelectApparition").value;
  }
  if (productName === "Desert Apparition") {
    return document.getElementById("sizeSelectDesert").value;
  }
  return "30"; // fallback
}

function addToCart(productName) {
  let size = null;
  let price = 0;

  if (productName === "Discovery Set") {
    price = 60;
  } else {
    size = getSelectedSize(productName);
    price = size === "30" ? 80 : 150;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // 🔥 merge duplicates instead of creating new rows
  let existingItem = cart.find(item =>
    item.name === productName && item.size === size
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: productName,
      size: size,
      price: price,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  if (productName === "Discovery Set") {
    alert("Discovery Set added to cart");
  } else {
    alert(productName + " (" + size + "mL) added to cart");
  }
}
function openCart() {
  document.getElementById('cartModal').style.display = 'flex';
  renderCart();
}
function closeCart() {
  document.getElementById('cartModal').style.display = 'none';
}
function renderCart() {
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');

  const cartData = JSON.parse(localStorage.getItem('cart')) || [];

  cartItemsEl.innerHTML = '';

  let total = 0;

  cartData.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement('div');
    div.style.borderBottom = "1px solid rgba(0,0,0,0.08)";
    div.style.padding = "12px 0";
    div.style.display = 'flex';
    div.style.justifyContent = 'space-between';
    div.style.marginBottom = '10px';
    div.style.fontFamily = "Playfair Display, serif";

    div.innerHTML = `
  <div style="display:flex; justify-content:space-between; align-items:center; width:100%; gap:20px;">

    <!-- LEFT: PRODUCT INFO -->
    <div style="display:flex; flex-direction:column; min-width:160px;">
      <span style="font-weight:500;">
        ${item.name}
      </span>
      <span style="font-size:12px; opacity:0.7;">
        ${item.size ? item.size + 'mL' : ''}
      </span>
    </div>

    <!-- RIGHT: CONTROLS -->
    <div style="display:flex; align-items:center; gap:12px; justify-content:flex-end;">

     <div style="display:flex; align-items:center; gap:8px;">

  <button onclick="decreaseQty(${index})"
          <button onclick="decreaseQty(${index})"
  style="
    background: transparent;
    border: 1px solid rgba(0,0,0,0.25);
    width: 26px;
    height: 26px;
    cursor: pointer;
    font-size: 16px;
    line-height: 24px;
    display:flex;
    align-items:center;
    justify-content:center;
    color:#111;
  "
  onmouseover="this.style.border='1px solid rgba(0,0,0,0.6)'"
  onmouseout="this.style.border='1px solid rgba(0,0,0,0.25)'"
>
  −
</button>
    −
  </button>

  <span style="min-width:20px; text-align:center;">
    ${item.quantity}
  </span>

  <button onclick="increaseQty(${index})"
          <button onclick="increaseQty(${index})"
  style="
    background: transparent;
    border: 1px solid rgba(0,0,0,0.25);
    width: 26px;
    height: 26px;
    cursor: pointer;
    font-size: 16px;
    line-height: 24px;
    display:flex;
    align-items:center;
    justify-content:center;
    color:#111;
  "
  onmouseover="this.style.border='1px solid rgba(0,0,0,0.6)'"
  onmouseout="this.style.border='1px solid rgba(0,0,0,0.25)'"
>
  +
</button>
    +
  </button>

</div>

      <span style="min-width:60px; text-align:right;">
        $${item.price * item.quantity}
      </span>

      <button onclick="removeFromCart(${index})"
              style="background:none; border:none; cursor:pointer; font-size:16px;">
        ✕
      </button>

    </div>

  </div>
`;

    cartItemsEl.appendChild(div);
  });

  cartTotalEl.innerHTML = "Total: $" + total;
}
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.splice(index, 1);

  localStorage.setItem('cart', JSON.stringify(cart));

  renderCart();
}
function increaseQty(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart[index].quantity += 1;

  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function decreaseQty(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart[index].quantity -= 1;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}
async function checkoutCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cart })
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Checkout failed.");
    }

  } catch (err) {
    console.error(err);
    alert("Error connecting to Stripe checkout.");
  }
}
// ---------------- Share Logic ----------------

function shareScent(key) {
  const url = `${window.location.origin}?scent=${key}`;

  navigator.clipboard.writeText(url);

  alert(`${scents[key].title} link copied`);
}

// Auto-open scent from shared link
const params = new URLSearchParams(window.location.search);
const scentFromUrl = params.get("scent");

if (scentFromUrl && scents[scentFromUrl]) {
  openScent(scentFromUrl);
}