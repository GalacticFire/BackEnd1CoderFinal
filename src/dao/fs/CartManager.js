import fs from "fs/promises";
import path from "path";
import { __dirname } from "../../utils/index.js";

export default class CartManager {
  constructor() {
    this.path = path.join(__dirname, "..", "data", "carts.json");
  }

  async getCarts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async createCart() {
    const carts = await this.getCarts();
    const newCart = {
      id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
      products: []
    };
    carts.push(newCart);
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(c => c.id === parseInt(id));
  }

  async addProductToCart(cid, pid) {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex(c => c.id === parseInt(cid));
    if (cartIndex === -1) throw new Error("Carrito no encontrado");

    const productIndex = carts[cartIndex].products.findIndex(p => p.product === parseInt(pid));
    
    if (productIndex !== -1) {
      carts[cartIndex].products[productIndex].quantity++;
    } else {
      carts[cartIndex].products.push({ product: parseInt(pid), quantity: 1 });
    }

    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return carts[cartIndex];
  }
}
