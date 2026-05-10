import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductByID,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:pid", getProductByID);
router.patch("/:pid", updateProduct);
router.delete("/:pid", deleteProduct);

export default router;
