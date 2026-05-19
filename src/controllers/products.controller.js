import ProductDAO from "../dao/product.dao.js";
const productService = new ProductDAO();

//C - Create
export const createProduct = async (req, res) => {
  try {
    const result = await productService.createProduct(req.body);
    req.io.emit("stockUpdated", { message: "El stock ha cambiado" });
    res.status(201).json({ status: "success", payload: result });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

//R - Read
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

    const result = await productService.getProducts(filter, options);

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
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const getProductByID = async (req, res) => {
  try {
    const { pid } = req.params;
    const result = await productService.getProductByID(pid);
    return res.json({ result });
  } catch (error) {
    return res.status(404).send("Producto no encontrado");
  }
};

//U update
export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    if (!pid) {
      return res.status(400).json(error, "Faltan información.");
    }

    const updateData = await productService.updateProduct(pid, req.body);

    if (!updateData) {
      return res.status(400).json(error, "Error en los campos actualizar.");
    }
    req.io.emit("stockUpdated", { message: "El stock ha cambiado" });
    return res.status(200).json({ status: "success", payload: updateData });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Ha ocurrido un error",
      error: error.message,
    });
  }
};

// D - Delete
export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const result = await productService.deleteProduct(pid);
    req.io.emit("stockUpdated", { message: "El stock ha cambiado" });
    return res.status(201).json({ status: "Delete", payload: result });
  } catch (error) {
    return res.status(400).json("No se pudo elimnar");
  }
};
