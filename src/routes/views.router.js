import { Router } from "express";
import { renderProducts } from "../controllers/views.controller.js";

const router = Router();

router.get("/", renderProducts);

export default router;
