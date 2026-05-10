import { CartModel } from "./models/carts.model.js";

export default class CartDAO {
   
    // C - Create
  createCart = async (cart) => {
    return CartModel.create(cart);
  };

  // R - Read
  getCarts = async (filter, options) => {
    return await CartModel.getPageinated(filter,{ options, lean: true});
  };

  getCartByID = async (cid) => {
    return await CartModel.findById(cid);
  };

  // U - Update
  updateCart = async (cid, updateData) => {
    return await CartModel.findByIdAndUpdate(cid, updateData, {new: true});
  }


  // D - Delete 

  deleteCart = async(cid) => {
    return await CartModel.findByIdAndDelete(cid);
  };
  
}
