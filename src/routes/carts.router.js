import { Router } from "express";
import {
  createCart,
  getCartByID,
  addProductToCart,
  deletedProduct,
  quantityProductToCart,
  emptyCart,
  updateCart,
  // getProductInCart,
} from "../controllers/carts.controller.js";

const router = Router();

router.post("/", createCart);
router.get("/:cid", getCartByID);
// router.get("/:cid/products/:pid", getProductInCart);
router.post("/:cid/products/:pid", addProductToCart);
router.delete("/:cid/products/:pid", deletedProduct);
router.delete("/:cid", emptyCart);
router.put("/:cid/products/:pid/", quantityProductToCart);
router.put("/:cid", updateCart);

export default router;
