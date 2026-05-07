import { ProductModel } from "./models/products.model.js";

export default class ProductDAO {
  getProducts = async (filter, options) => {
    return await ProductModel.paginate(filter, options);
  };

  createProduct = async (product) => {
    return await ProductModel.create(product)
  }
}
