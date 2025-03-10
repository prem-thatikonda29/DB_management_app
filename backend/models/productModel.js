import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false, default: "" },
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);
export default productModel;
