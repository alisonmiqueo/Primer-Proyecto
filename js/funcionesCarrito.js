import { guardarCarrito,obtenerCarrito,vaciarCarritoStorage } from "./storage.js";
import { actualizarContador,mostrarMensaje } from "./ui.js";

export const agregarAlCarrito = (producto) => {
    const carrito = obtenerCarrito();
    carrito.push(producto);

    guardarCarrito(carrito);

    actualizarContador(carrito);
    mostrarMensaje("producto agregado al carrito");
};

export const eliminarProducto = (indice) => {
    const carrito = obtenerCarrito();
    carrito.splice(indice,1);

    guardarCarrito(carrito);
    actualizarContador(carrito);
    mostrarMensaje("producto eliminado");
};

export const vaciarCarrito = () => {
    vaciarCarritoStorage();
    actualizarContador([]);
    mostrarMensaje("carrito vaciado");
};