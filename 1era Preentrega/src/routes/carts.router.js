const express = require("express");
const cartRouter = express.Router();
const CartManager = require("../controllers/cartManager.js");
const cartManager = new CartManager("./src/models/carrito.json");

cartRouter.post("/", async (req, res) => {
  try {
    let newCart = await cartManager.createCart();
    res.json(newCart);
  } catch (error) {
    console.error("Error al crear nuevo carrito", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

cartRouter.get("/:cid", async (req, res) => {
  let cartId = parseInt(req.params.cid);

  try {
    const cart = await cartManager.getCartById(cartId);
    res.json(cart.products);
  } catch (error) {
    console.error("Error al obtener carrito", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  let cartId = parseInt(req.params.cid);
  let productId = req.params.pid;
  let quantity = req.body.quantity || 1;

  try {
    const updateCart = await cartManager.addProductToCart(
      cartId,
      productId,
      quantity
    );
    res.json(updateCart.products);
  } catch (error) {
    console.error("Error al agregar producto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = cartRouter;
