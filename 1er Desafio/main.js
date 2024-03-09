const fs = require("fs");

class GestordeProductos {
  constructor() {
    this.productos = [];
    this.path = "./productos.json";
    this.id = 0;
  }
  agregarProducto(titulo, descripcion, precio, imagen, codigo, stock) {
    if (!titulo || !descripcion || !precio || !imagen || !codigo || !stock) {
      console.log("deben completarse todos los campos");
      return;
    }

    if (this.productos.find((item) => item.codigo === codigo)) {
      console.log("el codigo debe ser irrepetible");
      return;
    }

    const productoNuevo = {
      id: this.id,
      titulo: titulo,
      descripcion: descripcion,
      precio: precio,
      imagen: imagen,
      codigo: codigo,
      stock: stock,
    };

    this.productos.push(productoNuevo);
    this.id++;
  }
  async ObtenerProductos() {
    const ProductosBuscados = await fs.readFile(this.path, "utf-8");
    return JSON.parse(ProductosBuscados);
  }
  ObtenerProductosbyID(id) {
    const ProductosBuscados = this.ProductosBuscados.find(
      (ProductosBuscados) => ProductosBuscados.id === id
    );

    if (!ProductosBuscados) {
      return ProductosBuscados;
    } else {
      console.log("Not Found");
    }
  }
}

//Testing Time

const gestor = new GestordeProductos();

console.log(gestor.ObtenerProductos());

gestor.agregarProducto(
  "Camiseta de futbol",
  "La mejor camiseta",
  350,
  "sin imagen",
  "CF1234",
  "76"
);

gestor.agregarProducto(
  "Camisa",
  "La camisa mas elegante",
  550,
  "sin imagen",
  "RT2391",
  "23"
);

gestor.agregarProducto(
  "Camiseta de futbol",
  "La mejor camiseta",
  350,
  "sin imagen",
  "CF1234",
  "76"
);

console.log(gestor.ObtenerProductos());

console.log(gestor.ObtenerProductosbyID());

// Clase 3 Array de Productos :

//const misProductos = [
//{id: 1, nombre: "Fideos", precio: 150},
//{id: 2, nombre: "Arroz", precio: 250},
//{id: 3, nombre: "Pan", precio: 350},
// {id: 4, nombre: "Helado", precio: 450},
// {id: 5, nombre: "Galletitas", precio: 550},
// {id: 6, nombre: "Mermelada", precio: 650},
// {id: 7, nombre: "Queso", precio: 750},
//  {id: 8, nombre: "Gaseosa", precio: 850},
//]
