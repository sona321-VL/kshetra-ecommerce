import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

export const createCategory = async (req, res) => {
  const { name, image, description } = req.body;
  const category = await Category.create({ name, image, description });
  res.status(201).json(category);
};
