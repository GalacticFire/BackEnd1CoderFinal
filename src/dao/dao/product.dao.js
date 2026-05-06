import { ProductModel } from '../models/products.model.js';

export default class ProductDAO {

    getPaginated = async (filter, options) => {
        return await ProductModel.paginate(filter, options);
    }
};

