import { Router } from "express";
import {
  createCart,
  getCartByID,
  addProductToCart,
} from "../controllers/carts.controller.js";

const router = Router();

router.post("/", createCart);
router.get("/:cid", getCartByID);
router.post("/:cid/products/:pid", addProductToCart);

export default router;
