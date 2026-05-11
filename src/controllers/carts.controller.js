import CartDAO from "../dao/cart.dao.js";
import { CartModel } from "../dao/models/carts.model.js";
import { getProducts } from "./products.controller.js";

const cartService = new CartDAO();

// C - Create
export const createCart = async (req, res) => {
  try {
    const result = await cartService.createCart(req.body);
    return await res.status(201).json({ status: "success", payload: result });
  } catch (error) {
    res.status(401).json({ status: "error", error: error.message });
  }
};

// R - Read
export const getCartByID = async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await cartService.getCartByID(cid);
    return await res.status(200).json({ status: "success", payload: result });
  } catch (error) {
    return res.status(404).json({ status: "error", error: error.message });
  }
};

// U - Update

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const result = await cartService.addProductToCart(cid, pid);
    return await res.status(201).json({ status: "success", payload: result });
  } catch (error) {
    return res.status(404).json({ status: "error", error: error.message });
  }
};
