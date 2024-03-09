const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/productManager.js");
const productManager = new ProductManager("./src/models/productos.json");

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    let isProducts = products.length > 0;
    res.render("home", { products, title: "Home", isProducts });
  } catch (error) {
    console.log("Error al obtener los productos", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/realTimeProducts", async (req, res) => {
  try {
    res.render("realTimeProducts", { title: "Productos en tiempo real" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
