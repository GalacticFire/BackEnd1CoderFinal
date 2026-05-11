import { ProductModel } from "./models/products.model.js";

export default class ProductDAO {
  createProduct = async (product) => {
    return await ProductModel.create(product);
  };

  getProducts = async (filter, options) => {
    return await ProductModel.paginate(filter, { options, lean: true });
  };

  getProductByID = async (pid) => {
    return await ProductModel.findById(pid).lean();
  };

  updateProduct = async (pid, updateData) => {
    return await ProductModel.findByIdAndUpdate(pid, updateData, {
      returnDocument: "after",
    });
  };

  deleteProduct = async (pid) => {
    return await ProductModel.findByIdAndDelete(pid);
  };
}
