let cartId = localStorage.getItem("cartId");

const cartLink = document.getElementById("cart-link");

async function checkCart() {
  if (!cartId) {
    const response = await fetch("/api/carts", { method: "POST" });
    const result = await response.json();
    cartId = result.payload._id;
    localStorage.setItem("cartId", cartId);
  }
}

checkCart();

async function addProductToCart(cid, pid, quantity) {
  try {
    const response = await fetch(`/api/carts/${cid}/products/${pid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Producto Agregado");
    } else {
      alert(`Error: ${result.error}`);
    }
  } catch (error) {}
}

document.addEventListener("click", async (e) => {
  // if (e.target.classList.contains("add-to-cart")) {
  //   const pid = e.target.getAttribute("data-id");
  //   const cid = localStorage.getItem("cartId");
  //   return addProductToCart(cid, pid);
  // }

  if (e.target.id === "cart-link") {
    e.preventDefault();
    const currentCid = localStorage.getItem("cartId");

    if (currentCid) {
      window.location.href = `/carts/${currentCid}`;
    } else {
      alert("Tu carrito se está creando, intenta nuevamente");
    }
  }

  if (e.target.classList.contains("add-to-cart")) {
    const pid = e.target.getAttribute("data-id");
    const cid = localStorage.getItem("cartId");

    const btn = e.target;
    const card = btn.closest(".product-card");
    const inputElement = card.querySelector(".quantity-input");

    let quantity = parseInt(inputElement.value);
    const productId = btn.dataset.id;

    return await addProductToCart(cid, pid, quantity);
  }
});
