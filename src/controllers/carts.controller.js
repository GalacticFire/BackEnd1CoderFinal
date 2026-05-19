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

// export const getProductInCart = async (req, res) => {
//   try {
//     const { cid, pid } = req.params;
//     const result = await cartService.getProductInCart(cid, pid);
//     return await res.status(200).json(result);
//   } catch (error) {
//     return res.status(404).json({ status: "error", error: error.message });
//   }
// };

// U - Update

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body;
    const result = await cartService.addProductToCart(cid, pid, quantity);
    return await res.status(201).json({ status: "success", payload: result });
  } catch (error) {
    return res.status(409).json({ status: "error", error: error.message });
  }
};

export const quantityProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (Number.isNaN(Number(quantity))) {
      return res.status(400).json({
        status: "error",
        message: "Amount debe ser un numero",
      });
    }

    const result = await cartService.quantityProduct(
      cid,
      pid,
      Number(quantity),
    );

    return res.status(200).json({
      status: "success",
      payload: result,
    });
  } catch (error) {
    return res.status(409).json({
      status: "error",
      error: error.message,
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const updateData = req.body;

    const result = await cartService.updateCart(cid, updateData);

    return res.status(201).json({ status: "succes", payload: result });
  } catch (error) {
    return res.status(409).json({
      status: "error",
      error: error.message,
    });
  }
};
// D - Delete

export const deletedProduct = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const result = await cartService.deleteProduct(cid, pid);

    return await res.status(200).json({
      status: "successs el siguiente producto fue eliminado del carrito: ",
      payload: result,
    });
  } catch (error) {
    return res.status(409).json({ status: "error", error: error.message });
  }
};

export const emptyCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const result = await cartService.emptyCart(cid);

    res.status(200).json({ status: "success", message: "Carrito vaciado" });
  } catch (error) {
    return res.status(404).json({ status: "error", error: error.message });
  }
};
