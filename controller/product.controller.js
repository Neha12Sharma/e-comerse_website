import { Product } from "../model/product.model.js";

// Get all products
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Create product
export const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).json(newProduct);
};

// Update product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedProduct);
};

// Delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.json({ message: "Product deleted" });
};

// Search products by name
export const searchProducts = async (req, res) => {
  const { keyword } = req.query;
  const result = await Product.find({
    name: { $regex: keyword, $options: "i" }
  });
  res.json(result);
};
