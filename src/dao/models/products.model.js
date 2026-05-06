import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    code: { type: Number, unique: true},
    price: Number,
    status: String,
    stock: Number,
    category: { type: String, index: true },
    thumbnails: [],
  },
  {
    timestamps: true,
    strict: true,
  },
);

productSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model(
  "product",
  productSchema,
  productsCollection,
);
