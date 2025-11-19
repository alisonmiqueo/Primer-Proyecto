
import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador} from "./ui.js";

//el evento "DOMContentLoaded" sirve para que no intentemos acceder a un nodo HTML con el
//codigo js antes de que el navegador lo cree:
//por ej: que no lea un getElementById cuando aun no existe ese id
document.addEventListener("DOMContentLoaded",() => {
    //accedemos al contenedor donde queremos generar los articles
    const contenedor = document.getElementById("contenedor-tarjetas");
    
    //pedimos la info de productos  en carrito para mostrar el numero si hay productos
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    fetch("./data/productos.json")
    .then((res) => {
        if(!res.ok){
            throw new Error(`Error HTTP status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        //for de tarjetas
        data.forEach((producto) => {
        //creamos los articles y sus contenidos
        const tarjeta = document.createElement("article")
        tarjeta.classList.add("card");

        const img = document.createElement("img")
        img.alt = producto.nombre
        img.src = `./${producto.img}`

        const titulo = document.createElement("h3")
        titulo.textContent = producto.nombre

        const precio = document.createElement("p")
        precio.textContent = `$${producto.precio}`

        const boton = document.createElement("button")
        boton.classList.add("btn")
        boton.textContent = "agregar al carrito";

        boton.addEventListener("click",() => {
            agregarAlCarrito(producto)
        })

        tarjeta.appendChild(img)
        tarjeta.appendChild(titulo)
        tarjeta.appendChild(precio)
        tarjeta.appendChild(boton)

        contenedor.appendChild(tarjeta)
    })
    })
    .catch((err) => console.log(err));

    
});