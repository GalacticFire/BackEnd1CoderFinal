import fs from "fs/promises";
import path from "path";
import { __dirname } from "../../utils/index.js";

export default class ProductManager {
  constructor() {
    this.path = path.join(__dirname, "..", "data", "products.json");
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const newProduct = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      ...product,
      status: true
    };
    products.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(p => p.id === parseInt(id));
  }

  async updateProduct(id, updateData) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return null;

    products[index] = { ...products[index], ...updateData, id: products[index].id };
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return products[index];
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const filteredProducts = products.filter(p => p.id !== parseInt(id));
    if (products.length === filteredProducts.length) return null;
    await fs.writeFile(this.path, JSON.stringify(filteredProducts, null, 2));
    return true;
  }
}
