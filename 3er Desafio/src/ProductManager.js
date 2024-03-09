import { promises as fsPromises } from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (!this.products) {
        await this.readProduct();
      }

      const existingproduct = this.products.find((i) => i.code === code);

      if (existingproduct) {
        console.error("El producto ya existe");
        return;
      }

      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Todos los campos son obligatorios");
        return;
      }

      let maxId =
        this.products.length > 0
          ? Math.max(...this.products.map((i) => i.id))
          : 0;
      const id = maxId + 1;

      const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id,
      };

      this.products.push(newProduct);
      await this.writeProduct(this.products);
    } catch (error) {
      console.error("El producto no se agrego", error);
    }
  }

  async readProduct() {
    try {
      const response = await fsPromises.readFile(this.path, "utf-8");
      const products = JSON.parse(response);
      this.products = products;
    } catch (error) {
      this.products = [];
    }
  }

  async writeProduct(newProduct) {
    try {
      await fsPromises.writeFile(
        this.path,
        JSON.stringify(newProduct, null, 2)
      );
    } catch (error) {
      console.error("El producto no pudo escribirse", error);
    }
  }

  async getProduct() {
    await this.readProduct();
    console.log(this.products);
  }

  async getProductbyId(id) {
    try {
      await this.readProduct();
      const product = this.products.find((i) => i.id === id);
      if (!product) {
        throw new Error("El producto no fue encontrado");
      }
      console.log("El producto ha sido encontrado: ", product);
    } catch (error) {
      console.error(error);
    }
  }

  async updateProduct(id, updatingProduct) {
    try {
      await this.readProduct();
      const productIndex = this.products.findIndex((i) => i.id === id);

      if (productIndex === -1) {
        console.error("El producto no fue encontrado para actualizar");
        return;
      }

      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatingProduct,
        id: this.products[productIndex].id,
      };

      await this.writeProduct(this.products);
    } catch (error) {
      console.error("Error al actualizar el producto", error);
    }
  }

  async deleteProduct(id) {
    await this.readProduct();
    const filteredProducts = this.products.filter((i) => i.id != id);
    await this.writeProduct(filteredProducts);
  }
}

//Testing Time

//const nuevoGestordeProductos = new GestordeProductos(
// "./gestordeproductos.json"
//);

//(async () => {
//await nuevoGestordeProductos.obtenerProducto();
// await nuevoGestordeProductos.agregarProducto(
//    "Camiseta de futbol",
//    "La mejor camiseta",
//   350,
//   "sin imagen",
//  "CF1234",
//  "76"
// );

//  await nuevoGestordeProductos.obtenerProducto();
// await nuevoGestordeProductos.obtenerProductoporId(1);
// await nuevoGestordeProductos.actualizarProducto(1, {
//   title: "Nuevo",
//    price: 300,
//    stock: 50,
// });
// await nuevoGestordeProductos.EliminarProducto(1);
//})();
export default ProductManager;
