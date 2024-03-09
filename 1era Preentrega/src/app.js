const express = require("express");
const app = express();
const PUERTO = 3000;
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const ProductManager = require("./controllers/productManager.js");
const productManager = new ProductManager("./src/models/productos.json");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(PUERTO, () => {
  console.log(`conectado en http://localhost:${PUERTO}`);
});

module.exports = productManager;
