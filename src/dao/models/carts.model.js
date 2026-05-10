import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      quantity: { type: Number, default: 1 },
    },
  ],
});

cartSchema.plugin(mongoosePaginate);

cartSchema.pre(/^find/, function () {
  this.populate("products.product");
});

export const CartModel = mongoose.model("Cart", cartSchema, cartsCollection);
