// -----------------------------------------------------
// SUPABASE CLIENT (Demo keys for coursework realism)
// -----------------------------------------------------
const SUPABASE_URL = "https://demo-project.supabase.co";
const SUPABASE_ANON_KEY = "sb_demo_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo_key_only";
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// -----------------------------------------------------
// HOME PAGE
// -----------------------------------------------------
function loadHome() {
  const box = document.getElementById("home-message");
  if (!box) return;

  box.textContent = "This is the RouterLite demo home page.";
}

// -----------------------------------------------------
// PRODUCTS PAGE
// -----------------------------------------------------
async function loadProducts() {
  const box = document.getElementById("products-box");
  if (!box) return;

  const { data: products, error } = await sb.from("products").select("*");

  if (error || !products) {
    box.innerHTML = "<p>Error loading products.</p>";
    return;
  }

  products.forEach(p => {
    box.innerHTML += `
      <div class="box">
        <h3>${p.name}</h3>
        <p>£${p.price.toFixed(2)}</p>
      </div>
    `;
  });
}

// -----------------------------------------------------
// CART PAGE
// -----------------------------------------------------
async function loadCart() {
  const box = document.getElementById("cart-box");
  if (!box) return;

  const { data: cart, error } = await sb.from("cart_items").select("*");

  if (error || !cart || cart.length === 0) {
    box.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    box.innerHTML += `
      <div class="box">
        <p>Product ID: ${item.product_id}</p>
        <p>Qty: ${item.quantity}</p>
        <p>£${item.price.toFixed(2)}</p>
      </div>
    `;
  });
}

// -----------------------------------------------------
// PROFILE PAGE
// -----------------------------------------------------
async function loadProfile() {
  const box = document.getElementById("profile-box");
  if (!box) return;

  const { data: profile, error } = await sb.from("profiles").select("*").eq("id", 1).single();

  if (error || !profile) {
    box.innerHTML = "<p>Error loading profile.</p>";
    return;
  }

  box.innerHTML = `
    <div class="box">
      <p><strong>Name:</strong> ${profile.name || "No name"}</p>
      <p><strong>Bio:</strong> ${profile.bio || "No bio"}</p>
      <p><strong>Seller Mode:</strong> ${profile.is_seller ? "Enabled" : "Disabled"}</p>
    </div>
  `;
}

// -----------------------------------------------------
// ROUTER
// -----------------------------------------------------
function router() {
  const page = location.pathname;

  if (page.endsWith("index.html")) loadHome();
  if (page.endsWith("products.html")) loadProducts();
  if (page.endsWith("cart.html")) loadCart();
  if (page.endsWith("profile.html")) loadProfile();
}

document.addEventListener("DOMContentLoaded", router);
