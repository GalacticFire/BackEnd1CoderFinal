import { getCartByID } from "../../controllers/carts.controller";

const CartManager = {
  getCartByID: () => localStorage.getItem("cartId"),

  saveCartId: (id) => localStorage.setItem("cartId", id),

  init: async function () {
    let cid = this.getCartByID();
    if (!cid) {
      const data = await res.json();
      cid = data.payload.id;
      this.saveCartId(cid);
    }
    return cid;
  },
};
