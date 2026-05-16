import { Router } from "express";
import productsRoutes from "./products.router.js";
import cartsRoutes from "./carts.router.js";
import viewsRoutes from "./views.router.js";

const apiRouter = Router();
const viewRouter = Router();

apiRouter.use("/products", productsRoutes);
apiRouter.use("/carts", cartsRoutes);
viewRouter.use("/", viewsRoutes);

export { apiRouter, viewRouter };
