import { CartModel } from "./models/carts.model.js";

export default class CartDAO {
  // C - Create
  createCart = async (cart) => {
    return CartModel.create(cart);
  };

  // R - Read
  getCarts = async (filter, options) => {
    return await CartModel.getPageinated(filter, { options, lean: true });
  };

  getCartByID = async (cid) => {
    return await CartModel.findById(cid);
  };

  // U - Update

  addProductToCart = async (cid, pid) => {
    const updatedCart = await CartModel.findOneAndUpdate(
      { _id: cid, "products.product": pid },
      { $inc: { "products.$.quantity": 1 } },
      { returnDocument: "after", lean: true },
    );

    if (!updatedCart) {
      return await CartModel.findByIdAndUpdate(cid, {
        $push: { products: { product: pid } },
      });
    }
    return updatedCart;
  };

  updateCart = async (cid, updateData) => {
    return await CartModel.findByIdAndUpdate(cid, updateData, {
      returnDocument: "after",
    });
  };

  quantityProduct = async (cid, pid, quantity) => {
    const cart = await CartModel.findById(cid).lean();
    if (!cart) return null;

    const productInCart = cart.products.find(
      (p) => p.product?.toString() === pid,
    );

    if (!productInCart) return cart;

    const newQuantity = productInCart.quantity + quantity;

    if (newQuantity <= 0) {
      return await CartModel.findByIdAndUpdate(
        cid,
        { $pull: { products: { product: pid } } },
        { returnDocument: "after", lean: true },
      );
    }

    return await CartModel.findOneAndUpdate(
      { _id: cid, "products.product": pid },
      { $set: { "products.$.quantity": newQuantity } },
      { returnDocument: "after", lean: true },
    );
  };

  // D - Delete

  deleteProduct = async (cid, pid) => {
    const updatedCart = await CartModel.findOneAndUpdate(
      { _id: cid },
      { $pull: { products: { product: pid } } },
      { returnDocument: "after", lean: true },
    );

    return updatedCart;
  };

  emptyCart = async (cid) => {
    return await CartModel.findByIdAndUpdate(
      cid,
      {
        $set: { products: [] },
      },
      { returnDocument: "after", lean: true },
    );
  };
}
