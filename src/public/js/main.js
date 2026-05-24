let cartId = localStorage.getItem("cartId");

const socket = io();

socket.on("stockUpdated", (data) => {
  console.log(data.message);
  window.location.reload();
});

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
      console.error(error);
    }
  } catch (error) {}
}

async function deletedProductInCart(cid, pid) {
  try {
    const response = await fetch(`/api/carts/${cid}/products/${pid}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (response.ok) {
      alert("Producto eliminado del carrito.");
    }
  } catch (error) {
    console.error(error);
  }
}

async function emptyCart(cid) {
  try {
    const response = await fetch(`/api/carts/${cid}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (response.ok) alert("Has vaciado tu carrito.");
  } catch (error) {
    return `Error: ${result.error}`;
  }
}

document.addEventListener("click", async (e) => {
  const cartBtn = e.target.closest("#cart-link");
  if (cartBtn) {
    e.preventDefault();
    const currentCid = localStorage.getItem("cartId");

    if (currentCid) {
      window.location.href = `/carts/${currentCid}`;
    } else {
      alert("Tu carrito se esta creando, intenta nuevamente");
    }
    return;
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

  if (e.target.classList.contains("remove-item-btn")) {
    const pid = e.target.getAttribute("data-id");
    const cid = localStorage.getItem("cartId");

    return await deletedProductInCart(cid, pid);
  }

  if (e.target.id === "empty-cart-btn") {
    const cid = localStorage.getItem("cartId");

    return await emptyCart(cid);
  }
});
