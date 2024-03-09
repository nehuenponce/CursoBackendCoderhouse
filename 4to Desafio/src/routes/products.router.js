const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/productManager.js");
const productManager = new ProductManager("src/models/productos.json");

router.delete("/products/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const deletedProduct = await productManager.deleteProduct(id);
    res.status(200).json({
      message: "Producto eliminado",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/products", async (req, res) => {
  try {
    const productReq = req.body;
    const product = await productManager.addProduct(productReq);
    console.log(product);
    res.status(200).json({ message: "Producto agregado", product: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
