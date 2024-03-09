const express = require("express");
const app = express();
const PUERTO = 3000;
const exphbs = require("express-handlebars");
const socket = require("socket.io");

const viewsRouter = require("./routes/views.router.js");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

app.use(express.static("./src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const httpServer = app.listen(PUERTO, () => {
  console.log("Conectado en http://localhost:3000");
});

const ProductManager = require("./controllers/productManager.js");
const productManager = new ProductManager("./src/models/productos.json");

const io = socket(httpServer);

io.on("connection", async (socket) => {
  console.log("Hola chambeador nato, soy el cliente que se conecto");
  const products = await productManager.getProducts();
  socket.emit("productos", products);

  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(id);
    const products = await productManager.getProducts();
    io.sockets.emit("products", products);
  });

  socket.on("addProduct", async (product) => {
    try {
      await productManager.addProduct(product);
      const products = await productManager.getProducts();
      io.sockets.emit("products", products);
    } catch (error) {
      console.log("Error al cargar producto");
    }
  });
});
