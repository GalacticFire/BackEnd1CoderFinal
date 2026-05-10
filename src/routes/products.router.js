import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductByID,
  deleteProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getProducts);
router.get("/:pid", getProductByID);
router.delete("/:pid", deleteProduct);
router.post("/", createProduct);

export default router;
