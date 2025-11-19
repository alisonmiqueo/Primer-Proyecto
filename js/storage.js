const keyy = "carrito"

export const guardarCarrito = (carrito) => {
    localStorage.setItem(keyy,JSON.stringify(carrito))
}

export const obtenerCarrito = () => {
    return JSON.parse(localStorage.getItem(keyy)) || []
}

export const vaciarCarritoStorage = () => {
    localStorage.removeItem(keyy)
}