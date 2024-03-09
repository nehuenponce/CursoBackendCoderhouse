const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const productManager = require("../app");

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./src/models/productos.json";
  }

  async addProduct(newObject) {
    let { title, description, price, thumbnail, code, stock } = newObject;
    let id = uuidv4();
    let products = await this.readFile();

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((item) => item.code === code)) {
      console.log("El codigo debe ser unico");
      return;
    }
    const newProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    products.push(newProduct);

    await this.saveFile(products);
  }

  async getProducts() {
    try {
      const arrayProductos = this.readFile();
      return arrayProductos;
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
  }

  async getProductById(id) {
    try {
      const arrayProductos = await this.readFile();
      const prodFinded = arrayProductos.find((item) => item.id == id);

      if (!prodFinded) {
        console.log("Producto no encontrado");
      } else {
        console.log("Producto encontrado! ");
        return prodFinded;
      }
    } catch (error) {
      console.log("Error al leer el archivo ", error);
    }
  }
  async readFile() {
    try {
      const respuesta = await fs.readFile(this.path, "utf-8");
      const arrayProductos = JSON.parse(respuesta);
      return arrayProductos;
    } catch (error) {
      console.log("Eerror al leer un archivo", error);
    }
  }
  async saveFile(arrayProductos) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    } catch (error) {
      console.log("Error al guardar el archivo", error);
    }
  }
  async updateProduct(id, productoActualizado) {
    try {
      const arrayProductos = await this.readFile();

      const index = arrayProductos.findIndex((item) => item.id === id);

      if (index !== -1) {
        arrayProductos[index] = {
          ...arrayProductos[index],
          ...productoActualizado,
        };
        await this.saveFile(arrayProductos);
        console.log("Producto actualizado");
      } else {
        console.log("no se encontró el producto");
      }
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }
  async deleteProduct() {
    let products = this.getProducts();
    const index = arrayProductos.findIndex((item) => item.id === id);
    if (index !== -1) {
      products.splice(index, 1);
      await this.saveFile(products);
    } else {
      console.log("Producto no encontrado para eliminar");
    }
  }
}

module.exports = ProductManager;
