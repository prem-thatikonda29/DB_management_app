import express from "express";
import {
  createProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  editProduct,
} from "../controllers/productController.js";

import upload from "../multerConfig.js";

const productRouter = new express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getSingleProduct);
productRouter.post("/", upload.single("image"), createProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.put("/:id", upload.single("image"), editProduct);

export default productRouter;
