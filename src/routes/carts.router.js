import { Router } from "express";
import {
  createCart,
  getCartByID,
  addProductToCart,
  deletedProduct,
  quantityProductToCart,
  emptyCart,
} from "../controllers/carts.controller.js";

const router = Router();

router.post("/", createCart);
router.get("/:cid", getCartByID);
router.post("/:cid/products/:pid", addProductToCart);
router.delete("/:cid/products/:pid", deletedProduct);
router.delete("/:cid", emptyCart);
router.put("/:cid/products/:pid/", quantityProductToCart);

export default router;
