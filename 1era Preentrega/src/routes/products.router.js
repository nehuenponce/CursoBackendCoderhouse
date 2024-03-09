const express = require("express");
const productsRouter = express.Router();
const ProductManager = require("../controllers/productManager");
const productManager = new ProductManager("./src/models/productos.json");

productsRouter.get("/", async (req, res) => {
  try {
    let limit = req.query.limit;
    let products = await productManager.getProducts();
    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    let id = req.params.pid;
    let product = await productManager.getProductById(id);
    if (!product) {
      return res.json({ error: "id no encontrado" });
    }
    return res.json(product);
  } catch (error) {
    res.status(500).json({
      error: `Error del servidor, no se encuentra el id ${id}`,
    });
  }
});

productsRouter.post("/", async (req, res) => {
  const newProduct = req.body;

  try {
    await productManager.addProduct(newProduct);
    res.status(201).json({ status: "success", message: "Producto creado!" });
  } catch (error) {
    res.send("Error al agregar producto");
  }
});

productsRouter.put("/:pid", async (req, res) => {
  let id = req.params.pid;
  let productoActualizado = req.body;

  try {
    await productManager.updateProduct(id, productoActualizado);
    res.json({ message: "Producto actualizado." });
  } catch (error) {
    console.log("Error al actualizar el produto", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});
productsRouter.delete("/:pid", async (req, res) => {
  let id = req.params.pid;

  try {
    await productManager.deleteProduct(id);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.log("Error al eliminar el produto", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

module.exports = productsRouter;
