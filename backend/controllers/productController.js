import Product from "../models/Product.js";

/* ================= PUBLIC ================= */

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {

    let query = {};

    if (req.query.keyword) {
      query.name = {
        $regex: req.query.keyword,
        $options: "i",
      };
    }

    if (req.query.category) {
      query.category = {
        $regex: `^${req.query.category}$`,
        $options: "i",
      };
    }

    const products = await Product.find(query);

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



/* ================= ADMIN ================= */


// CREATE PRODUCT
export const createProductAdmin = async (req, res) => {

  try {

    const {
      name,
      description,
      price,
      category,
      images,
      sizes,
      colors,
      stock,
      offer
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      images,
      sizes,
      colors,
      stock,
      offer
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: "Product creation failed" });
  }

};



// UPDATE PRODUCT
export const updateProductAdmin = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });


    const {
      name,
      description,
      price,
      category,
      images,
      sizes,
      colors,
      stock,
      offer
    } = req.body;


    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (images) product.images = images;
    if (sizes) product.sizes = sizes;
    if (colors) product.colors = colors;
    if (stock !== undefined) product.stock = stock;
    if (offer) product.offer = offer;


    const updatedProduct = await product.save();

    res.json(updatedProduct);

  } catch (error) {
    res.status(500).json({ message: "Product update failed" });
  }

};



// DELETE PRODUCT
export const deleteProductAdmin = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();

    res.json({ message: "Product removed successfully" });

  } catch (error) {
    res.status(500).json({ message: "Product delete failed" });
  }

};

export const updateStockAdmin = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.stock = req.body.stock;

    const updatedProduct = await product.save();

    res.json(updatedProduct);

  } catch (error) {

    res.status(500).json({
      message: "Stock update failed"
    });

  }

};
