import { Router } from "express";
import productsRoutes from "./products.router.js";
import cartsRoutes from "./carts.router.js";

const apiRouter = Router();
apiRouter.use("/products", productsRoutes);
apiRouter.use("/carts", cartsRoutes);

export default apiRouter;
