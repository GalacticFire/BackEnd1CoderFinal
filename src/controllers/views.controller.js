import CartDAO from "../dao/cart.dao.js";
import ProductDAO from "../dao/product.dao.js";

const cartService = new CartDAO();
const ProductService = new ProductDAO();

export const renderProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, category } = req.query;
    const filter = category ? { category } : {};
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort === "asc" ? { price: 1 } : { price: -1 },
      lean: true,
    };

    const result = await ProductService.getProducts(filter, options);

    res.render("products", {
      products: result.docs,
      page: result.page,
      totalPages: result.totalPages,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
    });
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
};

export const renderProductDetail = async (req, res) => {
  try {
    const { pid } = req.params;
    const result = await ProductService.getProductByID(pid);

    res.render("productDetail", {
      product: result,
    });
  } catch (error) {
    res.status(500).send("Error interno del servidor");
  }
};

export const renderCart = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartService.getCartByID(cid);
  if (!cart) return res.render("404", { meesage: "Carrito no encontrado" });
  res.render("cart", { cart: cart.toObject() });
};
