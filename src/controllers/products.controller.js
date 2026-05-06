import ProductDAO from "../dao/dao/product.dao.js";
const productService = new ProductDAO();

export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, category } = req.query;

    const filter = category ? { category } : {};
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort === "asc" ? { price: 1 } : { price: -1 },
      lean: true,
    };

    const result = await productService.getPaginated(filter, options);

    res.send({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `/api/products?page=${result.prevPage}`
        : null,
      nextLink: result.hasNextPage
        ? `/api/products?page=${result.nextPage}`
        : null,
    });
  } catch (Error) {
    res.status(500).json({ status: "error", message: Error.message });
  }
};

export const addProducts = async (req, res) => {
  try {
    const result = await productService.addProducts(req.body);
    res.status(201).json({ status: "success", payload: result });
  } catch (Error) {
    res.status(400).json({ status: "error", message: Error.message });
  }
};
