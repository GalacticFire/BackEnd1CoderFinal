import { Router } from "express";
import { addProducts, getProducts } from "../controllers/products.controller.js";

const router = Router();

router.get("/products", getProducts);
router.post("/products", addProducts);

export default router;
