import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductByID,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getProducts);
router.get("/:pid", getProductByID);
router.post("/", createProduct);

export default router;
