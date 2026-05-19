import { CartModel } from "./models/carts.model.js";
import { ProductModel } from "./models/products.model.js";

export default class CartDAO {
  // C - Create
  createCart = async (cart) => {
    return CartModel.create(cart);
  };

  // R - Read
  getCarts = async (filter, options) => {
    return await CartModel.getPageinated(filter, { options, lean: true });
  };

  getCartByID = async (cid) => {
    return await CartModel.findById(cid);
  };

  // getProductInCart = async (cid, pid) => {
  //   try {
  //     const cart = await CartModel.findById(cid).lean();
  //     if (!cart) throw new Error("El carrito no existe");
  //     const productInCart = cart.products.find(
  //       (p) => p.product?._id?.toString() === pid,
  //     );

  //     if (productInCart) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (error) {
  //     throw new Error(null);
  //   }
  // };

  // U - Update

  addProductToCart = async (cid, pid, quantity = 1) => {
    const updatedProduct = await ProductModel.findOneAndUpdate(
      {
        _id: pid,
        stock: { $gte: quantity },
      },
      { $inc: { stock: -quantity } },
      { returnDocument: "after", lean: true },
    );

    if (!updatedProduct) {
      throw new Error("No hay stock disponible");
    }

    const updatedCart = await CartModel.findOneAndUpdate(
      { _id: cid, "products.product": pid },
      { $inc: { "products.$.quantity": quantity } },
      { returnDocument: "after", lean: true },
    );

    if (!updatedCart) {
      return await CartModel.findByIdAndUpdate(
        cid,
        {
          $push: { products: { product: pid, quantity: quantity } },
        },
        { returnDocument: "after", lean: true },
      );
    }
    return updatedCart;
  };

  updateCart = async (cid, updateData) => {
    if (updateData.products) {
      for (const item of updateData.products) {
        const product = await ProductModel.findById(item.product);

        if (!product) {
          throw new Error(`Prodcuto ${item.product} no existe`);
        }

        if (product.stock < item.quantity) {
          throw new Error(
            `Stock insuficiente para el producto ${item.product}`,
          );
        }
      }
    }
    return await CartModel.findByIdAndUpdate(cid, updateData, {
      returnDocument: "after",
    });
  };

  quantityProduct = async (cid, pid, quantity) => {
    const cart = await CartModel.findById(cid).lean();
    if (!cart) return null;

    const productInCart = cart.products.find(
      (p) => p.product?._id?.toString() === pid,
    );

    if (!productInCart) {
      throw new Error("El producto no esta en el carrito");
    }

    if (quantity <= 0) {
      const productInCart = cart.products.find(
        (p) => p.product._id?.toString() === pid,
      );

      await ProductModel.findByIdAndUpdate(pid, {
        $inc: { stock: productInCart.quantity },
      });

      return await CartModel.findByIdAndUpdate(
        cid,
        { $pull: { products: { product: pid } } },
        { returnDocument: "after", lean: true },
      );
    }

    const product = await ProductModel.findById(pid);

    if (!product) {
      throw new Error("Producto no existe");
    }

    const diff = quantity - productInCart.quantity;

    if (diff > 0 && product.stock < diff) {
      throw new Error("stock insuficiente");
    }

    await ProductModel.findByIdAndUpdate(pid, {
      $inc: { stock: -diff },
    });

    return await CartModel.findOneAndUpdate(
      { _id: cid, "products.product": pid },
      { $set: { "products.$.quantity": quantity } },
      { returnDocument: "after", lean: true },
    );
  };

  // D - Delete

  deleteProduct = async (cid, pid) => {
    const cart = await CartModel.findById(cid).lean();

    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    const cartProduct = cart.products.find(
      (p) => p.product._id?.toString() === pid,
    );

    if (!cartProduct) {
      throw new Error("Producto no encontrado en el carrito");
    }

    const quantity = cartProduct.quantity;

    await ProductModel.findByIdAndUpdate(pid, { $inc: { stock: quantity } });

    const updatedCart = await CartModel.findOneAndUpdate(
      { _id: cid },
      { $pull: { products: { product: pid } } },
      { returnDocument: "after", lean: true },
    );

    return updatedCart;
  };

  emptyCart = async (cid) => {
    const cart = await CartModel.findById(cid).lean();

    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    for (const item of cart.products) {
      await ProductModel.findByIdAndUpdate(item.product._id, {
        $inc: { stock: item.quantity },
      });
    }

    return await CartModel.findByIdAndUpdate(
      cid,
      {
        $set: { products: [] },
      },
      { returnDocument: "after", lean: true },
    );
  };
}
