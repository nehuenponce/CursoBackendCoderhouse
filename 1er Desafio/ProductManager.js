import { promises as fsPromises } from "fs";

class GestordeProductos {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async agregarProducto(
    titulo,
    descripcion,
    precio,
    rutadeimagen,
    codigo,
    stock
  ) {
    try {
      if (!this.products) {
        await this.leerProducto();
      }

      const productoExitente = this.products.find((i) => i.codigo === codigo);

      if (productoExitente) {
        console.error("El producto ya existe");
        return;
      }

      if (
        !titulo ||
        !descripcion ||
        !precio ||
        !rutadeimagen ||
        !codigo ||
        !stock
      ) {
        console.error("Todos los campos son obligatorios");
        return;
      }

      let maxId =
        this.products.length > 0
          ? Math.max(...this.products.map((i) => i.id))
          : 0;
      const id = maxId + 1;

      const nuevoProducto = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id,
      };

      this.products.push(nuevoProducto);
      await this.writeProducts(this.products);
    } catch (error) {
      console.error("El producto no se agrego", error);
    }
  }

  async leerProducto() {
    try {
      const response = await fsPromises.readFile(this.path, "utf-8");
      const products = JSON.parse(response);
      this.products = products;
    } catch (error) {
      this.products = [];
    }
  }

  async escribirProducto(nuevoProducto) {
    try {
      await fsPromises.writeFile(
        this.path,
        JSON.stringify(nuevoProducto, null, 2)
      );
    } catch (error) {
      console.error("El producto no pudo escribirse", error);
    }
  }

  async obtenerProducto() {
    await this.leerProducto();
    console.log(this.products);
  }

  async obtenerProductoporId(id) {
    try {
      await this.leerProducto();
      const product = this.products.find((i) => i.id === id);
      if (!product) {
        throw new Error("El producto no fue encontrado");
      }
      console.log("El roducto ha sido encontrado: ", product);
    } catch (error) {
      console.error(error);
    }
  }

  async actualizarProducto(id, actualizacionProducto) {
    try {
      await this.leerProducto();
      const productIndex = this.products.findIndex((i) => i.id === id);

      if (productIndex === -1) {
        console.error("El producto no fue encontrado para actualizar");
        return;
      }

      this.products[productIndex] = {
        ...this.products[productIndex],
        ...actualizacionProducto,
        id: this.products[productIndex].id,
      };

      await this.escribirProducto(this.products);
    } catch (error) {
      console.error("Error al actualizar el producto", error);
    }
  }

  async EliminarProducto(id) {
    await this.leerProducto();
    const filteredProducts = this.products.filter((i) => i.id != id);
    await this.escribirProducto(filteredProducts);
  }
}

//Testing Time

const nuevoGestordeProductos = new GestordeProductos(
  "./gestordeproductos.json"
);

(async () => {
  await nuevoGestordeProductos.obtenerProducto();
  await nuevoGestordeProductos.agregarProducto(
    "Camiseta de futbol",
    "La mejor camiseta",
    350,
    "sin imagen",
    "CF1234",
    "76"
  );

  await nuevoGestordeProductos.obtenerProducto();
  await nuevoGestordeProductos.obtenerProductoporId(1);
  await nuevoGestordeProductos.actualizarProducto(1, {
    title: "Nuevo",
    price: 300,
    stock: 50,
  });
  await nuevoGestordeProductos.EliminarProducto(1);
})();
