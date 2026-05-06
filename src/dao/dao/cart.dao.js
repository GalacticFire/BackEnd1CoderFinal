import { CartModel } from '../models/carts.model.js';



export default class CartDAO {

    getPageinated = async (filter, options) => {

        return await CartModel.getPageinated(filter, options);
    }
};


