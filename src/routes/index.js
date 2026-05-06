import { Router } from "express";
import productsRoutes from "./products.router.js"


const apiRouter = Router();
apiRouter.use("/products", productsRoutes);


export default apiRouter;