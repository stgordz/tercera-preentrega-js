class Producto {
    constructor(id, nombre, precio, stock, img, descripcion, alt) {
        this.id = id
        this.nombre = nombre
        this.cantidad = 1
        this.precio = precio
        this.stock = stock
        this.img = img
        this.descripcion = descripcion
        this.alt = alt
    }
}

class ProductoController {
    constructor() {
        this.listaProductos = []
        this.contenedor_productos = document.getElementById("contenedor_productos")
    }

    levantarProductos() {
        this.listaProductos = [
            new Producto(1, "Equipo 01", 1000, 10, "/img/equipos/equipos-01.jpg", "Equipo de vapeo 01", "Equipo de vapeo 01"),
            new Producto(2, "Equipo 02", 2000, 10, "/img/equipos/equipos-02.jpg", "Equipo de vapeo 02", "Equipo de vapeo 02"),
            new Producto(3, "Equipo 03", 3000, 10, "/img/equipos/equipos-03.jpg", "Equipo de vapeo 03", "Equipo de vapeo 03"),
            new Producto(4, "Equipo 04", 4000, 10, "/img/equipos/equipos-04.jpg", "Equipo de vapeo 04", "Equipo de vapeo 04"),
            new Producto(5, "Equipo 05", 5000, 10, "/img/equipos/equipos-05.jpg", "Equipo de vapeo 05", "Equipo de vapeo 05"),
            new Producto(6, "Equipo 06", 6000, 10, "/img/equipos/equipos-06.jpg", "Equipo de vapeo 06", "Equipo de vapeo 06"),
            new Producto(7, "Liquido 01", 7000, 10, "/img/liquidos/liquidos-01.jpg", "Liquido con nicotina 01", "Liquido con nicotina 01"),
            new Producto(8, "Liquido 02", 8000, 10, "/img/liquidos/liquidos-02.jpg", "Liquido con nicotina 02", "Liquido con nicotina 02")
        ]
    }

    mostrarEnDOM() {
        //Mostramos los productos en DOM de manera dinamica
        this.listaProductos.forEach(producto => {
            this.contenedor_productos.innerHTML += `
            <div class="card border-primary" style="width: 18rem;">
                <img src="${producto.img}" class="card-img-top" alt="${producto.alt}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <a href="#" id="cpu-${producto.id}" class="btn btn-primary">Añadir al carrito</a>
                </div>
            </div>`
        })
    }

    darEventoClickAProductos(controladorCarrito) {
        this.listaProductos.forEach(producto => {
            const btnAP = document.getElementById(`cpu-${producto.id}`)
            btnAP.addEventListener("click", () => {

                controladorCarrito.agregar(producto)
                controladorCarrito.guardarEnStorage()
                //TODO: que solo añada 1 producto al DOM. Que no recorra toda la lista.
                controladorCarrito.mostrarEnDOM(contenedor_carrito)

                Toastify({
                    text: `${producto.nombre} añadido!`,
                    duration: 3000,
                    
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", //`left` or `right`
            
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
            })
        })
    }
}

class CarritoController {
    constructor() {
        this.listaCarrito = []
        this.contenedor_carrito = document.getElementById("contenedor_carrito")
    }

    agregar(producto) {
        //si ya existia en el carrito, hay que aumentar en 1 la cantidad.
        this.listaCarrito.push(producto)
    }

    

    limpiarCarritoEnStorage(){
        localStorage.removeItem("listaCarrito")
    }

    guardarEnStorage() {
        let listaCarritoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", listaCarritoJSON)
    }

    verificarExistenciaEnStorage() {
        this.listaCarrito = JSON.parse(localStorage.getItem('listaCarrito')) || []
        if (this.listaCarrito.length > 0) {
            this.mostrarEnDOM()
        }
    }

    limpiarContenedor_Carrito() {
        //limpio el contenedor para recorrer todo el arreglo y no se repita sin querer los productos.
        this.contenedor_carrito.innerHTML = ""
    }

    mostrarEnDOM() {
        this.limpiarContenedor_Carrito()
        this.listaCarrito.forEach(producto => {
            this.contenedor_carrito.innerHTML +=
                `<div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${producto.img}" class="img-fluid rounded-start" alt="${producto.alt}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">Descripcion: ${producto.descripcion}</p>
                            <p class="card-text">Precio: $${producto.precio}</p>
                            <p class="card-text">Cantidad: ${producto.cantidad}</p>
                        </div>
                    </div>
                </div>
            </div>`
        })
    }
}

const controladorProductos = new ProductoController()
controladorProductos.levantarProductos()

const controladorCarrito = new CarritoController()

//Verifica en STORAGE y muestra en DOM si hay algo.
controladorCarrito.verificarExistenciaEnStorage()

//DOM
controladorProductos.mostrarEnDOM()

//EVENTOS
controladorProductos.darEventoClickAProductos(controladorCarrito)

const finalizar_compra = document.getElementById("finalizar_compra")
finalizar_compra.addEventListener("click", () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Compra realizada con éxito!',
        showConfirmButton: false,
        timer: 2000
    })

    //está en DOM
    controladorCarrito.limpiarContenedor_Carrito()
    //está en localStorage
    controladorCarrito.limpiarCarritoEnStorage()
    //está en listaCarrito
    controladorCarrito.listaCarrito = []
})