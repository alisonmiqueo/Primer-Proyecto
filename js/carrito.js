import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
    //leemos  cantidad de productos en carrito para mostrar
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    //accedemos al nodo donde vamos a mostrar las tarjetas de producto
    const contenedor = document.getElementById("contenedor-carrito");
    //botones de acciones
    const divAcciones = document.getElementById("acciones-carrito");

    //esta lineas limpian los contenedor antes antes de renderizar tarjetas y botones
    contenedor.innerHTML = "";
    divAcciones.innerHTML= "";

    //si no hay productos en el carrito mostramos un mensaje
    if(!carrito.length){
        const mensaje = document.createElement("p");
        mensaje.classList.add("mesaje-carrito-vacio");
        mensaje.textContent = "no hay productos en el carrito";

        contenedor.appendChild(mensaje);
        return;//salimos de la funcion para no intentar renderizar productos
    }

    //si hay productos en el carrito los reenderizamos
//el foreach nos puede dar el indice del producto en el array
carrito.forEach((producto,indice) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("card");

    const img = document.createElement("img");
    img.src = `../${producto.img}`;
    img.alt = producto.nombre;

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.textContent = `$${producto.precio}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn");
    btnEliminar.classList.add("btn-eliminar-carrito");

    //aca nos sirve el indice, para poder pasarselo a la funcion eliminar
    btnEliminar.textContent = "Eliminar";

    btnEliminar.addEventListener("click",() => {
        eliminarProducto(indice);

        //importante! volver a renderizar el carrito para actualzar la vista,
        //ya que sino quedaria con el producto eliminado porque solo borramos el storage
        renderizarCarrito();
    });

    tarjeta.appendChild(img);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(btnEliminar);

    contenedor.appendChild(tarjeta);

});

const btnVaciar = document.createElement("button")
btnVaciar.classList.add("btn");
btnVaciar.classList.add("btn-vaciar-carrito");
btnVaciar.textContent = "vaciar carrito"

btnVaciar.addEventListener("click", () => {
    vaciarCarrito()
    renderizarCarrito()
})

divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded",() => {
    renderizarCarrito();
});