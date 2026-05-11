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

  // D - Delete

  deleteCart = async (cid) => {
    return await CartModel.findByIdAndDelete(cid);
  };
}
