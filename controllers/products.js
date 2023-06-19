const data = require("../models/model.js");
const validationMiddleware = require("../services/validation.js");
const getAllProductsController = (req, res) => {
  try {
    const products = data;
    console.log(products);
    res.json(products);
  } catch (error) {
    res.status(404).json(JSON.parse(error.message));
  }
};

const getProductByIdController = (req, res) => {
  try {
    const id = Number(req.params.id);
    const products = data;
    const requestedProducts = products.filter((product) => product.id === id);
    if (!requestedProducts.length) throw new Error("Product not found");
    res.json(requestedProducts);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const deleteProductController = (req, res) => {
  try {
    const id = Number(req.params.id);
    const products = data;
    const index = products.findIndex((product) => product.id === id);
    if(index === -1) throw new Error("Product not found");
    const deletedProduct = products[index];
    products.splice(index,1);
    res.json(deletedProduct);
  } catch (error) {
    res.status(404).json(error.message);
  }
}; 

const addProductController = (req, res) => {
  try {
    const products = data;
    const newProduct = req.body;
    products.push(newProduct);
    res.json(newProduct);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const updateProductController = (req, res) => {
  try {
    const id = Number(req.params.id);
    let products = data;
    const updatedProduct = req.body;
    let found = false;
    products.forEach((product) => {
      if (product.id === id) {
        product.name = updatedProduct.name;
        product.image = updatedProduct.image;
        found = true;
      }
    });
    if (!found) products.push(updatedProduct);
    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json(error.message);
  }
}

function Controller(app) {
  app.get("/", getAllProductsController);
  app.get("/:id", getProductByIdController);
  app.post("/", validationMiddleware, addProductController);
  app.delete("/:id", deleteProductController);
  app.put("/:id", validationMiddleware, updateProductController);
}

module.exports = Controller;
