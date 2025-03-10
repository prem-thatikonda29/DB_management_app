import productModel from "../models/productModel.js";

// Get all products
export async function getProducts(req, res, next) {
  try {
    const products = await productModel.find();
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

// Get a single product by ID
export async function getSingleProduct(req, res, next) {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product with that ID doesn't exist" });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

// Create a new product
export async function createProduct(req, res, next) {
  try {
    const { name, price, description } = req.body;
    const image = req.file ? req.file.filename : "";

    if (!name || !price || !description) {
      return res
        .status(400)
        .json({ message: "Name, price, and description are required" });
    }

    const newProduct = new productModel({ name, price, description, image });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
}

// Delete a product
export async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
}

// Edit a product
export async function editProduct(req, res, next) {
  try {
    console.log("Received body:", req.body);
    console.log("Received file:", req.file);

    const { id } = req.params;
    const { name, price, description } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updateFields = { name, price, description };
    if (image) updateFields.image = image;

    const editedProduct = await productModel.findByIdAndUpdate(
      id,
      updateFields,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!editedProduct) {
      return res.status(404).json({ message: "Couldn't edit product" });
    }

    res
      .status(200)
      .json({ message: "Product Edited successfully", product: editedProduct });
  } catch (error) {
    console.error("Edit Product Error:", error);
    next(error);
  }
}
