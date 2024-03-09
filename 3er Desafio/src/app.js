import ProductManager from "./ProductManager";

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Mi primera chamba con Express JS");
});

const PUERTO = 3000;

app.listen(PUERTO, () => {
  console.log(`Escuchando en el puerto: ${PUERTO}`);
});

const myProducts = [
  { id: 1, nombre: "Chucrut", precio: 3350 },

  { id: 2, nombre: "Berenjena en Escabeche", precio: 1550 },

  { id: 3, nombre: "Pollo en Escabeche", precio: 2150 },

  { id: 4, nombre: "Budin de Pan", precio: 4350 },

  { id: 5, nombre: "Panqueques de Chocolate", precio: 3450 },

  { id: 6, nombre: "Mermelada de Calabaza", precio: 2650 },
];

app.get("ProductManager/products", (req, res) => {
  res.send(myProducts);
});

app.get("ProductManager/products/:id", (req, res) => {
  let id = req.params.id;

  const Product = myProducts.find((product) => product.id == id);
  if (Product) {
    res.send(Product);
  } else {
    res.send("El producto no fue encontrado");
  }
});

app.get("ProductManager/product", (req, res) => {
  let limit = parseInt(req.query.limit);

  const Product = myProducts.slice(0, limit);
  res.send(Product);
});
