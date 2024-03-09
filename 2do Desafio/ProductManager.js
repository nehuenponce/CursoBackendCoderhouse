const { error } = require("console");

const fs = require("fs").promises;

class ProductManager {
  constructor() {
    this.path = products.json;
  }
  async crearProducto(productos) {
    try {
      const ProductosActuales = await fs.leerProductos(this.path);
      ProductosActuales.push(productos);
      await this.guardarProducto(ProductosActuales);
    } catch {
      console.log("error al crear el producto", error);
    }
  }
  async leerProductos() {
    try {
      const contenido = await fs.readFile(this.path, "utf-8");
      return JSON.parse(contenido);
    } catch {
      console.log("Error  al leer los productos", error);
    }
  }
  async guardarProducto(ProductsArray) {
    try {
      await fs.writeFile(this.path, JSON.stringify(ProductsArray, null, 2));
    } catch {
      console.log("Error al guardar el producto", error);
    }
  }
}
